/* ════════════════════════════════════════════════════════════════
   FINTA BENCH — results dashboard (client-side only)
   Accepts run_bench.py output: results-summary.json or raw .jsonl.
   Renders stat tiles, grouped horizontal bars (turns / tokens) and
   the full table. Chart colors are validated role tokens set in
   css/bench.css; identity is never color-alone (legend + direct
   labels + table view).
   ════════════════════════════════════════════════════════════════ */

'use strict';

const $ = id => document.getElementById(id);

/* Series: fixed assignment — color follows the arm, never its rank */
const SERIES = [
  { key: 'bare',       label: 'Bare (no config)', cssVar: 'var(--viz-bare)' },
  { key: 'configured', label: 'With config',      cssVar: 'var(--viz-configured)' },
];

let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3000);
}

/* ─── Parsing ───────────────────────────────────────────────── */
function median(vals) {
  if (!vals.length) return null;
  const s = [...vals].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function summarizeRows(rows) {
  const tasks = [...new Set(rows.map(r => r.task))].sort();
  const arms = [...new Set(rows.map(r => r.arm))].sort();
  const agg = sub => ({
    n: sub.length,
    pass_rate: sub.length ? +(sub.filter(r => r.pass).length / sub.length).toFixed(3) : null,
    med_turns: median((sub.filter(r => r.pass).length ? sub.filter(r => r.pass) : sub).map(r => r.turns)),
    med_tokens: median(sub.map(r => r.tokens_est)),
    med_wall_s: median(sub.map(r => r.wall_s)),
  });
  return {
    meta: { mock: rows.some(r => r.mock), repeats: '?', generated: rows[0]?.ts || '', fromJsonl: true },
    tasks: tasks.map(id => ({
      id,
      arms: Object.fromEntries(arms.map(a => [a, agg(rows.filter(r => r.task === id && r.arm === a))])),
    })),
    overall: Object.fromEntries(arms.map(a => [a, agg(rows.filter(r => r.arm === a))])),
  };
}

function parseInput(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith('{')) {
    const j = JSON.parse(trimmed);
    if (j.tasks && j.overall) return j;
    throw new Error('JSON is not a bench summary (expected keys: tasks, overall).');
  }
  const rows = trimmed.split('\n').filter(Boolean).map(l => JSON.parse(l));
  if (!rows.length || rows[0].task === undefined) throw new Error('JSONL rows missing "task" field.');
  return summarizeRows(rows);
}

/* ─── Tiles ─────────────────────────────────────────────────── */
function fmtPct(x) { return x === null || x === undefined ? '—' : Math.round(x * 100) + '%'; }
function delta(bare, conf) {
  if (!bare || conf === null || conf === undefined) return '';
  const d = (conf - bare) / bare * 100;
  const sign = d > 0 ? '+' : '−';
  return `${sign}${Math.abs(d).toFixed(0)}%`;
}

function renderTiles(sum) {
  const b = sum.overall.bare || {}, c = sum.overall.configured || {};
  const tiles = [
    { k: 'Pass rate', v: `${fmtPct(b.pass_rate)} → ${fmtPct(c.pass_rate)}`,
      s: 'bare → configured' },
    { k: 'Median turns to pass', v: `${b.med_turns ?? '—'} → ${c.med_turns ?? '—'}`,
      s: delta(b.med_turns, c.med_turns) ? `${delta(b.med_turns, c.med_turns)} with config` : '' },
    { k: 'Median tokens (est.)', v: `${(b.med_tokens ?? 0).toLocaleString()} → ${(c.med_tokens ?? 0).toLocaleString()}`,
      s: delta(b.med_tokens, c.med_tokens) ? `${delta(b.med_tokens, c.med_tokens)} with config` : '' },
    { k: 'Median wall time', v: `${b.med_wall_s ?? '—'}s → ${c.med_wall_s ?? '—'}s`,
      s: `n = ${(b.n || 0) + (c.n || 0)} runs total` },
  ];
  $('tiles').innerHTML = tiles.map(t =>
    `<div class="tile"><div class="k">${t.k}</div><div class="v">${t.v}</div><div class="s">${t.s}</div></div>`).join('');
}

/* ─── Grouped horizontal bar chart (SVG) ────────────────────── */
function renderChart(elId, sum, metric, unit) {
  const tasks = sum.tasks;
  const W = 920, LBL = 170, PAD_R = 90;
  const barH = 18, gap = 2, groupGap = 14, topPad = 26;
  const groupH = SERIES.length * barH + (SERIES.length - 1) * gap;
  const H = topPad + tasks.length * (groupH + groupGap) + 8;

  const vals = tasks.flatMap(t => SERIES.map(s => (t.arms[s.key] || {})[metric] || 0));
  const maxV = Math.max(1, ...vals);
  const x = v => LBL + (v / maxV) * (W - LBL - PAD_R);

  // ~4 round ticks
  const step = Math.pow(10, Math.floor(Math.log10(maxV / 3 || 1)));
  const tick = Math.ceil(maxV / 4 / step) * step;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${metric} per task, bare vs configured">`;
  for (let v = 0; v <= maxV; v += tick) {
    svg += `<line class="gridline" x1="${x(v)}" y1="${topPad - 8}" x2="${x(v)}" y2="${H - 6}"/>` +
           `<text class="tick" x="${x(v)}" y="${topPad - 12}" text-anchor="middle">${v.toLocaleString()}</text>`;
  }

  const hits = [];
  tasks.forEach((t, ti) => {
    const gy = topPad + ti * (groupH + groupGap);
    svg += `<text class="tasklbl" x="${LBL - 12}" y="${gy + groupH / 2 + 4}" text-anchor="end">${t.id}</text>`;
    SERIES.forEach((s, si) => {
      const a = t.arms[s.key];
      if (!a) return;
      const v = a[metric] || 0;
      const y = gy + si * (barH + gap);
      const w = Math.max(2, x(v) - LBL);
      const failed = a.pass_rate === 0;
      // 4px rounded data-end, flat at the baseline: rounded rect + square patch on the left
      svg += `<g class="bar" data-tip="${t.id} · ${s.label}&#10;${metric === 'med_turns' ? 'median turns' : 'median ' + unit}: ${v.toLocaleString()}&#10;pass rate: ${fmtPct(a.pass_rate)} · n=${a.n}">` +
        `<rect x="${LBL}" y="${y}" width="${w}" height="${barH}" rx="4" style="fill:${s.cssVar}${failed ? ';fill-opacity:.25;stroke:' + s.cssVar + ';stroke-dasharray:3 3' : ''}"/>` +
        (w > 8 ? `<rect x="${LBL}" y="${y}" width="4" height="${barH}" style="fill:${s.cssVar}${failed ? ';fill-opacity:.25' : ''}"/>` : '') +
        (failed
          ? `<text class="faillbl" x="${x(v) + 8}" y="${y + barH / 2 + 4}">✗ never passed (n=${a.n})</text>`
          : `<text class="vallbl" x="${x(v) + 8}" y="${y + barH / 2 + 4}">${v.toLocaleString()}${metric === 'med_turns' ? '' : ' ' + unit}</text>`) +
        `</g>`;
      hits.push(null);
    });
  });
  svg += '</svg>';
  $(elId).innerHTML = svg;

  // hover tooltips (hit target = whole group element, larger than the mark)
  const tip = $('viz-tip');
  $(elId).querySelectorAll('.bar').forEach(g => {
    g.addEventListener('mousemove', e => {
      tip.hidden = false;
      tip.textContent = '';
      g.dataset.tip.split('\n').forEach((line, i) => {
        if (i) tip.appendChild(document.createElement('br'));
        tip.appendChild(document.createTextNode(line));
      });
      tip.style.left = Math.min(e.clientX + 14, window.innerWidth - 280) + 'px';
      tip.style.top = (e.clientY + 14) + 'px';
    });
    g.addEventListener('mouseleave', () => { tip.hidden = true; });
  });
}

function renderLegend(elId) {
  $(elId).innerHTML = SERIES.map(s =>
    `<span class="li"><span class="sw" style="background:${s.cssVar}"></span>${s.label}</span>`).join('');
}

/* ─── Table ─────────────────────────────────────────────────── */
function renderTable(sum) {
  const head = `<tr><th>Task</th><th>Arm</th><th>n</th><th>Pass rate</th><th>Med. turns</th><th>Med. tokens</th><th>Med. wall (s)</th></tr>`;
  const rows = sum.tasks.flatMap(t => SERIES.filter(s => t.arms[s.key]).map(s => {
    const a = t.arms[s.key];
    const fail = a.pass_rate === 0;
    return `<tr><td>${t.id}</td>` +
      `<td><span class="arm-dot" style="background:${s.cssVar}"></span>${s.label}</td>` +
      `<td>${a.n}</td><td class="${fail ? 'fail' : ''}">${fail ? '✗ ' : ''}${fmtPct(a.pass_rate)}</td>` +
      `<td>${a.med_turns ?? '—'}</td><td>${(a.med_tokens ?? 0).toLocaleString()}</td><td>${a.med_wall_s ?? '—'}</td></tr>`;
  }));
  const o = sum.overall;
  const overall = SERIES.filter(s => o[s.key]).map(s => {
    const a = o[s.key];
    return `<tr style="font-weight:600"><td>ALL (median)</td>` +
      `<td><span class="arm-dot" style="background:${s.cssVar}"></span>${s.label}</td>` +
      `<td>${a.n}</td><td>${fmtPct(a.pass_rate)}</td><td>${a.med_turns ?? '—'}</td>` +
      `<td>${(a.med_tokens ?? 0).toLocaleString()}</td><td>${a.med_wall_s ?? '—'}</td></tr>`;
  });
  $('bench-table').innerHTML = head + rows.join('') + overall.join('');
}

/* ─── Render all ────────────────────────────────────────────── */
function renderReport(sum) {
  $('report').hidden = false;
  $('mock-banner').hidden = !sum.meta?.mock;
  const m = sum.meta || {};
  $('meta-line').textContent =
    `Repo: ${m.repo || 'unknown'}${m.label ? ' · model: ' + m.label : ''} · repeats: ${m.repeats ?? '?'} · max turns: ${m.max_turns ?? '?'} · generated: ${m.generated || '?'}` +
    (m.fromJsonl ? ' · aggregated client-side from raw JSONL' : '');
  renderTiles(sum);
  renderLegend('legend-1'); renderLegend('legend-2');
  renderChart('chart-turns', sum, 'med_turns', 'turns');
  renderChart('chart-tokens', sum, 'med_tokens', 'tok');
  renderTable(sum);
  $('report').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Inputs ────────────────────────────────────────────────── */
$('file-in').addEventListener('change', async e => {
  const f = e.target.files[0];
  if (!f) return;
  try { renderReport(parseInput(await f.text())); }
  catch (err) { toast('Could not parse file: ' + err.message); }
});

$('load-sample').addEventListener('click', async () => {
  try {
    const r = await fetch('bench/sample-results-summary.json');
    renderReport(await r.json());
  } catch (err) { toast('Sample data not found (bench/sample-results-summary.json).'); }
});

$('yr').textContent = new Date().getFullYear();
