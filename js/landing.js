/* ════════════════════════════════════════════════════════════════
   FINTA 2040 — LANDING PAGE LOGIC
   Console animation · loop ring · counters · reveal · i18n
   ════════════════════════════════════════════════════════════════ */

/* ─── Loop console animation ────────────────────────────────── */
const CONSOLE_SCRIPT = [
  { t: '$ loop-runner start --agent my-agent', cls: 'dim' },
  { t: '[BOOTSTRAP] scope locked · project edits forbidden', cls: 'info' },
  { t: '[CONTEXT]   goal parsed · doubt 4% < 10% → proceed', cls: 'ok' },
  { t: '[DESIGN]    6 steps · each with test + proof', cls: 'info' },
  { t: '[EXECUTE]   step 3/6 · running tests…', cls: '' },
  { t: '[VERIFY]    deterministic: 12/12 tests ✓', cls: 'ok' },
  { t: '[VERIFY]    soft: matches spec (user-validated) ✓', cls: 'ok' },
  { t: '[GUARD]     iter 4/20 · no stagnation · budget ok', cls: 'dim' },
  { t: '[RESOLVED]  goal verified · memory written ✓', cls: 'ok' },
];

function runConsole() {
  const body = document.getElementById('loop-console');
  if (!body) return;
  body.innerHTML = '';
  CONSOLE_SCRIPT.forEach((line, i) => {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'ln ' + line.cls;
      el.textContent = line.t;
      body.appendChild(el);
      if (i === CONSOLE_SCRIPT.length - 1) {
        const c = document.createElement('span');
        c.className = 'caret';
        body.appendChild(c);
        setTimeout(runConsole, 7000); // loop the demo, like a real loop
      }
    }, 500 + i * 640);
  });
}

/* ─── Loop ring: highlight nodes in sequence ────────────────── */
function runRing() {
  const nodes = document.querySelectorAll('#loop-ring .loop-node');
  if (!nodes.length) return;
  let i = 0;
  setInterval(() => {
    nodes.forEach(n => n.classList.remove('active'));
    nodes[i % nodes.length].classList.add('active');
    i++;
  }, 1100);
}

/* ─── Animated counters ─────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = target >= 1000 ? '+' : '';
    const dur = 1400;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ─── Reveal on scroll ──────────────────────────────────────── */
function setupReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ─── Scroll-top button ─────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const b = document.getElementById('scroll-top');
  if (b) b.classList.toggle('show', window.scrollY > 700);
}, { passive: true });

/* ════════════════════════════════════════════════════════════════
   I18N — inline dictionary, 8 languages.
   English is the source of truth in the HTML; other languages
   override via data-i18n keys.
   ════════════════════════════════════════════════════════════════ */
const I18N = {
  fr: {
    nav_features: 'Fonctionnalités', nav_loopforge: 'Loop Forge', nav_catalog: 'Catalogue', nav_how: 'Comment ça marche', nav_cta: 'Lancer le wizard',
    hero_chip: 'Config IA · orchestration d’agents',
    hero_h1a: 'Des agents qui savent', hero_h1b: 'quand le travail est fini.',
    hero_sub: 'Finta assemble un catalogue noté de plus de 2 500 agents, skills et commandes en une config prête à l’emploi pour 19 assistants IA — puis forge des boucles d’agents auto-vérifiées avec garde-fous, mémoire sur disque et escalade humaine.',
    hero_cta1: 'Lancer le wizard', hero_cta2: 'Ouvrir Loop Forge ⟳',
    hero_note: 'Sans build. Sans compte. Un simple fichier HTML.',
    stat_agents: 'agents', stat_skills: 'skills', stat_commands: 'commandes', stat_tools: 'assistants IA', stat_loops: 'profils de boucle', stat_langs: 'langues',
    feat_chip: 'Plateforme',
    feat_h2: 'Tout entre « repo vide » et « agent qui livre »',
    feat_sub: 'Un wizard pour la configuration, une forge pour la couche d’exécution. Deux pages statiques — ouvrez un fichier, au travail.',
    f1_t: 'Catalogue noté', f1_d: 'Chaque agent, skill et commande porte un score 0–100 basé sur la réputation de la source, la profondeur du contenu et le niveau de curation. Seuls les items ≥ 65 remontent par défaut.',
    f2_t: '19 assistants, un wizard', f2_d: 'Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini, Aider et 12 autres — le même wizard de 5 minutes génère le bon format de config pour chacun.',
    f3_t: 'Loop engineering', f3_d: 'Nouveau : forgez des agents qui exécutent une boucle vérifiée — observer, décider, exécuter, vérifier — et s’arrêtent sur un objectif prouvable au lieu de dériver.',
    f4_t: 'Garde-fous par défaut', f4_d: 'Plafond d’itérations, détection de stagnation après 3 tours plats, budgets temps/jetons et rollback sur régression — appliqués en code, pas en prose.',
    f5_t: 'Mémoire sur disque', f5_d: 'Mémoire permanente, tampon d’incident purgé à la résolution, et bus d’échange que les sous-agents lisent et écrivent pour se coordonner.',
    f6_t: 'Human-to-loop', f6_d: 'Cinq déclencheurs d’escalade — ambiguïté, action irréversible, données sensibles, jugement subjectif, budget épuisé — vous rendent la main.',
    lf_chip: 'Nouveau · Loop Forge',
    lf_h2: 'Des personas statiques aux boucles exécutables',
    lf_sub: 'Un fichier persona dit à un agent qui être. Une boucle lui dit comment finir. Loop Forge génère l’architecture d’exécution complète — orchestrateur, config, mémoire, grille de scoring et un loop runner Python exécutable.',
    lf_pipe_t: 'LE CYCLE VÉRIFIÉ',
    lf_pipe_d: 'Doute au-dessus de 10 % ? L’agent demande au lieu de deviner. Un bug ? Un diagnostic, une correction atomique, 3 essais max, puis test de non-régression avant de compter comme résolu.',
    lf_c1_t: '5 profils de boucle', lf_c1_d: 'Tour par tour, objectif, temporelle, proactive, ou simplifiée avec validation humaine — choisis par un arbre de décision à 3 questions, pas un mode unique codé en dur.',
    lf_c2_t: 'Vérification à deux modes', lf_c2_d: 'Critères déterministes (tests passés, CI verte) et critères soft (conforme à la spec, validés une fois avec vous) — jamais un booléen pass/fail aveugle.',
    lf_c3_t: '4 patterns d’orchestration', lf_c3_d: 'Agent unique, fan-out parallèle, chaîne séquentielle ou mixte — avec un fichier bus d’échange que chaque sous-agent lit et écrit.',
    lf_c4_t: 'Sortie exécutable', lf_c4_d: 'Pas que du markdown : un ZIP avec AGENT.md, loop.config.json, grille de scoring, fichiers mémoire, validateurs de structure et un loop runner Python avec les garde-fous intégrés.',
    lf_cta: 'Forger votre agent à boucle',
    how_chip: 'Workflow', how_h2: 'Trois étapes, cinq minutes',
    how1_t: 'Répondez', how1_d: 'Choisissez un profil — Fast, Advanced ou Deep — et décrivez votre stack, votre équipe et votre workflow.',
    how2_t: 'Générez', how2_d: 'Finta sélectionne les agents, skills et commandes les mieux notés pour votre contexte et construit un prompt bootstrap plus un aperçu de l’arborescence.',
    how3_t: 'Collez', how3_d: 'Collez le prompt une fois dans votre assistant IA. Il installe la config sans rien écraser dans votre projet.',
    cat_chip: 'Catalogue', cat_h2: 'Curation des meilleures sources publiques',
    cat_sub: 'Plus de douze sources, chacune notée et hiérarchisée — plus les agents sport-science et coaching de Finta, introuvables ailleurs.',
    src_official: 'Officiel', src_curated: 'Curaté', src_community: 'Communauté', src_original: 'Original',
    cta_h2: 'Prêt en cinq minutes.', cta_sub: 'Ouvrez le wizard, répondez à quelques questions, collez un prompt. Votre assistant fait le reste.',
    foot_tag: 'Config IA & orchestration d’agents pour l’écosystème sportif et au-delà.',
    foot_product: 'Produit', foot_eco: 'Écosystème',
    foot_built: 'Pur HTML/CSS/JS — aucun framework, aucun build.',
  },
  es: {
    nav_features: 'Funciones', nav_loopforge: 'Loop Forge', nav_catalog: 'Catálogo', nav_how: 'Cómo funciona', nav_cta: 'Abrir el wizard',
    hero_chip: 'Config IA · orquestación de agentes',
    hero_h1a: 'Agentes que saben', hero_h1b: 'cuándo el trabajo está hecho.',
    hero_sub: 'Finta reúne un catálogo puntuado de más de 2 500 agentes, skills y comandos en una config lista para 19 asistentes de IA — y forja bucles de agentes autoverificados con salvaguardas, memoria en disco y escalada humana.',
    hero_cta1: 'Abrir el wizard', hero_cta2: 'Abrir Loop Forge ⟳',
    hero_note: 'Sin build. Sin cuenta. Solo un archivo HTML.',
    stat_agents: 'agentes', stat_skills: 'skills', stat_commands: 'comandos', stat_tools: 'asistentes IA', stat_loops: 'perfiles de bucle', stat_langs: 'idiomas',
    feat_chip: 'Plataforma',
    feat_h2: 'Todo entre «repo vacío» y «agente que entrega»',
    feat_sub: 'Un wizard para la configuración, una forja para la capa de ejecución. Páginas estáticas: abre un archivo y a trabajar.',
    f1_t: 'Catálogo puntuado', f1_d: 'Cada agente, skill y comando lleva una puntuación 0–100 según reputación de la fuente, profundidad del contenido y nivel de curación. Solo aparecen por defecto los ítems ≥ 65.',
    f2_t: '19 asistentes, un wizard', f2_d: 'Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini, Aider y 12 más: el mismo wizard de 5 minutos genera el formato correcto para cada uno.',
    f3_t: 'Loop engineering', f3_d: 'Nuevo: forja agentes que ejecutan un bucle verificado — observar, decidir, ejecutar, verificar — y se detienen en un objetivo demostrable.',
    f4_t: 'Salvaguardas por defecto', f4_d: 'Límite de iteraciones, detección de estancamiento tras 3 rondas sin avance, presupuestos de tiempo/tokens y rollback ante regresión — en código, no en prosa.',
    f5_t: 'Memoria en disco', f5_d: 'Memoria permanente, búfer de incidentes purgado al resolver, y un bus de intercambio que los subagentes leen y escriben para coordinarse.',
    f6_t: 'Human-to-loop', f6_d: 'Cinco disparadores de escalada — ambigüedad, acciones irreversibles, datos sensibles, juicio subjetivo, presupuesto agotado — te devuelven el control.',
    lf_chip: 'Nuevo · Loop Forge',
    lf_h2: 'De personas estáticas a bucles ejecutables',
    lf_sub: 'Un archivo de persona le dice al agente quién ser. Un bucle le dice cómo terminar. Loop Forge genera la arquitectura de ejecución completa — orquestador, config, memoria, matriz de scoring y un loop runner en Python.',
    lf_pipe_t: 'EL CICLO VERIFICADO',
    lf_pipe_d: '¿Duda superior al 10 %? El agente pregunta en vez de adivinar. ¿Un bug? Un diagnóstico, una corrección atómica, máximo 3 intentos y prueba de regresión antes de darlo por resuelto.',
    lf_c1_t: '5 perfiles de bucle', lf_c1_d: 'Turno a turno, por objetivo, temporal, proactivo o simplificado con validación humana — elegidos por un árbol de decisión de 3 preguntas.',
    lf_c2_t: 'Verificación de dos modos', lf_c2_d: 'Criterios deterministas (tests en verde, CI ok) y criterios soft (conforme a la spec, validados una vez contigo) — nunca un booleano ciego.',
    lf_c3_t: '4 patrones de orquestación', lf_c3_d: 'Agente único, fan-out paralelo, cadena secuencial o mixto — con un bus de intercambio que cada subagente lee y escribe.',
    lf_c4_t: 'Salida ejecutable', lf_c4_d: 'No solo markdown: un ZIP con AGENT.md, loop.config.json, matriz de scoring, archivos de memoria, validadores y un loop runner Python con salvaguardas integradas.',
    lf_cta: 'Forja tu agente de bucle',
    how_chip: 'Flujo', how_h2: 'Tres pasos, cinco minutos',
    how1_t: 'Responde', how1_d: 'Elige un perfil — Fast, Advanced o Deep — y describe tu stack, tu equipo y tu flujo de trabajo.',
    how2_t: 'Genera', how2_d: 'Finta selecciona los agentes, skills y comandos mejor puntuados para tu contexto y construye un prompt bootstrap con vista previa del árbol de archivos.',
    how3_t: 'Pega', how3_d: 'Pega el prompt una vez en tu asistente de IA. Instala la config sin sobrescribir nada de tu proyecto.',
    cat_chip: 'Catálogo', cat_h2: 'Curado de las mejores fuentes públicas',
    cat_sub: 'Más de doce fuentes, puntuadas y clasificadas — más los agentes de ciencia del deporte y coaching de Finta.',
    src_official: 'Oficial', src_curated: 'Curado', src_community: 'Comunidad', src_original: 'Original',
    cta_h2: 'Listo en cinco minutos.', cta_sub: 'Abre el wizard, responde unas preguntas, pega un prompt. Tu asistente hace el resto.',
    foot_tag: 'Config de IA y orquestación de agentes para el ecosistema deportivo y más allá.',
    foot_product: 'Producto', foot_eco: 'Ecosistema',
    foot_built: 'HTML/CSS/JS puro — sin framework, sin build.',
  },
  de: {
    nav_features: 'Features', nav_loopforge: 'Loop Forge', nav_catalog: 'Katalog', nav_how: 'So funktioniert’s', nav_cta: 'Wizard starten',
    hero_chip: 'KI-Konfiguration · Agenten-Orchestrierung',
    hero_h1a: 'Agenten, die wissen,', hero_h1b: 'wann die Arbeit fertig ist.',
    hero_sub: 'Finta bündelt einen bewerteten Katalog mit 2 500+ Agenten, Skills und Befehlen zu einer fertigen Konfiguration für 19 KI-Assistenten — und schmiedet selbstprüfende Agenten-Loops mit Leitplanken, Speicher auf der Festplatte und menschlicher Eskalation.',
    hero_cta1: 'Wizard starten', hero_cta2: 'Loop Forge öffnen ⟳',
    hero_note: 'Kein Build. Kein Konto. Nur eine HTML-Datei.',
    stat_agents: 'Agenten', stat_skills: 'Skills', stat_commands: 'Befehle', stat_tools: 'KI-Assistenten', stat_loops: 'Loop-Profile', stat_langs: 'Sprachen',
    feat_chip: 'Plattform',
    feat_h2: 'Alles zwischen „leerem Repo“ und „Agent, der liefert“',
    feat_sub: 'Ein Wizard für das Setup, eine Schmiede für die Ausführungsschicht. Statische Seiten — Datei öffnen, loslegen.',
    f1_t: 'Bewerteter Katalog', f1_d: 'Jeder Agent, Skill und Befehl trägt einen Score von 0–100 aus Quellen-Reputation, Inhaltstiefe und Kuratierungsstufe. Standardmäßig erscheinen nur Items ≥ 65.',
    f2_t: '19 Assistenten, ein Wizard', f2_d: 'Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini, Aider und 12 weitere — derselbe 5-Minuten-Wizard erzeugt für jeden das richtige Format.',
    f3_t: 'Loop Engineering', f3_d: 'Neu: Agenten, die eine verifizierte Schleife fahren — beobachten, entscheiden, ausführen, prüfen — und bei einem beweisbaren Ziel stoppen.',
    f4_t: 'Leitplanken ab Werk', f4_d: 'Iterationslimit, Stagnationserkennung nach 3 flachen Runden, Zeit-/Token-Budgets und Rollback bei Regression — im Code erzwungen, nicht in Prosa.',
    f5_t: 'Speicher auf Platte', f5_d: 'Permanenter Speicher, ein Incident-Puffer, der bei Lösung geleert wird, und ein Exchange-Bus, über den sich Sub-Agenten koordinieren.',
    f6_t: 'Human-to-Loop', f6_d: 'Fünf Eskalationstrigger — Mehrdeutigkeit, irreversible Aktionen, sensible Daten, subjektives Urteil, erschöpftes Budget — geben dir die Kontrolle zurück.',
    lf_chip: 'Neu · Loop Forge',
    lf_h2: 'Von statischen Personas zu ausführbaren Loops',
    lf_sub: 'Eine Persona-Datei sagt dem Agenten, wer er ist. Eine Schleife sagt ihm, wie er fertig wird. Loop Forge erzeugt die komplette Ausführungsarchitektur — Orchestrator, Config, Speicher, Scoring-Raster und einen lauffähigen Python-Loop-Runner.',
    lf_pipe_t: 'DER VERIFIZIERTE ZYKLUS',
    lf_pipe_d: 'Zweifel über 10 %? Der Agent fragt, statt zu raten. Ein Bug? Eine Diagnose, ein atomarer Fix, max. 3 Versuche, dann Regressionstest, bevor er als gelöst gilt.',
    lf_c1_t: '5 Loop-Profile', lf_c1_d: 'Zug um Zug, zielbasiert, zeitgesteuert, proaktiv oder vereinfacht mit menschlicher Validierung — per Entscheidungsbaum mit 3 Fragen gewählt.',
    lf_c2_t: 'Verifikation mit zwei Modi', lf_c2_d: 'Deterministische Kriterien (Tests grün, CI ok) und weiche Kriterien (entspricht der Spec, einmal mit dir validiert) — nie ein blinder Pass/Fail-Boolean.',
    lf_c3_t: '4 Orchestrierungsmuster', lf_c3_d: 'Einzelagent, paralleles Fan-out, sequenzielle Kette oder gemischt — mit einer Exchange-Bus-Datei für alle Sub-Agenten.',
    lf_c4_t: 'Lauffähige Ausgabe', lf_c4_d: 'Nicht nur Markdown: ein ZIP mit AGENT.md, loop.config.json, Scoring-Raster, Speicherdateien, Validatoren und einem Python-Loop-Runner mit eingebauten Leitplanken.',
    lf_cta: 'Loop-Agent schmieden',
    how_chip: 'Workflow', how_h2: 'Drei Schritte, fünf Minuten',
    how1_t: 'Antworten', how1_d: 'Wähle ein Profil — Fast, Advanced oder Deep — und beschreibe Stack, Team und Workflow.',
    how2_t: 'Generieren', how2_d: 'Finta wählt die bestbewerteten Agenten, Skills und Befehle für deinen Kontext und baut einen Bootstrap-Prompt samt Dateibaum-Vorschau.',
    how3_t: 'Einfügen', how3_d: 'Füge den Prompt einmal in deinen KI-Assistenten ein. Er installiert die Konfiguration, ohne etwas zu überschreiben.',
    cat_chip: 'Katalog', cat_h2: 'Kuratiert aus den besten öffentlichen Quellen',
    cat_sub: 'Über zwölf Quellen, bewertet und gestuft — plus Fintas eigene Sportwissenschafts- und Coaching-Agenten.',
    src_official: 'Offiziell', src_curated: 'Kuratiert', src_community: 'Community', src_original: 'Original',
    cta_h2: 'In fünf Minuten startklar.', cta_sub: 'Wizard öffnen, ein paar Fragen beantworten, einen Prompt einfügen. Den Rest erledigt dein Assistent.',
    foot_tag: 'KI-Konfiguration & Agenten-Orchestrierung für das Sport-Ökosystem und darüber hinaus.',
    foot_product: 'Produkt', foot_eco: 'Ökosystem',
    foot_built: 'Pures HTML/CSS/JS — kein Framework, kein Build.',
  },
  pt: {
    nav_features: 'Funcionalidades', nav_loopforge: 'Loop Forge', nav_catalog: 'Catálogo', nav_how: 'Como funciona', nav_cta: 'Abrir o wizard',
    hero_chip: 'Config IA · orquestração de agentes',
    hero_h1a: 'Agentes que sabem', hero_h1b: 'quando o trabalho está pronto.',
    hero_sub: 'A Finta reúne um catálogo pontuado com mais de 2 500 agentes, skills e comandos numa config pronta para 19 assistentes de IA — e forja loops de agentes autoverificados com salvaguardas, memória em disco e escalada humana.',
    hero_cta1: 'Abrir o wizard', hero_cta2: 'Abrir Loop Forge ⟳',
    hero_note: 'Sem build. Sem conta. Apenas um ficheiro HTML.',
    stat_agents: 'agentes', stat_skills: 'skills', stat_commands: 'comandos', stat_tools: 'assistentes IA', stat_loops: 'perfis de loop', stat_langs: 'idiomas',
    feat_chip: 'Plataforma',
    feat_h2: 'Tudo entre «repo vazio» e «agente que entrega»',
    feat_sub: 'Um wizard para o setup, uma forja para a camada de execução. Páginas estáticas — abra um ficheiro e trabalhe.',
    f1_t: 'Catálogo pontuado', f1_d: 'Cada agente, skill e comando tem uma pontuação 0–100 baseada na reputação da fonte, profundidade do conteúdo e nível de curadoria. Só itens ≥ 65 aparecem por padrão.',
    f2_t: '19 assistentes, um wizard', f2_d: 'Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini, Aider e mais 12 — o mesmo wizard de 5 minutos gera o formato certo para cada um.',
    f3_t: 'Loop engineering', f3_d: 'Novo: forje agentes que executam um loop verificado — observar, decidir, executar, verificar — e param num objetivo comprovável.',
    f4_t: 'Salvaguardas por padrão', f4_d: 'Limite de iterações, deteção de estagnação após 3 rondas sem progresso, orçamentos de tempo/tokens e rollback em regressão — impostos em código.',
    f5_t: 'Memória em disco', f5_d: 'Memória permanente, buffer de incidentes limpo na resolução e um bus de troca que os subagentes leem e escrevem para se coordenarem.',
    f6_t: 'Human-to-loop', f6_d: 'Cinco gatilhos de escalada — ambiguidade, ações irreversíveis, dados sensíveis, julgamento subjetivo, orçamento esgotado — devolvem-lhe o controlo.',
    lf_chip: 'Novo · Loop Forge',
    lf_h2: 'De personas estáticas a loops executáveis',
    lf_sub: 'Um ficheiro de persona diz ao agente quem ser. Um loop diz-lhe como terminar. O Loop Forge gera a arquitetura de execução completa — orquestrador, config, memória, grelha de scoring e um loop runner em Python.',
    lf_pipe_t: 'O CICLO VERIFICADO',
    lf_pipe_d: 'Dúvida acima de 10 %? O agente pergunta em vez de adivinhar. Um bug? Um diagnóstico, uma correção atómica, máx. 3 tentativas e teste de regressão antes de contar como resolvido.',
    lf_c1_t: '5 perfis de loop', lf_c1_d: 'Turno a turno, por objetivo, temporal, proativo ou simplificado com validação humana — escolhidos por uma árvore de decisão de 3 perguntas.',
    lf_c2_t: 'Verificação em dois modos', lf_c2_d: 'Critérios determinísticos (testes verdes, CI ok) e critérios soft (conforme a spec, validados uma vez consigo) — nunca um booleano cego.',
    lf_c3_t: '4 padrões de orquestração', lf_c3_d: 'Agente único, fan-out paralelo, cadeia sequencial ou misto — com um bus de troca que cada subagente lê e escreve.',
    lf_c4_t: 'Saída executável', lf_c4_d: 'Não só markdown: um ZIP com AGENT.md, loop.config.json, grelha de scoring, ficheiros de memória, validadores e um loop runner Python com salvaguardas integradas.',
    lf_cta: 'Forjar o seu agente de loop',
    how_chip: 'Fluxo', how_h2: 'Três passos, cinco minutos',
    how1_t: 'Responda', how1_d: 'Escolha um perfil — Fast, Advanced ou Deep — e descreva a sua stack, equipa e fluxo de trabalho.',
    how2_t: 'Gere', how2_d: 'A Finta seleciona os agentes, skills e comandos mais bem pontuados para o seu contexto e constrói um prompt bootstrap com pré-visualização da árvore de ficheiros.',
    how3_t: 'Cole', how3_d: 'Cole o prompt uma vez no seu assistente de IA. Ele instala a config sem sobrescrever nada no seu projeto.',
    cat_chip: 'Catálogo', cat_h2: 'Curadoria das melhores fontes públicas',
    cat_sub: 'Mais de doze fontes, pontuadas e classificadas — mais os agentes de ciência do desporto e coaching da Finta.',
    src_official: 'Oficial', src_curated: 'Curado', src_community: 'Comunidade', src_original: 'Original',
    cta_h2: 'Pronto em cinco minutos.', cta_sub: 'Abra o wizard, responda a algumas perguntas, cole um prompt. O seu assistente faz o resto.',
    foot_tag: 'Config de IA e orquestração de agentes para o ecossistema desportivo e além.',
    foot_product: 'Produto', foot_eco: 'Ecossistema',
    foot_built: 'HTML/CSS/JS puro — sem framework, sem build.',
  },
  ja: {
    nav_features: '機能', nav_loopforge: 'Loop Forge', nav_catalog: 'カタログ', nav_how: '使い方', nav_cta: 'ウィザードを起動',
    hero_chip: 'AI設定 · エージェントオーケストレーション',
    hero_h1a: '仕事の終わりを', hero_h1b: '自分で判断できるエージェント。',
    hero_sub: 'Fintaは2,500以上のスコア付きエージェント・スキル・コマンドを19のAIアシスタント向け設定にまとめ、ガードレール・ディスク上メモリ・人間へのエスカレーションを備えた自己検証型エージェントループを生成します。',
    hero_cta1: 'ウィザードを起動', hero_cta2: 'Loop Forge を開く ⟳',
    hero_note: 'ビルド不要。アカウント不要。HTMLファイル1つ。',
    stat_agents: 'エージェント', stat_skills: 'スキル', stat_commands: 'コマンド', stat_tools: 'AIアシスタント', stat_loops: 'ループ型', stat_langs: '言語',
    feat_chip: 'プラットフォーム',
    feat_h2: '「空のリポジトリ」から「成果を出すエージェント」まで',
    feat_sub: 'セットアップはウィザード、実行層はフォージ。どちらも静的ページ — ファイルを開けばすぐ使えます。',
    f1_t: 'スコア付きカタログ', f1_d: 'すべての項目にソースの評判・内容の深さ・キュレーション階層に基づく0–100のスコア。デフォルトでは65以上のみ表示。',
    f2_t: '19アシスタント対応', f2_d: 'Claude Code、Cursor、Copilot、Windsurf、Codex、Gemini、Aiderほか12種 — 同じ5分のウィザードが各ツールに最適な形式を生成。',
    f3_t: 'ループエンジニアリング', f3_d: '新機能:観察→判断→実行→検証のループを回し、証明可能なゴールで停止するエージェントを生成。',
    f4_t: '標準装備のガードレール', f4_d: '反復上限、3ラウンド停滞検知、時間/トークン予算、回帰時のロールバック — 文章でなくコードで強制。',
    f5_t: 'ディスク上のメモリ', f5_d: '永続メモリ、解決時に消去されるインシデントバッファ、サブエージェントが読み書きする交換バス。',
    f6_t: 'Human-to-loop', f6_d: '曖昧さ・不可逆な操作・機密データ・主観的判断・予算切れの5つのトリガーで人間に制御を返します。',
    lf_chip: '新登場 · Loop Forge',
    lf_h2: '静的なペルソナから実行可能なループへ',
    lf_sub: 'ペルソナはエージェントに「誰であるか」を伝え、ループは「どう終わらせるか」を伝えます。Loop Forgeはオーケストレーター、設定、メモリ、スコアリング、実行可能なPythonループランナーまで一式生成。',
    lf_pipe_t: '検証済みサイクル',
    lf_pipe_d: '疑念が10%を超えたら推測せず質問。バグ発生時は診断1つ・修正1つ・最大3回のリトライ、回帰テスト合格後に解決とみなします。',
    lf_c1_t: '5つのループ型', lf_c1_d: 'ターン制・目標駆動・時間駆動・プロアクティブ・人間検証付き簡易型 — 3問の決定木で選択。',
    lf_c2_t: '2モード検証', lf_c2_d: '決定的基準(テスト合格・CI緑)とソフト基準(仕様適合・初回はユーザー承認)— 盲目的なpass/failはなし。',
    lf_c3_t: '4つのオーケストレーション', lf_c3_d: '単一エージェント・並列ファンアウト・逐次チェーン・混合 — 全サブエージェントが読み書きする交換バス付き。',
    lf_c4_t: '実行可能な出力', lf_c4_d: 'AGENT.md、loop.config.json、スコアリング、メモリ、バリデーター、ガードレール内蔵のPythonランナーを含むZIP。',
    lf_cta: 'ループエージェントを作る',
    how_chip: 'ワークフロー', how_h2: '3ステップ、5分',
    how1_t: '回答', how1_d: 'Fast・Advanced・Deepからプロファイルを選び、スタックとチームとワークフローを記述。',
    how2_t: '生成', how2_d: 'Fintaが文脈に最適な高スコアの項目を選定し、ブートストラッププロンプトとファイルツリーを構築。',
    how3_t: '貼り付け', how3_d: 'プロンプトをAIアシスタントに1回貼り付けるだけ。既存ファイルを上書きせずに設定を導入。',
    cat_chip: 'カタログ', cat_h2: '最良の公開ソースからキュレーション',
    cat_sub: '12以上のソースをスコア化・階層化 — Finta独自のスポーツ科学・コーチングエージェントも。',
    src_official: '公式', src_curated: '厳選', src_community: 'コミュニティ', src_original: 'オリジナル',
    cta_h2: '5分で準備完了。', cta_sub: 'ウィザードを開き、質問に答え、プロンプトを貼るだけ。あとはアシスタントにお任せ。',
    foot_tag: 'スポーツエコシステムとその先のためのAI設定&エージェントオーケストレーション。',
    foot_product: 'プロダクト', foot_eco: 'エコシステム',
    foot_built: '純粋なHTML/CSS/JS — フレームワークなし、ビルドなし。',
  },
  zh: {
    nav_features: '功能', nav_loopforge: 'Loop Forge', nav_catalog: '目录', nav_how: '工作原理', nav_cta: '启动向导',
    hero_chip: 'AI 配置 · 智能体编排',
    hero_h1a: '知道何时完工的', hero_h1b: '智能体。',
    hero_sub: 'Finta 将 2500+ 个带质量评分的智能体、技能和命令组装成可直接使用的配置,支持 19 种 AI 助手 — 并锻造带护栏、磁盘记忆和人工升级的自校验智能体循环。',
    hero_cta1: '启动向导', hero_cta2: '打开 Loop Forge ⟳',
    hero_note: '无需构建。无需账户。一个 HTML 文件即可。',
    stat_agents: '智能体', stat_skills: '技能', stat_commands: '命令', stat_tools: 'AI 助手', stat_loops: '循环模式', stat_langs: '语言',
    feat_chip: '平台',
    feat_h2: '从「空仓库」到「能交付的智能体」的一切',
    feat_sub: '向导负责配置,锻造台负责执行层。纯静态页面 — 打开文件即可开工。',
    f1_t: '质量评分目录', f1_d: '每个条目都有 0–100 分,基于来源声誉、内容深度和策展级别。默认只展示 ≥ 65 分的条目。',
    f2_t: '19 种助手,一个向导', f2_d: 'Claude Code、Cursor、Copilot、Windsurf、Codex、Gemini、Aider 等 — 同一个 5 分钟向导为每种工具生成正确格式。',
    f3_t: '循环工程', f3_d: '新功能:锻造运行已验证循环的智能体 — 观察、决策、执行、校验 — 在可证明的目标处停止,而非无限漂移。',
    f4_t: '默认护栏', f4_d: '迭代上限、3 轮无进展的停滞检测、时间/令牌预算、回归时回滚 — 用代码强制执行,而非文字描述。',
    f5_t: '磁盘记忆', f5_d: '永久记忆、解决后清空的事件缓冲区,以及子智能体读写协调的交换总线。',
    f6_t: '人机回环', f6_d: '五个升级触发器 — 歧义、不可逆操作、敏感数据、主观判断、预算耗尽 — 将控制权交还给你。',
    lf_chip: '新品 · Loop Forge',
    lf_h2: '从静态人设到可执行循环',
    lf_sub: '人设文件告诉智能体「是谁」,循环告诉它「如何完成」。Loop Forge 生成完整的执行架构 — 编排器、配置、记忆、评分表和可运行的 Python 循环器。',
    lf_pipe_t: '经过验证的循环',
    lf_pipe_d: '疑虑超过 10%?智能体会提问而不是猜测。出现 Bug?一次诊断、一次原子修复、最多重试 3 次,回归测试通过后才算解决。',
    lf_c1_t: '5 种循环模式', lf_c1_d: '逐轮、目标驱动、时间驱动、主动式,或带人工确认的简化模式 — 由 3 个问题的决策树选出。',
    lf_c2_t: '双模式校验', lf_c2_d: '确定性标准(测试通过、CI 绿灯)与软标准(符合规格,首次由你确认)— 绝不是盲目的通过/失败。',
    lf_c3_t: '4 种编排模式', lf_c3_d: '单智能体、并行扇出、顺序链或混合 — 配有每个子智能体都读写的交换总线文件。',
    lf_c4_t: '可运行的产出', lf_c4_d: '不只是 Markdown:ZIP 包含 AGENT.md、loop.config.json、评分表、记忆文件、结构校验器和内置护栏的 Python 循环器。',
    lf_cta: '锻造你的循环智能体',
    how_chip: '流程', how_h2: '三步,五分钟',
    how1_t: '回答', how1_d: '选择 Fast、Advanced 或 Deep 档位,描述你的技术栈、团队和工作流。',
    how2_t: '生成', how2_d: 'Finta 为你的场景挑选评分最高的条目,构建引导提示词和文件树预览。',
    how3_t: '粘贴', how3_d: '将提示词粘贴到 AI 助手一次即可。它会安装配置,且不覆盖项目中的任何内容。',
    cat_chip: '目录', cat_h2: '精选自最优质的公开来源',
    cat_sub: '十余个来源,均经评分分级 — 还有 Finta 独有的运动科学与教练智能体。',
    src_official: '官方', src_curated: '精选', src_community: '社区', src_original: '原创',
    cta_h2: '五分钟就绪。', cta_sub: '打开向导,回答几个问题,粘贴一个提示词。剩下的交给你的助手。',
    foot_tag: '面向体育生态及更广领域的 AI 配置与智能体编排。',
    foot_product: '产品', foot_eco: '生态',
    foot_built: '纯 HTML/CSS/JS — 无框架,无构建。',
  },
  ko: {
    nav_features: '기능', nav_loopforge: 'Loop Forge', nav_catalog: '카탈로그', nav_how: '작동 방식', nav_cta: '위저드 실행',
    hero_chip: 'AI 설정 · 에이전트 오케스트레이션',
    hero_h1a: '일이 끝났음을', hero_h1b: '스스로 아는 에이전트.',
    hero_sub: 'Finta는 품질 점수가 매겨진 2,500개 이상의 에이전트·스킬·커맨드를 19개 AI 어시스턴트용 설정으로 조립하고, 가드레일·디스크 메모리·인간 에스컬레이션을 갖춘 자가 검증 에이전트 루프를 만들어 냅니다.',
    hero_cta1: '위저드 실행', hero_cta2: 'Loop Forge 열기 ⟳',
    hero_note: '빌드 없음. 계정 없음. HTML 파일 하나면 충분.',
    stat_agents: '에이전트', stat_skills: '스킬', stat_commands: '커맨드', stat_tools: 'AI 어시스턴트', stat_loops: '루프 유형', stat_langs: '언어',
    feat_chip: '플랫폼',
    feat_h2: '「빈 저장소」와 「결과를 내는 에이전트」 사이의 모든 것',
    feat_sub: '설정은 위저드가, 실행 계층은 포지가. 둘 다 정적 페이지 — 파일만 열면 바로 시작.',
    f1_t: '점수화된 카탈로그', f1_d: '모든 항목에 소스 평판·콘텐츠 깊이·큐레이션 등급 기반 0–100점 점수. 기본적으로 65점 이상만 노출됩니다.',
    f2_t: '19개 어시스턴트, 하나의 위저드', f2_d: 'Claude Code, Cursor, Copilot, Windsurf, Codex, Gemini, Aider 외 12종 — 동일한 5분 위저드가 각 도구에 맞는 형식을 생성.',
    f3_t: '루프 엔지니어링', f3_d: '신규: 관찰→결정→실행→검증 루프를 돌고, 증명 가능한 목표에서 멈추는 에이전트를 만드세요.',
    f4_t: '기본 가드레일', f4_d: '반복 상한, 3라운드 정체 감지, 시간/토큰 예산, 회귀 시 롤백 — 문서가 아닌 코드로 강제.',
    f5_t: '디스크 메모리', f5_d: '영구 메모리, 해결 시 비워지는 인시던트 버퍼, 서브 에이전트가 읽고 쓰는 교환 버스.',
    f6_t: 'Human-to-loop', f6_d: '모호함·비가역 작업·민감 데이터·주관적 판단·예산 소진, 5가지 트리거가 제어권을 돌려드립니다.',
    lf_chip: '신규 · Loop Forge',
    lf_h2: '정적 페르소나에서 실행 가능한 루프로',
    lf_sub: '페르소나 파일은 에이전트에게 「누구인지」를, 루프는 「어떻게 끝내는지」를 알려줍니다. Loop Forge는 오케스트레이터, 설정, 메모리, 스코어링 그리드, 실행 가능한 Python 루프 러너까지 전체 실행 아키텍처를 생성합니다.',
    lf_pipe_t: '검증된 사이클',
    lf_pipe_d: '의심이 10%를 넘으면 추측 대신 질문합니다. 버그가 나면 진단 1회, 원자적 수정 1회, 최대 3회 재시도 후 회귀 테스트를 통과해야 해결로 인정.',
    lf_c1_t: '5가지 루프 유형', lf_c1_d: '턴제·목표 기반·시간 기반·능동형·인간 검증 간소형 — 3문항 결정 트리로 선택.',
    lf_c2_t: '2모드 검증', lf_c2_d: '결정적 기준(테스트 통과·CI 그린)과 소프트 기준(스펙 부합, 최초 1회 사용자 승인) — 맹목적 pass/fail은 없습니다.',
    lf_c3_t: '4가지 오케스트레이션 패턴', lf_c3_d: '단일 에이전트, 병렬 팬아웃, 순차 체인, 혼합 — 모든 서브 에이전트가 읽고 쓰는 교환 버스 파일 포함.',
    lf_c4_t: '실행 가능한 산출물', lf_c4_d: '마크다운만이 아닙니다: AGENT.md, loop.config.json, 스코어링 그리드, 메모리 파일, 구조 검증기, 가드레일 내장 Python 러너가 담긴 ZIP.',
    lf_cta: '루프 에이전트 만들기',
    how_chip: '워크플로', how_h2: '3단계, 5분',
    how1_t: '응답', how1_d: 'Fast·Advanced·Deep 중 프로필을 고르고 스택·팀·워크플로를 설명하세요.',
    how2_t: '생성', how2_d: 'Finta가 컨텍스트에 맞는 최고 점수 항목을 선별해 부트스트랩 프롬프트와 파일 트리 미리보기를 만듭니다.',
    how3_t: '붙여넣기', how3_d: '프롬프트를 AI 어시스턴트에 한 번만 붙여넣으세요. 기존 파일을 덮어쓰지 않고 설정을 설치합니다.',
    cat_chip: '카탈로그', cat_h2: '최고의 공개 소스에서 큐레이션',
    cat_sub: '12개 이상의 소스를 점수화·등급화 — Finta만의 스포츠 과학·코칭 에이전트도 포함.',
    src_official: '공식', src_curated: '큐레이션', src_community: '커뮤니티', src_original: '오리지널',
    cta_h2: '5분이면 준비 완료.', cta_sub: '위저드를 열고, 몇 가지 질문에 답하고, 프롬프트 하나만 붙여넣으세요.',
    foot_tag: '스포츠 생태계와 그 너머를 위한 AI 설정 & 에이전트 오케스트레이션.',
    foot_product: '제품', foot_eco: '생태계',
    foot_built: '순수 HTML/CSS/JS — 프레임워크 없음, 빌드 없음.',
  },
};

/* English defaults captured from the DOM so we can switch back */
const EN_DEFAULTS = {};

function applyLang(lang) {
  const dict = lang === 'en' ? EN_DEFAULTS : I18N[lang];
  if (!dict) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  try { localStorage.setItem('finta-lang', lang); } catch (e) {}
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
}

function initLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!(el.dataset.i18n in EN_DEFAULTS)) EN_DEFAULTS[el.dataset.i18n] = el.textContent;
  });
  let lang = new URLSearchParams(location.search).get('lang');
  if (!lang) { try { lang = localStorage.getItem('finta-lang'); } catch (e) {} }
  if (!lang) lang = (navigator.language || 'en').slice(0, 2);
  if (!I18N[lang] && lang !== 'en') lang = 'en';
  applyLang(lang);
  const sel = document.getElementById('lang-select');
  if (sel) sel.addEventListener('change', e => applyLang(e.target.value));
}

/* ─── Boot ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  runConsole();
  runRing();
  animateCounters();
  setupReveal();
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
  // Close mobile menu on link tap
  document.querySelectorAll('#nav-mobile a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('nav-mobile').classList.remove('open')));
});
