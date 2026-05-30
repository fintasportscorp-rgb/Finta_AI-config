// ═══════════════════════════════════════════════════════════
// I18N
// ═══════════════════════════════════════════════════════════
const SUPPORTED_LANGS = ['en', 'fr', 'es', 'de', 'pt', 'ja', 'zh', 'ko'];
const BOOK_LM_URL = 'https://notebooklm.google.com/notebook/70873a7e-89a4-423f-bdbe-530fcbc3f9d9/preview';
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
const DEFAULT_LANG = 'en';

const DEFAULT_T = {
  loading:'Loading…', select_profile:'select profile',
  how_work_ai:'How do you work with AI tools?',
  level_hint:'Adapts question count and generated file detail. Press [1] [2] [3] to select.',
  questions_word:'questions', continue:'continue', back:'back', skip:'skip', next:'next',
  generate_config:'generate config', other:'Other…', specify:'Specify…',
  multiple_selection:'Multiple selection allowed',
  multiple_refines:'Multiple selection — refines agent recommendations',
  select_domain_first:'Select a primary domain first to see subdomains.',
  affects:'affects:', question_n:'question {step}/{total}',
  generating:'Generating configuration files…',
  fetching_agents:'Fetching agent contents…',
  more_files:'… +{n} more files',
  n_files_generated:'{n} files generated for',
  project_files:'PROJECT FILES', copy:'copy', copied:'✓ Copied', copy_full:'copy',
  next_step_title:'NEXT STEP',
  next_step_body:'Place the ZIP in your project root and run:',
  next_step_auto:'Your AI assistant reads the config automatically on the next session.',
  download_zip:'download ZIP ({n} files)', edit_answers:'edit answers', restart:'restart',
  no_spec:'No spec — click the button to get started.',
  add_spec:'[+] Add a spec', spec_title_ph:'Spec title…',
  spec_desc_ph:'Description, business rules, expected behavior, constraints…',
  spec_delete:'Delete', spec_remove_att:'Remove', spec_add_example:'📎 Add example',
  agents_hint:'★ = recommended · click to toggle',
  agents_selected:'{n} selected', agents_all:'All ({n})', agents_all_tab:'All',
  agents_browse:'+ Browse {n} available agents',
  agents_collapse:'− Collapse catalog',
  agents_search_ph:'Search among {n} agents…',
  skills_hint:'Pre-selected based on your answers — adjust freely',
  skills_selected:'{n} selected', skills_all:'All ({n})', skills_all_tab:'All',
  skills_browse:'Browse all {n} skills',
  skills_collapse:'− Collapse catalog',
  skills_search_ph:'Search {n} skills…',
  skills_count:'{n} skills',
  commands_hint:'Pre-selected based on your answers — adjust freely',
  commands_selected:'{n} selected', commands_all:'All ({n})', commands_all_tab:'All',
  commands_browse:'+ Browse {n} available commands',
  commands_collapse:'− Collapse catalog',
  commands_search_ph:'Search {n} commands…',
  commands_count:'{n} commands',
  binary_file:'[Binary file — preview not available]',
  jszip_error:'JSZip not loaded. Check your connection.',
  session_restored:'Session restored — pick up where you left off.',
  start_fresh:'Start fresh',
  welcome_q_loaded:'questions loaded', welcome_ag_indexed:'agents indexed',
  welcome_templates:'templates & scoring engine ready',
  welcome_subtitle:'AI Project Setup Wizard — configure in minutes',
  welcome_generates:'This wizard generates:',
  welcome_config:'main config · local config · .gitignore',
  welcome_rules:'quality-gates · security · behavior · TDD · stack',
  welcome_agents_line:'agents — intelligent selection based on your answers',
  welcome_docs:'architecture · glossary · ADRs',
  welcome_prompt_line:'bootstrap-init.md — AI post-install enrichment',
  welcome_run:'run setup', run_setup_btn:'run-setup.sh',
  boot_prompt_tpl:"unzip {name}-ai-setup.zip"
};

let T = Object.assign({}, DEFAULT_T);
let LANG = DEFAULT_LANG;
let ORIG_QUESTIONS = null;
let ORIG_LEVELS = null;

function t(key, vars) {
  let s = T[key] !== undefined ? T[key] : (DEFAULT_T[key] !== undefined ? DEFAULT_T[key] : key);
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace('{' + k + '}', v); });
  return s;
}

function detectLang() {
  const urlParam = new URL(window.location.href).searchParams.get('lang');
  if (urlParam && SUPPORTED_LANGS.includes(urlParam)) return urlParam;
  const stored = localStorage.getItem('wizard-lang');
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = (navigator.language || '').split('-')[0];
  return SUPPORTED_LANGS.includes(browser) ? browser : DEFAULT_LANG;
}

let CARD_TR = { agents: {}, skills: {} };

function cardTr(type, name, field) {
  const tr = CARD_TR[type]?.[name];
  return tr?.[field] || null;
}

function applyLocale(data, cardsData) {
  cardsData = cardsData || {};
  CARD_TR = { agents: cardsData.agents || {}, skills: cardsData.skills || {} };
  if (!ORIG_QUESTIONS || !ORIG_LEVELS) return;
  QUESTIONS = JSON.parse(JSON.stringify(ORIG_QUESTIONS));
  LEVELS    = JSON.parse(JSON.stringify(ORIG_LEVELS));
  if (data.levels) {
    LEVELS.forEach(l => {
      const tr = data.levels[l.v]; if (!tr) return;
      if (tr.n) l.n = tr.n; if (tr.d) l.d = tr.d;
    });
  }
  if (data.questions) {
    QUESTIONS.forEach(q => {
      const tr = data.questions[q.id]; if (!tr) return;
      if (tr.label) q.label = tr.label;
      if (tr.ph)    q.ph    = tr.ph;
      if (tr.hint)  Object.assign(q.hint || (q.hint = {}), tr.hint);
      if (tr.opts && q.opts) q.opts.forEach(o => { if (tr.opts[o.v]) o.l = tr.opts[o.v]; });
    });
  }
  T = Object.assign({}, DEFAULT_T, data.ui || {});
  document.documentElement.style.setProperty('--add-spec-label', '"' + T.add_spec + '"');
  updateLangFloat();
}

async function switchLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
  localStorage.setItem('wizard-lang', lang);
  LANG = lang;
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url.toString());
  try {
    const v = Date.now();
    const data = await fetch(`i18n/${lang}.json?v=${v}`).then(r => r.ok ? r.json() : {}).catch(() => ({}));
    applyLocale(data, {});
  } catch (_) { applyLocale({}, {}); }
  updateLangFloat();
  autoFillOutputLanguage();
  render();
}

const LANG_OUTPUT_MAP = {
  en:'English', fr:'French', es:'Spanish', de:'German',
  pt:'Portuguese', ja:'Japanese', zh:'Chinese', ko:'Korean'
};

function autoFillOutputLanguage() {
  if (!S.ans.output_language) {
    S.ans.output_language = LANG_OUTPUT_MAP[LANG] || '';
  }
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
let LEVELS, QUESTIONS, ARBO, AGENTS_CATALOG = [], SKILLS_CATALOG = [], COMMANDS_CATALOG = [];

async function init() {
  try {
    const v = Date.now();
    LANG = detectLang();
    const [qData, arboData, catData, skillsData, commandsData, locData] = await Promise.all([
      fetch(`data/questions.json?v=${v}`).then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); }),
      fetch(`data/arbo.json?v=${v}`).then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); }),
      fetch(`data/agents-catalog.json?v=${v}`).then(r => r.ok ? r.json() : {agents:[]}).catch(() => ({agents:[]})),
      fetch(`data/skills-catalog.json?v=${v}`).then(r => r.ok ? r.json() : {skills:[]}).catch(() => ({skills:[]})),
      fetch(`data/commands-catalog.json?v=${v}`).then(r => r.ok ? r.json() : {commands:[]}).catch(() => ({commands:[]})),
      fetch(`i18n/${LANG}.json?v=${v}`).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    ]);
    ORIG_LEVELS    = qData.levels;
    ORIG_QUESTIONS = qData.questions;
    ARBO           = arboData;
    AGENTS_CATALOG = catData.agents || [];
    SKILLS_CATALOG = skillsData.skills || [];
    COMMANDS_CATALOG = commandsData.commands || [];
    applyLocale(locData, {});
    loadSession();
    autoFillOutputLanguage();
    render();
  } catch (e) {
    showError();
  }
}

function updateLangFloat() {
  const flag = document.getElementById('lang-flag');
  const code = document.getElementById('lang-code');
  if (flag) { flag.src = LANG_FLAGS[LANG]; flag.alt = LANG.toUpperCase(); }
  if (code) code.textContent = LANG.toUpperCase();
  document.querySelectorAll('.lang-opt').forEach(b => b.classList.toggle('act', b.dataset.lang === LANG));
}

// ═══════════════════════════════════════════════════════════
// AGENT SCORING ENGINE
// ═══════════════════════════════════════════════════════════
function findBestAgent(name, priorityList) {
  const matches = AGENTS_CATALOG.filter(a => a.name === name);
  if (!matches.length) return null;
  matches.sort((a, b) => {
    const pa = priorityList.findIndex(s => a.source === s);
    const pb = priorityList.findIndex(s => b.source === s);
    return (pa < 0 ? 999 : pa) - (pb < 0 ? 999 : pb);
  });
  return matches[0];
}

function computeAgentRecommendations(ans) {
  if (!ARBO.agentScoring || !AGENTS_CATALOG.length) return [];
  const sc = ARBO.agentScoring;
  const scores = {};

  function addScore(name, w) {
    const agent = findBestAgent(name, sc.sourcePriority);
    if (agent) scores[agent.id] = (scores[agent.id] || 0) + w;
  }

  // Always-on agents
  (sc.fastAlways || []).forEach(n => addScore(n, 100));

  // Rule matching
  const stack     = [].concat(ans.stack      || []);
  const comply    = [].concat(ans.compliance || []);
  const database  = [].concat(ans.database   || []);
  const domains   = [].concat(ans.domain     || []);
  const subdomain = ans.subdomains
    ? Object.values(ans.subdomains).flat()
    : [].concat(ans.subdomain || []);

  (sc.rules || []).forEach(rule => {
    const w = rule.w || 1;
    let match = false;
    if (rule.when.stack       && stack.includes(rule.when.stack))              match = true;
    if (rule.when.domain      && domains.includes(rule.when.domain))           match = true;
    if (rule.when.tdd_level   && ans.tdd_level === rule.when.tdd_level)        match = true;
    if (rule.when.autonomy    && ans.autonomy === rule.when.autonomy)          match = true;
    if (rule.when.team_context&& ans.team_context === rule.when.team_context)  match = true;
    if (rule.when.compliance  && comply.includes(rule.when.compliance))        match = true;
    if (rule.when.database    && database.includes(rule.when.database))        match = true;
    if (rule.when.subdomain   && subdomain.includes(rule.when.subdomain))      match = true;
    if (match) (rule.names || []).forEach(n => addScore(n, w));
  });

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ id, score }));
}

// ═══════════════════════════════════════════════════════════
// AGENT PICKER RENDER
// ═══════════════════════════════════════════════════════════
function qualityStars(q) {
  const n = Math.round((q || 0) / 20);
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

const CAT_LABELS = {
  backend:'Backend', frontend:'Frontend', security:'Security', testing:'Testing',
  devops:'DevOps', ai:'AI / ML', mobile:'Mobile', quality:'Quality',
  database:'Database', architecture:'Architecture', design:'Design',
  analysis:'Analysis', general:'General', orchestration:'Orchestration',
  orch:'Orchestration', infra:'Infra', business:'Business', safety:'Safety',
  coaching:'Coaching'
};

const SKILL_CAT_LABELS = {
  ai:'AI / ML', frontend:'Frontend', backend:'Backend', security:'Security',
  testing:'Testing', python:'Python', javascript:'JS / TS', golang:'Go',
  java:'Java / Kotlin', rust:'Rust', database:'Database', cloud:'Cloud',
  devops:'DevOps', automation:'Automation', marketing:'Marketing', design:'Design',
  data:'Data', docs:'Docs', git:'Git', api:'API', mobile:'Mobile', other:'Other'
};

function agentCardHtml(a, selected, recIds) {
  const isSel = selected.has(a.id);
  const isRec = recIds.has(a.id);
  const name = cardTr('agents', a.name, 'name') || a.name;
  const desc = (cardTr('agents', a.name, 'desc') || a.desc || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const tier    = a.tier || 'community';
  const quality = a.quality || 0;
  return `<div class="agent-card${isSel?' sel':''}${isRec?' rec':''}" data-id="${a.id}" data-cat="${a.category}" data-name="${(a.name||'').replace(/"/g,'&quot;')}" data-tags="${(a.tags||[]).join(' ')}" data-tier="${tier}" data-quality="${quality}" data-source="${a.source||''}" onclick="toggleAgent('${a.id}')">
    <div class="ac-name">${name}</div>
    <div class="ac-desc">${desc}</div>
    <div class="ac-badges">
      <span class="ac-cat cat-${a.category}">${CAT_LABELS[a.category]||a.category}</span>
      <span class="ac-tier tier-${tier}">${tier}</span>
      <span class="ac-quality">${qualityStars(quality)}</span>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════
// SKILL SCORING ENGINE
// ═══════════════════════════════════════════════════════════
function computeSkillRecommendations(ans) {
  if (!SKILLS_CATALOG.length) return [];
  const scores = {};

  function add(id, w) { scores[id] = (scores[id] || 0) + w; }

  function scoreByKw(kw, w) {
    const k = kw.toLowerCase();
    SKILLS_CATALOG.forEach(s => {
      if ((s.name + ' ' + s.desc).toLowerCase().includes(k)) add(s.id, w);
    });
  }

  function scoreByCat(cat, w) {
    SKILLS_CATALOG.filter(s => s.category === cat).forEach(s => add(s.id, w));
  }

  // Always-on: universal quality skills
  scoreByKw('code-review', 4);
  scoreByKw('git', 2);
  scoreByKw('documentation', 2);
  scoreByCat('docs', 2);

  // Stack
  const stack = [].concat(ans.stack || []);
  if (stack.includes('python'))      { scoreByCat('python', 8); scoreByKw('fastapi', 5); scoreByKw('django', 5); scoreByKw('pydantic', 4); }
  if (stack.includes('react'))       { scoreByKw('react', 9); scoreByKw('nextjs', 7); scoreByKw('shadcn', 4); scoreByKw('tailwind', 4); }
  if (stack.includes('vue'))         { scoreByKw('vue', 9); }
  if (stack.includes('typescript'))  { scoreByKw('typescript', 9); scoreByCat('javascript', 5); }
  if (stack.includes('node'))        { scoreByKw('nodejs', 7); scoreByKw('nestjs', 5); }
  if (stack.includes('go'))          { scoreByCat('golang', 9); scoreByKw('golang', 5); }
  if (stack.includes('rust'))        { scoreByCat('rust', 9); scoreByKw('rust', 5); }
  if (stack.includes('java'))        { scoreByCat('java', 9); scoreByKw('spring', 5); scoreByKw('kotlin', 5); }
  if (stack.includes('mobile'))      { scoreByCat('mobile', 9); scoreByKw('flutter', 5); scoreByKw('swift', 5); scoreByKw('android', 4); }
  if (stack.includes('devops'))      { scoreByCat('devops', 9); scoreByKw('docker', 5); scoreByKw('kubernetes', 5); scoreByKw('terraform', 4); }
  if (stack.includes('php'))         { scoreByKw('php', 9); scoreByKw('laravel', 6); }
  if (stack.includes('ruby'))        { scoreByKw('ruby', 9); scoreByKw('rails', 6); }
  if (stack.includes('sql'))         { scoreByCat('database', 7); scoreByKw('postgres', 5); scoreByKw('sql', 5); }

  // Domain (iterate over all selected domains)
  const domains_skill = [].concat(ans.domain || []);
  for (const domain of domains_skill) {
    if (domain === 'apps')        { scoreByKw('saas', 7); scoreByKw('auth', 5); scoreByKw('frontend', 5); }
    if (domain === 'data')        { scoreByCat('data', 9); scoreByCat('ai', 6); scoreByKw('ml', 5); scoreByKw('pipeline', 4); }
    if (domain === 'ai')          { scoreByCat('ai', 10); scoreByKw('llm', 7); scoreByKw('langchain', 6); scoreByKw('rag', 6); }
    if (domain === 'content')     { scoreByCat('marketing', 8); scoreByKw('seo', 7); scoreByKw('content', 5); }
    if (domain === 'business')    { scoreByKw('workflow', 6); scoreByKw('reporting', 5); scoreByKw('crm', 4); }
    if (domain === 'security')    { scoreByCat('security', 10); scoreByKw('pentest', 6); scoreByKw('audit', 5); }
    if (domain === 'mleng')       { scoreByCat('ai', 9); scoreByKw('pytorch', 7); scoreByKw('mlflow', 6); scoreByKw('training', 5); }
    if (domain === 'blockchain')  { scoreByKw('solidity', 8); scoreByKw('web3', 7); scoreByKw('smart-contract', 6); }
    if (domain === 'science')     { scoreByKw('numpy', 7); scoreByKw('simulation', 6); scoreByKw('hpc', 5); scoreByKw('scipy', 5); }
    if (domain === 'immersive')   { scoreByKw('unity', 7); scoreByKw('threejs', 6); scoreByKw('webxr', 6); scoreByKw('game', 5); }
    if (domain === 'integration') { scoreByCat('api', 8); scoreByKw('kafka', 6); scoreByKw('webhook', 5); scoreByKw('grpc', 5); }
    if (domain === 'embedded')    { scoreByKw('c', 7); scoreByKw('rtos', 7); scoreByKw('ros', 6); scoreByKw('iot', 6); }
    if (domain === 'media')       { scoreByKw('ffmpeg', 7); scoreByKw('video', 6); scoreByKw('streaming', 6); scoreByKw('webrtc', 5); }
    if (domain === 'devtools')    { scoreByKw('cli', 7); scoreByKw('sdk', 6); scoreByKw('compiler', 5); scoreByKw('lsp', 5); }
    if (domain === 'fintech')     { scoreByCat('security', 7); scoreByKw('stripe', 6); scoreByKw('payment', 6); scoreByKw('compliance', 5); }
    if (domain === 'sport')      { scoreByCat('sport', 10); scoreByKw('football', 8); scoreByKw('athlete', 7); scoreByKw('coaching', 7); scoreByKw('performance', 5); scoreByKw('training', 5); }
    if (domain === 'holistic')   { scoreByCat('holistic', 10); scoreByKw('career', 8); scoreByKw('wellbeing', 7); scoreByKw('burnout', 7); scoreByKw('purpose', 6); scoreByKw('productivity', 6); scoreByKw('leadership', 5); }
  }

  // Subdomains (flat across all domains)
  const sub = ans.subdomains ? Object.values(ans.subdomains).flat() : [].concat(ans.subdomain || []);
  // apps subdomains
  if (sub.includes('web_app'))       { scoreByKw('react', 6); scoreByKw('nextjs', 5); scoreByKw('frontend', 5); }
  if (sub.includes('server_api'))    { scoreByCat('api', 7); scoreByKw('graphql', 6); scoreByKw('rest', 4); }
  if (sub.includes('mobile'))        { scoreByCat('mobile', 9); }
  if (sub.includes('extension'))     { scoreByKw('chrome', 5); scoreByKw('webext', 5); }
  if (sub.includes('design_system')) { scoreByKw('storybook', 7); scoreByKw('chromatic', 5); }
  if (sub.includes('admin_panel'))   { scoreByKw('rbac', 6); scoreByKw('dashboard', 5); }
  // data subdomains
  if (sub.includes('etl'))           { scoreByKw('dbt', 7); scoreByKw('pipeline', 5); scoreByKw('airflow', 5); }
  if (sub.includes('quality'))       { scoreByKw('data-quality', 7); scoreByKw('great-expectations', 6); }
  if (sub.includes('orchestration')) { scoreByKw('airflow', 7); scoreByKw('prefect', 6); scoreByKw('dagster', 5); }
  if (sub.includes('cloud_infra'))   { scoreByCat('cloud', 9); scoreByCat('devops', 7); scoreByKw('kubernetes', 5); }
  // ai subdomains
  if (sub.includes('rag'))           { scoreByKw('rag', 8); scoreByKw('langchain', 6); scoreByKw('embedding', 5); scoreByKw('vector', 5); }
  if (sub.includes('agents'))        { scoreByKw('agent', 8); scoreByKw('langchain', 6); scoreByKw('crewai', 5); }
  if (sub.includes('prompt_eng'))    { scoreByKw('dspy', 7); scoreByKw('instructor', 6); scoreByKw('prompt', 5); }
  if (sub.includes('ai_eval'))       { scoreByKw('eval', 7); scoreByKw('benchmark', 6); scoreByKw('llm', 5); }
  // mleng subdomains
  if (sub.includes('training'))      { scoreByCat('ai', 7); scoreByKw('pytorch', 7); scoreByKw('tensorflow', 5); }
  if (sub.includes('deployment'))    { scoreByKw('onnx', 7); scoreByKw('bentoml', 6); scoreByKw('torchserve', 5); }
  if (sub.includes('experiments'))   { scoreByKw('mlflow', 7); scoreByKw('wandb', 6); scoreByKw('dvc', 5); }
  if (sub.includes('feature_store')) { scoreByKw('feast', 7); scoreByKw('feature-store', 6); }
  if (sub.includes('rl'))            { scoreByKw('gym', 7); scoreByKw('reinforcement', 6); scoreByKw('stable-baselines', 5); }
  // fintech subdomains
  if (sub.includes('payments'))      { scoreByKw('stripe', 7); scoreByKw('billing', 5); scoreByKw('pci', 5); }
  if (sub.includes('banking_core'))  { scoreByKw('ledger', 7); scoreByKw('banking', 6); scoreByKw('plaid', 5); }
  if (sub.includes('trading'))       { scoreByKw('trading', 7); scoreByKw('fix', 6); scoreByKw('order-book', 5); }
  if (sub.includes('reg_reporting')) { scoreByKw('kyc', 7); scoreByKw('aml', 6); scoreByKw('compliance', 5); }
  if (sub.includes('fraud'))         { scoreByKw('fraud', 8); scoreByKw('risk', 6); scoreByKw('scoring', 5); }
  // security subdomains
  if (sub.includes('pentest'))       { scoreByCat('security', 8); scoreByKw('pentest', 7); scoreByKw('owasp', 6); }
  if (sub.includes('policy_code'))   { scoreByKw('opa', 7); scoreByKw('rego', 6); scoreByKw('policy', 5); }
  if (sub.includes('observability')) { scoreByKw('prometheus', 7); scoreByKw('grafana', 6); scoreByKw('slo', 5); }
  // integration subdomains
  if (sub.includes('api_gw'))        { scoreByCat('api', 7); scoreByKw('graphql', 6); scoreByKw('grpc', 5); scoreByKw('openapi', 4); }
  if (sub.includes('event_driven'))  { scoreByKw('kafka', 7); scoreByKw('rabbitmq', 6); scoreByKw('event-sourcing', 5); }
  if (sub.includes('workflow_orch')) { scoreByKw('temporal', 7); scoreByKw('camunda', 5); scoreByKw('n8n', 5); }
  // blockchain subdomains
  if (sub.includes('smart_contracts')){ scoreByKw('solidity', 8); scoreByKw('foundry', 6); scoreByKw('hardhat', 5); }
  if (sub.includes('bridges'))        { scoreByKw('bridge', 7); scoreByKw('cross-chain', 6); }
  // science subdomains
  if (sub.includes('bioinformatics')) { scoreByKw('nextflow', 7); scoreByKw('snakemake', 6); scoreByKw('bioconda', 5); }
  if (sub.includes('geospatial'))     { scoreByKw('gdal', 7); scoreByKw('postgis', 6); scoreByKw('gis', 5); }
  // embedded subdomains
  if (sub.includes('robotics'))       { scoreByKw('ros', 8); scoreByKw('pid', 6); scoreByKw('kinematics', 5); }
  if (sub.includes('fpga'))           { scoreByKw('vhdl', 8); scoreByKw('verilog', 7); scoreByKw('fpga', 6); }
  // devtools subdomains
  if (sub.includes('cli'))            { scoreByKw('oclif', 7); scoreByKw('cobra', 6); scoreByKw('cli', 5); }
  if (sub.includes('sdk_lib'))        { scoreByKw('sdk', 7); scoreByKw('semver', 5); scoreByKw('npm', 5); }
  if (sub.includes('lang_server'))    { scoreByKw('lsp', 8); scoreByKw('treesitter', 6); scoreByKw('vscode', 5); }

  // TDD → testing
  if (ans.tdd_level && ans.tdd_level !== 'no_tdd') { scoreByCat('testing', 8); scoreByKw('tdd', 6); scoreByKw('test', 4); }

  // Compliance → security
  const comply = [].concat(ans.compliance || []);
  if (comply.length)           { scoreByCat('security', 7); scoreByKw('compliance', 5); }
  if (comply.includes('pci'))  { scoreByKw('payment', 5); scoreByKw('pci', 6); }
  if (comply.includes('gdpr')) { scoreByKw('gdpr', 6); scoreByKw('privacy', 5); }
  if (comply.includes('hipaa')){ scoreByKw('health', 5); scoreByKw('hipaa', 6); }

  // AI tool → Claude-specific skills
  if ([].concat(ans.ai_tools || []).includes('claude_code')) { scoreByKw('claude', 8); scoreByKw('claude-api', 7); scoreByKw('claude-code', 7); scoreByKw('mcp', 5); }

  // Autonomy → devops/workflow
  if (ans.autonomy === 'autonomous') { scoreByCat('devops', 4); scoreByKw('automation', 4); }

  // Database
  const db = [].concat(ans.database || []);
  if (db.includes('postgres'))  { scoreByKw('postgres', 7); scoreByKw('prisma', 5); scoreByKw('drizzle', 4); }
  if (db.includes('mongodb'))   { scoreByKw('mongo', 7); }
  if (db.includes('redis'))     { scoreByKw('redis', 7); }
  if (db.includes('vector_db')) { scoreByKw('vector', 7); scoreByKw('pinecone', 5); scoreByKw('qdrant', 4); }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ id, score }));
}

// ═══════════════════════════════════════════════════════════
// SKILL PICKER
// ═══════════════════════════════════════════════════════════
function skillCardHtml(s, selected, recIds) {
  const isSel = selected.has(s.id);
  const isRec = recIds && recIds.has(s.id);
  const name = cardTr('skills', s.name, 'name') || s.name;
  const desc = (cardTr('skills', s.name, 'desc') || s.desc || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const tier    = s.tier || 'community';
  const quality = s.quality || 0;
  return `<div class="agent-card${isSel?' sel':''}${isRec?' rec':''}" data-id="${s.id}" data-cat="${s.category}" data-name="${(s.name||'').replace(/"/g,'&quot;')}" data-tier="${tier}" data-quality="${quality}" data-source="${s.source||''}" onclick="toggleSkill('${s.id}')">
    <div class="ac-name">${name}</div>
    <div class="ac-desc">${desc}</div>
    <div class="ac-badges">
      <span class="ac-cat cat-${s.category}">${SKILL_CAT_LABELS[s.category]||s.category}</span>
      <span class="ac-tier tier-${tier}">${tier}</span>
      <span class="ac-quality">${qualityStars(quality)}</span>
    </div>
  </div>`;
}

function toggleSkill(id) {
  if (!S.ans.skills_wanted) S.ans.skills_wanted = [];
  const a = S.ans.skills_wanted;
  const i = a.indexOf(id);
  if (i === -1) a.push(id); else a.splice(i, 1);
  const isSel = a.includes(id);

  document.querySelectorAll(`.agent-card[data-id="${id}"]`).forEach(card => card.classList.toggle('sel', isSel));

  // rec-grid = only selected skills; inject on select, remove on deselect
  const recGrid = document.getElementById('skill-rec-grid');
  if (recGrid) {
    const existsInRec = !!recGrid.querySelector(`.agent-card[data-id="${id}"]`);
    if (isSel && !existsInRec) {
      const skill = SKILLS_CATALOG.find(s => s.id === id);
      if (skill) {
        const level = S.level || 'fast';
        const lim   = level === 'fast' ? 10 : level === 'advanced' ? 15 : 20;
        const recIds = new Set(computeSkillRecommendations(S.ans).slice(0, lim).map(r => r.id));
        const wrapper = document.createElement('div');
        wrapper.innerHTML = skillCardHtml(skill, new Set([id]), recIds);
        const cardEl = wrapper.firstElementChild;
        cardEl.dataset.injected = '1';
        recGrid.appendChild(cardEl);
      }
    } else if (!isSel && existsInRec) {
      // Remove from rec-grid whether it was injected or pre-rendered
      recGrid.querySelector(`.agent-card[data-id="${id}"]`)?.remove();
    }
  }

  const c = document.getElementById('skill-count');
  if (c) c.textContent = t('skills_selected', {n: a.length});
  refreshSidenavChecks();
  saveSession();
}

function filterSkillRecCat(cat) {
  document.querySelectorAll('#skill-rec-cat-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.cat === cat));
  document.querySelectorAll('#skill-rec-grid .agent-card').forEach(card => {
    card.style.display = (!cat || card.dataset.cat === cat) ? '' : 'none';
  });
}

const _skcat = { activeCat:'', searchVal:'', rendered:false };

function skillCatalogFiltered() {
  return SKILLS_CATALOG.filter(s => {
    const catMatch = !_skcat.activeCat || s.category === _skcat.activeCat;
    const q = _skcat.searchVal;
    const textMatch = !q || (s.name + ' ' + s.desc + ' ' + s.category + ' ' + s.source).toLowerCase().includes(q);
    return catMatch && textMatch;
  });
}

function renderSkillCatalogChunked() {
  const grid = document.getElementById('skill-all-grid');
  if (!grid) return;
  const selected = new Set(S.ans.skills_wanted || []);
  const recIds   = new Set(computeSkillRecommendations(S.ans).slice(0, 20).map(r => r.id));
  const visible  = skillCatalogFiltered();
  grid.innerHTML = '';
  const cnt = document.getElementById('skill-all-count');
  if (cnt) cnt.textContent = t('skills_count', {n: visible.length});
  const CHUNK = 40;
  let offset = 0;
  function renderChunk() {
    const frag = document.createDocumentFragment();
    visible.slice(offset, offset + CHUNK).forEach(s => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = skillCardHtml(s, selected, recIds);
      frag.appendChild(wrapper.firstElementChild);
    });
    grid.appendChild(frag);
    offset += CHUNK;
    if (offset < visible.length) requestAnimationFrame(renderChunk);
    else applySkillFilters();
  }
  requestAnimationFrame(renderChunk);
}

function filterSkillCat(cat) {
  _skcat.activeCat = cat;
  document.querySelectorAll('#skill-all-cat-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.cat === cat));
  renderSkillCatalogChunked();
}

function filterSkillSearch(val) {
  _skcat.searchVal = val.toLowerCase();
  _skcat.activeCat = '';
  document.querySelectorAll('#skill-all-cat-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.cat === ''));
  renderSkillCatalogChunked();
}

function toggleSkillFullCatalog() {
  const panel = document.getElementById('skill-full-catalog');
  const btn   = document.getElementById('skill-catalog-btn');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (!isOpen) {
    if (!_skcat.rendered) {
      _skcat.rendered = true;
      const allCats = [...new Set(SKILLS_CATALOG.map(s => s.category))].sort();
      panel.innerHTML = `<div class="full-catalog-wrap">
        ${qfBarHtml('skill')}
        <div class="ap-bar">
          <input class="ap-search" id="skill-search" placeholder="${t('skills_search_ph',{n:SKILLS_CATALOG.length})}" oninput="filterSkillSearch(this.value)">
          <span class="ap-count" id="skill-all-count" style="flex-shrink:0"></span>
        </div>
        <div class="cat-tabs" id="skill-all-cat-tabs">
          <button class="cat-tab act" data-cat="" onclick="filterSkillCat('')">${t('skills_all_tab')}</button>
          ${allCats.map(c => `<button class="cat-tab" data-cat="${c}" onclick="filterSkillCat('${c}')">${SKILL_CAT_LABELS[c]||c}</button>`).join('')}
        </div>
        <div class="ap-grid" id="skill-all-grid" style="max-height:420px">
          <div class="loading" style="height:80px"><div class="spinner"></div></div>
        </div>
      </div>`;
      renderSkillCatalogChunked();
    }
    panel.style.display = 'block';
    btn.textContent = t('skills_collapse');
    btn.classList.add('open');
  } else {
    panel.style.display = 'none';
    btn.textContent = t('skills_browse', {n: SKILLS_CATALOG.length});
    btn.classList.remove('open');
  }
}

function renderSkillPicker(q, ans, level) {
  const recs     = computeSkillRecommendations(ans);
  const recLimit = level === 'fast' ? 10 : level === 'advanced' ? 15 : 20;
  const recIds   = new Set(recs.slice(0, recLimit).map(r => r.id));

  if (!ans.skills_wanted) ans.skills_wanted = [];

  const selected = new Set(ans.skills_wanted);

  // recPool = ONLY selected skills — shown = selected = exported, no gap
  const recPool  = SKILLS_CATALOG.filter(s => selected.has(s.id));
  const recCats  = [...new Set(recPool.map(s => s.category))].sort();

  const recCatTabs = `<div class="cat-tabs" id="skill-rec-cat-tabs">
    <button class="cat-tab act" data-cat="" onclick="filterSkillRecCat('')">${t('skills_all',{n:recPool.length})}</button>
    ${recCats.map(c => `<button class="cat-tab" data-cat="${c}" onclick="filterSkillRecCat('${c}')">${SKILL_CAT_LABELS[c]||c}</button>`).join('')}
  </div>`;

  const recCardsHtml = recPool.map(s => skillCardHtml(s, selected, recIds)).join('');

  _skcat.rendered = false;

  return `
    <div class="presel-bar">
      <span class="ap-hint" style="margin-bottom:0;flex-shrink:0">${t('skills_hint')}</span>
      <div style="display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;flex-shrink:0">
        <a href="${BOOK_LM_URL}" target="_blank" rel="noopener" class="booklm-btn">📘 Our Book LM</a>
        <span class="ap-count" id="skill-count">${t('skills_selected',{n:selected.size})}</span>
        <button class="btn bs" id="presel-toggle-skill" style="font-size:.7rem;padding:.18rem .5rem" onclick="togglePreselPanel('skill')">▸ show selection</button>
        <button class="btn bp" style="font-size:.7rem;padding:.18rem .5rem" onclick="resetSkillsToDefault()">★ preselect for me</button>
        <button class="btn bs" style="font-size:.7rem;padding:.18rem .5rem" onclick="clearAllSkills()">✕ remove all</button>
      </div>
    </div>
    <div id="presel-panel-skill" style="display:none">
      ${recCatTabs}
      <div class="ap-grid" id="skill-rec-grid">${recCardsHtml}</div>
    </div>
    <button class="catalog-toggle-btn" id="skill-catalog-btn" onclick="toggleSkillFullCatalog()">
      ${t('skills_browse',{n:SKILLS_CATALOG.length})}
    </button>
    <div id="skill-full-catalog" style="display:none"></div>`;
}

function renderAgentPicker(q, ans, level) {
  const recs   = computeAgentRecommendations(ans);
  const recIds = new Set(recs.slice(0, 15).map(r => r.id));

  if (!ans.agents_wanted) ans.agents_wanted = [];

  const selected = new Set(ans.agents_wanted);

  const recPool = AGENTS_CATALOG.filter(a => selected.has(a.id));
  const recCategories = [...new Set(recPool.map(a => a.category))].sort();

  const recCatTabsHtml = `<div class="cat-tabs" id="rec-cat-tabs">
    <button class="cat-tab act" data-cat="" onclick="filterRecCat('')">${t('agents_all',{n:recPool.length})}</button>
    ${recCategories.map(c => `<button class="cat-tab" data-cat="${c}" onclick="filterRecCat('${c}')">${CAT_LABELS[c]||c}</button>`).join('')}
  </div>`;

  const recCardsHtml = recPool.map(a => agentCardHtml(a, selected, recIds)).join('');

  return `
    <div class="presel-bar">
      <span class="ap-hint" style="margin-bottom:0;flex-shrink:0">${t('agents_hint')}</span>
      <div style="display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;flex-shrink:0">
        <a href="${BOOK_LM_URL}" target="_blank" rel="noopener" class="booklm-btn">📘 Our Book LM</a>
        <span class="ap-count" id="agent-count">${t('agents_selected',{n:selected.size})}</span>
        <button class="btn bs" id="presel-toggle-agent" style="font-size:.7rem;padding:.18rem .5rem" onclick="togglePreselPanel('agent')">▸ show selection</button>
        <button class="btn bp" style="font-size:.7rem;padding:.18rem .5rem" onclick="resetAgentsToDefault()">★ preselect for me</button>
        <button class="btn bs" style="font-size:.7rem;padding:.18rem .5rem" onclick="clearAllAgents()">✕ remove all</button>
      </div>
    </div>
    <div id="presel-panel-agent" style="display:none">
      ${recCatTabsHtml}
      <div class="ap-grid" id="rec-grid">${recCardsHtml}</div>
    </div>
    <button class="catalog-toggle-btn" id="catalog-toggle-btn" onclick="toggleFullCatalog()">
      ${t('agents_browse',{n:AGENTS_CATALOG.length})}
    </button>
    <div id="full-catalog" style="display:none"></div>`;
}

function toggleAgent(id) {
  if (!S.ans.agents_wanted) S.ans.agents_wanted = [];
  const a = S.ans.agents_wanted;
  const i = a.indexOf(id);
  if (i === -1) a.push(id); else a.splice(i, 1);
  const isSel = a.includes(id);

  // Update all existing cards sharing this id (rec-grid + full catalog)
  document.querySelectorAll(`.agent-card[data-id="${id}"]`).forEach(card => {
    card.classList.toggle('sel', isSel);
  });

  // Inject into rec-grid when selected from catalog; remove when deselected
  const recGrid = document.getElementById('rec-grid');
  if (recGrid) {
    const existsInRec = !!recGrid.querySelector(`.agent-card[data-id="${id}"]`);
    if (isSel && !existsInRec) {
      const agent = AGENTS_CATALOG.find(ag => ag.id === id);
      if (agent) {
        const recIds = new Set(computeAgentRecommendations(S.ans).slice(0, 15).map(r => r.id));
        const wrapper = document.createElement('div');
        wrapper.innerHTML = agentCardHtml(agent, new Set([id]), recIds);
        const cardEl = wrapper.firstElementChild;
        cardEl.dataset.injected = '1';
        recGrid.appendChild(cardEl);
      }
    } else if (!isSel) {
      const injected = recGrid.querySelector(`.agent-card[data-id="${id}"][data-injected]`);
      if (injected) injected.remove();
    }
  }

  const c = document.getElementById('agent-count');
  if (c) c.textContent = t('agents_selected',{n:a.length});

  refreshSidenavChecks();
  saveSession();
  // Sync orchestration diagram live if one is open
  syncOrchDiagramWithAgents();
}

function syncOrchDiagramWithAgents() {
  if (!window._cy || !window._currentOrchId) return;
  const orchId = window._currentOrchId;
  const o      = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  const agents    = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
  const agentIds  = new Set(agents.map(a => a.id));

  // Remove nodes for deselected agents (also removes connected edges in Cytoscape)
  window._cy.nodes().forEach(node => {
    if (!agentIds.has(node.id())) {
      if (o.dependencies) o.dependencies = o.dependencies.filter(d => d.from !== node.id() && d.to !== node.id());
      node.remove();
    }
  });

  // Add nodes for newly selected agents (skip excluded)
  const excl2 = orchExcluded(o);
  agents.filter(a => !excl2.has(a.id)).forEach(a => {
    if (!window._cy.getElementById(a.id).length) {
      if (!o.roles) o.roles = {};
      if (!o.roles[a.id]) o.roles[a.id] = 'worker';
      const c = CY_ROLE_COLORS[o.roles[a.id]] || CY_ROLE_COLORS.worker;
      window._cy.add({ group:'nodes', data:{ id:a.id, label:(a.name||a.id).slice(0,15), role:o.roles[a.id], bg:c.bg, text:c.text }});
    }
  });

  window._cy.layout(getCyLayout(o.type)).run();
  refreshDepList(orchId);
  // Also refresh the roles list so newly added agents appear immediately
  const rolesEl = document.querySelector(`#orch-item-${orchId} .orch-roles-section`);
  if (rolesEl) {
    const allAgents = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
    rolesEl.innerHTML = buildOrchRolesHtml(o, allAgents);
  }
}

function filterRecCat(cat) {
  document.querySelectorAll('#rec-cat-tabs .cat-tab').forEach(t => t.classList.toggle('act', t.dataset.cat === cat));
  document.querySelectorAll('#rec-grid .agent-card').forEach(card => {
    card.style.display = (!cat || card.dataset.cat === cat) ? '' : 'none';
  });
}

// ── Quality + provider filter state ─────────────────────────────────────────
const _qf = {
  agent:   { minQ: 0, sources: new Set() },
  skill:   { minQ: 0, sources: new Set() },
  command: { minQ: 0, sources: new Set() }
};

function applyCardFilters(gridId, minQ, sources) {
  document.querySelectorAll(`#${gridId} .agent-card`).forEach(card => {
    const q      = parseInt(card.dataset.quality || '0');
    const src    = card.dataset.source || '';
    const qualOk   = q >= minQ;
    const sourceOk = sources.size === 0 || sources.has(src);
    card.style.display = (qualOk && sourceOk) ? '' : 'none';
  });
}
function applyAgentFilters() {
  const { minQ, sources } = _qf.agent;
  applyCardFilters('all-grid', minQ, sources);
}
function applySkillFilters() {
  const { minQ, sources } = _qf.skill;
  applyCardFilters('skill-all-grid', minQ, sources);
}
function applyCommandFilters() {
  const { minQ, sources } = _qf.command;
  applyCardFilters('cmd-all-grid', minQ, sources);
}

function setCommandQFilter(minQ, btn) {
  _qf.command.minQ = minQ;
  btn.closest('.qf-bar').querySelectorAll('.qf-btn.qf-q').forEach(b => b.classList.toggle('act', b === btn));
  applyCommandFilters();
}

function togglePreselPanel(type) {
  const panel = document.getElementById('presel-panel-' + type);
  const btn   = document.getElementById('presel-toggle-' + type);
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : '';
  if (btn) btn.textContent = isOpen ? '▸ show selection' : '▴ hide selection';
}

function setAgentQFilter(minQ, btn) {
  _qf.agent.minQ = minQ;
  btn.closest('.qf-bar').querySelectorAll('.qf-btn.qf-q').forEach(b => b.classList.toggle('act', b === btn));
  applyAgentFilters();
}
function setSkillQFilter(minQ, btn) {
  _qf.skill.minQ = minQ;
  btn.closest('.qf-bar').querySelectorAll('.qf-btn.qf-q').forEach(b => b.classList.toggle('act', b === btn));
  applySkillFilters();
}
function toggleSourceFilter(type, source, btn) {
  const state = _qf[type];
  if (state.sources.has(source)) { state.sources.delete(source); btn.classList.remove('act'); }
  else                             { state.sources.add(source);    btn.classList.add('act');    }
  if (type === 'agent')   applyAgentFilters();
  else if (type === 'skill') applySkillFilters();
  else applyCommandFilters();
}

function clearAllAgents() {
  S.ans.agents_wanted = [];
  const recGrid = document.getElementById('rec-grid');
  if (recGrid) recGrid.innerHTML = '';
  document.querySelectorAll('#all-grid .agent-card').forEach(c => c.classList.remove('sel'));
  const panel = document.getElementById('presel-panel-agent');
  const tog   = document.getElementById('presel-toggle-agent');
  if (panel) panel.style.display = 'none';
  if (tog)   tog.textContent = '▸ show selection';
  const cnt = document.getElementById('agent-count');
  if (cnt) cnt.textContent = t('agents_selected', {n: 0});
}
function resetAgentsToDefault() {
  const recs  = computeAgentRecommendations(S.ans);
  const limit = S.level === 'fast' ? 5 : S.level === 'advanced' ? 10 : 15;
  S.ans.agents_wanted = recs.slice(0, limit).map(r => r.id);
  if (S.boardMode) boardRefreshSection('agents_wanted'); else render();
  const panel = document.getElementById('presel-panel-agent');
  const btn   = document.getElementById('presel-toggle-agent');
  if (panel) { panel.style.display = ''; }
  if (btn)   { btn.textContent = '▴ hide selection'; }
}
function clearAllSkills() {
  S.ans.skills_wanted = [];
  const recGrid = document.getElementById('skill-rec-grid');
  if (recGrid) recGrid.innerHTML = '';
  document.querySelectorAll('#skill-all-grid .agent-card').forEach(c => c.classList.remove('sel'));
  const panel = document.getElementById('presel-panel-skill');
  const tog   = document.getElementById('presel-toggle-skill');
  if (panel) panel.style.display = 'none';
  if (tog)   tog.textContent = '▸ show selection';
  const cnt = document.getElementById('skill-count');
  if (cnt) cnt.textContent = t('skills_selected', {n: 0});
}
function clearAllCommands() {
  S.ans.commands_wanted = [];
  const recGrid = document.getElementById('cmd-sel-grid');
  if (recGrid) recGrid.innerHTML = '';
  document.querySelectorAll('#cmd-all-grid .agent-card').forEach(c => c.classList.remove('sel'));
  const panel = document.getElementById('presel-panel-command');
  const tog   = document.getElementById('presel-toggle-command');
  if (panel) panel.style.display = 'none';
  if (tog)   tog.textContent = '▸ show selection';
  const cnt = document.getElementById('cmd-count');
  if (cnt) cnt.textContent = t('commands_selected', {n: 0});
}
// ── Presel quick-search ──────────────────────────────────────────────────────
function searchPresel(type, query) {
  const inp  = document.getElementById('presel-search-' + type);
  const drop = document.getElementById('presel-drop-' + type);
  if (!drop || !inp) return;

  const q = (query || '').trim().toLowerCase();
  if (!q) { drop.style.display = 'none'; return; }

  const catalog  = type === 'agent' ? AGENTS_CATALOG : type === 'skill' ? SKILLS_CATALOG : COMMANDS_CATALOG;
  const selArr   = type === 'agent' ? (S.ans.agents_wanted||[]) : type === 'skill' ? (S.ans.skills_wanted||[]) : (S.ans.commands_wanted||[]);
  const selected = new Set(selArr);
  const pfx      = type === 'command' ? '/' : '';

  const matches = catalog.filter(item => {
    const txt = ((item.name||'') + ' ' + (item.desc||'') + ' ' + (item.category||'') + ' ' + (item.source||'') + ' ' + ((item.tags||[]).join(' '))).toLowerCase();
    return txt.includes(q);
  }).slice(0, 12);

  drop.innerHTML = matches.length
    ? matches.map(item => {
        const isSel = selected.has(item.id);
        const tier  = item.tier || 'community';
        return `<div class="presel-drop-item${isSel?' sel':''}" onmousedown="addFromSearch('${type}','${item.id}')">
          <span class="presel-drop-name">${pfx}${item.name||item.id}</span>
          <span class="presel-drop-meta">${qualityStars(item.quality||0)} <span class="ac-tier tier-${tier}">${tier}</span>${isSel?' <span style="color:var(--grn2)">✓</span>':''}</span>
        </div>`;
      }).join('')
    : `<div class="presel-drop-empty"><span class="pfx">[--]</span> no match for "${query}"</div>`;

  // Use fixed positioning to escape any overflow:hidden/auto ancestors
  const rect = inp.getBoundingClientRect();
  drop.style.position = 'fixed';
  drop.style.top      = (rect.bottom + 2) + 'px';
  drop.style.left     = rect.left + 'px';
  drop.style.width    = rect.width + 'px';
  drop.style.display  = 'block';
}

function addFromSearch(type, id) {
  if (type === 'agent')      toggleAgent(id);
  else if (type === 'skill') toggleSkill(id);
  else                       toggleCommand(id);

  const arr = type === 'agent' ? S.ans.agents_wanted : type === 'skill' ? S.ans.skills_wanted : S.ans.commands_wanted;
  if (arr && arr.includes(id)) {
    const panel = document.getElementById('presel-panel-' + type);
    const tog   = document.getElementById('presel-toggle-' + type);
    if (panel && panel.style.display === 'none') {
      panel.style.display = '';
      if (tog) tog.textContent = '▴ hide selection';
    }
  }

  const inp = document.getElementById('presel-search-' + type);
  if (inp && inp.value) searchPresel(type, inp.value);
}

function closePreselDrop(type) {
  const drop = document.getElementById('presel-drop-' + type);
  if (drop) drop.style.display = 'none';
}

function resetCommandsToDefault() {
  const recs  = computeCommandRecommendations(S.ans);
  const limit = S.level === 'fast' ? 4 : S.level === 'advanced' ? 7 : 10;
  S.ans.commands_wanted = recs.slice(0, limit).map(r => r.id);
  if (S.boardMode) boardRefreshSection('commands_wanted'); else render();
  const panel = document.getElementById('presel-panel-command');
  const btn   = document.getElementById('presel-toggle-command');
  if (panel) panel.style.display = '';
  if (btn)   btn.textContent = '▴ hide selection';
}
function resetSkillsToDefault() {
  const recs     = computeSkillRecommendations(S.ans);
  const recLimit = S.level === 'fast' ? 10 : S.level === 'advanced' ? 15 : 20;
  S.ans.skills_wanted = [...new Set(recs.slice(0, recLimit).map(r => r.id))];
  if (S.boardMode) boardRefreshSection('skills_wanted'); else render();
  const panel = document.getElementById('presel-panel-skill');
  const btn   = document.getElementById('presel-toggle-skill');
  if (panel) { panel.style.display = ''; }
  if (btn)   { btn.textContent = '▴ hide selection'; }
}

function qfBarHtml(type) {
  const catalog = type === 'agent' ? AGENTS_CATALOG : type === 'skill' ? SKILLS_CATALOG : COMMANDS_CATALOG;
  const qfn     = type === 'agent' ? 'setAgentQFilter' : type === 'skill' ? 'setSkillQFilter' : 'setCommandQFilter';
  // Build sorted provider list (by count desc)
  const counts = {};
  catalog.forEach(x => { counts[x.source] = (counts[x.source] || 0) + 1; });
  const providers = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const provBtns = providers.map(src => {
    const tier  = (catalog.find(x => x.source === src) || {}).tier || 'community';
    return `<button class="qf-btn qf-src qf-src-${tier}" title="${counts[src]} items" onclick="toggleSourceFilter('${type}','${src}',this)">${src}</button>`;
  }).join('');
  return `<div class="qf-bar">
    <span class="qf-label">quality:</span>
    <button class="qf-btn qf-q act" onclick="${qfn}(0,this)">all</button>
    <button class="qf-btn qf-q"     onclick="${qfn}(50,this)">★★★+</button>
    <button class="qf-btn qf-q"     onclick="${qfn}(65,this)">★★★★+</button>
    <button class="qf-btn qf-q"     onclick="${qfn}(80,this)">★★★★★</button>
    <span class="qf-sep">|</span>
    <span class="qf-label">provider:</span>
    ${provBtns}
  </div>`;
}

// Catalog state — tracks current filter so re-renders stay consistent
const _cat = { activeCat: '', searchVal: '', activeTag: '', rendered: false };

const DOMAIN_TAG_FILTERS = {
  coaching: [
    { tag: 'football', l: '⚽ Football' },
    { tag: 'sport',    l: '🏃 Sport' },
    { tag: 'holistic', l: '🔮 Holistic' }
  ]
};

function toggleFullCatalog() {
  const panel = document.getElementById('full-catalog');
  const btn   = document.getElementById('catalog-toggle-btn');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';

  if (!isOpen) {
    if (!_cat.rendered) {
      _cat.rendered = true;
      const allCats = [...new Set(AGENTS_CATALOG.map(a => a.category))].sort();
      panel.innerHTML = `<div class="full-catalog-wrap">
        ${qfBarHtml('agent')}
        <div class="ap-bar">
          <input class="ap-search" id="all-search" placeholder="${t('agents_search_ph',{n:AGENTS_CATALOG.length})}" oninput="filterAllSearch(this.value)">
          <span class="ap-count" id="all-count" style="flex-shrink:0"></span>
        </div>
        <div class="cat-tabs" id="all-cat-tabs">
          <button class="cat-tab act" data-cat="" onclick="filterAllCat('')">${t('agents_all_tab')}</button>
          ${allCats.map(c => `<button class="cat-tab" data-cat="${c}" onclick="filterAllCat('${c}')">${CAT_LABELS[c]||c}</button>`).join('')}
        </div>
        <div class="ap-grid" id="all-grid" style="max-height:420px">
          <div class="loading" style="height:80px"><div class="spinner"></div></div>
        </div>
      </div>`;
      // Render first visible batch immediately, rest in chunks
      renderCatalogChunked();
    }
    panel.style.display = 'block';
    btn.textContent = t('agents_collapse');
    btn.classList.add('open');
  } else {
    panel.style.display = 'none';
    btn.textContent = t('agents_browse',{n:AGENTS_CATALOG.length});
    btn.classList.remove('open');
  }
}

function renderCatalogChunked() {
  const grid = document.getElementById('all-grid');
  if (!grid) return;

  const selected = new Set(S.ans.agents_wanted || []);
  const recIds   = new Set(computeAgentRecommendations(S.ans).slice(0, 15).map(r => r.id));

  // Filter to active category/search up front
  const visible = catalogFiltered();

  grid.innerHTML = ''; // clear spinner
  updateAllCount(visible.length);

  const CHUNK = 40;
  let offset = 0;

  function renderChunk() {
    const frag = document.createDocumentFragment();
    const slice = visible.slice(offset, offset + CHUNK);
    slice.forEach(a => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = agentCardHtml(a, selected, recIds);
      frag.appendChild(wrapper.firstElementChild);
    });
    grid.appendChild(frag);
    offset += CHUNK;
    if (offset < visible.length) requestAnimationFrame(renderChunk);
    else applyAgentFilters();
  }

  requestAnimationFrame(renderChunk);
}

function catalogFiltered() {
  return AGENTS_CATALOG.filter(a => {
    const catMatch = !_cat.activeCat || a.category === _cat.activeCat;
    const tagMatch = !_cat.activeTag || (a.tags || []).includes(_cat.activeTag);
    const q = _cat.searchVal;
    const textMatch = !q || (a.name + ' ' + (a.desc||'') + ' ' + (a.tags||[]).join(' ') + ' ' + a.category + ' ' + (a.source||'')).toLowerCase().includes(q);
    return catMatch && tagMatch && textMatch;
  });
}

function updateDomainSubTabs() {
  const existing = document.getElementById('domain-sub-tabs');
  const domainFilters = DOMAIN_TAG_FILTERS[_cat.activeCat];
  if (!domainFilters) { if (existing) existing.remove(); return; }
  if (existing) { existing.style.display = ''; return; }
  const tabsEl = document.getElementById('all-cat-tabs');
  if (!tabsEl) return;
  const div = document.createElement('div');
  div.id = 'domain-sub-tabs';
  div.className = 'cat-tabs';
  div.style.marginTop = '.35rem';
  div.innerHTML = `<button class="cat-tab act" data-tag="" onclick="filterByTag('')">All</button>
    ${domainFilters.map(d => `<button class="cat-tab" data-tag="${d.tag}" onclick="filterByTag('${d.tag}')">${d.l}</button>`).join('')}`;
  tabsEl.insertAdjacentElement('afterend', div);
}

function filterByTag(tag) {
  _cat.activeTag = tag;
  document.querySelectorAll('#domain-sub-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.tag === tag));
  renderCatalogChunked();
}

function updateAllCount(n) {
  const el = document.getElementById('all-count');
  if (el) el.textContent = `${n} agent${n !== 1 ? 's' : ''}`;
}

function filterAllCat(cat) {
  _cat.activeCat = cat;
  _cat.activeTag = '';
  document.querySelectorAll('#all-cat-tabs .cat-tab').forEach(t => t.classList.toggle('act', t.dataset.cat === cat));
  // Remove stale sub-tabs so updateDomainSubTabs re-injects the right ones
  const prev = document.getElementById('domain-sub-tabs');
  if (prev) prev.remove();
  updateDomainSubTabs();
  renderCatalogChunked();
}

function filterAllSearch(val) {
  _cat.searchVal = val.toLowerCase();
  _cat.activeCat = '';
  _cat.activeTag = '';
  document.querySelectorAll('#all-cat-tabs .cat-tab').forEach(t => t.classList.toggle('act', t.dataset.cat === ''));
  const prev = document.getElementById('domain-sub-tabs');
  if (prev) prev.remove();
  renderCatalogChunked();
}

// ═══════════════════════════════════════════════════════════
// COMMAND SCORING ENGINE
// ═══════════════════════════════════════════════════════════
function computeCommandRecommendations(ans) {
  if (!COMMANDS_CATALOG.length) return [];
  const scores = {};

  function add(id, w) { scores[id] = (scores[id] || 0) + w; }

  function scoreByKw(kw, w) {
    const k = kw.toLowerCase();
    COMMANDS_CATALOG.forEach(c => {
      if ((c.name + ' ' + (c.desc || '')).toLowerCase().includes(k)) add(c.id, w);
    });
  }

  function scoreByCat(cat, w) {
    COMMANDS_CATALOG.filter(c => c.category === cat).forEach(c => add(c.id, w));
  }

  // Always-on: universal workflow commands
  scoreByKw('review', 4);
  scoreByKw('commit', 3);
  scoreByKw('doc', 2);
  scoreByCat('git', 2);

  // Stack
  const stack = [].concat(ans.stack || []);
  if (stack.includes('python'))     { scoreByKw('python', 5); scoreByKw('clean', 4); }
  if (stack.includes('react') || stack.includes('vue')) { scoreByCat('frontend', 5); scoreByKw('accessibility', 4); }
  if (stack.includes('typescript')) { scoreByKw('typescript', 4); }
  if (stack.includes('go'))         { scoreByKw('golang', 5); }
  if (stack.includes('rust'))       { scoreByKw('rust', 5); }
  if (stack.includes('java'))       { scoreByKw('java', 5); scoreByKw('spring', 4); }
  if (stack.includes('mobile'))     { scoreByKw('mobile', 5); }
  if (stack.includes('devops'))     { scoreByCat('devops', 6); scoreByKw('deploy', 5); scoreByKw('k8s', 5); scoreByKw('docker', 4); }
  if (stack.includes('sql'))        { scoreByCat('database', 5); scoreByKw('migrate', 5); }

  // Domain (iterate over all selected domains)
  const domains_cmd = [].concat(ans.domain || []);
  for (const domain of domains_cmd) {
    if (domain === 'apps')        { scoreByKw('feature', 5); scoreByKw('deploy', 4); scoreByKw('component', 4); }
    if (domain === 'data')        { scoreByCat('devops', 5); scoreByKw('pipeline', 6); scoreByKw('ml', 5); scoreByKw('data', 4); }
    if (domain === 'ai')          { scoreByCat('ai', 8); scoreByKw('llm', 6); scoreByKw('rag', 5); scoreByKw('agent', 5); }
    if (domain === 'content')     { scoreByCat('docs', 6); scoreByKw('doc', 5); scoreByKw('content', 4); }
    if (domain === 'business')    { scoreByKw('report', 5); scoreByKw('workflow', 5); scoreByKw('crm', 4); }
    if (domain === 'security')    { scoreByCat('security', 8); scoreByKw('audit', 6); scoreByKw('scan', 5); }
    if (domain === 'mleng')       { scoreByCat('devops', 5); scoreByKw('ml', 7); scoreByKw('train', 6); scoreByKw('deploy', 5); }
    if (domain === 'blockchain')  { scoreByKw('audit', 6); scoreByKw('test', 5); scoreByKw('deploy', 4); }
    if (domain === 'science')     { scoreByKw('compute', 5); scoreByKw('simulate', 5); scoreByKw('benchmark', 4); }
    if (domain === 'immersive')   { scoreByKw('render', 5); scoreByKw('scene', 5); scoreByKw('asset', 4); }
    if (domain === 'integration') { scoreByCat('devops', 5); scoreByKw('deploy', 6); scoreByKw('api', 5); scoreByKw('event', 4); }
    if (domain === 'embedded')    { scoreByKw('flash', 5); scoreByKw('firmware', 5); scoreByKw('hardware', 4); }
    if (domain === 'media')       { scoreByKw('encode', 5); scoreByKw('stream', 5); scoreByKw('render', 4); }
    if (domain === 'devtools')    { scoreByKw('build', 6); scoreByKw('publish', 5); scoreByKw('release', 5); }
    if (domain === 'fintech')     { scoreByCat('security', 6); scoreByKw('compliance', 6); scoreByKw('audit', 5); }
  }

  // TDD → testing commands
  if (ans.tdd_level && ans.tdd_level !== 'no_tdd') {
    scoreByCat('testing', 7);
    scoreByKw('tdd', 7);
    scoreByKw('test', 5);
  }

  // Compliance → security commands
  const comply = [].concat(ans.compliance || []);
  if (comply.length)           { scoreByCat('security', 6); scoreByKw('compliance', 6); scoreByKw('audit', 5); }

  // AI tools → ai commands
  if ([].concat(ans.ai_tools || []).includes('claude_code')) { scoreByCat('ai', 5); scoreByKw('claude', 5); }

  // Autonomy → workflow/devops
  if (ans.autonomy === 'autonomous') { scoreByCat('workflow', 5); scoreByKw('automate', 4); scoreByKw('pipeline', 4); }

  // Database
  const db = [].concat(ans.database || []);
  if (db.length) { scoreByCat('database', 5); scoreByKw('migrate', 5); }

  // Subdomains
  const sub = [].concat(ans.subdomain || []);
  if (sub.includes('api'))      { scoreByCat('api', 6); scoreByKw('scaffold', 5); scoreByKw('mock', 4); }
  if (sub.includes('ml') || sub.includes('llm') || sub.includes('rag')) { scoreByCat('ai', 6); scoreByKw('ml', 5); scoreByKw('pipeline', 4); }
  if (sub.includes('auth') || sub.includes('billing')) { scoreByCat('security', 5); scoreByKw('compliance', 4); }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ id, score }));
}

// ═══════════════════════════════════════════════════════════
// COMMAND PICKER
// ═══════════════════════════════════════════════════════════
const CMD_CAT_LABELS = {
  git:'Git', testing:'Testing', security:'Security', quality:'Quality',
  debugging:'Debug', docs:'Docs', devops:'DevOps', api:'API',
  database:'Database', frontend:'Frontend', backend:'Backend', ai:'AI / ML',
  performance:'Perf', workflow:'Workflow', accessibility:'A11y', other:'Other'
};

function commandCardHtml(c, selected) {
  const isSel    = selected.has(c.id);
  const name     = c.name || c.id;
  const desc     = (c.desc || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const tier     = c.tier    || 'community';
  const quality  = c.quality || 0;
  return `<div class="agent-card${isSel?' sel':''}" data-id="${c.id}" data-cat="${c.category}" data-name="${(name).replace(/"/g,'&quot;')}" data-tier="${tier}" data-quality="${quality}" data-source="${c.source||''}" onclick="toggleCommand('${c.id}')">
    <div class="ac-name">/${name}</div>
    <div class="ac-desc">${desc}</div>
    <div class="ac-badges">
      <span class="ac-cat cat-${c.category}">${CMD_CAT_LABELS[c.category]||c.category}</span>
      <span class="ac-tier tier-${tier}">${tier}</span>
      <span class="ac-quality">${qualityStars(quality)}</span>
    </div>
  </div>`;
}

function toggleCommand(id) {
  if (!S.ans.commands_wanted) S.ans.commands_wanted = [];
  const a = S.ans.commands_wanted;
  const i = a.indexOf(id);
  if (i === -1) a.push(id); else a.splice(i, 1);
  const isSel = a.includes(id);
  document.querySelectorAll(`.agent-card[data-id="${id}"]`).forEach(card => card.classList.toggle('sel', isSel));
  const recGrid = document.getElementById('cmd-sel-grid');
  if (recGrid) {
    const exists = !!recGrid.querySelector(`.agent-card[data-id="${id}"]`);
    if (isSel && !exists) {
      const cmd = COMMANDS_CATALOG.find(c => c.id === id);
      if (cmd) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = commandCardHtml(cmd, new Set([id]));
        const el = wrapper.firstElementChild;
        el.dataset.injected = '1';
        recGrid.appendChild(el);
      }
    } else if (!isSel && exists) {
      recGrid.querySelector(`.agent-card[data-id="${id}"]`)?.remove();
    }
  }
  const c = document.getElementById('cmd-count');
  if (c) c.textContent = t('commands_selected',{n:a.length});
  refreshSidenavChecks();
  saveSession();
}

function filterCmdSelCat(cat) {
  document.querySelectorAll('#cmd-sel-cat-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.cat === cat));
  document.querySelectorAll('#cmd-sel-grid .agent-card').forEach(card => {
    card.style.display = (!cat || card.dataset.cat === cat) ? '' : 'none';
  });
}

const _cmdcat = { activeCat:'', searchVal:'', rendered:false };

function commandCatalogFiltered() {
  return COMMANDS_CATALOG.filter(c => {
    const catMatch = !_cmdcat.activeCat || c.category === _cmdcat.activeCat;
    const q = _cmdcat.searchVal;
    const textMatch = !q || (c.name + ' ' + c.desc + ' ' + c.category + ' ' + c.source).toLowerCase().includes(q);
    return catMatch && textMatch;
  });
}

function renderCommandCatalogChunked() {
  const grid = document.getElementById('cmd-all-grid');
  if (!grid) return;
  const selected = new Set(S.ans.commands_wanted || []);
  const visible = commandCatalogFiltered();
  grid.innerHTML = '';
  const cnt = document.getElementById('cmd-all-count');
  if (cnt) cnt.textContent = t('commands_count',{n: visible.length});
  const CHUNK = 40;
  let offset = 0;
  function renderChunk() {
    const frag = document.createDocumentFragment();
    visible.slice(offset, offset + CHUNK).forEach(c => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = commandCardHtml(c, selected);
      frag.appendChild(wrapper.firstElementChild);
    });
    grid.appendChild(frag);
    offset += CHUNK;
    if (offset < visible.length) requestAnimationFrame(renderChunk);
    else applyCommandFilters();
  }
  requestAnimationFrame(renderChunk);
}

function filterCmdCat(cat) {
  _cmdcat.activeCat = cat;
  document.querySelectorAll('#cmd-all-cat-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.cat === cat));
  renderCommandCatalogChunked();
}

function filterCmdSearch(val) {
  _cmdcat.searchVal = val.toLowerCase();
  _cmdcat.activeCat = '';
  document.querySelectorAll('#cmd-all-cat-tabs .cat-tab').forEach(b => b.classList.toggle('act', b.dataset.cat === ''));
  renderCommandCatalogChunked();
}

function toggleCommandFullCatalog() {
  const panel = document.getElementById('cmd-full-catalog');
  const btn   = document.getElementById('cmd-catalog-btn');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (!isOpen) {
    if (!_cmdcat.rendered) {
      _cmdcat.rendered = true;
      const allCats = [...new Set(COMMANDS_CATALOG.map(c => c.category))].sort();
      panel.innerHTML = `<div class="full-catalog-wrap">
        ${qfBarHtml('command')}
        <div class="ap-bar">
          <input class="ap-search" id="cmd-search" placeholder="${t('commands_search_ph',{n:COMMANDS_CATALOG.length})}" oninput="filterCmdSearch(this.value)">
          <span class="ap-count" id="cmd-all-count" style="flex-shrink:0"></span>
        </div>
        <div class="cat-tabs" id="cmd-all-cat-tabs">
          <button class="cat-tab act" data-cat="" onclick="filterCmdCat('')">${t('commands_all_tab')}</button>
          ${allCats.map(c => `<button class="cat-tab" data-cat="${c}" onclick="filterCmdCat('${c}')">${CMD_CAT_LABELS[c]||c}</button>`).join('')}
        </div>
        <div class="ap-grid" id="cmd-all-grid" style="max-height:420px">
          <div class="loading" style="height:80px"><div class="spinner"></div></div>
        </div>
      </div>`;
      renderCommandCatalogChunked();
    }
    panel.style.display = 'block';
    btn.textContent = t('commands_collapse');
    btn.classList.add('open');
  } else {
    panel.style.display = 'none';
    btn.textContent = t('commands_browse',{n: COMMANDS_CATALOG.length});
    btn.classList.remove('open');
  }
}

function renderCommandPicker(q, ans, level) {
  if (!ans.commands_wanted) ans.commands_wanted = [];
  const selected = new Set(ans.commands_wanted);
  const selPool  = COMMANDS_CATALOG.filter(c => selected.has(c.id));
  const selCats  = [...new Set(selPool.map(c => c.category))].sort();

  const selCatTabs = selPool.length ? `<div class="cat-tabs" id="cmd-sel-cat-tabs">
    <button class="cat-tab act" data-cat="" onclick="filterCmdSelCat('')">${t('commands_all',{n:selPool.length})}</button>
    ${selCats.map(c => `<button class="cat-tab" data-cat="${c}" onclick="filterCmdSelCat('${c}')">${CMD_CAT_LABELS[c]||c}</button>`).join('')}
  </div>` : '';

  const selCardsHtml = selPool.map(c => commandCardHtml(c, selected)).join('');
  _cmdcat.rendered = false;

  return `
    <div class="presel-bar">
      <span class="ap-hint" style="margin-bottom:0;flex-shrink:0">${t('commands_hint')}</span>
      <div style="display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;flex-shrink:0">
        <a href="${BOOK_LM_URL}" target="_blank" rel="noopener" class="booklm-btn">📘 Our Book LM</a>
        <span class="ap-count" id="cmd-count">${t('commands_selected',{n:selected.size})}</span>
        <button class="btn bs" id="presel-toggle-command" style="font-size:.7rem;padding:.18rem .5rem" onclick="togglePreselPanel('command')">▸ show selection</button>
        <button class="btn bp" style="font-size:.7rem;padding:.18rem .5rem" onclick="resetCommandsToDefault()">★ preselect for me</button>
        <button class="btn bs" style="font-size:.7rem;padding:.18rem .5rem" onclick="clearAllCommands()">✕ remove all</button>
      </div>
    </div>
    <div id="presel-panel-command" style="display:none">
      ${selCatTabs}
      <div class="ap-grid" id="cmd-sel-grid">${selCardsHtml}</div>
    </div>
    <button class="catalog-toggle-btn" id="cmd-catalog-btn" onclick="toggleCommandFullCatalog()">
      ${t('commands_browse',{n:COMMANDS_CATALOG.length})}
    </button>
    <div id="cmd-full-catalog" style="display:none"></div>`;
}

// ═══════════════════════════════════════════════════════════
// ORCHESTRATION MODULE — multi-orchestration manager
// ═══════════════════════════════════════════════════════════
const ORCH_TYPES = [
  { v:'sequential',   i:'→',  l:'Sequential Chain',      d:'Agents in series — output of one becomes input of next' },
  { v:'parallel',     i:'⫶',  l:'Parallel Execution',    d:'Agents run simultaneously, results aggregated at the end' },
  { v:'hierarchical', i:'▲',  l:'Hierarchical',          d:'Supervisor directs and coordinates Worker agents' },
  { v:'router',       i:'◈',  l:'Router / Selector',     d:'One agent dynamically selects which specialist handles next' },
  { v:'debate',       i:'⟺', l:'Multi-Agent Debate',    d:'Agents critique each other, converging on best answer' },
  { v:'swarm',        i:'◉',  l:'Swarm',                 d:'Self-organizing agents dynamically pick up tasks' },
  { v:'hitl',         i:'👤', l:'Human-in-the-Loop',     d:'Human validation required at defined checkpoints' },
  { v:'custom',       i:'⬡',  l:'Custom Graph',          d:'Free-form connections — design your own topology' }
];

const ORCH_ROLES = [
  { v:'supervisor',  l:'Supervisor', c:'var(--amb)' },
  { v:'worker',      l:'Worker',     c:'var(--grn2)' },
  { v:'critic',      l:'Critic',     c:'var(--acl)' },
  { v:'router',      l:'Router',     c:'var(--grn3)' },
  { v:'validator',   l:'Validator',  c:'rgba(57,255,20,.7)' },
  { v:'fallback',    l:'Fallback',   c:'var(--mut)' }
];

// Cytoscape role colors (CSS-var-free, used directly in canvas)
const CY_ROLE_COLORS = {
  supervisor: { bg:'#f0a500', text:'#050905' },
  worker:     { bg:'#50fa7b', text:'#050905' },
  critic:     { bg:'#bd93f9', text:'#0a0840' },
  router:     { bg:'#8be9fd', text:'#050905' },
  validator:  { bg:'#98e4a5', text:'#050905' },
  fallback:   { bg:'#6e768a', text:'#f8f8f2' }
};

// ── helpers ────────────────────────────────────────────────
function orchSlug(name) {
  return (name || 'orchestration').toLowerCase()
    .replace(/[éèêë]/g,'e').replace(/[àâä]/g,'a').replace(/[ùûü]/g,'u')
    .replace(/[îï]/g,'i').replace(/[ôö]/g,'o')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'orchestration';
}

let _orchIdSeed = 0;
function newOrchId() { return 'orch-' + (Date.now() + _orchIdSeed++); }

function getOrchestrations() {
  if (!S.ans.orchestrations) {
    // Migrate old single-orchestration format
    if (S.ans.orchestration && S.ans.orchestration.type) {
      S.ans.orchestrations = [{
        id: 'orch-0',
        name: 'Main Orchestration',
        type: S.ans.orchestration.type,
        roles: S.ans.orchestration.roles || {},
        notes: S.ans.orchestration.notes || {},
        dependencies: [],
        diagramGraph: S.ans.orchestration.graph || null,
        diagramPng: S.ans.orchestration.diagramPng || null
      }];
    } else {
      S.ans.orchestrations = [];
    }
  }
  return S.ans.orchestrations;
}

// ── dep auto-fill from type ─────────────────────────────────
function autoFillDeps(type, agents, roles) {
  const deps = [];
  const byRole = r => agents.filter(a => (roles[a.id] || 'worker') === r).map(a => a.id);
  const sups = byRole('supervisor'), routers = byRole('router');
  const add = (from, to) => deps.push({ from, to });

  if (type === 'sequential' || type === 'hitl') {
    for (let i = 0; i < agents.length - 1; i++) add(agents[i].id, agents[i+1].id);
  } else if (type === 'parallel') {
    const anchor = sups[0] || agents[0]?.id;
    if (anchor) agents.filter(a => a.id !== anchor).forEach(a => add(anchor, a.id));
  } else if (type === 'hierarchical' || type === 'custom') {
    const tops = sups.length ? sups : (agents[0] ? [agents[0].id] : []);
    const rest = agents.filter(a => !tops.includes(a.id)).map(a => a.id);
    tops.forEach(s => rest.forEach(w => add(s, w)));
  } else if (type === 'router') {
    const rts = routers.length ? routers : (agents[0] ? [agents[0].id] : []);
    agents.filter(a => !rts.includes(a.id)).forEach(t => rts.forEach(r => add(r, t)));
  } else if (type === 'debate' || type === 'swarm') {
    for (let i = 0; i < agents.length; i++)
      for (let j = i + 1; j < agents.length; j++) add(agents[i].id, agents[j].id);
  }
  return deps;
}

// ── Cytoscape layout ────────────────────────────────────────
function getCyLayout(orchType) {
  if (orchType === 'sequential' || orchType === 'hitl')
    return { name:'breadthfirst', directed:true, spacingFactor:1.6, avoidOverlap:true, nodeDimensionsIncludeLabels:true };
  if (orchType === 'hierarchical' || orchType === 'router' || orchType === 'custom' || orchType === 'parallel')
    return { name:'breadthfirst', directed:true, spacingFactor:1.4, avoidOverlap:true };
  return { name:'circle', spacingFactor:1.5, avoidOverlap:true };
}

// ── Cytoscape instance management ──────────────────────────
window._currentOrchId = null;

function buildOrchDiagram2(orchId) {
  const cont = document.getElementById('orch-diagram');
  if (!cont) return;
  if (typeof cytoscape === 'undefined') {
    cont.innerHTML = '<div style="padding:1rem;color:var(--red);font-size:.78rem">[!] Cytoscape.js not loaded.</div>';
    return;
  }
  if (window._cy) { try { window._cy.destroy(); } catch(_) {} window._cy = null; }

  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  const agents = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
  if (!agents.length) return;

  window._currentOrchId = orchId;
  const wrap = document.getElementById('orch-diagram-wrap');
  if (wrap) wrap.style.display = '';
  cont.style.display = '';

  const excl  = orchExcluded(o);
  const nodes = agents.filter(a => !excl.has(a.id)).map(a => {
    const role = (o.roles || {})[a.id] || 'worker';
    const c = CY_ROLE_COLORS[role] || CY_ROLE_COLORS.worker;
    return { data: { id: a.id, label: (a.name || a.id).slice(0,15), role, bg: c.bg, text: c.text } };
  });
  const edges = (o.dependencies || []).filter(dep => !excl.has(dep.from) && !excl.has(dep.to)).map(dep => ({
    data: { id: dep.from+'-'+dep.to, source: dep.from, target: dep.to, label: '' }
  }));

  window._cy = cytoscape({
    container: cont,
    elements: [...nodes, ...edges],
    style: [
      { selector:'node', style:{
        'background-color':'data(bg)','label':'data(label)','color':'data(text)',
        'font-family':'JetBrains Mono,monospace','font-size':'11px','font-weight':'700',
        'text-valign':'center','text-halign':'center',
        'width':110,'height':36,'shape':'roundrectangle',
        'text-wrap':'ellipsis','text-max-width':'105px'
      }},
      { selector:'node:selected', style:{'border-width':2,'border-color':'#7c6af7'}},
      { selector:'edge', style:{
        'width':1.5,'line-color':'#4a7a4a','target-arrow-color':'#50fa7b',
        'target-arrow-shape':'triangle','curve-style':'bezier','arrow-scale':1.1,
        'label':'data(label)','font-size':'9px','color':'#4a7a4a',
        'text-background-color':'#0a0e0a','text-background-opacity':1,'text-background-padding':'2px'
      }},
      { selector:'edge:selected', style:{'line-color':'#7c6af7','target-arrow-color':'#a89af8'}}
    ],
    layout: getCyLayout(o.type),
    userZoomingEnabled:true, userPanningEnabled:true, minZoom:0.3, maxZoom:3
  });

  window._cy.on('tap','node', evt => showOrchAgentPanel(orchId, evt.target.id()));
  window._cy.on('tap','edge', evt => showOrchEdgePanel(orchId, evt.target.data('source'), evt.target.data('target')));
  window._cy.on('tap',       evt => { if (evt.target === window._cy) closeOrchPanel(); });

  ['orch-relayout-btn','orch-save-png-btn'].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = '';
  });
}

function relayoutDiagram() {
  if (!window._cy) return;
  const o = getOrchestrations().find(o => o.id === window._currentOrchId) || {};
  window._cy.layout(getCyLayout(o.type)).run();
}

function saveDiagramPng() {
  if (!window._cy) return;
  const orchId = window._currentOrchId;
  const png = window._cy.png({ full:true, scale:2, bg:'#0a0e0a' });
  const o = getOrchestrations().find(o => o.id === orchId);
  if (o) { o.diagramPng = png; o.diagramGraph = window._cy.json(); }
  const btn = document.getElementById('orch-save-png-btn');
  if (btn) { btn.textContent='✓ Saved'; setTimeout(()=>{ btn.textContent='📷 Save PNG'; },2200); }
}

function orchExcluded(o) { return new Set(o.excluded || []); }

function toggleOrchExclude(orchId, agentId) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  if (!o.excluded) o.excluded = [];
  const idx = o.excluded.indexOf(agentId);
  if (idx === -1) {
    o.excluded.push(agentId);
    // Remove from diagram
    if (window._cy && window._currentOrchId === orchId) {
      const node = window._cy.getElementById(agentId);
      if (node.length) node.remove();
      window._cy.layout(getCyLayout(o.type)).run();
    }
  } else {
    o.excluded.splice(idx, 1);
    // Re-add to diagram
    if (window._cy && window._currentOrchId === orchId) {
      const role = (o.roles || {})[agentId] || 'worker';
      const c = CY_ROLE_COLORS[role] || CY_ROLE_COLORS.worker;
      const agent = AGENTS_CATALOG.find(a => a.id === agentId);
      window._cy.add({ group:'nodes', data:{ id:agentId, label:(agent?.name||agentId).slice(0,15), role, bg:c.bg, text:c.text }});
      rebuildCyEdges(orchId);
    }
  }
  refreshDepList(orchId);
  // Refresh roles section in the edit panel
  const rolesEl = document.querySelector(`#orch-item-${orchId} .orch-roles-section`);
  if (rolesEl) {
    const agents = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
    rolesEl.innerHTML = buildOrchRolesHtml(o, agents);
  }
}

function rebuildCyEdges(orchId) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o || !window._cy || window._currentOrchId !== orchId) return;
  const excl = orchExcluded(o);
  window._cy.edges().remove();
  (o.dependencies || []).filter(dep => !excl.has(dep.from) && !excl.has(dep.to)).forEach(dep => {
    if (!window._cy.getElementById(dep.from+'-'+dep.to).length)
      window._cy.add({ group:'edges', data:{ id:dep.from+'-'+dep.to, source:dep.from, target:dep.to, label:'' }});
  });
  window._cy.layout(getCyLayout(o.type)).run();
}

// ── side panels ─────────────────────────────────────────────
function showOrchAgentPanel(orchId, agentId) {
  const panel = document.getElementById('orch-agent-panel');
  if (!panel) return;
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  const agent  = AGENTS_CATALOG.find(a => a.id === agentId);
  const role   = (o.roles || {})[agentId] || 'worker';
  const note   = (o.notes || {})[agentId] || '';
  const agents = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);

  const roleBtns = ORCH_ROLES.map(r =>
    `<button class="orch-role-btn${role===r.v?' sel':''}"
      style="${role===r.v?`border-color:${r.c};color:${r.c}`:''}"
      onclick="setOrchRole2('${orchId}','${agentId}','${r.v}')">${r.l}</button>`
  ).join('');

  const toOpts = agents.filter(a => a.id !== agentId)
    .map(a => `<option value="${a.id}">${esc(a.name||a.id)}</option>`).join('');

  panel.innerHTML = `
    <div class="orch-panel-hd">
      <span class="orch-panel-title">${esc(agent?.name||agentId)}</span>
      <button class="orch-panel-close" onclick="closeOrchPanel()">✕</button>
    </div>
    <div class="orch-panel-section">
      <div class="orch-panel-label">Role</div>
      <div class="orch-role-btns" style="flex-wrap:wrap">${roleBtns}</div>
    </div>
    <div class="orch-panel-section">
      <div class="orch-panel-label">Note</div>
      <textarea class="orch-note-textarea" placeholder="Describe this agent's task…"
        oninput="setOrchNote('${orchId}','${agentId}',this.value)">${esc(note)}</textarea>
    </div>
    <div class="orch-panel-section">
      <button class="btn bs" style="font-size:.68rem;width:100%;text-align:left;color:var(--mut)"
        onclick="toggleOrchExclude('${orchId}','${agentId}');closeOrchPanel()">
        ⊘ Exclude from this orchestration
      </button>
    </div>
    ${toOpts ? `<div class="orch-panel-section">
      <div class="orch-panel-label">Dependencies from this agent</div>
      <div id="panel-dep-list-${agentId}" style="margin-bottom:.5rem">
        ${(o.dependencies||[]).filter(d=>d.from===agentId).map(dep => {
          const depIdx = (o.dependencies||[]).findIndex(d=>d.from===dep.from&&d.to===dep.to);
          const toA = agents.find(a=>a.id===dep.to);
          return `<div class="orch-dep-row" style="font-size:.7rem;padding:.1rem 0">
            <span style="color:var(--grn3)">→ ${esc(toA?.name||dep.to)}</span>
            <button class="orch-dep-del" onclick="removeDepFromPanel('${orchId}',${depIdx},'${agentId}')" title="Remove">✕</button>
          </div>`;
        }).join('') || '<span style="font-size:.7rem;color:var(--mut)">None yet</span>'}
      </div>
      <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
        <select id="panel-dep-to-${agentId}" class="orch-dep-sel"><option value="">→ Add target…</option>${toOpts}</select>
        <button class="btn bs" style="font-size:.65rem;padding:.15rem .45rem" onclick="addDepFromPanel('${orchId}','${agentId}')">Add</button>
      </div>
    </div>` : ''}`;
  panel.style.display = '';
}

function showOrchEdgePanel(orchId, from, to) {
  const panel = document.getElementById('orch-agent-panel');
  if (!panel) return;
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  const agents  = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
  const depIdx  = (o.dependencies || []).findIndex(d => d.from === from && d.to === to);
  const srcOpts = agents.map(a => `<option value="${a.id}"${a.id===from?' selected':''}>${esc(a.name||a.id)}</option>`).join('');
  const tgtOpts = agents.map(a => `<option value="${a.id}"${a.id===to?' selected':''}>${esc(a.name||a.id)}</option>`).join('');

  panel.innerHTML = `
    <div class="orch-panel-hd">
      <span class="orch-panel-title">Dependency</span>
      <button class="orch-panel-close" onclick="closeOrchPanel()">✕</button>
    </div>
    <div class="orch-panel-section">
      <div class="orch-panel-label">Redirect</div>
      <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
        <select id="redir-from-${orchId}" class="orch-dep-sel">${srcOpts}</select>
        <span style="color:var(--mut)">→</span>
        <select id="redir-to-${orchId}" class="orch-dep-sel">${tgtOpts}</select>
        <button class="btn bs" style="font-size:.65rem;padding:.15rem .45rem" onclick="redirectDep('${orchId}',${depIdx})">Apply</button>
      </div>
    </div>
    <div class="orch-panel-section">
      <button class="btn bs" style="font-size:.68rem;color:var(--red)"
        onclick="removeDep('${orchId}',${depIdx});closeOrchPanel()">✕ Remove dependency</button>
    </div>`;
  panel.style.display = '';
}

function closeOrchPanel() {
  const panel = document.getElementById('orch-agent-panel');
  if (panel) panel.style.display = 'none';
}

// ── roles HTML builder (shared between edit section and inline refresh) ─
function buildOrchRolesHtml(o, agents) {
  const excl = orchExcluded(o);
  return agents.map(a => {
    const isExcl = excl.has(a.id);
    if (isExcl) {
      return `<div class="orch-agent-row orch-agent-excluded">
        <span class="orch-agent-name" style="opacity:.35;text-decoration:line-through">${esc(a.name||a.id)}</span>
        <span style="font-size:.65rem;color:var(--mut);margin-left:.3rem">excluded</span>
        <button class="orch-excl-btn" style="margin-left:auto;color:var(--grn2)"
          onclick="toggleOrchExclude('${o.id}','${a.id}')" title="Include in orchestration">+ Include</button>
      </div>`;
    }
    const role = (o.roles||{})[a.id] || 'worker';
    const roleBtns = ORCH_ROLES.map(r =>
      `<button class="orch-role-btn${role===r.v?' sel':''}"
        style="${role===r.v?`border-color:${r.c};color:${r.c}`:''}"
        onclick="setOrchRole2('${o.id}','${a.id}','${r.v}')">${r.l}</button>`
    ).join('');
    return `<div class="orch-agent-row">
      <span class="orch-agent-name">${esc(a.name||a.id)}</span>
      <div class="orch-role-btns">${roleBtns}</div>
      <button class="orch-excl-btn" onclick="toggleOrchExclude('${o.id}','${a.id}')" title="Exclude from this orchestration">⊘</button>
    </div>`;
  }).join('');
}

// ── edit section renderer ────────────────────────────────────
function renderOrchEditSection(o, agents) {
  const typeCards = ORCH_TYPES.map(tp => `
    <div class="orch-card${o.type===tp.v?' sel':''}" onclick="setOrchType('${o.id}','${tp.v}')">
      <span class="orch-icon">${tp.i}</span>
      <div><div class="orch-name">${tp.l}</div><div class="orch-desc">${tp.d}</div></div>
    </div>`).join('');

  const rolesHtml = agents.length
    ? buildOrchRolesHtml(o, agents)
    : `<div class="tl dim" style="padding:.4rem 0"><span class="pfx">[--]</span> Select agents first to assign roles.</div>`;

  const depListHtml = (o.dependencies||[]).map((dep,i) => {
    const fromA = agents.find(a => a.id===dep.from);
    const toA   = agents.find(a => a.id===dep.to);
    return `<div class="orch-dep-row">
      <span class="orch-dep-from">${esc(fromA?.name||dep.from)}</span>
      <span class="orch-dep-arrow">→</span>
      <span class="orch-dep-to">${esc(toA?.name||dep.to)}</span>
      <button class="orch-dep-del" onclick="removeDep('${o.id}',${i})" title="Remove">✕</button>
    </div>`;
  }).join('') || `<span style="font-size:.72rem;color:var(--mut)">No dependencies yet — build the diagram and click a node to add</span>`;

  const diagramHtml = o.type && agents.length ? `
    <div class="orch-diagram-wrap" id="orch-diagram-wrap" style="position:relative">
      <div class="orch-diagram-container" id="orch-diagram"></div>
      <div id="orch-agent-panel" class="orch-agent-panel" style="display:none"></div>
    </div>
    <div class="orch-diagram-toolbar">
      <button class="btn bs" onclick="buildOrchDiagram2('${o.id}')" style="font-size:.7rem;padding:.22rem .6rem">⬡ Build / Refresh</button>
      <button class="btn bs" id="orch-relayout-btn" style="display:none;font-size:.7rem;padding:.22rem .6rem" onclick="relayoutDiagram()">↺ Re-layout</button>
      <button class="btn bs" id="orch-save-png-btn" style="display:none;font-size:.7rem;padding:.22rem .6rem" onclick="saveDiagramPng()">📷 Save PNG</button>
      <span class="orch-diagram-hint">Click node → role & note · Click edge → redirect/delete · Drag · Scroll to zoom</span>
    </div>` : '';

  return `<div class="orch-list-item orch-editing" id="orch-item-${o.id}">
    <div class="orch-edit-hd">
      <input class="orch-name-input" value="${esc(o.name)}" placeholder="Orchestration name…"
        oninput="updateOrchName('${o.id}',this.value)">
      <button class="btn bs" style="font-size:.68rem;padding:.18rem .5rem" onclick="closeOrchEdit()">▲ Collapse</button>
      <button class="btn bs" style="font-size:.68rem;padding:.18rem .5rem;color:var(--red)" onclick="deleteOrch('${o.id}')">✕ Delete</button>
    </div>
    <div class="tl dim" style="margin:.7rem 0 .4rem"><span class="pfx">[--]</span> Pattern</div>
    <div class="orch-grid">${typeCards}</div>
    <div class="tl dim" style="margin:.9rem 0 .4rem"><span class="pfx">[--]</span> Agent roles</div>
    <div class="orch-roles-section">${rolesHtml}</div>
    <div class="tl dim" style="margin:.9rem 0 .4rem"><span class="pfx">[--]</span> Dependencies (A → B = A must finish before B starts)</div>
    <div class="orch-dep-list" id="dep-list-${o.id}">${depListHtml}</div>
    ${diagramHtml}
  </div>`;
}

// ── main picker renderer ─────────────────────────────────────
function renderOrchestrationPicker(q, ans, level) {
  const orchs  = getOrchestrations();
  const agents = (ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
  const editId = window._editingOrchId || null;

  const orchLabels = { sequential:'Sequential Chain', parallel:'Parallel', hierarchical:'Hierarchical', router:'Router', debate:'Debate', swarm:'Swarm', hitl:'Human-in-the-Loop', custom:'Custom' };

  const list = orchs.map(o => {
    if (o.id === editId) return renderOrchEditSection(o, agents);
    const typeLabel = orchLabels[o.type] || o.type || '—';
    const depCount  = (o.dependencies||[]).length;
    const agCount   = Object.keys(o.roles||{}).length || 0;
    return `<div class="orch-list-item" id="orch-item-${o.id}">
      <div class="orch-list-hd">
        <span class="orch-list-name">${esc(o.name)}</span>
        <span class="orch-list-meta">${typeLabel} · ${agCount} agents · ${depCount} dep${depCount!==1?'s':''}</span>
        <div class="orch-list-actions">
          <button class="btn bs" style="font-size:.68rem;padding:.18rem .5rem" onclick="startEditOrch('${o.id}')">Edit</button>
          <button class="btn bs" style="font-size:.68rem;padding:.18rem .5rem;color:var(--red)" onclick="deleteOrch('${o.id}')">✕</button>
        </div>
      </div>
    </div>`;
  }).join('');

  const emptyMsg = orchs.length === 0
    ? `<div class="tl dim" style="padding:.5rem 0"><span class="pfx">[--]</span> No orchestrations yet — click [+ New] to create one.</div>` : '';

  return `<div class="orch-manager" id="orch-picker-wrap">
    <div class="orch-manager-hd">
      <span class="ap-hint" style="margin-bottom:0">Define multi-agent orchestrations for this project</span>
      <div style="display:flex;gap:.4rem;align-items:center">
        <a href="${BOOK_LM_URL}" target="_blank" rel="noopener" class="booklm-btn">📘 Book LM</a>
        <button class="btn bp" style="font-size:.72rem;padding:.25rem .7rem" onclick="addOrch()">+ New orchestration</button>
      </div>
    </div>
    <div id="orch-list">${emptyMsg}${list}</div>
  </div>`;
}

// ── orchestration CRUD handlers ──────────────────────────────
window._editingOrchId = null;

function addOrch() {
  const orchs  = getOrchestrations();
  const agents = S.ans.agents_wanted || [];
  const o = {
    id: newOrchId(),
    name: `Orchestration ${orchs.length + 1}`,
    type: null, roles: {}, notes: {}, dependencies: [],
    diagramGraph: null, diagramPng: null
  };
  agents.forEach((id, i) => { o.roles[id] = i === 0 ? 'supervisor' : 'worker'; });
  orchs.push(o);
  window._editingOrchId = o.id;
  refreshOrchPicker();
}

function deleteOrch(orchId) {
  const orchs = getOrchestrations();
  const idx = orchs.findIndex(o => o.id === orchId);
  if (idx !== -1) orchs.splice(idx, 1);
  if (window._editingOrchId === orchId) window._editingOrchId = null;
  if (window._currentOrchId === orchId) {
    if (window._cy) { try { window._cy.destroy(); } catch(_) {} window._cy = null; }
    window._currentOrchId = null;
  }
  refreshOrchPicker();
}

function startEditOrch(orchId) {
  if (window._cy) { try { window._cy.destroy(); } catch(_) {} window._cy = null; }
  window._editingOrchId = orchId;
  refreshOrchPicker();
  const o = getOrchestrations().find(o => o.id === orchId);
  if (o && o.type) setTimeout(() => buildOrchDiagram2(orchId), 120);
}

function closeOrchEdit() {
  if (window._cy) { try { window._cy.destroy(); } catch(_) {} window._cy = null; }
  window._editingOrchId = null;
  window._currentOrchId = null;
  refreshOrchPicker();
}

function updateOrchName(orchId, name) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (o) o.name = name;
}

function setOrchType(orchId, type) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  o.type = type;
  if (!o.dependencies || !o.dependencies.length) {
    const agents = (S.ans.agents_wanted || []).map(id => AGENTS_CATALOG.find(a => a.id === id)).filter(Boolean);
    o.dependencies = autoFillDeps(type, agents, o.roles || {});
  }
  if (window._cy) { try { window._cy.destroy(); } catch(_) {} window._cy = null; }
  refreshOrchPicker();
  setTimeout(() => buildOrchDiagram2(orchId), 120);
}

function setOrchRole2(orchId, agentId, role) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  if (!o.roles) o.roles = {};
  o.roles[agentId] = role;
  const parent = document.querySelector(`#orch-item-${orchId} .orch-agent-row [onclick*="'${agentId}'"]`)?.closest('.orch-agent-row');
  if (parent) parent.querySelectorAll('.orch-role-btn').forEach(b => {
    const m = b.getAttribute('onclick').match(/'([^']+)'\)$/);
    const bRole = m ? m[1] : '';
    const rc = (ORCH_ROLES.find(r => r.v === bRole)||{}).c || 'var(--mut)';
    b.classList.toggle('sel', bRole === role);
    b.style.borderColor = bRole === role ? rc : '';
    b.style.color = bRole === role ? rc : '';
  });
  if (window._cy && window._currentOrchId === orchId) {
    const c = CY_ROLE_COLORS[role] || CY_ROLE_COLORS.worker;
    const node = window._cy.getElementById(agentId);
    if (node.length) { node.style('background-color', c.bg); node.style('color', c.text); }
  }
}

function setOrchNote(orchId, agentId, note) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (o) { if (!o.notes) o.notes = {}; o.notes[agentId] = note; }
}

function addDepFromPanel(orchId, fromId) {
  const toId = document.getElementById('panel-dep-to-' + fromId)?.value;
  if (!toId || toId === fromId) return;
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o) return;
  if (!o.dependencies) o.dependencies = [];
  if (o.dependencies.some(d => d.from===fromId && d.to===toId)) return;
  o.dependencies.push({ from: fromId, to: toId });
  refreshDepList(orchId);
  rebuildCyEdges(orchId);
  // Re-open panel so dropdown resets → allows chaining more deps immediately
  showOrchAgentPanel(orchId, fromId);
}

function removeDepFromPanel(orchId, depIdx, agentId) {
  removeDep(orchId, depIdx);
  showOrchAgentPanel(orchId, agentId);
}

function removeDep(orchId, idx) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o || !o.dependencies) return;
  o.dependencies.splice(idx, 1);
  refreshDepList(orchId);
  rebuildCyEdges(orchId);
}

function redirectDep(orchId, depIdx) {
  const o = getOrchestrations().find(o => o.id === orchId);
  if (!o || !o.dependencies[depIdx]) return;
  const from = document.getElementById('redir-from-' + orchId)?.value;
  const to   = document.getElementById('redir-to-' + orchId)?.value;
  if (!from || !to || from === to) return;
  o.dependencies[depIdx] = { from, to };
  refreshDepList(orchId);
  closeOrchPanel();
  rebuildCyEdges(orchId);
}

function refreshDepList(orchId) {
  const o = getOrchestrations().find(o => o.id === orchId);
  const el = document.getElementById('dep-list-' + orchId);
  if (!o || !el) return;
  const agents = (S.ans.agents_wanted||[]).map(id=>AGENTS_CATALOG.find(a=>a.id===id)).filter(Boolean);
  el.innerHTML = (o.dependencies||[]).map((dep,i) => {
    const fromA = agents.find(a=>a.id===dep.from);
    const toA   = agents.find(a=>a.id===dep.to);
    return `<div class="orch-dep-row">
      <span class="orch-dep-from">${esc(fromA?.name||dep.from)}</span>
      <span class="orch-dep-arrow">→</span>
      <span class="orch-dep-to">${esc(toA?.name||dep.to)}</span>
      <button class="orch-dep-del" onclick="removeDep('${orchId}',${i})" title="Remove">✕</button>
    </div>`;
  }).join('') || `<span style="font-size:.72rem;color:var(--mut)">No dependencies yet</span>`;
}

function refreshOrchPicker() {
  const q = QUESTIONS.find(q => q.id === 'orchestration_type');
  if (!q) return;
  if (S.boardMode) {
    boardRefreshSection('orchestration_type');
    if (window._editingOrchId) setTimeout(() => buildOrchDiagram2(window._editingOrchId), 120);
  } else {
    const wrap = document.getElementById('orch-picker-wrap');
    if (wrap) {
      const tmp = document.createElement('div');
      tmp.innerHTML = renderOrchestrationPicker(q, S.ans, S.level);
      wrap.replaceWith(tmp.firstChild);
      if (window._editingOrchId) setTimeout(() => buildOrchDiagram2(window._editingOrchId), 120);
    }
  }
}

// Legacy aliases kept for any remaining references
function pickOrchType(v) { /* replaced by setOrchType — no-op */ }
function setOrchRole(agentId, role) { /* replaced by setOrchRole2 — no-op */ }
function buildOrchDiagram() { if (window._currentOrchId) buildOrchDiagram2(window._currentOrchId); }

function showError() {
  document.getElementById('app').innerHTML = `
    <div class="term-window">
      <div class="term-bar">
        <div class="term-dots">
          <span class="term-dot close"></span>
          <span class="term-dot min"></span>
          <span class="term-dot max"></span>
        </div>
        <div class="term-bar-title">Finta — bash</div>
        <div></div>
      </div>
      <div class="term-body">
        <div class="err-box">
          <h2>Local server required</h2>
          <div class="tl dim" style="margin:.7rem 0 .3rem"><span class="pfx">[--]</span> fetch() is blocked on the <code>file://</code> protocol.</div>
          <div class="tl dim" style="margin-bottom:.7rem"><span class="pfx">[--]</span> Start a local server from this directory:</div>
          <div class="tl cmd"><span class="pfx">$</span> <code>python -m http.server 8080</code></div>
          <div class="tl cmd"><span class="pfx">$</span> <code>npx serve .</code></div>
          <div class="tl cmd" style="margin-bottom:.7rem"><span class="pfx">$</span> <code>npx http-server . -p 8080</code></div>
          <div class="tl dim"><span class="pfx">[--]</span> Then open: <code>http://localhost:8080/wizard.html</code></div>
          <div class="tl dim" style="margin-top:.3rem"><span class="pfx">[--]</span> Or double-click: <code>serve.bat</code> (Windows) / <code>serve.sh</code> (Mac/Linux)</div>
        </div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// SESSION PERSISTENCE
// ═══════════════════════════════════════════════════════════
const SESSION_KEY = 'wizard-session';
const SESSION_VERSION = '1';
let _sessionLoaded = false;

function saveSession() {
  if (!S.level) return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      v: SESSION_VERSION,
      screen: S.screen,
      level: S.level,
      step: S.step,
      ans: S.ans,
      selectedQs: [...S.selectedQs],
      qTab: S.qTab,
      boardMode: S.boardMode,
      savedAt: Date.now()
    }));
  } catch (_) {}
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  _sessionLoaded = false;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || data.v !== SESSION_VERSION) { clearSession(); return false; }
    S.screen     = (data.screen === 'objectif' ? 'level' : data.screen) || 'level';
    S.level      = data.level     || null;
    S.step       = typeof data.step === 'number' ? data.step : 0;
    S.ans        = data.ans       || {};
    S.selectedQs = new Set(Array.isArray(data.selectedQs) ? data.selectedQs : []);
    S.qTab       = data.qTab      || 'fast';
    S.boardMode  = data.boardMode || false;
    _sessionLoaded = true;
    return true;
  } catch (_) { return false; }
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function firstVal(v, fallback) {
  if (Array.isArray(v)) return v[0] || fallback;
  return v || fallback;
}

function boardRefreshSection(id) {
  if (!S.boardMode) return;
  const wrap = document.getElementById('binp-' + id);
  if (!wrap) return;
  const q = QUESTIONS.find(q => q.id === id);
  if (!q) return;
  wrap.innerHTML = buildQInp(q);
}

// ═══════════════════════════════════════════════════════════
// ÉTAT
// ═══════════════════════════════════════════════════════════
const S = { screen:'level', level:null, step:0, ans:{}, selectedQs: new Set(), qTab:'fast', boardMode: false };
let _qselOpen = false;

function defaultQsForLevel(v) {
  if (v === 'fast')     return new Set(QUESTIONS.filter(q => q.phase === 'fast').map(q => q.id));
  if (v === 'advanced') return new Set(QUESTIONS.filter(q => q.phase !== 'expert').map(q => q.id));
  return new Set(QUESTIONS.map(q => q.id));
}

function activeQs() {
  if (!S.selectedQs.size) {
    if (S.level === 'fast') return QUESTIONS.filter(q => q.phase === 'fast');
    if (S.level === 'advanced') return QUESTIONS.filter(q => q.phase !== 'expert');
    return QUESTIONS;
  }
  return QUESTIONS.filter(q => S.selectedQs.has(q.id) || q.req);
}

function rQuestionSelector() {
  const phases = ['fast','deep','expert'];
  const phaseColors = { fast:'var(--grn2)', deep:'var(--acl)', expert:'var(--amb)' };

  const tabs = phases.map(ph => {
    const qs = QUESTIONS.filter(q => q.phase === ph);
    const checked = qs.filter(q => S.selectedQs.has(q.id)).length;
    const isActive = S.qTab === ph;
    return `<button class="qsel-tab${isActive?' active':''}" onclick="setQTab('${ph}')">
      <span style="color:${phaseColors[ph]}">[${ph}]</span>
      <span class="qcnt">${checked}/${qs.length}</span>
    </button>`;
  }).join('');

  const tabQs = QUESTIONS.filter(q => q.phase === S.qTab);
  const items = tabQs.map(q => {
    const isChecked = S.selectedQs.has(q.id);
    const isLocked = !!q.req;
    return `<div class="qsel-item${isChecked?' checked':''}${isLocked?' locked':''}"
      onclick="${isLocked ? '' : `toggleQSel('${q.id}')`}">
      <div class="qsel-cb">✓</div>
      <span class="qsel-qid">${q.id}</span>
      <span class="qsel-qlabel">${q.label}</span>
      ${isLocked ? '<span class="qsel-req">[req]</span>' : ''}
    </div>`;
  }).join('') || `<div class="tl dim" style="padding:.5rem 0"><span class="pfx">[--]</span> No questions in this phase.</div>`;

  const total = S.selectedQs.size;
  return `<div class="qsel-panel">
  <div class="qsel-toggle-btn" onclick="toggleQselPanel()">
    <span class="qsel-toggle-icon">⚙</span>
    <span class="qsel-toggle-label">Modifier le questionnaire</span>
    <span style="flex:1"></span>
    <span class="qsel-header-count">${total} q</span>
    <span id="qsel-tog-arrow" class="qsel-tog-arrow">${_qselOpen ? '▲' : '▼'}</span>
  </div>
  <div id="qsel-body" style="display:${_qselOpen ? '' : 'none'}">
    <div class="qsel-explain"><span class="pfx">[--]</span> Activez/désactivez les questions pour personnaliser le wizard selon vos besoins</div>
    <div class="qsel-tabs">${tabs}</div>
    <div class="qsel-list">${items}</div>
  </div>
</div>`;
}

function toggleQselPanel() {
  _qselOpen = !_qselOpen;
  const body  = document.getElementById('qsel-body');
  const arrow = document.getElementById('qsel-tog-arrow');
  if (body)  body.style.display  = _qselOpen ? '' : 'none';
  if (arrow) arrow.textContent   = _qselOpen ? '▲' : '▼';
}
function progress() {
  const qs = activeQs();
  const n  = qs.length;
  if (S.screen === 'questions' && S.boardMode) {
    const filled = qs.filter(q => isAnswered(q)).length;
    return 13 + (filled / Math.max(n, 1)) * 82;
  }
  return { welcome:0, objectif:3, level:8, questions:13+(S.step/Math.max(n,1))*82, results:100 }[S.screen] ?? 0;
}

// ═══════════════════════════════════════════════════════════
// AGENT CONTENT FETCH
// ═══════════════════════════════════════════════════════════
async function fetchAgentContents(agentIds) {
  if (!agentIds.length) return {};
  const contents = {};
  await Promise.all(agentIds.map(async id => {
    const agent = AGENTS_CATALOG.find(a => a.id === id);
    if (!agent) return;
    try {
      const res = await fetch(`${agent.folder}/${agent.file}`);
      if (res.ok) contents[id] = await res.text();
    } catch (_) {}
  }));
  return contents;
}

async function fetchSkillContents(skillIds) {
  if (!skillIds.length) return {};
  const contents = {};
  await Promise.all(skillIds.map(async id => {
    const skill = SKILLS_CATALOG.find(s => s.id === id);
    if (!skill) return;
    try {
      const res = await fetch(`${skill.folder}/${skill.file}`);
      if (res.ok) contents[id] = await res.text();
    } catch (_) {}
  }));
  return contents;
}

async function fetchCommandContents(commandIds) {
  if (!commandIds.length) return {};
  const contents = {};
  await Promise.all(commandIds.map(async id => {
    const cmd = COMMANDS_CATALOG.find(c => c.id === id);
    if (!cmd) return;
    try {
      const res = await fetch(`${cmd.file}`);
      if (res.ok) contents[id] = await res.text();
    } catch (_) {}
  }));
  return contents;
}

// ═══════════════════════════════════════════════════════════
// GÉNÉRATION DES FICHIERS (utilise ARBO pour les données)
// ═══════════════════════════════════════════════════════════
function generateFiles(ans, level, agentContents = {}, skillContents = {}, commandContents = {}) {
  const F = {};
  const M  = ARBO.mappings;

  // Résoudre les valeurs "__other__" → texte libre saisi par l'user
  function ro(id, fallback) {
    const raw = ans[id] ?? fallback;
    const txt = (ans[id + '__other__'] || '').trim();
    if (Array.isArray(raw)) return raw.map(v => v === '__other__' ? txt : v).filter(Boolean);
    return raw === '__other__' ? (txt || String(fallback)) : raw;
  }

  const name     = ans.project_name   || 'my-project';
  const domainRaw= ro('domain',         'other');
  const domains  = [].concat(domainRaw).filter(Boolean);
  const domain   = domains[0] || 'other'; // primary domain for legacy single-value uses
  const team     = ro('team_context',   'solo');
  const stack    = ro('stack',          []);
  const autonomy = ro('autonomy',       'standard');
  const frusts   = ro('frustrations',   []);
  const pkgmgr   = firstVal(ro('package_manager', ''), '');
  const dbs      = ro('database',       []);
  const commits  = ro('commit_style',   'conventional');
  const tdd      = ro('tdd_level',      'none');
  const coverage = ro('test_coverage',  '80');
  const hooks    = ro('hooks_wanted',   []);
  const agents   = ro('agents_wanted',   []);
  const skills   = ro('skills_wanted',   []);
  const commands = ro('commands_wanted', []);
  // subdomains: flat array across all domains for legacy use; per-domain dict in ans.subdomains
  const subdomain= ans.subdomains ? Object.values(ans.subdomains).flat() : ro('subdomain', []);
  const aiToolsAll  = [].concat(ro('ai_tools', 'claude_code') || 'claude_code').filter(Boolean);
  const primaryTool = aiToolsAll[0] || 'claude_code';
  const cfg = (M.aiToolFolder || {})[primaryTool] || '.claude';
  const mainFile = (M.aiMainFile || {})[primaryTool] || 'CLAUDE.md';
  const localFile = (M.aiLocalFile || {})[primaryTool] || 'CLAUDE.local.md';
  const neverDo  = ans.never_do       || '';
  const frozen   = ans.frozen_files   || '';
  const decisions= ans.decisions_made || '';
  const comply   = ro('compliance',     ['none']);
  const respStyle= ro('response_style', []);
  const mrouting = ro('model_routing',  []);
  const today    = new Date().toISOString().split('T')[0];

  const hasPy    = stack.includes('python');
  const hasTS    = stack.includes('typescript') || stack.includes('react') || stack.includes('vue');
  const hasGo    = stack.includes('go');
  const hasRust  = stack.includes('rust');
  const hasDO    = stack.includes('devops');
  const hasReact = stack.includes('react');
  const hasVue   = stack.includes('vue');
  const hasBack  = stack.some(s => ['node','python','go','rust'].includes(s));
  const hasFront = hasReact || hasVue;
  const isContent= domains.includes('content');

  const cmds = ARBO.packageCommands[pkgmgr] || { dev:'# À définir', test:'# À définir', lint:'# À définir', build:'# À définir' };

  // ── Main config file (CLAUDE.md / AGENTS.md / etc.) ────
  const stackLabels = stack.filter(s => s !== 'none').map(s => M.stackLabels[s] || s);
  F[mainFile] = [
    `# ${name}`,
    ``,
    `## Overview`,
    `${domains.map(dk => M.domain[dk]||dk).join(' · ')} · ${M.teamContext[team]||team} · Autonomy: ${M.autonomy[autonomy]||autonomy}`,
    ans.subdomains && Object.keys(ans.subdomains).length
      ? Object.entries(ans.subdomains).filter(([,v])=>v.length).map(([dk, vs]) => {
          const opts = ARBO.subdomains[dk] || [];
          return `Subdomains (${M.domain[dk]||dk}): ${vs.map(s => { const o = opts.find(x=>x.v===s); return o?o.l:s; }).join(', ')}`;
        }).join('\n')
      : (subdomain.length ? `Subdomains: ${subdomain.join(', ')}` : ''),
    ``,
    `## AI Assistant`,
    aiToolsAll.map(t => `- ${M.aiTools[t]||t}`).join('\n'),
    ``,
    `## Tech Stack`,
    stackLabels.length ? stackLabels.map(s => `- ${s}`).join('\n') : '- TBD',
    dbs.filter(d => d !== 'none').length ? `- DB: ${dbs.filter(d => d !== 'none').join(', ')}` : '',
    ``,
    `## Critical Commands`,
    '```bash',
    `# Dev\n${cmds.dev}`,
    `# Test\n${cmds.test}`,
    `# Lint\n${cmds.lint}`,
    `# Build\n${cmds.build}`,
    '```',
    ``,
    `## Workflow`,
    `- Commits: ${M.commitStyle[commits]||commits}`,
    `- Tests: ${M.tddLevel[tdd]||tdd}`,
    coverage !== '0' ? `- Coverage: ${coverage}% minimum` : '',
    ``,
    `## Session Start`,
    `At the beginning of every session, read in order:`,
    `1. \`${localFile}\` — current session context`,
    `2. \`${cfg}/rules/index.md\` — full rules dispatch`,
    ``,
    `**First session only:** if \`prompts/bootstrap-init.md\` exists, execute all instructions in it to enrich these config files with project-specific details.`,
    ``,
    `## Rules`,
    `Read \`${cfg}/rules/index.md\` for the full rules registry.`,
    `Always loaded: \`quality-gates.md\`, \`security.md\`, \`behavior.md\`, \`context-budget.md\``,
    tdd !== 'none' ? `Always loaded: \`tdd-workflow.md\`` : '',
    ``,
    `## NEVER`,
    neverDo ? neverDo.split('\n').filter(l => l.trim()).map(l => `- ❌ ${l.trim()}`).join('\n') : '- ❌ (To be completed via prompts/bootstrap-init.md)',
    frozen ? `\n## FROZEN — Never touch\n${frozen.split('\n').filter(l => l.trim()).map(l => `- ⚠️  ${l.trim()}`).join('\n')}` : '',
    ``,
    `_Generated on ${today} · Enrich via \`prompts/bootstrap-init.md\`_`
  ].filter(l => l !== '').join('\n');

  // ── Local context file ───────────────────────────────────
  F[localFile] = [
    `# Session Context — LOCAL`,
    `<!-- ignored by git — do not commit -->`,
    ``,
    `## Project: ${name}`,
    `${domains.map(dk => M.domain[dk]||dk).join(' · ')} · ${M.teamContext[team]||team}`,
    ``,
    frozen
      ? `## Frozen Files\n${frozen.split('\n').filter(l => l.trim()).map(l => `- ⚠️  ${l.trim()}`).join('\n')}`
      : `## Frozen Files\n_No frozen files defined._`,
    ``,
    `## Current Session`,
    `- Branch: \`[fill in]\``,
    `- Goal: \`[fill in]\``,
    `- Active files: \`[fill in]\``,
    ``,
    `---`,
    `_Update at the start of every session._`
  ].join('\n');

  // ── .gitignore ───────────────────────────────────────────
  const gi = [
    '# AI assistant — local context', localFile, `${cfg}/settings.local.json`, '',
    '# Dépendances', 'node_modules/', '.venv/', '__pycache__/', '*.pyc', '',
    '# Build', 'dist/', 'build/', '.next/', 'out/', '',
    '# Environnement', '.env', '.env.local', '*.env.local', '',
    '# OS', '.DS_Store', 'Thumbs.db'
  ];
  if (hasGo)   gi.push('', '# Go',   'vendor/');
  if (hasRust) gi.push('', '# Rust', '/target/');
  F['.gitignore'] = gi.join('\n');

  // ── quality-gates.md (ALWAYS LOADED) ────────────────────
  const neverLines = neverDo.split('\n').filter(l => l.trim()).map(l => `- ❌ ${l.trim()}`).join('\n');
  F[`${cfg}/rules/quality-gates.md`] = [
    `## Quality Gates`,
    ``,
    `| Constraint               | Limit          |`,
    `|--------------------------|----------------|`,
    `| Lines per function       | 20 max         |`,
    `| Parameters per function  | 3 max          |`,
    `| Nesting levels           | 2 max          |`,
    `| Lines per file           | 200 max        |`,
    `| Test coverage            | ${coverage === '0' ? 'No minimum' : coverage + '% minimum'} |`,
    ``,
    `## NEVER — Absolute prohibitions`,
    neverLines || `_No prohibitions specified — complete via bootstrap-init.md_`,
    ``,
    `## Before marking a task done`,
    `1. Check the metrics above`,
    `2. Break up functions > 20 lines`,
    `3. Verify all tests pass`,
    `4. Verify no secret is in the diff`
  ].join('\n');

  // ── security.md (ALWAYS LOADED) ─────────────────────────
  const compRules = comply.filter(c => c !== 'none').map(c => ARBO.complianceRules[c]).filter(Boolean).join('');
  const dbRules   = dbs.filter(d => ARBO.dbPatterns[d]).map(d => ARBO.dbPatterns[d]).join('\n');
  F[`${cfg}/rules/security.md`] = [
    `## Security Rules (NON-NEGOTIABLE)`,
    ``,
    `- ❌ Never hardcode secrets (API keys, passwords, tokens)`,
    `- ❌ Never put secrets in client-side vars (VITE_*, NEXT_PUBLIC_*)`,
    `- ❌ Never concatenate SQL — parameterized queries only`,
    `- ✅ Environment variables for all sensitive config`,
    `- ✅ .env.example with all required vars (no values)`,
    `- ✅ Validate ALL inputs at the API boundary (Zod, Pydantic, etc.)`,
    `- ✅ Hash passwords: bcrypt (12+ rounds) or argon2`,
    ``,
    `## Team level: ${M.teamContext[team]||team}`,
    ['org','team'].includes(team)
      ? '- Audit trail required for critical actions\n- Code review required before merge\n- Secrets via centralized manager (Vault, AWS Secrets Manager)'
      : '- Secrets in .env (never committed)\n- .gitignore verified before every push',
    dbRules   ? `\n## Database Rules\n${dbRules}` : '',
    compRules ? `\n## Compliance${compRules}` : '',
    ``,
    `## Pre-commit checklist`,
    `- [ ] No secret in the diff`,
    `- [ ] Inputs validated at boundaries`,
    `- [ ] Permissions checked`
  ].filter(l => l !== '').join('\n');

  // ── behavior.md (ALWAYS LOADED) ─────────────────────────
  const frustRules = frusts.map(f => {
    const r = ARBO.frustrationRules[f]; if (!r) return null;
    return r.replace(/CLAUDE\.local\.md/g, localFile).replace(/CLAUDE\.md/g, mainFile);
  }).filter(Boolean);
  const respRules  = respStyle.map(r => ARBO.responseStyleRules[r]).filter(Boolean);
  const outputLang = (ans.output_language || '').trim();
  if (outputLang) respRules.push(`- Always reply in ${outputLang}, regardless of the language of the request.`);
  F[`${cfg}/rules/behavior.md`] = [
    `## Assistant Behavior — Session Contract`,
    ``,
    `## Format & Tone`,
    respRules.length ? respRules.join('\n') : '- Clear and direct responses\n- Explain important choices when non-obvious',
    ``,
    `## Rules from frustrations`,
    frustRules.length ? frustRules.join('\n') : '_No frustrations specified — complete via bootstrap-init.md_',
    ``,
    `## Scoping`,
    `- Only modify files explicitly requested`,
    `- Report any hidden dependency BEFORE touching it`,
    `- When in doubt: ask, do not assume`,
    ``,
    `## Project memory`,
    `- Read \`${mainFile}\` at the start of every new session`,
    `- Update \`${localFile}\` if the session state changes`
  ].join('\n');

  // ── context-budget.md (ALWAYS LOADED) ────────────────
  F[`${cfg}/rules/context-budget.md`] = (ARBO.contextBudget.base
    + (level === 'deep' ? ARBO.contextBudget.expert_addon : ''))
    .replace(/CLAUDE\.local\.md/g, localFile)
    .replace(/CLAUDE\.md/g, mainFile)
    .replace(/`\.claude\//g, `\`${cfg}/`)
    .replace(/\(\.claude\//g, `(${cfg}/`);

  // ── tdd-workflow.md (si TDD actif) ──────────────────────
  if (tdd !== 'none') {
    F[`${cfg}/rules/tdd-workflow.md`] = [
      `## TDD Workflow${tdd === 'tdd_strict' ? ' — MANDATORY' : ''}`,
      ``,
      `RED → GREEN → VALIDATE`,
      ``,
      `1. 🔴 **RED**: Write the tests. Run them. All must **FAIL**.`,
      `2. 🟢 **GREEN**: Write the minimum code to pass. All must **PASS**.`,
      `3. 🔵 **VALIDATE**: \`${cmds.lint}\` + full suite + coverage ≥ ${coverage}%.`,
      ``,
      tdd === 'tdd_strict' ? `**FORBIDDEN**: implement without a prior test.\n**FORBIDDEN**: modify tests to make them pass.\n` : '',
      `For bugs: identify the test gap → write a test that reproduces it → fix.`,
      ``,
      `## Test isolation`,
      `- Mocks ONLY at external boundaries (third-party API, DB, time)`,
      `- Deterministic tests — no dependency on execution order`,
      `- No \`sleep()\` in tests`
    ].filter(l => l !== '').join('\n');
  }

  // ── Règles par langage (avec frontmatter paths) ──────────
  if (hasPy)   F[`${cfg}/rules/python.md`]             = ARBO.stackRules.python;
  if (hasTS)   F[`${cfg}/rules/typescript.md`]         = ARBO.stackRules.typescript;
  if (hasReact)F[`${cfg}/rules/frontend-react.md`] = ARBO.stackRules.react;
  if (hasVue)  F[`${cfg}/rules/frontend-vue.md`]   = ARBO.stackRules.vue;
  if (hasGo)   F[`${cfg}/rules/go.md`]                 = ARBO.stackRules.go;
  if (hasRust) F[`${cfg}/rules/rust.md`]               = ARBO.stackRules.rust;
  if (hasDO)   F[`${cfg}/rules/devops.md`]             = ARBO.stackRules.devops;
  if (isContent) F[`${cfg}/rules/content-seo.md`]      = ARBO.stackRules.content_seo;

  // ── domain.md (always loaded — domain + subdomain conventions) ──
  if (ARBO.domainRules && domains.length) {
    var domainBlocks = domains.filter(function(dk){ return ARBO.domainRules[dk]; })
      .map(function(dk){ return ARBO.domainRules[dk]; }).join('\n\n---\n\n');

    var subCtx = ARBO.subdomainContext || {};
    var subSections = [];
    if (ans.subdomains) {
      Object.entries(ans.subdomains).forEach(function(_ref) {
        var dk = _ref[0], vs = _ref[1];
        vs.forEach(function(v) {
          if (!subCtx[v]) return;
          var opts = (ARBO.subdomains && ARBO.subdomains[dk]) || [];
          var opt  = opts.find(function(o){ return o.v === v; });
          var label = opt ? opt.l : v;
          subSections.push(
            '### ' + label + '\n' +
            '- **Libs**: ' + subCtx[v].libs + '\n' +
            '- **Pattern**: ' + subCtx[v].pattern + '\n' +
            '- **Pitfall**: ⚠️  ' + subCtx[v].pitfall
          );
        });
      });
    }

    var domainMdParts = [
      '---',
      'description: Domain conventions for ' + domains.map(function(dk){ return M.domain[dk]||dk; }).join(', '),
      'paths: ["**/*"]',
      '---',
      '',
      domainBlocks
    ];
    if (subSections.length) {
      domainMdParts.push('', '---', '', '## Subdomain Specifics', '');
      domainMdParts.push(subSections.join('\n\n'));
    }
    F[cfg + '/rules/domain.md'] = domainMdParts.join('\n');
  }

  // ── pruning.md (dev + expert) ────────────────────────
  if (level !== 'fast') {
    F[`${cfg}/rules/pruning.md`] = ARBO.pruningRules;
  }

  // ── backend/api.md ───────────────────────────────────────
  if (hasBack) F[`${cfg}/rules/backend/api.md`] = [
    `---`,`description: Backend & API conventions`,
    `paths: ["**/api/**","**/routes/**","**/controllers/**","**/handlers/**"]`,`---`,``,
    `## REST Endpoints`,
    `- Resources in snake_case (\`/api/v1/user_profiles\`)`,
    `- Semantic HTTP verbs (GET read-only, POST create, PATCH partial)`,
    `- Standardized response: \`{ "success": true, "data": {...}, "error": null, "meta": {} }\``,
    `- Pagination required for lists`,
    ``,`## Errors`,
    `- 400 validation · 401 auth · 403 authz · 404 not found · 500 server`,
    `- User-friendly messages on the client, stack trace on the server only`,
    ``,`## API Security`,
    `- Rate limiting on all public endpoints`,
    `- Authentication verified before any action`,
    `- CORS configured explicitly (never \`*\` in production)`
  ].join('\n');

  // ── frontend/ui.md ───────────────────────────────────────
  if (hasFront) F[`${cfg}/rules/frontend/ui.md`] = [
    `---`,`description: Frontend & UI conventions`,
    `paths: ["**/components/**","**/pages/**","**/app/**","**/*.tsx","**/*.vue"]`,`---`,``,
    `## Components`,`- One component = one responsibility`,`- Typed props, never \`any\``,``,
    `## Performance`,`- Memoization only when profiling justifies it`,`- Lazy loading for heavy routes and components`,``,
    `## Accessibility`,`- ARIA attributes on interactive elements`,`- Keyboard navigation tested`,`- WCAG AA contrast minimum`
  ].join('\n');

  // ── settings.json ────────────────────────────────────────
  const hooksConfig = [];
  if (hooks.includes('lint') || hooks.includes('typecheck') || hooks.includes('format')) {
    const hcmds = [];
    if (hooks.includes('lint'))      hcmds.push(cmds.lint);
    if (hooks.includes('format') && pkgmgr === 'uv') hcmds.push('uv run ruff format .');
    if (hooks.includes('typecheck') && hasPy) hcmds.push('uv run mypy . --ignore-missing-imports');
    if (hcmds.length) hooksConfig.push({ event:'PostToolUse', matcher:'Edit|Write|MultiEdit', cmd:hcmds.join(' && ') });
  }
  const settingsObj = {
    model: 'claude-sonnet-4-6',
    permissions: {
      allow: autonomy === 'autonomous' ? ['Bash','Edit','Write','Read'] : ['Read'],
      deny:  ['Bash(rm -rf*)','Bash(git push --force*)']
    },
    hooks: hooksConfig.length ? {
      PostToolUse: hooksConfig.map(h => ({ matcher:h.matcher, hooks:[{ type:'command', command:h.cmd, blocking:false }] }))
    } : {}
  };
  F[`${cfg}/settings.json`] = JSON.stringify(settingsObj, null, 2);
  F[`${cfg}/.claudeignore`]  = ['node_modules/','.venv/','__pycache__/','dist/','build/','.next/','*.log','*.tmp','.DS_Store','.env','.env.local','coverage/'].concat(hasGo?['vendor/']:[], hasRust?['target/']:[]).join('\n');

  // ── Resolve orchestrations early — needed by agents, rules/index, CLAUDE.md ─
  const _orchsRaw = ans.orchestrations && ans.orchestrations.length
    ? ans.orchestrations
    : (ans.orchestration && ans.orchestration.type
        ? [{ id:'orch-0', name:'Main Orchestration', type:ans.orchestration.type,
             roles:ans.orchestration.roles||{}, notes:ans.orchestration.notes||{},
             dependencies:[], diagramPng:ans.orchestration.diagramPng||null }]
        : []);
  const validOrchs = _orchsRaw.filter(o => o.type);

  // ── Agents (catalog-driven) ──────────────────────────────
  // Pre-build per-agent orchestration context so it can be appended to each file
  const agentOrchContext = {};  // agentId → string
  if (validOrchs.length) {
    const rLabels2 = { supervisor:'Supervisor', worker:'Worker', critic:'Critic', router:'Router', validator:'Validator', fallback:'Fallback' };
    const oLabels2 = { sequential:'Sequential Chain', parallel:'Parallel Execution', hierarchical:'Hierarchical', router:'Router / Selector', debate:'Multi-Agent Debate', swarm:'Swarm', hitl:'Human-in-the-Loop', custom:'Custom Graph' };
    validOrchs.forEach(o => {
      const sl = orchSlug(o.name);
      Object.entries(o.roles || {}).forEach(([agId, role]) => {
        const note = (o.notes || {})[agId] || '';
        const deps = (o.dependencies || []);
        const incoming = deps.filter(d => d.to === agId).map(d => { const a = AGENTS_CATALOG.find(x => x.id === d.from); return a ? a.name : d.from; });
        const outgoing = deps.filter(d => d.from === agId).map(d => { const a = AGENTS_CATALOG.find(x => x.id === d.to);   return a ? a.name : d.to;   });
        const lines = [
          ``,
          `## Orchestration: ${o.name}`,
          ``,
          `- **Pattern:** ${oLabels2[o.type] || o.type}`,
          `- **Role:** ${rLabels2[role] || role}`,
          `- **Run:** \`/orchestrate ${sl}\``,
          note ? `- **Task note:** ${note}` : null,
          incoming.length ? `- **Receives from:** ${incoming.join(', ')}` : null,
          outgoing.length ? `- **Sends to:** ${outgoing.join(', ')}` : null,
          `- **Full spec:** \`docs/orchestrations/${sl}.md\``,
        ].filter(l => l !== null).join('\n');
        if (!agentOrchContext[agId]) agentOrchContext[agId] = '';
        agentOrchContext[agId] += lines;
      });
    });
  }

  agents.forEach(id => {
    const content = agentContents[id];
    if (!content) return;
    const agent = AGENTS_CATALOG.find(a => a.id === id);
    if (!agent) return;
    const orchCtx = agentOrchContext[id] || '';
    F[`${cfg}/agents/${agent.name}.md`] = content + orchCtx;
  });

  // ── Skills (catalog-driven) ──────────────────────────────
  skills.forEach(id => {
    const skill = SKILLS_CATALOG.find(s => s.id === id);
    if (!skill) return;
    // Use fetched content when available; fall back to catalog metadata stub
    const content = skillContents[id] || [
      `---`,
      `name: ${skill.name}`,
      `source: ${skill.source}`,
      `category: ${skill.category}`,
      `origin: ${skill.folder}/${skill.file}`,
      `---`,
      ``,
      `# ${skill.name}`,
      ``,
      skill.desc ? skill.desc : '_No description available._',
      ``,
      `> Install the full skill: copy \`${skill.folder}/${skill.file}\` into this folder.`,
    ].join('\n');
    const subpath = skill.subpath || skill.id.slice(skill.source.length + 1); // full subpath within source
    F[`${cfg}/skills/${skill.source}/${subpath}.md`] = content;
  });

  // ── Commands (catalog-driven) ────────────────────────────
  commands.forEach(id => {
    const cmd = COMMANDS_CATALOG.find(c => c.id === id);
    if (!cmd) return;
    const content = commandContents[id] || [
      `# /${cmd.name}`,
      ``,
      cmd.desc ? cmd.desc : '_No description available._',
      ``,
      `> Source: ${cmd.source}/${cmd.repo || ''}`,
    ].join('\n');
    const safeName = (cmd.name || id.split('/').pop()).toLowerCase().replace(/[^\w\-]/g,'-');
    F[`${cfg}/commands/${safeName}.md`] = content;
  });

  // ── docs/specs/ ──────────────────────────────────────────
  const slugify = s => (s||'').toLowerCase()
    .replace(/[éèêë]/g,'e').replace(/[àâä]/g,'a').replace(/[ùûü]/g,'u').replace(/[îï]/g,'i').replace(/[ôö]/g,'o').replace(/ç/g,'c')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'spec';
  const specs = (ans.specs||[]).filter(s => s.title || s.description || (s.attachments||[]).length);
  if (specs.length > 0) {
    F['docs/specs/README.md'] = [
      `# Specs — ${name}`, ``,
      `${specs.length} spec(s) documentée(s) — référence principale pour l'assistant.`, ``,
      `## Index`,
      ...specs.map((s,i) => `- [${s.title||`Spec ${i+1}`}](./${slugify(s.title)||`spec-${i+1}`}/spec.md)`),
      ``, `---`,
      `_Lire en priorité via \`prompts/bootstrap-init.md\` avant toute implémentation._`
    ].join('\n');

    specs.forEach((spec, i) => {
      const slug = slugify(spec.title) || `spec-${i+1}`;
      const atts = spec.attachments || [];
      F[`docs/specs/${slug}/spec.md`] = [
        `# ${spec.title||`Spec ${i+1}`}`, ``,
        spec.description || '_Description à compléter._',
        atts.length ? `\n## Exemples joints\n${atts.map(a => `- [\`${a.name}\`](./${a.name})`).join('\n')}` : ''
      ].filter(Boolean).join('\n');
      atts.forEach(att => { F[`docs/specs/${slug}/${att.name}`] = att.content; });
    });
  }

  // ── docs/architecture.md ─────────────────────────────────
  const archStyle = ARBO.domainArchStyle || {};
  const archStyleLines = domains.filter(dk => archStyle[dk])
    .map(dk => `- **${M.domain[dk]||dk}**: ${archStyle[dk]}`);

  // Per-domain component sections
  const archCompSections = [];
  domains.forEach(dk => {
    const compsForDomain = (ARBO.domainComponents && ARBO.domainComponents[dk]) || [];
    if (!compsForDomain.length) return;
    archCompSections.push(`### ${M.domain[dk]||dk}`);
    compsForDomain.forEach((c, i) => {
      archCompSections.push(`#### ${i+1}. ${c}\n_[Description to be completed]_\n`);
    });
  });
  if (!archCompSections.length) {
    (ARBO.domainComponents.other || []).forEach((c, i) => {
      archCompSections.push(`### ${i+1}. ${c}\n_[Description to be completed]_\n`);
    });
  }

  // Subdomain responsibilities
  const subRespLines = [];
  if (ans.subdomains) {
    Object.entries(ans.subdomains).forEach(([dk, vs]) => {
      if (!vs.length) return;
      const opts = (ARBO.subdomains && ARBO.subdomains[dk]) || [];
      const labels = vs.map(v => { const o = opts.find(x => x.v === v); return o ? o.l : v; });
      subRespLines.push(`- **${M.domain[dk]||dk}**: ${labels.join(', ')}`);
    });
  }

  F['docs/architecture.md'] = [
    `# Architecture — ${name}`, ``,
    `## Overview`,
    `**Domain:** ${domains.map(dk => M.domain[dk]||dk).join(', ')}`,
    `**Team:** ${M.teamContext[team]||team}`,
    `**Stack:** ${stackLabels.join(', ')||'TBD'}`,
    dbs.filter(d => d !== 'none').length ? `**DB:** ${dbs.filter(d => d !== 'none').join(', ')}` : '',
    ``,
    archStyleLines.length ? `## Architecture Pattern` : '',
    ...archStyleLines,
    ``,
    subRespLines.length ? `## Active Subdomains` : '',
    ...subRespLines,
    ``,
    `## Main Components`,
    archCompSections.join('\n'),
    `## Data Flow`,
    '```',`Client → API → Service → Database`,'```',
    ``,`## Key Decisions`,`→ See \`docs/decisions/\` for ADRs`,
    ``,`---`,`_Generated on ${today} · Enrich via \`prompts/bootstrap-init.md\`_`
  ].filter(l => l !== '').join('\n');

  // ── docs/glossary.md ─────────────────────────────────────
  // Domain terms (per-domain sections)
  const glossaryDomainSections = domains.map(dk => {
    const terms = (ARBO.domainTerms && ARBO.domainTerms[dk]) || [];
    if (!terms.length) return '';
    return `### ${M.domain[dk]||dk}\n` + terms.map(([t, d]) => `**${t}**: ${d}`).join('\n');
  }).filter(Boolean);

  // Subdomain context terms
  const glossarySubSections = [];
  if (ans.subdomains && ARBO.subdomainContext) {
    Object.entries(ans.subdomains).forEach(([dk, vs]) => {
      vs.forEach(v => {
        const ctx = ARBO.subdomainContext[v];
        if (!ctx) return;
        const opts = (ARBO.subdomains && ARBO.subdomains[dk]) || [];
        const opt  = opts.find(o => o.v === v);
        const label = opt ? opt.l : v;
        glossarySubSections.push(
          `### ${label}\n` +
          `**Key libs**: ${ctx.libs}\n` +
          `**Pattern**: ${ctx.pattern}\n` +
          `**Watch out**: ${ctx.pitfall}`
        );
      });
    });
  }

  F['docs/glossary.md'] = [
    `# Glossary — ${name}`, ``,
    `## Domain Terms`,
    glossaryDomainSections.length ? glossaryDomainSections.join('\n\n') : '_Domain terms to be defined._',
    ``,
    glossarySubSections.length ? `## Subdomain Reference` : '',
    glossarySubSections.length ? glossarySubSections.join('\n\n') : '',
    ``,
    `## Project-Specific Terms`,
    `_Format: \`Term = Definition\` — fill in as needed_`, ``,
    `---`, `_Enrich via \`prompts/bootstrap-init.md\`_`
  ].filter(l => l !== '').join('\n');

  // ── ADR-001 ───────────────────────────────────────────────
  const decLines = decisions.split('\n').filter(l => l.trim());
  F['docs/decisions/ADR-001.md'] = [
    `# ADR-001 — Initial Technical Decisions`, ``,
    `## Status`, `✅ Accepted — ${today}`, ``,
    `## Context`,
    `Project **${name}** — ${domains.map(dk => M.domain[dk]||dk).join(', ')}, ${M.teamContext[team]||team}.`,
    `Stack: ${stackLabels.join(', ')||'TBD'}.`, ``,
    `## Decisions`,
    decLines.length
      ? decLines.map((l, i) => `### Decision ${i+1}\n${l.trim()}\n\n**Consequences:** _[To be completed]_\n`).join('\n')
      : `### Decision 1 — Main Stack\nRetained stack: ${stackLabels.join(', ')||'TBD'}\n\n**Consequences:** _[To be completed]_\n`,
    `---`, `_Created on ${today}_`
  ].join('\n');

  // ── index.md (routing dispatch) ─────────────────────────
  const alwaysLoaded = [
    ['quality-gates.md',       'Quality metrics, absolute prohibitions'],
    ['security.md',            'Non-negotiable security rules'],
    ['behavior.md',            'Assistant behavior contract'],
    tdd !== 'none' ? ['tdd-workflow.md', 'TDD Workflow — RED→GREEN→VALIDATE'] : null,
    ['context-budget.md',      'Token economy, dreaming protocol'],
    (ARBO.domainRules && domains.length) ? ['domain.md', `Domain conventions — ${domains.map(dk => M.domain[dk]||dk).join(', ')}`] : null,
    specs.length > 0 ? ['../docs/specs/README.md', 'Project specs — functional reference (priority)'] : null,
  ].filter(Boolean);

  const lazyLoaded = [
    hasPy     ? ['python.md',             '`**/*.py`, `pyproject.toml`']               : null,
    hasTS     ? ['typescript.md',         '`**/*.ts`, `**/*.tsx`, `tsconfig*.json`']   : null,
    hasReact  ? ['frontend-react.md',     '`**/*.tsx`, `next.config.*`']               : null,
    hasVue    ? ['frontend-vue.md',       '`**/*.vue`, `nuxt.config.*`']               : null,
    hasGo     ? ['go.md',                 '`**/*.go`, `go.mod`']                       : null,
    hasRust   ? ['rust.md',               '`**/*.rs`, `Cargo.toml`']                   : null,
    hasDO     ? ['devops.md',             '`Dockerfile*`, `**/*.yaml`, `k8s/**`']      : null,
    isContent ? ['content-seo.md',        '`**/*.md`, `**/content/**`, `**/blog/**`']  : null,
    hasBack   ? ['backend/api.md',        '`**/api/**`, `**/routes/**`, `**/handlers/**`'] : null,
    hasFront  ? ['frontend/ui.md',        '`**/components/**`, `**/pages/**`']         : null,
  ].filter(Boolean);

  const onDemand = [];
  if (level !== 'fast') onDemand.push(['pruning.md', `Refactoring / dead code — invoke with \`@${cfg}/rules/pruning.md\``]);
  agents.filter(Boolean).forEach(id => {
    const agent = AGENTS_CATALOG.find(a => a.id === id);
    if (agent) onDemand.push([`../${cfg}/agents/${agent.name}.md`, `Specialist agent: ${agent.name}`]);
  });

  const docsRefs = [
    ['../docs/architecture.md',              'Project architecture, components, data flow'],
    ['../docs/glossary.md',                  'Business domain terms'],
    ['../docs/decisions/ADR-001.md',         'Initial technical decisions'],
    specs.length > 0 ? ['../docs/specs/README.md', 'Functional specs — READ FIRST'] : null,
    validOrchs.length ? ['../docs/orchestrations/index.md', `Multi-agent orchestrations — ${validOrchs.length} orchestration${validOrchs.length > 1 ? 's' : ''} defined`] : null,
  ].filter(Boolean);

  const installedSkills = skills.filter(Boolean).map(id => {
    const s = SKILLS_CATALOG.find(x => x.id === id);
    return s ? [`../${cfg}/skills/${s.source}/${s.subpath || id.slice(s.source.length+1)}.md`, `${s.name} (${s.source})`] : null;
  }).filter(Boolean);

  const installedCommands = [
    ...commands.filter(Boolean).map(id => {
      const c = COMMANDS_CATALOG.find(x => x.id === id);
      if (!c) return null;
      const safeName = (c.name || id.split('/').pop()).toLowerCase().replace(/[^\w\-]/g,'-');
      return [`../${cfg}/commands/${safeName}.md`, `/${c.name} — ${c.desc || c.source}`];
    }).filter(Boolean),
    // Auto-generated orchestration command (always added when orchestrations exist)
    ...(validOrchs.length ? [[`../${cfg}/commands/orchestrate.md`, `/orchestrate <name> — Run a named multi-agent orchestration (${validOrchs.map(o => orchSlug(o.name)).join(', ')})`]] : []),
  ];

  F[`${cfg}/rules/index.md`] = [
    `# Rules Index — Dynamic Dispatch`,
    `<!-- Registry of all rules — auto-loaded via ${mainFile} -->`,
    ``,
    `## Always loaded (every session)`,
    `| File | Role |`,
    `|------|------|`,
    ...alwaysLoaded.map(([f, r]) => `| \`${f}\` | ${r} |`),
    ``,
    lazyLoaded.length ? `## Lazy loading (via frontmatter \`paths:\`)` : '',
    lazyLoaded.length ? `| File | Activated when assistant touches… |` : '',
    lazyLoaded.length ? `|------|----------------------------------|` : '',
    ...lazyLoaded.map(([f, p]) => `| \`${f}\` | ${p} |`),
    ``,
    `## Project Documentation`,
    `| File | Content |`,
    `|------|---------|`,
    ...docsRefs.map(([f, d]) => `| \`${f}\` | ${d} |`),
    ``,
    installedSkills.length ? `## Installed Skills` : '',
    installedSkills.length ? `| File | Skill |` : '',
    installedSkills.length ? `|------|-------|` : '',
    ...installedSkills.map(([f, n]) => `| \`${f}\` | ${n} |`),
    ``,
    installedCommands.length ? `## Slash Commands` : '',
    installedCommands.length ? `| File | Command |` : '',
    installedCommands.length ? `|------|---------|` : '',
    ...installedCommands.map(([f, n]) => `| \`${f}\` | ${n} |`),
    ``,
    onDemand.length ? `## On Demand` : '',
    onDemand.length ? `| File | When to use |` : '',
    onDemand.length ? `|------|-------------|` : '',
    ...onDemand.map(([f, w]) => `| \`${f}\` | ${w} |`),
    ``,
    `---`,
    `_Generated on ${today} · Update if new rule files are added_`
  ].filter(l => l !== '').join('\n');

  F['docs/decisions/_template.md'] = [
    `# ADR-XXX — [Title]`, ``,
    `## Status`, `⏳ Proposed / ✅ Accepted / ❌ Rejected / 🔄 Superseded by ADR-XXX`, ``,
    `## Context`, `_What problem motivates this decision?_`, ``,
    `## Decision`, `_What was decided and why?_`, ``,
    `## Alternatives`,
    `| Option | Pros | Cons |`,
    `|--------|------|------|`,
    `| Option A | ... | ... |`, ``,
    `## Consequences`, `**Positives:**\n**Risks:**`, ``,
    `---`, `_Date:_ ${today} · _Author:_ [Name]`
  ].join('\n');

  // ── docs/orchestrations/ ─────────────────────────────────
  // validOrchs already computed above (hoisted before agents block)

  if (validOrchs.length) {
    const oLabels = { sequential:'Sequential Chain', parallel:'Parallel Execution', hierarchical:'Hierarchical', router:'Router / Selector', debate:'Multi-Agent Debate', swarm:'Swarm', hitl:'Human-in-the-Loop', custom:'Custom Graph' };
    const rLabels = { supervisor:'Supervisor', worker:'Worker', critic:'Critic', router:'Router', validator:'Validator', fallback:'Fallback' };

    // /orchestrate slash command
    F[`${cfg}/commands/orchestrate.md`] = [
      `---`,
      `description: Run a named multi-agent orchestration. Available: ${validOrchs.map(o=>orchSlug(o.name)).join(', ')}`,
      `---`,``,
      `Run the orchestration named: $ARGUMENTS`,``,
      `Steps:`,
      `1. Read \`docs/orchestrations/$ARGUMENTS.md\` — understand the pattern, agents, and execution order`,
      `2. For each agent in the execution order: spawn a subagent using the agent's name, role, and note as context`,
      `3. Each agent must complete before the next one starts (sequential dependency)`,
      `4. Pass the output of each agent as input to the next`,
      `5. Report the final status and consolidated output of all agents`,``,
      `Available orchestrations:`,
      ...validOrchs.map(o => `- \`${orchSlug(o.name)}\` — ${oLabels[o.type]||o.type}`),
    ].join('\n');

    // index.md
    F['docs/orchestrations/index.md'] = [
      `# Orchestrations — ${name}`,``,
      `| Name | Pattern | Agents | Command |`,
      `|------|---------|--------|---------|`,
      ...validOrchs.map(o => {
        const agCnt = Object.keys(o.roles||{}).length;
        return `| ${o.name} | ${oLabels[o.type]||o.type} | ${agCnt} | \`/orchestrate ${orchSlug(o.name)}\` |`;
      }),
      ``,`---`,`_Generated on ${today}_`
    ].join('\n');

    // per-orchestration docs
    validOrchs.forEach(o => {
      const sl = orchSlug(o.name);
      const roleRows = Object.entries(o.roles||{}).map(([id, role]) => {
        const ag   = AGENTS_CATALOG.find(a => a.id === id);
        const note = (o.notes||{})[id] || '';
        return `| ${ag ? ag.name : id} | ${rLabels[role]||role} | ${note} |`;
      });
      const depLines = (o.dependencies||[]).map((dep, i) => {
        const fromA = AGENTS_CATALOG.find(a => a.id === dep.from);
        const toA   = AGENTS_CATALOG.find(a => a.id === dep.to);
        return `${i+1}. **${fromA?.name||dep.from}** → **${toA?.name||dep.to}**`;
      });

      F[`docs/orchestrations/${sl}.md`] = [
        `# Orchestration: ${o.name}`,``,
        `**Pattern:** ${oLabels[o.type]||o.type}`,
        `**Run:** \`/orchestrate ${sl}\``,``,
        `## Agent Roles`,
        `| Agent | Role | Note |`,
        `|-------|------|------|`,
        ...roleRows,``,
        depLines.length ? `## Execution Order\n\n${depLines.join('\n')}` : '',``,
        `## How to run`,
        `\`\`\``,
        `/orchestrate ${sl}`,
        `\`\`\``,``,
        o.diagramPng ? `## Diagram\n\n![Diagram](./${sl}-diagram.png)\n` : '',
        `---`,
        `_Part of **${name}** · Generated on ${today}_`
      ].filter(l => l !== null).join('\n');

      if (o.diagramPng) {
        try {
          const b64 = o.diagramPng.split(',')[1];
          const bin = atob(b64);
          const buf = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
          F[`docs/orchestrations/${sl}-diagram.png`] = buf.buffer;
        } catch(_) {}
      }
    });

    // Append orchestrations section to CLAUDE.md
    const orchSection = [
      ``,`## Orchestrations`,``,
      `This project defines ${validOrchs.length} multi-agent orchestration${validOrchs.length > 1 ? 's' : ''}.`,
      `Full specs: \`docs/orchestrations/index.md\``,
      `Run any orchestration with: \`/orchestrate <name>\``,
      ``,
      `| Name | Pattern | Agents | Command |`,
      `|------|---------|--------|---------|`,
      ...validOrchs.map(o => {
        const agCnt = Object.keys(o.roles || {}).length;
        return `| ${o.name} | ${oLabels[o.type]||o.type} | ${agCnt} | \`/orchestrate ${orchSlug(o.name)}\` |`;
      }),
      ``,
      `> Each agent involved in an orchestration has its role, task note, and execution order`,
      `> documented at the bottom of its agent file in \`${cfg}/agents/\`.`,
      ``
    ].join('\n');
    if (F[mainFile]) F[mainFile] += orchSection;
  }

  // ── prompts/bootstrap-init.md ────────────────────────────
  const hasDomainRules = !!(ARBO.domainRules && domains.length);
  const rulesFiles = [
    mainFile, localFile,
    `${cfg}/rules/index.md`,
    `${cfg}/rules/quality-gates.md`, `${cfg}/rules/security.md`, `${cfg}/rules/behavior.md`,
    `${cfg}/rules/context-budget.md`,
    hasDomainRules ? `${cfg}/rules/domain.md  ← domain & subdomain conventions` : null,
    tdd !== 'none' ? `${cfg}/rules/tdd-workflow.md` : null,
    level !== 'fast' ? `${cfg}/rules/pruning.md  (invoquer avec @)` : null,
    specs.length > 0 ? `docs/specs/README.md  ← PRIORITÉ — lire toutes les specs avant d'agir` : null,
    hasPy    ? `${cfg}/rules/python.md`    : null,
    hasTS    ? `${cfg}/rules/typescript.md`: null,
    hasGo    ? `${cfg}/rules/go.md`        : null,
    hasDO    ? `${cfg}/rules/devops.md`    : null,
    isContent? `${cfg}/rules/content-seo.md`:null,
    hasBack  ? `${cfg}/rules/backend/api.md`:null,
    hasFront ? `${cfg}/rules/frontend/ui.md`:null
  ].filter(Boolean);

  const cfgFile = pkgmgr === 'uv' || pkgmgr === 'poetry' ? 'pyproject.toml' : pkgmgr === 'go_mod' ? 'go.mod' : pkgmgr === 'cargo' ? 'Cargo.toml' : 'package.json';

  const isImprove = ans.objectif === 'improve_existing';
  F['prompts/bootstrap-init.md'] = [
    `# ${isImprove ? '🔧' : '🚀'} Bootstrap Init — ${name}`,
    `<!-- Executed automatically by the AI on first session after unzipping -->`,``,
    ...(isImprove ? [
      `> ⚠️ **EXISTING CONFIGURATION MODE**`,
      `> `,
      `> **DO NOT** overwrite or delete any existing configuration files.`,
      `> **ONLY** add new content or extend existing files.`,
      `> Review the existing setup BEFORE making any changes.`,
      `> When in doubt: show a diff and ask for confirmation before applying.`,
      ``,
    ] : []),
    `---`,``,
    `${isImprove ? 'An existing AI configuration is being **extended**' : 'A new AI configuration has been set up'} for project **${name}**.`,
    `**Domain**: ${domains.map(dk => M.domain[dk]||dk).join(', ')} · **Stack**: ${stackLabels.join(', ')||'TBD'}`,``,
    `Your mission: ${isImprove ? 'extend and enrich the existing config — **preserve all existing content**' : 'enrich each rule file with project-specific details'}.`,``,
    `## Step 1 — Required reading`,
    `Read these files in order:`,
    rulesFiles.map(f => `- \`${f}\``).join('\n'),``,
    `## Step 2 — Explore the existing codebase`,
    `If a codebase is already present:`,
    `1. List files at the root and in src/ (or the main folder)`,
    `2. Identify naming patterns and existing conventions`,
    `3. Read the config file: \`${cfgFile}\``,
    `4. Identify key dependencies and their versions`,``,
    `## Step 3 — Targeted enrichment per file`,
    hasPy ? `\n### \`${cfg}/rules/python.md\`\n- Add packages from pyproject.toml with their usage\n- Identify httpx/FastAPI/SQLAlchemy → add specific patterns\n- Optimal mypy/ruff config for detected dependencies` : '',
    hasTS || hasReact || hasVue ? `\n### \`${cfg}/rules/typescript.md\`${hasReact ? ` / \`${cfg}/rules/frontend-react.md\`` : ''}${hasVue ? ` / \`${cfg}/rules/frontend-vue.md\`` : ''}\n- Detected React/Vue/Next.js version → add version-specific patterns\n- Detected test packages → add conventions\n- Detected design system → add usage rules` : '',
    isContent ? `\n### \`${cfg}/rules/content-seo.md\`\n- Target content structure (pillar topics)\n- Detected CMS → add API patterns\n- SEO KPIs to optimize and brand voice rules` : '',
    hasDomainRules ? `\n### \`${cfg}/rules/domain.md\` — Domain conventions\n- Verify FORBIDDEN rules apply to this specific codebase\n- Add project-specific constraints not covered by the generated rules\n- If subdomains listed in Subdomain Specifics are wrong, correct the libraries section` : '',
    `\n### \`${mainFile}\` — Commands section`,
    `- Replace generic commands with the project's real commands`,
    `- Add DB migration, seed, deploy commands if present`,``,
    `### \`docs/architecture.md\``,
    `- Fill in [Description to be completed] sections with the real architecture`,
    `- Confirm or update the Architecture Pattern line`,
    `- Describe the main data flow`,``,
    `## Step 4 — Clarifying questions (max 5)`,
    `Ask only what you cannot deduce from exploration:`,
    `1. What is the exact version of the main detected framework?`,
    `2. Are there existing code patterns that must be respected?`,
    `3. Any non-obvious naming conventions in the code?`,
    `4. Any critical dependencies whose version must never change?`,
    `5. [Other relevant question based on what you found]`,``,
    `## Step 5 — Final summary`,
    `After enrichment:`,
    `1. **Enriched files**: list with the main additions`,
    `2. **Key commands**: the 3 most important commands`,
    `3. **Active agents**: how to invoke the configured agents`,
    `4. **First prompt**: suggest an example suited to the ${M.domain[domain]||domain} domain`,``,
    `---`,
    `_Re-run this prompt after adding a dependency or making a major architectural change._`
  ].filter(l => l !== null).join('\n');

  return F;
}

// ═══════════════════════════════════════════════════════════
// MULTI-TOOL HELPERS
// ═══════════════════════════════════════════════════════════
function toolSlug(tool) {
  return ((ARBO.mappings.aiTools || {})[tool] || tool)
    .toLowerCase().replace(/[\s\/]+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

function isToolSpecificPath(path, tool) {
  const M   = ARBO.mappings;
  const cfg = (M.aiToolFolder || {})[tool] || '.claude';
  const mf  = (M.aiMainFile   || {})[tool] || 'CLAUDE.md';
  const lf  = (M.aiLocalFile  || {})[tool] || 'CLAUDE.local.md';
  return path === mf || path === lf || path.startsWith(cfg + '/');
}

function buildMultiToolFiles(ans, level, aiToolsAll, agentContents, skillContents, commandContents) {
  const F = {};
  for (let i = 0; i < aiToolsAll.length; i++) {
    const tool    = aiToolsAll[i];
    const slug    = toolSlug(tool);
    const toolAns = Object.assign({}, ans, { ai_tools: [tool] });
    const toolF   = generateFiles(toolAns, level, agentContents, skillContents, commandContents);
    Object.entries(toolF).forEach(([path, content]) => {
      if (isToolSpecificPath(path, tool)) {
        F[slug + '/' + path] = content;
      } else if (i === 0) {
        // Shared files generated once from the first tool
        F['shared/' + path] = content;
      }
    });
  }
  return F;
}

// ═══════════════════════════════════════════════════════════
// TREE
// ═══════════════════════════════════════════════════════════
function buildTree(paths) {
  const root = { dirs:{}, files:[] };
  paths.forEach(p => {
    const parts = p.split('/');
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node.dirs[parts[i]]) node.dirs[parts[i]] = { dirs:{}, files:[] };
      node = node.dirs[parts[i]];
    }
    node.files.push({ name:parts[parts.length-1], path:p });
  });
  return root;
}
function renderTreeNode(node, depth) {
  let h = '';
  const pad = (depth*13+5)+'px';
  Object.entries(node.dirs).sort(([a],[b]) => a.localeCompare(b)).forEach(([name, child]) => {
    h += `<div class="ti tifolder" style="padding-left:${pad}">📁 ${name}/</div>`;
    h += renderTreeNode(child, depth+1);
  });
  node.files.forEach(({ name, path }) => {
    const ep = path.replace(/'/g,"\\'");
    const isB = path === 'prompts/bootstrap-init.md' || path.endsWith('/prompts/bootstrap-init.md');
    h += `<div class="ti tifile${path===window._af?' act':''}" data-path="${path}" style="padding-left:${pad}" onclick="selFile('${ep}')">${isB?'⚡':'📄'} ${name}</div>`;
  });
  return h;
}

// ═══════════════════════════════════════════════════════════
// SIDENAV
// ═══════════════════════════════════════════════════════════
function updateSidenav() {
  const existing = document.getElementById('wiz-sidenav');
  if (existing) existing.remove();
  if (S.screen !== 'questions') return;

  const qs = activeQs();
  const nav = document.createElement('div');
  nav.id = 'wiz-sidenav';

  const SNAV_ICONS = {
    profile:'◈', domain:'◎', subdomain:'⊕', stack:'⬡',
    team:'◷', autonomy:'⬆', tdd_level:'✦', compliance:'⚑',
    database:'▦', output_language:'◐', default:'▸'
  };
  function snavIcon(qid) {
    const key = Object.keys(SNAV_ICONS).find(k => (qid||'').includes(k));
    return SNAV_ICONS[key] || SNAV_ICONS.default;
  }
  function truncLabel(str, maxWords) {
    const words = (str || '').split(/\s+/);
    if (words.length <= maxWords) return str;
    return words.slice(0, maxWords).join(' ') + '…';
  }

  const SNAV_SHORT = {
    objectif:          'Purpose',
    ai_tools:          'AI tools',
    project_name:      'Project name',
    domain:            'Domain',
    subdomain:         'Subdomains',
    team_context:      'Team',
    stack:             'Tech stack',
    autonomy:          'Autonomy',
    frustrations:      'Frustrations',
    specs:             'Specs',
    package_manager:   'Package manager',
    database:          'Database',
    ci_cd:             'CI/CD',
    commit_style:      'Commit style',
    tdd_level:         'Testing',
    test_coverage:     'Coverage',
    hooks_wanted:      'Hooks',
    agents_wanted:     'Agents',
    orchestration_type:'Orchestration',
    skills_wanted:     'Skills',
    commands_wanted:   'Commands',
    never_do:          'Never do',
    frozen_files:      'Frozen files',
    decisions_made:    'Decisions',
    compliance:        'Compliance',
    response_style:    'Response style',
    output_language:   'Language',
    model_routing:     'Model routing',
    mcp_integrations:  'MCP',
  };

  const items = qs.map((q, i) => {
    const ok  = isAnswered(q);
    const act = !S.boardMode && i === S.step;
    const handler = S.boardMode
      ? `scrollToSection('${q.id}')`
      : `goToStepIdx(${i})`;
    const shortLabel = SNAV_SHORT[q.id] || truncLabel(q.label, 3);
    return `<div class="snav-item${act?' act':''}${ok?' done':''}" onclick="${handler}" data-qid="${q.id}" title="${esc(q.label)}">
      <span class="snav-num">[${String(i+1).padStart(2,'0')}]</span>
      <span class="snav-icon">${snavIcon(q.id)}</span>
      <span class="snav-label">${esc(shortLabel)}</span>
      ${ok ? '<span class="snav-ok">✓</span>' : ''}
    </div>`;
  }).join('');

  const answered = qs.filter(q => isAnswered(q)).length;

  nav.innerHTML = `
<div class="snav-inner" id="snav-inner">
  <div class="snav-topbar">
    <button class="snav-close" id="snav-toggle" onclick="toggleSidenav()" aria-label="Close navigation">✕</button>
    <span class="snav-topbar-title"><span class="pfx">[nav]</span> ${answered}/${qs.length}</span>
  </div>
  <div class="snav-profile" onclick="S.screen='level';render()" title="Change profile">
    <span class="pfx">[profile]</span>
    <span class="snav-prof-label">${S.level || 'select'}</span>
    <span class="snav-prof-arrow">↗</span>
  </div>
  <div class="snav-items">${items}</div>
  <div class="snav-export" onclick="S.screen='results';render()">
    <span>⚙</span><span>Export project</span>
  </div>
</div>
<button class="snav-open-btn" id="snav-open-btn" onclick="toggleSidenav()" aria-label="Open navigation">☰</button>`;

  document.body.appendChild(nav);
}

let _snavPinned = null;

function setSidenavActive(qId) {
  const nav = document.getElementById('wiz-sidenav');
  if (!nav) return;
  nav.querySelectorAll('.snav-item').forEach(el => {
    el.classList.toggle('act', el.dataset.qid === qId);
  });
}

function pinSidenavItem(qId) {
  setSidenavActive(qId);
  _snavPinned = qId;
  setTimeout(() => { if (_snavPinned === qId) _snavPinned = null; }, 800);
}

function scrollToSection(qId) {
  const el = document.getElementById('bsect-' + qId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  pinSidenavItem(qId);
}

function refreshSidenavChecks() {
  const nav = document.getElementById('wiz-sidenav');
  if (!nav) return;
  const qs = activeQs();
  let answered = 0;
  nav.querySelectorAll('.snav-item[data-qid]').forEach(el => {
    const q = qs.find(q => q.id === el.dataset.qid);
    if (!q) return;
    const ok = isAnswered(q);
    if (ok) answered++;
    el.classList.toggle('done', ok);
    let okSpan = el.querySelector('.snav-ok');
    if (ok && !okSpan) {
      okSpan = document.createElement('span');
      okSpan.className = 'snav-ok';
      okSpan.textContent = '✓';
      el.appendChild(okSpan);
    } else if (!ok && okSpan) {
      okSpan.remove();
    }
  });
  const hdr = nav.querySelector('.snav-topbar-title');
  if (hdr) hdr.innerHTML = `<span class="pfx">[nav]</span> ${answered}/${qs.length}`;
}


function goToStepIdx(idx) {
  S.step = idx;
  S.boardMode = false;
  S.screen = 'questions';
  render();
}

function toggleSidenav() {
  const inner = document.getElementById('snav-inner');
  const openBtn = document.getElementById('snav-open-btn');
  const isOpen = inner.classList.toggle('open');
  if (openBtn) openBtn.classList.toggle('hidden', isOpen);
}

function initSidenavObserver(qs) {
  const nav = document.getElementById('wiz-sidenav');
  if (!nav) return;
  const observer = new IntersectionObserver(entries => {
    if (_snavPinned) return;
    // pick the intersecting entry whose top is closest to viewport top
    let best = null;
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const top = e.boundingClientRect.top;
      if (best === null || top < best.boundingClientRect.top) best = e;
    });
    if (best) {
      const qId = best.target.id.replace('bsect-', '');
      setSidenavActive(qId);
    }
  }, { rootMargin: '0px 0px -75% 0px', threshold: 0 });
  qs.forEach(q => {
    const el = document.getElementById('bsect-' + q.id);
    if (el) observer.observe(el);
  });
}

// ═══════════════════════════════════════════════════════════
// RENDU
// ═══════════════════════════════════════════════════════════
const app = document.getElementById('app');
function render() {
  _cat.rendered = false; // Reset so catalog reinjects on every new screen render
  saveSession();
  window.scrollTo(0, 0);
  // Remove sidenav from previous render
  const prevNav = document.getElementById('wiz-sidenav');
  if (prevNav) prevNav.remove();
  app.innerHTML = '';

  // Build terminal window wrapper
  const win = document.createElement('div');
  win.className = 'term-window';

  // Step info for titlebar right side
  const qs = S.screen === 'questions' ? activeQs() : [];
  const phaseLabel = S.level ? `[${S.level}]` : '';
  const stepInfo = {
    welcome:   'v2.0.0',
    objectif:  '[setup context]',
    level:     '[select profile]',
    questions: S.boardMode ? `board · ${phaseLabel}` : `q ${String(S.step+1).padStart(2,'0')}/${qs.length}  ${phaseLabel}`,
    results:   '[done]'
  }[S.screen] || '';

  // Titlebar
  const bar = document.createElement('div');
  bar.className = 'term-bar';
  bar.innerHTML = `
    <div class="term-dots">
      <span class="term-dot close"></span>
      <span class="term-dot min"></span>
      <span class="term-dot max"></span>
    </div>
    <div class="term-bar-title">Finta — bash</div>
    <div style="font-size:.63rem;color:var(--mut);white-space:nowrap;font-family:inherit">${stepInfo}</div>`;
  win.appendChild(bar);

  // Progress bar (slim stripe, not on welcome/objectif or board view)
  if (S.screen !== 'welcome' && S.screen !== 'objectif' && !S.boardMode) {
    const pw = document.createElement('div');
    pw.className = 'prog-wrap';
    pw.innerHTML = `<div class="prog-bar" style="width:${progress()}%"></div>`;
    win.appendChild(pw);
  }

  // Content body
  const body = document.createElement('div');
  body.className = 'term-body';
  const c = document.createElement('div');
  c.className = 'fade';
  body.appendChild(c);
  win.appendChild(body);
  app.appendChild(win);

  const fn = { welcome:rWelcome, objectif:rObjectif, level:rLevel, questions:S.boardMode?rBoard:rQuestion, results:rResults }[S.screen] || rWelcome;
  new Promise(resolve => resolve(fn(c))).catch(console.error);
}

function rWelcome(el) {
  const agentCount = AGENTS_CATALOG.length || 647;
  const qCount = QUESTIONS ? QUESTIONS.length : 24;
  el.innerHTML = `
<div class="welcome">
  <pre class="ascii-art">   ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
  ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
  ██║     ██║     ███████║██║   ██║██║  ██║█████╗
  ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
  ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
   ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝</pre>

  <div class="tl ok" style="--delay:1"><span class="pfx">[OK]</span> questions.json — <span style="color:var(--grn)">${qCount}</span> ${t('welcome_q_loaded')}</div>
  <div class="tl ok" style="--delay:2"><span class="pfx">[OK]</span> agents-catalog.json — <span style="color:var(--grn)">${agentCount}</span> ${t('welcome_ag_indexed')}</div>
  <div class="tl ok" style="--delay:3"><span class="pfx">[OK]</span> arbo.json — ${t('welcome_templates')}</div>
  <div class="tl dim" style="--delay:4"><span class="pfx">[--]</span> ──────────────────────────────────────────────</div>
  <div class="tl info" style="--delay:5"><span class="pfx">[>>]</span> ${t('welcome_subtitle')}</div>
  <div class="tl dim" style="--delay:6"><span class="pfx">[--]</span></div>
  <div class="tl dim" style="--delay:7"><span class="pfx">[--]</span> ${t('welcome_generates')}</div>
  <div class="tl dim" style="--delay:8"><span class="pfx">[--]</span>   <span style="color:var(--grn2)">CONFIG</span>   ${t('welcome_config')}</div>
  <div class="tl dim" style="--delay:9"><span class="pfx">[--]</span>   <span style="color:var(--grn2)">RULES</span>    ${t('welcome_rules')}</div>
  <div class="tl dim" style="--delay:10"><span class="pfx">[--]</span>   <span style="color:var(--grn2)">AGENTS</span>   ${agentCount} ${t('welcome_agents_line')}</div>
  <div class="tl dim" style="--delay:11"><span class="pfx">[--]</span>   <span style="color:var(--grn2)">DOCS</span>     ${t('welcome_docs')}</div>
  <div class="tl" style="--delay:12;color:var(--acl)"><span class="pfx" style="color:var(--acc)">[>>]</span>   <span style="color:var(--acl)">PROMPT</span>   ${t('welcome_prompt_line')}</div>
  <div class="tl dim" style="--delay:13"><span class="pfx">[--]</span> ──────────────────────────────────────────────</div>

  <div class="welcome-cmd" style="--delay:14;animation:bootLine .18s ease both;animation-delay:calc(14 * 60ms)">
    <span class="ps1">$</span>
    <span>${t('welcome_run')}</span>
    <span class="cursor"></span>
  </div>

  <div style="margin-top:.9rem;animation:bootLine .18s ease both;animation-delay:calc(15 * 60ms)">
    <button class="btn bp" onclick="goLevel()" style="font-size:.85rem;padding:.55rem 1.7rem">
      ${t('run_setup_btn')}
      <kbd style="margin-left:.5rem;font-size:.62rem;background:var(--sur2);border:1px solid var(--brd);padding:.1rem .4rem;color:var(--mut);font-family:inherit;border-radius:2px">ENTER</kbd>
    </button>
  </div>
</div>`;
}

function rObjectif(el) {
  const v = S.ans.objectif;
  el.innerHTML = `
<div>
  <div class="tl cmd" style="margin-bottom:.8rem"><span class="pfx">$</span> init --configure</div>
  <div style="font-size:.87rem;color:var(--txt);margin-bottom:.2rem">Quel est l'objectif de cette configuration ?</div>
  <div class="tl dim" style="margin-bottom:1.2rem"><span class="pfx">[--]</span> Adapte le comportement du prompt généré. Appuyez sur [1] [2] pour sélectionner.</div>

  <div class="lgrid">
    <div class="lcard${v==='new_project'?' sel':''}" onclick="pickObjectif('new_project')">
      <div style="display:flex;align-items:baseline;gap:.65rem;width:100%">
        <span style="color:var(--mut);font-size:.7rem;flex-shrink:0;letter-spacing:.02em">[1]</span>
        <div style="flex:1">
          <div class="ln">🚀 Nouveau projet</div>
          <div class="ld">Partir de zéro — générer une configuration complète pour un projet neuf</div>
        </div>
      </div>
    </div>
    <div class="lcard${v==='improve_existing'?' sel':''}" onclick="pickObjectif('improve_existing')">
      <div style="display:flex;align-items:baseline;gap:.65rem;width:100%">
        <span style="color:var(--mut);font-size:.7rem;flex-shrink:0;letter-spacing:.02em">[2]</span>
        <div style="flex:1">
          <div class="ln">🔧 Configuration existante</div>
          <div class="ld">Améliorer / étendre un setup déjà en place</div>
          <div style="margin-top:.35rem;font-size:.7rem;color:var(--amb)">[⚠] Le prompt généré ne réinitialisera pas ta configuration existante</div>
        </div>
      </div>
    </div>
  </div>

  <div class="nav">
    <button class="btn bp" onclick="goLevel()" ${!v ? 'disabled' : ''}>
      ${t('continue')}
    </button>
  </div>
</div>`;
}

function rLevel(el) {
  const countFast = QUESTIONS.filter(q => q.phase === 'fast').length;
  const countAdv  = QUESTIONS.filter(q => q.phase !== 'expert').length;
  const countDeep = QUESTIONS.length;
  const levelMeta = { fast: countFast, advanced: countAdv, deep: countDeep };

  el.innerHTML = `
<div>
  <div class="tl cmd" style="margin-bottom:.8rem"><span class="pfx">$</span> ${t('select_profile')}</div>
  <div style="font-size:.87rem;color:var(--txt);margin-bottom:.2rem">${t('how_work_ai')}</div>
  <div class="tl dim" style="margin-bottom:1rem"><span class="pfx">[--]</span> ${t('level_hint')}</div>

  ${_sessionLoaded ? `
  <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:1rem;padding:.45rem .75rem;border:1px solid var(--grn);border-radius:4px;background:rgba(0,255,136,.05);font-size:.8rem;">
    <span style="color:var(--grn)">↩</span>
    <span style="color:var(--txt)">${t('session_restored')}</span>
    ${S.step > 0 ? `<span style="color:var(--mut);font-size:.72rem">(${S.level} · step ${S.step + 1})</span>` : ''}
    <button onclick="resetFresh()" style="margin-left:auto;background:none;border:1px solid var(--mut);color:var(--mut);padding:.2rem .5rem;border-radius:3px;cursor:pointer;font-size:.75rem;font-family:inherit">${t('start_fresh')}</button>
  </div>` : ''}

  <div class="lgrid">
    ${LEVELS.map((l,i) => `
    <div class="lcard${S.level===l.v?' sel':''}" onclick="pickLevel('${l.v}')" data-level="${l.v}">
      <div style="display:flex;align-items:baseline;gap:.65rem;width:100%">
        <span style="color:var(--mut);font-size:.7rem;flex-shrink:0;letter-spacing:.02em">[${i+1}]</span>
        <div style="flex:1">
          <div class="ln">${l.n}
            <span style="font-size:.67rem;font-weight:400;color:var(--mut);margin-left:.55rem">── ${levelMeta[l.v]} ${t('questions_word')}</span>
          </div>
          <div class="ld">${l.d}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>

  ${S.level ? rQuestionSelector() : ''}

  <div class="nav">
    <button class="btn bp" id="level-cont-btn" onclick="startQs()" ${!S.level?'disabled':''}>
      ${t('continue')}${S.level ? ` <span style="font-size:.72rem;opacity:.7;margin-left:.4rem">(${S.selectedQs.size} q)</span>` : ''}
    </button>
  </div>
</div>`;
}

function subToolFiles(str) {
  const pTool = firstVal(S.ans.ai_tools, 'claude_code');
  const M = ARBO.mappings;
  const mf = (M.aiMainFile || {})[pTool] || 'CLAUDE.md';
  const lf = (M.aiLocalFile || {})[pTool] || 'CLAUDE.local.md';
  const cf = (M.aiToolFolder || {})[pTool] || '.claude';
  return str.replace(/CLAUDE\.local\.md/g, lf).replace(/CLAUDE\.md/g, mf).replace(/\.claude\//g, cf + '/');
}

// ═══════════════════════════════════════════════════════════
// SHARED QUESTION INPUT BUILDER
// ═══════════════════════════════════════════════════════════
function buildQInp(q) {
  const ans = S.ans[q.id];
  let inp = '';
  if (q.type === 'text') {
    inp = `<div class="input-wrap"><input type="text" placeholder="${q.ph||''}" value="${ans||''}" oninput="S.ans['${q.id}']=this.value;refreshSidenavChecks();saveSession()"></div>`;
  } else if (q.type === 'textarea') {
    inp = `<div class="input-wrap"><textarea placeholder="${q.ph||''}" oninput="S.ans['${q.id}']=this.value;refreshSidenavChecks();saveSession()">${ans||''}</textarea></div>`;
  } else if (q.type === 'single') {
    const otherSel = ans === '__other__';
    const otherTxt = (S.ans[q.id + '__other__'] || '').replace(/"/g, '&quot;');
    const hasDesc  = q.opts.some(o => o.d);
    inp = `<div class="opts"${hasDesc?' style="grid-template-columns:repeat(auto-fill,minmax(185px,1fr))"':''}>
      ${q.opts.map(o => `<button class="opt${ans===o.v?' sel':''}" onclick="pickOne('${q.id}','${o.v}',this)"${o.d?' style="align-items:flex-start;padding-top:.6rem;padding-bottom:.6rem"':''}>
        <span class="oi">${o.i}</span>
        <span>${o.l}${o.d?`<br><span style="font-size:.69rem;color:var(--mut);font-weight:400">${o.d}</span>`:''}</span>
      </button>`).join('')}
      ${q.other !== false ? `<button class="opt${otherSel?' sel':''}" onclick="pickOneOther('${q.id}',this)"><span class="oi">✏️</span><span>${t('other')}</span></button>` : ''}
    </div>
    <div class="other-wrap" id="other-wrap-${q.id}" style="display:${otherSel?'block':'none'}">
      <div class="input-wrap"><input type="text" placeholder="${t('specify')}" value="${otherTxt}" oninput="S.ans['${q.id}__other__']=this.value"></div>
    </div>`;
  } else if (q.type === 'multi') {
    if (S.ans[q.id] === undefined && q.default) S.ans[q.id] = [...q.default];
    const sel = S.ans[q.id] || [];
    const otherSel = sel.includes('__other__');
    const otherTxt = (S.ans[q.id + '__other__'] || '').replace(/"/g, '&quot;');
    const hasDesc = q.opts.some(o => o.d);
    inp = `<div class="tl dim" style="margin-bottom:.5rem"><span class="pfx">[--]</span> ${t('multiple_selection')}</div>
    <div class="opts" style="${hasDesc?'grid-template-columns:repeat(auto-fill,minmax(185px,1fr))':''}">
      ${q.opts.map(o => `<button class="opt${sel.includes(o.v)?' sel':''}" onclick="toggleM('${q.id}','${o.v}',this)"${o.d?' style="align-items:flex-start;padding-top:.6rem;padding-bottom:.6rem"':''}>
        <span class="oi">${o.i}</span>
        <span>${o.l}${o.d?`<br><span style="font-size:.69rem;color:var(--mut);font-weight:400">${o.d}</span>`:''}</span>
      </button>`).join('')}
      <button class="opt${otherSel?' sel':''}" onclick="toggleMOther('${q.id}',this)"><span class="oi">✏️</span><span>${t('other')}</span></button>
    </div>
    <div class="other-wrap" id="other-wrap-${q.id}" style="display:${otherSel?'block':'none'}">
      <div class="input-wrap"><input type="text" placeholder="${t('specify')}" value="${otherTxt}" oninput="S.ans['${q.id}__other__']=this.value"></div>
    </div>`;
  } else if (q.type === 'subdomain' || q.type === 'subdomain_for') {
    if (!S.ans.subdomains) S.ans.subdomains = {};
    const selectedDomains = [].concat(S.ans.domain || []).filter(Boolean);
    if (!selectedDomains.length) {
      inp = '<div class="tl warn"><span class="pfx">[!]</span> ' + t('select_domain_first') + '</div>';
    } else {
      var DM = (ARBO.mappings && ARBO.mappings.domain) || {};
      var sdSections = '';
      for (var _di = 0; _di < selectedDomains.length; _di++) {
        var dk = selectedDomains[_di];
        var domainOpts = (ARBO.subdomains && ARBO.subdomains[dk]) || [];
        var sdSel = S.ans.subdomains[dk] || [];
        var domainLabel = DM[dk] || dk;
        var selCount = sdSel.length;
        var sdHeader = '<div style="display:flex;align-items:center;gap:.55rem;margin-bottom:.55rem;padding-bottom:.4rem;border-bottom:1px solid rgba(255,255,255,.07)">'
          + '<span style="font-size:.7rem;color:var(--mut);letter-spacing:.03em">[domain]</span>'
          + '<span style="font-size:.87rem;font-weight:600;color:var(--acl)">' + domainLabel + '</span>'
          + (selCount ? '<span style="font-size:.68rem;color:var(--grn2);margin-left:auto">' + selCount + ' selected</span>' : '')
          + '</div>';
        var sdGrid = '';
        if (domainOpts.length) {
          var sdBtns = '';
          for (var _oi = 0; _oi < domainOpts.length; _oi++) {
            var o = domainOpts[_oi];
            var isSel = sdSel.indexOf(o.v) !== -1;
            sdBtns += '<button class="opt' + (isSel ? ' sel' : '') + '"'
              + ' onclick="toggleSubdomain(\'' + dk + '\',\'' + o.v + '\',this)"'
              + ' style="flex-direction:column;align-items:flex-start;gap:.2rem;height:auto;padding:.65rem .85rem">'
              + '<strong style="font-size:.82rem">' + (o.i ? o.i + ' ' : '') + o.l + '</strong>'
              + '<span style="font-size:.7rem;color:var(--mut);line-height:1.35">' + (o.h || '') + '</span>'
              + '</button>';
          }
          sdGrid = '<div class="opts" style="grid-template-columns:repeat(auto-fill,minmax(195px,1fr))">' + sdBtns + '</div>';
        } else {
          sdGrid = '<div class="tl dim" style="font-size:.78rem"><span class="pfx">[--]</span> No subdomains configured.</div>';
        }
        sdSections += '<div style="margin-bottom:1.6rem">' + sdHeader + sdGrid + '</div>';
      }
      inp = '<div class="tl dim" style="margin-bottom:.9rem"><span class="pfx">[--]</span> ' + t('multiple_refines') + '</div>' + sdSections;
    }
  } else if (q.type === 'agent_picker') {
    inp = renderAgentPicker(q, S.ans, S.level);
  } else if (q.type === 'orchestration_picker') {
    inp = renderOrchestrationPicker(q, S.ans, S.level);
  } else if (q.type === 'skill_picker') {
    inp = renderSkillPicker(q, S.ans, S.level);
  } else if (q.type === 'command_picker') {
    inp = renderCommandPicker(q, S.ans, S.level);
  } else if (q.type === 'specs') {
    inp = `<div id="specs-wrap">${buildSpecsList(q.id)}</div>`;
  }
  return inp;
}

// ═══════════════════════════════════════════════════════════
// STEP-BY-STEP QUESTION RENDERER
// ═══════════════════════════════════════════════════════════
function rQuestion(el) {
  const qs     = activeQs();
  const q      = qs[S.step];
  if (!q) { S.screen = 'results'; render(); return; }
  const hk     = S.level === 'fast' ? 'fast' : S.level === 'deep' ? 'deep' : 'advanced';
  const isLast = S.step === qs.length - 1;
  const phaseColors = { fast:'var(--grn2)', advanced:'var(--acl)', deep:'var(--amb)' };
  const phaseColor  = phaseColors[q.phase] || 'var(--mut)';
  const phaseLabel  = q.phase ? `[${q.phase}]` : '';
  const inp = buildQInp(q);

  el.innerHTML = `
<div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.65rem">
    <div class="tl cmd" style="margin-bottom:0"><span class="pfx">$</span> ${t('question_n',{step:S.step+1,total:qs.length})}</div>
    <div style="display:flex;align-items:center;gap:.6rem">
      <button class="btn bs" style="font-size:.7rem;padding:.2rem .55rem" onclick="toggleBoardMode()">board</button>
      <span style="font-size:.65rem;color:${phaseColor};font-family:inherit">${phaseLabel}</span>
    </div>
  </div>
  <div class="qtitle">${q.label}</div>
  ${q.hint && q.hint[hk] ? `<button class="hint-toggle" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')"><span class="pfx">[!]</span> hint <span class="hint-arrow">▸</span></button><div class="hint hint-collapsible">${subToolFiles(q.hint[hk])}</div>` : ''}
  ${inp}
  <div class="tl dim" style="margin-bottom:.4rem;font-size:.7rem">
    <span class="pfx">[--]</span>
    <span>${t('affects')} ${q.targets.map(tgt => `<span class="tag ftag">${subToolFiles(tgt)}</span>`).join(' ')}</span>
  </div>
  <div class="nav">
    <button class="btn bs" onclick="prevStep()">${t('back')}</button>
    <button class="btn bp" onclick="nextStep()">${isLast ? t('generate_config') : t('next')}</button>
  </div>
</div>`;
  updateSidenav();
}

// ═══════════════════════════════════════════════════════════
// BOARD MODE RENDERER — all questions on one page
// ═══════════════════════════════════════════════════════════
function rBoard(el) {
  const qs = activeQs();
  const phaseColors = { fast:'var(--grn2)', advanced:'var(--acl)', deep:'var(--amb)' };

  const sections = qs.map((q, i) => {
    const inp        = buildQInp(q);
    const answered   = isAnswered(q);
    const phaseColor = phaseColors[q.phase] || 'var(--mut)';
    return `<div class="board-section" id="bsect-${q.id}">
      <div class="board-qhd">
        <span class="board-qnum">[${i+1}/${qs.length}]</span>
        <span class="board-qlabel">${q.label}</span>
        ${answered ? '<span class="board-qok">[✓]</span>' : ''}
        <span style="font-size:.62rem;color:${phaseColor};margin-left:auto;flex-shrink:0">[${q.phase}]</span>
      </div>
      <div id="binp-${q.id}">${inp}</div>
    </div>`;
  }).join('');

  el.innerHTML = `
<div class="board-wrap">
  <div class="board-mode-bar">
    <span class="pfx">[board]</span>
    <span style="font-size:.74rem;color:var(--mut)">${qs.length} questions — fill freely, generate when ready</span>
    <button class="btn bs" style="font-size:.7rem;padding:.2rem .55rem;margin-left:auto" onclick="toggleBoardMode()">step-by-step</button>
  </div>
  ${sections}
  <div class="board-actions">
    <button class="btndl" onclick="S.screen='results';render()">⚙ ${t('generate_config')}</button>
  </div>
</div>`;
  updateSidenav();
  initSidenavObserver(qs);
}
async function rResults(el) {
  // Show generation log animation while loading
  el.innerHTML = `
<div>
  <div class="tl info" style="margin-bottom:.5rem"><span class="pfx">[>>]</span> ${t('generating')}</div>
  <div id="gen-log"></div>
  <div class="loading" id="gen-loading" style="height:auto;padding:.5rem 0;justify-content:flex-start;flex-direction:row;gap:.6rem">
    <div class="spinner"></div>
    <span>${t('fetching_agents')}</span>
  </div>
</div>`;

  await new Promise(r => setTimeout(r, 0)); // yield to paint

  const [agentContents, skillContents, commandContents] = await Promise.all([
    fetchAgentContents(S.ans.agents_wanted || []),
    fetchSkillContents(S.ans.skills_wanted || []),
    fetchCommandContents(S.ans.commands_wanted || []),
  ]);
  const M          = ARBO.mappings;
  const aiToolsAll = [].concat(S.ans.ai_tools || ['claude_code']).filter(Boolean);
  const isMultiTool = aiToolsAll.length > 1;
  const files = isMultiTool
    ? buildMultiToolFiles(S.ans, S.level, aiToolsAll, agentContents, skillContents, commandContents)
    : generateFiles(S.ans, S.level, agentContents, skillContents, commandContents);
  window._files = files;
  const _pTool = firstVal(S.ans.ai_tools, 'claude_code');
  const baseMainFile = (M.aiMainFile || {})[_pTool] || 'CLAUDE.md';
  const defaultAf = isMultiTool ? toolSlug(_pTool) + '/' + baseMainFile : baseMainFile;
  if (!window._af || !files[window._af]) window._af = defaultAf;
  const paths = Object.keys(files);
  const tree  = buildTree(paths);
  const name  = S.ans.project_name || 'my-project';
  const stackL= (S.ans.stack||[]).filter(s => s !== 'none').map(s => M.stackLabels[s]||s);
  const dlLabel = isMultiTool
    ? `⬇ ${aiToolsAll.map(t => (M.aiTools||{})[t]||t).join(' · ')} — ${paths.length} files`
    : t('download_zip', {n: paths.length});

  // Animate generation log
  const logEl   = document.getElementById('gen-log');
  const loadEl  = document.getElementById('gen-loading');
  if (loadEl) loadEl.remove();
  if (logEl) {
    const preview = paths.slice(0, 8);
    const extra   = paths.length - preview.length;
    for (const p of preview) {
      await new Promise(r => setTimeout(r, 35));
      const ln = document.createElement('div');
      ln.className = 'gen-log-line';
      ln.innerHTML = `<span class="pfx">[OK]</span> <span class="fpath">${p}</span>`;
      logEl.appendChild(ln);
    }
    if (extra > 0) {
      const ln = document.createElement('div');
      ln.className = 'gen-log-line';
      ln.innerHTML = `<span class="pfx">[OK]</span> <span style="color:var(--mut)">${t('more_files',{n:extra})}</span>`;
      logEl.appendChild(ln);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  // Replace loading view with results
  el.innerHTML = `
<div class="res-hd">
  <div class="res-title">${t('n_files_generated',{n:paths.length})} <span style="color:var(--acl)">${esc(name)}</span></div>
</div>
<div class="chips" style="margin-bottom:.9rem">
  ${[].concat(S.ans.domain||[]).map(dk => `<span class="tag">${M.domain[dk]||dk}</span>`).join('')}
  ${stackL.map(s       => `<span class="tag">${s}</span>`).join('')}
  ${S.ans.team_context ? `<span class="tag">${M.teamContext[S.ans.team_context]}</span>` : ''}
  ${S.ans.autonomy     ? `<span class="tag">${M.autonomy[S.ans.autonomy]}</span>` : ''}
</div>
${buildAuditBox()}
${buildAnsPanel()}
<div class="rgrid">
  <div class="rpanel">
    <div class="phd">${t('project_files')}</div>
    <div class="pbody"><div id="ftree">${renderTreeNode(tree, 0)}</div></div>
  </div>
  <div class="rpanel">
    <div class="chd">
      <span class="cfn" id="fname">${window._af}</span>
      <button class="btn bs" style="font-size:.72rem;padding:.2rem .6rem" onclick="copyActive()">${t('copy')}</button>
    </div>
    <pre id="fcode">${esc(files[window._af]||'')}</pre>
  </div>
</div>
<div class="boot-box">
  <h3>${t('next_step_title')}</h3>
  <p>${S.ans.objectif === 'improve_existing' ? 'Extend your existing config — the prompt below tells your assistant what to do.' : t('next_step_body')}</p>
  <div style="position:relative;margin-top:.5rem">
    <pre id="boot-prompt" style="background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.07);border-left:2px solid var(--acc);padding:.7rem 3rem .7rem .85rem;font-size:.85rem;line-height:1.55;white-space:pre-wrap;word-break:break-word;color:var(--grn3);margin:0">${esc(buildBootPromptText(S.ans, name))}</pre>
    <button onclick="copyBootPrompt()" style="position:absolute;top:.45rem;right:.45rem;background:var(--acd);border:1px solid rgba(124,106,247,.4);color:var(--acl);padding:.18rem .5rem;font-size:.68rem;cursor:pointer;font-family:inherit">${t('copy_full')}</button>
  </div>
  <p style="margin-top:.6rem;font-size:.78rem;color:var(--mut)">${t('next_step_auto')}</p>
</div>
<div class="dls">
  <button class="btndl" onclick="dlZip()">${dlLabel}</button>
  <button class="btn bs" onclick="reviewWizard()">${t('edit_answers')}</button>
  <button class="btn bs" onclick="reset()">${t('restart')}</button>
</div>`;

  document.querySelectorAll('#ftree .tifile').forEach(el => {
    if (el.dataset.path === window._af) el.classList.add('act');
  });
}

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ═══════════════════════════════════════════════════════════
// ANSWERS SUMMARY
// ═══════════════════════════════════════════════════════════
function isAnswered(q) {
  const v = S.ans[q.id];
  if (q.type === 'text' || q.type === 'textarea') return typeof v === 'string' && v.trim() !== '';
  if (q.type === 'single')       return v !== undefined && v !== null && v !== '';
  if (q.type === 'multi')        return Array.isArray(v) && v.length > 0;
  if (q.type === 'subdomain') {
    if (S.ans.subdomains) return Object.values(S.ans.subdomains).some(v => v.length > 0);
    return Array.isArray(S.ans.subdomain) && S.ans.subdomain.length > 0;
  }
  if (q.type === 'subdomain_for') { const sels = (S.ans.subdomains || {})[q.domainKey]; return Array.isArray(sels) && sels.length > 0; }
  if (q.type === 'agent_picker')        return Array.isArray(S.ans.agents_wanted)   && S.ans.agents_wanted.length   > 0;
  if (q.type === 'orchestration_picker') {
    const os = S.ans.orchestrations;
    if (os && os.length) return os.some(o => o.type);
    return !!(S.ans.orchestration && S.ans.orchestration.type);
  }
  if (q.type === 'skill_picker')        return Array.isArray(S.ans.skills_wanted)   && S.ans.skills_wanted.length   > 0;
  if (q.type === 'command_picker')      return Array.isArray(S.ans.commands_wanted) && S.ans.commands_wanted.length > 0;
  if (q.type === 'specs')        return Array.isArray(S.ans.specs) && S.ans.specs.some(s => s.title || s.description);
  return false;
}

function ansValuePreview(q) {
  const v = S.ans[q.id];
  const M = ARBO.mappings || {};
  if (q.type === 'text' || q.type === 'textarea') return v || '';
  if (q.type === 'single') {
    if (!v) return '';
    if (v === '__other__') return S.ans[q.id + '__other__'] || 'custom';
    const opt = (q.opts || []).find(o => o.v === v);
    return opt ? opt.l : v;
  }
  if (q.type === 'multi') {
    if (!Array.isArray(v) || !v.length) return '';
    return v.map(val => {
      if (val === '__other__') return S.ans[q.id + '__other__'] || 'custom';
      const opt = (q.opts || []).find(o => o.v === val);
      return opt ? opt.l : val;
    }).join(', ');
  }
  if (q.type === 'subdomain') {
    if (S.ans.subdomains) {
      const DM = (ARBO.mappings && ARBO.mappings.domain) || {};
      return Object.entries(S.ans.subdomains)
        .filter(([,vs]) => vs.length)
        .map(([dk, vs]) => {
          const opts = (ARBO.subdomains || {})[dk] || [];
          const labels = vs.map(v => { const o = opts.find(x => x.v === v); return o ? o.l : v; });
          return `${DM[dk]||dk}: ${labels.join(', ')}`;
        }).join(' · ');
    }
    return (S.ans.subdomain || []).join(', ');
  }
  if (q.type === 'subdomain_for') {
    const sels = (S.ans.subdomains || {})[q.domainKey] || [];
    const opts = (ARBO.subdomains || {})[q.domainKey] || [];
    return sels.map(v => { const o = opts.find(x => x.v === v); return o ? o.l : v; }).join(', ');
  }
  if (q.type === 'agent_picker')        { const n = (S.ans.agents_wanted||[]).length;   return n ? `${n} agent${n>1?'s':''}` : ''; }
  if (q.type === 'orchestration_picker') {
    const os = S.ans.orchestrations;
    if (os && os.length) return os.map(o => o.name || 'Unnamed').join(', ');
    const o = S.ans.orchestration;
    if (!o || !o.type) return '';
    const lbl = { sequential:'Sequential', parallel:'Parallel', hierarchical:'Hierarchical', router:'Router', debate:'Debate', swarm:'Swarm', hitl:'Human-in-the-Loop', custom:'Custom Graph' };
    return lbl[o.type] || o.type;
  }
  if (q.type === 'skill_picker')        { const n = (S.ans.skills_wanted||[]).length;   return n ? `${n} skill${n>1?'s':''}` : ''; }
  if (q.type === 'command_picker')      { const n = (S.ans.commands_wanted||[]).length; return n ? `${n} command${n>1?'s':''}` : ''; }
  if (q.type === 'specs')        { const n = (S.ans.specs||[]).filter(s=>s.title||s.description).length; return n ? `${n} spec${n>1?'s':''}` : ''; }
  return '';
}

function goToQuestion(idx) {
  const qs = activeQs();
  const q  = qs[idx];
  if (!q) return;
  S.screen = 'questions';
  if (S.boardMode) {
    render();
    // double rAF: wait for paint before scrolling + pinning sidenav
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById('bsect-' + q.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      pinSidenavItem(q.id);
    }));
  } else {
    S.step = idx;
    render();
  }
}

function toggleAnsPanel() {
  const body   = document.getElementById('ans-panel-body');
  const toggle = document.getElementById('ans-panel-toggle');
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display   = isOpen ? 'none' : '';
  toggle.classList.toggle('open', !isOpen);
}

function buildAuditBox() {
  const M              = ARBO.mappings || {};
  const agentsWanted   = S.ans.agents_wanted   || [];
  const skillsWanted   = S.ans.skills_wanted   || [];
  const commandsWanted = S.ans.commands_wanted || [];

  const recLimit  = S.level === 'fast' ? 5 : S.level === 'advanced' ? 10 : 15;
  const recIds    = new Set(computeAgentRecommendations(S.ans).slice(0, recLimit).map(r => r.id));
  const agentsRec = agentsWanted.filter(id => recIds.has(id)).length;
  const agentsMan = agentsWanted.length - agentsRec;

  const triggers = [];
  [].concat(S.ans.domain || []).forEach(dk => { const l = (M.domain||{})[dk]; if (l) triggers.push(l); });
  [].concat(S.ans.stack  || []).filter(s => s !== 'none').forEach(s => { const l = (M.stackLabels||{})[s]; if (l) triggers.push(l); });
  if (S.ans.tdd_level && S.ans.tdd_level !== 'none') triggers.push('TDD');
  [].concat(S.ans.compliance || []).filter(c => c !== 'none').forEach(c => triggers.push(c.toUpperCase()));

  const triggerText = triggers.length ? triggers.slice(0, 6).join(' · ') : '—';

  const agentVal = agentsWanted.length
    ? `${agentsWanted.length} selected`
      + (agentsRec ? ` <span class="audit-tag rec">${agentsRec} auto</span>` : '')
      + (agentsMan ? ` <span class="audit-tag man">${agentsMan} manual</span>` : '')
    : `<span style="color:var(--mut)">none</span>`;

  return `<div class="audit-box">
  <div class="audit-hd" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.audit-tog').classList.toggle('open')">
    <span class="pfx" style="color:var(--acl)">[audit]</span>
    <span class="audit-title">Selection summary</span>
    <div class="audit-chips">
      ${agentsWanted.length   ? `<span class="audit-chip">${agentsWanted.length} agents</span>`    : ''}
      ${skillsWanted.length   ? `<span class="audit-chip">${skillsWanted.length} skills</span>`    : ''}
      ${commandsWanted.length ? `<span class="audit-chip">${commandsWanted.length} commands</span>` : ''}
    </div>
    <span class="audit-tog">▼</span>
  </div>
  <div class="audit-body">
    <div class="audit-row"><span class="audit-lbl">Agents</span><span class="audit-val">${agentVal}</span></div>
    <div class="audit-row"><span class="audit-lbl">Skills</span><span class="audit-val">${skillsWanted.length ? skillsWanted.length + ' selected' : '<span style="color:var(--mut)">none</span>'}</span></div>
    <div class="audit-row"><span class="audit-lbl">Commands</span><span class="audit-val">${commandsWanted.length ? commandsWanted.length + ' selected' : '<span style="color:var(--mut)">none</span>'}</span></div>
    <div class="audit-row"><span class="audit-lbl">Driven by</span><span class="audit-val" style="color:var(--grn3)">${esc(triggerText)}</span></div>
  </div>
</div>`;
}

function buildAnsPanel() {
  const qs      = activeQs();
  const filled  = qs.filter(q => isAnswered(q)).length;

  const levelLabels = { fast:'Fast — No Code', advanced:'Advanced', deep:'Deep' };

  const metaRows = S.level ? `<div class="ans-row" onclick="goLevel()" title="Profil de configuration">
      <span class="ans-status ok">[✓]</span>
      <div class="ans-info">
        <div class="ans-label">Profil de configuration</div>
        <div class="ans-value filled">${esc(levelLabels[S.level] || S.level)}</div>
      </div>
    </div>` : '';

  const rows = qs.map((q, idx) => {
    const ok      = isAnswered(q);
    const preview = ok ? esc(ansValuePreview(q)) : '';
    return `<div class="ans-row" onclick="goToQuestion(${idx})" data-qid="${q.id}" title="${esc(q.label)}">
      <span class="ans-status ${ok?'ok':'empty'}">${ok?'[✓]':'[&nbsp;&nbsp;]'}</span>
      <div class="ans-info">
        <div class="ans-label">${esc(q.label)}</div>
        ${preview ? `<div class="ans-value filled">${preview}</div>` : `<div class="ans-value">—</div>`}
      </div>
    </div>`;
  }).join('');

  return `<div class="ans-panel">
  <div class="ans-panel-hd" onclick="toggleAnsPanel()">
    <span class="ans-panel-hd-label">Réponses du questionnaire</span>
    <div class="ans-panel-hd-stats">
      <span style="color:var(--grn2)">${filled}/${qs.length} remplis</span>
      <span id="ans-panel-toggle" class="ans-panel-hd-toggle open">▲</span>
    </div>
  </div>
  <div class="ans-panel-body" id="ans-panel-body">${metaRows}${rows}</div>
</div>`;
}

// ═══════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════
function goWelcome()    { S.screen='level'; render(); }
function goObjectif()   { S.screen='objectif'; render(); }
function goLevel()      { S.screen='level'; render(); }
function pickObjectif(v){ S.ans.objectif=v; render(); }
function pickLevel(v)   { S.level=v; S.selectedQs=defaultQsForLevel(v); S.qTab='fast'; S.boardMode=true; render(); }
function toggleBoardMode() { S.boardMode=!S.boardMode; render(); }
function setQTab(tab) {
  S.qTab = tab;
  const sy = window.scrollY;
  render();
  window.scrollTo(0, sy);
}
function toggleQSel(id){
  const q = QUESTIONS.find(qq => qq.id === id);
  if (q && q.req) return;
  if (S.selectedQs.has(id)) S.selectedQs.delete(id); else S.selectedQs.add(id);
  const sy = window.scrollY;
  const list = document.querySelector('.qsel-list');
  const listSy = list ? list.scrollTop : 0;
  render();
  window.scrollTo(0, sy);
  const newList = document.querySelector('.qsel-list');
  if (newList) newList.scrollTop = listSy;
}
function startQs()   { if (!S.level) return; S.screen='questions'; S.step=0; render(); }
function nextStep()  { const n=activeQs().length; if (S.step<n-1){ S.step++; render(); } else { S.screen='results'; render(); } }
function prevStep()  { if (S.step>0){ S.step--; render(); } else { S.screen='level'; render(); } }
function pickOne(id, v, btn) {
  S.ans[id] = v;
  // Reset agent recommendations when domain changes
  if (id === 'domain') { S.ans.subdomain = []; S.ans.agents_wanted = undefined; }
  if (id === 'subdomain') S.ans.agents_wanted = undefined;
  btn.closest('.opts').querySelectorAll('.opt').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  const w = document.getElementById('other-wrap-' + id);
  if (w) w.style.display = 'none';
  refreshSidenavChecks();
  saveSession();
}
function pickOneOther(id, btn) {
  S.ans[id] = '__other__';
  btn.closest('.opts').querySelectorAll('.opt').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  const w = document.getElementById('other-wrap-' + id);
  if (w) { w.style.display = 'block'; w.querySelector('input').focus(); }
  refreshSidenavChecks();
  saveSession();
}
function toggleM(id, v, btn) {
  if (!S.ans[id]) S.ans[id] = [];
  const a = S.ans[id], i = a.indexOf(v);
  if (i === -1) a.push(v); else a.splice(i, 1);
  btn.classList.toggle('sel');
  if (id === 'domain') {
    if (!S.ans.subdomains) S.ans.subdomains = {};
    Object.keys(S.ans.subdomains).forEach(dk => {
      if (!S.ans.domain.includes(dk)) delete S.ans.subdomains[dk];
    });
    S.ans.agents_wanted = undefined;
    boardRefreshSection('subdomain');
    boardRefreshSection('agents_wanted');
  }
  if (id === 'subdomain') S.ans.agents_wanted = undefined;
  refreshSidenavChecks();
  saveSession();
}
function toggleSubdomain(dk, v, btn) {
  if (!S.ans.subdomains) S.ans.subdomains = {};
  if (!S.ans.subdomains[dk]) S.ans.subdomains[dk] = [];
  const a = S.ans.subdomains[dk], i = a.indexOf(v);
  if (i === -1) a.push(v); else a.splice(i, 1);
  btn.classList.toggle('sel');
  S.ans.agents_wanted = undefined;
  refreshSidenavChecks();
  saveSession();
}
function toggleMOther(id, btn) {
  if (!S.ans[id]) S.ans[id] = [];
  const a = S.ans[id], i = a.indexOf('__other__');
  if (i === -1) { a.push('__other__'); btn.classList.add('sel'); }
  else { a.splice(i, 1); btn.classList.remove('sel'); }
  const w = document.getElementById('other-wrap-' + id);
  if (w) {
    const show = a.includes('__other__');
    w.style.display = show ? 'block' : 'none';
    if (show) w.querySelector('input').focus();
  }
  refreshSidenavChecks();
}
function reset() { S.screen='level'; S.level=null; S.step=0; S.ans={}; S.selectedQs=new Set(); _qselOpen=false; window._af=null; clearSession(); render(); }
function resetFresh() { reset(); }
function reviewWizard() { S.screen='questions'; S.step=0; render(); }
function buildBootPromptText(ans, name) {
  const isImprove = ans.objectif === 'improve_existing';
  if (!isImprove) {
    return `unzip ${name}-ai-setup.zip\n# Then tell your assistant:\n# "Read and execute prompts/bootstrap-init.md"`;
  }
  return [
    `# Existing project — config extension`,
    `1. unzip ${name}-ai-setup.zip`,
    ``,
    `2. Paste this to your assistant:`,
    ``,
    `   I've unzipped a new AI config in '${name}-ai-setup/'.`,
    `   My existing config is already present in the project.`,
    `   Read and follow 'prompts/bootstrap-init.md' exactly.`,
    `   DO NOT overwrite any existing file.`,
    `   Only ADD new files and EXTEND existing ones with new content.`,
    `   Show me a diff before applying any change to existing files.`
  ].join('\n');
}

function copyBootPrompt() {
  const btn = event.target;
  const txt = document.getElementById('boot-prompt').innerText;
  navigator.clipboard.writeText(txt).then(() => {
    btn.textContent=t('copied'); setTimeout(()=>btn.textContent=t('copy_full'),1800);
  }).catch(() => {});
}

// ── Specs ──────────────────────────────────────────────────
function buildSpecsHeader() {
  const M = (ARBO && ARBO.mappings) || {};
  const domains = [].concat(S.ans.domain || []);
  const domainChips = domains.map(dk => `<span class="tag">${(M.domain && M.domain[dk])||dk}</span>`).join('');
  const subChips = [];
  if (S.ans.subdomains) {
    Object.entries(S.ans.subdomains).forEach(([dk, vs]) => {
      if (!vs || !vs.length) return;
      const opts = (ARBO.subdomains && ARBO.subdomains[dk]) || [];
      vs.forEach(v => {
        const o = opts.find(x => x.v === v);
        subChips.push(`<span class="tag" style="border-color:rgba(168,154,248,.35);color:var(--acl)">${o ? o.l : v}</span>`);
      });
    });
  }
  if (!domainChips && !subChips.length) return '';
  return `<div class="chips" style="margin-bottom:.75rem;flex-wrap:wrap">${domainChips}${subChips.join('')}</div>`;
}

function buildSpecsList(id) {
  const specs = S.ans[id] || [];
  const header = buildSpecsHeader();
  if (!specs.length) {
    return `${header}<div class="specs-empty">${t('no_spec')}</div>
            <button class="add-spec" onclick="addSpec('${id}')"></button>`;
  }
  return header + specs.map((spec, i) => `
    <div class="spec-card">
      <div class="spec-hd">
        <input type="text" placeholder="${t('spec_title_ph')}" value="${(spec.title||'').replace(/"/g,'&quot;')}"
               oninput="S.ans['${id}'][${i}].title=this.value;onSpecInput()">
        <button class="spec-rm" onclick="removeSpec('${id}',${i})" title="${t('spec_delete')}"></button>
      </div>
      <textarea placeholder="${t('spec_desc_ph')}"
                oninput="S.ans['${id}'][${i}].description=this.value;onSpecInput()"
                style="min-height:90px;margin-bottom:0">${spec.description||''}</textarea>
      <div class="spec-atts">
        ${(spec.attachments||[]).map((att,ai) => `
          <span class="att-chip">
            ${att.type==='image'?'🖼️':'📄'} ${att.name}
            <button onclick="removeAtt('${id}',${i},${ai})" title="${t('spec_remove_att')}">✕</button>
          </span>`).join('')}
        <label class="att-add">
          ${t('spec_add_example')}
          <input type="file" multiple hidden onchange="addAtts('${id}',${i},this)">
        </label>
      </div>
    </div>`).join('') +
    `<button class="add-spec" onclick="addSpec('${id}')"></button>`;
}

function rerenderSpecs(id) {
  const w = document.getElementById('specs-wrap');
  if (w) w.innerHTML = buildSpecsList(id);
}

function onSpecInput() { refreshSidenavChecks(); saveSession(); }

function addSpec(id) {
  if (!S.ans[id]) S.ans[id] = [];
  S.ans[id].push({ title: '', description: '', attachments: [] });
  rerenderSpecs(id);
  refreshSidenavChecks();
  saveSession();
}

function removeSpec(id, i) {
  S.ans[id].splice(i, 1);
  rerenderSpecs(id);
  refreshSidenavChecks();
  saveSession();
}

function removeAtt(id, si, ai) {
  S.ans[id][si].attachments.splice(ai, 1);
  rerenderSpecs(id);
}

async function addAtts(id, si, input) {
  const files = Array.from(input.files);
  if (!files.length) return;
  if (!S.ans[id][si].attachments) S.ans[id][si].attachments = [];
  for (const file of files) {
    const isImg = file.type.startsWith('image/');
    const content = await new Promise(res => {
      const r = new FileReader();
      r.onload = e => res(e.target.result);
      isImg ? r.readAsArrayBuffer(file) : r.readAsText(file);
    });
    S.ans[id][si].attachments.push({ name: file.name, content, type: isImg ? 'image' : 'text' });
  }
  rerenderSpecs(id);
}

function selFile(path) {
  window._af = path;
  document.querySelectorAll('#ftree .tifile').forEach(el => el.classList.toggle('act', el.dataset.path === path));
  document.getElementById('fname').textContent = path;
  const content = window._files[path];
  const codeEl = document.getElementById('fcode');
  if (content instanceof ArrayBuffer) {
    const isImg = /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(path);
    if (isImg) {
      const url = URL.createObjectURL(new Blob([content]));
      codeEl.innerHTML = `<img src="${url}" style="max-width:100%;max-height:420px;object-fit:contain;display:block;margin:auto">`;
    } else {
      codeEl.textContent = t('binary_file');
    }
  } else {
    codeEl.innerHTML = esc(content || '');
  }
}
function copyActive() {
  const b = event.currentTarget;
  navigator.clipboard.writeText(document.getElementById('fcode').textContent).then(() => {
    b.textContent=t('copied'); setTimeout(() => b.textContent=t('copy'), 1500);
  }).catch(() => {});
}
async function dlZip() {
  if (typeof JSZip === 'undefined') { alert(t('jszip_error')); return; }
  const z = new JSZip();
  Object.entries(window._files||{}).forEach(([p,c]) => {
    if (c instanceof ArrayBuffer) z.file(p, c, { binary: true });
    else z.file(p, c);
  });
  const blob = await z.generateAsync({ type:'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url;
  const baseName = S.ans.project_name || 'my-project';
  const multi = ([].concat(S.ans.ai_tools || [])).filter(Boolean).length > 1;
  a.download = `${baseName}-${multi ? 'multi' : 'ai'}-setup.zip`;
  a.click(); URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════
document.addEventListener('keydown', function(e) {
  // Don't intercept when user is typing
  if (e.target.matches('input, textarea, .ap-search')) return;

  if (S.screen === 'objectif') {
    const map = { '1':'new_project', '2':'improve_existing' };
    if (map[e.key]) { e.preventDefault(); pickObjectif(map[e.key]); }
    else if (e.key === 'Enter' && S.ans.objectif) { e.preventDefault(); goLevel(); }

  } else if (S.screen === 'level') {
    const map = { '1':'fast', '2':'advanced', '3':'deep' };
    if (map[e.key]) { e.preventDefault(); pickLevel(map[e.key]); }
    else if (e.key === 'Enter' && S.level) { e.preventDefault(); startQs(); }

  } else if (S.screen === 'questions') {
    const q = activeQs()[S.step];
    if (e.key === 'Backspace') { e.preventDefault(); prevStep(); }
    // Enter advances only for non-text input types
    else if (e.key === 'Enter' && q && !['text','textarea','agent_picker','orchestration_picker','skill_picker','command_picker','specs'].includes(q.type)) {
      e.preventDefault(); nextStep();
    }

  } else if (S.screen === 'results') {
    if (e.key === 'Backspace') { e.preventDefault(); reviewWizard(); }
  }
});

// ── Démarrage
init();

// ── Scroll to top
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('scroll-top');
  function update(){ btn.classList.toggle('visible', window.scrollY > 10); }
  window.addEventListener('scroll', update, {passive:true});
  update();
});
