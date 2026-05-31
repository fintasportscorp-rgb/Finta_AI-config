// ─── MOBILE MENU ───
function toggleMobileMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('nav-mobile-menu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('nav-mobile-menu').classList.remove('open');
}

// ─── HERO TERMINAL BOOT SEQUENCE ───
const bootLines = [
  { text: '> initializing Finta v2.0...', cls: 'dim', delay: 100 },
  { text: '> loading catalog...', cls: 'dim', delay: 400 },
  { text: '[OK] 647 agents loaded from 12+ sources', cls: 'ok', delay: 700 },
  { text: '[OK] 1,611 skills indexed', cls: 'ok', delay: 870 },
  { text: '[OK] 128 commands indexed', cls: 'ok', delay: 1020 },
  { text: '[OK] scoring engine initialized', cls: 'ok', delay: 1180 },
  { text: '[OK] rule templates compiled', cls: 'ok', delay: 1340 },
  { text: '[OK] file generator ready', cls: 'ok', delay: 1490 },
  { text: '> connecting to configuration profiles...', cls: 'dim', delay: 1630 },
  { text: '[INFO] Fast (6q) / Advanced (14q) / Deep (24q)', cls: 'accent', delay: 1800 },
  { text: '[OK] all systems operational', cls: 'ok', delay: 1950 },
  { text: '> ready. awaiting project profile.', cls: '', delay: 2100 },
];

function runBootSequence() {
  const body = document.getElementById('terminal-body');
  if (!body) return;
  const cursor = document.getElementById('hero-cursor');

  bootLines.forEach(({ text, cls, delay }) => {
    setTimeout(() => {
      const line = document.createElement('span');
      line.className = `boot-line ${cls}`;
      line.textContent = text;
      body.insertBefore(line, cursor);
      // Animate in
      requestAnimationFrame(() => {
        line.style.transition = 'opacity 0.3s';
        line.style.opacity = '1';
      });
    }, delay);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(runBootSequence, 800);
});

// ─── NEURAL NETWORK VISUALIZATION ───
const NN_CAT_COLORS = {
  root:        '#7c6af7',  // purple      — project root
  dir:         '#22d3ee',  // cyan        — directories
  config:      '#ffb300',  // amber       — CLAUDE.md, settings.json
  util:        '#6e768a',  // slate       — .gitignore, .claudeignore
  rule_idx:    '#ffb300',  // amber       — rules/index.md (dispatch registry)
  rule_md:     '#f59e0b',  // amber-dark  — rule files
  agent_md:    '#818cf8',  // lavender    — agent files
  agent_more:  '#818cf8',  // lavender    — placeholder (dashed)
  skill_md:    '#a78bfa',  // light-purple— skill files
  command_md:  '#fb923c',  // orange      — command files
  doc_md:      '#fbbf24',  // gold        — doc files
  adr_md:      '#e879f9',  // fuchsia     — ADR / decisions
  bootstrap:   '#f0a500',  // deep-amber  — prompts/bootstrap-init.md
};

const NN_NODES_DATA = [

  // ── Root — true center ────────────────────────────────────────────
  { id:'root',         label:'my-project/',        cat:'root',       r:16, px:0.50, py:0.52, desc:'Project root — extract the ZIP here' },

  // ── Left branch: root-level config files ──────────────────────────
  //    Fan from upper-left to lower-left, filling the left edge
  { id:'claude-md',    label:'CLAUDE.md',           cat:'config',     r:11, px:0.22, py:0.35, desc:'Master AI briefing — auto-loaded every session' },
  { id:'claude-local', label:'CLAUDE.local.md',     cat:'config',     r: 7, px:0.14, py:0.52, desc:'Local context & session state — gitignored' },
  { id:'gitignore',    label:'.gitignore',           cat:'util',       r: 5, px:0.22, py:0.70, desc:'Ignores CLAUDE.local.md, .env, secrets' },

  // ── Bottom-left branch: prompts/ ──────────────────────────────────
  { id:'prompts-dir',  label:'prompts/',            cat:'dir',        r: 8, px:0.40, py:0.82, desc:'AI enrichment prompts directory' },
  { id:'bootstrap',    label:'bootstrap-init.md',   cat:'bootstrap',  r: 7, px:0.26, py:0.91, desc:'One-shot enrichment — paste once after install' },

  // ── Top branch: .claude/ hub ──────────────────────────────────────
  { id:'claude-dir',   label:'.claude/',             cat:'dir',        r:12, px:0.50, py:0.24, desc:'Claude Code configuration directory' },
  { id:'settings',     label:'settings.json',        cat:'config',     r: 5, px:0.34, py:0.14, desc:'Model, permissions & hooks config' },
  { id:'claudeignore', label:'.claudeignore',         cat:'util',       r: 5, px:0.41, py:0.09, desc:'Ignores node_modules, dist, .venv…' },

  // ── Top-center: rules/ — spread into upper strip ──────────────────
  { id:'rules-dir',    label:'rules/',               cat:'dir',        r:10, px:0.50, py:0.11, desc:'All rule files — always-loaded + lazy via frontmatter' },
  { id:'rule-index',   label:'index.md',             cat:'rule_idx',   r: 7, px:0.40, py:0.03, desc:'Dynamic dispatch registry — routes every rule' },
  { id:'rule-qg',      label:'quality-gates.md',     cat:'rule_md',    r: 5, px:0.47, py:0.02, desc:'Quality metrics & absolute prohibitions — ALWAYS LOADED' },
  { id:'rule-sec',     label:'security.md',          cat:'rule_md',    r: 5, px:0.54, py:0.03, desc:'OWASP top-10, no hardcoded secrets — ALWAYS LOADED' },
  { id:'rule-tdd',     label:'tdd-workflow.md',      cat:'rule_md',    r: 5, px:0.58, py:0.08, desc:'RED→GREEN→VALIDATE cycle, coverage thresholds' },
  { id:'rule-beh',     label:'behavior.md',          cat:'rule_md',    r: 5, px:0.60, py:0.15, desc:'Assistant behavior contract — ALWAYS LOADED' },
  { id:'rule-ctx',     label:'context-budget.md',    cat:'rule_md',    r: 5, px:0.59, py:0.21, desc:'Token economy & dreaming protocol — ALWAYS LOADED' },
  { id:'backend-dir',  label:'backend/',             cat:'dir',        r: 6, px:0.43, py:0.20, desc:'Backend sub-rules — lazy on api/** paths' },
  { id:'rule-api',     label:'api.md',               cat:'rule_md',    r: 5, px:0.36, py:0.28, desc:'REST conventions, error format, CORS, rate-limiting' },

  // ── Top-right: agents/ ────────────────────────────────────────────
  { id:'agents-dir',   label:'agents/',              cat:'dir',        r:10, px:0.68, py:0.14, desc:'Specialist agent .md files' },
  { id:'ag-backend',   label:'backend-dev.md',       cat:'agent_md',   r: 5, px:0.63, py:0.06, desc:'Backend & API specialist' },
  { id:'ag-security',  label:'security-expert.md',   cat:'agent_md',   r: 5, px:0.70, py:0.04, desc:'Security audit & OWASP specialist' },
  { id:'ag-tdd',       label:'tdd-expert.md',         cat:'agent_md',   r: 5, px:0.77, py:0.07, desc:'TDD, coverage & testing strategy' },
  { id:'ag-more',      label:'+agents…',             cat:'agent_more', r: 5, px:0.83, py:0.14, desc:'All agents selected via wizard scoring engine' },

  // ── Right-upper: skills/ ──────────────────────────────────────────
  { id:'skills-dir',   label:'skills/',              cat:'dir',        r: 8, px:0.74, py:0.28, desc:'Installed skill .md files — from catalog' },
  { id:'skill-file',   label:'{source}/skill.md',    cat:'skill_md',   r: 5, px:0.85, py:0.22, desc:'Reusable skill — source + subpath (dashed)' },

  // ── Right-center: commands/ ───────────────────────────────────────
  { id:'commands-dir', label:'commands/',            cat:'dir',        r: 9, px:0.68, py:0.42, desc:'Custom slash command .md definitions' },
  { id:'cmd-review',   label:'code-review.md',       cat:'command_md', r: 5, px:0.80, py:0.34, desc:'/code-review — full review with scoring' },
  { id:'cmd-test',     label:'test.md',              cat:'command_md', r: 5, px:0.82, py:0.44, desc:'/test — run & analyze test suite' },
  { id:'cmd-orch',     label:'orchestrate.md',       cat:'command_md', r: 5, px:0.78, py:0.53, desc:'/orchestrate — launch multi-agent workflow' },

  // ── Right branch: docs/ ───────────────────────────────────────────
  { id:'docs-dir',     label:'docs/',                cat:'dir',        r:10, px:0.82, py:0.62, desc:'Generated project documentation' },
  { id:'doc-arch',     label:'architecture.md',      cat:'doc_md',     r: 6, px:0.93, py:0.52, desc:'System architecture, components & diagrams' },
  { id:'doc-glossary', label:'glossary.md',          cat:'doc_md',     r: 5, px:0.96, py:0.63, desc:'Domain terms, acronyms & project glossary' },

  // ── Bottom-right: docs sub-trees fill lower-right corner ──────────
  { id:'decisions-dir',label:'decisions/',           cat:'dir',        r: 7, px:0.93, py:0.74, desc:'Architecture Decision Records folder' },
  { id:'adr-001',      label:'ADR-001.md',           cat:'adr_md',     r: 5, px:0.97, py:0.85, desc:'ADR-001 — first architecture decision' },
  { id:'adr-tpl',      label:'_template.md',         cat:'adr_md',     r: 4, px:0.88, py:0.87, desc:'ADR template for future decisions' },

  { id:'specs-dir',    label:'specs/',               cat:'dir',        r: 6, px:0.80, py:0.78, desc:'Project specs & business rules — if defined' },
  { id:'spec-file',    label:'{spec}/spec.md',       cat:'doc_md',     r: 4, px:0.80, py:0.90, desc:'Individual spec — title, rules, examples' },

  { id:'orch-dir',     label:'orchestrations/',      cat:'dir',        r: 6, px:0.70, py:0.74, desc:'Multi-agent orchestration blueprints' },
  { id:'orch-file',    label:'{name}.md',            cat:'doc_md',     r: 4, px:0.68, py:0.86, desc:'Orchestration spec — agents, roles, flow' },

];

const NN_EDGES_DATA = [
  // root → root-level files
  ['root', 'claude-md'],
  ['root', 'claude-local'],
  ['root', 'gitignore'],
  ['root', 'prompts-dir'],
  ['root', 'claude-dir'],
  ['root', 'docs-dir'],
  // prompts/ → files
  ['prompts-dir', 'bootstrap'],
  // .claude/ → sub-dirs + config files
  ['claude-dir', 'settings'],
  ['claude-dir', 'claudeignore'],
  ['claude-dir', 'rules-dir'],
  ['claude-dir', 'agents-dir'],
  ['claude-dir', 'skills-dir'],
  ['claude-dir', 'commands-dir'],
  // rules/ → files + sub-dir
  ['rules-dir', 'rule-index'],
  ['rules-dir', 'rule-qg'],
  ['rules-dir', 'rule-sec'],
  ['rules-dir', 'rule-beh'],
  ['rules-dir', 'rule-ctx'],
  ['rules-dir', 'rule-tdd'],
  ['rules-dir', 'backend-dir'],
  ['backend-dir', 'rule-api'],
  // agents/ → files
  ['agents-dir', 'ag-backend'],
  ['agents-dir', 'ag-security'],
  ['agents-dir', 'ag-tdd'],
  ['agents-dir', 'ag-more'],
  // skills/ → file
  ['skills-dir', 'skill-file'],
  // commands/ → files
  ['commands-dir', 'cmd-review'],
  ['commands-dir', 'cmd-test'],
  ['commands-dir', 'cmd-orch'],
  // docs/ → files + sub-dirs
  ['docs-dir', 'doc-arch'],
  ['docs-dir', 'doc-glossary'],
  ['docs-dir', 'decisions-dir'],
  ['docs-dir', 'specs-dir'],
  ['docs-dir', 'orch-dir'],
  // decisions/ → ADR files
  ['decisions-dir', 'adr-001'],
  ['decisions-dir', 'adr-tpl'],
  // specs/ → spec file
  ['specs-dir', 'spec-file'],
  // orchestrations/ → orch file
  ['orch-dir', 'orch-file'],
];

function initNeuralNet() {
  const canvas = document.getElementById('neural-net');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let nnRafId = null;
  let nnVisible = false;
  let nnLastTs = 0;

  const nodes = NN_NODES_DATA.map(d => ({
    ...d,
    phase: Math.random() * Math.PI * 2,
    speed: 0.45 + Math.random() * 0.55,
  }));

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  const edges = NN_EDGES_DATA.map(([sid, tid]) => {
    const s = nodeMap[sid], t = nodeMap[tid];
    const isMissing = t.cat === 'missing' || s.cat === 'missing';
    return {
      s, t, isMissing,
      particles: isMissing ? [] : [
        { t: Math.random(), speed: 0.0035 + Math.random() * 0.003 },
        { t: (Math.random() + 0.5) % 1, speed: 0.003 + Math.random() * 0.003 },
      ],
    };
  });

  function resize() {
    const parent = canvas.parentElement;
    W = parent.offsetWidth || 500;
    H = Math.max(400, Math.round(W * 0.88));
    canvas.width = W;
    canvas.height = H;
  }

  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas.parentElement);
  } else {
    window.addEventListener('resize', resize);
  }
  resize();

  let hovered = null;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    hovered = null;
    const now = performance.now();
    for (const n of nodes) {
      const p = getPos(n, now);
      if ((mx - p.x) ** 2 + (my - p.y) ** 2 < (n.r + 10) ** 2) {
        hovered = n;
        break;
      }
    }
    canvas.style.cursor = hovered ? 'pointer' : 'default';
  });
  canvas.addEventListener('mouseleave', () => { hovered = null; });

  function getPos(n, ts) {
    const amp = n.cat === 'root' ? 0 : 2.5;
    return {
      x: n.px * W + Math.sin(ts * 0.001 * n.speed + n.phase) * amp,
      y: n.py * H + Math.cos(ts * 0.001 * n.speed + n.phase * 1.5) * amp,
    };
  }

  function hexRgb(hex) {
    return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
  }

  function draw(ts) {
    if (!nnVisible) { nnRafId = null; return; }
    if (ts - nnLastTs < 33) { nnRafId = requestAnimationFrame(draw); return; }
    nnLastTs = ts;
    ctx.clearRect(0, 0, W, H);

    const pos = {};
    for (const n of nodes) pos[n.id] = getPos(n, ts);

    // ── Edges
    for (const e of edges) {
      const sp = pos[e.s.id], tp = pos[e.t.id];
      const sc = NN_CAT_COLORS[e.s.cat], tc = NN_CAT_COLORS[e.t.cat];
      const grad = ctx.createLinearGradient(sp.x, sp.y, tp.x, tp.y);
      grad.addColorStop(0, sc + (e.isMissing ? '40' : '55'));
      grad.addColorStop(1, tc + (e.isMissing ? '40' : '55'));

      ctx.save();
      if (e.isMissing) ctx.setLineDash([5, 6]);
      ctx.strokeStyle = grad;
      ctx.lineWidth = e.isMissing ? 1 : 1.5;
      ctx.beginPath();
      ctx.moveTo(sp.x, sp.y);
      ctx.lineTo(tp.x, tp.y);
      ctx.stroke();
      ctx.restore();

      // Flowing particles
      for (const p of e.particles) {
        p.t = (p.t + p.speed) % 1;
        const px = sp.x + (tp.x - sp.x) * p.t;
        const py = sp.y + (tp.y - sp.y) * p.t;
        ctx.save();
        ctx.globalAlpha = Math.sin(p.t * Math.PI) * 0.9;
        ctx.shadowColor = tc;
        ctx.shadowBlur = 8;
        ctx.fillStyle = tc;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Nodes
    for (const n of nodes) {
      const {x, y} = pos[n.id];
      const isHov = hovered === n;
      const pulse = 1 + 0.07 * Math.sin(ts * 0.002 * n.speed + n.phase);
      const r = n.r * pulse * (isHov ? 1.28 : 1);
      const color = NN_CAT_COLORS[n.cat];
      const [cr, cg, cb] = hexRgb(color);
      const isMissing = n.cat === 'missing' || n.cat === 'agent_more' || n.cat === 'skill_md';

      ctx.save();

      if (isMissing) {
        ctx.globalAlpha = isHov ? 0.7 : 0.45;
        ctx.shadowColor = color;
        ctx.shadowBlur = isHov ? 18 : 8;
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Outer glow halo
        ctx.globalAlpha = isHov ? 0.3 : 0.12;
        ctx.shadowColor = color;
        ctx.shadowBlur = isHov ? 28 : 16;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r * 1.9, 0, Math.PI * 2);
        ctx.fill();

        // Radial fill
        ctx.globalAlpha = 0.93;
        ctx.shadowBlur = 12;
        const g = ctx.createRadialGradient(x - r * 0.22, y - r * 0.22, 0, x, y, r);
        g.addColorStop(0,   `rgba(${cr},${cg},${cb},1)`);
        g.addColorStop(0.6, `rgba(${cr},${cg},${cb},0.88)`);
        g.addColorStop(1,   `rgba(${cr},${cg},${cb},0.35)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Specular
        ctx.globalAlpha = 0.32;
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(x - r * 0.24, y - r * 0.24, r * 0.33, r * 0.2, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Labels
      const alwaysShow = n.cat === 'root' || n.cat === 'dir' || n.cat === 'config' || n.cat === 'rule_idx' || n.cat === 'bootstrap';
      if (alwaysShow || isHov) {
        ctx.save();
        const fs = n.cat === 'root' ? 12 : 9;
        const fw = (n.cat === 'root' || n.cat === 'hub') ? 600 : 400;
        ctx.font = `${fw} ${fs}px 'JetBrains Mono', monospace`;
        const tw = ctx.measureText(n.label).width;
        // Clamp horizontally
        const lx = Math.max(tw / 2 + 3, Math.min(W - tw / 2 - 3, x));
        // Render below node, clamp to canvas bottom
        const lyBelow = y + r + 13;
        const ly = lyBelow + 2 > H ? y - r - 5 : lyBelow;

        ctx.globalAlpha = 0.45;
        ctx.fillStyle = '#000';
        ctx.fillRect(lx - tw / 2 - 3, ly - 10, tw + 6, 13);

        ctx.globalAlpha = isMissing ? 0.65 : (alwaysShow ? 0.92 : 1);
        ctx.fillStyle = n.cat === 'root' ? '#fff' : color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(n.label, lx, ly);
        ctx.restore();
      }
    }

    // ── Hover tooltip bar at top
    if (hovered) {
      const text = `${hovered.label}  ·  ${hovered.desc}`;
      ctx.save();
      ctx.font = '500 10px "JetBrains Mono", monospace';
      const tw = ctx.measureText(text).width;
      const tx = W / 2, ty = 20;
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#000';
      ctx.fillRect(tx - tw / 2 - 8, ty - 13, tw + 16, 18);
      ctx.globalAlpha = 1;
      ctx.fillStyle = NN_CAT_COLORS[hovered.cat];
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(text, tx, ty);
      ctx.restore();
    }

    nnRafId = requestAnimationFrame(draw);
  }

  new IntersectionObserver(function(entries) {
    nnVisible = entries[0].isIntersecting;
    if (nnVisible && !nnRafId) { nnLastTs = 0; nnRafId = requestAnimationFrame(draw); }
  }, { threshold: 0.01 }).observe(canvas.parentElement);
}

// ─── AGENT MARQUEE ───
const agents = [
  'code-reviewer','tdd-guide','security-auditor','architect','planner',
  'backend-developer','frontend-designer','python-expert','nodejs-expert',
  'react-expert','vue-expert','go-expert','rust-expert','typescript-expert',
  'django-expert','fastapi-expert','kubernetes-expert','docker-expert',
  'aws-architect','terraform-expert','ml-engineer','data-scientist',
  'database-optimizer','graphql-architect','api-designer','performance-optimizer',
  'accessibility-expert','mobile-developer','devops-engineer','incident-responder',
  'security-reviewer','code-archaeologist','tech-lead','product-manager',
  'ui-designer','ux-researcher','content-writer','seo-specialist',
  'refactor-cleaner','doc-updater','test-coverage','build-resolver',
  'ci-cd-specialist','microservices-architect','event-sourcing-expert',
  'redis-expert','postgresql-expert','mongodb-expert','elasticsearch-expert',
  'kafka-expert','nextjs-expert','nuxt-expert','angular-expert',
  'svelte-expert','tailwind-expert','prisma-expert','supabase-expert',
  'firebase-expert','stripe-expert','auth-specialist','websocket-expert',
  'graphql-expert','rest-api-designer','grpc-expert','serverless-architect',
  'edge-computing-expert','wasm-specialist','pwa-expert','flutter-expert',
  'react-native-expert','ios-expert','android-expert','unity-developer',
  'shader-programmer','llm-engineer','rag-architect','prompt-engineer',
  'ai-safety-reviewer',
];

function buildMarquee() {
  const row1 = document.getElementById('marquee-1');
  const row2 = document.getElementById('marquee-2');

  // Split into two groups
  const half = Math.ceil(agents.length / 2);
  const group1 = agents.slice(0, half);
  const group2 = agents.slice(half);

  // Duplicate for seamless loop
  function createBadges(list, container) {
    const doubled = [...list, ...list];
    doubled.forEach(name => {
      const badge = document.createElement('div');
      badge.className = 'agent-badge';
      badge.textContent = name;
      container.appendChild(badge);
    });
  }

  createBadges(group1, row1);
  createBadges(group2, row2);
}

// ─── CINEMATIC SCENE CONTROLLER ───
(function() {
  const scene = document.getElementById('scene');
  if (!scene) return;

  let currentSlide = 0;
  const panels = [
    document.getElementById('slide-0'),
    document.getElementById('slide-1'),
    document.getElementById('slide-2'),
  ];
  const dots = document.querySelectorAll('.slide-dot');
  const slideNum = document.getElementById('slide-num');
  const nums = ['01', '02', '03'];

  function activateSlide(idx) {
    if (idx === currentSlide || !panels[idx]) return;
    const prev = panels[currentSlide];
    const next = panels[idx];
    const forward = idx > currentSlide;

    prev.classList.remove('active');
    prev.classList.add(forward ? 'exit-up' : 'exit-down');
    setTimeout(() => prev.classList.remove('exit-up', 'exit-down'), 550);

    next.classList.add('active');
    currentSlide = idx;

    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    if (slideNum) slideNum.textContent = nums[idx];
    if (window._setParticleMode) window._setParticleMode(idx);
  }

  function getProgress() {
    const rect = scene.getBoundingClientRect();
    const scrolled = Math.max(0, -rect.top);
    const total = Math.max(1, scene.offsetHeight - window.innerHeight);
    return Math.min(1, scrolled / total);
  }

  function onScroll() {
    const p = getProgress();
    const next = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
    activateSlide(next);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  window.jumpToSlide = function(idx) {
    const total = scene.offsetHeight - window.innerHeight;
    const anchors = [0, 0.35, 0.69];
    window.scrollTo({ top: scene.offsetTop + total * anchors[idx], behavior: 'smooth' });
  };

  // ── Mouse parallax on slide text ──
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  (function parallaxLoop() {
    requestAnimationFrame(parallaxLoop);
    const active = panels[currentSlide];
    if (!active) return;
    const h1 = active.querySelector('.slide-h1');
    // Only parallax h1 — .slide-sub/.slide-eyebrow use CSS transform transitions, leave them alone
    if (h1) h1.style.transform = `translate(${mx * -9}px, ${my * -6}px)`;
  })();

  // ─── PARTICLE SYSTEM ───
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    // Re-scatter particles on resize so network positions update
    particles.forEach(p => {
      p.nx = W * 0.1 + Math.random() * W * 0.8;
      p.ny = H * 0.1 + Math.random() * H * 0.8;
    });
  }

  const CODE_CHARS = ['{', '}', '=>', '//', '()', '[]', '&&', '??', '<>', '++', '**', 'fn', 'λ', '∞'];
  const N = 170;

  const particles = Array.from({ length: N }, (_, i) => {
    const isGlyph = i < 22;
    const W0 = window.innerWidth || 1200;
    const H0 = window.innerHeight || 800;
    return {
      x: Math.random() * W0,
      y: Math.random() * H0,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.38 + 0.07),
      size: isGlyph ? 9 + Math.random() * 5 : Math.random() * 2.2 + 0.5,
      baseOp: isGlyph ? 0.1 + Math.random() * 0.15 : 0.14 + Math.random() * 0.52,
      opacity: 0.3,
      isGlyph,
      char: isGlyph ? CODE_CHARS[i % CODE_CHARS.length] : null,
      phase: Math.random() * Math.PI * 2,
      nx: W0 * 0.1 + Math.random() * W0 * 0.8,
      ny: H0 * 0.1 + Math.random() * H0 * 0.8,
      isAccent: i % 8 === 0,
    };
  });

  W = canvas.offsetWidth || window.innerWidth;
  H = canvas.offsetHeight || window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  window.addEventListener('resize', resize);

  let pMode = 0;
  let pVisible = true;
  let pLastTs = 0;
  let pRafId = null;
  window._setParticleMode = function(m) { pMode = m; };

  function draw(ts) {
    if (!pVisible) { pRafId = null; return; }
    if (ts - pLastTs < 33) { pRafId = requestAnimationFrame(draw); return; }
    pLastTs = ts;
    pRafId = requestAnimationFrame(draw);
    if (canvas.offsetWidth !== W || canvas.offsetHeight !== H) resize();
    ctx.clearRect(0, 0, W, H);

    const cx = W * 0.5, cy = H * 0.5;

    particles.forEach((p, i) => {
      // Twinkle
      p.opacity = p.baseOp + Math.sin(ts * 0.0014 + p.phase) * p.baseOp * 0.38;

      if (pMode === 0) {
        // ── COSMOS: embers floating upward ──
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -32) { p.y = H + 12; p.x = Math.random() * W; }
        if (p.x < -32) p.x = W + 10;
        if (p.x > W + 32) p.x = -10;

        if (p.isGlyph) {
          ctx.save();
          ctx.font = `600 ${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `rgba(255,179,0,${p.opacity})`;
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,179,0,${p.opacity})`;
          ctx.fill();
          if (p.size > 1.4 && p.opacity > 0.38) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 4.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,179,0,0.038)`;
            ctx.fill();
          }
        }

      } else if (pMode === 1) {
        // ── NETWORK: agent nodes connecting ──
        const ox = Math.sin(ts * 0.0007 + p.phase) * 38;
        const oy = Math.cos(ts * 0.0009 + p.phase) * 28;
        p.x += (p.nx + ox - p.x) * 0.035;
        p.y += (p.ny + oy - p.y) * 0.035;

        // Edges to nearby particles
        for (let j = i + 1; j < Math.min(i + 14, N); j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16900) { // 130px
            const alpha = (1 - Math.sqrt(d2) / 130) * 0.13;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = p.isAccent ? `rgba(124,106,247,${alpha})` : `rgba(255,179,0,${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        const pulse = 0.38 + Math.sin(ts * 0.002 + p.phase) * 0.32;
        const r = p.isGlyph ? 4 : 2.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent ? `rgba(124,106,247,${pulse})` : `rgba(255,179,0,${pulse})`;
        ctx.fill();
        // halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent ? `rgba(124,106,247,0.028)` : `rgba(255,179,0,0.028)`;
        ctx.fill();

      } else {
        // ── VORTEX: particles spiral toward center ──
        const dx = cx - p.x, dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = 0.038 + (1 - Math.min(dist, 380) / 380) * 0.055;
        p.x += dx * pull - dy * 0.012;
        p.y += dy * pull + dx * 0.012;

        if (dist < 8) {
          // Teleport back to edge
          const angle = Math.random() * Math.PI * 2;
          const r = Math.max(W, H) * 0.52 + Math.random() * 100;
          p.x = cx + Math.cos(angle) * r;
          p.y = cy + Math.sin(angle) * r;
        }

        const alpha = Math.min(1, dist / 45) * p.opacity;
        const sz = p.isGlyph ? 1.5 : p.size;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,179,0,${alpha})`;
        ctx.fill();
        if (dist < 90) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,179,0,0.025)`;
          ctx.fill();
        }
      }
    });

    // Vortex core glow
    if (pMode === 2) {
      const pulse = 0.5 + Math.sin(ts * 0.003) * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100 + pulse * 50);
      grad.addColorStop(0, `rgba(255,179,0,${0.18 * pulse})`);
      grad.addColorStop(0.45, `rgba(255,179,0,0.05)`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 150 + pulse * 50, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  new IntersectionObserver(function(entries) {
    pVisible = entries[0].isIntersecting;
    if (pVisible && !pRafId) { pLastTs = 0; pRafId = requestAnimationFrame(draw); }
  }, { threshold: 0.01 }).observe(canvas.parentElement);
  pRafId = requestAnimationFrame(draw);

})();

buildMarquee();

// ─── INTERSECTION OBSERVER ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Neural net trigger
const nnEl = document.getElementById('neural-net');
if (nnEl) {
  const nnObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      initNeuralNet();
      nnObserver.disconnect();
    }
  }, { threshold: 0.1 });
  nnObserver.observe(nnEl);
}

// ─── STATS COUNTER ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const value = Math.round(easeOutQuart(progress) * target);
    el.innerHTML = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.getElementById('stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ─── SMOOTH NAV SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── i18n ───
const SUPPORTED_LANGS = ['en', 'fr', 'es', 'de', 'pt', 'ja', 'zh', 'ko'];
const LANG_FLAGS = {en:'https://flagcdn.com/w40/gb.png',fr:'https://flagcdn.com/w40/fr.png',es:'https://flagcdn.com/w40/es.png',de:'https://flagcdn.com/w40/de.png',pt:'https://flagcdn.com/w40/pt.png',ja:'https://flagcdn.com/w40/jp.png',zh:'https://flagcdn.com/w40/cn.png',ko:'https://flagcdn.com/w40/kr.png'};

function toggleLangMenu() {
  const m = document.getElementById('lang-menu');
  const t = document.getElementById('lang-trigger');
  m.hidden = !m.hidden;
  t.setAttribute('aria-expanded', !m.hidden);
  if (!m.hidden) {
    setTimeout(() => document.addEventListener('click', function h(e) {
      if (!document.getElementById('lang-float').contains(e.target)) { m.hidden = true; t.setAttribute('aria-expanded','false'); }
      else document.addEventListener('click', h, {once:true});
    }, {once:true}), 0);
  }
}

function pickLang(lang) {
  document.getElementById('lang-menu').hidden = true;
  document.getElementById('lang-trigger').setAttribute('aria-expanded','false');
  switchLang(lang);
}


// [selector, key, useHTML]
const I18N_MAP = [
  // Nav desktop
  ['nav a[href="#how"]',         'nav_how'],
  ['nav a[href="#get"]',         'nav_get'],
  ['nav a[href="#agents"]',      'nav_agents'],
  ['nav a[href="#features"]',    'nav_features'],
  ['nav .nav-cta',               'nav_cta'],
  // Nav mobile
  ['.nav-mobile-menu a[href="#how"]',      'nav_how'],
  ['.nav-mobile-menu a[href="#get"]',      'nav_get'],
  ['.nav-mobile-menu a[href="#agents"]',   'nav_agents'],
  ['.nav-mobile-menu a[href="#features"]', 'nav_features'],
  ['.nav-mobile-menu .nav-mobile-cta',     'nav_mob_cta'],
  // Cinematic scene slides
  ['#slide-0 .slide-eyebrow',              'slide0_eyebrow'],
  ['#slide-0 .slide-line:nth-child(1)',    'slide0_line1'],
  ['#slide-0 .slide-line:nth-child(2)',    'slide0_line2'],
  ['#slide-0 .slide-sub',                 'slide0_sub'],
  ['#slide-1 .slide-eyebrow',              'slide1_eyebrow'],
  ['#slide-1 .slide-line:nth-child(1)',    'slide1_line1'],
  ['#slide-1 .slide-line:nth-child(2)',    'slide1_line2'],
  ['#slide-1 .slide-sub',                 'slide1_sub'],
  ['#slide-2 .slide-eyebrow',              'slide2_eyebrow'],
  ['#slide-2 .slide-line:nth-child(1)',    'slide2_line1'],
  ['#slide-2 .slide-line:nth-child(2)',    'slide2_line2'],
  ['#slide-2 .slide-sub',                 'slide2_sub'],
  ['#slide-2 .slide-cta',                 'slide2_cta',   true],
  // Stats
  ['.stat-item:nth-child(1) .stat-label', 'stat_agents'],
  ['.stat-item:nth-child(2) .stat-label', 'stat_skills'],
  ['.stat-item:nth-child(3) .stat-label', 'stat_commands'],
  ['.stat-item:nth-child(4) .stat-label', 'stat_files'],
  ['.stat-item:nth-child(5) .stat-label', 'stat_levels'],
  ['.stat-item:nth-child(6) .stat-label', 'stat_time'],
  // New project / existing project paths
  ['#project .section-label',                       'project_label', true],
  ['#project .section-title',                       'project_title'],
  ['#project .section-sub',                         'project_sub'],
  ['.path-card.new-proj .path-badge',               'path_new_badge'],
  ['.path-card.new-proj .path-title',               'path_new_title'],
  ['.path-card.new-proj .path-desc',                'path_new_desc'],
  ['.path-card.new-proj .path-steps li:nth-child(1)','path_new_step1'],
  ['.path-card.new-proj .path-steps li:nth-child(2)','path_new_step2'],
  ['.path-card.new-proj .path-steps li:nth-child(3)','path_new_step3'],
  ['.path-card.new-proj .path-steps li:nth-child(4)','path_new_step4'],
  ['.path-card.new-proj .path-link',                'path_new_cta'],
  ['.path-card.exist-proj .path-badge',             'path_exist_badge'],
  ['.path-card.exist-proj .path-title',             'path_exist_title'],
  ['.path-card.exist-proj .path-desc',              'path_exist_desc'],
  ['.path-card.exist-proj .path-steps li:nth-child(1)','path_exist_step1'],
  ['.path-card.exist-proj .path-steps li:nth-child(2)','path_exist_step2'],
  ['.path-card.exist-proj .path-steps li:nth-child(3)','path_exist_step3'],
  ['.path-card.exist-proj .path-steps li:nth-child(4)','path_exist_step4'],
  ['.path-card.exist-proj .path-link',              'path_exist_cta'],
  // How it works
  ['#how .section-label', 'how_label', true],
  ['#how .section-title', 'how_title'],
  ['#how .section-sub',   'how_sub'],
  ['.step-card:nth-child(1) .step-title', 'step1_title'],
  ['.step-card:nth-child(1) .step-desc',  'step1_desc'],
  ['.step-card:nth-child(2) .step-title', 'step2_title'],
  ['.step-card:nth-child(2) .step-desc',  'step2_desc'],
  ['.step-card:nth-child(3) .step-title', 'step3_title'],
  ['.step-card:nth-child(3) .step-desc',  'step3_desc'],
  // What you get
  ['#get .section-label', 'get_label', true],
  ['#get .section-title', 'get_title'],
  ['#get .section-sub',   'get_sub'],
  ['.feature-cards .feature-card:nth-child(1) .fc-title', 'fc1_title'],
  ['.feature-cards .feature-card:nth-child(1) .fc-desc',  'fc1_desc'],
  ['.feature-cards .feature-card:nth-child(2) .fc-title', 'fc2_title'],
  ['.feature-cards .feature-card:nth-child(2) .fc-desc',  'fc2_desc'],
  ['.feature-cards .feature-card:nth-child(3) .fc-title', 'fc3_title'],
  ['.feature-cards .feature-card:nth-child(3) .fc-desc',  'fc3_desc'],
  ['.feature-cards .feature-card:nth-child(4) .fc-title', 'fc4_title'],
  ['.feature-cards .feature-card:nth-child(4) .fc-desc',  'fc4_desc'],
  // Agents
  ['#agents .section-title', 'agents_title'],
  ['#agents .section-sub',   'agents_sub'],
  // Features deep dive
  ['#features .section-label', 'feat_label', true],
  ['#features .section-title', 'feat_title'],
  ['#features .section-sub',   'feat_sub'],
  ['.big-feature-card:nth-child(1) .bfc-title', 'bfc1_title'],
  ['.big-feature-card:nth-child(1) .bfc-desc',  'bfc1_desc'],
  ['.big-feature-card:nth-child(1) .bfc-meta',  'bfc1_meta', true],
  ['.big-feature-card:nth-child(2) .bfc-title', 'bfc2_title'],
  ['.big-feature-card:nth-child(2) .bfc-desc',  'bfc2_desc'],
  ['.big-feature-card:nth-child(2) .bfc-meta',  'bfc2_meta', true],
  ['.big-feature-card:nth-child(3) .bfc-title', 'bfc3_title'],
  ['.big-feature-card:nth-child(3) .bfc-desc',  'bfc3_desc'],
  ['.big-feature-card:nth-child(3) .bfc-meta',  'bfc3_meta', true],
  // Demo
  ['#demo .section-label', 'demo_label', true],
  ['#demo .section-title', 'demo_title'],
  ['#demo .section-sub',   'demo_sub'],
  ['.scroll-hint',         'demo_hint'],
  // CTA
  ['.cta-label',   'cta_label', true],
  ['.cta-h2',      'cta_h2',    true],
  ['.cta-sub',     'cta_sub'],
  ['#cta .cta-btn','cta_btn',   true],
  ['.cta-note',    'cta_note'],
  // Footer
  ['.footer-links a:nth-child(1)', 'foot_wizard'],
  ['.footer-links a:nth-child(2)', 'foot_how'],
  ['.footer-links a:nth-child(3)', 'foot_agents'],
  ['.footer-links a:nth-child(4)', 'foot_feat'],
  ['.footer-copy',                 'foot_copy'],
];

async function applyLang(lang) {
  let texts = {};
  try {
    const data = await fetch(`i18n/${lang}.json?v=2`).then(r => r.ok ? r.json() : {}).catch(() => ({}));
    texts = data.landing || {};
  } catch (_) {}
  I18N_MAP.forEach(([sel, key, html]) => {
    const el = document.querySelector(sel);
    if (!el || texts[key] === undefined) return;
    if (html) el.innerHTML = texts[key];
    else el.textContent = texts[key];
  });
  const flag = document.getElementById('lang-flag');
  const code = document.getElementById('lang-code');
  if (flag) { flag.src = LANG_FLAGS[lang]; flag.alt = lang.toUpperCase(); }
  if (code) code.textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-opt').forEach(b => b.classList.toggle('act', b.dataset.lang === lang));
  localStorage.setItem('wizard-lang', lang);
  document.documentElement.lang = lang;
  // Update meta description for the active language
  if (texts.meta_description) {
    let desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', texts.meta_description);
  }
  // Reflect language in URL without reloading
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url.toString());
  // Apply data-i18n attribute translations (story + beyond sections)
  if (typeof window.applyIndexI18n === 'function') window.applyIndexI18n(lang);
}

async function switchLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  await applyLang(lang);
}

// ─── SCROLL TO TOP ───
(function() {
  const btn = document.getElementById('scroll-top');
  function update() { btn.classList.toggle('visible', window.scrollY > 400); }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


(async function initLang() {
  const urlParam = new URL(window.location.href).searchParams.get('lang');
  const stored = localStorage.getItem('wizard-lang');
  const browser = (navigator.language || '').split('-')[0];
  const lang = SUPPORTED_LANGS.includes(urlParam) ? urlParam
             : SUPPORTED_LANGS.includes(stored) ? stored
             : SUPPORTED_LANGS.includes(browser) ? browser
             : 'en';
  await switchLang(lang);
})();
