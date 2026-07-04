# Finta Bench — measured efficiency, not marketing numbers

This harness answers one question honestly: **what is your AI config actually
worth on your repo, with your model?** It runs identical tasks in two arms —
`bare` (config stripped) vs `configured` (config present) — and reports
pass rate, turns-to-pass, wall time and estimated tokens.

## Methodology (and its limits)

- **The judge is the task's own `check` command** (exit 0 = pass), never the
  agent's self-report.
- Each run gets a **fresh copy of the repo**; the bare arm strips
  `CLAUDE.md`, `.claude/`, `loop/`, `prompts/` and other tool configs.
- After a failed check the agent gets **one more turn with the failure
  output appended**, up to `--max-turns`. "Turns-to-pass" is the metric that
  best captures config value: fewer turns = less re-discovery and rework.
- **Medians, not means** — one hung run shouldn't flatter or tank an arm.
- Tokens are **estimated** (output chars / 4). For exact numbers, plug your
  agent CLI's own usage reporting into the JSONL afterwards.
- Results depend on your repo, tasks and model. A delta measured here is a
  claim about *this* setup — not a universal constant. Run `--repeats 3+`
  before believing any percentage.

## Run it

```bash
# Real measurement (needs your agent CLI, e.g. Claude Code):
python3 bench/run_bench.py \
  --tasks bench/tasks.example.json \
  --repo ~/code/your-project \
  --agent-cmd 'claude -p "{prompt}" --dangerously-skip-permissions' \
  --repeats 3 --max-turns 5 --out bench/results.jsonl

# Pipeline test without an agent (rows are marked mock:true):
python3 bench/run_bench.py --tasks bench/tasks.example.json \
  --repo . --mock --out bench/results.jsonl
```

Then open **`bench.html`** and load `bench/results-summary.json` (or the raw
JSONL) to see the comparison. Mock data is always labeled as demo data in the
dashboard — don't quote it.

## Writing good tasks

A good bench task is (1) representative of your real work, (2) judged by a
deterministic command, (3) solvable without network access, (4) small enough
to finish inside the timeout. 10–20 tasks give a usable signal; 3 give an
anecdote.
