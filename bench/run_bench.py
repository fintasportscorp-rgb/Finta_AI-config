#!/usr/bin/env python3
"""Finta Bench — measure what an AI config is actually worth.

Runs the same tasks against the same repo in two arms:
  bare        — repo with the AI config removed
  configured  — repo as-is (CLAUDE.md/.claude/loop/ present)

Per run it measures: pass/fail (the task's own deterministic check),
turns-to-pass (agent invocations, failure feedback appended each turn),
wall seconds, and estimated tokens (output chars / 4). Results go to
JSONL plus an aggregated summary JSON that bench.html renders.

Honesty rules built in:
  * The check command is the ONLY judge — never the agent's self-report.
  * --mock exists to test the pipeline; its rows carry "mock": true and
    the dashboard labels them as demo data, not measurements.
  * Aggregates use medians; n is recorded so small samples stay visible.

Stdlib only. Example:
  python3 bench/run_bench.py --tasks bench/tasks.example.json \\
      --repo ~/code/acme-api \\
      --agent-cmd 'claude -p "{prompt}" --dangerously-skip-permissions' \\
      --repeats 3 --max-turns 5 --out bench/results.jsonl
"""
import argparse, json, os, shutil, statistics, subprocess, sys, tempfile, time

CONFIG_PATHS_DEFAULT = [
    ".claude", "CLAUDE.md", "CLAUDE.local.md", "loop", "prompts",
    "cursor_rules.md", ".cursor", "AGENTS.md", "COPILOT.md", "windsurf_rules.md",
]


def sh(cmd, cwd, timeout):
    try:
        r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True,
                           text=True, timeout=timeout)
        return r.returncode, (r.stdout or "") + (r.stderr or "")
    except subprocess.TimeoutExpired:
        return 124, "(timeout)"


def make_workdir(repo, arm, config_paths):
    work = tempfile.mkdtemp(prefix=f"finta-bench-{arm}-")
    dst = os.path.join(work, "repo")
    shutil.copytree(repo, dst, symlinks=True,
                    ignore=shutil.ignore_patterns(".git", "node_modules", ".venv", "__pycache__"))
    if arm == "bare":
        for p in config_paths:
            fp = os.path.join(dst, p)
            if os.path.isdir(fp):
                shutil.rmtree(fp, ignore_errors=True)
            elif os.path.exists(fp):
                os.remove(fp)
    return work, dst


def mock_agent(task, arm, turn, workdir):
    """Pipeline-test agent: 'solves' the task by writing the marker file the
    example check looks for. Deterministic per task id, varied so the demo
    dashboard shows a realistic spread (incl. one bare failure)."""
    h = sum(ord(c) for c in task["id"])
    if arm == "configured":
        solve_at = 1 + (h % 2)            # 1–2 turns
    else:
        solve_at = 99 if h % 7 == 0 else 2 + (h % 3)  # 2–4 turns, rare never
    if turn >= solve_at:
        open(os.path.join(workdir, ".bench_solved_" + task["id"]), "w").write("ok")
    time.sleep(0.03)
    return "mock output " * ((25 + h % 30) if arm == "bare" else (8 + h % 10)) * turn


def run_once(task, arm, args, config_paths):
    work, repo_dir = make_workdir(args.repo, arm, config_paths)
    t0 = time.time()
    tokens = 0
    passed = False
    turns_used = 0
    try:
        if task.get("setup"):
            sh(task["setup"], repo_dir, 300)
        feedback = ""
        for turn in range(1, args.max_turns + 1):
            turns_used = turn
            prompt = task["prompt"] + feedback
            if args.mock:
                out = mock_agent(task, arm, turn, repo_dir)
            else:
                cmd = args.agent_cmd.replace("{prompt}", prompt.replace('"', "'"))
                _, out = sh(cmd, repo_dir, task.get("timeout_s", 900))
            tokens += len(out) // 4
            code, check_out = sh(task["check"], repo_dir, 300)
            if code == 0:
                passed = True
                break
            feedback = ("\n\nPrevious attempt did not pass the check "
                        f"`{task['check']}` (exit {code}). Output tail:\n"
                        + check_out[-800:])
    finally:
        shutil.rmtree(work, ignore_errors=True)
    return {
        "task": task["id"], "arm": arm, "pass": passed,
        "turns": turns_used, "wall_s": round(time.time() - t0, 2),
        "tokens_est": tokens, "mock": bool(args.mock),
        "ts": time.strftime("%Y-%m-%dT%H:%M:%S"),
    }


def med(rows, key):
    vals = [r[key] for r in rows]
    return round(statistics.median(vals), 2) if vals else None


def summarize(rows, meta):
    tasks = sorted({r["task"] for r in rows})
    arms = sorted({r["arm"] for r in rows})
    out = {"meta": meta, "tasks": [], "overall": {}}
    for tid in tasks:
        entry = {"id": tid, "arms": {}}
        for arm in arms:
            sub = [r for r in rows if r["task"] == tid and r["arm"] == arm]
            entry["arms"][arm] = {
                "n": len(sub),
                "pass_rate": round(sum(r["pass"] for r in sub) / len(sub), 3) if sub else None,
                "med_turns": med([r for r in sub if r["pass"]] or sub, "turns"),
                "med_tokens": med(sub, "tokens_est"),
                "med_wall_s": med(sub, "wall_s"),
            }
        out["tasks"].append(entry)
    for arm in arms:
        sub = [r for r in rows if r["arm"] == arm]
        out["overall"][arm] = {
            "n": len(sub),
            "pass_rate": round(sum(r["pass"] for r in sub) / len(sub), 3) if sub else None,
            "med_turns": med([r for r in sub if r["pass"]] or sub, "turns"),
            "med_tokens": med(sub, "tokens_est"),
            "med_wall_s": med(sub, "wall_s"),
        }
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tasks", required=True, help="tasks JSON file")
    ap.add_argument("--repo", required=True, help="target repo to copy per run")
    ap.add_argument("--agent-cmd", default="", help="shell template invoking your agent; {prompt} is substituted")
    ap.add_argument("--arms", default="bare,configured")
    ap.add_argument("--config-paths", default=",".join(CONFIG_PATHS_DEFAULT),
                    help="paths stripped from the repo copy in the bare arm")
    ap.add_argument("--label", default="", help="model label recorded in results (e.g. fable-5, sonnet-5, haiku-4-5) — lets the dashboard distinguish runs per model")
    ap.add_argument("--repeats", type=int, default=1)
    ap.add_argument("--max-turns", type=int, default=5)
    ap.add_argument("--out", default="bench/results.jsonl")
    ap.add_argument("--mock", action="store_true", help="pipeline test without a real agent (rows marked mock)")
    args = ap.parse_args()

    if not args.mock and not args.agent_cmd:
        sys.exit("Provide --agent-cmd (or --mock for a pipeline test).")
    tasks = json.load(open(args.tasks, encoding="utf-8"))
    config_paths = [p.strip() for p in args.config_paths.split(",") if p.strip()]
    arms = [a.strip() for a in args.arms.split(",") if a.strip()]

    rows = []
    total = len(tasks) * len(arms) * args.repeats
    i = 0
    for task in tasks:
        for arm in arms:
            for rep in range(args.repeats):
                i += 1
                print(f"[{i}/{total}] {task['id']} · {arm} · run {rep + 1}", flush=True)
                row = run_once(task, arm, args, config_paths)
                row["repeat"] = rep + 1
                if args.label:
                    row["label"] = args.label
                rows.append(row)
                print(f"    pass={row['pass']} turns={row['turns']} "
                      f"wall={row['wall_s']}s ~tokens={row['tokens_est']}", flush=True)

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r) + "\n")
    meta = {"repo": os.path.basename(os.path.abspath(args.repo)),
            "label": args.label,
            "repeats": args.repeats, "max_turns": args.max_turns,
            "mock": bool(args.mock), "agent_cmd": bool(args.agent_cmd),
            "generated": time.strftime("%Y-%m-%d %H:%M")}
    summary = summarize(rows, meta)
    spath = os.path.splitext(args.out)[0] + "-summary.json"
    json.dump(summary, open(spath, "w", encoding="utf-8"), indent=2)
    print(f"\nWrote {args.out} and {spath}")
    print("Open bench.html and load the summary to visualize.")

    o = summary["overall"]
    if "bare" in o and "configured" in o and o["bare"]["med_turns"]:
        d = (o["configured"]["med_turns"] - o["bare"]["med_turns"]) / o["bare"]["med_turns"] * 100
        tag = " (MOCK — pipeline test, not a measurement)" if args.mock else ""
        print(f"Median turns: {o['bare']['med_turns']} bare → "
              f"{o['configured']['med_turns']} configured ({d:+.0f}%){tag}")


if __name__ == "__main__":
    main()
