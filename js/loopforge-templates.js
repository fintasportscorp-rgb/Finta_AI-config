/* ════════════════════════════════════════════════════════════════
   FINTA 2040 — LOOP FORGE TEMPLATES (shared module)
   Single source of truth for the generated loop-architecture files.
   Consumed by BOTH js/loopforge.js (full studio) and js/wizard.js
   (one-toggle integration with derived defaults).

   window.LoopForgeTemplates = {
     PROFILE_LABELS,
     defaultConfig(overrides) -> config,
     buildLoopFiles(config)   -> { files: {path: content}, bootstrap }
   }
   Config shape: { name, runtime, goal, scope[], forbid[], profile,
     pattern, subs[], criteria[{id,label,mode,check,weight}], htl{},
     guard{ max_iterations, stagnation_rounds, doubt_threshold_pct,
            retest_max_attempts, time_budget_minutes, token_budget,
            rollback_on_regression, success_threshold_pct } }
   ════════════════════════════════════════════════════════════════ */

'use strict';

(function () {

const PROFILE_LABELS = {
  turn_by_turn: 'Turn-by-turn',
  goal_based: 'Goal-based',
  temporal: 'Temporal',
  proactive: 'Proactive',
  human_validated: 'Simplified + human validation',
};

/* ════════════════════════════════════════════════════════════════
   FILE TEMPLATES
   ════════════════════════════════════════════════════════════════ */

function fileAgentMd(c) {
  const subsBlock = c.pattern === 'single' ? `Single agent — tasks are coupled or decomposition benefit ≤ coordination cost.` :
`Pattern: **${c.pattern}**. Sub-agents (coordination via \`memory/exchange.md\`):
${c.subs.map(s => `- \`${s.name}\` — ${s.role}${c.pattern === 'mixed' ? ` _(${s.group} block)_` : ''}`).join('\n')}

On sub-agent failure: log to \`memory/memory_temp.md\`, re-enter the correction
loop (max ${c.guard.max_iterations} iterations), then HTL if unresolved.`;

  return `# AGENT.md — ${c.name}

> Orchestrator contract. Human-editable, model-agnostic. Interpreted by
> \`script/loop_runner.py\` and by any LLM you paste it into.

## Identity
- **Name:** ${c.name}
- **Loop profile:** ${c.profile} (${PROFILE_LABELS[c.profile]})
- **Target runtime:** ${c.runtime}

## Mission (verifiable objective)
${c.goal || '_Define a measurable objective — the loop cannot stop without one._'}

## Scope — the agent MAY
${c.scope.map(s => `- ${s}`).join('\n') || '- (define allowed actions)'}

## Out of scope — the agent MUST NEVER
${c.forbid.map(s => `- ${s}`).join('\n') || '- (define forbidden actions)'}
- Widen or modify this scope itself (locked at BOOTSTRAP).

## The cycle
BOOTSTRAP → CONTEXT → CLARIFY? → LOOP_DESIGN → READY → EXECUTION →
SELF-TEST / ISSUE → DIAGNOSE (one cause) → FIX (one atomic change) →
RETEST (max ${c.guard.retest_max_attempts}) → REGRESSION TEST → RESOLVED | BLOCKED (HTL)

Rules:
1. If understanding doubt exceeds **${c.guard.doubt_threshold_pct}%**, ask a targeted
   question (CLARIFY) before acting. Persist the answer to \`memory/memory.md\`.
2. Each planned step needs: objective, preconditions, tools, test, diagnostic, proof.
3. One diagnosis and one atomic fix per bug — never batched, untested corrections.
4. A fix only counts as RESOLVED after a regression pass; then write permanent
   memory, archive \`resolved_<id>.json\`, purge \`memory_temp.md\`.

## Verification
Each criterion in \`asset/scale-objectif.json\` is evaluated by its own mode:
- **deterministic** — run the command; exit 0 = pass. Binary, no ambiguity.
- **soft** — compare to the spec validated once with the user (recorded in
  \`memory/memory.md\` as \`SOFT-VALIDATED: <id>\`). If not yet validated → CLARIFY,
  never a silent guess.
Weighted score ≥ ${c.guard.success_threshold_pct}% → STOP (RESOLVED). Otherwise iterate.

## Human-to-loop (HTL) triggers
${Object.entries(c.htl).map(([k, v]) => `- [${v ? 'x' : ' '}] ${k.replace(/_/g, ' ')}`).join('\n')}

Semantics: hard brakes (iteration cap, stagnation, time/token budget) ALWAYS
stop — stopping is guaranteed and not configurable. The toggles above govern
the advisory triggers the agent raises itself via \`[HTL:<trigger>]\` markers:
enabled → stop and escalate; disabled → logged warning, loop continues.

## Orchestration
${subsBlock}
`;
}

function fileLoopConfig(c) {
  return JSON.stringify({
    agent: c.name,
    loop_type: c.profile,
    max_iterations: c.guard.max_iterations,
    stagnation_rounds: c.guard.stagnation_rounds,
    doubt_threshold_pct: c.guard.doubt_threshold_pct,
    retest_max_attempts: c.guard.retest_max_attempts,
    time_budget_minutes: c.guard.time_budget_minutes,
    token_budget: c.guard.token_budget,
    success_threshold_pct: c.guard.success_threshold_pct,
    rollback_on_regression: c.guard.rollback_on_regression,
    git_checkpoints: c.guard.rollback_on_regression,
    htl_triggers: c.htl,
    _comment_htl: "Hard brakes (iteration cap, stagnation, budgets) ALWAYS stop — stopping is guaranteed. These toggles govern the advisory triggers the agent itself raises via [HTL:<trigger>] markers: enabled = stop and escalate, disabled = log a warning and continue.",
    temporal: { poll_seconds: 60, trigger_cmd: "" },
    _comment_temporal: "loop_type=temporal only: before each iteration, poll trigger_cmd (exit 0 = event happened) every poll_seconds, within the time budget. Empty trigger_cmd = run immediately with a warning.",
    proactive: { watch_seconds: 0, max_watch_cycles: 3 },
    _comment_proactive: "loop_type=proactive only: after RESOLVED, keep watching — re-score every watch_seconds; if a criterion regresses below threshold, autonomously re-enter the loop (up to max_watch_cycles). 0 = resolve and exit like goal_based.",
    orchestration: {
      pattern: c.pattern,
      sub_agents: c.subs.map(s => ({ name: s.name, role: s.role, group: c.pattern === 'mixed' ? s.group : (c.pattern === 'sequential' ? 'sequential' : 'parallel'), ...(s.cmd ? { agent_cmd: s.cmd } : {}) })),
      exchange_bus: 'memory/exchange.md',
    },
    agent_cmd: "",
    _comment_agent_cmd: "Shell command template invoking your LLM agent for one loop turn, e.g. 'claude -p \"{prompt}\"'. Empty = evaluate-only mode (deterministic criteria still run). Sub-agents may override with their own agent_cmd.",
    escalation_ladder: [],
    _comment_escalation_ladder: "Optional list of stronger tiers tried IN ORDER when the current tier ends BLOCKED (iteration cap or hard failure), each with a fresh iteration budget, before falling back to a human. Example: [{\"label\": \"sonnet\", \"agent_cmd\": \"claude --model claude-sonnet-5 -p \\\"{prompt}\\\"\"}, {\"label\": \"fable-5\", \"agent_cmd\": \"claude --model claude-fable-5 -p \\\"{prompt}\\\"\"}]. This is the cheap-model economics: run Haiku first, escalate only on proof of failure.",
    feedback_context_chars: 3000,
    _comment_feedback: "Each turn after the first receives the tail of memory_temp.md (this many chars) plus the last check failure — turns are stateless processes, this is their working memory.",
  }, null, 2) + '\n';
}

function fileScaleObjectif(c) {
  return JSON.stringify({
    _doc: 'Scoring grid. Each criterion is verified per its own mode: deterministic (command exit code) or soft (spec validated once with the user, then applied autonomously). Never a blind pass/fail.',
    success_threshold_pct: c.guard.success_threshold_pct,
    criteria: c.criteria.map(cr => ({
      id: cr.id,
      label: cr.label,
      verification_mode: cr.mode,
      ...(cr.mode === 'deterministic' ? { command: cr.check } : { spec: cr.check, validated_marker: `SOFT-VALIDATED: ${cr.id}` }),
      weight: +cr.weight || 1,
    })),
  }, null, 2) + '\n';
}

function fileMemory(c) {
  return `# memory.md — permanent memory (${c.name})

Never purged automatically. The agent appends:
- clarified decisions (CLARIFY answers from the user),
- soft-criterion validations, one per line: \`SOFT-VALIDATED: <criterion-id> — <summary of the accepted baseline>\`,
- durable lessons learned after each RESOLVED incident.

---
`;
}

function fileMemoryTemp(c) {
  return `# memory_temp.md — incident buffer (${c.name})

Working memory for the CURRENT incident/task only.
Created at ISSUE, enriched during DIAGNOSE/FIX/RETEST, **purged at RESOLVED**.
If the loop ends BLOCKED, this file is preserved so a human can see what was tried.

---
`;
}

function fileExchange(c) {
  return `# exchange.md — inter-agent coordination bus (${c.name})

Append-only JSON lines. Every sub-agent reads before starting and writes on completion.
Schema per line:
{"session_id": str, "source_agent": str, "target_agent": str, "task": str, "inputs": [], "outputs": [], "status": "EN_COURS" | "TERMINE" | "ECHEC"}

---
`;
}

function fileLoopEngineering(c) {
  return `# loop-engineering.md — the pattern, for the agent itself

An automation follows fixed steps. A loop **observes, decides, acts and
re-evaluates every turn**:

1. Observe the current state — context, files, logs, memory, objective.
2. Choose the next action.
3. Execute — write, test, search, fix or answer.
4. Verify the result — tests, rules or review.
5. Decide — continue, correct, retry, roll back or stop.
6. Stop — when the verifiable objective is reached.

Three pillars: a **trigger** (message, ticket, CI failure, schedule), a
**verifiable objective** (the loop must know when to stop), and **guardrails**
(max ${c.guard.max_iterations} iterations, stagnation after ${c.guard.stagnation_rounds} flat rounds, budgets, human validation).

Loop profile for this agent: **${c.profile}** — ${PROFILE_LABELS[c.profile]}.
Selection principles: start with the simplest loop; add autonomy only when the
proof is reliable; keep human control when risk or ambiguity rises; stopping
must always be guaranteed.
`;
}

function fileSubagentsWorkflow(c) {
  return `# subagents-workflow.md

Decision rules:
| Situation | Decision |
|---|---|
| Tightly coupled tasks | Keep 1 agent |
| Independent tasks | Parallel fan-out |
| Dependent tasks (A → B) | Sequential |
| Both kinds | Mixed: parallel block + sequential block |
| Decomposition benefit ≤ coordination cost | Keep 1 agent |
| Any step > 500 lines of output | Evaluation trigger (not an automatic split) |

This agent uses pattern **${c.pattern}**.
${c.subs.length ? '\nSub-agents:\n' + c.subs.map(s => `- ${s.name} (${s.group}): ${s.role}`).join('\n') : ''}

Coordination: all agents read/write \`memory/exchange.md\` (JSON lines).
Failure handling: a sub-agent reporting ECHEC is logged to \`memory_temp.md\`,
the orchestrator re-enters the correction loop (capped at ${c.guard.max_iterations} iterations),
and escalates to a human (HTL) if still unresolved.
`;
}

function fileMemMgmt() {
  return `# memory-temp-management.md

Lifecycle of the incident buffer:

1. **ISSUE** — a bug/failed verification creates \`memory_temp.md\` and a checkpoint;
   other corrections are locked (one incident at a time).
2. **DIAGNOSE** — exactly one proposed cause is recorded.
3. **FIX** — exactly one atomic correction is applied and recorded.
4. **RETEST** — outcome appended. Failure < max retries → back to DIAGNOSE.
   Failure at max retries → BLOCKED: keep the buffer, escalate to the user.
5. **REGRESSION TEST** — must pass before the fix counts.
6. **RESOLVED** — write the durable lesson to \`memory.md\`, archive
   \`resolved_<id>.json\`, delete \`memory_temp.md\`, unlock the next bug.
`;
}

function fileGuideFormatage() {
  return `# guide-formatage.md

Output conventions for this agent:
- Markdown files: human-editable, no tool-specific syntax, headings ≤ h3.
- JSON: 2-space indent, no comments (use "_comment" keys when unavoidable).
- Skills: \`skills/<name>/skill.md\` — name < 64 chars, description < 255 chars,
  numbered steps, explicit success criteria.
- Exchange bus: one JSON object per line, append-only, never rewritten.
- HTL messages to the human: state WHAT stopped the loop, WHY (which trigger),
  what was tried (link \`memory_temp.md\`), and ONE precise question.
`;
}

/* ── Python: loop runner ── */
function fileLoopRunner(c) {
  return `#!/usr/bin/env python3
"""loop_runner.py — loop-engineering runtime for '${c.name}'.

Enforces in code (not prose):
  * loop profile behavior (loop_type actually branches — see PROFILES below)
  * max_iterations cap, stagnation stop, time/token budgets  [hard brakes]
  * two-mode verification (deterministic commands / soft spec validations)
  * HTL: hard brakes always stop; agent-raised advisory triggers respect
    the htl_triggers toggles (enabled = stop, disabled = warn + continue)
  * escalation ladder: on BLOCKED, retry with the next (stronger) tier's
    agent_cmd and a fresh iteration budget before asking a human
  * git checkpoint on improvement + rollback on regression

PROFILES (loop_type):
  goal_based      iterate until score >= threshold (the default loop)
  turn_by_turn    exactly ONE iteration per invocation; exit 5 = re-run to continue
  human_validated dry-run + plan unless --confirm; with --confirm, ONE iteration
  temporal        before each iteration, poll temporal.trigger_cmd (exit 0 = go)
  proactive       goal_based, then keep watching: re-score every
                  proactive.watch_seconds and autonomously re-enter on regression

Stdlib only. Exit codes:
  0 RESOLVED · 2 HTL/BLOCKED (human takes over) · 3 CLARIFY needed
  5 TURN DONE, not resolved (turn_by_turn: review then re-run)
  6 AWAITING CONFIRMATION (human_validated: re-run with --confirm)
"""
import json, os, re, subprocess, sys, time, uuid
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def read(path):
    p = os.path.join(ROOT, path)
    return open(p, encoding="utf-8").read() if os.path.exists(p) else ""

def append(path, text):
    with open(os.path.join(ROOT, path), "a", encoding="utf-8") as f:
        f.write(text)

CFG = json.loads(read("loop.config.json"))
SCALE = json.loads(read("asset/scale-objectif.json"))
SESSION = uuid.uuid4().hex[:8]
TOKENS_USED = 0
T0 = time.time()

def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    append("memory/memory_temp.md", line + "\\n")

def htl(trigger, question, hard=False):
    """Human-To-Loop. Hard brakes (cap/stagnation/budget) ALWAYS stop.
    Advisory triggers (raised by the agent) stop only if enabled in
    htl_triggers; disabled -> warn and let the loop continue."""
    enabled = CFG.get("htl_triggers", {}).get(trigger, True)
    if not hard and not enabled:
        log(f"HTL[{trigger}] advisory, disabled in config -> logged, continuing: {question}")
        return False
    log(f"HTL[{trigger}] {'hard brake' if hard else 'advisory, enabled'} -> stopping")
    print("\\n=== HUMAN NEEDED " + "=" * 44)
    print(f"Trigger : {trigger}")
    print(f"Question: {question}")
    print(f"Tried so far: see memory/memory_temp.md (preserved)")
    print("=" * 61)
    sys.exit(2)

def clarify(question):
    print("\\n=== CLARIFY " + "=" * 49)
    print(question)
    print("Answer, persist it in memory/memory.md, then re-run.")
    print("=" * 61)
    sys.exit(3)

def budgets_ok(where):
    t_budget = float(CFG.get("time_budget_minutes", 0)) * 60
    tok_budget = int(CFG.get("token_budget", 0))
    if t_budget and time.time() - T0 > t_budget:
        htl("budget_exhausted", f"Time budget ({CFG['time_budget_minutes']} min) reached at {where}.", hard=True)
    if tok_budget and TOKENS_USED > tok_budget:
        htl("budget_exhausted", f"Token budget (~{tok_budget}) reached at {where}.", hard=True)

# ── verification ────────────────────────────────────────────────
def eval_criterion(cr):
    mode = cr.get("verification_mode")
    if mode == "deterministic":
        cmd = cr.get("command", "")
        if not cmd:
            clarify(f"Criterion '{cr['id']}' is deterministic but has no command. Which command proves it?")
        r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True)
        ok = r.returncode == 0
        log(f"verify[det] {cr['id']}: {'PASS' if ok else 'FAIL (exit ' + str(r.returncode) + ')'}")
        return ok
    # soft: needs a one-time human validation recorded in permanent memory
    marker = cr.get("validated_marker", f"SOFT-VALIDATED: {cr['id']}")
    if marker not in read("memory/memory.md"):
        clarify(
            f"Soft criterion '{cr['id']}' ({cr.get('label')}) has never been validated.\\n"
            f"Review one result against the spec: {cr.get('spec', '(none)')}\\n"
            f"If acceptable, add this line to memory/memory.md:\\n  {marker} — <accepted baseline>"
        )
    log(f"verify[soft] {cr['id']}: validated baseline found — PASS")
    return True

def score():
    crits = SCALE.get("criteria", [])
    if not crits:
        clarify("No verification criteria defined — the loop cannot know when to stop. Define at least one in asset/scale-objectif.json.")
    total = sum(c.get("weight", 1) for c in crits)
    got = sum(c.get("weight", 1) for c in crits if eval_criterion(c))
    pct = round(100.0 * got / total, 1)
    log(f"score: {pct}% (threshold {SCALE.get('success_threshold_pct', 80)}%)")
    return pct

# ── checkpoints / rollback ──────────────────────────────────────
def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)

def in_git():
    return git("rev-parse", "--is-inside-work-tree").returncode == 0

def checkpoint(i):
    if not (CFG.get("git_checkpoints") and in_git()):
        return None
    git("add", "-A")
    git("commit", "-m", f"loop-checkpoint: iteration {i} (session {SESSION})", "--allow-empty")
    sha = git("rev-parse", "HEAD").stdout.strip()
    log(f"checkpoint @ {sha[:10]}")
    return sha

def rollback(sha):
    if sha and CFG.get("rollback_on_regression") and in_git():
        log(f"REGRESSION → rollback to last healthy checkpoint {sha[:10]}")
        git("reset", "--hard", sha)
        return True
    return False

# ── the agent turn ──────────────────────────────────────────────
HTL_MARK = re.compile(r"\\[HTL:(\\w+)\\]\\s*(.*)")
CLARIFY_MARK = re.compile(r"\\[CLARIFY\\]\\s*(.*)")

def run_agent(task, iteration, cmd_tpl=None):
    """One work turn. Turns are stateless processes: working memory is the
    tail of memory_temp.md (feedback_context_chars), passed in the prompt."""
    global TOKENS_USED
    tpl = cmd_tpl if cmd_tpl is not None else CFG.get("agent_cmd", "")
    if not tpl:
        log("agent_cmd empty → evaluate-only turn")
        return ""
    ctx_chars = int(CFG.get("feedback_context_chars", 3000))
    context = read("memory/memory_temp.md")[-ctx_chars:] if iteration > 1 else ""
    prompt = (f"Iteration {iteration}. Task: {task}. "
              f"Respect AGENT.md scope. If doubt > {CFG.get('doubt_threshold_pct', 10)}% "
              f"output [CLARIFY] <question>. To escalate output [HTL:<trigger>] <reason>."
              + (f"\\nWorking memory (loop log tail):\\n{context}" if context else ""))
    cmd = tpl.replace("{prompt}", prompt.replace('"', "'"))
    r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True,
                       timeout=3600)
    out = (r.stdout or "") + (r.stderr or "")
    TOKENS_USED += len(out) // 4  # rough estimate
    m = HTL_MARK.search(out)
    if m:
        htl(m.group(1).lower(), m.group(2) or "agent requested escalation")  # advisory
    m = CLARIFY_MARK.search(out)
    if m:
        clarify(m.group(1))
    return out

def bus_write(entry):
    append("memory/exchange.md", json.dumps(entry, ensure_ascii=False) + "\\n")

def run_sub(sub, task):
    """Sub-agents may carry their own agent_cmd (e.g. a cheaper model)."""
    bus_write({"session_id": SESSION, "source_agent": "orchestrator",
               "target_agent": sub["name"], "task": task,
               "inputs": [], "outputs": [], "status": "EN_COURS"})
    try:
        out = run_agent(f"[{sub['name']}] {sub['role']} — {task}", 1,
                        cmd_tpl=sub.get("agent_cmd") or None)
        bus_write({"session_id": SESSION, "source_agent": sub["name"],
                   "target_agent": "orchestrator", "task": task,
                   "inputs": [], "outputs": [out[-500:]], "status": "TERMINE"})
        return True
    except SystemExit:
        raise
    except Exception as e:
        bus_write({"session_id": SESSION, "source_agent": sub["name"],
                   "target_agent": "orchestrator", "task": task,
                   "inputs": [], "outputs": [str(e)], "status": "ECHEC"})
        log(f"sub-agent {sub['name']} ECHEC: {e}")
        return False

def orchestrate(task):
    orch = CFG.get("orchestration", {})
    subs = orch.get("sub_agents", [])
    pattern = orch.get("pattern", "single")
    if pattern == "single" or not subs:
        run_agent(task, 1)
        return
    par = [s for s in subs if s.get("group") != "sequential"]
    seq = [s for s in subs if s.get("group") == "sequential"]
    if pattern == "fanout":
        par, seq = subs, []
    if pattern == "sequential":
        par, seq = [], subs
    failed = []
    if par:
        with ThreadPoolExecutor(max_workers=max(len(par), 1)) as ex:
            for sub, ok in zip(par, ex.map(lambda s: run_sub(s, task), par)):
                if not ok: failed.append(sub)
    for sub in seq:
        if not run_sub(sub, task):
            failed.append(sub)
            break  # strict chain: stop at first failure
    for sub in failed:
        log(f"re-entering correction loop for {sub['name']}")

# ── profile behaviors ───────────────────────────────────────────
def wait_for_trigger():
    """temporal: block until the trigger fires (exit 0), within budgets."""
    t = CFG.get("temporal", {})
    trig, poll = t.get("trigger_cmd", ""), int(t.get("poll_seconds", 60))
    if not trig:
        log("temporal profile but temporal.trigger_cmd is empty → running immediately")
        return
    while True:
        budgets_ok("temporal wait")
        r = subprocess.run(trig, shell=True, cwd=ROOT, capture_output=True, text=True)
        if r.returncode == 0:
            log(f"temporal trigger fired: {trig}")
            return
        log(f"temporal trigger not ready (exit {r.returncode}) — sleeping {poll}s")
        time.sleep(poll)

def resolve(task, s, i, sha):
    log(f"RESOLVED · score {s}% ≥ threshold")
    append("memory/memory.md",
           f"\\n- {time.strftime('%Y-%m-%d')} session {SESSION}: RESOLVED '{task}' at {s}% in {i} iteration(s).\\n")
    with open(os.path.join(ROOT, f"resolved_{SESSION}.json"), "w", encoding="utf-8") as f:
        json.dump({"session": SESSION, "task": task, "score": s,
                   "iterations": i, "checkpoint": sha}, f, indent=2)
    open(os.path.join(ROOT, "memory/memory_temp.md"), "w", encoding="utf-8").write(
        "# memory_temp.md — purged after RESOLVED\\n")

def run_tier(task, cmd_tpl, tier, max_iter, single_turn=False):
    """One tier of the escalation ladder. Returns ('resolved', score, iters)
    or ('blocked', best_score, iters). Hard brakes exit directly."""
    stag_n = int(CFG.get("stagnation_rounds", 3))
    threshold = float(SCALE.get("success_threshold_pct", CFG.get("success_threshold_pct", 80)))
    profile = CFG.get("loop_type", "goal_based")
    history, best, best_sha = [], -1.0, None

    for i in range(1, max_iter + 1):
        log(f"— tier '{tier}' · iteration {i}/{max_iter} —")
        budgets_ok(f"iteration {i}")
        if profile == "temporal":
            wait_for_trigger()
        try:
            if i == 1 and CFG.get("orchestration", {}).get("pattern", "single") != "single":
                orchestrate(task)
            else:
                run_agent(task, i, cmd_tpl=cmd_tpl)
        except subprocess.TimeoutExpired:
            log("agent turn timed out")

        s = score()
        history.append(s)
        if s >= threshold:
            return ("resolved", s, i)
        if s < best and rollback(best_sha):
            history.append(best)
        elif s > best:
            best, best_sha = s, checkpoint(i)
        if len(history) >= stag_n and len(set(history[-stag_n:])) == 1:
            log(f"stagnation in tier '{tier}': {stag_n} rounds flat at {s}%")
            return ("blocked", best, i)
        if single_turn:
            return ("turn_done", s, i)
    return ("blocked", best, max_iter)

def main():
    task = " ".join(a for a in sys.argv[1:] if a != "--confirm") \\
           or "Advance the mission defined in AGENT.md."
    confirmed = "--confirm" in sys.argv
    if "## Mission" not in read("AGENT.md"):
        clarify("AGENT.md has no Mission section — define the verifiable objective first.")

    profile = CFG.get("loop_type", "goal_based")
    max_iter = int(CFG.get("max_iterations", 20))
    threshold = float(SCALE.get("success_threshold_pct", CFG.get("success_threshold_pct", 80)))
    append("memory/memory_temp.md", f"\\n## session {SESSION} — {time.strftime('%Y-%m-%d %H:%M')}\\n")
    log(f"BOOTSTRAP ok · profile={profile} · task: {task}")

    # human_validated: no side effects without explicit confirmation
    if profile == "human_validated" and not confirmed:
        s = score()
        print("\\n=== AWAITING CONFIRMATION " + "=" * 35)
        print(f"Plan   : run ONE iteration of: {task}")
        print(f"Current score: {s}% (threshold {threshold}%)")
        print(f"Approve with:  python3 script/loop_runner.py --confirm {task}")
        print("=" * 61)
        sys.exit(6)

    single_turn = profile in ("turn_by_turn", "human_validated")

    # tiers: base agent_cmd, then the escalation ladder (each = fresh budget)
    tiers = [("base", CFG.get("agent_cmd", ""))] + \\
            [(t.get("label", f"tier{n+1}"), t.get("agent_cmd", ""))
             for n, t in enumerate(CFG.get("escalation_ladder", []))]

    for tn, (tier, cmd_tpl) in enumerate(tiers):
        status, s, iters = run_tier(task, cmd_tpl, tier, max_iter, single_turn)
        if status == "resolved":
            resolve(task, s, iters, checkpoint(iters))
            if profile == "proactive":
                watch(task, threshold)
            sys.exit(0)
        if status == "turn_done":
            print(f"\\nTURN DONE — score {s}%, not yet at threshold {threshold}%.")
            print("Review memory/memory_temp.md, then re-run to continue.")
            sys.exit(5)
        # blocked → escalate to the next tier, if any
        if tn + 1 < len(tiers):
            nxt = tiers[tn + 1][0]
            log(f"tier '{tier}' BLOCKED at {s}% → escalating to tier '{nxt}' (fresh budget)")
            bus_write({"session_id": SESSION, "source_agent": tier,
                       "target_agent": nxt, "task": task, "inputs": [],
                       "outputs": [f"blocked at {s}%"], "status": "ECHEC"})
    htl("budget_exhausted",
        f"All tiers exhausted ({', '.join(t for t, _ in tiers)}) — best score {s}%.", hard=True)

def watch(task, threshold):
    """proactive: after RESOLVED, keep watching and re-enter on regression."""
    w = CFG.get("proactive", {})
    interval, cycles = int(w.get("watch_seconds", 0)), int(w.get("max_watch_cycles", 3))
    if interval <= 0:
        return
    for cycle in range(1, cycles + 1):
        log(f"proactive watch {cycle}/{cycles} — sleeping {interval}s")
        time.sleep(interval)
        budgets_ok(f"watch cycle {cycle}")
        if score() >= threshold:
            continue
        log("regression detected while watching → autonomously re-entering the loop")
        status, s, iters = run_tier(task, CFG.get("agent_cmd", ""), f"watch{cycle}",
                                    int(CFG.get("max_iterations", 20)))
        if status != "resolved":
            htl("budget_exhausted", f"Watch-cycle repair blocked at {s}%.", hard=True)
        resolve(task, s, iters, checkpoint(iters))
    log("proactive watch complete — no unresolved regression")

if __name__ == "__main__":
    main()
`;
}

/* ── Python: structure validator ── */
function fileValidateStructure(c) {
  return `#!/usr/bin/env python3
"""validate-structure.py — verifies presence & format of every required file.
Exit 0 = structure valid."""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REQUIRED = [
    "AGENT.md", "loop.config.json",
    "memory/memory.md", "memory/memory_temp.md", "memory/exchange.md",
    "asset/scale-objectif.json", "asset/loop-engineering.md",
    "asset/subagents-workflow.md", "asset/memory-temp-management.md",
    "asset/guide-formatage.md",
    "script/loop_runner.py", "script/validate-structure.py", "script/validate-coherence.py",
]
LOOP_TYPES = {"turn_by_turn", "goal_based", "temporal", "proactive", "human_validated"}
errors = []

for p in REQUIRED:
    if not os.path.exists(os.path.join(ROOT, p)):
        errors.append(f"missing file: {p}")

def jload(p):
    try:
        return json.load(open(os.path.join(ROOT, p), encoding="utf-8"))
    except Exception as e:
        errors.append(f"{p}: invalid JSON ({e})")
        return {}

cfg = jload("loop.config.json")
for key in ("loop_type", "max_iterations", "stagnation_rounds", "doubt_threshold_pct",
            "success_threshold_pct", "htl_triggers", "orchestration"):
    if key not in cfg:
        errors.append(f"loop.config.json: missing key '{key}'")
if cfg.get("loop_type") and cfg["loop_type"] not in LOOP_TYPES:
    errors.append(f"loop.config.json: loop_type must be one of {sorted(LOOP_TYPES)}")

scale = jload("asset/scale-objectif.json")
for cr in scale.get("criteria", []):
    if cr.get("verification_mode") not in ("deterministic", "soft"):
        errors.append(f"scale-objectif: criterion '{cr.get('id')}' needs verification_mode deterministic|soft")
    if cr.get("verification_mode") == "deterministic" and not cr.get("command"):
        errors.append(f"scale-objectif: deterministic criterion '{cr.get('id')}' has no command")
if not scale.get("criteria"):
    errors.append("scale-objectif: no criteria — the loop cannot know when to stop")

agent = open(os.path.join(ROOT, "AGENT.md"), encoding="utf-8").read() if os.path.exists(os.path.join(ROOT, "AGENT.md")) else ""
for section in ("## Mission", "## Scope", "## Human-to-loop"):
    if section not in agent:
        errors.append(f"AGENT.md: missing section '{section}'")

for skill_dir in (os.listdir(os.path.join(ROOT, "skills")) if os.path.isdir(os.path.join(ROOT, "skills")) else []):
    if len(skill_dir) >= 64:
        errors.append(f"skills/{skill_dir}: name must be < 64 chars")

if errors:
    print("STRUCTURE: FAIL")
    for e in errors: print("  ✗", e)
    sys.exit(1)
print(f"STRUCTURE: OK ({len(REQUIRED)} files verified)")
`;
}

/* ── Python: coherence validator ── */
function fileValidateCoherence(c) {
  return `#!/usr/bin/env python3
"""validate-coherence.py — cross-checks config values against docs & grids.
Exit 0 = coherent."""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def jload(p): return json.load(open(os.path.join(ROOT, p), encoding="utf-8"))
def read(p):
    fp = os.path.join(ROOT, p)
    return open(fp, encoding="utf-8").read() if os.path.exists(fp) else ""

errors, warnings = [], []
cfg, scale = jload("loop.config.json"), jload("asset/scale-objectif.json")

# guardrail sanity
if not (1 <= cfg.get("max_iterations", 0) <= 100):
    errors.append("max_iterations should be within [1, 100]")
if cfg.get("stagnation_rounds", 0) >= cfg.get("max_iterations", 1):
    errors.append("stagnation_rounds must be < max_iterations")
if not (0 <= cfg.get("doubt_threshold_pct", -1) <= 100):
    errors.append("doubt_threshold_pct must be within [0, 100]")
if not (0 < cfg.get("success_threshold_pct", 0) <= 100):
    errors.append("success_threshold_pct must be within (0, 100]")

# thresholds must agree between config and scoring grid
if cfg.get("success_threshold_pct") != scale.get("success_threshold_pct"):
    errors.append("success_threshold_pct differs between loop.config.json and scale-objectif.json")

# every enabled HTL trigger must be one of the 5 canonical ones
CANON = {"ambiguity", "irreversible_action", "sensitive_data", "subjective_judgment", "budget_exhausted"}
extra = set(cfg.get("htl_triggers", {})) - CANON
if extra:
    errors.append(f"unknown HTL triggers: {sorted(extra)}")
disabled = [k for k, v in cfg.get("htl_triggers", {}).items() if not v]
for k in disabled:
    warnings.append(f"HTL trigger '{k}' is disabled — make sure that is intentional")

# soft criteria must reference a marker; AGENT.md must mention verification modes
for cr in scale.get("criteria", []):
    if cr.get("verification_mode") == "soft" and not cr.get("validated_marker"):
        errors.append(f"soft criterion '{cr.get('id')}' missing validated_marker")
agent = read("AGENT.md")
if "deterministic" not in agent or "soft" not in agent:
    warnings.append("AGENT.md does not document the two verification modes")

# orchestration coherence
orch = cfg.get("orchestration", {})
if orch.get("pattern") not in ("single", "fanout", "sequential", "mixed"):
    errors.append("orchestration.pattern must be single|fanout|sequential|mixed")
if orch.get("pattern") != "single" and not orch.get("sub_agents"):
    errors.append(f"pattern '{orch.get('pattern')}' declared but no sub_agents listed")
if orch.get("pattern") == "single" and orch.get("sub_agents"):
    warnings.append("sub_agents listed but pattern is 'single' — they will not run")

# profile-specific coherence
lt = cfg.get("loop_type")
if lt == "temporal" and not cfg.get("temporal", {}).get("trigger_cmd"):
    warnings.append("loop_type=temporal but temporal.trigger_cmd is empty — the loop will run immediately instead of waiting on events")
if lt == "proactive" and not cfg.get("proactive", {}).get("watch_seconds"):
    warnings.append("loop_type=proactive but proactive.watch_seconds=0 — behaves exactly like goal_based")
for i, t in enumerate(cfg.get("escalation_ladder", [])):
    if not t.get("agent_cmd"):
        errors.append(f"escalation_ladder[{i}] has no agent_cmd — an empty tier cannot escalate anything")

for w in warnings: print("  ⚠", w)
if errors:
    print("COHERENCE: FAIL")
    for e in errors: print("  ✗", e)
    sys.exit(1)
print("COHERENCE: OK")
`;
}

function fileBundleReadme(c) {
  return `# ${c.name} — loop-engineering agent

Generated by **Finta Loop Forge**. This is not a persona file: it is an
executable loop architecture. A persona tells an agent who to be — this
bundle tells it **how to finish**, with guardrails enforced in code.

## Layout
\`\`\`
${c.name}/
├── AGENT.md                  # orchestrator contract (identity, scope, cycle, HTL)
├── loop.config.json          # loop_type, guardrails, budgets, orchestration
├── memory/
│   ├── memory.md             # permanent memory (never auto-purged)
│   ├── memory_temp.md        # incident buffer (purged at RESOLVED)
│   └── exchange.md           # inter-agent JSON-lines bus
├── asset/
│   ├── scale-objectif.json   # scoring grid — deterministic & soft criteria
│   ├── loop-engineering.md
│   ├── subagents-workflow.md
│   ├── memory-temp-management.md
│   └── guide-formatage.md
├── skills/                   # created on the fly by the agent, reused after
└── script/
    ├── loop_runner.py        # the runtime — guardrails enforced here
    ├── validate-structure.py
    └── validate-coherence.py
\`\`\`

## Quick start
\`\`\`bash
python3 script/validate-structure.py    # bundle is well-formed?
python3 script/validate-coherence.py    # config values agree?
python3 script/loop_runner.py "your task here"
\`\`\`

Wire your LLM in \`loop.config.json → agent_cmd\`
(e.g. \`claude -p "{prompt}"\`). Empty = evaluate-only mode.

Exit codes: **0** RESOLVED · **2** HTL (a human takes over, \`memory_temp.md\`
preserved) · **3** CLARIFY (answer, persist, re-run) · **5** turn done, not
resolved (turn_by_turn: re-run to continue) · **6** awaiting confirmation
(human_validated: re-run with \`--confirm\`).

The loop profile (\`loop_type\`) changes runtime behavior: \`turn_by_turn\` runs
one iteration per invocation; \`human_validated\` dry-runs until \`--confirm\`;
\`temporal\` waits on \`temporal.trigger_cmd\` between iterations; \`proactive\`
keeps watching after RESOLVED and re-enters on regression. \`escalation_ladder\`
retries a BLOCKED task with stronger (costlier) model tiers before HTL —
cheap models first, human last.

Everything is plain text + simple JSON — editable by a human, interpretable
by any LLM. Nothing here is locked to one model.
`;
}

function fileBootstrapPrompt(c) {
  return `You are bootstrapping the loop-engineering agent "${c.name}" in this project.

Create the following folder structure with EXACTLY the file contents provided in
the attached bundle (or reproduce them from AGENT.md if pasted inline):
${c.name}/ — AGENT.md, loop.config.json, memory/ (memory.md, memory_temp.md,
exchange.md), asset/ (scale-objectif.json, loop-engineering.md,
subagents-workflow.md, memory-temp-management.md, guide-formatage.md),
skills/, script/ (loop_runner.py, validate-structure.py, validate-coherence.py).

Then operate under this contract:
1. BOOTSTRAP: your scope is locked by AGENT.md. Never widen it yourself.
2. CONTEXT: restate objective, scope, inputs/outputs, constraints, risks and
   success criteria. If your doubt exceeds ${c.guard.doubt_threshold_pct}%, ask ONE targeted
   question (CLARIFY) and wait; persist the answer in memory/memory.md.
3. LOOP_DESIGN: for each step define objective, preconditions, tools, test,
   diagnostic and proof — before executing anything.
4. EXECUTION: work in small verified increments. After each increment evaluate
   every criterion in asset/scale-objectif.json per its verification_mode:
   deterministic → run the command, exit 0 = pass; soft → compare to the
   baseline validated in memory.md (marker "SOFT-VALIDATED: <id>"); if no
   baseline exists, CLARIFY — never guess.
5. On any bug: create memory_temp.md entry + checkpoint, ONE diagnosis, ONE
   atomic fix, retest (max ${c.guard.retest_max_attempts} attempts, then BLOCKED → tell the human what
   you tried), regression-test before declaring RESOLVED, then write the
   lesson to memory.md, archive resolved_<id>.json, purge memory_temp.md.
6. Guardrails: stop after ${c.guard.max_iterations} iterations, or ${c.guard.stagnation_rounds} rounds with no score
   progress, or when budgets are hit (${c.guard.time_budget_minutes || '∞'} min / ${c.guard.token_budget || '∞'} tokens).
   Escalate to the human (HTL) on: ${Object.entries(c.htl).filter(([, v]) => v).map(([k]) => k.replace(/_/g, ' ')).join(', ')}.
7. Orchestration pattern: ${c.pattern}.${c.subs.length ? ` Sub-agents (${c.subs.map(s => s.name).join(', ')}) coordinate ONLY through memory/exchange.md JSON lines; a failed sub-agent logs ECHEC there, gets one capped correction loop, then HTL.` : ''}
8. If a needed skill is missing from skills/, write it once as
   skills/<name>/skill.md (name < 64 chars, description < 255 chars, steps,
   success criteria) and REUSE it next time instead of regenerating.

Loop profile: ${c.profile} (${PROFILE_LABELS[c.profile]}).
Mission: ${c.goal}

Confirm the structure was created by running:
python3 ${c.name}/script/validate-structure.py && python3 ${c.name}/script/validate-coherence.py

Finally, VERIFY EVERY DETERMINISTIC COMMAND before trusting the loop: run each
"command" from asset/scale-objectif.json once in this project. A command that
errors for a wrong reason (typo, missing dependency, wrong path) makes every
future verification meaningless. Report each command's exit code to the user
and fix the config (not the command's target) if one is broken.
`;
}


function slugId(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'criterion';
}

function defaultConfig(overrides) {
  const base = {
    name: 'my-loop-agent',
    runtime: 'any',
    goal: '',
    scope: ['read the repo', 'run tests and linters', 'edit files inside its workspace'],
    forbid: ['modify the project scope itself', 'push to remote or deploy', 'delete files outside its workspace'],
    profile: 'goal_based',
    pattern: 'single',
    subs: [],
    criteria: [],
    htl: { ambiguity: true, irreversible_action: true, sensitive_data: true, subjective_judgment: true, budget_exhausted: true },
    guard: {
      max_iterations: 20, stagnation_rounds: 3, doubt_threshold_pct: 10,
      retest_max_attempts: 3, time_budget_minutes: 60, token_budget: 500000,
      rollback_on_regression: true, success_threshold_pct: 80,
    },
  };
  const c = Object.assign({}, base, overrides || {});
  c.htl = Object.assign({}, base.htl, (overrides || {}).htl || {});
  c.guard = Object.assign({}, base.guard, (overrides || {}).guard || {});
  c.criteria = (c.criteria || []).map(cr => Object.assign({ weight: 1, id: slugId(cr.label) }, cr));
  return c;
}

function buildLoopFiles(config) {
  const c = defaultConfig(config);
  const files = {
    'README.md': fileBundleReadme(c),
    'AGENT.md': fileAgentMd(c),
    'loop.config.json': fileLoopConfig(c),
    'memory/memory.md': fileMemory(c),
    'memory/memory_temp.md': fileMemoryTemp(c),
    'memory/exchange.md': fileExchange(c),
    'asset/scale-objectif.json': fileScaleObjectif(c),
    'asset/loop-engineering.md': fileLoopEngineering(c),
    'asset/subagents-workflow.md': fileSubagentsWorkflow(c),
    'asset/memory-temp-management.md': fileMemMgmt(),
    'asset/guide-formatage.md': fileGuideFormatage(),
    'script/loop_runner.py': fileLoopRunner(c),
    'script/validate-structure.py': fileValidateStructure(c),
    'script/validate-coherence.py': fileValidateCoherence(c),
    'BOOTSTRAP_PROMPT.md': fileBootstrapPrompt(c),
  };
  return { files, bootstrap: files['BOOTSTRAP_PROMPT.md'], config: c };
}

window.LoopForgeTemplates = { PROFILE_LABELS, defaultConfig, buildLoopFiles };

})();
