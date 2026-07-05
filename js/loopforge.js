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

const PROFILE_LABELS = window.LoopForgeTemplates.PROFILE_LABELS;

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
      <input class="input mono" data-k="cmd" placeholder="own agent_cmd (optional — e.g. cheaper model)" value="${esc(s.cmd || '')}" title="Shell template invoking this sub-agent's own model, {prompt} substituted. Empty = inherit the global agent_cmd.">
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
   GENERATION UI
   ════════════════════════════════════════════════════════════════ */
let FILES = {};
let BOOT = '';
let activeFile = '';

function generate() {
  const c = collect();
  const built = LoopForgeTemplates.buildLoopFiles(c);
  FILES = built.files;
  BOOT = built.bootstrap;

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
