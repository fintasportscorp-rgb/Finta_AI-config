# Finta — AI Configuration Wizard

**Configure your AI development environment in under 5 minutes.**

> Live demo: [config.fintalab.com](https://config.fintalab.com)  
> Sports ecosystem: [fintalab.com](https://fintalab.com)  
> AI-powered catalog assistant: [NotebookLM](https://notebooklm.google.com/notebook/70873a7e-89a4-423f-bdbe-530fcbc3f9d9/preview)

---

## What Is Finta?

Finta is an interactive setup wizard that generates a ready-to-use AI configuration folder for your project. Answer a few questions about your stack, team, and workflow — Finta assembles a curated set of **agents**, **skills**, and **slash commands** tuned for your exact context, then produces a one-shot bootstrap prompt you paste into your AI assistant to build the config files.

No manual reading of hundreds of markdown files. No guessing which agent fits which stack. One wizard, one prompt, done.

**New — Loop Forge** (`loopforge.html`): a second studio that goes beyond static persona files. It forges an *executable* agent-loop architecture — orchestrator contract, guardrails enforced in code, on-disk memory, two-mode verification and orchestration patterns — exported as a ZIP with a runnable Python loop runner. See [Loop Forge](#loop-forge--executable-agent-loops) below.

---

## The Catalog

| Type | Count | Description |
|------|-------|-------------|
| **Agents** | 250+ | Specialized AI sub-personalities (backend, frontend, AI, security, sport coaching…) |
| **Skills** | 1,700+ | Reusable capabilities (Office formats, hooks, MCP, integrations, frontend design…) |
| **Commands** | 128 | Slash commands for the full dev lifecycle (git, testing, security, docs…) |

Every item carries a **quality score 0–100** computed from three signals: source GitHub stars (35%), content depth (40%), and curation tier (25%). The wizard surfaces only items that score ≥ 65 by default.

---

## Supported AI Tools

Finta generates config for **19 AI coding assistants**:

| Tool | Config File |
|------|-------------|
| Claude Code | `CLAUDE.md` + `.claude/` |
| Cursor | `cursor_rules.md` |
| GitHub Copilot | `COPILOT.md` |
| Windsurf | `windsurf_rules.md` |
| Codex CLI | `AGENTS.md` |
| Goose | `GOOSE.md` |
| Gemini Code Assist | `GEMINI.md` |
| Aider | `CONVENTIONS.md` |
| Continue | `CONTINUE.md` |
| Cline | `CLINE.md` |
| Amazon Q | `AMAZONQ.md` |
| Devin | `DEVIN.md` |
| DeepSeek | `DEEPSEEK.md` |
| Tongyi Lingma | `LINGMA.md` |
| Baidu Comate | `COMATE.md` |
| CodeGeeX | `CODEGEEX.md` |
| Kimi | `KIMI.md` |
| MarsCode | `MARSCODE.md` |
| Mistral Vibe | `MISTRAL.md` |

---

## Wizard Flow

The wizard has three experience profiles:

| Profile | Who It's For |
|---------|-------------|
| **Fast — No Code** | AI users who generate content, analysis, and scripts without writing code |
| **Advanced** | Daily coders (Python, JS, Go…) who want the assistant to respect their conventions and tests |
| **Deep** | System designers and team leads who configure multi-model, multi-assistant environments |

**Step-by-step:**

1. **Profile** — choose Fast, Advanced, or Deep
2. **Objective** — new project from scratch, or improve an existing config
3. **AI tool(s)** — select which assistant(s) you use
4. **Domain** — project type (apps, data, AI, security, sport, fintech…)
5. **Stack** — languages, frameworks, databases
6. **Team & workflow** — team size, commit style, TDD level, autonomy
7. **Generate** — receive a bootstrap prompt + a rendered file-tree of what will be created

The generated prompt is designed to be pasted once into your AI assistant. It installs config files, agents, skills, and commands without overwriting anything already in your project.

---

## Project Structure

```
.
├── index.html              # Landing page (Finta 2040 liquid-glass design)
├── wizard.html             # Multi-step config wizard
├── loopforge.html          # Loop Forge — executable agent-loop builder
├── js/
│   ├── theme.js            # Shared light/dark theme bootstrap
│   ├── landing.js          # Landing logic + inline i18n (8 languages)
│   ├── loopforge.js        # Loop Forge engine — decision tree, guardrails, file generation, ZIP
│   └── wizard.js           # Wizard engine — question flow, prompt generation, export
├── css/
│   ├── finta2040.css       # Shared design system — blue liquid glass, light/dark tokens
│   ├── landing.css         # Landing page styles
│   ├── loopforge.css       # Loop Forge studio styles
│   ├── wizard.css          # Wizard base styles
│   └── wizard-theme2040.css# Wizard re-skin to the 2040 system (light/dark)
├── data/
│   ├── questions.json      # Wizard question tree (all steps, options, targets)
│   └── arbo.json           # Domain/stack/tool mappings + file tree templates
├── i18n/
│   ├── en.json             # English strings
│   ├── fr.json             # French
│   ├── es.json             # Spanish
│   ├── de.json             # German
│   ├── pt.json             # Portuguese
│   ├── ja.json             # Japanese
│   ├── zh.json             # Chinese
│   └── ko.json             # Korean
├── agents/                 # 250+ agent markdown files
│   ├── avivl_backend_*.md  # Backend experts (FastAPI, Django, Go, Node…)
│   ├── avivl_frontend_*.md # Frontend experts (React, Vue, Next…)
│   ├── avivl_security_*.md # Security & DevSecOps
│   ├── finta_coaching_*.md # Sport coaching specialists (see below)
│   ├── finta_holistic_*.md # Personal development agents
│   ├── finta_sport_*.md    # Multi-sport science agents
│   └── …                   # 12 curated + community sources
├── skills/
│   ├── anthropics/         # 27 official Anthropic skills (Tier 0)
│   └── community/          # 1,700+ skills from curated packs
├── commands/               # 128 slash commands from 7 contributors
├── subagents/              # Orchestrator sub-agent definitions
├── notebookLM/             # NotebookLM playbooks + scoring docs
│   ├── playbook-agents.md
│   ├── playbook-skills.md
│   ├── playbook-commands.md
│   ├── scoring-methodology.md
│   └── system-prompt.md    # Paste into NotebookLM to activate the assistant
└── logo/                   # Favicons and OG images
```

---

## Agent Catalog — Sources & Quality

| Source | Count | Stars | Tier | Specialty |
|--------|-------|-------|------|-----------|
| wshobson | 66 | ⭐ 36k | Curated | Python, TypeScript, Go, Rust, Java, SQL, DevOps, ML, Security |
| avivl | 108 | ⭐ 262 | Curated | FastAPI, Django, Rails, Node, Go, AI/ML, Infrastructure, Orchestration |
| contains | 37 | ⭐ 12k | Curated | Frontend, Backend, Marketing, Operations — startup/product stack |
| voltagent | 144 | ⭐ 9.2k | Community | General-purpose, Business, Full-stack |
| 0xfurai | 138 | ⭐ 911 | Community | Broad coverage, large collection |
| lst97 | 37 | ⭐ 1.6k | Community | Specialized sub-agents |
| magento | 30 | ⭐ 110 | Community | Magento 2 / Adobe Commerce |
| **finta** | 30+ | — | Official | Sport coaching, performance science, holistic development |

Top-quality agents: `backend-architect` 82/100 · `database-architect` 80 · `incident-responder` 80 · `prompt-engineer` 79 · `django-expert` 77

---

## Skills Catalog — Sources & Quality

| Source | Count | Stars | Tier | Specialty |
|--------|-------|-------|------|-----------|
| anthropics | 27 | ⭐ 127k | **Official** | Hooks, MCP, Office formats (docx/xlsx/pptx), PDF, Claude API |
| alirezarezvani | 215 | ⭐ 16k | Curated | 13 categories: sales, ops, engineering, design, marketing |
| composio | 28 | ⭐ 62k | Curated | Tool integrations (ActiveCampaign, Notion, Slack…) |
| antigravity | 1,446 | ⭐ 39k | Community | Massive cross-tool collection, broadest coverage |

Official Anthropic skills score **100/100** and are always recommended first for Claude Code projects.

---

## Command Catalog

| Contributor | Count | Stars | Focus |
|-------------|-------|-------|-------|
| wshobson | 57 | ⭐ 36k | Full dev lifecycle — git, docs, testing, security, AI, debugging |
| hesreallyhim | 26 | ⭐ 1.3k | Code review, workflow automation |
| pedrohcgs | 17 | ⭐ 5 | Code analysis and quality |
| centminmod | 14 | ⭐ 6 | Server ops, nginx, performance |

Top commands by quality: `/security-scan` 93 · `/code-explain` 93 · `/doc-generate` 93 · `/deps-upgrade` 93

---

## Sport & Coaching Agents — Finta Originals

Finta ships a unique set of agents built for the sports industry, fully aligned with the [fintalab.com](https://fintalab.com) ecosystem:

**Coaching (`finta_coaching_*`)**
- `biomechanics-movement-coach` — Sprint mechanics, force-velocity profiles, CMJ/SJ/RSI analysis, FMS screening
- `complex-systems-coach` — Ecological dynamics, DEFCON cohesion modelling, constraint-based training design
- `decision-science-coach` — Cognitive bias auditing, MCDA/AHP/Bayesian frameworks for scouting and tactical decisions
- `ethics-behavioral-economics` — FFP compliance, sunk cost analysis, transfer market bias, governance systems
- `mental-preparation-coach` — Chimp Paradox, SIT (Stress Inoculation Training), IZOF, pre-competition protocols
- `philosophy-development` — Coaching philosophy construction, values-based leadership
- `physical-preparation` — Periodisation, load monitoring, return-to-play protocols
- `skill-acquisition` — Constraints-led approach, variability practice, implicit vs explicit learning
- `sport-neuroscience` — Motor learning, decision fatigue, neurofeedback, perceptual-cognitive training
- `sport-technology` — GPS/IMU data analysis, wearable integration, computer vision for performance
- `team-culture-leadership` — Psychological safety, trust architectures, team cohesion measurement

**Holistic (`finta_holistic_*`)**  
Behavioral change, career development, communication, emotional intelligence, financial intelligence, learning mindset, personal leadership, productivity, professional resilience

**Multi-Sport Science (`finta_sport_*`)**  
Performance analysis, strength & conditioning, sports nutrition, recovery science, talent identification

These agents implement evidence-based frameworks (Peters, Meichenbaum, SFMA, GPS load metrics, UEFA CFSR) with explicit behavioral guardrails — they never prescribe without profiling.

---

## NotebookLM Integration

The `notebookLM/` folder contains a fully configured AI assistant for catalog navigation.

**Setup:**
1. Open [Finta NotebookLM](https://notebooklm.google.com/notebook/70873a7e-89a4-423f-bdbe-530fcbc3f9d9/preview)
2. Upload these four files as sources:
   - `notebookLM/playbook-agents.md`
   - `notebookLM/playbook-skills.md`
   - `notebookLM/playbook-commands.md`
   - `notebookLM/scoring-methodology.md`
3. Paste the contents of `notebookLM/system-prompt.md` into *Customize your notebook*

The assistant will then answer queries like:
- *"I'm building a FastAPI backend with PostgreSQL and Redis. What agents should I use?"*
- *"Best security agents for a fintech SaaS?"*
- *"Compare backend-architect vs django-expert for my Django REST project"*
- *"Highest quality agents for football club management"*

It cites quality scores, source repos, and explains why each item fits your context. It never invents items not in the catalog.

---

## Quality Scoring

Every catalog item has a pre-computed score (0–100):

```
quality = (stars_score × 35%) + (content_score × 40%) + (tier_score × 25%)
```

| Component | Weight | Measures |
|-----------|--------|---------|
| `stars_score` | 35% | GitHub stars of source repo (log-scaled, anchor: 40k) |
| `content_score` | 40% | File depth — sections, examples, rules, length |
| `tier_score` | 25% | Curation level: Official (100) → Curated (75) → Community (50) |

Star scale: 0 stars = 0 · 1k = 65 · 10k = 87 · 36k = 99 · 127k = 100

Rating display: ★★★★★ = 80–100 · ★★★★☆ = 65–79 · ★★★☆☆ = 50–64 · ★★☆☆☆ = 35–49 · ★☆☆☆☆ = 0–34

---

## Internationalization

The wizard and landing page are fully translated into 8 languages, auto-detected from the browser or switchable via `?lang=`:

`en` · `fr` · `es` · `de` · `pt` · `ja` · `zh` · `ko`

---

## Running Locally

```bash
# Static file server — no build step required
./serve.sh          # Linux/macOS
serve.bat           # Windows
```

The app is pure HTML/CSS/JavaScript with no framework dependencies. Open `index.html` in a browser or serve from any static host.

---

## Design System — Finta 2040

The UI uses a **blue liquid-glass** system (`css/finta2040.css`): translucent surfaces with backdrop blur, an animated aurora backdrop, and full **light/dark mode** (toggle persisted in `localStorage`, defaults to the OS preference).

| Token (dark) | Value | Role |
|-------|-------|------|
| `--bg1` | `#060d1f` | Deep navy background |
| `--blue` / `--blue-hi` | `#3b82f6` / `#60a5fa` | Electric blue primary |
| `--cyan` | `#22d3ee` | Cyan accent |
| `--glass` | `rgba(96,145,255,.055)` | Liquid-glass surface |
| `--txt` | `#e6eeff` | Main text (ice white) |

Light mode remaps every token (`:root[data-theme="light"]`). Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (display) · [Inter](https://fonts.google.com/specimen/Inter) (text) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (code). Fully responsive — the layout collapses to a single column with a glass burger menu under 880 px.

---

## Loop Forge — Executable Agent Loops

`loopforge.html` implements the **loop-engineering** blueprint: an agent shouldn't just have a persona — it should run a verified loop and *know when the work is done*.

Six steps:

1. **Identity** — mission (verifiable objective), locked scope, forbidden actions.
2. **Loop profile** — a 3-question decision tree picks one of **5 profiles**: turn-by-turn, goal-based, temporal, proactive, or simplified + human validation.
3. **Guardrails** — max iterations (default 20), stagnation stop (3 flat rounds), doubt threshold (10 % → CLARIFY), fix retries (3 → BLOCKED), time/token budgets, rollback on regression.
4. **Human-to-loop (HTL)** — 5 escalation triggers: ambiguity, irreversible action, sensitive data, subjective judgment, budget exhausted.
5. **Verification** — per-criterion `verification_mode`: `deterministic` (command exit code) or `soft` (spec validated once with the user, marker in `memory.md`) — never a blind pass/fail.
6. **Orchestration** — single, parallel fan-out, sequential, or mixed; sub-agents coordinate through a `memory/exchange.md` JSON-lines bus; a failing sub-agent re-enters a capped correction loop, then HTL.

The output is a ZIP bundle:

```
my-agent/
├── AGENT.md                  # orchestrator contract
├── loop.config.json          # loop_type + guardrails + orchestration
├── memory/                   # memory.md · memory_temp.md · exchange.md
├── asset/                    # scale-objectif.json (scoring grid) + playbooks
├── skills/                   # created on the fly by the agent, then reused
└── script/
    ├── loop_runner.py        # stdlib-only runtime — guardrails enforced in code
    ├── validate-structure.py # bundle well-formed?
    └── validate-coherence.py # config values agree?
```

`loop_runner.py` exit codes: **0** RESOLVED · **2** HTL (human takes over, incident buffer preserved) · **3** CLARIFY · **5** turn done, re-run to continue (`turn_by_turn`) · **6** awaiting `--confirm` (`human_validated`). A copy-paste **bootstrap prompt** is also generated — it now instructs the installing assistant to test-run every deterministic command before trusting the loop.

**The profile changes runtime behavior** (all five verified by execution): `turn_by_turn` runs one iteration per invocation; `human_validated` dry-runs until `--confirm`; `temporal` polls `temporal.trigger_cmd` between iterations; `proactive` keeps watching after RESOLVED and autonomously re-enters on regression. HTL semantics are honest: hard brakes (iteration cap, stagnation, budgets) always stop — the toggles govern only the advisory triggers the agent raises itself. An **escalation ladder** (`escalation_ladder` in `loop.config.json`) retries a BLOCKED task with stronger model tiers — each with a fresh iteration budget and its own `agent_cmd` — before falling back to a human: run Haiku first, escalate on proof of failure, pay for Fable 5 only when needed. Sub-agents can carry their own `agent_cmd` too, and each turn now receives the tail of `memory_temp.md` as working memory instead of a bare 800-char error.

Loop Forge complements the wizard: the wizard picks *who* your agents are (personas, skills, commands); Loop Forge defines *how they finish* (execution layer). Everything generated is plain text + simple JSON — portable across models.

---

## Finta Bench — Measured Efficiency

`bench/` + `bench.html` answer the question every config tool dodges: **what is the config actually worth, measured?**

`bench/run_bench.py` (stdlib-only) runs identical tasks against fresh copies of your repo in two arms — `bare` (config stripped) vs `configured` — with your own agent CLI. The judge is each task's deterministic `check` command, never the agent's self-report. It records pass rate, turns-to-pass (with failure feedback between turns), wall time and estimated tokens, then writes JSONL + an aggregated summary.

```bash
python3 bench/run_bench.py --tasks bench/tasks.example.json \
  --repo ~/code/your-project \
  --agent-cmd 'claude -p "{prompt}" --dangerously-skip-permissions' \
  --repeats 3 --max-turns 5 --out bench/results.jsonl
```

Load the results into **`bench.html`** — a client-side dashboard with stat tiles (pass rate, Δ turns, Δ tokens, Δ time), per-task comparison charts and the full table. Honesty is enforced by design: medians not means, `n` always displayed, mock/pipeline-test data is flagged with a warning banner and can't be confused with measurements, and a footer reminder that a delta measured on your repo is a claim about *your* setup, not a universal constant. See `bench/README.md` for methodology and task-writing guidance.

**Wizard integration.** The config wizard ships the same structure with one toggle on the results screen ("Loop execution layer"), enabled by default for Advanced/Deep profiles. The loop config is *derived from your answers* — package manager → real test/lint commands as deterministic criteria, TDD level → success threshold (strict 90 / soft 85 / critical 80 / none 70), autonomy → loop profile and iteration cap (conservative → human-validated ×10, standard → goal-based ×20, autonomous → proactive ×30), "never do" list → forbidden scope, first spec → mission. The bundle lands at project root as `loop/<project>-loop/` (tool-agnostic, outside `.claude/`-style folders), is referenced from the main config file, and both generators share one template source: `js/loopforge-templates.js`.

---

## Fintalab Sports Ecosystem

This wizard is part of the [fintalab.com](https://fintalab.com) sports platform — a toolbox for clubs, coaches, and performance directors that follows the Finta AI config protocol.

The `finta_*` agents are designed to work inside a sport organisation's `.claude/agents/` folder, giving every staff member access to expert-level AI assistance grounded in evidence-based sport science frameworks — without requiring them to prompt-engineer from scratch.

---

## Contributing

1. Fork and clone
2. Add agent/skill/command files following the naming convention: `{source}_{category}_{name}.md`
3. Ensure every agent has: `name`, `description`, `tools` frontmatter + Role, Behavior Rules, and Example Invocations sections
4. Open a PR — items will be scored on next enrichment run

Agent frontmatter template:
```markdown
---
name: your-agent-name
description: One-line description of what this agent does
tools: [Read, Bash, Edit]
---

## Role
You are a [specific expert] specializing in [domain].

## Behavior Rules
- Never [dangerous or incorrect action]
- Always [quality constraint]

## Example Invocations
- "Review this endpoint for [specific concern]"
```

---

## Links

| Resource | URL |
|----------|-----|
| Live wizard | [config.fintalab.com](https://config.fintalab.com) |
| Sports platform | [fintalab.com](https://fintalab.com) |
| NotebookLM assistant | [Open notebook](https://notebooklm.google.com/notebook/70873a7e-89a4-423f-bdbe-530fcbc3f9d9/preview) |
| GitHub | [fintasportscorp-rgb/AI-config](https://github.com/fintasportscorp-rgb/AI-config) |
