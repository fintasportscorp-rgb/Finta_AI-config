/* ════════════════════════════════════════════════════════════════
   FINTA 2040 — LOOP FORGE ENGINE
   Builds an executable agent-loop architecture from 6 wizard steps:
   identity → loop profile → guardrails → HTL → verification →
   orchestration → generated bundle (ZIP + bootstrap prompt).

   Blueprint: the loop-engineering diagrams (recursive agent cycle,
   emergency brakes, sub-agent patterns + exchange bus, 5 loop
   profiles, two-mode verification).
   ════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── State ─────────────────────────────────────────────────── */
const S = {
  step: 0,
  tree: { recurring: null, measurable: null, temporal: null, stable: null },
  profile: null,
  profileFromTree: false,
  pattern: 'single',
  criteria: [
    { label: 'Test suite passes', mode: 'deterministic', check: 'python -m pytest -q', weight: 3 },
    { label: 'Output matches the agreed spec', mode: 'soft', check: 'Compare result to the spec validated with the user (memory.md)', weight: 2 },
  ],
  subs: [],
};

const PROFILE_LABELS = {
  turn_by_turn: 'Turn-by-turn',
  goal_based: 'Goal-based',
  temporal: 'Temporal',
  proactive: 'Proactive',
  human_validated: 'Simplified + human validation',
};

const $ = id => document.getElementById(id);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ─── Toast ─────────────────────────────────────────────────── */
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ─── Step navigation ───────────────────────────────────────── */
const LAST = 6;
function gotoStep(n) {
  if (n < 0 || n > LAST) return;
  // Validation gates
  if (n > 0 && !$('f-name').value.trim()) { toast('Give your agent a name first.'); return; }
  if (n > 1 && !S.profile) { toast('Pick a loop profile (or answer the questions).'); return; }
  if (n > 4 && S.criteria.length === 0) { toast('Add at least one verification criterion.'); return; }
  S.step = n;
  $$('.forge-step').forEach(p => { p.hidden = +p.dataset.panel !== n; });
  $$('#steprail li').forEach(li => {
    const i = +li.dataset.step;
    li.classList.toggle('on', i === n);
    li.classList.toggle('done', i < n);
  });
  $('nav-prev').disabled = n === 0;
  $('nav-next').textContent = n === LAST - 1 ? 'Generate ⟳' : (n === LAST ? 'Regenerate ⟳' : 'Next →');
  if (n === LAST) generate();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
$('nav-prev').addEventListener('click', () => gotoStep(S.step - 1));
$('nav-next').addEventListener('click', () => gotoStep(S.step + 1));
$$('#steprail li').forEach(li => li.addEventListener('click', () => gotoStep(+li.dataset.step)));

/* ─── Step 1 · decision tree (5 loop profiles) ──────────────── */
function decideProfile() {
  const t = S.tree;
  if (t.recurring === 'no') {
    if (t.measurable === null) return null;
    return t.measurable === 'yes' ? 'goal_based' : 'turn_by_turn';
  }
  if (t.recurring === 'yes') {
    if (t.temporal === 'yes') return 'temporal';
    if (t.temporal === 'no') {
      if (t.stable === null) return null;
      return t.stable === 'yes' ? 'proactive' : 'human_validated';
    }
  }
  return null;
}

function refreshTree() {
  $('q-measurable').hidden = S.tree.recurring !== 'no';
  $('q-temporal').hidden = S.tree.recurring !== 'yes';
  $('q-stable').hidden = !(S.tree.recurring === 'yes' && S.tree.temporal === 'no');
  const rec = decideProfile();
  $$('#profile-grid .opt-card').forEach(c => {
    c.classList.toggle('rec', c.dataset.profile === rec);
  });
  if (rec) {
    selectProfile(rec, true);
    $('profile-hint').textContent =
      `Recommendation: ${PROFILE_LABELS[rec]} — start with the simplest loop that fits; add autonomy only once the proof of success is reliable.`;
  }
}

[['q-recurring','recurring'],['q-measurable','measurable'],['q-temporal','temporal'],['q-stable','stable']]
.forEach(([qid, key]) => {
  $$(`#${qid} .opt-mini`).forEach(btn => btn.addEventListener('click', () => {
    S.tree[key] = btn.dataset.v;
    $$(`#${qid} .opt-mini`).forEach(b => b.classList.toggle('sel', b === btn));
    if (key === 'recurring') { S.tree.measurable = S.tree.temporal = S.tree.stable = null;
      $$('#q-measurable .opt-mini, #q-temporal .opt-mini, #q-stable .opt-mini').forEach(b => b.classList.remove('sel')); }
    refreshTree();
  }));
});

function selectProfile(p, fromTree = false) {
  S.profile = p;
  S.profileFromTree = fromTree;
  $$('#profile-grid .opt-card').forEach(c => c.classList.toggle('sel', c.dataset.profile === p));
}
$$('#profile-grid .opt-card').forEach(c =>
  c.addEventListener('click', () => {
    selectProfile(c.dataset.profile, false);
    $('profile-hint').textContent = `Selected: ${PROFILE_LABELS[c.dataset.profile]}.`;
  }));

/* ─── Step 2 · guardrails ───────────────────────────────────── */
function wireRange(id, out, fmt = v => v) {
  const el = $(id);
  const paint = () => {
    $(out).textContent = fmt(el.value);
    const p = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.setProperty('--fill', p + '%');
  };
  el.addEventListener('input', paint);
  paint();
}
wireRange('f-iter', 'o-iter');
wireRange('f-stag', 'o-stag');
wireRange('f-doubt', 'o-doubt', v => v + '%');
wireRange('f-retry', 'o-retry');
wireRange('f-thresh', 'o-thresh', v => v + '%');

/* check-pill highlight sync */
$$('.check-pill input').forEach(cb =>
  cb.addEventListener('change', () => cb.closest('.check-pill').classList.toggle('on', cb.checked)));

/* ─── Step 4 · verification criteria ────────────────────────── */
function renderCriteria() {
  const list = $('crit-list');
  list.innerHTML = '';
  S.criteria.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'crit-row' + (c.mode === 'soft' ? ' mode-soft' : '');
    row.innerHTML = `
      <input class="input" data-k="label" placeholder="Criterion" value="${esc(c.label)}">
      <select class="input" data-k="mode">
        <option value="deterministic" ${c.mode === 'deterministic' ? 'selected' : ''}>deterministic</option>
        <option value="soft" ${c.mode === 'soft' ? 'selected' : ''}>soft</option>
      </select>
      <input class="input mono" data-k="check" placeholder="${c.mode === 'deterministic' ? 'command, exit 0 = pass' : 'spec reference'}" value="${esc(c.check)}">
      <button class="del" title="Remove" aria-label="Remove">✕</button>
      <span class="mode-note">${c.mode === 'deterministic'
        ? 'Binary check — the runner executes the command; exit code 0 means pass. No ambiguity.'
        : 'Judgment check — validated once with you, then applied autonomously. Until validated, it triggers CLARIFY, never a guess.'}</span>`;
    row.querySelectorAll('[data-k]').forEach(inp =>
      inp.addEventListener('change', () => { c[inp.dataset.k] = inp.value; if (inp.dataset.k === 'mode') renderCriteria(); }));
    row.querySelector('.del').addEventListener('click', () => { S.criteria.splice(i, 1); renderCriteria(); });
    list.appendChild(row);
  });
}
$('crit-add').addEventListener('click', () => {
  S.criteria.push({ label: '', mode: 'deterministic', check: '', weight: 1 });
  renderCriteria();
});

/* ─── Step 5 · orchestration ────────────────────────────────── */
const DEFAULT_SUBS = {
  fanout: [
    { name: 'coding-agent', role: 'Code sections, tests, dependencies', group: 'parallel' },
    { name: 'skillmaker-agent', role: 'Skill generation, structure, files', group: 'parallel' },
  ],
  sequential: [
    { name: 'audit-agent', role: 'Detect gaps and missing pieces', group: 'sequential' },
    { name: 'test-agent', role: 'Run behavioral test scenarios', group: 'sequential' },
  ],
  mixed: [
    { name: 'coding-agent', role: 'Code sections, tests, dependencies', group: 'parallel' },
    { name: 'skillmaker-agent', role: 'Skill generation, structure, files', group: 'parallel' },
    { name: 'audit-agent', role: 'Detect gaps and missing pieces', group: 'sequential' },
    { name: 'test-agent', role: 'Run behavioral test scenarios', group: 'sequential' },
  ],
};

$$('.pattern-grid .opt-card').forEach(c => c.addEventListener('click', () => {
  S.pattern = c.dataset.pattern;
  $$('.pattern-grid .opt-card').forEach(x => x.classList.toggle('sel', x === c));
  $('subagents-zone').hidden = S.pattern === 'single';
  if (S.pattern !== 'single' && S.subs.length === 0) {
    S.subs = (DEFAULT_SUBS[S.pattern] || []).map(s => ({ ...s }));
  }
  renderSubs();
}));

function renderSubs() {
  const list = $('sub-list');
  list.innerHTML = '';
  S.subs.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'sub-row';
    row.innerHTML = `
      <input class="input mono" data-k="name" placeholder="sub-agent-name" value="${esc(s.name)}">
      <input class="input" data-k="role" placeholder="What it does" value="${esc(s.role)}">
      <select class="input" data-k="group" ${S.pattern !== 'mixed' ? 'disabled' : ''}>
        <option value="parallel" ${s.group === 'parallel' ? 'selected' : ''}>parallel</option>
        <option value="sequential" ${s.group === 'sequential' ? 'selected' : ''}>sequential</option>
      </select>
      <button class="del" title="Remove" aria-label="Remove">✕</button>`;
    row.querySelectorAll('[data-k]').forEach(inp =>
      inp.addEventListener('change', () => { s[inp.dataset.k] = inp.value; }));
    row.querySelector('.del').addEventListener('click', () => { S.subs.splice(i, 1); renderSubs(); });
    list.appendChild(row);
  });
}
$('sub-add').addEventListener('click', () => {
  S.subs.push({ name: '', role: '', group: S.pattern === 'sequential' ? 'sequential' : 'parallel' });
  renderSubs();
});

/* ─── Helpers ───────────────────────────────────────────────── */
function esc(s) { return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'criterion'; }
function lines(id) { return $(id).value.split('\n').map(l => l.trim()).filter(Boolean); }

function collect() {
  const htl = {};
  $$('#htl-grid input[data-htl]').forEach(cb => { htl[cb.dataset.htl] = cb.checked; });
  return {
    name: $('f-name').value.trim() || 'my-loop-agent',
    runtime: $('f-model').value,
    goal: $('f-goal').value.trim(),
    scope: lines('f-scope'),
    forbid: lines('f-forbid'),
    profile: S.profile || 'human_validated',
    pattern: S.pattern,
    subs: S.subs.filter(s => s.name.trim()),
    criteria: S.criteria.filter(c => c.label.trim()).map(c => ({ ...c, id: slug(c.label) })),
    htl,
    guard: {
      max_iterations: +$('f-iter').value,
      stagnation_rounds: +$('f-stag').value,
      doubt_threshold_pct: +$('f-doubt').value,
      retest_max_attempts: +$('f-retry').value,
      time_budget_minutes: +$('f-time').value || 0,
      token_budget: +$('f-token').value || 0,
      rollback_on_regression: $('f-rollback').checked,
      success_threshold_pct: +$('f-thresh').value,
    },
  };
}

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
    orchestration: {
      pattern: c.pattern,
      sub_agents: c.subs.map(s => ({ name: s.name, role: s.role, group: c.pattern === 'mixed' ? s.group : (c.pattern === 'sequential' ? 'sequential' : 'parallel') })),
      exchange_bus: 'memory/exchange.md',
    },
    agent_cmd: "",
    _comment_agent_cmd: "Optional: shell command template that invokes your LLM agent for one loop turn, e.g. 'claude -p \"{prompt}\"'. Empty = evaluate-only mode (deterministic criteria still run).",
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
"""loop_runner.py — minimal loop-engineering runtime for '${c.name}'.

Enforces in code (not prose):
  * max_iterations cap
  * stagnation stop (N rounds without score progress)
  * time / token budgets
  * two-mode verification (deterministic commands / soft spec validations)
  * HTL escalation triggers
  * optional git checkpoint + rollback on regression

Stdlib only. Exit codes: 0 RESOLVED · 2 HTL/BLOCKED · 3 CLARIFY needed.
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

def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    append("memory/memory_temp.md", line + "\\n")

def htl(trigger, question):
    """Human-To-Loop: stop and hand control back."""
    enabled = CFG.get("htl_triggers", {}).get(trigger, True)
    log(f"HTL[{trigger}] {'(enabled)' if enabled else '(trigger disabled — stopping anyway: stop must be guaranteed)'}")
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

def run_agent(task, iteration):
    """One work turn. If agent_cmd is configured, call the LLM agent;
    otherwise evaluate-only mode (useful to wire the loop first)."""
    tpl = CFG.get("agent_cmd", "")
    if not tpl:
        log("agent_cmd empty → evaluate-only turn")
        return ""
    prompt = (f"Iteration {iteration}. Task: {task}. "
              f"Respect AGENT.md scope. If doubt > {CFG.get('doubt_threshold_pct', 10)}% "
              f"output [CLARIFY] <question>. For escalation output [HTL:<trigger>] <reason>.")
    cmd = tpl.replace("{prompt}", prompt.replace('"', "'"))
    r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True,
                       timeout=3600)
    out = (r.stdout or "") + (r.stderr or "")
    m = HTL_MARK.search(out)
    if m:
        htl(m.group(1).lower(), m.group(2) or "agent requested escalation")
    m = CLARIFY_MARK.search(out)
    if m:
        clarify(m.group(1))
    return out

def bus_write(entry):
    append("memory/exchange.md", json.dumps(entry, ensure_ascii=False) + "\\n")

def run_sub(sub, task):
    bus_write({"session_id": SESSION, "source_agent": "orchestrator",
               "target_agent": sub["name"], "task": task,
               "inputs": [], "outputs": [], "status": "EN_COURS"})
    try:
        out = run_agent(f"[{sub['name']}] {sub['role']} — {task}", 0)
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
        run_agent(task, 0)
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

# ── main loop ───────────────────────────────────────────────────
def main():
    task = " ".join(sys.argv[1:]) or "Advance the mission defined in AGENT.md."
    goal = read("AGENT.md")
    if "## Mission" not in goal:
        clarify("AGENT.md has no Mission section — define the verifiable objective first.")

    max_iter   = int(CFG.get("max_iterations", 20))
    stag_n     = int(CFG.get("stagnation_rounds", 3))
    threshold  = float(SCALE.get("success_threshold_pct", CFG.get("success_threshold_pct", 80)))
    t_budget   = float(CFG.get("time_budget_minutes", 0)) * 60
    tok_budget = int(CFG.get("token_budget", 0))
    t0, tokens_used = time.time(), 0
    history, best, best_sha = [], -1.0, None

    append("memory/memory_temp.md", f"\\n## session {SESSION} — {time.strftime('%Y-%m-%d %H:%M')}\\n")
    log(f"BOOTSTRAP ok · profile={CFG.get('loop_type')} · task: {task}")

    for i in range(1, max_iter + 1):
        log(f"— iteration {i}/{max_iter} —")
        # budgets (emergency brakes)
        if t_budget and time.time() - t0 > t_budget:
            htl("budget_exhausted", f"Time budget ({CFG['time_budget_minutes']} min) reached at iteration {i}.")
        if tok_budget and tokens_used > tok_budget:
            htl("budget_exhausted", f"Token budget (~{tok_budget}) reached at iteration {i}.")

        out = ""
        try:
            if i == 1 and CFG.get("orchestration", {}).get("pattern", "single") != "single":
                orchestrate(task)
            else:
                out = run_agent(task, i)
        except subprocess.TimeoutExpired:
            log("agent turn timed out")
        tokens_used += len(out) // 4  # rough estimate

        s = score()
        history.append(s)

        if s >= threshold:
            sha = checkpoint(i)
            log(f"RESOLVED · score {s}% ≥ {threshold}%")
            append("memory/memory.md",
                   f"\\n- {time.strftime('%Y-%m-%d')} session {SESSION}: RESOLVED '{task}' at {s}% in {i} iteration(s).\\n")
            with open(os.path.join(ROOT, f"resolved_{SESSION}.json"), "w", encoding="utf-8") as f:
                json.dump({"session": SESSION, "task": task, "score": s,
                           "iterations": i, "checkpoint": sha}, f, indent=2)
            open(os.path.join(ROOT, "memory/memory_temp.md"), "w", encoding="utf-8").write(
                "# memory_temp.md — purged after RESOLVED\\n")
            sys.exit(0)

        # regression → rollback to last healthy checkpoint
        if s < best and rollback(best_sha):
            history.append(best)
        elif s > best:
            best, best_sha = s, checkpoint(i)

        # stagnation brake
        if len(history) >= stag_n and len(set(history[-stag_n:])) == 1:
            htl("ambiguity", f"No score progress for {stag_n} rounds (stuck at {s}%). A human should look.")

    htl("budget_exhausted", f"Iteration cap ({max_iter}) reached — best score {best}%.")

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
preserved) · **3** CLARIFY (answer the question, persist it, re-run).

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
`;
}

/* ════════════════════════════════════════════════════════════════
   GENERATION UI
   ════════════════════════════════════════════════════════════════ */
let FILES = {};
let BOOT = '';
let activeFile = '';

function generate() {
  const c = collect();
  FILES = {
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
  BOOT = FILES['BOOTSTRAP_PROMPT.md'];

  const soft = c.criteria.filter(x => x.mode === 'soft').length;
  const det = c.criteria.length - soft;
  $('gen-summary').innerHTML =
    `<b>${esc(c.name)}</b> · ${PROFILE_LABELS[c.profile]} loop · ${c.guard.max_iterations} iterations max · ` +
    `${det} deterministic + ${soft} soft criteria · stop at ${c.guard.success_threshold_pct}% · ` +
    `pattern: ${c.pattern}${c.subs.length ? ` (${c.subs.length} sub-agents)` : ''} · ` +
    `${Object.values(c.htl).filter(Boolean).length}/5 HTL triggers armed.` +
    (c.goal ? '' : ' <span style="color:var(--warn)">⚠ No measurable mission set — the loop cannot prove completion.</span>');

  // file tree
  const tree = $('filetree');
  tree.innerHTML = '';
  const names = Object.keys(FILES);
  let lastDir = '';
  names.forEach(n => {
    const parts = n.split('/');
    if (parts.length > 1 && parts[0] !== lastDir) {
      lastDir = parts[0];
      const d = document.createElement('li');
      d.className = 'dir';
      d.textContent = parts[0] + '/';
      tree.appendChild(d);
    }
    if (parts.length === 1) lastDir = '';
    const li = document.createElement('li');
    li.textContent = (parts.length > 1 ? '  ' : '') + parts[parts.length - 1];
    li.dataset.file = n;
    li.addEventListener('click', () => showFile(n));
    tree.appendChild(li);
  });

  // tabs (key files)
  const tabs = $('gen-tabs');
  tabs.innerHTML = '';
  ['AGENT.md', 'loop.config.json', 'asset/scale-objectif.json', 'script/loop_runner.py', 'BOOTSTRAP_PROMPT.md']
    .forEach(n => {
      const b = document.createElement('button');
      b.textContent = n.split('/').pop();
      b.dataset.file = n;
      b.addEventListener('click', () => showFile(n));
      tabs.appendChild(b);
    });

  showFile('AGENT.md');
}

function showFile(name) {
  activeFile = name;
  $('gen-code').textContent = FILES[name];
  $$('#gen-tabs button').forEach(b => b.classList.toggle('on', b.dataset.file === name));
  $$('#filetree li').forEach(li => li.classList.toggle('on', li.dataset.file === name));
}

$('cp-file').addEventListener('click', async () => {
  await navigator.clipboard.writeText(FILES[activeFile] || '');
  toast(`Copied ${activeFile}`);
});
$('cp-boot').addEventListener('click', async () => {
  await navigator.clipboard.writeText(BOOT);
  toast('Bootstrap prompt copied — paste it into your AI assistant.');
});
$('dl-zip').addEventListener('click', async () => {
  const c = collect();
  const zip = new JSZip();
  const root = zip.folder(c.name);
  Object.entries(FILES).forEach(([path, content]) => root.file(path, content));
  root.folder('skills');
  const blob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${c.name}-loopforge.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Bundle downloaded. Run script/validate-structure.py first.');
});

/* ─── Boot ──────────────────────────────────────────────────── */
renderCriteria();
renderSubs();
$('yr').textContent = new Date().getFullYear();
