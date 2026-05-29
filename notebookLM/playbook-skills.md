# Agent Configuration Playbook — Skills Reference Guide

> **Purpose:** Complete reference for Claude Code skills (reusable instruction sets). Import this document into NotebookLM alongside playbook-agents.md and playbook-commands.md and `scoring-methodology.md`.

> **Notebook guide:** See [`system-prompt.md`](./system-prompt.md) to configure your NotebookLM for project-specific recommendations.
>
> **Scoring methodology:** See [`scoring-methodology.md`](./scoring-methodology.md) for the complete formula, sub-score breakdowns, distribution stats, and known limitations.

---

## 1. What Are Skills?

Skills are **reusable instruction sets** stored as markdown files in `.claude/skills/`. Unlike agents (which are full personas), skills are **composable behaviors** that augment how your AI assistant performs specific tasks — without replacing its general intelligence.

### Skills vs Agents vs Commands

| Concept | Purpose | Triggered By | Scope |
|---------|---------|-------------|-------|
| **Agent** | Full persona/specialist | `@agent-name` mention | Full conversation |
| **Skill** | Reusable behavior | Referenced in prompt or rules | Single operation |
| **Command** | Workflow automation | `/command-name` slash syntax | Defined workflow |
| **Rule** | Always-on constraint | Automatic (all sessions) | All interactions |

### Skill File Structure
```markdown
---
name: skill-name
description: What this skill does
version: 1.0.0
author: source-author
---

## Instructions

When asked to [trigger condition], follow this procedure:

### Step 1 — [Action Name]
[Detailed instructions for this step]

### Step 2 — [Action Name]
[Detailed instructions for this step]

## Output Format
[Specify the expected output format]

## Examples
[Example inputs and expected outputs]
```

---

## 2. Skill Categories

### 2.1 Code Quality Skills

**`code-review`** — Structured code review checklist
- Reviews for: correctness, security, performance, readability, test coverage
- Output: numbered list of findings with severity (critical/major/minor)
- Best with: security-auditor agent

**`refactor-guide`** — Safe refactoring procedures
- Covers: extract function, rename, move, decompose
- Key: always run tests before and after
- Output: step-by-step refactoring plan with rollback steps

**`technical-debt`** — Technical debt identification and prioritization
- Identifies: code smells, dead code, outdated dependencies, missing tests
- Output: debt matrix with impact vs effort scores

**`test-strategy`** — Test coverage analysis and improvement
- Generates: unit, integration, e2e test plans
- Covers: edge cases, happy paths, error scenarios
- Output: test file skeleton with placeholder tests

**`performance-profiling`** — Performance bottleneck identification
- Analyzes: time complexity, space complexity, I/O patterns
- Output: flame graph interpretation, optimization suggestions

### 2.2 Architecture Skills

**`adr-writer`** — Architecture Decision Record creation
- Follows: MADR (Markdown Architecture Decision Records) format
- Covers: context, decision, consequences, alternatives considered
- Output: complete ADR markdown file

**`system-design`** — System architecture design guidance
- Covers: component breakdown, data flow, scaling considerations
- Output: architecture diagram (mermaid) + narrative

**`api-design`** — RESTful and GraphQL API design
- Enforces: REST best practices, HTTP semantics, versioning strategies
- Output: OpenAPI spec outline or GraphQL schema

**`database-schema`** — Database schema design and optimization
- Covers: normalization, indexing, relationships, migration strategies
- Output: schema definition with indexes and constraints

**`microservices-boundaries`** — Service boundary identification
- Uses: Domain-Driven Design principles
- Covers: bounded contexts, event boundaries, API contracts
- Output: service map with communication patterns

### 2.3 Security Skills

**`owasp-scan`** — OWASP Top 10 security check
- Checks: injection, authentication, data exposure, XXE, access control, security misconfiguration, XSS, deserialization, components, logging
- Output: finding per vulnerability class with remediation

**`secret-detection`** — Identify hardcoded secrets and credentials
- Detects: API keys, passwords, tokens, private keys in code
- Output: list of findings with file:line references

**`dependency-audit`** — Third-party dependency vulnerability check
- Checks: known CVEs, outdated packages, transitive dependencies
- Output: risk matrix with update recommendations

**`auth-review`** — Authentication and authorization flow review
- Covers: JWT, OAuth2, session management, RBAC/ABAC
- Output: security findings + improvement checklist

**`data-privacy`** — GDPR/CCPA compliance check
- Covers: PII identification, data minimization, consent flows, retention
- Output: compliance gap analysis with remediation steps

### 2.4 Documentation Skills

**`readme-generator`** — Project README creation
- Generates: installation, usage, configuration, contributing sections
- Format: GitHub-flavored markdown with badges
- Output: complete README.md

**`api-docs`** — API documentation from code
- Reads: controllers, routes, schemas to generate endpoint docs
- Format: OpenAPI 3.0 or markdown tables
- Output: complete API reference

**`changelog-writer`** — Structured changelog from git history
- Format: Keep a Changelog standard
- Covers: Added, Changed, Deprecated, Removed, Fixed, Security
- Output: CHANGELOG.md update for a release

**`code-comments`** — Intelligent code comment generation
- Adds: WHY comments (not WHAT), complex algorithm explanations
- Avoids: redundant comments that restate obvious code
- Output: annotated code with meaningful comments only

**`architecture-doc`** — System architecture documentation
- Covers: component overview, data flows, deployment topology
- Output: docs/architecture.md with mermaid diagrams

### 2.5 Git & Workflow Skills

**`commit-message`** — Conventional commit message generation
- Format: `type(scope): description` (Conventional Commits spec)
- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
- Output: commit message + optional body and footer

**`pr-description`** — Pull request description from diff
- Covers: summary, motivation, changes, testing, screenshots
- Output: complete PR description in GitHub markdown

**`git-workflow`** — Branch strategy and git workflow guidance
- Covers: branching models (Gitflow, trunk-based, GitHub Flow)
- Output: workflow documentation + branch naming convention

**`code-conflict`** — Merge conflict resolution guidance
- Analyzes: both sides of conflicts for semantic correctness
- Output: resolved code with explanation

**`release-notes`** — User-facing release notes from technical changes
- Translates: technical commits into user-understandable descriptions
- Format: grouped by feature area
- Output: release notes markdown

### 2.6 Testing Skills

**`unit-test-writer`** — Unit test generation
- Covers: happy path, edge cases, error cases, boundary conditions
- Frameworks: Jest, Vitest, pytest, RSpec, Go testing, etc.
- Output: complete test file with meaningful assertions

**`e2e-test-planner`** — End-to-end test scenario planning
- Covers: critical user journeys, regression scenarios
- Frameworks: Playwright, Cypress, Selenium
- Output: test plan + page object stubs

**`test-data-builder`** — Test fixture and factory generation
- Generates: realistic test data for various scenarios
- Output: factory/fixture files for the detected test framework

**`snapshot-review`** — Snapshot test drift analysis
- Analyzes: whether snapshot changes are intentional or regressions
- Output: change-by-change assessment with approve/investigate flags

**`coverage-gap`** — Test coverage gap identification
- Analyzes: code paths with no test coverage
- Output: prioritized list of uncovered paths with suggested test cases

### 2.7 DevOps & Infrastructure Skills

**`dockerfile-optimizer`** — Docker image optimization
- Covers: layer caching, multi-stage builds, security hardening
- Output: optimized Dockerfile with explanations

**`ci-pipeline`** — CI/CD pipeline design
- Covers: build, test, security scan, deploy stages
- Platforms: GitHub Actions, GitLab CI, CircleCI
- Output: pipeline configuration file

**`k8s-manifest`** — Kubernetes manifest generation and review
- Covers: deployments, services, ingress, RBAC, resource limits
- Output: production-ready k8s manifests with security context

**`terraform-module`** — Terraform module design
- Covers: resource grouping, variable design, outputs
- Output: module structure with main.tf, variables.tf, outputs.tf

**`monitoring-setup`** — Observability configuration
- Covers: metrics, logs, traces, alerts
- Stack: Prometheus/Grafana, Datadog, OpenTelemetry
- Output: monitoring configuration + alert rules

### 2.8 AI/ML Skills

**`prompt-engineering`** — Effective prompt design
- Covers: chain-of-thought, few-shot examples, system prompts
- Output: optimized prompts with A/B variants

**`rag-design`** — Retrieval-Augmented Generation architecture
- Covers: chunking strategies, embedding selection, retrieval optimization
- Output: RAG pipeline design with component recommendations

**`eval-framework`** — LLM evaluation framework design
- Covers: correctness, faithfulness, relevance, hallucination detection
- Output: evaluation dataset + scoring rubric

**`fine-tuning-plan`** — Model fine-tuning strategy
- Covers: dataset curation, training approach (SFT, RLHF, DPO)
- Output: fine-tuning plan with data requirements

**`agent-prompt`** — AI agent system prompt optimization
- Covers: role definition, tool descriptions, output formatting
- Output: optimized system prompt with evaluation criteria

---

## 3. Community Skill Sources

### Anthropic Official (`anthropics/`)
- High-quality, maintained by Anthropic
- Focus: Claude Code workflows, thinking patterns, tool use
- Notable: `think-first`, `ultraviolet`, `smart-file-reader`

### Community Contributors
| Author | Specialty | Notable Skills |
|--------|-----------|----------------|
| **community/** | General productivity | Various workflow skills |
| **hesreallyhim** | Development workflows | Git, testing, debugging |
| **wshobson** | Full-stack | React, API, deployment |
| **pedrohcgs** | DevOps, Cloud | AWS, Docker, CI/CD |
| **agenticbuddy** | Agentic workflows | Multi-step automation |
| **composio** | Tool integrations | External API connections |

---

## 4. Skill Combination Patterns

### High-Impact Combinations

**Security-First Development**
```
owasp-scan + secret-detection + dependency-audit + auth-review
→ Run before every PR merge
→ Output: security clearance checklist
```

**Code Quality Pipeline**
```
code-review + test-strategy + coverage-gap + technical-debt
→ Weekly technical health check
→ Output: quality score + improvement backlog
```

**Documentation Sprint**
```
readme-generator + api-docs + architecture-doc + changelog-writer
→ Before any public release
→ Output: complete documentation suite
```

**Release Preparation**
```
commit-message + pr-description + release-notes + changelog-writer
→ During release process
→ Output: all release artifacts
```

**Architecture Review**
```
system-design + microservices-boundaries + adr-writer + api-design
→ Before new feature architecture
→ Output: RFC-ready architecture document
```

---

## 5. Skill Configuration Best Practices

### DO
- **Compose skills** — combine 2-3 skills for complex tasks
- **Specify output format** in the skill's instructions section
- **Version your skills** — track changes as the project evolves
- **Test skills** with representative inputs before deploying
- **Keep skills focused** — one responsibility per skill file

### DON'T
- **Don't duplicate rules** — if a behavior is in a rule file, don't repeat in a skill
- **Don't chain too many** — more than 4 skills in sequence loses coherence
- **Don't skip format specification** — undefined output format = inconsistent results
- **Don't ignore failure modes** — specify what to do when the skill can't complete

### Skill Sizing Guide
| Task Complexity | Skills Needed | Notes |
|----------------|---------------|-------|
| Simple operation | 1 skill | code-review, commit-message |
| Medium workflow | 2-3 skills | PR preparation, feature doc |
| Complex sprint | 4-6 skills | Release preparation, audit |
| Strategic review | 6+ skills | Architecture overhaul (use orchestration) |

---

## 6. When to Use Skills vs Rules vs Agents

| Scenario | Use | Reason |
|----------|-----|--------|
| Always apply same standard | **Rule** | Auto-loaded every session |
| Expert persona for a topic | **Agent** | Full context specialization |
| Repeatable operation | **Skill** | Composable, invokable on demand |
| Workflow sequence | **Command** | Structured slash invocation |
| One-time task | **Inline prompt** | No need to persist |

### Decision Tree
```
Is this behavior needed every session?
  → YES: Write a Rule
  → NO: Is this a full expert persona?
    → YES: Write an Agent
    → NO: Is this a repeatable operation?
      → YES: Write a Skill
      → NO: Is this a structured workflow?
        → YES: Write a Command
        → NO: Just prompt inline
```

---

## 7. Most Valuable Skills by Project Type

### Web Application
1. `code-review` — Quality gate before merges
2. `owasp-scan` — Security review
3. `unit-test-writer` — Test coverage
4. `pr-description` — Clean PR history
5. `performance-profiling` — Frontend optimization

### API / Backend Service
1. `api-design` — Consistency enforcement
2. `database-schema` — Schema quality
3. `auth-review` — Security
4. `api-docs` — Documentation
5. `monitoring-setup` — Observability

### AI Product
1. `prompt-engineering` — Core quality lever
2. `rag-design` — Retrieval quality
3. `eval-framework` — Quality measurement
4. `agent-prompt` — Agent optimization
5. `data-privacy` — Compliance

### Data Platform
1. `database-schema` — Schema design
2. `test-data-builder` — Test fixtures
3. `api-docs` — Data API documentation
4. `monitoring-setup` — Pipeline observability
5. `changelog-writer` — Schema migration tracking

---

*Generated by Finta AI Configuration Wizard — config.fintalab.com*
*For agents reference: see playbook-agents.md | For commands: see playbook-commands.md*

---

## Source / Provider Index — Skills

| Source | Count | Avg Quality | Tier | Stars | GitHub |
|--------|-------|-------------|------|-------|--------|
| **anthropics** | 18 | ★★★★☆ 82/100 | official | ⭐ 127k | [anthropics/claude-code](https://github.com/anthropics/claude-code) |
| **composio** | 21 | ★★★★☆ 73/100 | curated | ⭐ 62k | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) |
| **antigravity** | 1431 | ★★★★☆ 72/100 | community | ⭐ 39k | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) |
| **alirezarezvani** | 141 | ★★★★☆ 75/100 | curated | ⭐ 16k | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) |

### Repository Details

#### anthropics
- **Repo:** [anthropics/claude-code](https://github.com/anthropics/claude-code)
- **Description:** Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows - all through natural language commands.
- **Stars:** ⭐ 127k | **Forks:** 20,857 | **Open issues:** 9103
- **Language:** Python | **License:** —
- **Last push:** 2026-05-28 | **Tier:** official
- **Skills count:** 18 | **Average quality:** ★★★★☆ 82/100

#### composio
- **Repo:** [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)
- **Description:** A curated list of awesome Claude Skills, resources, and tools for customizing Claude AI workflows
- **Stars:** ⭐ 62k | **Forks:** 6,820 | **Open issues:** 700
- **Language:** Python | **License:** —
- **Last push:** 2026-05-22 | **Tier:** curated
- **Topics:** claude, claude-code, agent-skills, ai-agents, antigravity, automation, codex, composio
- **Skills count:** 21 | **Average quality:** ★★★★☆ 73/100

#### antigravity
- **Repo:** [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)
- **Description:** Installable GitHub library of 1,400+ agentic skills for Claude Code, Cursor, Codex CLI, Gemini CLI, Antigravity, and more. Includes installer CLI, bundles, workflows, and official/community skill collections.
- **Stars:** ⭐ 39k | **Forks:** 6,344 | **Open issues:** 3
- **Language:** Python | **License:** MIT
- **Last push:** 2026-05-28 | **Tier:** community
- **Topics:** agentic-skills, ai-agents, antigravity, claude-code, mcp, ai-workflows, codex-cli, developer-tools
- **Skills count:** 1431 | **Average quality:** ★★★★☆ 72/100

#### alirezarezvani
- **Repo:** [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)
- **Description:** 329 Claude Code skills & agent skills & plugins (30+ Agents, 70+ custom commands, 320+ skills, customizable references, scripts)for Claude Code, Codex, Gemini CLI, Cursor, and 8 more coding agents — engineering, marketing, product, compliance, C-level advisory, research, business operations, commercial & finance, and your daily productivity skills.
- **Stars:** ⭐ 16k | **Forks:** 2,265 | **Open issues:** 8
- **Language:** Python | **License:** MIT
- **Last push:** 2026-05-28 | **Tier:** curated
- **Topics:** agentic-ai, anthropic-claude, claude-ai, claude-code, claude-skills, claude-code-skills, ai-coding-agent, claude-code-plugins
- **Skills count:** 141 | **Average quality:** ★★★★☆ 75/100


---

## Complete Skills Catalog — All 1,611 Items

> Sorted by: tier (official → curated → community), then quality score (high → low)

Score formula: `quality = (stars_score × 35%) + (content_score × 40%) + (tier_score × 25%)`


---

### OFFICIAL — 18 skills

#### AI / ML (7)

##### `Hook Development` — ★★★★★ **100/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 100/100 |

> This skill should be used when the user asks to "create a hook", "add a PreToolUse/PostToolUse/Stop hook", "validate tool use", "implement prompt-based hooks", "use ${CLAUDE_PLUGIN_ROOT}", "set up eve

**File sections:** Overview · Hook Types · Hook Configuration Formats · Hook Events · Hook Output Format · Hook Input Format

#### Other (6)

##### `MCP Integration` — ★★★★★ **100/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Other | 100/100 |

> This skill should be used when the user asks to "add MCP server", "integrate MCP", "configure MCP in plugin", "use .mcp.json", "set up Model Context Protocol", "connect external service", mentions "${

**File sections:** Overview · MCP Server Configuration Methods · MCP Server Types · Environment Variable Expansion · MCP Tool Naming · Lifecycle Management

##### `docx` — ★★★★★ **96/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Other | 91/100 |

> Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of 'Word doc', 'word document', '.docx', or requests to produce

**File sections:** Overview · Quick Reference · Creating New Documents · Editing Existing Documents · XML Reference · Dependencies

##### `xlsx` — ★★★★★ **95/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Other | 88/100 |

> Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to: open, read, edit, or fix an existing .xlsx, .xlsm, .csv, or .tsv file (e.g., add

**File sections:** All Excel files · Financial models · Overview · Important Requirements · Reading and analyzing data · Excel File Workflows

##### `Writing Hookify Rules` — ★★★★★ **93/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Other | 83/100 |

> This skill should be used when the user asks to "create a hookify rule", "write a hook rule", "configure hookify", "add a hookify rule", or needs guidance on hookify rule syntax and patterns.

**File sections:** Overview · Rule File Format · Message Body · Event Type Guide · Pattern Writing Tips · File Organization

##### `algorithmic-art` — ★★★★★ **92/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Other | 81/100 |

> Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or

**File sections:** ALGORITHMIC PHILOSOPHY CREATION · DEDUCING THE CONCEPTUAL SEED · P5.JS IMPLEMENTATION · INTERACTIVE ARTIFACT CREATION · VARIATIONS & EXPLORATION · THE CREATIVE PROCESS

#### AI / ML (7)

##### `slack-gif-creator` — ★★★★★ **91/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 77/100 |

> Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users request animated GIFs for Slack like "make me a G

**File sections:** Slack Requirements · Core Workflow · Drawing Graphics · Available Utilities · Animation Concepts · Optimization Strategies

#### Security (1)

##### `doc-coauthoring` — ★★★★☆ **90/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Security | 75/100 |

> Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This wor

**File sections:** When to Offer This Workflow · Stage 1: Context Gathering · Stage 2: Refinement & Structure · Stage 3: Reader Testing · Final Review · Tips for Effective Guidance

#### Other (6)

##### `pptx` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Other | 61/100 |

> Use this skill any time a .pptx file is involved in any way - as input, output, or both. This includes: creating slide decks, pitch decks, or presentations; reading, parsing, or extracting text from a

**File sections:** Quick Reference · Reading Content · Editing Workflow · Creating from Scratch · Design Ideas · QA (Required)

#### AI / ML (7)

##### `mcp-builder` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 50/100 |

> Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate externa

**File sections:** Overview · ?? High-Level Workflow · ?? Documentation Library

##### `claude-opus-4-5-migration` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 39/100 |

> Migrate prompts and code from Claude Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5. Use when the user wants to update their codebase, prompts, or API calls to use Opus 4.5. Handles model string upda

**File sections:** Migration Workflow · Model String Updates · Prompt Adjustments · Reference

#### Design (1)

##### `canvas-design` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Design | 34/100 |

> Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create ori

**File sections:** DESIGN PHILOSOPHY CREATION · DEDUCING THE SUBTLE REFERENCE · CANVAS CREATION · FINAL STEP · MULTI-PAGE OPTION

#### JS / TS (1)

##### `web-artifacts-builder` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | JS / TS | 29/100 |

> Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state manag

**File sections:** Design & Style Guidelines · Quick Start · Reference

#### AI / ML (7)

##### `theme-factory` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 26/100 |

> Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact t

**File sections:** Purpose · Usage Instructions · Themes Available · Theme Details · Application Process · Create your Own Theme

##### `internal-comms` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 19/100 |

> A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal com

**File sections:** When to use this skill · How to use this skill · Keywords

##### `brand-guidelines` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | AI / ML | 18/100 |

> Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting

**File sections:** Overview · Brand Guidelines · Features · Technical Details

#### Frontend (2)

##### `frontend-design` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Frontend | 18/100 |

> Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples inclu

**File sections:** Design Thinking · Frontend Aesthetics Guidelines

##### `frontend-design` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| official | [anthropics/claude-code](https://github.com/anthropics/claude-code) | ⭐ 127k | Frontend | 18/100 |

> Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code

**File sections:** Design Thinking · Frontend Aesthetics Guidelines


---

### CURATED — 162 skills

#### AI / ML (40)

##### `slack-gif-creator` — ★★★★★ **92/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 96/100 |

> Toolkit for creating animated GIFs optimized for Slack, with validators for size constraints and composable animation primitives. This skill applies when users request animated GIFs or emoji animation

**File sections:** Slack's Requirements · Toolkit Structure · Core Validators · Animation Primitives · Helper Utilities · Optimization Strategies

#### API (2)

##### `api-design-reviewer` — ★★★★★ **91/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | API | 100/100 |

> Comprehensive REST API design review with automated linting, breaking-change detection, and design scorecards. Catches inconsistent conventions, missing versioning, and design smells before APIs ship.

**File sections:** Overview · Core Capabilities · REST Design Principles · Versioning Strategies · Pagination Patterns · Error Response Formats

#### Database (5)

##### `migration-architect` — ★★★★★ **91/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Database | 100/100 |

> Zero-downtime migration planning, compatibility validation, and rollback strategy generation. Tools for system, database, and infrastructure migrations with minimal business impact. Use when planning

**File sections:** Overview · Core Capabilities · Migration Patterns · Feature Flags for Migrations · Data Validation and Reconciliation · Rollback Strategies

##### `sql-database-assistant` — ★★★★☆ **90/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Database | 98/100 |

> Use when the user asks to write SQL queries, optimize database performance, generate migrations, explore database schemas, or work with ORMs like Prisma, Drizzle, TypeORM, or SQLAlchemy.

**File sections:** Overview · Natural Language to SQL · Schema Exploration · Query Optimization · Migration Generation · Multi-Database Support

#### JS / TS (4)

##### `secrets-vault-manager` — ★★★★☆ **90/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | JS / TS | 98/100 |

> Use when the user asks to set up secret management infrastructure, integrate HashiCorp Vault, configure cloud secret stores (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager), implement secret

**File sections:** Overview · HashiCorp Vault Patterns · Cloud Secret Store Integration · Secret Rotation Workflows · Dynamic Secrets · Audit Logging

#### AI / ML (40)

##### `senior-computer-vision` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 94/100 |

> Computer vision engineering skill for object detection, image segmentation, and visual AI systems. Covers CNN and Vision Transformer architectures, YOLO/Faster R-CNN/DETR detection, Mask R-CNN/SAM seg

**File sections:** Table of Contents · Quick Start · Core Expertise · Tech Stack · Workflow 1: Object Detection Pipeline · Workflow 2: Model Optimization and Deployment

#### Git (3)

##### `senior-pm` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Git | 96/100 |

> Senior Project Manager for enterprise software, SaaS, and digital transformation projects. Specializes in portfolio management, quantitative risk analysis, resource optimization, stakeholder alignment

**File sections:** Overview · Methodology & Frameworks · Assets & Templates · Implementation Workflows · Integration Strategies · Handoff Protocols

#### Other (29)

##### `release-manager` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 96/100 |

> Use when the user asks to plan releases, manage changelogs, coordinate deployments, create release branches, or automate versioning.

**File sections:** Overview · Core Capabilities · Key Components · Release Management Methodology · [Unreleased] · [1.2.0] - 2024-01-15

#### Rust (1)

##### `soc2-compliance` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Rust | 95/100 |

> Use when the user asks to prepare for SOC 2 audits, map Trust Service Criteria, build control matrices, collect audit evidence, perform gap analysis, or assess SOC 2 Type I vs Type II readiness.

**File sections:** Table of Contents · Overview · Trust Service Criteria · Control Matrix Generation · Gap Analysis Workflow · Evidence Collection

#### Security (22)

##### `pr-review-expert` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 95/100 |

> Use when the user asks to review pull requests, analyze code changes, check for security issues in PRs, or assess code quality of diffs.

**File sections:** Overview · Core Capabilities · When to Use · Fetching the Diff · Workflow · Ticket Linking Verification

#### AI / ML (40)

##### `agent-protocol` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 93/100 |

> Inter-agent communication protocol for C-suite agent teams. Defines invocation syntax, loop prevention, isolation rules, and response formats. Use when C-suite agents need to query each other, coordin

**File sections:** Keywords · Invocation Syntax · Response Format · Loop Prevention (Hard Rules) · Isolation Rules · When to Invoke vs When to Assume

##### `tailored-resume-generator` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 85/100 |

> Analyzes job descriptions and generates tailored resumes that highlight relevant experience, skills, and achievements to maximize interview chances

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Example · PROFESSIONAL SUMMARY · TECHNICAL SKILLS

#### Backend (2)

##### `senior-backend` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Backend | 92/100 |

> Designs and implements backend systems including REST APIs, microservices, database architectures, authentication flows, and security hardening. Use when the user asks to "design REST APIs", "optimize

**File sections:** Quick Start · Tools Overview · Backend Development Workflows · Reference Documentation · Common Patterns Quick Reference · Common Commands

#### Testing (9)

##### `incident-commander` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 93/100 |

> Comprehensive incident response framework from detection through resolution and post-incident review. Battle-tested SRE/DevOps practices: severity classification, timeline reconstruction, structured p

**File sections:** Overview · Key Features · Skills Included · Incident Response Framework · Quick Reference · Detection

#### Cloud (3)

##### `gcp-cloud-architect` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Cloud | 91/100 |

> Design GCP architectures for startups and enterprises. Use when asked to design Google Cloud infrastructure, deploy to GKE or Cloud Run, configure BigQuery pipelines, optimize GCP costs, or migrate to

**File sections:** Workflow · Tools · Quick Start · Input Requirements · Output Formats · Anti-Patterns

#### DevOps (3)

##### `azure-cloud-architect` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | DevOps | 91/100 |

> Design Azure architectures for startups and enterprises. Use when asked to design Azure infrastructure, create Bicep/ARM templates, optimize Azure costs, set up Azure DevOps pipelines, or migrate to A

**File sections:** Workflow · Tools · Quick Start · Input Requirements · Anti-Patterns · Output Formats

#### Go (5)

##### `marketing-strategy-pmm` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Go | 91/100 |

> Product marketing skill for positioning, GTM strategy, competitive intelligence, and product launches. Use when the user asks about product positioning, go-to-market planning, competitive analysis, ta

**File sections:** Table of Contents · ICP Definition Workflow · Positioning Development · Competitive Intelligence · Product Launch Planning · Sales Enablement

#### Other (29)

##### `contract-and-proposal-writer` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 91/100 |

> Generate professional, jurisdiction-aware business documents: freelance contracts, project proposals, SOWs, NDAs, and MSAs. Structured Markdown output with docx conversion instructions. Covers US (Del

**File sections:** Overview · Core Capabilities · Key Clauses Reference · When to Use · Workflow · Jurisdiction Notes

#### Security (22)

##### `ai-security` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 91/100 |

> Use when assessing AI/ML systems for prompt injection, jailbreak vulnerabilities, model inversion risk, data poisoning exposure, or agent tool abuse. Covers MITRE ATLAS technique mapping, injection si

**File sections:** Table of Contents · Overview · AI Threat Scanner Tool · Prompt Injection Detection · Jailbreak Assessment · Model Inversion Risk

##### `senior-security` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 90/100 |

> Security engineering toolkit for threat modeling, vulnerability analysis, secure architecture, and penetration testing. Includes STRIDE analysis, OWASP guidance, cryptography patterns, and security sc

**File sections:** Table of Contents · Threat Modeling Workflow · Security Architecture Workflow · Vulnerability Assessment Workflow · Secure Code Review Workflow · Incident Response Workflow

##### `incident-response` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 87/100 |

> Use when a security incident has been detected or declared and needs classification, triage, escalation path determination, and forensic evidence collection. Covers SEV1-SEV4 classification, false pos

**File sections:** Table of Contents · Overview · Incident Triage Tool · Incident Classification · Severity Framework · False Positive Filtering

#### Backend (2)

##### `senior-fullstack` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Backend | 86/100 |

> Fullstack development toolkit with project scaffolding for Next.js, FastAPI, MERN, and Django stacks, code quality analysis with security and complexity scoring, and stack selection guidance. Use when

**File sections:** Table of Contents · Trigger Phrases · Tools · Workflows · Reference Guides · Quick Reference

#### Cloud (3)

##### `aws-solution-architect` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Cloud | 86/100 |

> Design AWS architectures for startups using serverless patterns and IaC templates. Use when asked to design serverless architecture, create CloudFormation templates, optimize AWS costs, set up CI/CD p

**File sections:** Workflow · Tools · Quick Start · Input Requirements · Output Formats · Reference Documentation

#### Go (5)

##### `product-manager-toolkit` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Go | 84/100 |

> Comprehensive toolkit for product managers including RICE prioritization, customer interview analysis, PRD templates, discovery frameworks, and go-to-market strategies. Use for feature prioritization,

**File sections:** Table of Contents · Quick Start · Core Workflows · Tools Reference · Input/Output Examples · Integration Points

#### Security (22)

##### `cloud-security` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 86/100 |

> Use when assessing cloud infrastructure for security misconfigurations, IAM privilege escalation paths, S3 public exposure, open security group rules, or IaC security gaps. Covers AWS, Azure, and GCP

**File sections:** Table of Contents · Overview · Cloud Posture Check Tool · IAM Policy Analysis · S3 Exposure Assessment · Security Group Analysis

#### AI / ML (40)

##### `developer-growth-analysis` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 76/100 |

> Analyzes your recent Claude Code chat history to identify coding patterns, development gaps, and areas for improvement, curates relevant learning resources from HackerNews, and automatically sends a p

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Instructions · Example Usage · Work Summary

##### `domain-name-brainstormer` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 76/100 |

> Generates creative domain name ideas for your project and checks availability across multiple TLDs (.com, .io, .dev, .ai, etc.). Saves hours of brainstorming and manual checking.

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Example · Available (.com) · Available (Alternative TLDs)

#### JS / TS (4)

##### `meeting-insights-analyzer` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | JS / TS | 75/100 |

> Analyzes meeting transcripts and recordings to uncover behavioral patterns, communication insights, and actionable feedback. Identifies when you avoid conflict, use filler words, dominate conversation

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Instructions · Examples · Pattern: Hedging on Critical Feedback

#### Automation (2)

##### `jira-expert` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Automation | 80/100 |

> Atlassian Jira expert for creating and managing projects, planning, product discovery, JQL queries, workflows, custom fields, automation, reporting, and all Jira features. Use for Jira project setup,

**File sections:** Quick Start - Most Common Operations · Workflows · Advanced Features · JQL Functions Reference · Reporting Templates · Decision Framework

#### Database (5)

##### `senior-architect` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Database | 79/100 |

> This skill should be used when the user asks to "design system architecture", "evaluate microservices vs monolith", "create architecture diagrams", "analyze dependencies", "choose a database", "plan f

**File sections:** Table of Contents · Quick Start · Tools Overview · Decision Workflows · Reference Documentation · Tech Stack Coverage

#### Design (8)

##### `epic-design` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 81/100 |

> >

**File sections:** Before Starting · Your Mindset · How This Skill Works · Step 1 - Understand the Brief + Inspect All Assets · Step 2 - Choose Your Techniques (Decision Engine) · Step 3 - Layer Every Element

#### Marketing (13)

##### `copy-editing` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 81/100 |

> When the user wants to edit, review, or improve existing marketing copy. Also use when the user mentions 'edit this copy,' 'review my copy,' 'copy feedback,' 'proofread,' 'polish this,' 'make this bet

**File sections:** Core Philosophy · The Seven Sweeps Framework · Quick-Pass Editing Checks · Copy Editing Checklist · Common Copy Problems & Fixes · Working with Copy Sweeps

#### Other (29)

##### `twitter-algorithm-optimizer` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Other | 72/100 |

> Analyze and optimize tweets for maximum reach using Twitter's open-source algorithm insights. Rewrite and edit user tweets to improve engagement and visibility based on how the recommendation system r

**File sections:** When to Use This Skill · What This Skill Does · How It Works: Twitter's Algorithm Architecture · Optimization Strategies Based on Algorithm Insights · How to Optimize Your Tweets · Example Optimizations

#### Security (22)

##### `dependency-auditor` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 81/100 |

> Audit and manage dependencies across multi-language projects. Identifies vulnerabilities, license conflicts, transitive dependency risks, and safe-upgrade paths. Use when auditing third-party packages

**File sections:** Overview · Core Capabilities · Technical Architecture · Use Cases & Applications · Integration Patterns · Advanced Features

##### `security-pen-testing` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 79/100 |

> Use when the user asks to perform security audits, penetration testing, vulnerability scanning, OWASP Top 10 checks, or offensive security assessments. Covers static analysis, dependency scanning, sec

**File sections:** Table of Contents · Overview · OWASP Top 10 Systematic Audit · Static Analysis · Dependency Vulnerability Scanning · Secret Scanning

#### AI / ML (40)

##### `senior-ml-engineer` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 77/100 |

> ML engineering skill for productionizing models, building MLOps pipelines, and integrating LLMs. Covers model deployment, feature stores, drift monitoring, RAG systems, and cost optimization. Use when

**File sections:** Table of Contents · Model Deployment Workflow · MLOps Pipeline Setup · LLM Integration Workflow · RAG System Implementation · Model Monitoring

#### Other (29)

##### `command-guide` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 78/100 |

> >

**File sections:** Quick Decision Flowchart · 1. Built-in Slash Commands · 2. Agents Selection · 3. Skills Selection · 4. Scenario Decision Matrix · 5. Parallel Execution Strategy

#### Testing (9)

##### `ab-test-setup` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 78/100 |

> When the user wants to plan, design, or implement an A/B test or experiment. Also use when the user mentions "A/B test," "split test," "experiment," "test this change," "variant copy," "multivariate t

**File sections:** Initial Assessment · Core Principles · Hypothesis Framework · Test Types · Sample Size · Metrics Selection

#### AI / ML (40)

##### `adversarial-reviewer` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 74/100 |

> Adversarial code review that breaks the self-review monoculture. Use when you want a genuinely critical review of recent changes, before merging a PR, or when you suspect Claude is being too agreeable

**File sections:** Description · Features · Usage · Examples · Problem This Solves · Table of Contents

##### `marketing-demand-acquisition` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 76/100 |

> Creates demand generation campaigns, optimizes paid ad spend across LinkedIn, Google, and Meta, develops SEO strategies, and structures partnership programs for Series A+ startups scaling internationa

**File sections:** Table of Contents · Core KPIs · Demand Generation Framework · Paid Media Channels · SEO Strategy · Partnerships

#### DevOps (3)

##### `kubernetes-operator` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | DevOps | 75/100 |

> Use when building a Kubernetes Operator - custom controllers that reconcile CRD state. Triggers on "build an operator", "CRD design", "reconcile loop", "controller-runtime", "kubebuilder", "operator-s

**File sections:** When to use · When NOT to use · Core principle: an operator is a reconcile loop, not a script · Quick start · The 3 Python tools · Tooling landscape

#### JS / TS (4)

##### `env-secrets-manager` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | JS / TS | 74/100 |

> Manage environment-variable hygiene and secrets safety across local development and production. Practical auditing, drift awareness, rotation readiness. Use when auditing .env files for committed secr

**File sections:** Overview · Core Capabilities · When to Use · Quick Start · Recommended Workflow · Reference Docs

#### Marketing (13)

##### `competitor-alternatives` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 76/100 |

> When the user wants to create competitor comparison or alternative pages for SEO and sales enablement. Also use when the user mentions 'alternative page,' 'vs page,' 'competitor comparison,' 'comparis

**File sections:** Initial Assessment · Core Principles · Page Formats · Essential Sections · Content Architecture · Research Process

##### `social-content` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 74/100 |

> When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, TikTok, Facebook, or other platforms. Also use when the user mentions 'LinkedIn po

**File sections:** Before Creating Content · Platform Quick Reference · Content Pillars Framework · Hook Formulas · Content Repurposing System · Content Calendar Structure

#### AI / ML (40)

##### `ai-seo` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 73/100 |

> Optimize content to get cited by AI search engines - ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini, Copilot. Use when you want your content to appear in AI-generated answers, not just ranke

**File sections:** Before Starting · How This Skill Works · How AI Search Works (and Why It's Different) · The 3 Pillars of AI Citability · Mode 1: AI Visibility Audit · Mode 2: Content Optimization

#### DevOps (3)

##### `senior-devops` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | DevOps | 73/100 |

> Comprehensive DevOps skill for CI/CD, infrastructure automation, containerization, and cloud platforms (AWS, GCP, Azure). Includes pipeline setup, infrastructure as code, deployment automation, and mo

**File sections:** Quick Start · Core Capabilities · Resources · Development Workflow · Multi-Cloud Cross-References · Cloud-Agnostic IaC

#### Frontend (2)

##### `senior-qa` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Frontend | 73/100 |

> Generates unit tests, integration tests, and E2E tests for React/Next.js applications. Scans components to create Jest + React Testing Library test stubs, analyzes Istanbul/LCOV coverage reports to su

**File sections:** Quick Start · Tools Overview · QA Workflows · Reference Documentation · Common Patterns Quick Reference · Common Commands

#### Other (29)

##### `paywall-upgrade-cro` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 73/100 |

> When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. Also use when the user mentions "paywall," "upgrade screen," "upgrade modal," "upsell," "fe

**File sections:** Initial Assessment · Core Principles · Paywall Trigger Points · Paywall Screen Components · Specific Paywall Types · Timing and Frequency

#### Security (22)

##### `chaos-engineering` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 72/100 |

> Use when planning, running, or learning from chaos engineering experiments. Triggers on "chaos experiment", "fault injection", "gameday", "resilience test", "blast radius", "steady state", "abort crit

**File sections:** When to use · When NOT to use · Core principle: chaos without abort criteria is an outage · Quick start · The 3 Python tools · The 7 attack types (taxonomy)

#### AI / ML (40)

##### `cold-email` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 71/100 |

> When the user wants to write, improve, or build a sequence of B2B cold outreach emails to prospects who haven't asked to hear from them. Use when the user mentions 'cold email,' 'cold outreach,' 'pros

**File sections:** Before Starting · How This Skill Works · Core Writing Principles · Voice Calibration by Audience · Subject Lines: The Anti-Marketing Approach · Follow-Up Strategy

#### Database (5)

##### `connect` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Database | 64/100 |

> Connect Claude to any app. Send emails, create issues, post messages, update databases - take real actions across Gmail, Slack, GitHub, Notion, and 1000+ services.

**File sections:** When to Use This Skill · What Changes · Supported Apps · Setup · Examples · How It Works

#### Marketing (13)

##### `copywriting` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 71/100 |

> When the user wants to write, rewrite, or improve marketing copy for any page - including homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Also use when the user s

**File sections:** Before Writing · Copywriting Principles · Writing Style Rules · Best Practices · Page Structure Framework · CTA Copy Guidelines

#### Other (29)

##### `onboarding-cro` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 71/100 |

> When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. Also use when the user mentions "onboarding flow," "activation rate," "user activation,

**File sections:** Initial Assessment · Core Principles · Defining Activation · Onboarding Flow Design · Multi-Channel Onboarding · Handling Stalled Users

#### Security (22)

##### `feature-flags-architect` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 69/100 |

> Use when adding, retiring, or auditing feature flags. Triggers on "add a flag", "ship behind a flag", "rollout plan", "kill switch", "stale flags", "flag debt", "LaunchDarkly", "GrowthBook", "Statsig"

**File sections:** When to use · Core principle: flags are a lifecycle, not an `if` · Quick start · The 4 flag types (taxonomy) · The 3 Python tools · Provider chooser (5 + DIY)

##### `tech-stack-evaluator` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 70/100 |

> Technology stack evaluation and comparison with TCO analysis, security assessment, and ecosystem health scoring. Use when comparing frameworks, evaluating technology stacks, calculating total cost of

**File sections:** Table of Contents · Capabilities · Quick Start · Input Formats · Analysis Types · Scripts

#### Testing (9)

##### `browser-automation` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 69/100 |

> Use when the user asks to automate browser tasks, scrape websites, fill forms, capture screenshots, extract structured data from web pages, or build web automation workflows. NOT for testing - use pla

**File sections:** Overview · Core Competencies · Workflows · Tools Reference · Anti-Patterns · Cross-References

#### AI / ML (40)

##### `self-eval` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 67/100 |

> Honestly evaluate AI work quality using a two-axis scoring system. Use after completing a task, code review, or work session to get an unbiased assessment. Detects score inflation, forces devil's advo

**File sections:** Description · Features · Usage · Examples · Self-Evaluation · Self-Evaluation

#### Data (2)

##### `scrum-master` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Data | 67/100 |

> Advanced Scrum Master skill for data-driven agile team analysis and coaching. Use when the user asks about sprint planning, velocity tracking, retrospectives, standup facilitation, backlog grooming, s

**File sections:** Table of Contents · Analysis Tools & Usage · Input Requirements · Sprint Execution Workflows · Team Development Workflow · Key Metrics & Targets

#### AI / ML (40)

##### `aeo` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 65/100 |

> Answer Engine Optimization (AEO) skill - optimize content to be cited by AI language models (ChatGPT, Perplexity, Claude, Gemini, Mistral) as authoritative sources. Distinct from SEO - AEO optimizes f

**File sections:** Distinct From SEO · When To Use · When NOT To Use · Core Capabilities · Workflow · Configuration

##### `campaign-analytics` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 65/100 |

> Analyzes campaign performance with multi-touch attribution, funnel conversion analysis, and ROI calculation for marketing optimization. Use when analyzing marketing campaigns, ad performance, attribut

**File sections:** Input Requirements · Output Formats · Typical Analysis Workflow · How to Use · Scripts · Reference Guides

##### `chief-ai-officer-advisor` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 65/100 |

> Chief AI Officer advisory for startups: model build-vs-buy decisions (API vs fine-tune vs in-house), AI risk classification under EU AI Act + US state patchwork, AI cost economics (API-to-self-hosted

**File sections:** Keywords · Quick Start · Key Questions (ask these first) · Core Responsibilities · Workflows · Output Standards

##### `mcp-builder` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 59/100 |

> Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate externa

**File sections:** Overview · ?? High-Level Workflow · ?? Documentation Library

##### `rag-architect` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 66/100 |

> Use when the user asks to design RAG pipelines, optimize retrieval strategies, choose embedding models, implement vector search, or build knowledge retrieval systems.

**File sections:** Overview · Core Competencies · Implementation Best Practices · Common Pitfalls & Solutions · Conclusion

#### Automation (2)

##### `focused-fix` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Automation | 65/100 |

> Use when the user asks to fix, debug, or make a specific feature/module/area work end-to-end. Triggers: 'make X work', 'fix the Y feature', 'the Z module is broken', 'focus on [area]'. Not for quick s

**File sections:** When to Use · The Iron Law · Protocol - STRICTLY follow these 5 phases IN ORDER · Red Flags - STOP and Return to Current Phase · Common Rationalizations · Anti-Patterns - NEVER do these

#### Cloud (3)

##### `ms365-tenant-manager` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Cloud | 66/100 |

> Microsoft 365 tenant administration for Global Administrators. Automate M365 tenant setup, Office 365 admin tasks, Azure AD user management, Exchange Online configuration, Teams administration, and se

**File sections:** Quick Start · Workflows · Best Practices · Reference Guides · Limitations

#### Design (8)

##### `churn-prevention` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 65/100 |

> Reduce voluntary and involuntary churn through cancel flow design, save offers, exit surveys, and dunning sequences. Use when designing or optimizing a cancel flow, building save offers, setting up du

**File sections:** Before Starting · How This Skill Works · Cancel Flow Design · Exit Survey Design · Save Offer Playbook · Involuntary Churn: Dunning Setup

#### Marketing (13)

##### `atlassian-templates` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 64/100 |

> Atlassian Template and Files Creator/Modifier expert for creating, modifying, and managing Jira and Confluence templates, blueprints, custom layouts, reusable components, and standardized content stru

**File sections:** Workflows · Confluence Templates Library · Jira Templates Library · Macro Usage Guidelines · Atlassian MCP Integration · Best Practices & Governance

##### `social-media-manager` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 66/100 |

> When the user wants to develop social media strategy, plan content calendars, manage community engagement, or grow their social presence across platforms. Also use when the user mentions 'social media

**File sections:** Before Starting · How This Skill Works · Platform Selection · Content Pillar Framework · Content Calendar Design · Community Engagement

#### Other (29)

##### `meeting-analyzer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 66/100 |

> Analyzes meeting transcripts and recordings to surface behavioral patterns, communication anti-patterns, and actionable coaching feedback. Use this skill whenever the user uploads or points to meeting

**File sections:** Core Workflow · Top 3 Findings · Detailed Analysis · Strengths · Growth Opportunities · Comparison to Previous Period

#### Security (22)

##### `isms-audit-expert` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 65/100 |

> Information Security Management System (ISMS) audit expert for ISO 27001 compliance verification, security control assessment, and certification support. Use when the user mentions ISO 27001, ISMS aud

**File sections:** Table of Contents · Audit Program Management · Audit Execution · Control Assessment · Finding Management · Certification Support

#### Testing (9)

##### `scenario-war-room` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 65/100 |

> Cross-functional what-if modeling for cascading multi-variable scenarios. Unlike single-assumption stress testing, this models compound adversity across all business functions simultaneously. Use when

**File sections:** Keywords · Quick Start · What This Is Not · Framework: 6-Step Cascade Model · Output Format · Rules for Good War Room Sessions

#### Go (5)

##### `revenue-operations` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Go | 63/100 |

> Analyzes sales pipeline health, revenue forecasting accuracy, and go-to-market efficiency metrics for SaaS revenue optimization. Use when analyzing sales pipeline coverage, forecasting revenue, evalua

**File sections:** Quick Start · Tools Overview · Revenue Operations Workflows · Reference Documentation · Templates

#### Marketing (13)

##### `x-twitter-growth` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 62/100 |

> X/Twitter growth engine for building audience, crafting viral content, and analyzing engagement. Use when the user wants to grow on X/Twitter, write tweets or threads, analyze their X profile, researc

**File sections:** When to Use This vs Other Skills · Step 1 - Profile Audit · Step 2 - Competitive Intelligence · Step 3 - Content Creation · Step 4 - Algorithm Mechanics · Step 5 - Growth Playbook

#### Other (29)

##### `lead-research-assistant` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Other | 56/100 |

> Identifies high-quality leads for your product or service by analyzing your business, searching for target companies, and providing actionable contact strategies. Perfect for sales, business developme

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Instructions · Examples · Tips for Best Results

#### Testing (9)

##### `raffle-winner-picker` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Testing | 56/100 |

> Picks random winners from lists, spreadsheets, or Google Sheets for giveaways, raffles, and contests. Ensures fair, unbiased selection with transparency.

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Example · Features · Example Workflows

#### Design (8)

##### `cpo-advisor` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 60/100 |

> Product leadership for scaling companies. Product vision, portfolio strategy, product-market fit, and product org design. Use when setting product vision, managing a product portfolio, measuring PMF,

**File sections:** Keywords · Quick Start · The CPO's Core Responsibilities · Diagnostic Questions · Product Metrics Hierarchy · Investment Postures

#### Other (29)

##### `capacity-planner` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 60/100 |

> Use when an ops leader (Director of CX, Head of Support, VP Ops, Head of BizOps, Head of IT ops, Head of Finance ops) is sizing ops capacity, building a headcount plan, modeling utilization risk, plan

**File sections:** Purpose · When to use · Workflow · Scripts · References · Assets

##### `change-management` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 60/100 |

> Framework for rolling out organizational changes without chaos. Covers the ADKAR model adapted for startups, communication templates, resistance patterns, and change fatigue management. Handles proces

**File sections:** Keywords · Core Model: ADKAR Adapted for Startups · Change Types and ADKAR Application · Resistance Patterns · Change Fatigue · Key Questions for Change Management

##### `customer-success-manager` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 59/100 |

> Monitors customer health, predicts churn risk, and identifies expansion opportunities using weighted scoring models for SaaS customer success. Use when analyzing customer accounts, reviewing retention

**File sections:** Table of Contents · Input Requirements · Output Formats · How to Use · Scripts · Reference Guides

##### `popup-cro` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 61/100 |

> When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. Also use when the user mentions "exit intent," "popup conversions," "modal optimizati

**File sections:** Initial Assessment · Core Principles · Output Format · Common Popup Strategies · Experiment Ideas · Task-Specific Questions

#### Python (4)

##### `performance-profiler` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Python | 61/100 |

> Systematic performance profiling for Node.js, Python, and Go applications. Identifies CPU, memory, and I/O bottlenecks, generates flamegraphs, analyzes bundle sizes, optimizes database queries, runs l

**File sections:** Overview · Core Capabilities · When to Use · Quick Start · Golden Rule: Measure First · Node.js Profiling

#### Security (22)

##### `atlassian-admin` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 60/100 |

> Atlassian Administrator for managing and organizing Atlassian products (Jira, Confluence, Bitbucket, Trello), users, permissions, security, integrations, system configuration, and org-wide governance.

**File sections:** Workflows · Global Configuration · Governance & Policies · Disaster Recovery · Metrics & Reporting · Decision Framework & Handoff Protocols

#### Git (3)

##### `git-worktree-manager` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Git | 57/100 |

> Run parallel feature work safely with Git worktrees. Standardizes branch isolation, port allocation, environment sync, and cleanup so each worktree behaves like an independent local app. Optimized for

**File sections:** Overview · Core Capabilities · When to Use · Key Workflows · Script Interfaces · Common Pitfalls

#### Marketing (13)

##### `marketing-ideas` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 57/100 |

> When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use when the user asks for 'marketing ideas,' 'growth ideas,' 'how to market,' 'marketing strat

**File sections:** How to Use This Skill · Ideas by Category (Quick Reference) · Implementation Tips · Top Ideas by Use Case · Output Format · Task-Specific Questions

#### Security (22)

##### `fda-qsr-audit-prep` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 57/100 |

> /cs:fda-qsr-audit-prep <scope> - FDA 21 CFR 820 (QSR / QMSR) audit 6-question forcing interrogation. Post-Feb 2026 substantially harmonized with ISO 13485. Use before annual internal QSR audit, pre-FD

**File sections:** When to Run · The Six QSR Questions · Workflow · Output Format · The Decision Being Made · Complaint + MDR Posture

##### `gdpr-audit-prep` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 57/100 |

> /cs:gdpr-audit-prep <scope> - GDPR audit 6-question Article-cited forcing interrogation. Use before annual internal GDPR review, post-breach internal audit, DPA investigation readiness, or acquisition

**File sections:** When to Run · The Six DPO Questions · Workflow · Output Format · The Decision Being Made · Article 30 RoPA Status

##### `iso13485-audit-prep` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 57/100 |

> /cs:iso13485-audit-prep <scope> - ISO 13485 QMS audit 6-question forcing interrogation. Design controls + CAPA + post-market focused. Use before Clause 8.2.4 internal audit, MDR / FDA QSR alignment re

**File sections:** When to Run · The Six QMS Questions · Workflow · Output Format · The Decision Being Made · Design Control Status (sampled DHFs)

##### `schema-markup` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 58/100 |

> When the user wants to implement, audit, or validate structured data (schema markup) on their website. Use when the user mentions 'structured data,' 'schema.org,' 'JSON-LD,' 'rich results,' 'rich snip

**File sections:** Before Starting · How This Skill Works · Schema Type Selection · Implementation Patterns · Common Mistakes · Schema and AI Search

#### Testing (9)

##### `api-test-suite-builder` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 58/100 |

> Use when the user asks to generate API tests, create integration test suites, test REST endpoints, or build contract tests.

**File sections:** Overview · Core Capabilities · When to Use · Route Detection · Test Generation Patterns · Example Test Files

#### AI / ML (40)

##### `agent-designer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 56/100 |

> Use when the user asks to design multi-agent systems, create agent architectures, define agent communication patterns, or build autonomous agent workflows.

**File sections:** Overview · Core Capabilities · Implementation Guidelines

#### Other (29)

##### `chief-of-staff` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 55/100 |

> C-suite orchestration layer. Routes founder questions to the right advisor role(s), triggers multi-role board meetings for complex decisions, synthesizes outputs, and tracks decisions. Every C-suite i

**File sections:** Keywords · Session Protocol (Every Interaction) · Invocation Syntax · Decision Complexity Scoring · Routing Matrix (Summary) · Board Meeting Protocol

##### `saas-metrics-coach` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 55/100 |

> SaaS financial health advisor. Use when a user shares revenue or customer numbers, or mentions ARR, MRR, churn, LTV, CAC, NRR, or asks how their SaaS business is doing.

**File sections:** Step 1 - Collect Inputs · Step 2 - Calculate Metrics · Step 3 - Benchmark Each Metric · Step 4 - Prioritize and Recommend · Step 5 - Output Format · Metrics at a Glance

##### `strategic-alignment` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 54/100 |

> Cascades strategy from boardroom to individual contributor. Detects and fixes misalignment between company goals and team execution. Covers strategy articulation, cascade mapping, orphan goal detectio

**File sections:** Keywords · Quick Start · Core Framework · Alignment Score · Key Questions for Alignment · Red Flags

#### Security (22)

##### `changelog-generator` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 55/100 |

> Produce consistent, auditable release notes from Conventional Commits. Separates commit parsing, semantic-bump logic, and changelog rendering for automated releases with editorial control. Use when cu

**File sections:** Overview · Core Capabilities · When to Use · Key Workflows · Conventional Commit Rules · Script Interfaces

##### `iso27001-audit-prep` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 55/100 |

> /cs:iso27001-audit-prep <scope> - ISO 27001 ISMS audit readiness 6-question forcing interrogation. Use before annual Clause 9.2 internal audit, surveillance audit prep, or stage 1 certification readin

**File sections:** When to Run · The Six ISMS Questions · Workflow · Output Format · The Decision Being Made · Audit Programme Status

##### `soc2-audit-prep` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 56/100 |

> /cs:soc2-audit-prep <scope> - SOC 2 Type II readiness 6-question forcing interrogation. Observation-period focused. Use before Type II observation begins, mid-period checkpoint, or pre-field-test mont

**File sections:** When to Run · The Six SOC 2 Type II Questions · Workflow · Output Format · The Decision Being Made · TSC Scope

#### AI / ML (40)

##### `marketing-ops` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 52/100 |

> Central router for the marketing skill ecosystem. Use when unsure which marketing skill to use, when orchestrating a multi-skill campaign, or when coordinating across content, SEO, CRO, channels, and

**File sections:** Before Starting · How This Skill Works · Routing Matrix · Campaign Orchestration · Quality Gate · Proactive Triggers

#### Other (29)

##### `general-counsel-advisor` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 52/100 |

> General Counsel advisory for startups: contract review (MSA, SaaS, NDA, DPA, employment), IP strategy, term sheet decoding, and regulatory landscape mapping. Use when reviewing any contract or term sh

**File sections:** Keywords · Quick Start · Key Questions (ask these first) · Core Responsibilities · Workflows · Output Standard (when invoked via `/cs:gc-review`)

##### `partnerships-architect` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 52/100 |

> Use when a startup is approached by a prospective partner and someone has to decide should we sign this partner, at what partner tier (referral / reseller / OEM / SI-consulting / strategic alliance),

**File sections:** Purpose · When to use · Workflow · Scripts · References · Assumptions

##### `youtube-downloader` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Other | 45/100 |

> Download YouTube videos with customizable quality and format options. Use this skill when the user asks to download, save, or grab YouTube videos. Supports various quality settings (best, 1080p, 720p,

**File sections:** Quick Start · Options · Complete Examples · How It Works · Important Notes

#### Python (4)

##### `mcp-server-builder` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Python | 52/100 |

> Design and ship production-ready MCP (Model Context Protocol) servers from OpenAPI contracts instead of hand-written tool wrappers. Python and TypeScript support, schema validation, safe evolution. Us

**File sections:** Overview · Core Capabilities · When to Use · Key Workflows · Script Interfaces · Common Pitfalls

#### Security (22)

##### `rfp-responder` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 53/100 |

> Use when an RFP, RFI, RFQ, security questionnaire, vendor questionnaire, or proposal request arrives and the team needs a structured response - parsing multi-section buyer-dictated requirements (MANDA

**File sections:** Purpose · When to use · Workflow · Scripts · References · Assumptions

#### AI / ML (40)

##### `ai-act-readiness` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 50/100 |

> /cs:ai-act-readiness <system> - EU AI Act 6-question forcing interrogation. Use during AI-system intake, before EU deployment, or during annual compliance refresh as Article 113 obligations phase in (

**File sections:** When to Run · The Six EU AI Act Questions · Workflow · Output Format · The Decision Being Made · Risk Classification

##### `full-page-screenshot` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 51/100 |

> Use when the user asks to capture a full-page screenshot, long screenshot, or complete page capture of a web page. Handles SPA scroll containers, lazy-loaded images, and very tall pages via Chrome Dev

**File sections:** Prerequisites · Workflow · Core Capabilities · How It Works · Anti-Patterns · Troubleshooting

##### `internal-narrative` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 51/100 |

> Build and maintain one coherent company story across all audiences - employees, investors, customers, candidates, and partners. Detects narrative contradictions and ensures the same truth is framed fo

**File sections:** Keywords · Core Principle · Framework · Narrative Consistency Checklist · Key Questions for Narrative · Red Flags

##### `marketing-context` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 51/100 |

> Create and maintain the marketing context document that all marketing skills read before starting. Use when the user mentions 'marketing context,' 'brand voice,' 'set up context,' 'target audience,' '

**File sections:** How This Skill Works · Sections to Capture · Output Template · Tips · Proactive Triggers · Output Artifacts

#### Design (8)

##### `commercial-skills` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 51/100 |

> Use when reviewing, approving, or designing commercial motion - pricing models, deal review, discount approval, partnership economics, channel mix, commercial policy, RFP/RFI response, bookings foreca

**File sections:** When to invoke · Routing logic (deterministic) · Workflow (Matt Pocock grill discipline) · Forcing-question library (grill-with-docs pattern) · Assumptions · Non-goals

#### Docs (3)

##### `business-operations-skills` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Docs | 51/100 |

> Use when running, diagnosing, or designing internal business operations - process documentation, vendor SLAs, capacity planning, internal comms, SOP/runbook authoring, procurement spend. Triggers on "

**File sections:** When to invoke · Routing logic (deterministic) · Workflow (Matt Pocock grill discipline) · Forcing-question library (grill-with-docs pattern) · Assumptions · Non-goals

#### Git (3)

##### `changelog-generator` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Git | 42/100 |

> Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes. Turns h

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Example · ? New Features · ?? Improvements

#### Other (29)

##### `ceo-advisor` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 49/100 |

> Executive leadership guidance for strategic decision-making, organizational development, and stakeholder management. Use when planning strategy, preparing board presentations, managing investors, deve

**File sections:** Keywords · Quick Start · Core Responsibilities · Key Questions a CEO Asks · CEO Metrics Dashboard · Red Flags

##### `financial-analyst` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 50/100 |

> Performs financial ratio analysis, DCF valuation, budget variance analysis, and rolling forecast construction for strategic decision-making. Use when analyzing financial statements, building valuation

**File sections:** Overview · 5-Phase Workflow · Tools · Knowledge Bases · Templates · Key Metrics & Targets

##### `org-health-diagnostic` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 50/100 |

> Cross-functional organizational health check combining signals from all C-suite roles. Scores 8 dimensions on a traffic-light scale with drill-down recommendations. Use when assessing overall company

**File sections:** Keywords · Quick Start · The 8 Dimensions · Scoring & Traffic Lights · Dimension Interactions (Why One Problem Creates Another) · Dashboard Output Format

##### `ship-gate` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 50/100 |

> >

**File sections:** Intercept Behavior · How It Works · Categories · Scope · Integration Points

#### Security (22)

##### `compliance-readiness` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 49/100 |

> /cs:compliance-readiness <program> - Multi-framework compliance officer 6-question forcing interrogation of any compliance program. Use before starting a new framework, planning the annual audit calen

**File sections:** When to Run · The Six Compliance Officer Questions · Workflow · Output Format · The Decision Being Made · Framework Set

#### AI / ML (40)

##### `c-level-advisor` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 48/100 |

> 10 C-level advisory agent skills and plugins for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw. CEO, CTO, COO, CPO, CMO, CFO, CRO, CISO, CHRO, Executive Mentor. Multi-role board meetings, strategy

**File sections:** Quick Start · What's Included · Key Features · See Also

#### API (2)

##### `chro-advisor` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | API | 47/100 |

> People leadership for scaling companies. Hiring strategy, compensation design, org structure, culture, and retention. Use when building hiring plans, designing comp frameworks, restructuring teams, ma

**File sections:** Keywords · Quick Start · Core Responsibilities · Key Questions a CHRO Asks · People Metrics · Red Flags

#### Data (2)

##### `product-analytics` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Data | 47/100 |

> Use when defining product KPIs, building metric dashboards, running cohort or retention analysis, or interpreting feature adoption trends across product stages.

**File sections:** When To Use · Workflow · KPI Guidance By Stage · Dashboard Design Principles · Cohort Analysis Method · Retention Curve Interpretation

#### Security (22)

##### `aims-audit` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Security | 48/100 |

> /cs:aims-audit <scope> - ISO/IEC 42001 AIMS internal-audit 6-question forcing interrogation. Use before certification stage 1, before annual internal audit cycles, or when onboarding a new AI system i

**File sections:** When to Run · The Six AIMS Questions · Workflow · Output Format · The Decision Being Made · Gap Analysis (Clauses 4-10)

#### AI / ML (40)

##### `board-deck-builder` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 44/100 |

> Assembles comprehensive board and investor update decks by pulling perspectives from all C-suite roles. Use when preparing board meetings, investor updates, quarterly business reviews, or fundraising

**File sections:** Keywords · Quick Start · Deck Structure (Standard Order) · Narrative Framework · Delivering Bad News · Common Board Deck Mistakes

##### `ci-cd-pipeline-builder` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 45/100 |

> Generate pragmatic CI/CD pipelines from detected project stack signals - fast baseline generation, repeatable checks, environment-aware deployment stages. Use when setting up CI for a new project, ref

**File sections:** Overview · Core Capabilities · When to Use · Key Workflows · Script Interfaces · Common Pitfalls

##### `connect-apps` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 38/100 |

> Connect Claude to external apps like Gmail, Slack, GitHub. Use this skill when the user wants to send emails, create issues, post messages, or take actions in external services.

**File sections:** Quick Start · What You Can Do · Supported Apps · How It Works · Troubleshooting

#### Design (8)

##### `coo-advisor` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 46/100 |

> Operations leadership for scaling companies. Process design, OKR execution, operational cadence, and scaling playbooks. Use when designing operations, setting up OKRs, building processes, scaling team

**File sections:** Keywords · Quick Start · Core Responsibilities · Key Questions a COO Asks · Operational Metrics · Red Flags

##### `pricing-strategist` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 45/100 |

> Use when designing or revisiting product pricing - selecting a pricing model (subscription seat-based, usage-based, value-based, freemium, or hybrid), running Van Westendorp Price Sensitivity Meter an

**File sections:** Purpose · When to use · Workflow · Scripts · References · Assumptions

#### Docs (3)

##### `image-enhancer` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Docs | 39/100 |

> Improves the quality of images, especially screenshots, by enhancing resolution, sharpness, and clarity. Perfect for preparing images for presentations, documentation, or social media posts.

**File sections:** When to Use This Skill · What This Skill Does · How to Use · Example · Tips · Common Use Cases

#### Marketing (13)

##### `cmo-advisor` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 46/100 |

> Marketing leadership for scaling companies. Brand positioning, growth model design, marketing budget allocation, and marketing org design. Use when designing brand strategy, selecting growth models (P

**File sections:** Keywords · Quick Start · The Four CMO Questions · Core Responsibilities (Brief) · Key Diagnostic Questions · CMO Metrics Dashboard

#### Other (29)

##### `deal-desk` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 46/100 |

> Use when reviewing a specific inbound deal before close - when sales has asked for a discount that exceeds AE authority, when the customer has redlined the MSA, when per-deal economics (margin after d

**File sections:** Purpose · When to use · Workflow · Scripts · References · Assumptions

#### AI / ML (40)

##### `email-sequence` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 42/100 |

> When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email program. Also use when the user mentions "email sequence," "drip campaign," "nurtur

**File sections:** Initial Assessment · Core Principles · Output Format · Task-Specific Questions · Tool Integrations · Related Skills

##### `prompt-engineer-toolkit` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 43/100 |

> Analyzes and rewrites prompts for better AI output, creates reusable prompt templates for marketing use cases (ad copy, email campaigns, social media), and structures end-to-end AI content workflows.

**File sections:** Overview · Core Capabilities · Key Workflows · Script Interfaces · Pitfalls, Best Practices & Review Checklist · References

#### Other (29)

##### `competitive-intel` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 43/100 |

> Systematic competitor tracking that feeds CMO positioning, CRO battlecards, and CPO roadmap decisions. Use when analyzing competitors, building sales battlecards, tracking market moves, positioning ag

**File sections:** Keywords · Quick Start · Framework: 5-Layer Intelligence System · Win/Loss Analysis · The Balance: Intelligence Without Obsession · Distributing Intelligence

##### `culture-architect` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 42/100 |

> Build, measure, and evolve company culture as operational behavior - not wall posters. Covers mission/vision/values workshops, values-to-behaviors translation, culture code creation, culture health as

**File sections:** Keywords · Core Principle · Frameworks · Culture Integration with C-Suite · Key Questions a Culture Architect Asks · Red Flags

##### `internal-comms` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 43/100 |

> Use when a Head of People Ops, BizOps lead, or Internal Communications owner needs to draft and sequence an internal-only change-management communication - a re-org announcement, a tool rollout, a pol

**File sections:** Purpose · When to use · When NOT to use · Workflow · Scripts · References

#### Python (4)

##### `code-reviewer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Python | 43/100 |

> Code review automation for TypeScript, JavaScript, Python, Go, Swift, Kotlin. Analyzes PRs for complexity and risk, checks code quality for SOLID violations and code smells, generates review reports.

**File sections:** Table of Contents · Tools · Reference Guides · Languages Supported

#### AI / ML (40)

##### `skill-share` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 32/100 |

> A skill that creates new Claude skills and automatically shares them on Slack using Rube for seamless team collaboration and skill discovery.

**File sections:** When to use this skill · Key Features · How It Works · Example Usage · Integration with Rube · Requirements

#### Design (8)

##### `canvas-design` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | Design | 34/100 |

> Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create ori

**File sections:** DESIGN PHILOSOPHY CREATION · DEDUCING THE SUBTLE REFERENCE · CANVAS CREATION · FINAL STEP · MULTI-PAGE OPTION

#### Frontend (2)

##### `engineering-skills` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Frontend | 39/100 |

> 23 engineering agent skills and plugins for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw, and 6 more tools. Architecture, frontend, backend, QA, DevOps, security, AI/ML, data engineering, Playwrig

**File sections:** Quick Start · Skills Overview · Python Tools · Rules

#### Marketing (13)

##### `competitive-teardown` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 41/100 |

> Analyzes competitor products and companies by synthesizing data from pricing pages, app store reviews, job postings, SEO signals, and social media into structured competitive intelligence. Produces fe

**File sections:** When to Use · Teardown Workflow · Data Collection Guide · Scoring Rubric (12 Dimensions, 1-5) · Templates · Related Skills

##### `marketing-psychology` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 40/100 |

> When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use when the user mentions 'psychology,' 'mental models,' 'cognitive bias,' 'persuasion,'

**File sections:** Before Starting · How This Skill Works · The 70+ Mental Models · Quick Reference · Task-Specific Questions · Proactive Triggers

#### Other (29)

##### `tech-debt-tracker` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 40/100 |

> Scan codebases for technical debt, score severity, track trends, and generate prioritized remediation plans. Use when users mention tech debt, code quality, refactoring priority, debt scoring, cleanup

**File sections:** Overview · What This Skill Provides · Technical Debt Classification Framework · Implementation Roadmap · Success Criteria · Common Pitfalls and How to Avoid Them

#### Testing (9)

##### `experiment-designer` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 39/100 |

> Use when planning product experiments, writing testable hypotheses, estimating sample size, prioritizing tests, or interpreting A/B outcomes with practical statistical rigor.

**File sections:** When To Use · Core Workflow · Hypothesis Quality Checklist · Common Experiment Pitfalls · Statistical Interpretation Guardrails · Tooling

#### AI / ML (40)

##### `cs-onboard` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 37/100 |

> Founder onboarding interview that captures company context across 7 dimensions. Invoke with /cs:setup for initial interview or /cs:update for quarterly refresh. Generates ~/.claude/company-context.md

**File sections:** Commands · Keywords · Conversation Principles · 7 Interview Dimensions · Output: company-context.md · /cs:update - Quarterly Refresh

#### Docs (3)

##### `codebase-onboarding` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Docs | 38/100 |

> Analyze a codebase and generate onboarding documentation for engineers, tech leads, and contractors. Fast fact-gathering and repeatable onboarding outputs. Use when onboarding a new engineer, writing

**File sections:** Overview · Core Capabilities · When to Use · Quick Start · Recommended Workflow · Onboarding Document Template

#### AI / ML (40)

##### `context-engine` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 34/100 |

> Loads and manages company context for all C-suite advisor skills. Reads ~/.claude/company-context.md, detects stale context (>90 days), enriches context during conversations, and enforces privacy/anon

**File sections:** Keywords · Load Protocol (Run at Start of Every C-Suite Session) · Context Quality Signals · Context Enrichment · Privacy Rules · Missing or Partial Context

##### `roadmap-communicator` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 34/100 |

> Use when preparing roadmap narratives, release notes, changelogs, or stakeholder updates tailored for executives, engineering teams, and customers.

**File sections:** When To Use · Roadmap Formats · Stakeholder Update Patterns · Release Notes Guidance · Changelog Generation · Feature Announcement Framework

#### JS / TS (4)

##### `artifacts-builder` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | JS / TS | 29/100 |

> Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state manag

**File sections:** Design & Style Guidelines · Quick Start · Reference

#### Marketing (13)

##### `content-strategy` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 34/100 |

> When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use when the user mentions \"content strategy,\" \"what should I write about,\"

**File sections:** Before Planning · Searchable vs Shareable · Output Format · Task-Specific Questions · Proactive Triggers · Output Artifacts

#### Testing (9)

##### `product-discovery` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 36/100 |

> Use when validating product opportunities, mapping assumptions, planning discovery sprints, or testing problem-solution fit before committing delivery resources.

**File sections:** When To Use · Core Discovery Workflow · Opportunity Solution Tree (Teresa Torres) · Assumption Mapping · Problem Validation Techniques · Solution Validation Techniques

#### AI / ML (40)

##### `theme-factory` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 26/100 |

> Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact t

**File sections:** Purpose · Usage Instructions · Themes Available · Theme Details · Application Process · Create your Own Theme

#### Testing (9)

##### `monorepo-navigator` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Testing | 33/100 |

> Navigate, manage, and optimize monorepos. Covers Turborepo, Nx, pnpm workspaces, and Lerna. Cross-package impact analysis, selective builds/tests on affected packages, remote caching, dependency graph

**File sections:** Overview · Core Capabilities · When to Use · Tool Selection · Turborepo · Workspace Analyzer

#### AI / ML (40)

##### `runbook-generator` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 31/100 |

> Generate operational runbooks from a service name - deployment, incident response, maintenance, and rollback workflows. Templated structure customizable per environment. Use when documenting on-call p

**File sections:** Overview · Core Capabilities · When to Use · Quick Start · Recommended Workflow · Reference Docs

#### Other (29)

##### `ma-playbook` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 30/100 |

> M&A strategy for acquiring companies or being acquired. Due diligence, valuation, integration, and deal structure. Use when evaluating acquisitions, preparing for acquisition, M&A due diligence, integ

**File sections:** Keywords · Quick Start · When You're Acquiring · When You're Being Acquired · Red Flags (Both Sides) · Integration with C-Suite Roles

#### AI / ML (40)

##### `agent-workflow-designer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 27/100 |

> Design production-grade multi-agent workflows with clear pattern choice (sequential, parallel, hierarchical), handoff contracts, failure handling, and cost/context controls. Use when architecting a mu

**File sections:** Overview · Core Capabilities · When to Use · Quick Start · Pattern Map · Recommended Workflow

##### `brand-guidelines` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 18/100 |

> Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting

**File sections:** Overview · Brand Guidelines · Features · Technical Details

##### `internal-comms` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 19/100 |

> A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal com

**File sections:** When to use this skill · How to use this skill · Keywords

#### Go (5)

##### `intl-expansion` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Go | 25/100 |

> International market expansion strategy. Market selection, entry modes, localization, regulatory compliance, and go-to-market by region. Use when expanding to new countries, evaluating international m

**File sections:** Keywords · Quick Start · Market Selection Framework · Localization Checklist · Key Questions · Common Mistakes

##### `launch-strategy` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Go | 24/100 |

> When the user wants to plan a product launch, feature announcement, or release strategy. Also use when the user mentions 'launch,' 'Product Hunt,' 'feature release,' 'announcement,' 'go-to-market,' 'b

**File sections:** Before Starting · Core Philosophy · Task-Specific Questions · Proactive Triggers · Output Artifacts · Communication

#### Other (29)

##### `team-communications` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Other | 25/100 |

> Write internal company communications - 3P updates (Progress/Plans/Problems), company-wide newsletters, FAQ roundups, incident reports, leadership updates, status reports, project updates, and general

**File sections:** Routing · Workflow · Tone & Style (applies to all types) · When tools are unavailable · Anti-Patterns · Related Skills

#### AI / ML (40)

##### `business-growth-skills` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | AI / ML | 23/100 |

> 4 business growth agent skills and plugins for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw. Customer success (health scoring, churn), sales engineer (RFP), revenue operations (pipeline, GTM), con

**File sections:** Quick Start · Skills Overview · Python Tools · Rules

#### Design (8)

##### `interview-system-designer` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Design | 23/100 |

> This skill should be used when the user asks to "design interview processes", "create hiring pipelines", "calibrate interview loops", "generate interview questions", "design competency matrices", "ana

**File sections:** Overview · Core Capabilities · Quick Start · Recommended Workflow · References · Common Pitfalls

#### Marketing (13)

##### `content-creator` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Marketing | 23/100 |

> Deprecated redirect skill that routes legacy 'content creator' requests to the correct specialist. Use when a user invokes 'content creator', asks to write a blog post, article, guide, or brand voice

**File sections:** Why the Change · Proactive Triggers · Output Artifacts · Communication · Related Skills

#### Python (4)

##### `finance-skills` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Python | 23/100 |

> Financial analyst agent skill and plugin for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw. Ratio analysis, DCF valuation, budget variance, rolling forecasts. 4 Python tools (stdlib-only).

**File sections:** Quick Start · Skills Overview · Python Tools · Rules

#### Database (5)

##### `engineering-advanced-skills` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | ⭐ 16k | Database | 21/100 |

> 25 advanced engineering agent skills and plugins for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw. Agent design, RAG, MCP servers, CI/CD, database design, observability, security auditing, release

**File sections:** Quick Start · Skills Overview · Rules

#### AI / ML (40)

##### `template-skill` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ⭐ 62k | AI / ML | 1/100 |

> Replace with description of the skill and when Claude should use it.

**File sections:** —


---

### COMMUNITY — 1431 skills

#### AI / ML (287)

##### `ai-product` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Every product will be AI-powered. The question is whether you'll

**File sections:** Principles · Patterns · Sharp Edges · RAG with source verification: · Show uncertainty: · Domain-specific validation:

##### `ai-wrapper-product` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Expert in building products that wrap AI APIs (OpenAI, Anthropic,

**File sections:** Capabilities · Patterns · AI Product Architecture · Prompt Engineering for Products · AI Cost Management · AI Product Differentiation

##### `computer-use-agents` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Build AI agents that interact with computers like humans do -

**File sections:** Patterns · Sharp Edges · Defense in depth - no single solution works · Add human-like variance to actions · Rotate user agents and fingerprints · Use keyboard alternatives when possible

##### `cred-omega` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> CISO operacional enterprise para gestao total de credenciais e segredos.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Fase 0 — Reconhecimento (Mapear Ambiente) · Fase 1 — Descoberta (Varredura Profunda)

##### `email-systems` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Email has the highest ROI of any marketing channel. $36 for every

**File sections:** Principles · Patterns · Sharp Edges · SPF (Sender Policy Framework) · DKIM (DomainKeys Identified Mail) · DMARC (Domain-based Message Authentication)

##### `hugging-face-model-trainer` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Train or fine-tune TRL language models on Hugging Face Jobs, including SFT, DPO, GRPO, and GGUF export.

**File sections:** Overview · When to Use This Skill · Key Directives · Local Script Execution · Prerequisites Checklist · Asynchronous Job Guidelines

##### `hugging-face-vision-trainer` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Train or fine-tune vision models on Hugging Face Jobs for detection, classification, and SAM or SAM2 segmentation.

**File sections:** When to Use This Skill · Related Skills · Local Script Execution · Prerequisites Checklist · Dataset Validation · Automatic Bbox Preprocessing

##### `linear-claude-skill` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Manage Linear issues, projects, and teams

**File sections:** When to Use This Skill · ⚠️ Tool Availability (READ FIRST) · 🔐 Security: Varlock Integration · Quick Start (First-Time Users) · Project Planning Workflow · Project Management Commands

##### `n8n-node-configuration` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Operation-aware node configuration guidance. Use when configuring nodes, understanding property dependencies, determining required fields, choosing between get_node detail levels, or learning common c

**File sections:** When to Use · Configuration Philosophy · Core Concepts · Configuration Workflow · get_node Detail Levels · Property Dependencies Deep Dive

##### `skill-developer` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Comprehensive guide for creating and managing skills in Claude Code with auto-activation system, following Anthropic's official best practices including the 500-line rule and progressive disclosure pa

**File sections:** Purpose · When to Use This Skill · System Overview · Skill Types · Quick Start: Creating a New Skill · Purpose

##### `varlock` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 100/100 |

> Secure-by-default environment variable management for Claude Code sessions.

**File sections:** When to Use · Core Principle: Secrets Never Exposed · CRITICAL: Security Rules for Claude · Quick Start · Schema File: .env.schema · Safe Commands for Claude

#### API (32)

##### `moodle-external-api-development` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 100/100 |

> This skill guides you through creating custom external web service APIs for Moodle LMS, following Moodle's external API framework and coding standards.

**File sections:** When to Use This Skill · Core Architecture Pattern · Step-by-Step Implementation · Advanced Patterns · Testing Your API · Common Pitfalls & Solutions

#### Automation (73)

##### `evolution` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 100/100 |

> This skill enables makepad-skills to self-improve continuously during development.

**File sections:** When to Use · Quick Navigation · Hooks-Based Auto-Triggering · Skill Routing and Bundling · When to Evolve · Evolution Process

##### `n8n-mcp-tools-expert` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 100/100 |

> Expert guide for using n8n-mcp MCP tools effectively. Use when searching for nodes, validating configurations, accessing templates, managing workflows, or using any n8n-mcp tool. Provides tool selecti

**File sections:** When to Use · Tool Categories · Quick Reference · Tool Selection Guide · Critical: nodeType Formats · Common Mistakes

##### `n8n-validation-expert` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 100/100 |

> Expert guide for interpreting and fixing n8n validation errors.

**File sections:** When to Use · Validation Philosophy · Error Severity Levels · The Validation Loop · Validation Profiles · Common Error Types

##### `n8n-workflow-patterns` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 100/100 |

> Proven architectural patterns for building n8n workflows.

**File sections:** When to Use · The 5 Core Patterns · Pattern Selection Guide · Common Workflow Components · Workflow Creation Checklist · Data Flow Patterns

##### `notion-template-business` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 100/100 |

> Expert in building and selling Notion templates as a business - not

**File sections:** Capabilities · Patterns · Template Design · Template Pricing · Sales Channels · Template Marketing

#### Backend (31)

##### `n8n-expression-syntax` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 100/100 |

> Validate n8n expression syntax and fix common errors. Use when writing n8n expressions, using {{}} syntax, accessing $json/$node variables, troubleshooting expression errors, or working with webhook d

**File sections:** When to Use · Expression Format · Core Variables · 🚨 CRITICAL: Webhook Data Structure · Common Patterns · When NOT to Use Expressions

##### `skill-rails-upgrade` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 100/100 |

> Analyze Rails apps and provide upgrade assessments

**File sections:** When to Use This Skill · Step 1: Verify Rails Application · Step 2: Get Current Rails Version · Step 3: Find Latest Rails Version · Step 4: Determine Upgrade Type · Step 5: Fetch Upgrade Guide

#### Cloud (49)

##### `aws-serverless` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 100/100 |

> Specialized skill for building production-ready serverless

**File sections:** Principles · Patterns · 1. Optimize Package Size · 2. Use SnapStart (Java/.NET) · 3. Right-size Memory · 4. Provisioned Concurrency (when needed)

##### `azure-functions` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 100/100 |

> Expert patterns for Azure Functions development including isolated

**File sections:** Patterns · Sharp Edges · Use async pattern with Durable Functions · Use queue-based async pattern · Use webhook callback pattern · Use IHttpClientFactory (Recommended)

##### `gcp-cloud-run` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 100/100 |

> Specialized skill for building production-ready serverless

**File sections:** Principles · Patterns · 1. Enable Startup CPU Boost · 2. Set Minimum Instances · 3. Optimize Container Image · 4. Lazy Initialize Heavy Dependencies

##### `loki-mode` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 100/100 |

> Version 2.35.0 | PRD to Production | Zero Human Intervention > Research-enhanced: OpenAI SDK, DeepMind, Anthropic, AWS Bedrock, Agent SDK, HN Production (2025)

**File sections:** Quick Reference · Prerequisites · Core Autonomy Rules · RARV Cycle (Every Iteration) · Model Selection Strategy · Tool Orchestration & Efficiency

##### `skill-creator-ms` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 100/100 |

> Guide for creating effective skills for AI coding agents working with Azure SDKs and Microsoft Foundry services. Use when creating new skills or updating existing skills.

**File sections:** About Skills · Core Principles · Before Implementation · Skill Structure · Creating Azure SDK Skills · Installation

#### DevOps (20)

##### `github-workflow-automation` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 100/100 |

> Patterns for automating GitHub workflows with AI assistance, inspired by [Gemini CLI](https://github.com/google-gemini/gemini-cli) and modern DevOps practices.

**File sections:** When to Use This Skill · 1. Automated PR Review · 📋 Summary · ✅ What looks good · ⚠️ Potential Issues · 💡 Suggestions

##### `terraform-skill` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 100/100 |

> Terraform infrastructure as code best practices

**File sections:** When to Use This Skill · Core Principles · Testing Strategy Framework · Code Structure Standards · Count vs For_Each: When to Use Each · Locals for Dependency Management

#### Docs (16)

##### `readme` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 100/100 |

> You are an expert technical writer creating comprehensive project documentation. Your goal is to write a README.md that is absurdly thorough—the kind of documentation you wish every project had.

**File sections:** When to Use This Skill · The Three Purposes of a README · Before Writing · README Structure · Key Features · Tech Stack

#### Frontend (81)

##### `angular` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 100/100 |

> Modern Angular (v20+) expert with deep knowledge of Signals, Standalone Components, Zoneless applications, SSR/Hydration, and reactive patterns.

**File sections:** When to Use This Skill · Do Not Use This Skill When · Instructions · Safety · Angular Version Timeline · 1. Signals: The New Reactive Primitive

##### `fp-react` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 100/100 |

> Practical patterns for using fp-ts with React - hooks, state, forms, data fetching. Works with React 18/19, Next.js 14/15.

**File sections:** Quick Reference · 1. State with Option (Maybe It's There, Maybe Not) · 2. Form Validation with Either · 3. Data Fetching with TaskEither · 4. RemoteData Pattern (The Right Way to Handle Async State) · 5. Referential Stability (Preventing Re-renders)

##### `radix-ui-design-system` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 100/100 |

> Build accessible design systems with Radix UI primitives. Headless component customization, theming strategies, and compound component patterns for production-grade UI libraries.

**File sections:** Overview · When to Use This Skill · Do not use this skill when · Core Principles · Getting Started · Theming Strategies

##### `shopify-apps` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 100/100 |

> Expert patterns for Shopify app development including Remix/React

**File sections:** Patterns · Sharp Edges · Respond immediately, process asynchronously · For simple operations, be quick · Monitor webhook performance · Check rate limit headers

#### Git (30)

##### `wellally-tech` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 100/100 |

> Integrate multiple digital health data sources, connect to [WellAlly.tech](https://www.wellally.tech/) knowledge base, providing data import and knowledge reference for personal health management syst

**File sections:** When to Use · Core Features · Usage Instructions · Output Format · Data Sources · WellAlly.tech Knowledge Base

#### Go (10)

##### `go-rod-master` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 100/100 |

> Comprehensive guide for browser automation and web scraping with go-rod (Chrome DevTools Protocol) including stealth anti-bot-detection patterns.

**File sections:** Overview · When to Use This Skill · Safety & Risk · Installation · Core Concepts · Stealth & Anti-Bot Detection (go-rod/stealth)

#### Java / Kotlin (52)

##### `azure-appconfiguration-java` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 100/100 |

> Azure App Configuration SDK for Java. Centralized application configuration management with key-value settings, feature flags, and snapshots.

**File sections:** Installation · Prerequisites · Environment Variables · Client Creation · Key Concepts · Configuration Setting Operations

##### `bun-development` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 100/100 |

> Fast, modern JavaScript/TypeScript development with the Bun runtime, inspired by [oven-sh/bun](https://github.com/oven-sh/bun).

**File sections:** When to Use This Skill · 1. Getting Started · 2. Project Setup · 3. Package Management · 4. Running Code · 5. Built-in APIs

##### `n8n-code-javascript` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 100/100 |

> Write JavaScript code in n8n Code nodes. Use when writing JavaScript in n8n, using $input/$json/$node syntax, making HTTP requests with $helpers, working with dates using DateTime, troubleshooting Cod

**File sections:** Quick Start · Mode Selection Guide · Data Access Patterns · Critical: Webhook Data Structure · Return Format Requirements · Common Patterns Overview

##### `transformers-js` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 100/100 |

> Run Hugging Face models in JavaScript or TypeScript with Transformers.js in Node.js or the browser.

**File sections:** When to Use This Skill · Installation · Core Concepts · Supported Tasks · Finding and Choosing Models · Advanced Configuration

#### JS / TS (64)

##### `fp-ts-react` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 100/100 |

> Practical patterns for using fp-ts with React - hooks, state, forms, data fetching. Use when building React apps with functional programming patterns. Works with React 18/19, Next.js 14/15.

**File sections:** When to Use This Skill · Quick Reference · 1. State with Option (Maybe It's There, Maybe Not) · 2. Form Validation with Either · 3. Data Fetching with TaskEither · 4. RemoteData Pattern (The Right Way to Handle Async State)

##### `nestjs-expert` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 100/100 |

> You are an expert in Nest.js with deep knowledge of enterprise-grade Node.js application architecture, dependency injection patterns, decorators, middleware, guards, interceptors, pipes, testing strat

**File sections:** Domain Coverage · Environmental Adaptation · Tool Integration · Problem-Specific Approaches (Real Issues from GitHub & Stack Overflow) · Common Patterns & Solutions · Code Review Checklist

#### Marketing (60)

##### `referral-program` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 100/100 |

> You are an expert in viral growth and referral marketing with access to referral program data and third-party tools. Your goal is to help design and optimize programs that turn customers into growth e

**File sections:** Before Starting · Referral vs. Affiliate: When to Use Each · Referral Program Design · Referral Program Examples · Affiliate Program Design · Viral Coefficient & Modeling

##### `social-content` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 100/100 |

> You are an expert social media strategist with direct access to a scheduling platform that publishes to all major social networks. Your goal is to help create engaging content that builds audience, dr

**File sections:** Before Creating Content · Platform Strategy Guide · Content Pillars Framework · Post Formats & Templates · Hook Formulas · Content Repurposing System

#### Mobile (19)

##### `interactive-portfolio` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 100/100 |

> Expert in building portfolios that actually land jobs and clients -

**File sections:** Capabilities · Patterns · Portfolio Architecture · Project Showcase · Developer Portfolio · Portfolio Interactivity

##### `photopea-embedded-editor` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 100/100 |

> Embed Photopea in web apps using photopea.js. Covers embedding, file I/O, scripting, exporting, layers, text, filters, and the full Photoshop-compatible API.

**File sections:** Using photopea.js (yikuansun/PhotopeaAPI) in Websites & Apps · When to Use This Skill · Library: photopea.js · Core API: The `Photopea` Class · Step 1 — Embed · Step 2 — Opening Files

#### Other (233)

##### `citation-management` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Manage citations systematically throughout the research and writing process.

**File sections:** Overview · When to Use This Skill · Visual Enhancement with Scientific Schematics · Core Workflow · Search Strategies · Tools and Scripts

##### `competitor-alternatives` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> You are an expert in creating competitor comparison and alternative pages. Your goal is to build pages that rank for competitive search terms, provide genuine value to evaluators, and position your pr

**File sections:** Initial Assessment · Core Principles · Page Formats · Index Pages · Explore [Your Product] as an Alternative · Find the Right Tool

##### `discord-bot-architect` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Specialized skill for building production-ready Discord bots.

**File sections:** Principles · Patterns · Sharp Edges · Acknowledge immediately, process later · For components (buttons, menus) · Step 1: Enable in Developer Portal

##### `environment-setup-guide` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Guide developers through setting up development environments with proper tools, dependencies, and configurations

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Setting Up Node.js Development Environment · Setting Up Python Development Environment

##### `hugging-face-jobs` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Run workloads on Hugging Face Jobs with managed CPUs, GPUs, TPUs, secrets, and Hub persistence.

**File sections:** Overview · When to Use This Skill · Key Directives · Prerequisites Checklist · Token Usage Guide · Quick Start: Two Approaches

##### `memory-forensics` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Comprehensive techniques for acquiring, analyzing, and extracting artifacts from memory dumps for incident response and malware analysis.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Memory Acquisition · Volatility 3 Framework · Analysis Workflows

##### `mental-health-analyzer` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> 分析心理健康数据、识别心理模式、评估心理健康状况、提供个性化心理健康建议。支持与睡眠、运动、营养等其他健康数据的关联分析。

**File sections:** When to Use · 核心功能 · 触发条件 · 医学安全边界 · 执行步骤 · 输出格式

##### `micro-saas-launcher` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Expert in launching small, focused SaaS products fast - the indie

**File sections:** Capabilities · Patterns · Idea Validation · MVP Speed Run · Pricing Strategy · Launch Playbook

##### `nutrition-analyzer` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> 分析营养数据、识别营养模式、评估营养状况，并提供个性化营养建议。支持与运动、睡眠、慢性病数据的关联分析。

**File sections:** When to Use · 功能 · 使用说明 · 输出格式 · 分析周期 · 宏量营养素趋势

##### `on-call-handoff-patterns` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Effective patterns for on-call shift transitions, ensuring continuity, context transfer, and reliable incident response across shifts.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · 🔴 Active Incidents

##### `shellcheck-configuration` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Master ShellCheck static analysis configuration and usage for shell script quality. Use when setting up linting infrastructure, fixing code issues, or ensuring script portability.

**File sections:** Do not use this skill when · Instructions · Use this skill when · ShellCheck Fundamentals · Configuration Files · Common ShellCheck Error Codes

##### `startup-financial-modeling` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Build comprehensive 3-5 year financial models with revenue projections, cost structures, cash flow analysis, and scenario planning for early-stage startups.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Overview · Core Components · Financial Model Structure

##### `telegram-mini-app` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Expert in building Telegram Mini Apps (TWA) - web apps that run

**File sections:** Capabilities · Patterns · Mini App Setup · TON Connect Integration · Mini App Monetization · Mini App UX

##### `travel-health-analyzer` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> 分析旅行健康数据、评估目的地健康风险、提供疫苗接种建议、生成多语言紧急医疗信息卡片。支持WHO/CDC数据集成的专业级旅行健康风险评估。

**File sections:** When to Use · 🚨 重要医学免责声明 · 技能功能 · 目的地健康风险评估: Thailand · 用药相互作用检查结果 · 旅行前健康检查报告

##### `twilio-communications` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 100/100 |

> Build communication features with Twilio: SMS messaging, voice

**File sections:** Patterns · Sharp Edges · Track opt-out status in your database · Include opt-out instructions · Implement retry logic for transient failures · Provide fallback channel

#### Python (70)

##### `n8n-code-python` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 100/100 |

> Write Python code in n8n Code nodes. Use when writing Python in n8n, using _input/_json/_node syntax, working with standard library, or need to understand Python limitations in n8n Code nodes.

**File sections:** ⚠️ Important: JavaScript First · Quick Start · Mode Selection Guide · Python Modes: Beta vs Native · Data Access Patterns · Critical: Webhook Data Structure

##### `python-patterns` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 100/100 |

> Python development principles and decision-making. Framework selection, async patterns, type hints, project structure. Teaches thinking, not copying.

**File sections:** When to Use · ⚠️ How to Use This Skill · 1. Framework Selection (2025) · 2. Async vs Sync Decision · 3. Type Hints Strategy · 4. Project Structure Principles

##### `scikit-learn` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 100/100 |

> Machine learning in Python with scikit-learn. Use for classification, regression, clustering, model evaluation, and ML pipelines.

**File sections:** Overview · Installation · When to Use This Skill · Quick Start · Core Capabilities · Example Scripts

##### `slack-bot-builder` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 100/100 |

> Build Slack apps using the Bolt framework across Python,

**File sections:** Patterns · Sharp Edges · Acknowledge immediately, process later · For Bolt framework - use lazy listeners · Proper state validation · Never hardcode or log tokens

##### `statsmodels` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 100/100 |

> Statsmodels is Python's premier library for statistical modeling, providing tools for estimation, inference, and diagnostics across a wide range of statistical methods.

**File sections:** Overview · When to Use This Skill · Quick Start Guide · Core Statistical Modeling Capabilities · Formula API (R-style) · Model Selection and Comparison

#### Testing (71)

##### `ffuf-web-fuzzing` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 100/100 |

> Expert guidance for ffuf web fuzzing during penetration testing, including authenticated fuzzing with raw requests, auto-calibration, and result analysis

**File sections:** When to Use · Overview · Installation · Core Concepts · Common Use Cases · Filtering and Matching

#### AI / ML (287)

##### `fp-pragmatic` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 98/100 |

> A practical, jargon-free guide to functional programming - the 80/20 approach that gets results without the academic overhead

**File sections:** When to Use · The Golden Rule · The 80/20 of FP · When NOT to Use FP · Quick Wins: Easy Changes That Improve Code Today · Common Refactors: Before and After

##### `market-sizing-analysis` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 99/100 |

> Comprehensive market sizing methodologies for calculating Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) for startup opportunities.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Overview · Core Concepts · Three-Methodology Framework

##### `trigger-dev` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 98/100 |

> Trigger.dev expert for background jobs, AI workflows, and reliable

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Sharp Edges

#### Data (27)

##### `data-storytelling` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 99/100 |

> Transform raw data into compelling narratives that drive decisions and inspire action.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Story Frameworks · The Hook

#### Frontend (81)

##### `stitch-ui-design` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 99/100 |

> Expert guidance for crafting effective prompts in Google Stitch, the AI-powered UI design tool by Google Labs. This skill helps create precise, actionable prompts that generate high-quality UI designs

**File sections:** What is Google Stitch? · Core Prompting Principles · Prompt Structure Template · Iteration Strategies · Common Use Cases · Design-to-Code Workflow

#### Git (30)

##### `copilot-sdk` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 99/100 |

> Build applications that programmatically interact with GitHub Copilot. The SDK wraps the Copilot CLI via JSON-RPC, providing session management, custom tools, hooks, MCP server integration, and stream

**File sections:** Prerequisites · Installation · Core Pattern: Client → Session → Message · Streaming Responses · Custom Tools · Hooks

#### Java / Kotlin (52)

##### `azure-compute-batch-java` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 99/100 |

> Azure Batch SDK for Java. Run large-scale parallel and HPC batch jobs with pools, jobs, tasks, and compute nodes.

**File sections:** Installation · Prerequisites · Environment Variables · Client Creation · Key Concepts · Pool Operations

#### JS / TS (64)

##### `claude-d3js-skill` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 98/100 |

> This skill provides guidance for creating sophisticated, interactive data visualisations using d3.js.

**File sections:** Overview · When to use d3.js · Core workflow · Common visualisation patterns · Adding interactivity · Transitions and animations

##### `convex` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 99/100 |

> Convex reactive backend expert: schema design, TypeScript functions, real-time subscriptions, auth, file storage, scheduling, and deployment.

**File sections:** When to Use · Core Concepts · Project Setup · Schema Design · Writing Functions · Client-Side Integration

##### `fp-ts-pragmatic` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 98/100 |

> A practical, jargon-free guide to fp-ts functional programming - the 80/20 approach that gets results without the academic overhead. Use when writing TypeScript with fp-ts library.

**File sections:** When to Use This Skill · The Golden Rule · The 80/20 of FP · When NOT to Use FP · Quick Wins: Easy Changes That Improve Code Today · Common Refactors: Before and After

##### `senior-frontend` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 98/100 |

> Frontend development skill for React, Next.js, TypeScript, and Tailwind CSS applications. Use when building React components, optimizing Next.js performance, analyzing bundle sizes, scaffolding fronte

**File sections:** When to Use · Table of Contents · Project Scaffolding · Component Generation · Bundle Analysis · React Patterns

##### `threejs-postprocessing` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 98/100 |

> Three.js post-processing - EffectComposer, bloom, DOF, screen effects. Use when adding visual effects, color grading, blur, glow, or creating custom screen-space shaders.

**File sections:** When to Use · Quick Start · EffectComposer Setup · Common Effects · Custom ShaderPass · Combining Multiple Effects

##### `threejs-skills` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 98/100 |

> Create 3D scenes, interactive experiences, and visual effects using Three.js. Use when user requests 3D graphics, WebGL experiences, 3D visualizations, animations, or interactive 3D elements.

**File sections:** When to Use · Core Setup Pattern · Systematic Development Process · Common Patterns · Best Practices · Example Workflow

#### Other (233)

##### `binary-analysis-patterns` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 99/100 |

> Comprehensive patterns and techniques for analyzing compiled binaries, understanding assembly code, and reconstructing program logic.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Disassembly Fundamentals · Control Flow Patterns · Data Structure Patterns

##### `clarity-gate` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 98/100 |

> >

**File sections:** What's New in v2.1 · Specifications · Validation Codes · Bundled Scripts · The Key Distinction · Critical Limitation

##### `incident-runbook-templates` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 99/100 |

> Production-ready templates for incident response runbooks covering detection, triage, mitigation, resolution, and communication.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Runbook Templates · Overview

##### `occupational-health-analyzer` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 99/100 |

> 分析职业健康数据、识别工作相关健康风险、评估职业健康状况、提供个性化职业健康建议。支持与睡眠、运动、心理健康等其他健康数据的关联分析。

**File sections:** When to Use · 核心功能 · 触发条件 · 医学安全边界 · 执行步骤 · 输出格式

##### `sleep-analyzer` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 98/100 |

> 分析睡眠数据、识别睡眠模式、评估睡眠质量，并提供个性化睡眠改善建议。支持与其他健康数据的关联分析。

**File sections:** When to Use · 功能 · 使用说明 · 输出格式 · 分析周期 · 睡眠时长趋势

##### `upstash-qstash` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 98/100 |

> Upstash QStash expert for serverless message queues, scheduled

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Sharp Edges

##### `web-performance-optimization` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 98/100 |

> Optimize website and web application performance including loading speed, Core Web Vitals, bundle size, caching strategies, and runtime performance

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Performance Audit Results · Bundle Size Optimization

#### Python (70)

##### `biopython` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 99/100 |

> Biopython is a comprehensive set of freely available Python tools for biological computation. It provides functionality for sequence manipulation, file I/O, database access, structural bioinformatics,

**File sections:** Overview · When to Use This Skill · Core Capabilities · Installation and Setup · Using This Skill · General Workflow Guidelines

##### `scanpy` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 98/100 |

> Scanpy is a scalable Python toolkit for analyzing single-cell RNA-seq data, built on AnnData. Apply this skill for complete single-cell workflows including quality control, normalization, dimensionali

**File sections:** Overview · When to Use This Skill · Quick Start · Standard Analysis Workflow · Common Tasks · Key Parameters to Adjust

#### Testing (71)

##### `dependency-upgrade` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 98/100 |

> Master major dependency version upgrades, compatibility analysis, staged upgrade strategies, and comprehensive testing approaches.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Semantic Versioning Review · Dependency Analysis · Compatibility Matrix

##### `k6-load-testing` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 99/100 |

> Comprehensive k6 load testing skill for API, browser, and scalability testing. Write realistic load scenarios, analyze results, and integrate with CI/CD.

**File sections:** Overview · When to Use This Skill · k6 Basics · Test Configuration · HTTP Testing · Browser Testing (k6 Browser)

#### AI / ML (287)

##### `health-trend-analyzer` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 96/100 |

> 分析一段时间内健康数据的趋势和模式。关联药物、症状、生命体征、化验结果和其他健康指标的变化。识别令人担忧的趋势、改善情况，并提供数据驱动的洞察。当用户询问健康趋势、模式、随时间的变化或"我的健康状况有什么变化？"时使用。支持多维度分析（体重/BMI、症状、药物依从性、化验结果、情绪睡眠），相关性分析，变化检测，以及交互式HTML可视化报告（ECharts图表）。

**File sections:** When to Use · 核心功能 · 使用说明 · 输出格式 · 数据源 · 分析算法

##### `paid-ads` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 95/100 |

> You are an expert performance marketer with direct access to ad platform accounts. Your goal is to help create, optimize, and scale paid advertising campaigns that drive efficient customer acquisition

**File sections:** Before Starting · Platform Selection Guide · Campaign Structure Best Practices · Ad Copy Frameworks · Audience Targeting Strategies · Creative Best Practices

##### `voice-ai-engine-development` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 95/100 |

> Build real-time conversational AI voice engines using async worker pipelines, streaming transcription, LLM agents, and TTS synthesis with interrupt handling and multi-provider support

**File sections:** Overview · When to Use This Skill · Core Architecture Principles · Component Implementation Guide · The Interrupt System · Multi-Provider Factory Pattern

#### API (32)

##### `api-documentation-generator` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 95/100 |

> Generate comprehensive, developer-friendly API documentation from code, including endpoints, parameters, examples, and best practices

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Create User · User Query

#### Backend (31)

##### `polars` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 95/100 |

> Fast in-memory DataFrame library for datasets that fit in RAM. Use when pandas is too slow but data still fits in memory. Lazy evaluation, parallel execution, Apache Arrow backend. Best for 1-100GB da

**File sections:** When to Use · Overview · Quick Start · Core Concepts · Common Operations · Aggregations and Window Functions

#### Database (46)

##### `hugging-face-datasets` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 95/100 |

> Create and manage datasets on Hugging Face Hub. Supports initializing repos, defining configs/system prompts, streaming row updates, and SQL-based dataset querying/transformation. Designed to work alo

**File sections:** When to Use · Integration with HF MCP Server · 1. Dataset Lifecycle Management · 2. SQL-Based Dataset Querying (NEW) · 3. Multi-Format Dataset Support · 4. Quality Assurance Features

##### `monte-carlo-validation-notebook` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 95/100 |

> Generates SQL validation notebooks for dbt PR changes with before/after comparison queries.

**File sections:** When to Use · Parameter Cell Spec · Phase 1: Get Changed Files · Phase 2: Parse Changed Models · Phase 3: Generate Validation Queries · Phase 4: Build Notebook YAML

##### `sql-injection-testing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 96/100 |

> Execute comprehensive SQL injection vulnerability assessments on web applications to identify database security flaws, demonstrate exploitation techniques, and validate input sanitization mechanisms.

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Guardrails

##### `sqlmap-database-pentesting` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 96/100 |

> Provide systematic methodologies for automated SQL injection detection and exploitation using SQLMap.

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference Commands · Constraints and Limitations

#### Design (29)

##### `team-composition-analysis` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 96/100 |

> Design optimal team structures, hiring plans, compensation strategies, and equity allocation for early-stage startups from pre-seed through Series A.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Overview · Team Structure by Stage · Role-by-Role Planning

#### DevOps (20)

##### `code-review-ai-ai-review` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 95/100 |

> You are an expert AI-powered code review specialist combining automated static analysis, intelligent pattern recognition, and modern DevOps practices. Leverage AI tools (GitHub Copilot, Qodo, GPT-5, C

**File sections:** Use this skill when · Do not use this skill when · Instructions · Context · Requirements · Automated Code Review Workflow

#### Frontend (81)

##### `angular-ui-patterns` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 95/100 |

> Modern Angular UI patterns for loading states, error handling, and data display. Use when building UI components, handling async data, or managing component states.

**File sections:** Core Principles · Loading State Patterns · Control Flow Patterns · Error Handling Patterns · Button State Patterns · Empty States

##### `trpc-fullstack` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 95/100 |

> Build end-to-end type-safe APIs with tRPC — routers, procedures, middleware, subscriptions, and Next.js/React integration patterns.

**File sections:** Overview · When to Use This Skill · Core Concepts · How It Works · Examples · Best Practices

##### `ui-ux-pro-max` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 96/100 |

> Comprehensive design guide for web and mobile applications. Use when designing new UI components or pages, choosing color palettes and typography, or reviewing code for UX issues.

**File sections:** When to Use · Rule Categories by Priority · Quick Reference · How to Use · Prerequisites · How to Use This Skill

#### Java / Kotlin (52)

##### `typescript-expert` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 97/100 |

> TypeScript and JavaScript expert with deep knowledge of type-level programming, performance optimization, monorepo management, migration strategies, and modern tooling.

**File sections:** Advanced Type System Expertise · Real-World Problem Resolution · Modern Tooling Expertise · Debugging Mastery · Current Best Practices · Code Review Checklist

#### JS / TS (64)

##### `fp-refactor` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 95/100 |

> Comprehensive guide for refactoring imperative TypeScript code to fp-ts functional patterns

**File sections:** When to Use · Table of Contents · 1. Converting try-catch to Either/TaskEither · 2. Converting null checks to Option · 3. Converting callbacks to Task · 4. Converting class-based DI to Reader

##### `nodejs-best-practices` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 95/100 |

> Node.js development principles and decision-making. Framework selection, async patterns, security, and architecture. Teaches thinking, not copying.

**File sections:** When to Use · ⚠️ How to Use This Skill · 1. Framework Selection (2025) · 2. Runtime Considerations (2025) · 3. Architecture Principles · 4. Error Handling Principles

##### `secrets-management` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 97/100 |

> Secure secrets management practices for CI/CD pipelines using Vault, AWS Secrets Manager, and other tools.

**File sections:** Purpose · Use this skill when · Do not use this skill when · Instructions · Safety · Secrets Management Tools

##### `threejs-loaders` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 95/100 |

> Three.js asset loading - GLTF, textures, images, models, async patterns. Use when loading 3D models, textures, HDR environments, or managing loading progress.

**File sections:** When to Use · Quick Start · LoadingManager · Texture Loading · GLTF/GLB Loading · Other Model Formats

##### `threejs-shaders` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 95/100 |

> Three.js shaders - GLSL, ShaderMaterial, uniforms, custom effects. Use when creating custom visual effects, modifying vertices, writing fragment shaders, or extending built-in materials.

**File sections:** When to Use · Quick Start · ShaderMaterial vs RawShaderMaterial · Uniforms · Varyings · Common Shader Patterns

##### `threejs-textures` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 95/100 |

> Three.js textures - texture types, UV mapping, environment maps, texture settings. Use when working with images, UV coordinates, cubemaps, HDR environments, or texture optimization.

**File sections:** When to Use · Quick Start · Texture Loading · Texture Configuration · Texture Types · Cube Textures

#### Marketing (60)

##### `hugging-face-evaluation` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 97/100 |

> Add and manage evaluation results in Hugging Face model cards. Supports extracting eval tables from README content, importing scores from Artificial Analysis API, and running custom model evaluations

**File sections:** When to Use · Integration with HF Ecosystem · Core Dependencies · Inference Provider Evaluation · vLLM Custom Model Evaluation (GPU required) · ⚠️ CRITICAL: Check for Existing PRs Before Creating New Ones

#### Mobile (19)

##### `app-store-optimization` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 97/100 |

> Complete App Store Optimization (ASO) toolkit for researching, optimizing, and tracking mobile app performance on Apple App Store and Google Play Store

**File sections:** Capabilities · Input Requirements · Output Formats · How to Use · Scripts · Best Practices

#### Other (233)

##### `broken-authentication` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 96/100 |

> Identify and exploit authentication and session management vulnerabilities in web applications. Broken authentication consistently ranks in the OWASP Top 10 and can lead to account takeover, identity

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `browser-extension-builder` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 97/100 |

> Expert in building browser extensions that solve real problems -

**File sections:** Capabilities · Patterns · Extension Architecture · Content Scripts · Storage and State · Extension Monetization

##### `bug-hunter` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 97/100 |

> Systematically finds and fixes bugs using proven debugging techniques. Traces from symptoms to root cause, implements fixes, and prevents regression.

**File sections:** When to Use This Skill · The Debugging Process · Debugging Techniques · Common Bug Patterns · Debugging Tools · When You're Stuck

##### `distributed-tracing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 96/100 |

> Implement distributed tracing with Jaeger and Tempo for request flow visibility across microservices.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Distributed Tracing Concepts · Jaeger Setup

##### `goal-analyzer` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 96/100 |

> 分析健康目标数据、识别目标模式、评估目标进度,并提供个性化目标管理建议。支持与营养、运动、睡眠等健康数据的关联分析。

**File sections:** When to Use · 功能 · 医学安全边界 · 输出格式 · 目标概览 · SMART评估

##### `grafana-dashboards` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 95/100 |

> Create and manage production-ready Grafana dashboards for comprehensive system observability.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Dashboard Design Principles · Dashboard Structure

##### `postmortem-writing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 96/100 |

> Comprehensive guide to writing effective, blameless postmortems that drive organizational learning and prevent incident recurrence.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Quick Start · Templates

##### `product-manager-toolkit` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 96/100 |

> Essential tools and frameworks for modern product management, from discovery to delivery.

**File sections:** Quick Start · Core Workflows · Key Scripts · Reference Documents · Prioritization Frameworks · Discovery Frameworks

##### `remotion` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 97/100 |

> Generate walkthrough videos from Stitch projects using Remotion with smooth transitions, zooming, and text overlays

**File sections:** Overview · Prerequisites · Retrieval and Networking · Video Composition Strategy · Execution Steps · Advanced Features

##### `startup-business-analyst-business-case` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 95/100 |

> 'Generate comprehensive investor-ready business case document with

**File sections:** Use this skill when · Do not use this skill when · Instructions · What This Command Does · Instructions for Claude · Business Case Document Structure

##### `telegram-bot-builder` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 96/100 |

> Expert in building Telegram bots that solve real problems - from

**File sections:** Capabilities · Patterns · Bot Architecture · Inline Keyboards · Bot Monetization · Webhook Deployment

##### `videodb` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 95/100 |

> Video and audio perception, indexing, and editing. Ingest files/URLs/live streams, build visual/spoken indexes, search with timestamps, edit timelines, add overlays/subtitles, generate media, and crea

**File sections:** When to Use · 1) Desktop Perception · 2) Video ingest + stream · 3) Index + search (timestamps + evidence) · 4) Timeline editing + generation · 5) Live streams (RTSP) + monitoring

#### Python (70)

##### `seaborn` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 95/100 |

> Seaborn is a Python visualization library for creating publication-quality statistical graphics. Use this skill for dataset-oriented plotting, multivariate analysis, automatic statistical estimation,

**File sections:** When to Use · Overview · Design Philosophy · Quick Start · Core Plotting Interfaces · Plotting Functions by Category

##### `sympy` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 95/100 |

> SymPy is a Python library for symbolic mathematics that enables exact computation using mathematical symbols rather than numerical approximations.

**File sections:** Overview · When to Use This Skill · Core Capabilities · Working with SymPy: Best Practices · Reference Files Structure · Common Use Case Patterns

#### Security (111)

##### `api-fuzzing-bug-bounty` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 97/100 |

> Provide comprehensive techniques for testing REST, SOAP, and GraphQL APIs during bug bounty hunting and penetration testing engagements. Covers vulnerability discovery, authentication bypass, IDOR exp

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · API Types Overview · Core Workflow · GraphQL-Specific Testing

##### `cloud-penetration-testing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 97/100 |

> Conduct comprehensive security assessments of cloud infrastructure across Microsoft Azure, Amazon Web Services (AWS), and Google Cloud Platform (GCP).

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `code-review-checklist` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 96/100 |

> Comprehensive checklist for conducting thorough code reviews covering functionality, security, performance, and maintainability

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Functionality Review · Security Review

##### `pci-compliance` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 96/100 |

> Master PCI DSS (Payment Card Industry Data Security Standard) compliance for secure payment processing and handling of cardholder data.

**File sections:** Do not use this skill when · Instructions · Use this skill when · PCI DSS Requirements (12 Core Requirements) · Compliance Levels · Data Minimization (Never Store)

##### `security-scanning-security-sast` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 97/100 |

> 'Static Application Security Testing (SAST) for code vulnerability

**File sections:** Capabilities · Use this skill when · Do not use this skill when · Instructions · Safety · SAST Tool Selection

##### `smtp-penetration-testing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 97/100 |

> Conduct comprehensive security assessments of SMTP (Simple Mail Transfer Protocol) servers to identify vulnerabilities including open relays, user enumeration, weak authentication, and misconfiguratio

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `wireshark-analysis` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 96/100 |

> Execute comprehensive network traffic analysis using Wireshark to capture, filter, and examine network packets for security investigations, performance optimization, and troubleshooting.

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Guardrails

##### `xss-html-injection` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 96/100 |

> Execute comprehensive client-side injection vulnerability assessments on web applications to identify XSS and HTML injection flaws, demonstrate exploitation techniques for session hijacking and creden

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Guardrails

#### Testing (71)

##### `aws-penetration-testing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 96/100 |

> Provide comprehensive techniques for penetration testing AWS cloud environments. Covers IAM enumeration, privilege escalation, SSRF to metadata endpoint, S3 bucket exploitation, Lambda code extraction

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · Essential Tools · Core Workflow · Privilege Escalation Techniques

##### `conductor-implement` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 97/100 |

> Execute tasks from a track's implementation plan following TDD workflow

**File sections:** Use this skill when · Do not use this skill when · Instructions · Pre-flight Checks · Track Selection · Context Loading

##### `idor-testing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 97/100 |

> Provide systematic methodologies for identifying and exploiting Insecure Direct Object Reference (IDOR) vulnerabilities in web applications.

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `llm-evaluation` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 96/100 |

> Master comprehensive evaluation strategies for LLM applications, from automated metrics to human evaluation and A/B testing.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Evaluation Types · Quick Start · Automated Metrics Implementation

##### `performance-testing-review-ai-review` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 95/100 |

> You are an expert AI-powered code review specialist combining automated static analysis, intelligent pattern recognition, and modern DevOps practices. Leverage AI tools (GitHub Copilot, Qodo, GPT-5, C

**File sections:** Use this skill when · Do not use this skill when · Instructions · Context · Requirements · Automated Code Review Workflow

##### `shodan-reconnaissance` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 96/100 |

> Provide systematic methodologies for leveraging Shodan as a reconnaissance tool during penetration testing engagements.

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `wordpress-penetration-testing` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 97/100 |

> Assess WordPress installations for common vulnerabilities and WordPress 7.0 attack surfaces.

**File sections:** WordPress 7.0 Security Considerations · Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference

#### AI / ML (287)

##### `ad-creative` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 94/100 |

> Create, iterate, and scale paid ad creative for Google Ads, Meta, LinkedIn, TikTok, and similar platforms. Use when generating headlines, descriptions, primary text, or large sets of ad variations for

**File sections:** When to Use · Before Starting · How This Skill Works · Platform Specs · Generating Ad Visuals · Generating Ad Copy

##### `agent-orchestration-improve-agent` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 94/100 |

> Systematic improvement of existing agents through performance analysis, prompt engineering, and continuous iteration.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Phase 1: Performance Analysis and Baseline Metrics · Phase 2: Prompt Engineering Improvements

##### `architecture-decision-records` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 94/100 |

> Comprehensive patterns for creating, maintaining, and managing Architecture Decision Records (ADRs) that capture the context and rationale behind significant technical decisions.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Core Concepts · Templates · Status

##### `git-advanced-workflows` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 94/100 |

> Master advanced Git techniques to maintain clean history, collaborate effectively, and recover from any situation with confidence.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Practical Workflows · Advanced Techniques

##### `hugging-face-paper-publisher` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 93/100 |

> Publish and manage research papers on Hugging Face Hub. Supports creating paper pages, linking papers to models/datasets, claiming authorship, and generating professional markdown-based research artic

**File sections:** When to Use · Integration with HF Ecosystem · 1. Paper Page Management · 2. Link Papers to Artifacts · 3. Research Article Creation · 4. Metadata Management

##### `llm-app-patterns` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 94/100 |

> Production-ready patterns for building LLM applications, inspired by [Dify](https://github.com/langgenius/dify) and industry best practices.

**File sections:** When to Use This Skill · 1. RAG Pipeline Architecture · 2. Agent Architectures · 3. Prompt IDE Patterns · 4. LLMOps & Observability · 5. Production Patterns

##### `skill-creator` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 94/100 |

> To create new CLI skills following Anthropic's official best practices with zero manual configuration. This skill automates brainstorming, template application, validation, and installation processes

**File sections:** Purpose · When to Use This Skill · Core Capabilities · Step 0: Discovery · Main Workflow · Error Handling

#### API (32)

##### `fp-async` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 94/100 |

> Practical async patterns using TaskEither - clean pipelines instead of try/catch hell, with real API examples

**File sections:** When to Use · 1. Wrapping Promises Safely · 2. Chaining Async Operations · 3. Parallel vs Sequential Execution · 4. Error Recovery Patterns · 5. Real API Examples

##### `stripe-integration` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 93/100 |

> Master Stripe payment processing integration for robust, PCI-compliant payment flows including checkout, subscriptions, webhooks, and refunds.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Quick Start · Payment Implementation Patterns

#### Automation (73)

##### `makepad-deployment` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 94/100 |

> |

**File sections:** When to Use · Quick Navigation · GitHub Actions Packaging · Desktop Packaging · Mobile Packaging · Wasm Packaging

#### Cloud (49)

##### `azure-ai-openai-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 94/100 |

> Azure OpenAI SDK for .NET. Client library for Azure OpenAI and OpenAI services. Use for chat completions, embeddings, image generation, audio transcription, and assistants.

**File sections:** Installation · Environment Variables · Client Hierarchy · Authentication · Chat Completions · Structured Outputs (JSON Schema)

##### `azure-maps-search-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 93/100 |

> Azure Maps SDK for .NET. Location-based services including geocoding, routing, rendering, geolocation, and weather. Use for address search, directions, map tiles, IP geolocation, and weather data.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflows · Key Types Reference

##### `azure-mgmt-apicenter-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 93/100 |

> Azure API Center SDK for .NET. Centralized API inventory management with governance, versioning, and discovery.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · Key Types Reference

#### Data (27)

##### `fp-data-transforms` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 94/100 |

> Everyday data transformations using functional patterns - arrays, objects, grouping, aggregation, and null-safe access

**File sections:** When to Use · Table of Contents · 1. Array Operations · 2. Object Transformations · 3. Data Normalization · 4. Grouping and Aggregation

#### Database (46)

##### `azure-mgmt-mongodbatlas-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 94/100 |

> Manage MongoDB Atlas Organizations as Azure ARM resources with unified billing through Azure Marketplace.

**File sections:** Package Information · Installation · Important Scope Limitation · Authentication · Core Types · Workflows

##### `azure-resource-manager-mysql-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 93/100 |

> Azure MySQL Flexible Server SDK for .NET. Database management for MySQL Flexible Server deployments.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · Key Types Reference

##### `azure-resource-manager-postgresql-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 94/100 |

> Azure PostgreSQL Flexible Server SDK for .NET. Database management for PostgreSQL Flexible Server deployments.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · Key Types Reference

##### `cc-skill-clickhouse-io` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 94/100 |

> ClickHouse database patterns, query optimization, analytics, and data engineering best practices for high-performance analytical workloads.

**File sections:** Overview · Table Design Patterns · Query Optimization Patterns · Data Insertion Patterns · Materialized Views · Performance Monitoring

##### `database-migration` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 94/100 |

> Master database schema and data migrations across ORMs (Sequelize, TypeORM, Prisma), including rollback strategies and zero-downtime deployments.

**File sections:** Do not use this skill when · Instructions · Use this skill when · ORM Migrations · Schema Transformations · Data Transformations

##### `food-database-query` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 94/100 |

> Food Database Query

**File sections:** When to Use · 技能概述 · 数据源 · 功能模块 · 数据结构 · RDA参考值

#### Design (29)

##### `deployment-pipeline-design` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 94/100 |

> Architecture patterns for multi-stage CI/CD pipelines with approval gates and deployment strategies.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Pipeline Stages · Approval Gate Patterns

##### `kpi-dashboard-design` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 93/100 |

> Comprehensive patterns for designing effective Key Performance Indicator (KPI) dashboards that drive business decisions.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Common KPIs by Department · Dashboard Layout Patterns

#### Frontend (81)

##### `angular-state-management` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 94/100 |

> Master modern Angular state management with Signals, NgRx, and RxJS. Use when setting up global state, managing component stores, choosing between state solutions, or migrating from legacy patterns.

**File sections:** When to Use This Skill · Do Not Use This Skill When · Core Concepts · Quick Start: Signal-Based State · NgRx Store (Global State) · RxJS-Based Patterns

##### `frontend-ui-dark-ts` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 93/100 |

> A modern dark-themed React UI system using Tailwind CSS and Framer Motion. Designed for dashboards, admin panels, and data-rich applications with glassmorphism effects and tasteful animations.

**File sections:** Stack · Quick Start · Project Structure · Configuration · Animation Patterns · Glass Effect Patterns

#### Go (10)

##### `django-access-review` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 93/100 |

> django-access-review

**File sections:** When to Use · Philosophy: Investigation Over Pattern Matching · Phase 1: Understand the Authorization Model · Phase 2: Map the Attack Surface · Phase 3: Ask Questions and Investigate · Phase 4: Trace Specific Flows

##### `django-perf-review` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 94/100 |

> Django performance code review. Use when asked to "review Django performance", "find N+1 queries", "optimize Django", "check queryset performance", "database performance", "Django ORM issues", or audi

**File sections:** When to Use · Review Approach · Impact Categories · Priority 1: N+1 Queries (CRITICAL) · Priority 2: Unbounded Querysets (CRITICAL) · Priority 3: Missing Indexes (HIGH)

#### Java / Kotlin (52)

##### `azure-storage-blob-ts` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 94/100 |

> Azure Blob Storage JavaScript/TypeScript SDK (@azure/storage-blob) for blob operations. Use for uploading, downloading, listing, and managing blobs and containers.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Container Operations · Blob Operations

##### `azure-storage-file-share-ts` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 94/100 |

> Azure File Share JavaScript/TypeScript SDK (@azure/storage-file-share) for SMB file share operations.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Share Operations · Directory Operations

##### `azure-storage-queue-ts` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 94/100 |

> Azure Queue Storage JavaScript/TypeScript SDK (@azure/storage-queue) for message queue operations. Use for sending, receiving, peeking, and deleting messages in queues.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Queue Operations · Message Operations

##### `cc-skill-coding-standards` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 94/100 |

> Universal coding standards, best practices, and patterns for TypeScript, JavaScript, React, and Node.js development.

**File sections:** Code Quality Principles · TypeScript/JavaScript Standards · React Best Practices · API Design Standards · File Organization · Comments & Documentation

##### `javascript-mastery` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 94/100 |

> 33+ essential JavaScript concepts every developer should know, inspired by [33-js-concepts](https://github.com/leonardomso/33-js-concepts).

**File sections:** When to Use This Skill · 1. Fundamentals · 2. Scope & Closures · 3. Functions & Execution · 4. Event Loop & Async · 5. Functional Programming

#### JS / TS (64)

##### `azure-mgmt-applicationinsights-dotnet` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 93/100 |

> Azure Application Insights SDK for .NET. Application performance monitoring and observability resource management.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · Key Types Reference

##### `drizzle-orm-expert` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 94/100 |

> Expert in Drizzle ORM for TypeScript — schema design, relational queries, migrations, and serverless database integration. Use when building type-safe database layers with Drizzle.

**File sections:** When to Use This Skill · Core Concepts · Schema Design Patterns · Query Patterns · Migration Workflow (Drizzle Kit) · Database Client Setup

##### `fp-ts-errors` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 94/100 |

> Handle errors as values using fp-ts Either and TaskEither for cleaner, more predictable TypeScript code. Use when implementing error handling patterns with fp-ts.

**File sections:** When to Use This Skill · 1. Stop Throwing Everywhere · 2. The Result Pattern (Either) · 3. Chaining Operations That Might Fail · 4. Collecting Multiple Errors · 5. Async Operations (TaskEither)

##### `threejs-interaction` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 93/100 |

> Three.js interaction - raycasting, controls, mouse/touch input, object selection. Use when handling user input, implementing click detection, adding camera controls, or creating interactive 3D experie

**File sections:** When to Use · Quick Start · Raycaster · Camera Controls · TransformControls · DragControls

#### Other (233)

##### `build` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 93/100 |

> build

**File sections:** When to Use · Instructions · Subcommand: Help (empty args) · Subcommand: research · Overview · Problem Statement

##### `chat-widget` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 94/100 |

> Build a real-time support chat system with a floating widget for users and an admin dashboard for support staff. Use when the user wants live chat, customer support chat, real-time messaging, or in-ap

**File sections:** When to Use This Skill · Architecture Overview · Implementation Guide · Key Design Decisions · Testing Checklist · Common Pitfalls

##### `file-path-traversal` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 93/100 |

> Identify and exploit file path traversal (directory traversal) vulnerabilities that allow attackers to read arbitrary files on the server, potentially including sensitive configuration files, credenti

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `fp-errors` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 94/100 |

> Stop throwing everywhere - handle errors as values using Either and TaskEither for cleaner, more predictable code

**File sections:** When to Use · 1. Stop Throwing Everywhere · 2. The Result Pattern (Either) · 3. Chaining Operations That Might Fail · 4. Collecting Multiple Errors · 5. Async Operations (TaskEither)

##### `personal-tool-builder` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 94/100 |

> Expert in building custom tools that solve your own problems first.

**File sections:** Capabilities · Patterns · The Itch-to-Tool Process · CLI Tool Stack · Local-First Architecture · Evolution Path

##### `rehabilitation-analyzer` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 94/100 |

> 分析康复训练数据、识别康复模式、评估康复进展，并提供个性化康复建议

**File sections:** When to Use · 核心功能 · 触发条件 · 执行步骤 · 输出格式 · 1. 康复进展摘要

##### `scroll-experience` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 94/100 |

> Expert in building immersive scroll-driven experiences - parallax

**File sections:** Capabilities · Patterns · Scroll Animation Stack · Parallax Storytelling · Sticky Sections · Performance Optimization

#### Python (70)

##### `matplotlib` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 93/100 |

> Matplotlib is Python's foundational visualization library for creating static, animated, and interactive plots.

**File sections:** Overview · When to Use This Skill · Core Concepts · Common Workflows · Best Practices · Quick Reference Scripts

#### Security (111)

##### `burpsuite-project-parser` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 94/100 |

> Searches and explores Burp Suite project files (.burp) from the command line. Use when searching response headers or bodies with regex patterns, extracting security audit findings, dumping proxy histo

**File sections:** When to Use · Prerequisites · Quick Reference · Sub-Component Filters (USE THESE) · Regex Search Operations · Other Operations

##### `firmware-analyst` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 93/100 |

> Expert firmware analyst specializing in embedded systems, IoT security, and hardware reverse engineering.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Firmware Analysis Workflow · Common Vulnerability Classes · Tool Proficiency

##### `html-injection-testing` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 93/100 |

> Identify and exploit HTML injection vulnerabilities that allow attackers to inject malicious HTML content into web applications. This vulnerability enables attackers to modify page appearance, create

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `k8s-security-policies` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 93/100 |

> Comprehensive guide for implementing NetworkPolicy, PodSecurityPolicy, RBAC, and Pod Security Standards in Kubernetes.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Pod Security Standards · Network Policies

##### `metasploit-framework` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 93/100 |

> ⚠️ AUTHORIZED USE ONLY > This skill is for educational purposes or authorized security assessments only. > You must have explicit, written permission from the system owner before using this tool. > Mi

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `production-code-audit` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 93/100 |

> Autonomously deep-scan entire codebase line-by-line, understand architecture and patterns, then systematically transform it to production-grade, corporate-level professional quality with optimizations

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Autonomous Scanning Instructions

##### `scanning-tools` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 94/100 |

> Master essential security scanning tools for network discovery, vulnerability assessment, web application testing, wireless security, and compliance validation. This skill covers tool selection, confi

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `ssh-penetration-testing` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 93/100 |

> Conduct comprehensive SSH security assessments including enumeration, credential attacks, vulnerability exploitation, tunneling techniques, and post-exploitation activities. This skill covers the comp

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `wordpress` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 94/100 |

> Complete WordPress development workflow covering theme development, plugin creation, WooCommerce integration, performance optimization, and security hardening. Includes WordPress 7.0 features: Real-Ti

**File sections:** Overview · WordPress 7.0 Features (Backward Compatible) · When to Use This Workflow · Workflow Phases · WordPress-Specific Workflows · Quality Gates

#### Testing (71)

##### `screenshots` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 94/100 |

> Generate marketing screenshots of your app using Playwright. Use when the user wants to create screenshots for Product Hunt, social media, landing pages, or documentation.

**File sections:** When to Use This Skill · Prerequisites · Step 1: Determine App URL · Step 2: Gather Requirements · Step 3: Analyze Codebase for Features · Step 4: Plan Screenshots with User

##### `windows-privilege-escalation` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 94/100 |

> Provide systematic methodologies for discovering and exploiting privilege escalation vulnerabilities on Windows systems during penetration testing engagements.

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

#### AI / ML (287)

##### `churn-prevention` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 92/100 |

> Reduce voluntary and involuntary churn with cancel flows, save offers, dunning, win-back tactics, and retention strategy. Use when users are cancelling, failed payments are rising, or subscription ret

**File sections:** When to Use · Before Starting · How This Skill Works · Cancel Flow Design · Churn Prediction & Proactive Retention · Involuntary Churn: Payment Recovery

##### `langchain-architecture` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 91/100 |

> Master the LangChain framework for building sophisticated LLM applications with agents, chains, memory, and tool integration.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Quick Start · Architecture Patterns

##### `paywall-upgrade-cro` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 90/100 |

> You are an expert in in-app paywalls and upgrade flows. Your goal is to convert free users to paid, or upgrade users to higher tiers, at moments when they've experienced enough value to justify the co

**File sections:** Initial Assessment · Core Principles · Paywall Trigger Points · Paywall Screen Components · Specific Paywall Types · Mobile Paywall Patterns

##### `scientific-writing` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 92/100 |

> This is the core skill for the deep research and writing tool—combining AI-driven deep research with well-formatted written outputs. Every document produced is backed by comprehensive literature searc

**File sections:** Overview · When to Use This Skill · Visual Enhancement with Scientific Schematics · Core Capabilities · Workflow for Manuscript Development · Integration with Other Scientific Skills

#### Backend (31)

##### `fp-backend` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 91/100 |

> Functional programming patterns for Node.js/Deno backend development using fp-ts, ReaderTaskEither, and functional dependency injection

**File sections:** When to Use · Core Concepts · Service Layer Patterns · Functional Dependency Injection · Database Operations · Middleware Patterns

##### `paypal-integration` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 90/100 |

> Master PayPal payment integration including Express Checkout, IPN handling, recurring billing, and refund workflows.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Quick Start · Express Checkout Implementation

#### Cloud (49)

##### `azure-eventgrid-dotnet` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 90/100 |

> Azure Event Grid SDK for .NET. Client library for publishing and consuming events with Azure Event Grid. Use for event-driven architectures, pub/sub messaging, CloudEvents, and EventGridEvents.

**File sections:** Installation · Environment Variables · Client Hierarchy · Authentication · Publishing Events · Pull Delivery (Namespaces)

##### `azure-identity-dotnet` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 92/100 |

> Azure Identity SDK for .NET. Authentication library for Azure SDK clients using Microsoft Entra ID. Use for DefaultAzureCredential, managed identity, service principals, and developer credentials.

**File sections:** Installation · Environment Variables · DefaultAzureCredential · Credential Types · Environment-Based Configuration · Sovereign Clouds

##### `azure-resource-manager-durabletask-dotnet` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 90/100 |

> Azure Resource Manager SDK for Durable Task Scheduler in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflow · Key Types Reference

##### `cost-optimization` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 90/100 |

> Strategies and patterns for optimizing cloud costs across AWS, Azure, and GCP.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Cost Optimization Framework · AWS Cost Optimization

#### Data (27)

##### `spark-optimization` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 91/100 |

> Optimize Apache Spark jobs with partitioning, caching, shuffle optimization, and memory tuning. Use when improving Spark performance, debugging slow jobs, or scaling data processing pipelines.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Quick Start · Patterns

#### Database (46)

##### `obsidian-bases` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 92/100 |

> Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base files, creating database-like views of notes, or when the user mentions Bases, ta

**File sections:** When to Use · Workflow · Schema · Filter Syntax · Properties · Formula Syntax

##### `performance-optimizer` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 91/100 |

> Identifies and fixes performance bottlenecks in code, databases, and APIs. Measures before and after to prove improvements.

**File sections:** When to Use This Skill · The Optimization Process · Common Optimizations · Measuring Impact · Performance Budgets · Tools

#### Design (29)

##### `product-inventor` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 90/100 |

> Product Inventor e Design Alchemist de nivel maximo — combina Product Thinking, Design Systems, UI Engineering, Psicologia Cognitiva, Storytelling e execucao impecavel nivel Jobs/Apple.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Etapa A — Diagnostico Brutal · Etapa B — Conceito: A Grande Ideia

#### Frontend (81)

##### `angular-migration` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 91/100 |

> Master AngularJS to Angular migration, including hybrid apps, component conversion, dependency injection changes, and routing migration.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Migration Strategies · Hybrid App Setup

##### `expo-tailwind-setup` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 92/100 |

> Set up Tailwind CSS v4 in Expo with react-native-css and NativeWind v5 for universal styling

**File sections:** When to Use · Overview · Installation · Configuration Files · IMPORTANT: No Babel Config Needed · CSS Component Wrappers

##### `react-flow-architect` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 91/100 |

> Build production-ready ReactFlow applications with hierarchical navigation, performance optimization, and advanced state management.

**File sections:** Quick Start · Core Patterns · Advanced Features · Performance Tools · Best Practices · Common Problems & Solutions

##### `react-state-management` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 91/100 |

> Master modern React state management with Redux Toolkit, Zustand, Jotai, and React Query. Use when setting up global state, managing server state, or choosing between state management solutions.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Quick Start · Patterns

#### Git (30)

##### `conductor-revert` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 92/100 |

> Git-aware undo by logical work unit (track, phase, or task)

**File sections:** Use this skill when · Do not use this skill when · Instructions · Pre-flight Checks · Target Selection · Commit Discovery

##### `git-hooks-automation` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 91/100 |

> Master Git hooks setup with Husky, lint-staged, pre-commit framework, and commitlint. Automate code quality gates, formatting, linting, and commit message enforcement before code reaches CI.

**File sections:** When to Use This Skill · Git Hooks Fundamentals · Husky + lint-staged (Node.js Projects) · pre-commit Framework (Python / Polyglot) · Custom Hook Scripts (Any Language) · CI Integration

#### Java / Kotlin (52)

##### `azure-cosmos-ts` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 92/100 |

> Azure Cosmos DB JavaScript/TypeScript SDK (@azure/cosmos) for data plane operations. Use for CRUD operations on documents, queries, bulk operations, and container management.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Operations · Queries

##### `azure-data-tables-java` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 90/100 |

> Build table storage applications using the Azure Tables SDK for Java. Works with both Azure Table Storage and Cosmos DB Table API.

**File sections:** Installation · Client Creation · Key Concepts · Core Patterns · Typed Entities · Error Handling

##### `azure-monitor-query-java` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 91/100 |

> Azure Monitor Query SDK for Java. Execute Kusto queries against Log Analytics workspaces and query metrics from Azure resources.

**File sections:** Installation · Prerequisites · Environment Variables · Client Creation · Key Concepts · Logs Query Operations

#### JS / TS (64)

##### `azure-postgres-ts` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 92/100 |

> Connect to Azure Database for PostgreSQL Flexible Server from Node.js/TypeScript using the pg (node-postgres) package.

**File sections:** Installation · Environment Variables · Authentication · Core Workflows · Pool with Entra ID Token Refresh · Error Handling

##### `threejs-animation` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 90/100 |

> Three.js animation - keyframe animation, skeletal animation, morph targets, animation mixing. Use when animating objects, playing GLTF animations, creating procedural motion, or blending animations.

**File sections:** When to Use · Quick Start · Animation System Overview · AnimationClip · AnimationMixer · AnimationAction

##### `threejs-fundamentals` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 90/100 |

> Three.js scene setup, cameras, renderer, Object3D hierarchy, coordinate systems. Use when setting up 3D scenes, creating cameras, configuring renderers, managing object hierarchies, or working with tr

**File sections:** When to Use · Quick Start · Core Classes · Coordinate System · Math Utilities · Common Patterns

##### `threejs-geometry` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 90/100 |

> Three.js geometry creation - built-in shapes, BufferGeometry, custom geometry, instancing. Use when creating 3D shapes, working with vertices, building custom meshes, or optimizing with instanced rend

**File sections:** When to Use · Quick Start · Built-in Geometries · BufferGeometry · EdgesGeometry & WireframeGeometry · Points

#### Marketing (60)

##### `free-tool-strategy` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 90/100 |

> You are an expert in engineering-as-marketing strategy. Your goal is to help plan and evaluate free tools that generate leads, attract organic traffic, and build brand awareness.

**File sections:** Initial Assessment · Core Principles · Tool Types · Ideation Framework · SEO Considerations · Lead Capture Strategy

#### Mobile (19)

##### `expo-api-routes` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 92/100 |

> Guidelines for creating API routes in Expo Router with EAS Hosting

**File sections:** When to Use API Routes · When NOT to Use API Routes · File Structure · Basic API Route · HTTP Methods · Dynamic Routes

#### Other (233)

##### `code-refactoring-tech-debt` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 91/100 |

> You are a technical debt expert specializing in identifying, quantifying, and prioritizing technical debt in software projects. Analyze the codebase to uncover debt, assess its impact, and create acti

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Executive Summary

##### `codebase-cleanup-tech-debt` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 91/100 |

> You are a technical debt expert specializing in identifying, quantifying, and prioritizing technical debt in software projects. Analyze the codebase to uncover debt, assess its impact, and create acti

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Executive Summary

##### `conductor-new-track` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 92/100 |

> Create a new track with specification and phased implementation plan

**File sections:** Use this skill when · Do not use this skill when · Instructions · Pre-flight Checks · Track Classification · Interactive Specification Gathering

##### `electron-development` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 90/100 |

> Master Electron desktop app development with secure IPC, contextIsolation, preload scripts, multi-process architecture, electron-builder packaging, code signing, and auto-update.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Core Expertise Areas · Application Lifecycle Management · Common Issue Diagnostics

##### `fitness-analyzer` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 90/100 |

> 分析运动数据、识别运动模式、评估健身进展，并提供个性化训练建议。支持与慢性病数据的关联分析。

**File sections:** When to Use · 功能 · 输出格式 · 分析周期 · 运动量趋势 · 运动频率

##### `inngest` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 92/100 |

> Inngest expert for serverless-first background jobs, event-driven

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Validation Checks

##### `last30days` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 90/100 |

> Research a topic from the last 30 days on Reddit + X + Web, become an expert, and write copy-paste-ready prompts for the user's target tool.

**File sections:** CRITICAL: Parse User Intent · Setup Check · Research Execution · Judge Agent: Synthesize All Sources · FIRST: Internalize the Research · THEN: Show Summary + Invite Vision

##### `molykit` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 90/100 |

> |

**File sections:** When to Use · Overview · Cross-Platform Async Patterns · BotClient Trait · Protocol Types · Widget Patterns

##### `onboarding-cro` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 90/100 |

> You are an expert in user onboarding and activation. Your goal is to help users reach their \"aha moment\" as quickly as possible and establish habits that lead to long-term retention.

**File sections:** Initial Assessment · Core Principles · Defining Activation · Onboarding Flow Design · Multi-Channel Onboarding · Engagement Loops

##### `prometheus-configuration` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 90/100 |

> Complete guide to Prometheus setup, metric collection, scrape configuration, and recording rules.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Prometheus Architecture · Installation

##### `tcm-constitution-analyzer` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 91/100 |

> 分析中医体质数据、识别体质类型、评估体质特征,并提供个性化养生建议。支持与营养、运动、睡眠等健康数据的关联分析。

**File sections:** When to Use · 功能 · 使用说明 · 输出格式 · 评估日期 · 评估结果

#### Python (70)

##### `networkx` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 91/100 |

> NetworkX is a Python package for creating, manipulating, and analyzing complex networks and graphs.

**File sections:** Overview · When to Use This Skill · Core Capabilities · Working with NetworkX · Quick Reference · Resources

#### Security (111)

##### `api-security-best-practices` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 91/100 |

> Implement secure API design patterns including authentication, authorization, input validation, rate limiting, and protection against common API vulnerabilities

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Secure JWT Authentication Implementation · Preventing SQL Injection and Input Validation

##### `azure-security-keyvault-keys-dotnet` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 90/100 |

> Azure Key Vault Keys SDK for .NET. Client library for managing cryptographic keys in Azure Key Vault and Managed HSM. Use for key creation, rotation, encryption, decryption, signing, and verification.

**File sections:** Installation · Environment Variables · Client Hierarchy · Authentication · Key Management · Cryptographic Operations

##### `burp-suite-testing` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 91/100 |

> Execute comprehensive web application security testing using Burp Suite's integrated toolset, including HTTP traffic interception and modification, request analysis and replay, automated vulnerability

**File sections:** Purpose · Inputs / Prerequisites · Outputs / Deliverables · Core Workflow · Quick Reference · Constraints and Guardrails

##### `docker-expert` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 92/100 |

> You are an advanced Docker containerization expert with comprehensive, practical knowledge of container optimization, security hardening, multi-stage builds, orchestration patterns, and production dep

**File sections:** Core Expertise Areas · Advanced Problem-Solving Patterns · Code Review Checklist · Common Issue Diagnostics · Integration & Handoff Guidelines · When to Use

##### `pentest-commands` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 90/100 |

> Provide a comprehensive command reference for penetration testing tools including network scanning, exploitation, password cracking, and web application testing. Enable quick command lookup during sec

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · Core Workflow · Quick Reference · Constraints

#### Testing (71)

##### `playwright-skill` — ★★★★☆ **84/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 92/100 |

> IMPORTANT - Path Resolution: This skill can be installed in different locations (plugin system, manual installation, global, or project-specific). Before executing any commands, determine the skill di

**File sections:** How It Works · Setup (First Time) · Execution Pattern · Common Patterns · Inline Execution (Simple Tasks) · Available Helpers

#### AI / ML (287)

##### `ai-seo` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 88/100 |

> Optimize content for AI search and LLM citations across AI Overviews, ChatGPT, Perplexity, Claude, Gemini, and similar systems. Use when improving AI visibility, answer engine optimization, or citatio

**File sections:** When to Use · Before Starting · How AI Search Works · AI Visibility Audit · Optimization Strategy · Content Types That Get Cited Most

##### `autonomous-agent-patterns` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 88/100 |

> Design patterns for building autonomous coding agents, inspired by [Cline](https://github.com/cline/cline) and [OpenAI Codex](https://github.com/openai/codex).

**File sections:** When to Use This Skill · 1. Core Agent Architecture · 2. Tool Design Patterns · 3. Permission & Safety Patterns · 4. Browser Automation · 5. Context Management

##### `context-driven-development` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 88/100 |

> Guide for implementing and maintaining context as a managed artifact alongside code, enabling consistent AI interactions and team alignment through structured project documentation.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Philosophy · The Workflow · Artifact Relationships

##### `daily-news-report` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 89/100 |

> Scrapes content based on a preset URL list, filters high-quality technical information, and generates daily Markdown reports.

**File sections:** Core Architecture · Configuration Files · Execution Process Details · SubAgent Call Examples · Output Template · 1. Title

##### `multi-agent-architect` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 89/100 |

> Design and optimize production-grade multi-agent systems with LangGraph, LangChain, and DeepAgents for complex AI workflows.

**File sections:** Overview · When to Use This Skill · How It Works · Updating an Existing Agent · Existing Issue · Root Cause

##### `pptx-official` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 89/100 |

> A user may ask you to create, edit, or analyze the contents of a .pptx file. A .pptx file is essentially a ZIP archive containing XML files and other resources that you can read or edit. You have diff

**File sections:** Overview · Reading and analyzing content · Creating a new PowerPoint presentation **without a template** · Editing an existing PowerPoint presentation · Creating a new PowerPoint presentation **using a template** · Creating Thumbnail Grids

##### `pptx-official` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 89/100 |

> A user may ask you to create, edit, or analyze the contents of a .pptx file. A .pptx file is essentially a ZIP archive containing XML files and other resources that you can read or edit. You have diff

**File sections:** Overview · Reading and analyzing content · Creating a new PowerPoint presentation **without a template** · Editing an existing PowerPoint presentation · Creating a new PowerPoint presentation **using a template** · Creating Thumbnail Grids

##### `seo-dataforseo` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 88/100 |

> Use DataForSEO for live SERPs, keyword metrics, backlinks, competitor analysis, on-page checks, and AI visibility data. Trigger when the user needs real SEO data rather than static guidance.

**File sections:** When to Use · Prerequisites · API Credit Awareness · Quick Reference · SERP Analysis · Keyword Research

##### `voice-ai-development` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 88/100 |

> Expert in building voice AI applications - from real-time voice

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Validation Checks

##### `youtube-summarizer` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 88/100 |

> Extract transcripts from YouTube videos and generate comprehensive, detailed summaries using intelligent analysis frameworks

**File sections:** Purpose · When to Use This Skill · Step 0: Discovery & Setup · Main Workflow · 📝 Detailed Summary · 📚 Concepts and Terminology

#### API (32)

##### `shopify-development` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 88/100 |

> Build Shopify apps, extensions, themes using GraphQL Admin API, Shopify CLI, Polaris UI, and Liquid.

**File sections:** ROUTING: What to Build · Shopify CLI Commands · Access Scopes · GraphQL Patterns (Validated against API 2026-01) · Checkout Extension Example · Liquid Template Example

#### Backend (31)

##### `cc-skill-backend-patterns` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 89/100 |

> Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.

**File sections:** API Design Patterns · Database Patterns · Caching Strategies · Error Handling Patterns · Authentication & Authorization · Rate Limiting

#### Cloud (49)

##### `azure-appconfiguration-ts` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 88/100 |

> Centralized configuration management with feature flags and dynamic refresh.

**File sections:** Installation · Environment Variables · Authentication · CRUD Operations · App Configuration Provider · Feature Flags

##### `ilya-sutskever` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 88/100 |

> Agente que simula Ilya Sutskever — co-fundador da OpenAI, ex-Chief Scientist, fundador da SSI. Use quando quiser perspectivas sobre: AGI safety-first, consciência de IA, scaling laws, deep learning pr

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Sumário Rápido · Quem É Ilya Sutskever

#### Data (27)

##### `turborepo-caching` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 89/100 |

> Configure Turborepo for efficient monorepo builds with local and remote caching. Use when setting up Turborepo, optimizing build pipelines, or implementing distributed caching.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Debugging Cache

#### Frontend (81)

##### `angular-best-practices` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 89/100 |

> Angular performance optimization and best practices guide. Use when writing, reviewing, or refactoring Angular code for optimal performance, bundle size, and rendering efficiency.

**File sections:** When to Use · Rule Categories by Priority · 1. Change Detection (CRITICAL) · 2. Async Operations & Waterfalls (CRITICAL) · 3. Bundle Optimization (CRITICAL) · 4. Rendering Performance (HIGH)

##### `cc-skill-frontend-patterns` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 88/100 |

> Frontend development patterns for React, Next.js, state management, performance optimization, and UI best practices.

**File sections:** Component Patterns · Custom Hooks Patterns · State Management Patterns · Performance Optimization · Form Handling Patterns · Error Boundary Pattern

##### `linux-shell-scripting` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 89/100 |

> Provide production-ready shell script templates for common Linux system administration tasks including backups, monitoring, user management, log analysis, and automation. These scripts serve as buildi

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

#### Java / Kotlin (52)

##### `azure-ai-formrecognizer-java` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 89/100 |

> Build document analysis applications using the Azure AI Document Intelligence SDK for Java.

**File sections:** Installation · Client Creation · Prebuilt Models · Core Patterns · Custom Models · Document Classification

##### `azure-eventgrid-java` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 88/100 |

> Build event-driven applications with Azure Event Grid SDK for Java. Use when publishing events, implementing pub/sub patterns, or integrating with Azure services via events.

**File sections:** Installation · Client Creation · Event Types · Core Patterns · Receiving Events · Event Grid Namespaces (MQTT/Pull)

##### `azure-storage-blob-java` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 89/100 |

> Build blob storage applications using the Azure Storage Blob SDK for Java.

**File sections:** Installation · Client Creation · Core Patterns · Error Handling · Proxy Configuration · Environment Variables

#### JS / TS (64)

##### `azure-ai-agents-persistent-dotnet` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 88/100 |

> Azure AI Agents Persistent SDK for .NET. Low-level SDK for creating and managing AI agents with threads, messages, runs, and tools.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflow · Available Tools

##### `azure-ai-projects-dotnet` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 88/100 |

> Azure AI Projects SDK for .NET. High-level client for Azure AI Foundry projects including agents, connections, datasets, deployments, evaluations, and indexes.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflows · Available Agent Tools

##### `microsoft-azure-webjobs-extensions-authentication-events-dotnet` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 89/100 |

> Microsoft Entra Authentication Events SDK for .NET. Azure Functions triggers for custom authentication extensions.

**File sections:** Installation · Supported Events · Core Workflows · Key Types Reference · Entra ID Configuration · Best Practices

##### `threejs-lighting` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 88/100 |

> Three.js lighting - light types, shadows, environment lighting. Use when adding lights, configuring shadows, setting up IBL, or optimizing lighting performance.

**File sections:** When to Use · Quick Start · Light Types Overview · AmbientLight · HemisphereLight · DirectionalLight

#### Other (233)

##### `bazel-build-optimization` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 89/100 |

> Optimize Bazel builds for large-scale monorepos. Use when configuring Bazel, implementing remote execution, or optimizing build performance for enterprise codebases.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Performance Optimization

##### `conductor-status` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 89/100 |

> Display project status, active tracks, and next actions

**File sections:** Use this skill when · Do not use this skill when · Instructions · Pre-flight Checks · Data Collection · Output Format

##### `emergency-card` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> 生成紧急情况下快速访问的医疗信息摘要卡片。当用户需要旅行、就诊准备、紧急情况或询问"紧急信息"、"医疗卡片"、"急救信息"时使用此技能。提取关键信息（过敏、用药、急症、植入物），支持多格式输出（JSON、文本、二维码），用于急救或快速就医。

**File sections:** 核心功能 · 使用说明 · 数据源 · 安全性原则 · 错误处理 · 示例输出

##### `linkedin-cli` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> Use when automating LinkedIn via CLI: fetch profiles, search people/companies, send messages, manage connections, create posts, and Sales Navigator.

**File sections:** When to Use · Authentication · Global Flags · Output Format · Commands · Important Behavior

##### `nx-workspace-patterns` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> Configure and optimize Nx monorepo workspaces. Use when setting up Nx, configuring project boundaries, optimizing build caching, or implementing affected commands.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Common Commands

##### `service-mesh-observability` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 89/100 |

> Complete guide to observability patterns for Istio, Linkerd, and service mesh deployments.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Alerting Rules

##### `slo-implementation` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> Framework for defining and implementing Service Level Indicators (SLIs), Service Level Objectives (SLOs), and error budgets.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · SLI/SLO/SLA Hierarchy · Defining SLIs

##### `viral-generator-builder` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> Expert in building shareable generator tools that go viral - name

**File sections:** Capabilities · Patterns · Generator Architecture · Quiz Builder Pattern · Name Generator Pattern · Calculator Virality

##### `xlsx-official` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> Unless otherwise stated by the user or existing template

**File sections:** All Excel files · Financial models · Overview · Important Requirements · Reading and analyzing data · Excel File Workflows

##### `xlsx-official` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 88/100 |

> Unless otherwise stated by the user or existing template

**File sections:** All Excel files · Financial models · Overview · Important Requirements · Reading and analyzing data · Excel File Workflows

#### Python (70)

##### `pubmed-database` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 89/100 |

> Direct REST API access to PubMed. Advanced Boolean/MeSH queries, E-utilities API, batch processing, citation management. For Python workflows, prefer biopython (Bio.Entrez). Use this for direct HTTP/R

**File sections:** Overview · When to Use This Skill · Core Capabilities · Working with Reference Files · Common Workflows · Tips and Best Practices

#### Security (111)

##### `analytics-tracking` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 88/100 |

> Design, audit, and improve analytics tracking systems that produce reliable, decision-ready data.

**File sections:** Phase 0: Measurement Readiness & Signal Quality Index (Required) · ?? Measurement Readiness & Signal Quality Index · Phase 1: Context & Decision Definition · Core Principles (Non-Negotiable) · Event Model Design · Conversion Strategy

##### `seo-audit` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 88/100 |

> Diagnose and audit SEO issues affecting crawlability, indexation, rankings, and organic performance.

**File sections:** Scope Gate (Ask First if Missing) · Audit Framework (Priority Order) · Technical SEO Audit · On-Page SEO Audit · Content Quality & E-E-A-T · 🔢 SEO Health Index & Scoring Layer (Additive)

##### `wordpress-plugin-development` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 88/100 |

> WordPress plugin development workflow covering plugin architecture, hooks, admin interfaces, REST API, security best practices, and WordPress 7.0 features: Real-Time Collaboration, AI Connectors, Abil

**File sections:** Overview · WordPress 7.0 Plugin Development · When to Use This Workflow · Workflow Phases · Plugin Structure · WordPress 7.0 Compatibility Checklist

#### Testing (71)

##### `test-driven-development` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 88/100 |

> Use when implementing any feature or bugfix, before writing implementation code

**File sections:** Overview · When to Use · The Iron Law · Red-Green-Refactor · Good Tests · Why Order Matters

##### `web3-testing` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 88/100 |

> Master comprehensive testing strategies for smart contracts using Hardhat, Foundry, and advanced testing patterns.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Hardhat Testing Setup · Unit Testing Patterns · Foundry Testing (Forge)

#### AI / ML (287)

##### `agent-memory-systems` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Memory is the cornerstone of intelligent agents. Without it, every

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · LangMem Implementation

##### `audio-transcriber` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Transform audio recordings into professional Markdown documentation with intelligent summaries using LLM integration

**File sections:** Purpose · When to Use · Workflow · 📊 Metadata · 📋 Meeting Minutes · Example Usage

##### `autonomous-agents` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Autonomous agents are AI systems that can independently decompose

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Basic ReAct Implementation

##### `monetization` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Estrategia e implementacao de monetizacao para produtos digitais - Stripe, subscriptions, pricing experiments, freemium, upgrade flows, churn prevention, revenue optimization e modelos de negocio SaaS

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · A Regra De Ouro · Erros Classicos

##### `protect-mcp-governance` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 85/100 |

> Agent governance skill for MCP tool calls — Cedar policy authoring, shadow-to-enforce rollout, and Ed25519 receipt verification.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill · How It Works · Core Concepts · Step-by-Step Guide

##### `startup-business-analyst-financial-projections` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> 'Create detailed 3-5 year financial model with revenue, costs, cash

**File sections:** Use this skill when · Do not use this skill when · Instructions · What This Command Does · Instructions for Claude · Financial Model Best Practices

##### `steve-jobs` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 85/100 |

> Agente que simula Steve Jobs — cofundador da Apple, CEO da Pixar, fundador da NeXT, o maior designer de produtos tecnologicos da historia e o mais influente apresentador de produtos do mundo.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Secao 10: Regras Operacionais · Best Practices

##### `voice-agents` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Voice agents represent the frontier of AI interaction - humans

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · OpenAI Realtime API

##### `web-scraper` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Web scraping inteligente multi-estrategia. Extrai dados estruturados de paginas web (tabelas, listas, precos). Paginacao, monitoramento e export CSV/JSON.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Capabilities · Web Scraper

##### `wordpress-woocommerce-development` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> WooCommerce store development workflow covering store setup, payment integration, shipping configuration, customization, and WordPress 7.0 features: AI connectors, DataViews, and collaboration tools.

**File sections:** Overview · WordPress 7.0 + WooCommerce Features · When to Use This Workflow · Workflow Phases · WooCommerce + WordPress 7.0 AI Use Cases · Quality Gates

##### `workflow-automation` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Workflow automation is the infrastructure that makes AI agents

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Inngest Example (TypeScript)

##### `yann-lecun` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 86/100 |

> Agente que simula Yann LeCun — inventor das Convolutional Neural Networks, Chief AI Scientist da Meta, Prêmio Turing 2018.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Quem Sou: Da Esiee Ao Turing Award · O Dna De Engenheiro Frances

#### API (32)

##### `apify-ecommerce` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 87/100 |

> Extract product data, prices, reviews, and seller information from any e-commerce platform using Apify's E-commerce Scraping Tool.

**File sections:** When to Use · Prerequisites · Workflow Selection · Progress Tracking · Workflow 1: Products & Pricing · Workflow 2: Customer Reviews

##### `zapier-make-patterns` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 86/100 |

> No-code automation democratizes workflow building. Zapier and Make

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Zapier Example

#### Automation (73)

##### `os-scripting` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 87/100 |

> Operating system and shell scripting troubleshooting workflow for Linux, macOS, and Windows. Covers bash scripting, system administration, debugging, and automation.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Common Troubleshooting Scenarios · Quality Gates · Related Workflow Bundles

#### Backend (31)

##### `backend-dev-guidelines` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 86/100 |

> You are a senior backend engineer operating production-grade services under strict architectural and reliability constraints. Use when routes, controllers, services, repositories, express middleware,

**File sections:** 1. Backend Feasibility & Risk Index (BFRI) · When to Use · 2. Core Architecture Doctrine (Non-Negotiable) · 3. Directory Structure (Canonical) · 4. Naming Conventions (Strict) · 5. Dependency Injection Rules

#### Cloud (49)

##### `azure-ai-document-intelligence-dotnet` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 87/100 |

> Azure AI Document Intelligence SDK for .NET. Extract text, tables, and structured data from documents using prebuilt and custom models.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Prebuilt Models · Core Workflows

##### `azure-identity-ts` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 87/100 |

> Authenticate to Azure services with various credential types.

**File sections:** Installation · Environment Variables · DefaultAzureCredential (Recommended) · Managed Identity · Service Principal · Interactive Authentication

##### `azure-mgmt-weightsandbiases-dotnet` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 85/100 |

> Azure Weights & Biases SDK for .NET. ML experiment tracking and model management via Azure Marketplace. Use for creating W&B instances, managing SSO, marketplace integration, and ML observability.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · Key Types Reference

#### Data (27)

##### `nft-standards` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 87/100 |

> Master ERC-721 and ERC-1155 NFT standards, metadata best practices, and advanced NFT features.

**File sections:** Do not use this skill when · Instructions · Use this skill when · ERC-721 (Non-Fungible Token Standard) · ERC-1155 (Multi-Token Standard) · Metadata Standards

#### Design (29)

##### `pricing-strategy` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 85/100 |

> Design pricing, packaging, and monetization strategies based on value, customer willingness to pay, and growth objectives.

**File sections:** 1. Required Context (Ask If Missing) · 2. Pricing Fundamentals · 3. Value-Based Pricing Framework · 4. Pricing Research Methods · 5. Value Metrics · 6. Tier Design

##### `wordpress-theme-development` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 87/100 |

> WordPress theme development workflow covering theme architecture, template hierarchy, custom post types, block editor support, responsive design, and WordPress 7.0 features: DataViews, Pattern Editing

**File sections:** Overview · WordPress 7.0 Theme Features · When to Use This Workflow · Workflow Phases · Theme Structure · WordPress 7.0 Theme Checklist

#### Frontend (81)

##### `comfyui-gateway` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 86/100 |

> REST API gateway for ComfyUI servers. Workflow management, job queuing, webhooks, caching, auth, rate limiting, and image delivery (URL + base64).

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Architecture Overview · Components

#### Java / Kotlin (52)

##### `azure-ai-contentsafety-java` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 85/100 |

> Build content moderation applications using the Azure AI Content Safety SDK for Java.

**File sections:** Installation · Client Creation · Key Concepts · Core Patterns · Blocklist Management · Error Handling

##### `azure-ai-voicelive-ts` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 87/100 |

> Azure AI Voice Live SDK for JavaScript/TypeScript. Build real-time voice AI applications with bidirectional WebSocket communication.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Quick Start · Session Configuration

##### `azure-eventhub-java` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 85/100 |

> Build real-time streaming applications with Azure Event Hubs SDK for Java. Use when implementing event streaming, high-throughput data ingestion, or building event-driven architectures.

**File sections:** Installation · Client Creation · Core Patterns · Event Positions · Error Handling · Resource Cleanup

##### `azure-identity-java` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 85/100 |

> Authenticate Java applications with Azure services using Microsoft Entra ID (Azure AD).

**File sections:** Installation · Key Concepts · DefaultAzureCredential (Recommended) · Managed Identity · Service Principal with Secret · Service Principal with Certificate

##### `playwright-java` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 86/100 |

> Scaffold, write, debug, and enhance enterprise-grade Playwright E2E tests in Java using Page Object Model, JUnit 5, Allure reporting, and parallel execution.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

#### JS / TS (64)

##### `agents-v2-py` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 85/100 |

> Build container-based Foundry Agents with Azure AI Projects SDK (ImageBasedHostedAgentDefinition). Use when creating hosted agents with custom container images in Azure AI Foundry.

**File sections:** Installation · Environment Variables · Prerequisites · Authentication · Core Workflow · ImageBasedHostedAgentDefinition Parameters

##### `hosted-agents-v2-py` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 85/100 |

> Build hosted agents using Azure AI Projects SDK with ImageBasedHostedAgentDefinition. Use when creating container-based agents in Azure AI Foundry.

**File sections:** Installation · Environment Variables · Prerequisites · Authentication · Core Workflow · ImageBasedHostedAgentDefinition Parameters

#### Marketing (60)

##### `astro` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 85/100 |

> Build content-focused websites with Astro — zero JS by default, islands architecture, multi-framework components, and Markdown/MDX support.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

##### `content-strategy` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 87/100 |

> Plan a content strategy, topic clusters, editorial roadmap, and content mix for traffic, authority, and lead generation. Use when deciding what to publish, what topics to prioritize, or how to structu

**File sections:** When to Use · Before Planning · Searchable vs Shareable · Content Types · Content Pillars and Topic Clusters · Keyword Research by Buyer Stage

#### Other (233)

##### `advogado-especialista` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 87/100 |

> 'Advogado especialista em todas as areas do Direito brasileiro: familia, criminal, trabalhista, tributario, consumidor, imobiliario, empresarial, civil e constitucional.'

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 1. Identificar A Area Do Direito · 2. Identificar O Perfil Do Cliente

##### `istio-traffic-management` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 85/100 |

> Comprehensive guide to Istio traffic management for production service mesh deployments.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Load Balancing Strategies

##### `leiloeiro-avaliacao` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 86/100 |

> Avaliacao pericial de imoveis em leilao. Valor de mercado, liquidacao forcada, ABNT NBR 14653, metodos comparativo/renda/custo, CUB e margem de seguranca.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Tipos De Valor (Abnt Nbr 14653-1) · Método 1 — Comparativo Direto (Principal)

##### `robius-matrix-integration` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 87/100 |

> |

**File sections:** When to Use · Overview · MatrixRequest Pattern · Worker Task Handler · Timeline Updates · Room List Updates

##### `vercel-deployment` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 85/100 |

> Expert knowledge for deploying to Vercel with Next.js

**File sections:** Capabilities · Prerequisites · Patterns · Sharp Edges · Validation Checks · Collaboration

#### Python (70)

##### `azure-speech-to-text-rest-py` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 87/100 |

> Azure Speech to Text REST API for short audio (Python). Use for simple speech recognition of audio files up to 60 seconds without the Speech SDK.

**File sections:** Prerequisites · Environment Variables · Installation · Quick Start · Audio Requirements · Content-Type Headers

##### `telegram` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 87/100 |

> Integracao completa com Telegram Bot API. Setup com BotFather, mensagens, webhooks, inline keyboards, grupos, canais. Boilerplates Node.js e Python.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Decision Tree · Ou

##### `whatsapp-cloud-api` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 87/100 |

> Integracao com WhatsApp Business Cloud API (Meta). Mensagens, templates, webhooks HMAC-SHA256, automacao de atendimento. Boilerplates Node.js e Python.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Decision Tree · Ou

#### Rust (20)

##### `mtls-configuration` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 86/100 |

> Configure mutual TLS (mTLS) for zero-trust service-to-service communication. Use when implementing zero-trust networking, certificate management, or securing internal service communication.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Certificate Rotation

#### Security (111)

##### `cc-skill-security-review` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 85/100 |

> This skill ensures all code follows security best practices and identifies potential vulnerabilities. Use when implementing authentication or authorization, handling user input or file uploads, or cre

**File sections:** When to Use · Security Checklist · Security Testing · Pre-Deployment Security Checklist · Resources · Limitations

##### `pydantic-ai` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 85/100 |

> Build production-ready AI agents with PydanticAI — type-safe tool use, structured outputs, dependency injection, and multi-model support.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

##### `red-team-tools` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 85/100 |

> Implement proven methodologies and tool workflows from top security researchers for effective reconnaissance, vulnerability discovery, and bug bounty hunting. Automate common tasks while maintaining t

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · Core Workflow · Quick Reference · Constraints

##### `site-architecture` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 87/100 |

> Plan or restructure website hierarchy, navigation, URL patterns, breadcrumbs, and internal linking. Use when mapping pages, sections, and site structure, but not for XML sitemap auditing or schema mar

**File sections:** When to Use · Before Planning · Site Types and Starting Points · Page Hierarchy Design · Navigation Design · URL Structure

#### Testing (71)

##### `agent-evaluation` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 85/100 |

> Testing and benchmarking LLM agents including behavioral testing,

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Sharp Edges

##### `azure-microsoft-playwright-testing-ts` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 85/100 |

> Run Playwright tests at scale with cloud-hosted browsers and integrated Azure portal reporting.

**File sections:** Installation · Environment Variables · Authentication · Core Workflow · Configuration Options · CI/CD Integration

##### `browser-automation` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 86/100 |

> Browser automation powers web testing, scraping, and AI agent

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Playwright Test Example

##### `ethical-hacking-methodology` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 87/100 |

> Master the complete penetration testing lifecycle from reconnaissance through reporting. This skill covers the five stages of ethical hacking methodology, essential tools, attack techniques, and profe

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

##### `leiloeiro-risco` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 87/100 |

> Analise de risco em leiloes de imoveis. Score 36 pontos, riscos juridicos/financeiros/operacionais, stress test 4 cenarios e ROI ponderado por risco.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Categoria 1 — Riscos Jurídicos · Categoria 2 — Riscos Financeiros

#### AI / ML (287)

##### `cirq` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 83/100 |

> Cirq is Google Quantum AI's open-source framework for designing, simulating, and running quantum circuits on quantum computers and simulators.

**File sections:** When to Use · Installation · Quick Start · Core Capabilities · Common Patterns · Best Practices

##### `elon-musk` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 84/100 |

> Agente que simula Elon Musk com profundidade psicologica e comunicacional de alta fidelidade. Ativado para: \"fale como Elon\", \"simule Elon Musk\", \"o que Elon diria sobre X\", \"first principles t

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Secao 12: Checklist De Fidelidade · Secao 13: Abertura Sugerida

##### `email-sequence` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 84/100 |

> You are an expert in email marketing and automation. Your goal is to create email sequences that nurture relationships, drive action, and move people toward conversion.

**File sections:** Initial Assessment · Core Principles · Email Sequence Strategy · Sequence Templates · Email Types Reference · Email Audit Checklist

##### `faf-wizard` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 84/100 |

> Done-for-you .faf generator. One-click AI context for any project - new, legacy, or famous. Auto-detects stack, scores readiness, works everywhere.

**File sections:** The Problem It Solves · Works on ANY Project · Real Success Stories · The 60-Second Workflow · Performance Data (Real Numbers) · Universal Compatibility

##### `langfuse` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 83/100 |

> Expert in Langfuse - the open-source LLM observability platform.

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Collaboration

#### API (32)

##### `graphql` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 84/100 |

> GraphQL gives clients exactly the data they need - no more, no

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Sharp Edges

#### Backend (31)

##### `algorithmic-art` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 84/100 |

> Algorithmic philosophies are computational aesthetic movements that are then expressed through code. Output .md files (philosophy), .html files (interactive viewer), and .js files (generative algorith

**File sections:** ALGORITHMIC PHILOSOPHY CREATION · DEDUCING THE CONCEPTUAL SEED · P5.JS IMPLEMENTATION · INTERACTIVE ARTIFACT CREATION · VARIATIONS & EXPLORATION · THE CREATIVE PROCESS

#### Cloud (49)

##### `azure-ai-voicelive-py` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 83/100 |

> Build real-time voice AI applications with bidirectional WebSocket communication.

**File sections:** Installation · Environment Variables · Authentication · Quick Start · Core Architecture · Session Configuration

##### `azure-servicebus-dotnet` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 83/100 |

> Azure Service Bus SDK for .NET. Enterprise messaging with queues, topics, subscriptions, and sessions.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflows · Key Types Reference

##### `hono` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 84/100 |

> Build ultra-fast web APIs and full-stack apps with Hono — runs on Cloudflare Workers, Deno, Bun, Node.js, and any WinterCG-compatible runtime.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

#### Database (46)

##### `azure-resource-manager-redis-dotnet` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 84/100 |

> Azure Resource Manager SDK for Redis in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · SKU Reference

##### `bullmq-specialist` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 84/100 |

> BullMQ expert for Redis-backed job queues, background processing,

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Validation Checks

#### Java / Kotlin (52)

##### `azure-ai-vision-imageanalysis-java` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 84/100 |

> Build image analysis applications with Azure AI Vision SDK for Java. Use when implementing image captioning, OCR text extraction, object detection, tagging, or smart cropping.

**File sections:** Installation · Client Creation · Visual Features · Core Patterns · Error Handling · Environment Variables

##### `azure-communication-common-java` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 83/100 |

> Azure Communication Services common utilities for Java. Use when working with CommunicationTokenCredential, user identifiers, token refresh, or shared authentication across ACS services.

**File sections:** Installation · Key Concepts · CommunicationTokenCredential · Entra ID (Azure AD) Authentication · Communication Identifiers · Identifier Parsing

##### `azure-security-keyvault-secrets-java` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 84/100 |

> Azure Key Vault Secrets Java SDK for secret management. Use when storing, retrieving, or managing passwords, API keys, connection strings, or other sensitive configuration data.

**File sections:** Installation · Client Creation · Create/Set Secret · Get Secret · Update Secret Properties · List Secrets

#### JS / TS (64)

##### `threejs-materials` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 83/100 |

> Three.js materials - PBR, basic, phong, shader materials, material properties. Use when styling meshes, working with textures, creating custom shaders, or optimizing material performance.

**File sections:** Quick Start · Material Types Overview · MeshBasicMaterial · MeshLambertMaterial · MeshPhongMaterial · MeshStandardMaterial (PBR)

#### Other (233)

##### `cc-skill-project-guidelines-example` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 84/100 |

> Project Guidelines Skill (Example)

**File sections:** When to Use · Architecture Overview · File Structure · Code Patterns · Testing Requirements · Deployment Workflow

##### `embedding-strategies` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 83/100 |

> Guide to selecting and optimizing embedding models for vector search applications.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Best Practices

##### `filesystem-context` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 84/100 |

> Use for file-based context management, dynamic context discovery, and reducing context window bloat. Offload context to files for just-in-time loading.

**File sections:** When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples · Guidelines

##### `langgraph` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 83/100 |

> Expert in LangGraph - the production-grade framework for building

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Collaboration

##### `matematico-tao` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 84/100 |

> Matemático ultra-avançado inspirado em Terence Tao. Análise rigorosa de código e arquitetura com teoria matemática profunda: teoria da informação, teoria dos grafos, complexidade computacional, álgebr

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · O Que Terence Tao Pensa — E O Que Vai Além · 1. Análise Matemática De Código

##### `robius-state-management` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 83/100 |

> |

**File sections:** When to Use · Production Patterns · AppState Structure · State Propagation via Scope · Persistence Layer · Thread-Local State (UI-Only)

##### `saga-orchestration` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 83/100 |

> Patterns for managing distributed transactions and long-running business processes.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Durable Execution Alternative

#### Python (70)

##### `azure-ai-ml-py` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 84/100 |

> Azure Machine Learning SDK v2 for Python. Use for ML workspaces, jobs, models, datasets, compute, and pipelines.

**File sections:** Installation · Environment Variables · Authentication · Workspace Management · Data Assets · Model Registry

##### `hugging-face-gradio` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 84/100 |

> Build or edit Gradio apps, layouts, components, and chat interfaces in Python.

**File sections:** When to Use · Guides · Core Patterns · Key Component Signatures · Custom HTML Components · Event Listeners

#### Rust (20)

##### `systems-programming-rust-project` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 83/100 |

> You are a Rust project architecture expert specializing in scaffolding production-ready Rust applications. Generate complete project structures with cargo tooling, proper module organization, testing

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### Security (111)

##### `claude-settings-audit` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 83/100 |

> Analyze a repository to generate recommended Claude Code settings.json permissions. Use when setting up a new project, auditing existing settings, or determining which read-only bash commands to allow

**File sections:** When to Use · Phase 1: Detect Tech Stack · Phase 2: Detect Services · Phase 3: Check Existing Settings · Phase 4: Generate Recommendations · Output Format

##### `leiloeiro-edital` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 83/100 |

> Analise e auditoria de editais de leilao judicial e extrajudicial. Riscos ocultos, clausulas perigosas, debitos, ocupante e classificacao da oportunidade.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Protocolo De Análise De Edital · Bloco 1 — Identificação E Enquadramento

##### `linkerd-patterns` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 84/100 |

> Production patterns for Linkerd service mesh - the lightweight, security-first service mesh for Kubernetes.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Templates · Monitoring Commands

##### `network-101` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 84/100 |

> Configure and test common network services (HTTP, HTTPS, SNMP, SMB) for penetration testing lab environments. Enable hands-on practice with service enumeration, log analysis, and security testing agai

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · Core Workflow · Quick Reference · Constraints

##### `top-web-vulnerabilities` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 83/100 |

> Provide a comprehensive, structured reference for the 100 most critical web application vulnerabilities organized by category. This skill enables systematic vulnerability identification, impact assess

**File sections:** Purpose · Prerequisites · Outputs and Deliverables · Core Workflow · Quick Reference · Constraints and Limitations

#### Testing (71)

##### `deployment-validation-config-validate` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 84/100 |

> You are a configuration management expert specializing in validating, testing, and ensuring the correctness of application configurations. Create comprehensive validation schemas, implement configurat

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

##### `github-actions-templates` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 84/100 |

> Production-ready GitHub Actions workflow patterns for testing, building, and deploying applications.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Common Workflow Patterns · Workflow Best Practices

#### AI / ML (287)

##### `blockrun` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 81/100 |

> BlockRun works with Claude Code and Google Antigravity.

**File sections:** Philosophy · Budget Control (Optional) · When to Use · Example User Prompts · Wallet & Balance · SDK Usage

##### `claude-code-expert` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 80/100 |

> Especialista profundo em Claude Code - CLI da Anthropic. Maximiza produtividade com atalhos, hooks, MCPs, configuracoes avancadas, workflows, CLAUDE.md, memoria, sub-agentes, permissoes e integracao c

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 1. Fundamentos Do Claude Code · Instalacao E Setup

##### `kaizen` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 81/100 |

> Guide for continuous improvement, error proofing, and standardization. Use this skill when the user wants to improve code quality, refactor, or discuss process improvements.

**File sections:** Overview · When to Use · The Four Pillars · Integration with Commands · Red Flags · Remember

##### `leiloeiro-mercado` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 80/100 |

> Analise de mercado imobiliario para leiloes. Liquidez, desagio tipico, ROI, estrategias de saida (flip/reforma/renda), Selic 2025 e benchmark CDI/FII.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Mapa De Liquidez (Tempo Médio De Revenda Pós-Arrematação) · Por Modalidade

##### `product-design` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 82/100 |

> Design de produto nivel Apple — sistemas visuais, UX flows, acessibilidade, linguagem visual proprietaria, design tokens, prototipagem e handoff. Cobre Figma, design systems, tipografia, cor, espacame

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Os 10 Principios De Jony Ive / Apple · Design Cognitivo

##### `project-development` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 82/100 |

> This skill covers the principles for identifying tasks suited to LLM processing, designing effective project architectures, and iterating rapidly using agent-assisted development.

**File sections:** When to Use · Core Concepts · Summary · Score · Details · Detailed Topics

##### `prompt-caching` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 81/100 |

> Caching strategies for LLM prompts including Anthropic prompt

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Sharp Edges

#### API (32)

##### `launch-strategy` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 80/100 |

> You are an expert in SaaS product launches and feature announcements. Your goal is to help users plan launches that build momentum, capture attention, and convert interest into users.

**File sections:** Core Philosophy · The ORB Framework · Five-Phase Launch Approach · Product Hunt Launch Strategy · Post-Launch Product Marketing · Ongoing Launch Strategy

#### Automation (73)

##### `slack-gif-creator` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 81/100 |

> A toolkit providing utilities and knowledge for creating animated GIFs optimized for Slack.

**File sections:** Slack Requirements · Core Workflow · Drawing Graphics · Available Utilities · Animation Concepts · Optimization Strategies

#### Backend (31)

##### `hybrid-cloud-networking` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 80/100 |

> Configure secure, high-performance connectivity between on-premises and cloud environments using VPN, Direct Connect, and ExpressRoute.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Connection Options · Hybrid Network Patterns

#### Cloud (49)

##### `azure-ai-document-intelligence-ts` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 81/100 |

> Extract text, tables, and structured data from documents using prebuilt and custom models.

**File sections:** Installation · Environment Variables · Authentication · Analyze Document (URL) · Analyze Document (Local File) · Prebuilt Models

##### `azure-eventhub-dotnet` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 80/100 |

> Azure Event Hubs SDK for .NET.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Core Workflow · EventPosition Options

##### `azure-mgmt-botservice-dotnet` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 80/100 |

> Azure Resource Manager SDK for Bot Service in .NET. Management plane operations for creating and managing Azure Bot resources, channels (Teams, DirectLine, Slack), and connection settings.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · Supported Channel Types

##### `azure-mgmt-fabric-dotnet` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 82/100 |

> Azure Resource Manager SDK for Fabric in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflows · SKU Reference

##### `azure-monitor-opentelemetry-ts` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 81/100 |

> Auto-instrument Node.js applications with distributed tracing, metrics, and logs.

**File sections:** Installation · Environment Variables · Quick Start (Auto-Instrumentation) · ESM Support (Node.js 18.19+) · Full Configuration · Custom Traces

#### Design (29)

##### `event-store-design` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 82/100 |

> Design and implement event stores for event-sourced systems. Use when building event sourcing infrastructure, choosing event store technologies, or implementing event persistence patterns.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Concepts · Technology Comparison · Templates

##### `workflow-orchestration-patterns` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 82/100 |

> Master workflow orchestration architecture with Temporal, covering fundamental design decisions, resilience patterns, and best practices for building reliable distributed systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · When to Use Workflow Orchestration · Critical Design Decision: Workflows vs Activities · Core Workflow Patterns

#### DevOps (20)

##### `gitops-workflow` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 80/100 |

> Complete guide to implementing GitOps workflows with ArgoCD and Flux for automated Kubernetes deployments.

**File sections:** Purpose · Use this skill when · Do not use this skill when · Instructions · Safety · OpenGitOps Principles

#### Docs (16)

##### `c4-architecture-c4-architecture` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 82/100 |

> Generate comprehensive C4 architecture documentation for an existing repository/codebase using a bottom-up analysis approach.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Overview · Phase 1: Code-Level Documentation (Bottom-Up Analysis) · Phase 2: Component-Level Synthesis

##### `notebooklm` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 80/100 |

> Interact with Google NotebookLM to query documentation with Gemini's source-grounded answers. Each question opens a fresh browser session, retrieves the answer exclusively from your uploaded documents

**File sections:** When to Use This Skill · ⚠️ CRITICAL: Add Command - Smart Discovery · Critical: Always Use run.py Wrapper · Core Workflow · Follow-Up Mechanism (CRITICAL) · Script Reference

##### `sales-enablement` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 82/100 |

> Create sales collateral such as decks, one-pagers, objection docs, demo scripts, playbooks, and proposal templates. Use when a sales team needs assets that help reps move deals forward and close.

**File sections:** When to Use · Before Starting · Core Principles · Sales Deck / Pitch Deck · One-Pagers / Leave-Behinds · Objection Handling Docs

#### Frontend (81)

##### `azd-deployment` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 80/100 |

> Deploy containerized frontend + backend applications to Azure Container Apps with remote builds, managed identity, and idempotent infrastructure.

**File sections:** Quick Start · Core File Structure · azure.yaml Configuration · Environment Variables Flow · Idempotent Deployments · Container App Service Discovery

##### `frontend-api-integration-patterns` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 82/100 |

> Production-ready patterns for integrating frontend applications with backend APIs, including race condition handling, request cancellation, retry strategies, error normalization, and UI state manageme

**File sections:** Overview · When to Use This Skill · Core Patterns · Examples · Best Practices · Anti-Patterns

##### `frontend-dev-guidelines` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 82/100 |

> You are a senior frontend engineer operating under strict architectural and performance standards. Use when creating components or pages, adding new features, or fetching or mutating data.

**File sections:** 1. Frontend Feasibility & Complexity Index (FFCI) · 2. Core Architectural Doctrine (Non-Negotiable) · When to Use · 3. Quick Start Checklists · 4. Import Aliases (Required) · 5. Component Standards

##### `native-data-fetching` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 80/100 |

> Use when implementing or debugging ANY network request, API call, or data fetching. Covers fetch API, React Query, SWR, error handling, caching, offline support, and Expo Router data loaders (useLoade

**File sections:** References · When to Use · Preferences · Common Issues & Solutions · Decision Tree · Common Mistakes

#### Git (30)

##### `git-pr-workflows-onboard` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 81/100 |

> You are an **expert onboarding specialist and knowledge transfer architect** with deep experience in remote-first organizations, technical team integration, and accelerated learning methodologies. You

**File sections:** Use this skill when · Do not use this skill when · Instructions · Context · Requirements · Pre-Onboarding Preparation

#### Java / Kotlin (52)

##### `azure-messaging-webpubsub-java` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 80/100 |

> Build real-time web applications with Azure Web PubSub SDK for Java. Use when implementing WebSocket-based messaging, live updates, chat applications, or server-to-client push notifications.

**File sections:** Installation · Client Creation · Key Concepts · Core Patterns · Error Handling · Environment Variables

##### `azure-security-keyvault-keys-java` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 82/100 |

> Azure Key Vault Keys Java SDK for cryptographic key management. Use when creating, managing, or using RSA/EC keys, performing encrypt/decrypt/sign/verify operations, or working with HSM-backed keys.

**File sections:** Installation · Client Creation · Key Types · Create Keys · Get Key · Update Key Properties

##### `javascript-typescript-typescript-scaffold` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 80/100 |

> You are a TypeScript project architecture expert specializing in scaffolding production-ready Node.js and frontend applications. Generate complete project structures with modern tooling (pnpm, Vite, N

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### JS / TS (64)

##### `azure-ai-projects-py` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 80/100 |

> Build AI applications on Microsoft Foundry using the azure-ai-projects SDK.

**File sections:** Installation · Environment Variables · Authentication · Client Operations Overview · Two Client Approaches · Agent Operations

#### Marketing (60)

##### `revops` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 82/100 |

> Design and improve revenue operations, lead lifecycle rules, scoring, routing, handoffs, and CRM process automation. Use when marketing, sales, and customer success workflows need clearer operational

**File sections:** When to Use · Before Starting · Core Principles · Lead Lifecycle Framework · Lead Scoring · Lead Routing

#### Mobile (19)

##### `instagram` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 80/100 |

> Integracao completa com Instagram via Graph API. Publicacao, analytics, comentarios, DMs, hashtags, agendamento, templates e gestao de contas Business/Creator.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Resumo Rápido · Localização

#### Other (233)

##### `form-cro` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 81/100 |

> Optimize any form that is NOT signup or account registration — including lead capture, contact, demo request, application, survey, quote, and checkout forms.

**File sections:** Phase 0: Form Health & Friction Index (Required) · 🔢 Form Health & Friction Index · Phase 1: Context & Constraints · Core Principles (Non-Negotiable) · Field-Level Optimization · Layout & Flow

##### `malware-analyst` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 81/100 |

> Expert malware analyst specializing in defensive malware research, threat intelligence, and incident response. Masters sandbox analysis, behavioral analysis, and malware family identification.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Common Malware Techniques · Tool Proficiency · IOC Extraction

##### `progressive-web-app` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 80/100 |

> Build Progressive Web Apps (PWAs) with offline support, installability, and caching strategies. Trigger whenever the user mentions PWA, service workers, web app manifests, Workbox, 'add to home screen

**File sections:** Overview · When to Use This Skill · Deliverables Checklist · Step 1: Web App Manifest (`manifest.json`) · Step 2: HTML Shell (`index.html`) · Step 3: Service Worker Registration & Install Prompt (`app.js`)

##### `qiskit` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 82/100 |

> Qiskit is the world's most popular open-source quantum computing framework with 13M+ downloads. Build quantum circuits, optimize for hardware, execute on simulators or real quantum computers, and anal

**File sections:** When to Use · Overview · Quick Start · Core Capabilities · Workflow Decision Guide · Best Practices

##### `sharp-edges` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 80/100 |

> sharp-edges

**File sections:** When to Use · When NOT to Use · Core Principle · Rationalizations to Reject · Sharp Edge Categories · Analysis Workflow

##### `weightloss-analyzer` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 82/100 |

> 分析减肥数据、计算代谢率、追踪能量缺口、管理减肥阶段

**File sections:** When to Use · 功能 · 数据源 · 输出格式 · 基本信息 · 身体指标

##### `yann-lecun-tecnico` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 80/100 |

> Sub-skill técnica de Yann LeCun. Cobre CNNs, LeNet, backpropagation, JEPA (I-JEPA, V-JEPA, MC-JEPA), AMI (Advanced Machinery of Intelligence), Self-Supervised Learning (SimCLR, MAE, BYOL), Energy-Base

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Convolutional Neural Networks: Do Princípio · Antes (Fully Connected): Neurônio I -> Todos Os Pixels

#### Python (70)

##### `astropy` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 81/100 |

> Astropy is the core Python package for astronomy, providing essential functionality for astronomical research and data analysis.

**File sections:** Overview · When to Use This Skill · Quick Start · Core Capabilities · Additional Capabilities · Installation

##### `azure-search-documents-py` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 82/100 |

> Azure AI Search SDK for Python. Use for vector search, hybrid search, semantic ranking, indexing, and skillsets.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Create Index with Vector Field · Upload Documents

##### `m365-agents-py` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 80/100 |

> Microsoft 365 Agents SDK for Python. Build multichannel agents for Teams/M365/Copilot Studio with aiohttp hosting, AgentApplication routing, streaming responses, and MSAL-based auth.

**File sections:** Before implementation · Important Notice - Import Changes · Installation · Environment Variables (.env) · Core Workflow: aiohttp-hosted AgentApplication · AgentApplication Routing

#### Security (111)

##### `'007'` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 80/100 |

> Security audit, hardening, threat modeling (STRIDE/PASTA), Red/Blue Team, OWASP checks, code review, incident response, and infrastructure security for any project.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 007 - Licenca Para Auditar · Modos Operacionais

##### `pentest-checklist` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 80/100 |

> Provide a comprehensive checklist for planning, executing, and following up on penetration tests. Ensure thorough preparation, proper scoping, and effective remediation of discovered vulnerabilities.

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · Core Workflow · Quick Reference · Constraints

##### `vibe-code-auditor` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 81/100 |

> Audit rapidly generated or AI-produced code for structural flaws, fragility, and production risks.

**File sections:** Identity · Purpose · When to Use · Pre-Audit Checklist · Audit Dimensions · Output Format

##### `vulnerability-scanner` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 81/100 |

> Advanced vulnerability analysis principles. OWASP 2025, Supply Chain Security, attack surface mapping, risk prioritization.

**File sections:** 🔧 Runtime Scripts · 📋 Reference Files · 1. Security Expert Mindset · 2. OWASP Top 10:2025 · 3. Supply Chain Security (A03) · 4. Attack Surface Mapping

#### Testing (71)

##### `privilege-escalation-methods` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 81/100 |

> Provide comprehensive techniques for escalating privileges from a low-privileged user to root/administrator access on compromised Linux and Windows systems. Essential for penetration testing post-expl

**File sections:** Purpose · Inputs/Prerequisites · Outputs/Deliverables · Core Techniques · Quick Reference · Constraints

#### AI / ML (287)

##### `ai-studio-image` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 78/100 |

> Geracao de imagens humanizadas via Google AI Studio (Gemini). Fotos realistas estilo influencer ou educacional com iluminacao natural e imperfeicoes sutis.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Ai Studio Image - Especialista Em Imagens Humanizadas · 1. Configurar Api Key

##### `behavioral-modes` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 79/100 |

> AI operational modes (brainstorm, implement, debug, review, teach, ship, orchestrate). Use to adapt behavior based on task type.

**File sections:** Purpose · Available Modes · Code Review: [file/feature] · Understanding [Concept] · Pre-Ship Checklist · Mode Detection

##### `error-debugging-multi-agent-review` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 78/100 |

> Use when working with error debugging multi agent review

**File sections:** Use this skill when · Do not use this skill when · Instructions · Role: Expert Multi-Agent Review Orchestration Specialist · Context and Purpose · Tool Arguments and Configuration

##### `gdb-cli` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 78/100 |

> GDB debugging assistant for AI agents - analyze core dumps, debug live processes, investigate crashes and deadlocks with source code correlation

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · Prerequisites · How It Works · Common Debugging Patterns

##### `lead-magnets` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 79/100 |

> Plan and optimize lead magnets for email capture and lead generation. Use when designing gated content, checklists, templates, downloadable resources, or other offers that convert visitors into subscr

**File sections:** When to Use · Before Planning · Lead Magnet Principles · Lead Magnet Types · Matching Lead Magnets to Buyer Stage · Gating Strategy

##### `leiloeiro-juridico` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 79/100 |

> 'Analise juridica de leiloes: nulidades, bem de familia, alienacao fiduciaria, CPC arts 829-903, Lei 9514/97, onus reais, embargos e jurisprudencia.'

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Para O Arrematante/Investidor: · Para O Devedor/Executado:

##### `llm-application-dev-langchain-agent` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 78/100 |

> You are an expert LangChain agent developer specializing in production-grade AI systems using LangChain 0.1+ and LangGraph.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Context · Core Requirements · Essential Architecture

##### `ml-pipeline-workflow` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 78/100 |

> Complete end-to-end MLOps pipeline orchestration from data preparation through model deployment.

**File sections:** Do not use this skill when · Instructions · Overview · Use this skill when · What This Skill Provides · Usage Patterns

##### `skyvern-browser-automation` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 78/100 |

> AI-powered browser automation — navigate sites, fill forms, extract structured data, log in with stored credentials, and build reusable workflows.

**File sections:** When to Use This Skill · Step 1: Classify Your Task (ALWAYS do this first) · Step 2: Apply These Decision Rules · Step 3: Create a Session · Step 4: Execute by Classification · Step 5: Verify

##### `tool-design` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 79/100 |

> Build tools that agents can use effectively, including architectural reduction patterns. Use when creating new tools for agent systems, debugging tool-related failures or misuse, or optimizing existin

**File sections:** When to Use This Skill · When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples

##### `yann-lecun-debate` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 79/100 |

> Sub-skill de debates e posições de Yann LeCun. Cobre críticas técnicas detalhadas aos LLMs, rivalidades intelectuais (LeCun vs Hinton, Sutskever, Russell, Yudkowsky, Bostrom), lista completa de rejeiç

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Por Que Llms São "Glorified Autocomplete" · O Problema Da Causalidade

#### Automation (73)

##### `tmux` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 78/100 |

> Expert tmux session, window, and pane management for terminal multiplexing, persistent remote workflows, and shell scripting automation.

**File sections:** Overview · When to Use This Skill · How It Works · Best Practices · Security & Safety Notes · Common Pitfalls

#### Backend (31)

##### `ai-native-cli` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 79/100 |

> Design spec with 98 rules for building CLI tools that AI agents can safely use. Covers structured JSON output, error handling, input contracts, safety guardrails, exit codes, and agent self-descriptio

**File sections:** Overview · When to Use This Skill · Core Philosophy · Layer Model · How It Works · Certification Requirements

##### `backend-architect` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 78/100 |

> Expert backend architect specializing in scalable API design, microservices architecture, and distributed systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Core Philosophy · Capabilities

##### `firebase` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 79/100 |

> Firebase gives you a complete backend in minutes - auth, database,

**File sections:** Principles · Capabilities · Scope · Tooling · Patterns · Collaboration

#### Cloud (49)

##### `aws-cost-cleanup` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 79/100 |

> Automated cleanup of unused AWS resources to reduce costs

**File sections:** When to Use This Skill · Automated Cleanup Targets · Cleanup Scripts · Cost Impact Calculator · Automated Cleanup Lambda · Cleanup Workflow

##### `azure-ai-contentsafety-ts` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 78/100 |

> Analyze text and images for harmful content with customizable blocklists.

**File sections:** Installation · Environment Variables · Authentication · Analyze Text · Analyze Image · Blocklist Management

##### `azure-ai-voicelive-dotnet` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 78/100 |

> Azure AI Voice Live SDK for .NET. Build real-time voice AI applications with bidirectional WebSocket communication.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflow · Voice Options

#### Data (27)

##### `monte-carlo-push-ingestion` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 79/100 |

> Expert guide for pushing metadata, lineage, and query logs to Monte Carlo from any data warehouse.

**File sections:** When to Use · MANDATORY — Always start from templates · Canonical pycarlo API — authoritative reference · Environment variable conventions · What this skill can build for you · Reference docs — when to load

#### Database (46)

##### `azure-resource-manager-sql-dotnet` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 79/100 |

> Azure Resource Manager SDK for Azure SQL in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflow · Key Types Reference

#### Frontend (81)

##### `sveltekit` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 78/100 |

> Build full-stack web applications with SvelteKit — file-based routing, SSR, SSG, API routes, and form actions in one framework.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

#### Git (30)

##### `using-git-worktrees` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 78/100 |

> Git worktrees create isolated workspaces sharing the same repository, allowing work on multiple branches simultaneously without switching.

**File sections:** Overview · Directory Selection Process · Safety Verification · Creation Steps · Quick Reference · Common Mistakes

#### Java / Kotlin (52)

##### `azure-cosmos-java` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 79/100 |

> Azure Cosmos DB SDK for Java. NoSQL database operations with global distribution, multi-model support, and reactive patterns.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflow · Key Concepts

##### `azure-keyvault-keys-ts` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 78/100 |

> Manage cryptographic keys using Azure Key Vault Keys SDK for JavaScript (@azure/keyvault-keys). Use when creating, encrypting/decrypting, signing, or rotating keys.

**File sections:** Installation · Environment Variables · Authentication · Secrets Operations · Keys Operations · Cryptographic Operations

##### `azure-keyvault-secrets-ts` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 78/100 |

> Manage secrets using Azure Key Vault Secrets SDK for JavaScript (@azure/keyvault-secrets). Use when storing and retrieving application secrets or configuration values.

**File sections:** Installation · Environment Variables · Authentication · Secrets Operations · Keys Operations · Cryptographic Operations

##### `azure-monitor-opentelemetry-exporter-java` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 78/100 |

> Azure Monitor OpenTelemetry Exporter for Java. Export OpenTelemetry traces, metrics, and logs to Azure Monitor/Application Insights.

**File sections:** Installation (Deprecated) · Recommended: Use Autoconfigure Instead · Environment Variables · Basic Setup with Autoconfigure (Recommended) · Creating Spans · Adding Span Attributes

#### JS / TS (64)

##### `azure-ai-projects-ts` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 79/100 |

> High-level SDK for Azure AI Foundry projects with agents, connections, deployments, and evaluations.

**File sections:** Installation · Environment Variables · Authentication · Operation Groups · Getting OpenAI Client · Agents

##### `azure-search-documents-dotnet` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 79/100 |

> Azure AI Search SDK for .NET (Azure.Search.Documents). Use for building search applications with full-text, vector, semantic, and hybrid search.

**File sections:** Installation · Environment Variables · Authentication · Client Selection · Index Creation · Document Operations

#### Marketing (60)

##### `copy-editing` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 78/100 |

> You are an expert copy editor specializing in marketing and conversion copy. Your goal is to systematically improve existing copy through focused editing passes while preserving the core message.

**File sections:** Core Philosophy · The Seven Sweeps Framework · Quick-Pass Editing Checks · Copy Editing Checklist · Common Copy Problems & Fixes · Working with Copy Sweeps

##### `schema-markup` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 78/100 |

> Design, validate, and optimize schema.org structured data for eligibility, correctness, and measurable SEO impact.

**File sections:** Phase 0: Schema Eligibility & Impact Index (Required) · 🔢 Schema Eligibility & Impact Index · Phase 1: Page & Goal Assessment · Core Principles (Non-Negotiable) · Supported & Common Schema Types · Multiple Schema Types per Page

#### Other (233)

##### `defi-protocol-templates` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 78/100 |

> Implement DeFi protocols with production-ready templates for staking, AMMs, governance, and lending systems. Use when building decentralized finance applications or smart contract protocols.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Staking Contract · AMM (Automated Market Maker) · Governance Token

##### `robius-widget-patterns` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 78/100 |

> |

**File sections:** When to Use · Production Patterns · Standard Widget Structure · Text/Image Toggle Pattern · Dynamic Styling with apply_over · Widget Reference Pattern

##### `signup-flow-cro` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 78/100 |

> You are an expert in optimizing signup and registration flows. Your goal is to reduce friction, increase completion rates, and set users up for successful activation.

**File sections:** Initial Assessment · Core Principles · Field-by-Field Optimization · Single-Step vs. Multi-Step · Trust and Friction Reduction · Mobile Signup Optimization

#### Python (70)

##### `azure-storage-file-share-py` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 78/100 |

> Azure Storage File Share SDK for Python. Use for SMB file shares, directories, and file operations in the cloud.

**File sections:** Installation · Environment Variables · Authentication · Share Operations · Directory Operations · File Operations

##### `pdf-official` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 79/100 |

> This guide covers essential PDF processing operations using Python libraries and command-line tools. For advanced features, JavaScript libraries, and detailed examples, see reference.md. If you need t

**File sections:** Overview · Quick Start · Python Libraries · Command-Line Tools · Common Tasks · Quick Reference

##### `pdf-official` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 79/100 |

> This guide covers essential PDF processing operations using Python libraries and command-line tools. For advanced features, JavaScript libraries, and detailed examples, see reference.md. If you need t

**File sections:** Overview · Quick Start · Python Libraries · Command-Line Tools · Common Tasks · Quick Reference

##### `python-development-python-scaffold` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 78/100 |

> You are a Python project architecture expert specializing in scaffolding production-ready Python applications. Generate complete project structures with modern tooling (uv, FastAPI, Django), type hint

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### Security (111)

##### `api-endpoint-builder` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 78/100 |

> Builds production-ready REST API endpoints with validation, error handling, authentication, and documentation. Follows best practices for security and scalability.

**File sections:** When to Use This Skill · What You'll Build · Endpoint Structure · Best Practices · Common Patterns · Documentation Template

##### `doc-coauthoring` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 79/100 |

> This skill provides a structured workflow for guiding users through collaborative document creation. Act as an active guide, walking users through three stages: Context Gathering, Refinement & Structu

**File sections:** When to Offer This Workflow · Stage 1: Context Gathering · Stage 2: Refinement & Structure · Stage 3: Reader Testing · Final Review · Tips for Effective Guidance

##### `zeroize-audit` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 79/100 |

> Detects missing zeroization of sensitive data in source code and identifies zeroization removed by compiler optimizations, with assembly-level analysis, and control-flow verification. Use for auditing

**File sections:** When to Use · When NOT to Use · Purpose · Scope · Inputs · Prerequisites

#### Testing (71)

##### `performance-testing-review-multi-agent-review` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 78/100 |

> Use when working with performance testing review multi agent review

**File sections:** Use this skill when · Do not use this skill when · Instructions · Role: Expert Multi-Agent Review Orchestration Specialist · Context and Purpose · Tool Arguments and Configuration

##### `testing-patterns` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 79/100 |

> Jest testing patterns, factory functions, mocking strategies, and TDD workflow. Use when writing unit tests, creating test factories, or following TDD red-green-refactor cycle.

**File sections:** Testing Philosophy · Test Utilities · Factory Pattern · Mocking Patterns · Test Structure · Query Patterns

#### AI / ML (287)

##### `agent-orchestration-multi-agent-optimize` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 76/100 |

> Optimize multi-agent systems with coordinated profiling, workload distribution, and cost-aware orchestration. Use when improving agent performance, throughput, or reliability.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Role: AI-Powered Multi-Agent Performance Engineering Specialist · Arguments Handling

##### `bdi-mental-states` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 76/100 |

> This skill should be used when the user asks to "model agent mental states", "implement BDI architecture", "create belief-desire-intention models", "transform RDF to beliefs", "build cognitive agent",

**File sections:** When to Use · Core Concepts · T2B2T Paradigm · Notation Selection by Level · Justification and Explainability · Temporal Dimensions

##### `bill-gates` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 77/100 |

> Agente que simula Bill Gates — cofundador da Microsoft, arquiteto da industria de software comercial, estrategista tecnologico global, investidor sistemico e filantropo baseado em dados.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 2.1 Estrutura Mental Central · 2.2 Modelo De Raciocinio — Como Gates Pensa Passo A Passo

##### `claude-in-chrome-troubleshooting` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 77/100 |

> Diagnose and fix Claude in Chrome MCP extension connectivity issues. Use when mcp__claude-in-chrome__* tools fail, return "Browser extension is not connected", or behave erratically.

**File sections:** When to Use · When NOT to Use · The Claude.app vs Claude Code Conflict (Primary Issue) · Quick Diagnosis · Critical Insight · Full Reset Procedure (Claude Code CLI)

##### `conversation-memory` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 77/100 |

> Persistent memory systems for LLM conversations including

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · User Context

##### `crewai` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 77/100 |

> Expert in CrewAI - the leading role-based multi-agent framework

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Collaboration

##### `daily` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 75/100 |

> Documentation and capabilities reference for Daily

**File sections:** When to Use · Capabilities · Skills · Workflows · Integration · Context

##### `image-studio` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 76/100 |

> Studio de geracao de imagens inteligente — roteamento automatico entre ai-studio-image (fotos humanizadas/influencer) e stability-ai (arte/ ilustracao/edicao). Detecta o tipo de imagem solicitada e es

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 1. Matriz De Decisao · Ai-Studio-Image (Gemini 2.0 Flash — Free)

##### `social-orchestrator` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 75/100 |

> Orquestrador unificado de canais sociais — coordena Instagram, Telegram e WhatsApp em um unico fluxo de trabalho. Publicacao cross-channel, metricas unificadas, reutilizacao de conteudo por formato, a

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 1. Principio De Orquestracao · 2. Skills Integradas

#### API (32)

##### `documentation` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 75/100 |

> Documentation generation workflow covering API docs, architecture docs, README files, code comments, and technical writing.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Documentation Types · Quality Gates · Related Workflow Bundles

#### Automation (73)

##### `makepad-animation` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 75/100 |

> |

**File sections:** When to Use · Documentation · Advanced Patterns · IMPORTANT: Documentation Completeness Check · Key Patterns · Animator Structure

#### Cloud (49)

##### `auri-core` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 77/100 |

> Auri: assistente de voz inteligente (Alexa + Claude claude-opus-4-20250805). Visao do produto, persona Vitoria Neural, stack AWS, modelo Free/Pro/Business/Enterprise, roadmap 4 fases, GTM, north star

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Auri - Core Product Skill · O Que E A Auri

##### `azure-ai-translation-text-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 77/100 |

> Azure AI Text Translation SDK for real-time text translation, transliteration, language detection, and dictionary lookup. Use for translating text content in applications.

**File sections:** Installation · Environment Variables · Authentication · Basic Translation · Translate to Multiple Languages · Specify Source Language

##### `azure-ai-vision-imageanalysis-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 75/100 |

> Azure AI Vision Image Analysis SDK for captions, tags, objects, OCR, people detection, and smart cropping. Use for computer vision and image understanding tasks.

**File sections:** Installation · Environment Variables · Authentication · Analyze Image from URL · Analyze Image from File · Image Caption

##### `azure-mgmt-apimanagement-dotnet` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 77/100 |

> Azure Resource Manager SDK for API Management in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflow · Key Types Reference

#### Data (27)

##### `jq` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 75/100 |

> Expert jq usage for JSON querying, filtering, transformation, and pipeline integration. Practical patterns for real shell workflows.

**File sections:** Overview · When to Use This Skill · How It Works · Best Practices · Security & Safety Notes · Common Pitfalls

##### `segment-cdp` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 77/100 |

> Expert patterns for Segment Customer Data Platform including

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

#### Database (46)

##### `claimable-postgres` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 76/100 |

> Provision instant temporary Postgres databases via Claimable Postgres by Neon (pg.new). No login or credit card required. Use for quick Postgres environments and throwaway DATABASE_URL for prototyping

**File sections:** Quick Start · Which Method? · REST API · CLI · SDK · Vite Plugin

##### `debug-buttercup` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 77/100 |

> All pods run in namespace crs. Use when pods in the crs namespace are in CrashLoopBackOff, OOMKilled, or restarting, multiple services restart simultaneously (cascade failure), or redis is unresponsiv

**File sections:** When to Use · When NOT to Use · Namespace and Services · Triage Workflow · Log Analysis · Resource Pressure

##### `neon-postgres` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 77/100 |

> Expert patterns for Neon serverless Postgres, branching, connection

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

##### `prisma-expert` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 75/100 |

> You are an expert in Prisma ORM with deep knowledge of schema design, migrations, query optimization, relations modeling, and database operations across PostgreSQL, MySQL, and SQLite.

**File sections:** Problem Playbooks · Code Review Checklist · Anti-Patterns to Avoid · When to Use · Limitations

#### Git (30)

##### `issues` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 75/100 |

> Interact with GitHub issues - create, list, and view issues.

**File sections:** When to Use · Instructions · If "Create new issue" selected: · Description · Steps to Reproduce · Expected Behavior

#### Java / Kotlin (52)

##### `azure-ai-voicelive-java` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 76/100 |

> Azure AI VoiceLive SDK for Java. Real-time bidirectional voice conversations with AI assistants using WebSocket.

**File sections:** Installation · Environment Variables · Authentication · Key Concepts · Core Workflow · Voice Configuration

##### `azure-monitor-ingestion-java` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 75/100 |

> Azure Monitor Ingestion SDK for Java. Send custom logs to Azure Monitor via Data Collection Rules (DCR) and Data Collection Endpoints (DCE).

**File sections:** Installation · Prerequisites · Environment Variables · Client Creation · Key Concepts · Core Operations

#### Marketing (60)

##### `programmatic-seo` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 77/100 |

> Design and evaluate programmatic SEO strategies for creating SEO-driven pages at scale using templates and structured data.

**File sections:** Phase 0: Programmatic SEO Feasibility Index (Required) · 🔢 Programmatic SEO Feasibility Index · Phase 1: Context & Opportunity Assessment · Core Principles (Non-Negotiable) · The 12 Programmatic SEO Playbooks · Phase 2: Page System Design

##### `seo-competitor-pages` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 76/100 |

> >

**File sections:** When to Use · Page Types · Comparison Table Generation · Schema Markup Recommendations · Keyword Targeting · Conversion-Optimized Layouts

#### Mobile (19)

##### `building-native-ui` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 76/100 |

> Complete guide for building beautiful apps with Expo Router. Covers fundamentals, styling, components, navigation, animations, patterns, and native tabs.

**File sections:** When to Use · References · Running the App · Code Style · Routes · Library Preferences

#### Other (233)

##### `page-cro` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 75/100 |

> Analyze and optimize individual pages for conversion performance.

**File sections:** Phase 0: Page Conversion Readiness & Impact Index (Required) · 🔢 Page Conversion Readiness & Impact Index · Phase 1: Context & Goal Alignment · Phase 2: CRO Diagnostic Framework · Phase 3: Recommendations & Prioritization · Output Format (Required)

##### `plotly` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 77/100 |

> Interactive visualization library. Use when you need hover info, zoom, pan, or web-embeddable charts. Best for dashboards, exploratory analysis, and presentations. For static publication figures use m

**File sections:** When to Use · Quick Start · Choosing Between APIs · Core Capabilities · Common Workflows · Integration with Dash

##### `salesforce-development` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 77/100 |

> Expert patterns for Salesforce platform development including

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

##### `senior-architect` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 77/100 |

> Complete toolkit for senior architect with modern tools and best practices.

**File sections:** Quick Start · Core Capabilities · Reference Documentation · Tech Stack · Development Workflow · Best Practices Summary

##### `senior-fullstack` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 77/100 |

> Complete toolkit for senior fullstack with modern tools and best practices.

**File sections:** Quick Start · Core Capabilities · Reference Documentation · Tech Stack · Development Workflow · Best Practices Summary

##### `startup-analyst` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 76/100 |

> Expert startup business analyst specializing in market sizing, financial modeling, competitive analysis, and strategic planning for early-stage companies.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Core Expertise · Capabilities

#### Python (70)

##### `azure-ai-contentunderstanding-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 75/100 |

> Azure AI Content Understanding SDK for Python. Use for multimodal content extraction from documents, images, audio, and video.

**File sections:** Installation · Environment Variables · Authentication · Core Workflow · Prebuilt Analyzers · Analyze Document

##### `azure-appconfiguration-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 76/100 |

> Azure App Configuration SDK for Python. Use for centralized configuration management, feature flags, and dynamic settings.

**File sections:** Installation · Environment Variables · Authentication · Configuration Settings · List Settings · Feature Flags

##### `azure-containerregistry-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 75/100 |

> Azure Container Registry SDK for Python. Use for managing container images, artifacts, and repositories.

**File sections:** Installation · Environment Variables · Authentication · List Repositories · Repository Operations · List Tags

##### `azure-cosmos-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 76/100 |

> Azure Cosmos DB SDK for Python (NoSQL API). Use for document CRUD, queries, containers, and globally distributed data.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflow · Queries

##### `azure-mgmt-apimanagement-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 75/100 |

> Azure API Management SDK for Python. Use for managing APIM services, APIs, products, subscriptions, and policies.

**File sections:** Installation · Environment Variables · Authentication · Create APIM Service · Import API from OpenAPI · Import API from URL

##### `azure-mgmt-botservice-py` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 77/100 |

> Azure Bot Service Management SDK for Python. Use for creating, managing, and configuring Azure Bot Service resources.

**File sections:** Installation · Environment Variables · Authentication · Create a Bot · Get Bot Details · List Bots in Resource Group

##### `devcontainer-setup` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 76/100 |

> Creates devcontainers with Claude Code, language-specific tooling (Python/Node/Rust/Go), and persistent volumes. Use when adding devcontainer support to a project, setting up isolated development envi

**File sections:** When to Use · When NOT to Use · Workflow · Phase 1: Project Reconnaissance · Phase 2: Generate Configuration · Base Template Features

#### Rust (20)

##### `popup-cro` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 77/100 |

> Create and optimize popups, modals, overlays, slide-ins, and banners to increase conversions without harming user experience or brand trust.

**File sections:** 1. Initial Assessment (Required) · 2. Core Principles (Non-Negotiable) · 3. Trigger Strategy (Choose Intentionally) · 4. Popup Types & Use Cases · 5. Copy Frameworks · 6. Design & UX Rules

#### Security (111)

##### `hubspot-integration` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 77/100 |

> Expert patterns for HubSpot CRM integration including OAuth

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

#### Testing (71)

##### `azure-resource-manager-playwright-dotnet` — ★★★★☆ **78/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 76/100 |

> Azure Resource Manager SDK for Microsoft Playwright Testing in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflow · Key Types Reference

#### AI / ML (287)

##### `agentmail` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 74/100 |

> Email infrastructure for AI agents. Create accounts, send/receive emails, manage webhooks, and check karma balance via the AgentMail API.

**File sections:** When to Use · Quick start · Full API reference · Karma system · TypeScript SDK · Error handling

##### `ai-ml` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 73/100 |

> AI and machine learning workflow covering LLM application development, RAG implementation, agent architecture, ML pipelines, and AI-powered features.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · AI Development Checklist · Quality Gates · Related Workflow Bundles

##### `faf-expert` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 73/100 |

> Advanced .faf (Foundational AI-context Format) specialist. IANA-registered format, MCP server config, championship scoring, bi-directional sync.

**File sections:** When to Use This Skill · Real-World Examples · Core Capabilities · Getting Started · Success Metrics · Platform Compatibility

##### `leiloeiro-ia` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 73/100 |

> Especialista em leiloes judiciais e extrajudiciais de imoveis. Analise juridica, pericial e de mercado integrada. Orquestra os 5 modulos especializados.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 1. Identificar O Tipo De Solicitação · 2. Acionar Skills Modulares Conforme Necessidade

#### Cloud (49)

##### `azure-mgmt-arizeaiobservabilityeval-dotnet` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 74/100 |

> Azure Resource Manager SDK for Arize AI Observability and Evaluation (.NET).

**File sections:** Installation · Package Info · Environment Variables · Authentication · Core Workflow · Key Types

##### `azure-web-pubsub-ts` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 74/100 |

> Real-time messaging with WebSocket connections and pub/sub patterns.

**File sections:** Installation · Environment Variables · Server-Side: WebPubSubServiceClient · Client-Side: WebPubSubClient · Express Event Handler · Key Types

#### Data (27)

##### `skin-health-analyzer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 74/100 |

> Analyze skin health data, identify skin problem patterns, assess skin health status. Supports correlation analysis with nutrition, chronic diseases, and medication data.

**File sections:** 技能概述 · 医学免责声明 · 核心功能 · 使用场景 · 数据分析方法 · 质量保证

#### Docs (16)

##### `c4-code` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 73/100 |

> Expert C4 Code-level documentation specialist. Analyzes code directories to create comprehensive C4 code-level documentation including function signatures, arguments, dependencies, and code structure.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Overview · Code Elements · Dependencies

#### Frontend (81)

##### `react-ui-patterns` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 73/100 |

> Modern React UI patterns for loading states, error handling, and data fetching. Use when building UI components, handling async data, or managing UI states.

**File sections:** Core Principles · Loading State Patterns · Error Handling Patterns · Button State Patterns · Empty States · Form Submission Pattern

#### JS / TS (64)

##### `frontend-mobile-development-component-scaffold` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 73/100 |

> You are a React component architecture expert specializing in scaffolding production-ready, accessible, and performant components. Generate complete component implementations with TypeScript, tests, s

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

##### `m365-agents-dotnet` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 74/100 |

> Microsoft 365 Agents SDK for .NET. Build multichannel agents for Teams/M365/Copilot Studio with ASP.NET Core hosting, AgentApplication routing, and MSAL-based auth.

**File sections:** Overview · Before implementation · Installation · Configuration (appsettings.json) · Core Workflow: ASP.NET Core agent host · AgentApplication routing

#### Marketing (60)

##### `content-creator` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 73/100 |

> Professional-grade brand voice analysis, SEO optimization, and platform-specific content frameworks.

**File sections:** When to Use · Keywords · Quick Start · Core Workflows · Key Scripts · Reference Guides

#### Other (233)

##### `arm-cortex-expert` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 73/100 |

> Senior embedded software engineer specializing in firmware and driver development for ARM Cortex-M microcontrollers (Teensy, STM32, nRF52, SAMD).

**File sections:** Use this skill when · Do not use this skill when · Instructions · 🎯 Role & Objectives · 🧠 Knowledge Base · ⚙️ Operating Principles

##### `context-guardian` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 73/100 |

> Guardiao de contexto que preserva dados criticos antes da compactacao automatica. Snapshots, verificacao de integridade e zero perda de informacao.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Por Que Isto Existe · Localizacao

##### `oral-health-analyzer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 74/100 |

> 分析口腔健康数据、识别口腔问题模式、评估口腔健康状况、提供个性化口腔健康建议。支持与营养、慢性病、用药等其他健康数据的关联分析。

**File sections:** When to Use · 技能概述 · 医学免责声明 · 核心功能 · 使用场景 · 数据分析方法

##### `robius-event-action` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 73/100 |

> |

**File sections:** When to Use · Custom Action Pattern · Centralized Action Handling in App · Action Types · Event Handling Patterns · Action Chaining Pattern

##### `sexual-health-analyzer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 74/100 |

> Sexual Health Analyzer

**File sections:** When to Use · 技能概述 · 医学免责声明 · 核心功能 · 使用场景 · 数据分析方法

#### Python (70)

##### `azure-ai-contentsafety-py` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 73/100 |

> Azure AI Content Safety SDK for Python. Use for detecting harmful content in text and images with multi-severity classification.

**File sections:** Installation · Environment Variables · Authentication · Analyze Text · Analyze Image · Text Blocklist Management

##### `azure-mgmt-fabric-py` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 73/100 |

> Azure Fabric Management SDK for Python. Use for managing Microsoft Fabric capacities and resources.

**File sections:** Installation · Environment Variables · Authentication · Create Fabric Capacity · Get Capacity Details · List Capacities in Resource Group

##### `azure-storage-blob-py` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 73/100 |

> Azure Blob Storage SDK for Python. Use for uploading, downloading, listing blobs, managing containers, and blob lifecycle.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflow · Performance Tuning

##### `temporal-python-pro` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 74/100 |

> Master Temporal workflow orchestration with Python SDK. Implements durable workflows, saga patterns, and distributed transactions. Covers async/await, testing strategies, and production deployment.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · When to Use Temporal Python

#### Security (111)

##### `sast-configuration` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 74/100 |

> Static Application Security Testing (SAST) tool setup, configuration, and custom rule creation for comprehensive security scanning across multiple programming languages.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Overview · Core Capabilities

#### Testing (71)

##### `gitlab-ci-patterns` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 74/100 |

> Comprehensive GitLab CI/CD pipeline patterns for automated testing, building, and deployment.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Basic Pipeline Structure · Docker Build and Push

#### AI / ML (287)

##### `agent-orchestrator` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 72/100 |

> Meta-skill que orquestra todos os agentes do ecossistema. Scan automatico de skills, match por capacidades, coordenacao de workflows multi-skill e registry management.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Principio: Zero Intervencao Manual · Workflow Obrigatorio (Toda Solicitacao)

##### `agentflow` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 71/100 |

> Orchestrate autonomous AI development pipelines through your Kanban board (Asana, GitHub Projects, Linear). Manages multi-worker Claude Code dispatch, deterministic quality gates, adversarial review,

**File sections:** Overview · When to Use This Skill · Core Concepts · Skills / Commands · Step-by-Step Guide · Quality Gates

##### `documentation-templates` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 72/100 |

> Documentation templates and structure guidelines. README, API docs, code comments, and AI-friendly documentation.

**File sections:** 1. README Structure · Quick Start · Features · Configuration · Documentation · License

##### `docx-official` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 72/100 |

> A user may ask you to create, edit, or analyze the contents of a .docx file. A .docx file is essentially a ZIP archive containing XML files and other resources that you can read or edit. You have diff

**File sections:** Overview · Workflow Decision Tree · Reading and analyzing content · Creating a new Word document · Editing an existing Word document · Redlining workflow for document review

##### `docx-official` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 72/100 |

> A user may ask you to create, edit, or analyze the contents of a .docx file. A .docx file is essentially a ZIP archive containing XML files and other resources that you can read or edit. You have diff

**File sections:** Overview · Workflow Decision Tree · Reading and analyzing content · Creating a new Word document · Editing an existing Word document · Redlining workflow for document review

##### `geoffrey-hinton` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 72/100 |

> Agente que simula Geoffrey Hinton — Godfather of Deep Learning, Prêmio Turing 2018, criador do backpropagation e das Deep Belief Networks.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Instrucoes De Ativacao · Quem E Geoffrey Everest Hinton

##### `multi-agent-patterns` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 70/100 |

> This skill should be used when the user asks to "design multi-agent system", "implement supervisor pattern", "create swarm architecture", "coordinate multiple agents", or mentions multi-agent patterns

**File sections:** When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples · Guidelines

##### `prompt-engineering-patterns` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 70/100 |

> Master advanced prompt engineering techniques to maximize LLM performance, reliability, and controllability.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Core Capabilities · Quick Start · Key Patterns

##### `sam-altman` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 72/100 |

> Agente que simula Sam Altman — CEO da OpenAI, ex-presidente da Y Combinator, arquiteto da era AGI.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Quem É Sam Altman · A Missão E O Que Me Motiva

#### Cloud (49)

##### `azure-ai-textanalytics-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 72/100 |

> Azure AI Text Analytics SDK for sentiment analysis, entity recognition, key phrases, language detection, PII, and healthcare NLP. Use for natural language processing on text.

**File sections:** Installation · Environment Variables · Authentication · Sentiment Analysis · Entity Recognition · PII Detection

##### `azure-ai-translation-ts` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 72/100 |

> Text and document translation with REST-style clients.

**File sections:** Installation · Environment Variables · Text Translation Client · Document Translation Client · Key Types · Best Practices

##### `azure-eventhub-ts` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 72/100 |

> High-throughput event streaming and real-time data ingestion.

**File sections:** Installation · Environment Variables · Authentication · Core Workflow · Event Hub Properties · Batch Processing Options

##### `azure-resource-manager-cosmosdb-dotnet` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 70/100 |

> Azure Resource Manager SDK for Cosmos DB in .NET.

**File sections:** Installation · Environment Variables · Authentication · Resource Hierarchy · Core Workflow · Key Types Reference

#### Data (27)

##### `analytics-product` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 71/100 |

> Analytics de produto - PostHog, Mixpanel, eventos, funnels, cohorts, retencao, north star metric, OKRs e dashboards de produto.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Analytics-Product - Decida Com Dados · Eventos Essenciais Da Auri

#### Database (46)

##### `azure-cosmos-db-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 72/100 |

> Build production-grade Azure Cosmos DB NoSQL services following clean code, security best practices, and TDD principles.

**File sections:** Installation · Environment Variables · Authentication · Architecture Overview · Quick Start · Core Principles

##### `database-migrations-migration-observability` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 72/100 |

> Migration monitoring, CDC, and observability infrastructure

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### Design (29)

##### `bash-linux` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 72/100 |

> Bash/Linux terminal patterns. Critical commands, piping, error handling, scripting. Use when working on macOS or Linux systems.

**File sections:** 1. Operator Syntax · 2. File Operations · 3. Process Management · 4. Text Processing · 5. Environment Variables · 6. Network

##### `json-canvas` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 72/100 |

> Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases, mind maps, flowcharts, or when the user mentions

**File sections:** When to Use · File Structure · Common Workflows · Nodes · Edges · Colors

#### DevOps (20)

##### `terraform-module-library` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 72/100 |

> Production-ready Terraform module patterns for AWS, Azure, and GCP infrastructure.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Module Structure · Standard Module Pattern

#### Frontend (81)

##### `frontend-design` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 70/100 |

> You are a frontend designer-engineer, not a layout generator.

**File sections:** 1. Core Design Mandate · 2. Design Feasibility & Impact Index (DFII) · 3. Mandatory Design Thinking Phase · 4. Aesthetic Execution Rules (Non-Negotiable) · 5. Implementation Standards · 6. Required Output Structure

##### `tailwind-patterns` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 71/100 |

> Tailwind CSS v4 principles. CSS-first configuration, container queries, modern patterns, design token architecture.

**File sections:** When to Use · 1. Tailwind v4 Architecture · 2. CSS-Based Configuration · 3. Container Queries (v4 Native) · 4. Responsive Design · 5. Dark Mode

#### Java / Kotlin (52)

##### `azure-ai-anomalydetector-java` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 72/100 |

> Build anomaly detection applications with Azure AI Anomaly Detector SDK for Java. Use when implementing univariate/multivariate anomaly detection, time-series analysis, or AI-powered monitoring.

**File sections:** Installation · Client Creation · Key Concepts · Core Patterns · Error Handling · Environment Variables

##### `azure-communication-chat-java` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 72/100 |

> Build real-time chat applications with thread management, messaging, participants, and read receipts.

**File sections:** Installation · Client Creation · Key Concepts · Create Chat Thread · Send Messages · Get Messages

##### `frontend-mobile-security-xss-scan` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 71/100 |

> You are a frontend security specialist focusing on Cross-Site Scripting (XSS) vulnerability detection and prevention. Analyze React, Vue, Angular, and vanilla JavaScript code to identify injection poi

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### JS / TS (64)

##### `ai-agents-architect` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 70/100 |

> Expert in designing and building autonomous AI agents. Masters tool

**File sections:** Capabilities · Prerequisites · Patterns · Sharp Edges · Related Skills · When to Use

##### `azure-search-documents-ts` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 71/100 |

> Build search applications with vector, hybrid, and semantic search capabilities.

**File sections:** Installation · Environment Variables · Authentication · Core Workflow · Filtering and Facets · Autocomplete and Suggestions

##### `zod-validation-expert` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 72/100 |

> Expert in Zod — TypeScript-first schema validation. Covers parsing, custom errors, refinements, type inference, and integration with React Hook Form, Next.js, and tRPC.

**File sections:** When to Use This Skill · Core Concepts · Schema Definition & Inference · Parsing & Validation · Customizing Validation · Integration Patterns

#### Mobile (19)

##### `mobile-design` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 71/100 |

> (Mobile-First · Touch-First · Platform-Respectful)

**File sections:** 1. Mobile Feasibility & Risk Index (MFRI) · 2. Mandatory Thinking Before Any Work · 3. Mandatory Reference Reading (Enforced) · 4. AI Mobile Anti-Patterns (Hard Bans) · 5. Platform Unification vs Divergence Matrix · 6. Mobile UX Psychology (Non-Optional)

#### Other (233)

##### `algolia-search` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 72/100 |

> Expert patterns for Algolia search implementation, indexing

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

##### `analyze-project` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 72/100 |

> Forensic root cause analyzer for Antigravity sessions. Classifies scope deltas, rework patterns, root causes, hotspots, and auto-improves prompts/health.

**File sections:** Goal · When to Use · Global Rules · Step 0.5: Session Intent Classification · Step 1: Discover Conversations · Step 2: Extract Session Evidence

##### `clerk-auth` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 72/100 |

> Expert patterns for Clerk auth implementation, middleware,

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

##### `favicon` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 72/100 |

> Generate favicons from a source image

**File sections:** When to Use · Prerequisites · Step 1: Validate Source Image · Step 2: Detect Project Type and Static Assets Directory · Step 3: Determine App Name · Step 4: Ensure Static Assets Directory Exists

##### `robius-app-architecture` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 71/100 |

> |

**File sections:** When to Use · Production Patterns · Core Architecture Pattern · App Structure · Tokio Runtime Integration · Lock-Free Update Queue Pattern

##### `skill-installer` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 71/100 |

> Instala, valida, registra e verifica novas skills no ecossistema. 10 checks de seguranca, copia, registro no orchestrator e verificacao pos-instalacao.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Principio: Redundancia Maxima · Localizacao

##### `yann-lecun-filosofia` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 72/100 |

> Sub-skill filosófica e pedagógica de Yann LeCun.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Por Que Open Source É Existencialmente Importante · Llama Como Caso De Estudo

#### Python (70)

##### `azure-data-tables-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 71/100 |

> Azure Tables SDK for Python (Storage and Cosmos DB). Use for NoSQL key-value storage, entity CRUD, and batch operations.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Table Operations · Entity Operations

##### `azure-keyvault-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 70/100 |

> Azure Key Vault SDK for Python. Use for secrets, keys, and certificates management with secure storage.

**File sections:** Installation · Environment Variables · Secrets · Keys · Certificates · Client Types Table

##### `azure-mgmt-apicenter-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 72/100 |

> Azure API Center Management SDK for Python. Use for managing API inventory, metadata, and governance across your organization.

**File sections:** Installation · Environment Variables · Authentication · Create API Center · List API Centers · Register an API

##### `azure-monitor-opentelemetry-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 70/100 |

> Azure Monitor OpenTelemetry Distro for Python. Use for one-line Application Insights setup with auto-instrumentation.

**File sections:** Installation · Environment Variables · Quick Start · Explicit Configuration · With Flask · With Django

##### `azure-monitor-query-py` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 72/100 |

> Azure Monitor Query SDK for Python. Use for querying Log Analytics workspaces and Azure Monitor metrics.

**File sections:** Installation · Environment Variables · Authentication · Logs Query Client · Metrics Query Client · Async Clients

#### Security (111)

##### `local-legal-seo-audit` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 72/100 |

> Audit and improve local SEO for law firms, attorneys, forensic experts and legal/professional services sites with local presence, focusing on GBP, directories, E-E-A-T and practice/location pages.

**File sections:** When to Use · Initial Assessment · Audit Framework · Google Business Profile (GBP) Audit · E-E-A-T Audit for Legal Sites · On-Page SEO Audit

#### Testing (71)

##### `lambdatest-agent-skills` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 72/100 |

> Production-grade test automation skills for 46 frameworks across E2E, unit, mobile, BDD, visual, and cloud testing in 15+ languages.

**File sections:** Overview · When to Use This Skill · How It Works · Skill Registry · Examples · Best Practices

##### `prompt-library` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 72/100 |

> A comprehensive collection of battle-tested prompts inspired by [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) and community best practices.

**File sections:** When to Use This Skill · Prompt Categories · Prompt Engineering Techniques · Prompt Improvement Checklist · Resources · Limitations

##### `systematic-debugging` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 71/100 |

> Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes

**File sections:** Overview · The Iron Law · When to Use · The Four Phases · Red Flags - STOP and Follow Process · your human partner's Signals You're Doing It Wrong

#### AI / ML (287)

##### `data-structure-protocol` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 69/100 |

> Give agents persistent structural memory of a codebase — navigate dependencies, track public APIs, and understand why connections exist without re-reading the whole repo.

**File sections:** When to Use · Core Concepts · How It Works · Examples · Best Practices · Integration

##### `multi-advisor` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 68/100 |

> Conselho de especialistas — consulta multiplos agentes do ecossistema em paralelo para analise multi-perspectiva de qualquer topico. Ativa personas, especialistas e agentes tecnicos simultaneamente, c

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 1. O Principio · Multi-Advisor: [Topico]

##### `prompt-engineer` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 69/100 |

> Transforms user prompts into optimized prompts using frameworks (RTF, RISEN, Chain of Thought, RODES, Chain of Density, RACE, RISE, STAR, SOAP, CLEAR, GROW)

**File sections:** Purpose · When to Use · Workflow · Critical Rules · Notes · Limitations

##### `task-intelligence` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 68/100 |

> Protocolo de Inteligência Pré-Tarefa — ativa TODOS os agentes relevantes do ecossistema ANTES de executar qualquer tarefa solicitada pelo usuário.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Fase 1 — Classificação Da Tarefa (5-10 Segundos) · Fase 2 — Scan E Match Paralelo

##### `unity-ai-game-creator` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 68/100 |

> Transform raw game ideas into complete Unity projects with AI-powered asset generation, scene blueprints, music/SFX prompts, and step-by-step development procedures using Unity 6+ and modern AI tools.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `warren-buffett` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 69/100 |

> Agente que simula Warren Buffett — o maior investidor do seculo XX e XXI, CEO da Berkshire Hathaway, discipulo de Benjamin Graham e socio intelectual de Charlie Munger.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · 2.1 Os Fundamentos — Graham + Munger Sintetizados · 2.2 O Modelo De Analise Em 8 Dimensoes

#### API (32)

##### `incident-responder` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 68/100 |

> Expert SRE incident responder specializing in rapid problem resolution, modern observability, and comprehensive incident management.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Immediate Actions (First 5 minutes) · Modern Investigation Protocol

#### Automation (73)

##### `bash-pro` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 69/100 |

> 'Master of defensive Bash scripting for production automation, CI/CD

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Focus Areas · Approach

##### `makepad-splash` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 69/100 |

> |

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · What is Splash? · Script Macro · Execution

##### `makepad-widgets` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 69/100 |

> Version: makepad-widgets (dev branch) | Last Updated: 2026-01-19 > > Check for updates: https://crates.io/crates/makepad-widgets

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · Key Patterns · Widget Traits (from source) · All Built-in Widgets (84 files in widgets/src/)

#### Cloud (49)

##### `azure-ai-translation-document-py` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 68/100 |

> Azure AI Document Translation SDK for batch translation of documents with format preservation. Use for translating Word, PDF, Excel, PowerPoint, and other document formats at scale.

**File sections:** Installation · Environment Variables · Authentication · Basic Document Translation · Multiple Target Languages · Translate Single Document

##### `azure-servicebus-ts` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 68/100 |

> Enterprise messaging with queues, topics, and subscriptions.

**File sections:** Installation · Environment Variables · Authentication · Core Workflow · Message Sessions · Dead-Letter Handling

#### Data (27)

##### `constant-time-analysis` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 69/100 |

> Analyze cryptographic code to detect operations that leak secret data through execution timing variations.

**File sections:** When to Use · When NOT to Use · Language Selection · Quick Start · Quick Reference · Interpreting Results

#### Database (46)

##### `database-architect` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 69/100 |

> Expert database architect specializing in data layer design from scratch, technology selection, schema modeling, and scalable database architectures.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Core Philosophy

#### Frontend (81)

##### `shadcn` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 69/100 |

> Manages shadcn/ui components and projects, providing context, documentation, and usage patterns for building modern design systems.

**File sections:** When to Use · Current Project Context · Principles · Critical Rules · Key Patterns · Component Selection

#### Java / Kotlin (52)

##### `azure-communication-sms-java` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 69/100 |

> Send SMS messages with Azure Communication Services SMS Java SDK. Use when implementing SMS notifications, alerts, OTP delivery, bulk messaging, or delivery reports.

**File sections:** Installation · Client Creation · Send SMS to Single Recipient · Send SMS to Multiple Recipients · Send Options · Response Handling

#### Python (70)

##### `azure-eventhub-py` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 68/100 |

> Azure Event Hubs SDK for Python streaming. Use for high-throughput event ingestion, producers, consumers, and checkpointing.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Send Events · Receive Events

##### `azure-messaging-webpubsubservice-py` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 68/100 |

> Azure Web PubSub Service SDK for Python. Use for real-time messaging, WebSocket connections, and pub/sub patterns.

**File sections:** Installation · Environment Variables · Service Client (Server-Side) · Client SDK (Python WebSocket Client) · Async Service Client · Client Operations

##### `azure-monitor-ingestion-py` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 68/100 |

> Azure Monitor Ingestion SDK for Python. Use for sending custom logs to Log Analytics workspace via Logs Ingestion API.

**File sections:** Installation · Environment Variables · Prerequisites · Authentication · Upload Custom Logs · Upload from JSON File

##### `azure-monitor-opentelemetry-exporter-py` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 68/100 |

> Azure Monitor OpenTelemetry Exporter for Python. Use for low-level OpenTelemetry export to Application Insights.

**File sections:** Installation · Environment Variables · When to Use · Trace Exporter · Metric Exporter · Log Exporter

##### `azure-servicebus-py` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 68/100 |

> Azure Service Bus SDK for Python messaging. Use for queues, topics, subscriptions, and enterprise messaging patterns.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Send Messages (Async) · Receive Messages (Async)

##### `snowflake-development` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 69/100 |

> Comprehensive Snowflake development assistant covering SQL best practices, data pipeline design (Dynamic Tables, Streams, Tasks, Snowpipe), Cortex AI functions, Cortex Agents, Snowpark Python, dbt int

**File sections:** When to Use · SQL Best Practices · Data Pipelines · Cortex AI · Snowpark Python · dbt on Snowflake

#### Security (111)

##### `production-audit` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 68/100 |

> Audit a shipped repo for production-readiness gaps across RLS, webhooks, secrets, grants, Stripe idempotency, mobile UX, and deployment health.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Testing (71)

##### `tdd-workflows-tdd-cycle` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 68/100 |

> Use when working with tdd workflows tdd cycle

**File sections:** Use this skill when · Do not use this skill when · Instructions · Configuration · Phase 1: Test Specification and Design · Phase 2: RED - Write Failing Tests

#### AI / ML (287)

##### `ai-analyzer` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 66/100 |

> AI???????????,???????????????????????????????????????AI???????

**File sections:** When to Use · ???? · ???? · ??? · ???? · ?????

##### `ai-dev-jobs-mcp` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 65/100 |

> Search 8,400+ AI and ML jobs across 489 companies, inspect listings and employers, match roles, and view salary and market stats via AI Dev Jobs MCP

**File sections:** Overview · When to Use This Skill · MCP Configuration · Available Tools · Examples · Best Practices

##### `context-compression` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 66/100 |

> When agent sessions generate millions of tokens of conversation history, compression becomes mandatory. The naive approach is aggressive compression to minimize tokens per request.

**File sections:** When to Use · Core Concepts · Detailed Topics · Session Intent · Files Modified · Decisions Made

##### `hosted-agents` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 65/100 |

> Build background agents in sandboxed environments. Use for hosted coding agents, sandboxed VMs, Modal sandboxes, and remote coding environments.

**File sections:** When to Use · Core Concepts · Detailed Topics · Practical Guidance · Guidelines · Integration

##### `machine-learning-ops-ml-pipeline` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 65/100 |

> Design and implement a complete ML pipeline for: $ARGUMENTS

**File sections:** Use this skill when · Do not use this skill when · Instructions · Thinking · Phase 1: Data & Requirements Analysis · Phase 2: Model Development & Training

##### `marketing-psychology` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 65/100 |

> Apply behavioral science and mental models to marketing decisions, prioritized using a psychological leverage and feasibility scoring system.

**File sections:** 1. How This Skill Should Be Used · 2. Psychological Leverage & Feasibility Score (PLFS) · 3. Mandatory Selection Rules · 4. Mental Model Library (Canonical) · 5. Required Output Format (Updated) · 6. Journey-Based Model Bias (Guidance)

##### `parallel-agents` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 65/100 |

> Multi-agent orchestration patterns. Use when multiple independent tasks can run with different domain expertise or when comprehensive analysis requires multiple perspectives.

**File sections:** Overview · When to Use Orchestration · Native Agent Invocation · Orchestration Patterns · Available Agents · Claude Code Built-in Agents

##### `plaid-fintech` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 66/100 |

> Expert patterns for Plaid API integration including Link token

**File sections:** Patterns · Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

##### `skill-optimizer` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 67/100 |

> Diagnose and optimize Agent Skills (SKILL.md) with real session data and research-backed static analysis. Works with Claude Code, Codex, and any Agent Skills-compatible agent.

**File sections:** When to Use This Skill · Rules · Overview · Usage · Data Sources · Workflow

##### `stitch-loop` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 65/100 |

> Teaches agents to iteratively build websites using Stitch with an autonomous baton-passing loop pattern

**File sections:** When to Use · Overview · Prerequisites · The Baton System · Execution Protocol · File Structure Reference

#### API (32)

##### `code-refactoring-context-restore` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 66/100 |

> Use when working with code refactoring context restore

**File sections:** Use this skill when · Do not use this skill when · Instructions · Role Statement · Context Overview · Core Requirements and Arguments

##### `context-management-context-restore` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 66/100 |

> Use when working with context management context restore

**File sections:** Use this skill when · Do not use this skill when · Instructions · Role Statement · Context Overview · Core Requirements and Arguments

##### `customs-trade-compliance` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 65/100 |

> Codified expertise for customs documentation, tariff classification, duty optimisation, restricted party screening, and regulatory compliance across multiple jurisdictions.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

#### Automation (73)

##### `make-automation` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 66/100 |

> Automate Make (Integromat) tasks via Rube MCP (Composio): operations, enums, language and timezone lookups. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `makepad-font` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 67/100 |

> |

**File sections:** Documentation · IMPORTANT: Documentation Completeness Check · Text Module Structure · Using Fonts in DSL · Font Definition in DSL · Layouter API

#### Cloud (49)

##### `multi-cloud-architecture` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 65/100 |

> Decision framework and patterns for architecting applications across AWS, Azure, and GCP.

**File sections:** Do not use this skill when · Instructions · Purpose · Use this skill when · Cloud Service Comparison · Multi-Cloud Patterns

#### Data (27)

##### `helium-mcp` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 67/100 |

> Connect to Helium's MCP server for news research, media bias analysis, balanced perspectives, stock/options data, and semantic meme search across 3.2M+ articles and 5,000+ sources

**File sections:** Overview · When to Use This Skill · MCP Configuration · Available Tools · Examples · Best Practices

#### Design (29)

##### `core-components` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 67/100 |

> Core component library and design system patterns. Use when building UI, using design tokens, or working with the component library.

**File sections:** Design System Overview · Design Tokens · Core Components · Layout Patterns · Anti-Patterns · Component Props Pattern

##### `privacy-by-design` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 66/100 |

> Use when building apps that collect user data. Ensures privacy protections are built in from the start—data minimization, consent, encryption.

**File sections:** Overview · When to Use This Skill · Legal Frameworks · Core Principles · User Rights (GDPR) · Deep Dive: Why It Matters

#### DevOps (20)

##### `apify-actorization` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 67/100 |

> Actorization converts existing software into reusable serverless applications compatible with the Apify platform. Actors are programs packaged as Docker images that accept well-defined JSON input, per

**File sections:** Quick Start · When to Use This Skill · Prerequisites · Actorization Checklist · Step 1: Analyze the Project · Step 2: Initialize Actor Structure

##### `devops-deploy` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 67/100 |

> DevOps e deploy de aplicacoes — Docker, CI/CD com GitHub Actions, AWS Lambda, SAM, Terraform, infraestrutura como codigo e monitoramento.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Dockerfile Otimizado (Python) · Docker Compose (Dev Local)

#### Frontend (81)

##### `design-taste-frontend` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 65/100 |

> Use when building high-agency frontend interfaces with strict design taste, calibrated color, responsive layout, and motion rules.

**File sections:** When to Use · Limitations · 1. ACTIVE BASELINE CONFIGURATION · 2. DEFAULT ARCHITECTURE & CONVENTIONS · 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction) · 4. CREATIVE PROACTIVITY (Anti-Slop Implementation)

##### `linux-troubleshooting` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 67/100 |

> Linux system troubleshooting workflow for diagnosing and resolving system issues, performance problems, and service failures.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Troubleshooting Checklist · Quality Gates · Related Workflow Bundles

##### `vercel-ai-sdk-expert` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 65/100 |

> Expert in the Vercel AI SDK. Covers Core API (generateText, streamText), UI hooks (useChat, useCompletion), tool calling, and streaming UI components with React and Next.js.

**File sections:** When to Use This Skill · Core Concepts · Server-Side Generation (Core API) · Frontend UI Hooks · Tool Calling (Function Calling) · Best Practices

#### Git (30)

##### `commit` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 67/100 |

> ALWAYS use this skill when committing code changes — never commit directly without it. Creates commits following Sentry conventions with proper conventional commit format and issue references. Trigger

**File sections:** When to Use · Prerequisites · Format · Commit Types · Subject Line Rules · Body Guidelines

##### `pr-writer` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 67/100 |

> Create pull requests following Sentry's engineering practices.

**File sections:** When to Use · Prerequisites · Process · PR Description Examples · Issue References · Guidelines

#### Java / Kotlin (52)

##### `azure-communication-callautomation-java` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 67/100 |

> Build server-side call automation workflows including IVR systems, call routing, recording, and AI-powered interactions.

**File sections:** Installation · Client Creation · Key Concepts · Create Outbound Call · Answer Incoming Call · Play Audio (Text-to-Speech)

##### `sankhya-dashboard-html-jsp-custom-best-pratices` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 67/100 |

> This skill should be used when the user asks for patterns, best practices, creation, or fixing of Sankhya dashboards using HTML, JSP, Java, and SQL.

**File sections:** Purpose · When to Use This Skill · Core Capabilities · Patterns · Limitations

#### JS / TS (64)

##### `react-patterns` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 66/100 |

> Modern React patterns and principles. Hooks, composition, performance, TypeScript best practices.

**File sections:** 1. Component Design Principles · 2. Hook Patterns · 3. State Management Selection · 4. React 19 Patterns · 5. Composition Patterns · 6. Performance Principles

#### Marketing (60)

##### `product-marketing-context` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 65/100 |

> Create or update a reusable product marketing context document with positioning, audience, ICP, use cases, and messaging. Use at the start of a project to avoid repeating core marketing context across

**File sections:** When to Use · Workflow · Sections to Capture · Step 3: Create the Document · Product Overview · Target Audience

##### `seo-hreflang` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 67/100 |

> >

**File sections:** When to Use · Validation Checks · Common Mistakes · Implementation Methods · Hreflang Generation · Hreflang Sitemap Generation

#### Other (233)

##### `context-management-context-save` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 65/100 |

> Use when working with context management context save

**File sections:** Use this skill when · Do not use this skill when · Instructions · Role and Purpose · Context Management Overview · Requirements and Argument Handling

##### `deployment-procedures` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 66/100 |

> Production deployment principles and decision-making. Safe deployment workflows, rollback strategies, and verification. Teaches thinking, not scripts.

**File sections:** ⚠️ How to Use This Skill · 1. Platform Selection · 2. Pre-Deployment Principles · 3. Deployment Workflow Principles · 4. Post-Deployment Verification · 5. Rollback Principles

##### `incident-response-incident-response` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 65/100 |

> Use when working with incident response incident response

**File sections:** Use this skill when · Do not use this skill when · Instructions · Configuration · Phase 1: Detection & Triage · Phase 2: Investigation & Root Cause Analysis

##### `posix-shell-pro` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 67/100 |

> Expert in strict POSIX sh scripting for maximum portability across Unix-like systems. Specializes in shell scripts that run on any POSIX-compliant shell (dash, ash, sh, bash --posix).

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · POSIX Constraints · Approach

##### `quality-nonconformance` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 66/100 |

> Codified expertise for quality control, non-conformance investigation, root cause analysis, corrective action, and supplier quality management in regulated manufacturing.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

##### `receiving-code-review` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 66/100 |

> Code review requires technical evaluation, not emotional performance.

**File sections:** Overview · The Response Pattern · Forbidden Responses · Handling Unclear Feedback · Source-Specific Handling · YAGNI Check for "Professional" Features

##### `skill-router` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 66/100 |

> Use when the user is unsure which skill to use or where to start. Interviews the user with targeted questions and recommends the best skill(s) from the installed library for their goal.

**File sections:** When to Use · Goal · Instructions · Example Interaction · Skill Routing Reference · Constraints

##### `startup-business-analyst-market-opportunity` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 65/100 |

> 'Generate comprehensive market opportunity analysis with TAM/SAM/SOM

**File sections:** Use this skill when · Do not use this skill when · Instructions · What This Command Does · Instructions for Claude · Tips for Best Results

#### Python (70)

##### `azure-eventgrid-py` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 66/100 |

> Azure Event Grid SDK for Python. Use for publishing events, handling CloudEvents, and event-driven architectures.

**File sections:** Installation · Environment Variables · Authentication · Event Types · Publish CloudEvents · Publish EventGridEvents

##### `azure-storage-file-datalake-py` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 65/100 |

> Azure Data Lake Storage Gen2 SDK for Python. Use for hierarchical file systems, big data analytics, and file/directory operations.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · File System Operations · Directory Operations

##### `mcp-builder-ms` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 65/100 |

> Use this skill when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).

**File sections:** When to Use · Overview · Microsoft MCP Ecosystem · 🚀 High-Level Workflow · 📚 Documentation Library · Limitations

#### Rust (20)

##### `azure-keyvault-certificates-rust` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 67/100 |

> Azure Key Vault Certificates SDK for Rust. Use for creating, importing, and managing certificates.

**File sections:** Installation · Environment Variables · Authentication · Core Operations · Certificate Lifecycle · Best Practices

#### Security (111)

##### `agentic-actions-auditor` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 65/100 |

> >

**File sections:** When to Use · When NOT to Use · Rationalizations to Reject · Audit Methodology · Detailed References · Limitations

##### `differential-review` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 67/100 |

> Security-focused code review for PRs, commits, and diffs.

**File sections:** When to Use · Core Principles · Rationalizations (Do Not Skip) · Quick Reference · Workflow Overview · Decision Tree

##### `skill-sentinel` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 67/100 |

> Auditoria e evolucao do ecossistema de skills. Qualidade de codigo, seguranca, custos, gaps, duplicacoes, dependencias e relatorios de saude.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Resumo Rapido · Localizacao

#### Testing (71)

##### `crypto-bd-agent` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 66/100 |

> Production-tested patterns for building AI agents that autonomously discover, > evaluate, and acquire token listings for cryptocurrency exchanges.

**File sections:** Overview · When to Use This Skill · Do Not Use When · Architecture · 1. Intelligence Gathering · 2. Token Scoring (100 Points)

##### `data-engineering-data-driven-feature` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 65/100 |

> Build features guided by data insights, A/B testing, and continuous measurement using specialized agents for analysis, implementation, and experimentation.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Phase 1: Data Analysis and Hypothesis Formation · Phase 2: Feature Architecture and Analytics Design · Phase 3: Implementation with Instrumentation

##### `evaluation` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 65/100 |

> Build evaluation frameworks for agent systems. Use when testing agent performance systematically, validating context engineering choices, or measuring improvements over time.

**File sections:** When to Use This Skill · When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples

##### `semgrep-rule-variant-creator` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 67/100 |

> Creates language variants of existing Semgrep rules. Use when porting a Semgrep rule to specified target languages. Takes an existing rule and target languages as input, produces independent rule+test

**File sections:** When to Use · When NOT to Use · Input Specification · Output Specification · Rationalizations to Reject · Strictness Level

##### `unit-testing-test-generate` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 66/100 |

> Generate comprehensive, maintainable unit tests across languages with strong coverage and edge case focus.

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### AI / ML (287)

##### `clarvia-aeo-check` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 63/100 |

> Score any MCP server, API, or CLI for agent-readiness using Clarvia AEO (Agent Experience Optimization). Search 15,400+ indexed tools before adding them to your workflow.

**File sections:** Overview · Prerequisites · When to Use This Skill · How It Works · Examples · AEO Score Interpretation

##### `claude-api` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Build apps with the Claude API or Anthropic SDK. TRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK. DO NOT TRI

**File sections:** When to Use · Defaults · Language Detection · Which Surface Should I Use? · Architecture · Current Models (cached: 2026-02-17)

##### `context-degradation` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Language models exhibit predictable degradation patterns as context length increases. Understanding these patterns is essential for diagnosing failures and designing resilient systems.

**File sections:** When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples · Guidelines

##### `context-window-management` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Strategies for managing LLM context windows including

**File sections:** Capabilities · Prerequisites · Scope · Ecosystem · Patterns · Validation Checks

##### `inventory-demand-planning` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Codified expertise for demand forecasting, safety stock optimisation, replenishment planning, and promotional lift estimation at multi-location retailers.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

##### `memory-systems` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 63/100 |

> Design short-term, long-term, and graph-based memory architectures. Use when building agents that must persist across sessions, needing to maintain entity consistency across conversations, or implemen

**File sections:** When to Use This Skill · When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples

##### `mmx-cli` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Use mmx to generate text, images, video, speech, and music via the MiniMax AI platform. Use when the user wants to create media content, chat with MiniMax models, perform web search, or manage MiniMax

**File sections:** When to Use · Prerequisites · Agent Flags · Commands · Piping Patterns · Exit Codes

##### `seo-geo` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Optimize content for AI Overviews, ChatGPT, Perplexity, and other AI search systems. Use when improving GEO, AI citations, llms.txt readiness, crawler accessibility, and passage-level citability.

**File sections:** When to Use · Key Statistics · Critical Insight: Brand Mentions > Backlinks · GEO Analysis Criteria (Updated) · AI Crawler Detection · llms.txt Standard

##### `subagent-orchestrator` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 64/100 |

> Coordinate quota-aware parallel subagents for large, multi-file Antigravity tasks.

**File sections:** Use this skill when · Do not use this skill when · Phase 1 — DECOMPOSE (before any agent runs) · Phase 2 — QUOTA ROUTING · Phase 3 — CONTEXT ISOLATION · Phase 4 — PARALLEL EXECUTION

#### API (32)

##### `hugging-face-papers` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 63/100 |

> Read and analyze Hugging Face paper pages or arXiv papers with markdown and papers API metadata.

**File sections:** When to Use · Parsing the paper ID · Error Handling · Notes · Limitations

##### `reference-builder` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 64/100 |

> Creates exhaustive technical references and API documentation. Generates comprehensive parameter listings, configuration guides, and searchable reference materials.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Core Capabilities · Reference Documentation Types · Documentation Structure

#### Automation (73)

##### `intercom-automation` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 64/100 |

> Automate Intercom tasks via Rube MCP (Composio): conversations, contacts, companies, segments, admins. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `makepad-event-action` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 64/100 |

> |

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · Event Enum (Key Variants) · Handling Events in Widgets · Hit Enum

##### `office-productivity` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 63/100 |

> Office productivity workflow covering document creation, spreadsheet automation, presentation generation, and integration with LibreOffice and Microsoft Office formats.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Office Application Workflows · Quality Gates · Related Workflow Bundles

#### Backend (31)

##### `junta-leiloeiros` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 63/100 |

> Coleta e consulta dados de leiloeiros oficiais de todas as 27 Juntas Comerciais do Brasil. Scraper multi-UF, banco SQLite, API FastAPI e exportacao CSV/JSON.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Localização · Instalação (Uma Vez)

#### Data (27)

##### `unity-developer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 64/100 |

> Build Unity games with optimized C# scripts, efficient rendering, and proper asset management. Masters Unity 6 LTS, URP/HDRP pipelines, and cross-platform deployment.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Docs (16)

##### `obsidian-markdown` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 63/100 |

> Create and edit Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties, and other Obsidian-specific syntax. Use when working with .md files in Obsidian, or when the user mentions wiki

**File sections:** When to Use · Workflow: Creating an Obsidian Note · Internal Links (Wikilinks) · Embeds · Callouts · Properties (Frontmatter)

#### Frontend (81)

##### `development` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 63/100 |

> Comprehensive web, mobile, and backend development workflow bundling frontend, backend, full-stack, and mobile development skills for end-to-end application delivery.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Technology-Specific Workflows · Quality Gates · Related Workflow Bundles

##### `swiftui-expert-skill` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 64/100 |

> Write, review, or improve SwiftUI code following best practices for state management, view composition, performance, and iOS 26+ Liquid Glass adoption. Use when building new SwiftUI features, refactor

**File sections:** When to Use · Overview · Workflow Decision Tree · Core Guidelines · Quick Reference · Review Checklist

#### Java / Kotlin (52)

##### `azure-ai-projects-java` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 63/100 |

> Azure AI Projects SDK for Java. High-level SDK for Azure AI Foundry project management including connections, datasets, indexes, and evaluations.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Operations · Best Practices

#### JS / TS (64)

##### `m365-agents-ts` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 64/100 |

> Microsoft 365 Agents SDK for TypeScript/Node.js.

**File sections:** Before implementation · Installation · Environment Variables · Core Workflow: Express-hosted AgentApplication · Streaming responses with Azure OpenAI · Invoke activity handling

#### Other (233)

##### `diary` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 63/100 |

> Unified Diary System: A context-preserving automated logger for multi-project development.

**File sections:** When to Use This Skill · Step 1: Local Project Archiving (AI Generation) · Step 1.5: Refresh Project Context (Automation Script) · Step 2: Extract Global & Project Material (Script Execution) · Step 3: AI Smart Fusion & Global Archiving (AI Execution) 🧠 · Step 4: Cloud Sync & Experience Extraction (Script + Human) 🛑

##### `idea-darwin` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 63/100 |

> Darwinian idea evolution engine — toss rough ideas onto an evolution island, let them compete, crossbreed, and mutate through structured rounds to surface your strongest concepts.

**File sections:** Overview · When to Use This Skill · Core Concepts · Step-by-Step Guide · Personal knowledge base that learns my style · Commute-to-podcast converter

##### `observability-engineer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 64/100 |

> Build production-ready monitoring, logging, and tracing systems. Implements comprehensive observability strategies, SLI/SLO management, and incident response workflows.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

##### `planning-with-files` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 63/100 |

> Work like Manus: Use persistent markdown files as your \"working memory on disk.\

**File sections:** Important: Where Files Go · Quick Start · The Core Pattern · File Purposes · Critical Rules · Errors Encountered

#### Python (70)

##### `azure-storage-queue-py` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 63/100 |

> Azure Queue Storage SDK for Python. Use for reliable message queuing, task distribution, and asynchronous processing.

**File sections:** Installation · Environment Variables · Authentication · Queue Operations · Send Messages · Receive Messages

#### Security (111)

##### `gmail-automation` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 63/100 |

> Lightweight Gmail integration with standalone OAuth authentication. No MCP server required.

**File sections:** When to Use · First-Time Setup · Commands · Gmail Query Syntax · Common Label IDs · Token Management

##### `skill-scanner` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 64/100 |

> Scan agent skills for security issues before adoption. Detects prompt injection, malicious code, excessive permissions, secret exposure, and supply chain risks.

**File sections:** When to Use · Bundled Script · Workflow · Confidence Levels · Output Format · Skill Security Scan: [Skill Name]

#### Testing (71)

##### `bash-scripting` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 64/100 |

> Bash scripting workflow for creating production-ready shell scripts with defensive patterns, error handling, and testing.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Script Template · Quality Gates · Related Workflow Bundles

##### `finishing-a-development-branch` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 63/100 |

> Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup

**File sections:** Overview · The Process · Summary · Test Plan · Quick Reference · Common Mistakes

#### AI / ML (287)

##### `adhx` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> Fetch any X/Twitter post as clean LLM-friendly JSON. Converts x.com, twitter.com, or adhx.com links into structured data with full article content, author info, and engagement metrics. No scraping or

**File sections:** Overview · When to Use This Skill · API Endpoint · URL Patterns · Workflow · Response Schema

##### `ai-agent-development` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 62/100 |

> AI agent development workflow for building autonomous agents, multi-agent systems, and agent orchestration with CrewAI, LangGraph, and custom agents.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Agent Architecture · Quality Gates · Related Workflow Bundles

##### `beautiful-prose` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 61/100 |

> A hard-edged writing style contract for timeless, forceful English prose without modern AI tics. Use when users ask for prose or rewrites that must be clean, exact, concrete, and free of AI cadence, f

**File sections:** When to Use · What this skill does · Activation · Absolute prohibitions · Positive constraints · Registers (optional)

##### `context-agent` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> Agente de contexto para continuidade entre sessoes. Salva resumos, decisoes, tarefas pendentes e carrega briefing automatico na sessao seguinte.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Localização · Inicialização (Primeira Vez)

##### `dispatching-parallel-agents` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies

**File sections:** Overview · When to Use · The Pattern · Agent Prompt Structure · Common Mistakes · When NOT to Use

##### `manage-skills` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 61/100 |

> Discover, list, create, edit, toggle, copy, move, and delete AI agent skills across 11 tools (Cursor, Claude, Agents, Windsurf, Copilot, Codex, Cline, Aider, Continue, Roo Code, Augment)

**File sections:** When to Use · Supported Tools & Paths · Skill File Format · Operations · Guidelines · Limitations

##### `manifest` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> Install and configure the Manifest observability plugin for your agents. Use when setting up telemetry, configuring API keys, or troubleshooting the plugin.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Troubleshooting · Examples

##### `mlops-engineer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> Build comprehensive ML pipelines, experiment tracking, and model registries with MLflow, Kubeflow, and modern MLOps tools.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `multi-agent-task-orchestrator` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 61/100 |

> Route tasks to specialized AI agents with anti-duplication, quality gates, and 30-minute heartbeat monitoring

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `not-human-search-mcp` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> Search AI-ready websites, inspect indexed site details, verify MCP endpoints, and discover tools and APIs using the Not Human Search MCP server

**File sections:** Overview · When to Use This Skill · MCP Configuration · Available Tools · Examples · Best Practices

##### `yes-md` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 60/100 |

> 6-layer AI governance: safety gates, evidence-based debugging, anti-slack detection, and machine-enforced hooks. Makes AI safe, thorough, and honest.

**File sections:** When to Use This Skill · The Problem: AI's Seven Deadly Shortcuts · Three Iron Rules · Safety Gates · Anti-Slack Detection · Debugging Escalation

#### Automation (73)

##### `amplitude-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 62/100 |

> Automate Amplitude tasks via Rube MCP (Composio): events, user activity, cohorts, user identification. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `basecamp-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 60/100 |

> Automate Basecamp project management, to-dos, messages, people, and to-do list organization via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `docusign-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 61/100 |

> Automate DocuSign tasks via Rube MCP (Composio): templates, envelopes, signatures, document management. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `outlook-calendar-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 60/100 |

> Automate Outlook Calendar tasks via Rube MCP (Composio): create events, manage attendees, find meeting times, and handle invitations. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `webflow-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 60/100 |

> Automate Webflow CMS collections, site publishing, page management, asset uploads, and ecommerce orders via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `appdeploy` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 60/100 |

> Deploy web apps with backend APIs, database, and file storage. Use when the user asks to deploy or publish a website or web app and wants a public URL. Uses HTTP API via curl.

**File sections:** When to Use This Skill · Setup (First Time Only) · Usage · Workflow · Available Tools · Limitations

#### Cloud (49)

##### `aws-cost-optimizer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 60/100 |

> Comprehensive AWS cost analysis and optimization recommendations using AWS CLI and Cost Explorer

**File sections:** When to Use This Skill · Core Capabilities · AWS CLI Commands · Optimization Workflow · Cost Optimization Checklist · Example Prompts

##### `data-engineer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 62/100 |

> Build scalable data pipelines, modern data warehouses, and real-time streaming architectures. Implements Apache Spark, dbt, Airflow, and cloud-native data platforms.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

#### Data (27)

##### `data-engineering-data-pipeline` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 60/100 |

> You are a data pipeline architecture expert specializing in scalable, reliable, and cost-effective data pipelines for batch and streaming data processing.

**File sections:** Use this skill when · Do not use this skill when · Requirements · Core Capabilities · Instructions · Example: Minimal Batch Pipeline

#### Database (46)

##### `monte-carlo-prevent` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 60/100 |

> Surfaces Monte Carlo data observability context (table health, alerts, lineage, blast radius) before SQL/dbt edits.

**File sections:** When to activate this skill · When NOT to activate this skill · REQUIRED: Change impact assessment before any SQL edit · Pre-edit gate — check before modifying any file · Available MCP tools · Core workflows

##### `postgresql` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 62/100 |

> Design a PostgreSQL-specific schema. Covers best-practices, data types, indexing, constraints, performance patterns, and advanced features

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Core Rules · PostgreSQL “Gotchas”

#### Design (29)

##### `design-md` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 62/100 |

> Analyze Stitch projects and synthesize a semantic design system into DESIGN.md files

**File sections:** When to Use This Skill · Overview · Prerequisites · The Goal · Retrieval and Networking · Analysis & Synthesis Instructions

##### `enhance-prompt` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 61/100 |

> Transforms vague UI ideas into polished, Stitch-optimized prompts. Enhances specificity, adds UI/UX keywords, injects design system context, and structures output for better generation results.

**File sections:** Prerequisites · When to Use This Skill · Enhancement Pipeline · Output Options · Examples · Tips for Best Results

##### `stitch-design-taste` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 62/100 |

> Use when generating Google Stitch DESIGN.md systems for premium typography, color, layout, motion intent, and anti-generic UI rules.

**File sections:** When to Use · Limitations · Overview · Prerequisites · The Goal · Analysis & Synthesis Instructions

#### Frontend (81)

##### `frontend-slides` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 62/100 |

> Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files.

**File sections:** When to Use This Skill · Core Principles · Design Aesthetics · Viewport Fitting Rules · Phase 0: Detect Mode · Phase 1: Content Discovery (New Presentations)

##### `landing-page-generator` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 61/100 |

> Generates high-converting Next.js/React landing pages with Tailwind CSS. Uses PAS, AIDA, and BAB frameworks for optimized copy/components (Heroes, Features, Pricing). Focuses on Core Web Vitals/SEO.

**File sections:** When to Use · Core Capabilities · Generation Workflow · Triggering This Skill · Design Style Reference · Copy Frameworks

##### `mobile-developer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 60/100 |

> Develop React Native, Flutter, or native mobile apps with modern architecture patterns. Masters cross-platform development, native integrations, offline sync, and app store optimization.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `swiftui-view-refactor` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 62/100 |

> Refactor SwiftUI views into smaller components with stable, explicit data flow.

**File sections:** Overview · When to Use · Core Guidelines · Workflow · Notes · Large-view handling

##### `ui-ux-designer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 60/100 |

> Create interface designs, wireframes, and design systems. Masters user research, accessibility standards, and modern design tools.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `ui-visual-validator` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 60/100 |

> Rigorous visual validation expert specializing in UI testing, design system compliance, and accessibility verification.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Core Principles · Capabilities

#### JS / TS (64)

##### `agents-md` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 60/100 |

> This skill should be used when the user asks to "create AGENTS.md", "update AGENTS.md", "maintain agent docs", "set up CLAUDE.md", or needs to keep agent instructions concise. Enforces research-backed

**File sections:** When to Use · File Setup · Before Writing · Writing Rules · Required Sections · Package Manager

##### `google-sheets-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 61/100 |

> Lightweight Google Sheets integration with standalone OAuth authentication. No MCP server required. Full read/write access.

**File sections:** First-Time Setup · Read Commands · Write Commands · Spreadsheet ID · Output Formats · A1 Notation Examples

##### `nextjs-supabase-auth` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 61/100 |

> Expert integration of Supabase Auth with Next.js App Router

**File sections:** Capabilities · Prerequisites · Patterns · Validation Checks · Collaboration · Related Skills

##### `react-nextjs-development` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 62/100 |

> React and Next.js 14+ application development with App Router, Server Components, TypeScript, Tailwind CSS, and modern frontend patterns.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Technology Stack · Quality Gates · Related Workflow Bundles

#### Marketing (60)

##### `reddit-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 60/100 |

> Automate Reddit tasks via Rube MCP (Composio): search subreddits, create posts, manage comments, and browse top content. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `seo-content` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 62/100 |

> >

**File sections:** When to Use · E-E-A-T Framework (updated Sept 2025 QRG) · Content Metrics · AI Content Assessment (Sept 2025 QRG addition) · AI Citation Readiness (GEO signals) · Content Freshness

##### `seo-forensic-incident-response` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 60/100 |

> Investigate sudden drops in organic traffic or rankings and run a structured forensic SEO incident response with triage, root-cause analysis and recovery plan.

**File sections:** When to Use · Initial Incident Triage · Incident Classification Framework · Data-Driven Investigation Steps · Forensic Hypothesis Building · Output Format

##### `seo-image-gen` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 61/100 |

> Generate SEO-focused images such as OG cards, hero images, schema assets, product visuals, and infographics. Use when image generation is part of an SEO workflow or content publishing task.

**File sections:** When to Use · Architecture Note · Prerequisites · Quick Reference · SEO Image Use Cases · Generation Pipeline

##### `seo-images` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 62/100 |

> >

**File sections:** When to Use · Checks · Output · Error Handling · Limitations

##### `wordpress-centric-high-seo-optimized-blogwriting-skill` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 60/100 |

> Create long-form, high-quality, SEO-optimized blog posts ready for WordPress with truth boxes and FAQ schema.

**File sections:** Overview · When to Use This Skill · How It Works · Prompt Template · Examples · Best Practices

#### Mobile (19)

##### `ios-developer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 62/100 |

> Develop native iOS applications with Swift/SwiftUI. Masters iOS 18, SwiftUI, UIKit integration, Core Data, networking, and App Store optimization.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Other (233)

##### `deep-research` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 62/100 |

> Run autonomous research tasks that plan, search, read, and synthesize information into comprehensive reports.

**File sections:** When to Use This Skill · Requirements · Setup · Usage · Output Formats · Cost & Time

##### `julia-pro` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 60/100 |

> Master Julia 1.10+ with modern features, performance optimization, multiple dispatch, and production-ready practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `red-team-tactics` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 61/100 |

> Red team tactics principles based on MITRE ATT&CK. Attack phases, detection evasion, reporting.

**File sections:** 1. MITRE ATT&CK Phases · 2. Reconnaissance Principles · 3. Initial Access Vectors · 4. Privilege Escalation Principles · 5. Defense Evasion Principles · 6. Lateral Movement Principles

##### `rich-elicitation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 60/100 |

> Asks clarifying questions in multiple rounds before starting ambiguous tasks. Fires when 2+ task dimensions each have 3+ viable answers.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Python (70)

##### `azure-identity-py` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 62/100 |

> Azure Identity SDK for Python authentication. Use for DefaultAzureCredential, managed identity, service principals, and token caching.

**File sections:** Installation · Environment Variables · DefaultAzureCredential · Specific Credential Types · Credential Types Table · Getting Tokens Directly

##### `python-fastapi-development` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 62/100 |

> Python FastAPI backend development with async patterns, SQLAlchemy, Pydantic, authentication, and production API patterns.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Technology Stack · Quality Gates · Related Workflow Bundles

#### Rust (20)

##### `azure-keyvault-keys-rust` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 62/100 |

> 'Azure Key Vault Keys SDK for Rust. Use for creating, managing, and using cryptographic keys. Triggers: "keyvault keys rust", "KeyClient rust", "create key rust", "encrypt rust", "sign rust".'

**File sections:** Installation · Environment Variables · Authentication · Key Types · Core Operations · Cryptographic Operations

#### Security (111)

##### `agenttrace-session-audit` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 60/100 |

> Audit local AI coding-agent sessions with agenttrace for cost, tool failures, latency, anomalies, health, diffs, and CI gates.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `audit-context-building` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 62/100 |

> Enables ultra-granular, line-by-line code analysis to build deep architectural context before vulnerability or bug finding.

**File sections:** 1. Purpose · When to Use · 2. How This Skill Behaves · Rationalizations (Do Not Skip) · 3. Phase 1 — Initial Orientation (Bottom-Up Scan) · 4. Phase 2 — Ultra-Granular Function Analysis (Default Mode)

##### `axiom` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 60/100 |

> First-principles assumption auditor. Classifies each hidden assumption (fact / convention / belief / interest-driven), ranks by fragility × impact, and rebuilds conclusions from verified premises. Bil

**File sections:** Language Rule / 语言规则 · When to Use This Skill / 何时使用 · What This Skill Does / 核心能力 · The 5-Phase Process / 拆解流程 — 5 阶段 · Anti-Sycophancy Rules / 反谄媚核心规则 · Scenario Reference / 场景引用

##### `gha-security-review` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 62/100 |

> Find exploitable vulnerabilities in GitHub Actions workflows. Every finding MUST include a concrete exploitation scenario — if you can't build the attack, don't report it.

**File sections:** When to Use · Scope · Threat Model · Confidence · Step 1: Classify Triggers and Load References · Step 2: Check for Vulnerability Classes

##### `google-calendar-automation` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 62/100 |

> Lightweight Google Calendar integration with standalone OAuth authentication. No MCP server required.

**File sections:** When to Use · First-Time Setup · Commands · Date/Time Format · Calendar ID Format · Token Management

##### `security-audit` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 62/100 |

> Comprehensive security auditing workflow covering web application testing, API security, penetration testing, vulnerability scanning, and security hardening.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Security Testing Checklist · Quality Gates · Related Workflow Bundles

##### `semgrep-rule-creator` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 61/100 |

> Creates custom Semgrep rules for detecting security vulnerabilities, bug patterns, and code patterns. Use when writing Semgrep rules or building custom static analysis detections.

**File sections:** When to Use · When NOT to Use · Rationalizations to Reject · Anti-Patterns · Strictness Level · Overview

##### `seo-programmatic` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 62/100 |

> Plan and audit programmatic SEO pages generated at scale from structured data. Use when designing templates, URL systems, internal linking, quality gates, and index-bloat safeguards for pages at scale

**File sections:** When to Use · Data Source Assessment · Template Engine Planning · URL Pattern Strategy · Internal Linking Automation · Thin Content Safeguards

#### Testing (71)

##### `test-automator` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 61/100 |

> Master AI-powered test automation with modern frameworks, self-healing tests, and comprehensive quality engineering. Build scalable testing strategies with advanced CI/CD integration.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `testing-qa` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 62/100 |

> Comprehensive testing and QA workflow covering unit testing, integration testing, E2E testing, browser automation, and quality assurance.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Testing Pyramid · Quality Gates Checklist · Related Workflow Bundles

#### AI / ML (287)

##### `ai-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 58/100 |

> Build production-ready LLM applications, advanced RAG systems, and intelligent agents. Implements vector search, multimodal AI, agent orchestration, and enterprise AI integrations.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

##### `blockchain-developer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 59/100 |

> Build production-ready Web3 applications, smart contracts, and decentralized systems. Implements DeFi protocols, NFT platforms, DAOs, and enterprise blockchain integrations.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `c4-container` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 58/100 |

> Expert C4 Container-level documentation specialist.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Containers · Purpose · Components

##### `claude-monitor` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 58/100 |

> Monitor de performance do Claude Code e sistema local. Diagnostica lentidao, mede CPU/RAM/disco, verifica API latency e gera relatorios de saude do sistema.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Quando Usar · 1. Diagnóstico Rápido (Health_Check.Py)

##### `context-fundamentals` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 58/100 |

> Context is the complete state available to a language model at inference time. It includes everything the model can attend to when generating responses: system instructions, tool definitions, retrieve

**File sections:** When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples · Guidelines

##### `growth-engine` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 58/100 |

> Motor de crescimento para produtos digitais -- growth hacking, SEO, ASO, viral loops, email marketing, CRM, referral programs e aquisicao organica.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Pirate Metrics (Aarrr) Para Auri · Checklist Seo Para Landing Page Auri

##### `rag-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 59/100 |

> Expert in building Retrieval-Augmented Generation systems. Masters

**File sections:** Capabilities · Prerequisites · Patterns · Sharp Edges · Related Skills · When to Use

##### `reverse-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 58/100 |

> Expert reverse engineer specializing in binary analysis, disassembly, decompilation, and software analysis. Masters IDA Pro, Ghidra, radare2, x64dbg, and modern RE toolchains.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Analysis Methodology · Response Approach · Code Pattern Recognition

##### `sendgrid-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 59/100 |

> Automate SendGrid email delivery workflows including marketing campaigns (Single Sends), contact and list management, sender identity setup, and email analytics through Composio's SendGrid toolkit.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `unslop` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 59/100 |

> Post-process AI-generated text through the unslop CLI to strip AI writing patterns before publishing

**File sections:** Overview · When to Use This Skill · Setup · How It Works · Examples · Best Practices

##### `vercel-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 59/100 |

> Automate Vercel tasks via Rube MCP (Composio): manage deployments, domains, DNS, env vars, projects, and teams. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### API (32)

##### `gemini-api-integration` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 58/100 |

> Use when integrating Google Gemini API into projects. Covers model selection, multimodal inputs, streaming, function calling, and production best practices.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Best Practices · Error Handling · Troubleshooting

#### Automation (73)

##### `coda-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 59/100 |

> Automate Coda tasks via Rube MCP (Composio): manage docs, pages, tables, rows, formulas, permissions, and publishing. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `pagerduty-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 58/100 |

> Automate PagerDuty tasks via Rube MCP (Composio): manage incidents, services, schedules, escalation policies, and on-call rotations. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `pipedrive-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 58/100 |

> Automate Pipedrive CRM operations including deals, contacts, organizations, activities, notes, and pipeline management via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `zoho-crm-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 59/100 |

> Automate Zoho CRM tasks via Rube MCP (Composio): create/update records, search contacts, manage leads, and convert leads. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `dotnet-architect` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 59/100 |

> Expert .NET backend architect specializing in C#, ASP.NET Core, Entity Framework, Dapper, and enterprise application patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Data (27)

##### `alpha-vantage` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 58/100 |

> Access 20+ years of global financial data: equities, options, forex, crypto, commodities, economic indicators, and 50+ technical indicators.

**File sections:** API Key Setup (Required) · Installation · Base URL & Request Pattern · Quick Start Examples · API Categories · Common Parameters

#### Database (46)

##### `database` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 58/100 |

> Database development and operations workflow covering SQL, NoSQL, database design, migrations, optimization, and data engineering.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Database Technology Workflows · Quality Gates · Related Workflow Bundles

#### DevOps (20)

##### `cloud-devops` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 59/100 |

> Cloud infrastructure and DevOps workflow covering AWS, Azure, GCP, Kubernetes, Terraform, CI/CD, monitoring, and cloud-native development.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Cloud Provider Workflows · Quality Gates · Related Workflow Bundles

##### `kubernetes-architect` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 58/100 |

> Expert Kubernetes architect specializing in cloud-native infrastructure, advanced GitOps workflows (ArgoCD/Flux), and enterprise container orchestration.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

#### Frontend (81)

##### `application-performance-performance-optimization` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 58/100 |

> Optimize end-to-end application performance with profiling, observability, and backend/frontend tuning. Use when coordinating performance optimization across the stack.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Phase 1: Performance Profiling & Baseline · Phase 2: Database & Backend Optimization

##### `tanstack-query-expert` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 58/100 |

> Expert in TanStack Query (React Query) — asynchronous state management. Covers data fetching, stale time configuration, mutations, optimistic updates, and Next.js App Router (SSR) integration.

**File sections:** When to Use This Skill · Core Concepts · Query Definition Patterns · Mutations & Cache Invalidation · Next.js App Router Integration · Best Practices

#### Java / Kotlin (52)

##### `azure-ai-agents-persistent-java` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 58/100 |

> Azure AI Agents Persistent SDK for Java. Low-level SDK for creating and managing AI agents with threads, messages, runs, and tools.

**File sections:** Installation · Environment Variables · Authentication · Key Concepts · Core Workflow · Best Practices

#### JS / TS (64)

##### `nextjs-best-practices` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 58/100 |

> Next.js App Router principles. Server Components, data fetching, routing patterns.

**File sections:** 1. Server vs Client Components · 2. Data Fetching Patterns · 3. Routing Principles · 4. API Routes · 5. Performance Principles · 6. Metadata

#### Marketing (60)

##### `marketing-ideas` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 59/100 |

> Provide proven marketing strategies and growth ideas for SaaS and software products, prioritized using a marketing feasibility scoring system.

**File sections:** 1. How This Skill Should Be Used · 2. Marketing Feasibility Score (MFS) · 3. Idea Selection Rules (Mandatory) · 4. The Marketing Idea Library (140) · 5. Required Output Format (Updated) · 6. Stage-Based Scoring Bias (Guidance)

##### `tutorial-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 58/100 |

> Creates step-by-step tutorials and educational content from code. Transforms complex concepts into progressive learning experiences with hands-on examples.

**File sections:** Use this skill when · Do not use this skill when · Limitations

##### `youtube-automation` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 59/100 |

> Automate YouTube tasks via Rube MCP (Composio): upload videos, manage playlists, search content, get analytics, and handle comments. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Mobile (19)

##### `flutter-expert` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 59/100 |

> Master Flutter development with Dart 3, advanced widgets, and multi-platform deployment.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `multi-platform-apps-multi-platform` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 58/100 |

> Build and deploy the same feature consistently across web, mobile, and desktop platforms using API-first architecture and parallel implementation strategies.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Phase 1: Architecture and API Design (Sequential) · Phase 2: Parallel Platform Implementation · Phase 3: Integration and Validation

#### Other (233)

##### `context-optimization` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 59/100 |

> Context optimization extends the effective capacity of limited context windows through strategic compression, masking, caching, and partitioning. The goal is not to magically increase context windows

**File sections:** When to Use · Core Concepts · Detailed Topics · Practical Guidance · Examples · Guidelines

##### `file-organizer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 59/100 |

> 6. Reduces Clutter: Identifies old files you probably don't need anymore

**File sections:** When to Use This Skill · What This Skill Does · Instructions · Best Practices · Limitations

##### `moyu` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 58/100 |

> >

**File sections:** When to Use · Your Identity · Three Iron Rules · Grinding vs Moyu · Moyu Checklist · Anti-Grinding Table

##### `performance-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 58/100 |

> Expert performance engineer specializing in modern observability,

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

##### `uncle-bob-craft` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 58/100 |

> Use when performing code review, writing or refactoring code, or discussing architecture; complements clean-code and does not replace project linter/formatter.

**File sections:** Overview · When to Use This Skill · Aggregators by Source · Design Patterns: Use vs Misuse · Smells and Heuristics (Summary) · Review vs Production

#### Security (111)

##### `codebase-audit-pre-push` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 59/100 |

> Deep audit before GitHub push: removes junk files, dead code, security holes, and optimization issues. Checks every file line-by-line for production readiness.

**File sections:** When to Use This Skill   · Your Job   · Audit Process   · Output Format   · Key Principles   · Related Skills  

##### `mobile-security-coder` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 59/100 |

> Expert in secure mobile coding practices specializing in input validation, WebView security, and mobile-specific security patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · When to Use vs Security Auditor · Capabilities

##### `spec-to-code-compliance` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 59/100 |

> Verifies code implements exactly what documentation specifies for blockchain audits. Use when comparing code against whitepapers, finding gaps between specs and implementation, or performing complianc

**File sections:** When to Use · When NOT to Use · Rationalizations (Do Not Skip) · Output Requirements & Quality Standards · Completeness Verification · Agent

#### Testing (71)

##### `tdd-orchestrator` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 59/100 |

> Master TDD orchestrator specializing in red-green-refactor discipline, multi-agent workflow coordination, and comprehensive test-driven development practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Expert Purpose · Capabilities · Behavioral Traits

#### AI / ML (287)

##### `api-documenter` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 56/100 |

> Master API documentation with OpenAPI 3.1, AI-powered tools, and modern developer experience practices. Create interactive docs, generate SDKs, and build comprehensive developer portals.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `brooks-lint` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 56/100 |

> AI code reviewer grounded in classic software engineering books for catching design smells, coupling issues, and architectural risks.

**File sections:** Overview · The 12 Books · When to Use This Skill · How It Works · Installation · Examples

##### `business-analyst` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 56/100 |

> Master modern business analysis with AI-powered analytics, real-time dashboards, and data-driven insights. Build comprehensive KPI frameworks, predictive models, and strategic recommendations.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `code-reviewer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 55/100 |

> Elite code review expert specializing in modern AI-powered code

**File sections:** Use this skill when · Do not use this skill when · Instructions · Expert Purpose · Capabilities · Behavioral Traits

##### `copywriting` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 57/100 |

> Write rigorous, conversion-focused marketing copy for landing pages and emails. Enforces brief confirmation and strict no-fabrication rules.

**File sections:** Purpose · Operating Mode · Phase 1 — Context Gathering (Mandatory) · Phase 2 — Copy Brief Lock (Hard Gate) · Phase 3 — Copywriting Principles · Writing Style Rules

##### `framework-migration-legacy-modernize` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 55/100 |

> Orchestrate a comprehensive legacy system modernization using the strangler fig pattern, enabling gradual replacement of outdated components while maintaining continuous business operations through ex

**File sections:** Use this skill when · Do not use this skill when · Instructions · Phase 1: Legacy Assessment and Risk Analysis · Phase 2: Test Coverage Establishment · Phase 3: Incremental Migration Implementation

##### `hugging-face-community-evals` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 55/100 |

> Run local evaluations for Hugging Face Hub models with inspect-ai or lighteval.

**File sections:** When to Use · Option A: inspect-ai with local inference providers path · Option B: inspect-ai on Local GPU · Option C: lighteval on Local GPU · Limitations

##### `iterate-pr` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 55/100 |

> Iterate on a PR until CI passes. Use when you need to fix CI failures, address review feedback, or continuously push fixes until all checks are green. Automates the feedback-fix-push-wait cycle.

**File sections:** Bundled Scripts · Workflow · Exit Conditions · Fallback · When to Use · Limitations

##### `llm-prompt-optimizer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 56/100 |

> Use when improving prompts for any LLM. Applies proven prompt engineering techniques to boost output quality, reduce hallucinations, and cut token usage.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Best Practices · Prompt Audit Checklist · Troubleshooting

##### `llm-structured-output` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 55/100 |

> >

**File sections:** What This Skill Does · When to Use This Skill · Core Workflow · Examples · Never Do This · Edge Cases

##### `returns-reverse-logistics` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 56/100 |

> Codified expertise for returns authorisation, receipt and inspection, disposition decisions, refund processing, fraud detection, and warranty claims management.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

##### `skill-improver` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 56/100 |

> Iteratively improve a Claude Code skill using the skill-reviewer agent until it meets quality standards. Use when improving a skill with multiple quality issues, iterating on a new skill until it meet

**File sections:** Prerequisites · Core Loop · When to Use · When NOT to Use · Issue Categorization · Minor Issue Evaluation

##### `subagent-driven-development` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 57/100 |

> Use when executing implementation plans with independent tasks in the current session

**File sections:** When to Use · The Process · Prompt Templates · Example Workflow · Advantages · Red Flags

#### Automation (73)

##### `bamboohr-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 56/100 |

> Automate BambooHR tasks via Rube MCP (Composio): employees, time-off, benefits, dependents, employee updates. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `close-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 56/100 |

> Automate Close CRM tasks via Rube MCP (Composio): create leads, manage calls/SMS, handle tasks, and track notes. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `convertkit-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 56/100 |

> Automate ConvertKit (Kit) tasks via Rube MCP (Composio): manage subscribers, tags, broadcasts, and broadcast stats. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `datadog-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 55/100 |

> Automate Datadog tasks via Rube MCP (Composio): query metrics, search logs, manage monitors/dashboards, create events and downtimes. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `freshdesk-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 57/100 |

> Automate Freshdesk helpdesk operations including tickets, contacts, companies, notes, and replies via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `google-analytics-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 57/100 |

> Automate Google Analytics tasks via Rube MCP (Composio): run reports, list accounts/properties, funnels, pivots, key events. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `makepad-dsl` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 56/100 |

> |

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · Key Patterns · DSL Syntax Reference · Property Types

##### `makepad-shaders` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 57/100 |

> |

**File sections:** When to Use · Documentation · Advanced Patterns · IMPORTANT: Documentation Completeness Check · Key Patterns · Shader Structure

##### `posthog-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 55/100 |

> Automate PostHog tasks via Rube MCP (Composio): events, feature flags, projects, user profiles, annotations. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `sentry-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 55/100 |

> Automate Sentry tasks via Rube MCP (Composio): manage issues/events, configure alerts, track releases, monitor projects and teams. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `wrike-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 57/100 |

> Automate Wrike project management via Rube MCP (Composio): create tasks/folders, manage projects, assign work, and track progress. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `zoom-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 57/100 |

> Automate Zoom meeting creation, management, recordings, webinars, and participant tracking via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `backend-development-feature-development` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 55/100 |

> Orchestrate end-to-end backend feature development from requirements to deployment. Use when coordinating multi-phase feature delivery across teams and services.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Configuration Options · Phase 1: Discovery & Requirements Planning

##### `backend-security-coder` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 55/100 |

> Expert in secure backend coding practices specializing in input validation, authentication, and API security. Use PROACTIVELY for backend security implementations or security code reviews.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · When to Use vs Security Auditor · Capabilities

##### `laravel-security-audit` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 57/100 |

> Security auditor for Laravel applications. Analyzes code for vulnerabilities, misconfigurations, and insecure practices using OWASP standards and Laravel security best practices.

**File sections:** Skill Metadata · Role · Use This Skill When · Do NOT Use When · Threat Model Awareness · Core Audit Areas

#### Cloud (49)

##### `hybrid-cloud-architect` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 56/100 |

> Expert hybrid cloud architect specializing in complex multi-cloud solutions across AWS/Azure/GCP and private clouds (OpenStack/VMware).

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Data (27)

##### `data-scientist` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 57/100 |

> Expert data scientist for advanced analytics, machine learning, and statistical modeling. Handles complex data analysis, predictive modeling, and business intelligence.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Database (46)

##### `context-manager` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 56/100 |

> Elite AI context engineering specialist mastering dynamic context management, vector databases, knowledge graphs, and intelligent memory systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Expert Purpose · Capabilities · Behavioral Traits

##### `database-admin` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 55/100 |

> Expert database administrator specializing in modern cloud databases, automation, and reliability engineering.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `database-optimizer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 55/100 |

> Expert database optimizer specializing in modern performance tuning, query optimization, and scalable architectures.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `notion-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 56/100 |

> Automate Notion tasks via Rube MCP (Composio): pages, databases, blocks, comments, users. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `postgresql-optimization` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 56/100 |

> PostgreSQL database optimization workflow for query tuning, indexing strategies, performance analysis, and production database management.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Optimization Checklist · Quality Gates · Related Workflow Bundles

##### `sql-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 56/100 |

> Master modern SQL with cloud-native databases, OLTP/OLAP optimization, and advanced query techniques. Expert in performance tuning, data modeling, and hybrid analytical systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

#### DevOps (20)

##### `terraform-specialist` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 56/100 |

> Expert Terraform/OpenTofu specialist mastering advanced IaC automation, state management, and enterprise infrastructure patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

#### Docs (16)

##### `c4-component` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 57/100 |

> Expert C4 Component-level documentation specialist. Synthesizes C4 Code-level documentation into Component-level architecture, defining component boundaries, interfaces, and relationships.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Overview · Purpose · Software Features

##### `c4-context` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 55/100 |

> Expert C4 Context-level documentation specialist. Creates high-level system context diagrams, documents personas, user journeys, system features, and external dependencies.

**File sections:** Use this skill when · Do not use this skill when · Instructions · System Overview · Personas · System Features

#### Frontend (81)

##### `frontend-developer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 55/100 |

> Build React components, implement responsive layouts, and handle client-side state management. Masters React 19, Next.js 15, and modern frontend architecture.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `frontend-security-coder` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 57/100 |

> Expert in secure frontend coding practices specializing in XSS prevention, output sanitization, and client-side security patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · When to Use vs Security Auditor · Capabilities

#### Git (30)

##### `deployment-engineer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 57/100 |

> Expert deployment engineer specializing in modern CI/CD pipelines, GitOps workflows, and advanced deployment automation.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

##### `git-pr-review` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 55/100 |

> Generate a concise and structured PR description from commit history with minimal token usage

**File sections:** Objective · When to Use · Strategy (Token Efficient) · Untrusted Input Rules · Steps · Title

##### `gitlab-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 55/100 |

> Automate GitLab project management, issues, merge requests, pipelines, branches, and user operations via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Go (10)

##### `django-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 55/100 |

> Master Django 5.x with async views, DRF, Celery, and Django Channels. Build scalable web applications with proper architecture, testing, and deployment.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `golang-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 55/100 |

> Master Go 1.21+ with modern patterns, advanced concurrency, performance optimization, and production-ready microservices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `temporal-golang-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 57/100 |

> Use when building durable distributed systems with Temporal Go SDK. Covers deterministic workflow rules, mTLS worker configs, and advanced patterns.

**File sections:** Overview · When to Use This Skill · Do not use this skill when · Step-by-Step Guide · Capabilities · Examples

#### Java / Kotlin (52)

##### `java-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 55/100 |

> Master Java 21+ with modern features like virtual threads, pattern matching, and Spring Boot 3.x. Expert in the latest Java ecosystem including GraalVM, Project Loom, and cloud-native patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Marketing (60)

##### `brand-guidelines` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 57/100 |

> Write copy following Sentry brand guidelines. Use when writing UI text, error messages, empty states, onboarding flows, 404 pages, documentation, marketing copy, or any user-facing content. Covers bot

**File sections:** When to Use · Tone Selection · Plain Speech (Default) · Sentry Voice · General Rules · Dash Usage

##### `confluence-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 56/100 |

> Automate Confluence page creation, content search, space management, labels, and hierarchy navigation via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Mobile (19)

##### `canva-automation` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 55/100 |

> Automate Canva tasks via Rube MCP (Composio): designs, exports, folders, brand templates, autofill. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `godot-4-migration` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 57/100 |

> Specialized guide for migrating Godot 3.x projects to Godot 4 (GDScript 2.0), covering syntax changes, Tweens, and exports.

**File sections:** Overview · When to Use This Skill · Key Changes · Examples · Best Practices · Troubleshooting

#### Other (233)

##### `architect-review` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 56/100 |

> Master software architect specializing in modern architecture

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Expert Purpose · Capabilities

##### `comprehensive-review-full-review` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 56/100 |

> Use when working with comprehensive review full review

**File sections:** Use this skill when · Do not use this skill when · Instructions · Review Configuration Options · Phase 1: Code Quality & Architecture Review · Phase 2: Security & Performance Review

##### `debugging-toolkit-smart-debug` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 56/100 |

> Use when working with debugging toolkit smart debug

**File sections:** Use this skill when · Do not use this skill when · Instructions · Context · Workflow · Example: Minimal Debug Session

##### `energy-procurement` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 57/100 |

> Codified expertise for electricity and gas procurement, tariff optimisation, demand charge management, renewable PPA evaluation, and multi-facility energy cost management.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

##### `error-diagnostics-smart-debug` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 56/100 |

> Use when working with error diagnostics smart debug

**File sections:** Use this skill when · Do not use this skill when · Instructions · Context · Workflow · Example: Minimal Debug Session

##### `powershell-windows` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 55/100 |

> PowerShell Windows patterns. Critical pitfalls, operator syntax, error handling.

**File sections:** 1. Operator Syntax Rules · 2. Unicode/Emoji Restriction · 3. Null Check Patterns · 4. String Interpolation · 5. Error Handling · 6. File Paths

##### `production-scheduling` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 56/100 |

> Codified expertise for production scheduling, job sequencing, line balancing, changeover optimisation, and bottleneck resolution in discrete and batch manufacturing.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

#### Python (70)

##### `fastapi-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 57/100 |

> Build high-performance async APIs with FastAPI, SQLAlchemy 2.0, and Pydantic V2. Master microservices, WebSockets, and modern Python async patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `temporal-python-testing` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 57/100 |

> Comprehensive testing approaches for Temporal workflows using pytest, progressive disclosure resources for specific testing scenarios.

**File sections:** Do not use this skill when · Instructions · Use this skill when · Testing Philosophy · Available Resources · Quick Start Guide

##### `uniprot-database` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 57/100 |

> Direct REST API access to UniProt. Protein searches, FASTA retrieval, ID mapping, Swiss-Prot/TrEMBL. For Python workflows with multiple databases, prefer bioservices (unified interface to 40+ services

**File sections:** Overview · When to Use This Skill · Core Capabilities · Python Implementation · Query Syntax Examples · Best Practices

#### Rust (20)

##### `azure-cosmos-rust` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 57/100 |

> Azure Cosmos DB SDK for Rust (NoSQL API). Use for document CRUD, queries, containers, and globally distributed data.

**File sections:** Installation · Environment Variables · Authentication · Client Hierarchy · Core Workflow · Key Auth (Optional)

##### `azure-eventhub-rust` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 57/100 |

> Azure Event Hubs SDK for Rust. Use for sending and receiving events, streaming data ingestion.

**File sections:** Installation · Environment Variables · Key Concepts · Producer Client · Consumer Client · Best Practices

##### `azure-keyvault-secrets-rust` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 56/100 |

> 'Azure Key Vault Secrets SDK for Rust. Use for storing and retrieving secrets, passwords, and API keys. Triggers: "keyvault secrets rust", "SecretClient rust", "get secret rust", "set secret rust".'

**File sections:** Installation · Environment Variables · Authentication · Core Operations · Best Practices · RBAC Permissions

##### `azure-storage-blob-rust` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 57/100 |

> Azure Blob Storage SDK for Rust. Use for uploading, downloading, and managing blobs and containers.

**File sections:** Installation · Environment Variables · Authentication · Client Types · Core Operations · Container Operations

##### `bevy-ecs-expert` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 55/100 |

> Master Bevy's Entity Component System (ECS) in Rust, covering Systems, Queries, Resources, and parallel scheduling.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Examples · Best Practices · Troubleshooting

##### `rust-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 55/100 |

> Master Rust 1.75+ with modern async patterns, advanced type system features, and production-ready systems programming.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `skill-audit` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 57/100 |

> Pre-install security scanner for AI agent skills. 7.5% of 14,706 skills are malicious. Audit before you trust.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · What Gets Detected · Real Attack Examples

#### Security (111)

##### `graphql-architect` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 56/100 |

> Master modern GraphQL with federation, performance optimization, and enterprise security. Build scalable schemas, implement advanced caching, and design real-time systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `logic-lens` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 55/100 |

> AI-powered Claude Code skill that performs deep code review using formal logic and reasoning frameworks to detect bugs, anti-patterns, and security risks beyond what linters catch.

**File sections:** Overview · When to Use This Skill · How It Works · Installation · Examples · The 9 Risk Categories

##### `network-engineer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 56/100 |

> Expert network engineer specializing in modern cloud networking, security architectures, and performance optimization.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `security-auditor` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 57/100 |

> Expert security auditor specializing in DevSecOps, comprehensive cybersecurity, and compliance frameworks.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Purpose · Capabilities

##### `web-security-testing` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 57/100 |

> Web application security testing workflow for OWASP Top 10 vulnerabilities including injection, XSS, authentication flaws, and access control issues.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · OWASP Top 10 Checklist · Quality Gates · Related Workflow Bundles

#### Testing (71)

##### `ab-test-setup` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 57/100 |

> Structured guide for setting up A/B tests with mandatory gates for hypothesis, metrics, and execution readiness.

**File sections:** 1?? Purpose & Scope · 2?? Pre-Requisites · Running the Test · Analyzing Results · Documentation & Learning · Refusal Conditions (Safety)

##### `expo-dev-client` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 57/100 |

> Build and distribute Expo development clients locally or via TestFlight

**File sections:** When to Use · Important: When Development Clients Are Needed · EAS Configuration · Building for TestFlight · Building Locally · Installing Local Builds

##### `git-pr-workflows-git-workflow` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 55/100 |

> Orchestrate a comprehensive git workflow from code review through PR creation, leveraging specialized agents for quality assurance, testing, and deployment readiness. This workflow implements modern g

**File sections:** Use this skill when · Do not use this skill when · Instructions · Configuration · Phase 1: Pre-Commit Review and Analysis · Phase 2: Testing and Validation

#### AI / ML (287)

##### `activecampaign-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Automate ActiveCampaign tasks via Rube MCP (Composio): manage contacts, tags, list subscriptions, automation enrollment, and tasks. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `api-documentation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 53/100 |

> API documentation workflow for generating OpenAPI specs, creating developer guides, and maintaining comprehensive API documentation.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Quality Gates · Related Workflow Bundles · Limitations

##### `apify-ultimate-scraper` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> AI-driven data extraction from 55+ Actors across all major platforms. This skill automatically selects the best Actor for your task.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `cal-com-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 53/100 |

> Automate Cal.com tasks via Rube MCP (Composio): manage bookings, check availability, configure webhooks, and handle teams. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `content-marketer` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Elite content marketing strategist specializing in AI-powered content creation, omnichannel distribution, SEO optimization, and data-driven performance marketing.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Expert Purpose · Capabilities · Behavioral Traits

##### `customer-support` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Elite AI-powered customer support specialist mastering conversational AI, automated ticketing, sentiment analysis, and omnichannel support experiences.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Expert Purpose · Capabilities · Behavioral Traits

##### `global-chat-agent-discovery` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Discover and search 18K+ MCP servers and AI agents across 6+ registries using Global Chat's cross-protocol directory and MCP server.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `mailchimp-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Automate Mailchimp email marketing including campaigns, audiences, subscribers, segments, and analytics via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `mcp-builder` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Create MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. The quality of an MCP server is measured by how well it enables LLMs to acc

**File sections:** Overview · 🚀 High-Level Workflow · 📚 Documentation Library · When to Use · Limitations

##### `monte-carlo-monitor-creation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Guides creation of Monte Carlo monitors via MCP tools, producing monitors-as-code YAML for CI/CD deployment.

**File sections:** When to activate this skill · When NOT to activate this skill · Available MCP tools · Monitor types · Procedure · MaC YAML format

##### `postmark-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 53/100 |

> Automate Postmark email delivery tasks via Rube MCP (Composio): send templated emails, manage templates, monitor delivery stats and bounces. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `prompt-engineering` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 53/100 |

> Expert guide on prompt engineering patterns, best practices, and optimization techniques. Use when user wants to improve prompts, learn prompting strategies, or debug agent behavior.

**File sections:** Core Capabilities · Key Patterns · Best Practices · Common Pitfalls · When to Use · Limitations

##### `videodb-skills` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Upload, stream, search, edit, transcribe, and generate AI video and audio using the VideoDB SDK.

**File sections:** Purpose · When to Use This Skill · Setup · Capabilities · Examples · Repository

##### `wiki-vitepress` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 54/100 |

> Transform generated wiki Markdown files into a polished VitePress static site with dark theme and interactive Mermaid diagrams. Use when user asks to \"build a site\" or \"package as VitePress\", user

**File sections:** When to Use · VitePress Scaffolding · Config Requirements (`config.mts`) · Dark-Mode Mermaid: Three-Layer Fix · Click-to-Zoom for Mermaid Diagrams · Post-Processing Rules

#### Automation (73)

##### `clickup-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 53/100 |

> Automate ClickUp project management including tasks, spaces, folders, lists, comments, and team operations via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `dropbox-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 53/100 |

> Automate Dropbox file management, sharing, search, uploads, downloads, and folder operations via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `mixpanel-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 54/100 |

> Automate Mixpanel tasks via Rube MCP (Composio): events, segmentation, funnels, cohorts, user profiles, JQL queries. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `monday-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 53/100 |

> Automate Monday.com work management including boards, items, columns, groups, subitems, and updates via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `one-drive-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 54/100 |

> Automate OneDrive file management, search, uploads, downloads, sharing, permissions, and folder operations via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `segment-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 54/100 |

> Automate Segment tasks via Rube MCP (Composio): track events, identify users, manage groups, page views, aliases, batch operations. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `telegram-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 53/100 |

> Automate Telegram tasks via Rube MCP (Composio): send messages, manage chats, share photos/documents, and handle bot commands. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `todoist-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 53/100 |

> Automate Todoist task management, projects, sections, filtering, and bulk operations via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `whatsapp-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 53/100 |

> Automate WhatsApp Business tasks via Rube MCP (Composio): send messages, manage templates, upload media, and handle contacts. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `verification-before-completion` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 54/100 |

> Claiming work is complete without verification is dishonesty, not efficiency. Use when ANY variation of success/completion claims, ANY expression of satisfaction, or ANY positive statement about work

**File sections:** Overview · The Iron Law · The Gate Function · Common Failures · Red Flags - STOP · Rationalization Prevention

#### Data (27)

##### `hugging-face-cli` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 54/100 |

> Use the Hugging Face Hub CLI (`hf`) to download, upload, and manage models, datasets, and Spaces.

**File sections:** When to Use · Commands · Common options · Mounting repos as local filesystems · Tips · Limitations

#### Database (46)

##### `llm-ops` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 53/100 |

> LLM Operations -- RAG, embeddings, vector databases, fine-tuning, prompt engineering avancado, custos de LLM, evals de qualidade e arquiteturas de IA para producao.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Arquitetura Rag Completa · Pipeline De Indexacao

##### `rag-implementation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 54/100 |

> RAG (Retrieval-Augmented Generation) implementation workflow covering embedding selection, vector database setup, chunking strategies, and retrieval optimization.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · RAG Architecture · Quality Gates · Related Workflow Bundles

##### `supabase-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 54/100 |

> Automate Supabase database queries, table management, project administration, storage, edge functions, and SQL execution via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### DevOps (20)

##### `devops-troubleshooter` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 54/100 |

> Expert DevOps troubleshooter specializing in rapid incident response, advanced debugging, and modern observability.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Java / Kotlin (52)

##### `earllm-build` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 54/100 |

> Build, maintain, and extend the EarLLM One Android project — a Kotlin/Compose app that connects Bluetooth earbuds to an LLM via voice pipeline.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Project Location · Module Dependency Graph

##### `seo-technical` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 54/100 |

> Audit technical SEO across crawlability, indexability, security, URLs, mobile, Core Web Vitals, structured data, JavaScript rendering, and related platform signals like robots.txt and AI crawler acces

**File sections:** When to Use · Categories · Output · DataForSEO Integration (Optional) · Error Handling · Limitations

#### Marketing (60)

##### `box-automation` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 53/100 |

> Automate Box operations including file upload/download, content search, folder management, collaboration, metadata queries, and sign requests through Composio's Box toolkit.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Other (233)

##### `full-stack-orchestration-full-stack-feature` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 54/100 |

> Use when working with full stack orchestration full stack feature

**File sections:** Use this skill when · Do not use this skill when · Instructions · Phase 1: Architecture & Design Foundation · Phase 2: Parallel Implementation · Phase 3: Integration & Testing

##### `game-development` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 53/100 |

> Game development orchestrator. Routes to platform-specific skills based on project needs.

**File sections:** When to Use This Skill · Sub-Skill Routing · Core Principles (All Platforms) · Anti-Patterns (Universal) · Routing Examples · Limitations

##### `i18n-localization` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 54/100 |

> Internationalization and localization patterns. Detecting hardcoded strings, managing translations, locale files, RTL support.

**File sections:** 1. Core Concepts · 2. When to Use i18n · 3. Implementation Patterns · 4. File Structure · 5. Best Practices · 6. Common Issues

##### `performance-profiling` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 54/100 |

> Performance profiling principles. Measurement, analysis, and optimization techniques.

**File sections:** 🔧 Runtime Scripts · 1. Core Web Vitals · 2. Profiling Workflow · 3. Bundle Analysis · 4. Runtime Profiling · 5. Common Bottlenecks

##### `saas-mvp-launcher` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 54/100 |

> Use when planning or building a SaaS MVP from scratch. Provides a structured roadmap covering tech stack, architecture, auth, payments, and launch checklist.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Best Practices · Troubleshooting · Limitations

#### Security (111)

##### `api-security-testing` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 54/100 |

> API security testing workflow for REST and GraphQL APIs covering authentication, authorization, rate limiting, input validation, and security best practices.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · API Security Checklist · Quality Gates · Related Workflow Bundles

#### Testing (71)

##### `ml-engineer` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 54/100 |

> Build production ML systems with PyTorch 2.x, TensorFlow, and modern ML frameworks. Implements model serving, feature engineering, A/B testing, and monitoring.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

##### `tdd-workflows-tdd-refactor` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 53/100 |

> Use when working with tdd workflows tdd refactor

**File sections:** Use this skill when · Do not use this skill when · Instructions · Usage · Core Process · Output Requirements

#### AI / ML (287)

##### `antigravity-skill-orchestrator` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 51/100 |

> A meta-skill that understands task requirements, dynamically selects appropriate skills, tracks successful skill combinations using agent-memory-mcp, and prevents skill overuse for simple tasks.

**File sections:** Overview · When to Use This Skill · Core Concepts · Step-by-Step Guide · Examples · Best Practices

##### `aomi-transact` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 50/100 |

> Build natural-language crypto/DeFi agents and EVM MCP plugins (Claude Code, Cursor, Codex, Gemini). Aomi turns prompts into wallet-signed txs on Ethereum, Base, Arbitrum, Optimism, Polygon, Linea - no

**File sections:** Overview · When to Use This Skill · Examples · Limitations · Best Practices · Authorization Disclaimer

##### `brevo-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 50/100 |

> Automate Brevo (formerly Sendinblue) email marketing operations through Composio's Brevo toolkit via Rube MCP.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `calendly-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 51/100 |

> Automate Calendly scheduling, event management, invitee tracking, availability checks, and organization administration via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `freshservice-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 51/100 |

> Automate Freshservice ITSM tasks via Rube MCP (Composio): create/update tickets, bulk operations, service requests, and outbound emails. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `hierarchical-agent-memory` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 51/100 |

> Scoped CLAUDE.md memory system that reduces context token spend. Creates directory-level context files, tracks savings via dashboard, and routes agents to the right sub-context.

**File sections:** When to Use This Skill · How It Works · Context Routing · Commands · Examples · Best Practices

##### `klaviyo-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 52/100 |

> Automate Klaviyo tasks via Rube MCP (Composio): manage email/SMS campaigns, inspect campaign messages, track tags, and monitor send jobs. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `mise-configurator` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 50/100 |

> Generate production-ready mise.toml setups for local development, CI/CD pipelines, and toolchain standardization.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `multi-agent-brainstorming` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 52/100 |

> Simulate a structured peer-review process using multiple specialized agents to validate designs, surface hidden assumptions, and identify failure modes before implementation.

**File sections:** Purpose · Operating Model · Agent Roles (Non-Negotiable) · The Process · Decision Log (Mandatory Artifact) · Exit Criteria (Hard Stop)

##### `outlook-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 52/100 |

> Automate Outlook tasks via Rube MCP (Composio): emails, calendar, contacts, folders, attachments. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `rayden-use` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 52/100 |

> Build and maintain Rayden UI components and screens in Figma via Figma MCP with full design token enforcement

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

##### `recursive-context-pruning-token-budgeting` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 52/100 |

> Optimizes AI agent performance by pruning redundant context, managing token usage, and enforcing ultra-concise, direct-to-value responses.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `stability-ai` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 51/100 |

> Geracao de imagens via Stability AI (SD3.5, Ultra, Core). Text-to-image, img2img, inpainting, upscale, remove-bg, search-replace. 15 estilos artisticos.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · How It Works · Quando Usar Esta Skill Vs Ai-Studio-Image · Setup Rapido

##### `writing-skills` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 52/100 |

> Use when creating, updating, or improving agent skills.

**File sections:** ⚡ Quick Decision Tree · 📚 Component Index · 🛠️ Templates · When to Use · How It Works · Quick Example

#### Automation (73)

##### `makepad-basics` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 50/100 |

> |

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · Key Patterns · API Reference Table · Platform Setup

##### `makepad-layout` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 52/100 |

> |

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · Key Patterns · Layout Properties Reference · Size Values

##### `microsoft-teams-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 52/100 |

> Automate Microsoft Teams tasks via Rube MCP (Composio): send messages, manage channels, create meetings, handle chats, and search messages. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `miro-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 51/100 |

> Automate Miro tasks via Rube MCP (Composio): boards, items, sticky notes, frames, sharing, connectors. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `render-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 50/100 |

> Automate Render tasks via Rube MCP (Composio): services, deployments, projects. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `salesforce-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 51/100 |

> Automate Salesforce tasks via Rube MCP (Composio): leads, contacts, accounts, opportunities, SOQL queries. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `sred-work-summary` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 52/100 |

> Go back through the previous year of work and create a Notion doc that groups relevant links into projects that can then be documented as SRED projects.

**File sections:** When to Use · Prerequisites · Process · [Project Name] · Resources · Limitations

##### `twitter-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 52/100 |

> Automate Twitter/X tasks via Rube MCP (Composio): posts, search, users, bookmarks, lists, media. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `zendesk-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 52/100 |

> Automate Zendesk tasks via Rube MCP (Composio): tickets, users, organizations, replies. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `aegisops-ai` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 51/100 |

> Autonomous DevSecOps & FinOps Guardrails. Orchestrates Gemini 3 Flash to audit Linux Kernel patches, Terraform cost drifts, and K8s compliance.

**File sections:** Goal · When to Use · When Not to Use · ?? Generative AI Integration · ?? Core Modules · ??? Setup & Environment

##### `laravel-expert` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 50/100 |

> Senior Laravel Engineer role for production-grade, maintainable, and idiomatic Laravel solutions. Focuses on clean architecture, security, performance, and modern standards (Laravel 10/11+).

**File sections:** Skill Metadata · Role · Use This Skill When · Do NOT Use When · Engineering Principles · Anti-Patterns to Avoid

#### DevOps (20)

##### `cloud-architect` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 50/100 |

> Expert cloud architect specializing in AWS/Azure/GCP multi-cloud infrastructure design, advanced IaC (Terraform/OpenTofu/CDK), FinOps cost optimization, and modern architectural patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Docs (16)

##### `sred-project-organizer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 51/100 |

> Take a list of projects and their related documentation, and organize them into the SRED format for submission.

**File sections:** When to Use · Step 1 · [Project Name] · Step 2 · Step 3 · Step 4

#### Frontend (81)

##### `rayden-code` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 52/100 |

> Generate React code with Rayden UI components using correct props, tokens, and premium layout patterns

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

#### Git (30)

##### `bitbucket-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 52/100 |

> Automate Bitbucket repositories, pull requests, branches, issues, and workspace management via Rube MCP (Composio). Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `github-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 51/100 |

> Automate GitHub repositories, issues, pull requests, branches, CI/CD, and permissions via Rube MCP (Composio). Manage code workflows, review PRs, search code, and handle deployments programmatically.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `github-issue-creator` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 52/100 |

> Turn error logs, screenshots, voice notes, and rough bug reports into crisp, developer-ready GitHub issues with repro steps, impact, and evidence.

**File sections:** Output Template · Summary · Environment · Reproduction Steps · Expected Behavior · Actual Behavior

#### JS / TS (64)

##### `saas-multi-tenant` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 52/100 |

> Design and implement multi-tenant SaaS architectures with row-level security, tenant-scoped queries, shared-schema isolation, and safe cross-tenant admin patterns in PostgreSQL and TypeScript.

**File sections:** When to Use This Skill · Core Workflow · Examples · Never Do This · Edge Cases · Best Practices

#### Marketing (60)

##### `seo-schema` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 52/100 |

> >

**File sections:** When to Use · Detection · Validation · Schema Type Status (as of Feb 2026) · Generation · Common Schema Templates

##### `seo-sitemap` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 50/100 |

> >

**File sections:** When to Use · Mode 1: Analyze Existing Sitemap · Mode 2: Generate New Sitemap · Sitemap Format · Error Handling · Output

#### Mobile (19)

##### `android-jetpack-compose-expert` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 51/100 |

> Expert guidance for building modern Android UIs with Jetpack Compose, covering state management, navigation, performance, and Material Design 3.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Examples · Best Practices · Troubleshooting

#### Other (233)

##### `hr-pro` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 50/100 |

> Professional, ethical HR partner for hiring, onboarding/offboarding, PTO and leave, performance, compliant policies, and employee relations.

**File sections:** Use this skill when · Do not use this skill when · Instructions · IMPORTANT LEGAL DISCLAIMER · Scope & Mission · Operating Principles

##### `plan-writing` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 50/100 |

> Structured task planning with clear breakdowns, dependencies, and verification criteria. Use when implementing features, refactoring, or any multi-step work.

**File sections:** Overview · Task Breakdown Principles · Planning Principles (NOT Templates!) · Plan Structure (Flexible, Not Fixed!) · Goal · Tasks

##### `simplify-code` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 50/100 |

> Review a diff for clarity and safe simplifications, then optionally apply low-risk fixes.

**File sections:** When to Use · Modes · Step 1: Determine the Scope and Diff Command · Step 2: Launch Four Review Sub-Agents in Parallel · Step 3: Aggregate Findings · Step 4: Fix Issues Carefully

##### `speckit-updater` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 51/100 |

> SpecKit Safe Update

**File sections:** When to Use · What to do when this skill is invoked · Commands · Features · Architecture · Exit Codes

#### Python (70)

##### `mcp-tool-developer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 50/100 |

> Build Model Context Protocol (MCP) servers and tools from scratch. Full-stack MCP development with TypeScript/Python, testing, deployment, and registry publishing.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `python-pro` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 52/100 |

> Master Python 3.12+ with modern features, async programming, performance optimization, and production-ready practices. Expert in the latest Python ecosystem including uv, ruff, pydantic, and FastAPI.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Capabilities · Behavioral Traits

#### Rust (20)

##### `azure-identity-rust` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 52/100 |

> Azure Identity SDK for Rust authentication. Use for DeveloperToolsCredential, ManagedIdentityCredential, ClientSecretCredential, and token-based authentication.

**File sections:** Installation · Environment Variables · DeveloperToolsCredential · Credential Types · ManagedIdentityCredential · ClientSecretCredential

#### Security (111)

##### `google-drive-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 52/100 |

> Lightweight Google Drive integration with standalone OAuth authentication. No MCP server required. Full read/write access.

**File sections:** When to Use · First-Time Setup · Read Commands · Write Commands · Search Query Formats · File ID Format

##### `google-slides-automation` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 52/100 |

> Lightweight Google Slides integration with standalone OAuth authentication. No MCP server required. Full read/write access.

**File sections:** When to Use · First-Time Setup · Read Commands · Write Commands · Slide Layouts · Presentation ID Format

##### `indexing-issue-auditor` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 50/100 |

> High-level technical SEO and site architecture auditor. Invoke to scan local or live environments for indexing, crawl budget, and structural errors.

**File sections:** Overview · When to Use This Skill · Input Types · How It Works (Mandatory Phases) · Master Issue Control Table · Examples

##### `linkedin-profile-optimizer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 52/100 |

> High-intent expert for LinkedIn profile checks, authority building, and SEO optimization. Invoke to audit, rewrite, and enhance profiles for top 1% positioning.

**File sections:** Overview · When to Use This Skill · Input Types · How It Works · Examples · Best Practices

##### `mock-hunter` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 51/100 |

> Audit a live web page in five phases (catalog, click, trace, classify, report) to identify mock data, hardcoded values, LLM-generated metrics, and broken endpoints. Outputs a markdown report with REAL

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `openclaw-github-repo-commander` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 50/100 |

> 7-stage super workflow for GitHub repo audit, cleanup, PR review, and competitor analysis

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

##### `security-scanning-security-hardening` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 52/100 |

> Coordinate multi-layer security scanning and hardening across application, infrastructure, and compliance controls.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Phase 1: Comprehensive Security Assessment · Phase 2: Vulnerability Remediation

##### `variant-analysis` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 50/100 |

> Find similar vulnerabilities and bugs across codebases using pattern-based analysis. Use when hunting bug variants, building CodeQL/Semgrep queries, analyzing security vulnerabilities, or performing s

**File sections:** When to Use · When NOT to Use · The Five-Step Process · Tool Selection · Key Principles · Critical Pitfalls to Avoid

#### Testing (71)

##### `squirrel` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 50/100 |

> Full-cycle AI coding skill: plans, builds, tests, lints, fixes bugs, and writes production-grade docs. Auto-detects project state and adapts its 8-phase pipeline.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Platform Compatibility

##### `tdd-workflow` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 51/100 |

> Test-Driven Development workflow principles. RED-GREEN-REFACTOR cycle.

**File sections:** 1. The TDD Cycle · 2. The Three Laws of TDD · 3. RED Phase Principles · 4. GREEN Phase Principles · 5. REFACTOR Phase Principles · 6. AAA Pattern

##### `tdd-workflows-tdd-red` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 52/100 |

> Generate failing tests for the TDD red phase to define expected behavior and edge cases.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Role · Prompt Template

#### AI / ML (287)

##### `buywhere-product-catalog` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 48/100 |

> Use BuyWhere's MCP and API surfaces to add product search, price comparison, and deal discovery to AI shopping agents.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `carrier-relationship-management` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 49/100 |

> Codified expertise for managing carrier portfolios, negotiating freight rates, tracking carrier performance, allocating freight, and maintaining strategic carrier relationships.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

##### `code-simplifier` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 49/100 |

> Simplifies and refines code for clarity, consistency, and maintainability while preserving all functionality. Use when asked to "simplify code", "clean up code", "refactor for clarity", "improve reada

**File sections:** When to Use · Refinement Principles · Refinement Process · Examples · Limitations

##### `cold-email` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 49/100 |

> Write B2B cold emails and follow-up sequences that earn replies. Use when creating outbound prospecting emails, SDR outreach, personalized opening lines, subject lines, CTAs, and multi-touch follow-up

**File sections:** When to Use · Before Writing · Writing Principles · Voice & Tone · Structure · Subject Lines

##### `hig-project-context` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 48/100 |

> Create or update a shared Apple design context document that other HIG skills use to tailor guidance.

**File sections:** Gathering Context · Context Document Template · Product · Platforms · Technology · Design System

##### `humanize-chinese` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 49/100 |

> Detect and rewrite AI-like Chinese text with a practical workflow for scoring, humanization, academic AIGC reduction, and style conversion. Use when the user asks to 去AI味, 降AIGC, 去除AI痕迹, 论文降重, 知网检测, 维

**File sections:** When to Use · Core Workflow · Optional CLI Flow · Manual Rewrite Playbook · Academic AIGC Reduction · Style Conversion

##### `lambda-lang` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 48/100 |

> Native agent-to-agent language for compact multi-agent messaging. A shared tongue agents speak directly, not a translation layer. 340+ atoms across 7 domains; 3x smaller than natural language.

**File sections:** When to Use This Skill · How It Works · Examples · Best Practices · Limitations · Security & Safety Notes

#### API (32)

##### `apify-audience-analysis` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 48/100 |

> Understand audience demographics, preferences, behavior patterns, and engagement quality across Facebook, Instagram, YouTube, and TikTok.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `hugging-face-dataset-viewer` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 48/100 |

> Query Hugging Face datasets through the Dataset Viewer API for splits, rows, search, filters, and parquet links.

**File sections:** When to Use · Core workflow · Defaults · Dataset Viewer · Querying Datasets · Creating and Uploading Datasets

##### `minecraft-bukkit-pro` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 48/100 |

> Master Minecraft server plugin development with Bukkit, Spigot, and Paper APIs.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Core Expertise · Development Philosophy · Technical Approach

#### Automation (73)

##### `helpdesk-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 49/100 |

> Automate HelpDesk tasks via Rube MCP (Composio): list tickets, manage views, use canned responses, and configure custom fields. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `instagram-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 49/100 |

> Automate Instagram tasks via Rube MCP (Composio): create posts, carousels, manage media, get insights, and publishing limits. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `linear-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 48/100 |

> Automate Linear tasks via Rube MCP (Composio): issues, projects, cycles, teams, labels. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `linkedin-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 48/100 |

> Automate LinkedIn tasks via Rube MCP (Composio): create posts, manage profile, company info, comments, and image uploads. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `square-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 48/100 |

> Automate Square tasks via Rube MCP (Composio): payments, orders, invoices, locations. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `dotnet-backend` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 49/100 |

> Build ASP.NET Core 8+ backend services with EF Core, auth, background jobs, and production API patterns.

**File sections:** When to Use · Your Expertise · Your Responsibilities · Code Patterns You Follow · Best Practices You Follow · Limitations

#### Frontend (81)

##### `react-component-performance` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 49/100 |

> Diagnose slow React components and suggest targeted performance fixes.

**File sections:** Overview · When to Use · Workflow · Checklist · Optimization Patterns · Profiling Validation Steps

#### Marketing (60)

##### `obsidian-cli` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 49/100 |

> Use the Obsidian CLI to read, create, search, and manage vault content, or to develop and debug Obsidian plugins and themes from the command line.

**File sections:** When to Use · Command reference · Syntax · File targeting · Vault targeting · Common patterns

##### `wechat-official-account-strategist` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 49/100 |

> Grow WeChat Official Accounts (微信公众号) with high-conversion content strategy, title formulas, article architecture, and Mini-Program integration.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Mobile (19)

##### `figma-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 48/100 |

> Automate Figma tasks via Rube MCP (Composio): files, components, design tokens, comments, exports. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Other (233)

##### `bulletmind` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 49/100 |

> Convert input into clean, structured, hierarchical bullet points for summarization, note-taking, and structured thinking.

**File sections:** When to Use This Skill · Mode · Intensity · Bullet Structure · Rules · Formatting

##### `logistics-exception-management` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 49/100 |

> Codified expertise for handling freight exceptions, shipment delays, damages, losses, and carrier disputes. Informed by logistics professionals with 15+ years operational experience.

**File sections:** When to Use · Role and Context · Core Knowledge · Decision Frameworks · Key Edge Cases · Communication Patterns

##### `server-management` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 49/100 |

> Server management principles and decision-making. Process management, monitoring strategy, and scaling decisions. Teaches thinking, not commands.

**File sections:** 1. Process Management Principles · 2. Monitoring Principles · 3. Log Management Principles · 4. Scaling Decisions · 5. Health Check Principles · 6. Security Principles

##### `vexor-cli` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 48/100 |

> Semantic file discovery via `vexor`. Use whenever locating where something is implemented/loaded/defined in a medium or large repo, or when the file location is unclear. Prefer this over manual browsi

**File sections:** When to Use · Goal · Use It Like This · Command · Common Flags · Modes (pick the cheapest that works)

#### Python (70)

##### `python-pptx-generator` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 48/100 |

> Generate complete Python scripts that build polished PowerPoint decks with python-pptx and real slide content.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

#### Security (111)

##### `ai-engineering-toolkit` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 48/100 |

> 6 production-ready AI engineering workflows: prompt evaluation (8-dimension scoring), context budget planning, RAG pipeline design, agent security audit (65-point checklist), eval harness building, an

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

##### `audit-skills` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 48/100 |

> Expert security auditor for AI Skills and Bundles. Performs non-intrusive static analysis to identify malicious patterns, data leaks, system stability risks, and obfuscated payloads across Windows, ma

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `project-skill-audit` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 48/100 |

> Audit a project and recommend the highest-value skills to add or update.

**File sections:** Overview · When to Use · Workflow · Session Analysis · Recommendation Rules · What To Scan

##### `redesign-existing-projects` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 49/100 |

> Use when upgrading existing websites or apps by auditing generic UI patterns and applying premium design fixes without rewrites.

**File sections:** When to Use · Limitations · How This Works · Design Audit · Upgrade Techniques · Fix Priority

##### `vibers-code-review` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 49/100 |

> Human review workflow for AI-generated GitHub projects with spec-based feedback, security review, and follow-up PRs from the Vibers service.

**File sections:** When to Use · Quick Start (3 steps) · Commit messages · What Happens After Setup · Limitations · Pricing

#### Testing (71)

##### `circleci-automation` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 49/100 |

> Automate CircleCI tasks via Rube MCP (Composio): trigger pipelines, monitor workflows/jobs, retrieve artifacts and test metadata. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### AI / ML (287)

##### `agent-memory-mcp` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 45/100 |

> A hybrid memory system that provides persistent, searchable knowledge management for AI agents (Architecture, Patterns, Decisions).

**File sections:** Prerequisites · Setup · Capabilities (MCP Tools) · Dashboard · When to Use · Limitations

##### `bdistill-knowledge-extraction` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 47/100 |

> Extract structured domain knowledge from AI models in-session or from local open-source models via Ollama. No API key needed.

**File sections:** Overview · When to Use This Skill · How It Works · Output Format · Tabular ML Data Generation · Local Model Extraction (Ollama)

##### `bilig-workpaper` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 47/100 |

> Use formula-backed WorkPaper JSON and MCP tools for agent spreadsheet tasks without driving Excel or a browser UI.

**File sections:** Overview · When To Use This Skill · Safer Command Pattern · Quick MCP Setup · Direct TypeScript Pattern · Required Verification

##### `brainstorming` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 46/100 |

> Use before creative or constructive work (features, architecture, behavior). Transforms vague ideas into validated designs through disciplined reasoning and collaboration.

**File sections:** Purpose · Operating Mode · The Process · After the Design · Exit Criteria (Hard Stop Conditions) · Key Principles (Non-Negotiable)

##### `ejentum-reasoning-harness` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 47/100 |

> MCP server exposing four cognitive harness modes (reasoning, code, anti-deception, memory). Each call returns an engineered scaffold (failure pattern, procedure, suppression vectors, falsification tes

**File sections:** When to Use This Skill · How It Works · Examples · Best Practices · Limitations · Security & Safety Notes

##### `geo-fundamentals` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 47/100 |

> Generative Engine Optimization for AI search engines (ChatGPT, Claude, Perplexity).

**File sections:** 1. What is GEO? · 2. AI Engine Landscape · 3. RAG Retrieval Factors · 4. Content That Gets Cited · 5. GEO Content Checklist · 6. Entity Building

##### `hig-technologies` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 47/100 |

> Check for .claude/apple-design-context.md before asking questions. Use existing context and only ask for information not already covered.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `hugging-face-tool-builder` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 45/100 |

> Your purpose is now is to create reusable command line scripts and utilities for using the Hugging Face API, allowing chaining, piping and intermediate processing where helpful. You can access the API

**File sections:** When to Use · Script Rules · Sample Scripts · High Level Endpoints · Accessing the API · Using the HF command line tool

##### `imagen` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 46/100 |

> AI image generation skill powered by Google Gemini, enabling seamless visual content creation for UI placeholders, documentation, and design assets.

**File sections:** Overview · When to Use This Skill · How It Works · Usage · Requirements · Output

##### `odoo-ecommerce-configurator` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 47/100 |

> Expert guide for Odoo eCommerce and Website: product catalog, payment providers, shipping methods, SEO, and order-to-fulfillment workflow.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `pipecat-friday-agent` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 45/100 |

> Build a low-latency, Iron Man-inspired tactical voice assistant (F.R.I.D.A.Y.) using Pipecat, Gemini, and OpenAI.

**File sections:** Overview · When to Use This Skill · How It Works · Core Concepts · Best Practices · Troubleshooting

##### `seek-and-analyze-video` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 45/100 |

> Seek and analyze video content using Memories.ai Large Visual Memory Model for persistent video intelligence

**File sections:** When to Use · Description · Overview · When to Use This Skill · How It Works · Examples

#### Automation (73)

##### `asana-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 47/100 |

> Automate Asana tasks via Rube MCP (Composio): tasks, projects, sections, teams, workspaces. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `hubspot-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 45/100 |

> Automate HubSpot CRM operations (contacts, companies, deals, tickets, properties) via Rube MCP using Composio integration.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `jira-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 45/100 |

> Automate Jira tasks via Rube MCP (Composio): issues, projects, sprints, boards, comments, users. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `makepad-platform` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 47/100 |

> |

**File sections:** When to Use · Documentation · IMPORTANT: Documentation Completeness Check · Supported Platforms · OsType Enum · Platform Detection

##### `mercury-mcp` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 47/100 |

> Cheatsheet for the Mercury (proton) MCP tools. Use when connected to the Mercury MCP server to look up which mercury_* tool to call for messaging teammates, threads, tasks, automations, or admin team-

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `shopify-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 45/100 |

> Automate Shopify tasks via Rube MCP (Composio): products, orders, customers, inventory, collections. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `stripe-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 47/100 |

> Automate Stripe tasks via Rube MCP (Composio): customers, charges, subscriptions, invoices, products, refunds. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `trello-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 46/100 |

> Automate Trello boards, cards, and workflows via Rube MCP (Composio). Create cards, manage lists, assign members, and search across boards programmatically.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Backend (31)

##### `conductor-setup` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 46/100 |

> Configure a Rails project to work with Conductor (parallel coding agents)

**File sections:** When to Use · 1. conductor.json (project root) · 2. bin/conductor-setup (executable) · 3. script/server (executable) · 4. Update Rails Config Files · Limitations

#### Cloud (49)

##### `file-uploads` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 45/100 |

> Expert at handling file uploads and cloud storage. Covers S3,

**File sections:** Sharp Edges · Validation Checks · Collaboration · When to Use · Limitations

#### Database (46)

##### `odoo-backup-strategy` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 45/100 |

> Complete Odoo backup and restore strategy: database dumps, filestore backup, automated scheduling, cloud storage upload, and tested restore procedures.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-docker-deployment` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 46/100 |

> Production-ready Docker and docker-compose setup for Odoo with PostgreSQL, persistent volumes, environment-based configuration, and Nginx reverse proxy.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Design (29)

##### `recsys-pipeline-architect` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 45/100 |

> Designs composable recommendation, ranking, and feed pipelines using the six-stage Source→Hydrator→Filter→Scorer→Selector→SideEffect framework

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### DevOps (20)

##### `kubernetes-deployment` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 47/100 |

> Kubernetes deployment workflow for container orchestration, Helm charts, service mesh, and production-ready K8s configurations.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Quality Gates · Related Workflow Bundles · Limitations

##### `terraform-infrastructure` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 47/100 |

> Terraform infrastructure as code workflow for provisioning cloud resources, creating reusable modules, and managing infrastructure at scale.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Quality Gates · Related Workflow Bundles · Limitations

#### Frontend (81)

##### `discord-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 46/100 |

> Automate Discord tasks via Rube MCP (Composio): messages, channels, roles, webhooks, reactions. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `fixing-motion-performance` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 47/100 |

> Audit and fix animation performance issues including layout thrashing, compositor properties, scroll-linked motion, and blur effects. Use when animations stutter, transitions jank, or reviewing CSS/JS

**File sections:** how to use · When to Use · rendering steps glossary · rule categories by priority · quick reference · common fixes

##### `slack-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 46/100 |

> Automate Slack workspace operations including messaging, search, channel management, and reaction workflows through Composio's Slack toolkit.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Git (30)

##### `create-branch` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 45/100 |

> Create a git branch following Sentry naming conventions. Use when asked to "create a branch", "new branch", "start a branch", "make a branch", "switch to a new branch", or when starting new work on th

**File sections:** When to Use · Step 1: Get the Username Prefix · Step 2: Determine the Branch Description · Step 3: Classify the Type · Step 4: Generate and Propose · Step 5: Create the Branch

#### Go (10)

##### `dbos-golang` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 47/100 |

> Guide for building reliable, fault-tolerant Go applications with DBOS durable workflows. Use when adding DBOS to existing Go code, creating workflows and steps, or using queues for concurrency control

**File sections:** When to Use · Rule Categories by Priority · Critical Rules · How to Use · References · Limitations

#### JS / TS (64)

##### `dbos-typescript` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 45/100 |

> Guide for building reliable, fault-tolerant TypeScript applications with DBOS durable workflows. Use when adding DBOS to existing TypeScript code, creating workflows and steps, or using queues for con

**File sections:** When to Use · Rule Categories by Priority · Critical Rules · How to Use · References · Limitations

##### `googlesheets-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 47/100 |

> Automate Google Sheets operations (read, write, format, filter, manage spreadsheets) via Rube MCP (Composio). Read/write data, manage tabs, apply formatting, and search rows programmatically.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

#### Marketing (60)

##### `blog-writing-guide` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 45/100 |

> This skill enforces Sentry's blog writing standards across every post — whether you're helping an engineer write their first blog post or a marketer draft a product announcement.

**File sections:** When to Use · The Sentry Voice · Banned Language · The Opening (First 2-3 Sentences) · Structure: Follow the Reader's Questions · Section Headings Must Convey Information

##### `seo-aeo-keyword-research` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 46/100 |

> Researches and prioritises SEO keywords with AEO question queries, difficulty tiers, cannibalization checks, and a content map. Activate when the user wants to find keywords, research search terms, or

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `seo-aeo-schema-generator` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 47/100 |

> Generates valid JSON-LD structured data for 10 schema types with rich result eligibility validation and implementation-ready script blocks. Activate when the user wants to generate schema markup, JSON

**File sections:** Overview · When to Use This Skill · Supported Schema Types · How It Works · Examples · Best Practices

##### `seo-fundamentals` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 47/100 |

> Core principles of SEO including E-E-A-T, Core Web Vitals, technical foundations, content quality, and how modern search engines evaluate pages.

**File sections:** 1. E-E-A-T (Quality Evaluation Framework) · 2. Core Web Vitals (Page Experience Signals) · 3. Technical SEO Principles · 4. Content SEO Principles · 5. Structured Data (Schema) · 6. AI-Assisted Content Principles

##### `seo-plan` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 46/100 |

> >

**File sections:** When to Use · Process · Industry Templates · Output · DataForSEO Integration (Optional) · Error Handling

##### `seo-snippet-hunter` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 45/100 |

> Formats content to be eligible for featured snippets and SERP features. Creates snippet-optimized content blocks based on best practices. Use PROACTIVELY for question-based content.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Snippet Types & Formats · Snippet Optimization Strategy

##### `social-post-writer-seo` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 47/100 |

> Social Media Strategist and Content Writer. Creates clear, engaging social media posts for Instagram, LinkedIn, and Facebook.

**File sections:** Overview · When to Use This Skill · How It Works · Prompt Template · Examples · Best Practices

##### `tiktok-automation` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 46/100 |

> Automate TikTok tasks via Rube MCP (Composio): upload/publish videos, post photos, manage content, and view user profiles/stats. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `xiaohongshu-content-strategist` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 45/100 |

> Create viral Xiaohongshu (小红书) content with platform-native strategy, save-rate optimization, trending formats, and search SEO for China's #1 lifestyle platform.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Mobile (19)

##### `macos-spm-app-packaging` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 47/100 |

> Scaffold, build, sign, and package SwiftPM macOS apps without Xcode projects.

**File sections:** Overview · When to Use · Two-Step Workflow · Minimum End-to-End Example · Validation Checkpoints · Common Notarization Failures

#### Other (233)

##### `awareness-stage-mapper` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 45/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: ELM-STAGED BELIEF CHANGE · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `family-health-analyzer` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 47/100 |

> 分析家族病史、评估遗传风险、识别家庭健康模式、提供个性化预防建议

**File sections:** When to Use · 技能概述 · 触发条件 · 分析步骤 · 安全原则 · 集成现有模块

##### `interview-coach` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 47/100 |

> Full job search coaching system — JD decoding, resume, storybank, mock interviews, transcript analysis, comp negotiation. 23 commands, persistent state.

**File sections:** Overview · Install · When to Use This Skill · What It Covers · Examples · Source

##### `keyword-extractor` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 47/100 |

> >

**File sections:** QUICK START · When to Use · Step 1 — Analyze · Step 2 — Generate Keywords · Step 3 — Rank · Step 4 — Normalize

##### `objection-preemptor` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 45/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: INOCULATION WITHOUT REACTANCE · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `odoo-upgrade-advisor` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 46/100 |

> Step-by-step Odoo version upgrade advisor: pre-upgrade checklist, community vs enterprise upgrade path, OCA module compatibility, and post-upgrade validation.

**File sections:** Overview · When to Use This Skill · How It Works · Upgrade Paths · Examples · Best Practices

#### Python (70)

##### `webapp-testing` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 47/100 |

> To test local web applications, write native Python Playwright scripts.

**File sections:** Decision Tree: Choosing Your Approach · Example: Using with_server.py · Reconnaissance-Then-Action Pattern · Common Pitfall · Best Practices · Reference Files

#### Testing (71)

##### `e2e-testing` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 47/100 |

> End-to-end testing workflow with Playwright for browser automation, visual regression, cross-browser testing, and CI/CD integration.

**File sections:** Overview · When to Use This Workflow · Workflow Phases · Quality Gates · Related Workflow Bundles · Limitations

#### AI / ML (287)

##### `airtable-automation` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> Automate Airtable tasks via Rube MCP (Composio): records, bases, tables, fields, views. Always search tools first for current schemas.

**File sections:** Prerequisites · Setup · Core Workflows · Common Patterns · Known Pitfalls · Quick Reference

##### `bdistill-behavioral-xray` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> X-ray any AI model's behavioral patterns — refusal boundaries, hallucination tendencies, reasoning style, formatting defaults. No API key needed.

**File sections:** Overview · When to Use This Skill · How It Works · Probe Dimensions · Output · Best Practices

##### `blueprint` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> Turn a one-line objective into a step-by-step construction plan any coding agent can execute cold. Each step has a self-contained context brief — a fresh agent in a new session can pick up any step wi

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Key Differentiators

##### `gemini-api-dev` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> The Gemini API provides access to Google's most advanced AI models. Key capabilities include:

**File sections:** Overview · Current Gemini Models · SDKs · Quick Start · API spec (source of truth) · How to use the Gemini API

##### `seo-content-refresher` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> Identifies outdated elements in provided content and suggests updates to maintain freshness. Finds statistics, dates, and examples that need updating. Use PROACTIVELY for older content.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Content Freshness Guidelines · Refresh Priority Matrix

##### `shader-programming-glsl` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> Expert guide for writing efficient GLSL shaders (Vertex/Fragment) for web and game engines, covering syntax, uniforms, and common effects.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Examples · Best Practices · Troubleshooting

##### `skill-check` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 43/100 |

> Validate Claude Code skills against the agentskills specification. Catches structural, semantic, and naming issues before users do.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · weekly-report Check Results [FREE] · Limitations

#### Cloud (49)

##### `podcast-generation` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 44/100 |

> Generate real audio narratives from text content using Azure OpenAI's Realtime API.

**File sections:** Quick Start · Environment Configuration · Core Workflow · Voice Options · Realtime API Events · Audio Format

#### Data (27)

##### `ingest-youtube` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 44/100 |

> Pull a YouTube video transcript into a queryable markdown vault with yt-dlp subtitle discovery, VTT cleanup, metadata frontmatter, and capture-seed stubs.

**File sections:** When to use · How it works · Invocation · Output contract · Idempotency · Missing subtitles

#### DevOps (20)

##### `expo-cicd-workflows` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 43/100 |

> Helps understand and write EAS workflow YAML files for Expo projects. Use this skill when the user asks about CI/CD or workflows in an Expo or EAS context, mentions .eas/workflows/, or wants help with

**File sections:** When to Use · Reference Documentation · Workflow File Location · Top-Level Structure · Expressions · Generating Workflows

#### Frontend (81)

##### `swiftui-ui-patterns` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 43/100 |

> Apply proven SwiftUI UI patterns for navigation, sheets, async state, and reusable screens.

**File sections:** Quick start · When to Use · General rules to follow · State ownership summary · Cross-cutting references · Anti-patterns

#### Go (10)

##### `grpc-golang` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 43/100 |

> Build production-ready gRPC services in Go with mTLS, streaming, and observability. Use when designing Protobuf contracts with Buf or implementing secure service-to-service transport.

**File sections:** Overview · Use this skill when · Do not use this skill when · Step-by-Step Guide · Examples · Best Practices

#### JS / TS (64)

##### `pakistan-payments-stack` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 43/100 |

> Design and implement production-grade Pakistani payment integrations (JazzCash, Easypaisa, bank/PSP rails, optional Raast) for SaaS with PKR billing, webhook reliability, and reconciliation.

**File sections:** Authenticity and Verification Rules (Mandatory) · Verified Context (Public, High-Level) · When to Use This Skill · Do Not Use This Skill When · Architecture Boundary (Required) · Limitations

#### Marketing (60)

##### `apify-competitor-intelligence` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 43/100 |

> Analyze competitor strategies, content, pricing, ads, and market positioning across Google Maps, Booking.com, Facebook, Instagram, YouTube, and TikTok.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `seo-aeo-blog-writer` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 43/100 |

> Writes long-form blog posts with TL;DR block, definition sentence, comparison table, and 5-question FAQ for SEO ranking and AEO citation. Activate when the user wants to write a blog post, article, or

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `seo-aeo-landing-page-writer` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 43/100 |

> Writes complete, structured landing pages optimized for SEO ranking, AEO citation, and visitor conversion. Activate when the user wants to write or generate a landing page for a product, service, or o

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `seo-authority-builder` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 44/100 |

> 'Analyzes content for E-E-A-T signals and suggests improvements to

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · E-E-A-T Framework · Approach

##### `seo-cannibalization-detector` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 43/100 |

> Analyzes multiple provided pages to identify keyword overlap and potential cannibalization issues. Suggests differentiation strategies. Use PROACTIVELY when reviewing similar content.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Cannibalization Types · Prevention Strategy

##### `seo-structure-architect` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 43/100 |

> Analyzes and optimizes content structure including header hierarchy, suggests schema markup, and internal linking opportunities. Creates search-friendly content organization.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Header Tag Best Practices · Siloing Strategy

#### Mobile (19)

##### `upgrading-expo` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 43/100 |

> Upgrade Expo SDK versions

**File sections:** Overview · When to Use This Skill · Instructions · Upgrade Process · Common Issues · Best Practices

#### Other (233)

##### `dwarf-expert` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 43/100 |

> Provides expertise for analyzing DWARF debug files and understanding the DWARF debug format/standard (v3-v5). Triggers when understanding DWARF information, interacting with DWARF files, answering DWA

**File sections:** When to Use This Skill · When NOT to Use This Skill · Structural Validation · Quality Metrics · Common Verification Patterns · readelf

##### `lex` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 43/100 |

> Centralized 'Truth Engine' for cross-jurisdictional legal context (US, EU, CA) and contract scaffolding.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `odoo-l10n-compliance` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 44/100 |

> Country-specific Odoo localization: tax configuration, e-invoicing (CFDI, FatturaPA, SAF-T), fiscal reporting, and country chart of accounts setup.

**File sections:** Overview · When to Use This Skill · How It Works · Country Localization Modules · Examples · Best Practices

##### `visual-emotion-engineer` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 44/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: AROUSAL-VALENCE VISUAL MAPPING · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `vscode-extension-guide-en` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 43/100 |

> Guide for VS Code extension development from scaffolding to Marketplace publication

**File sections:** Overview · When to Use This Skill · How It Works · Reference Topics · Install the Full Skill · Best Practices

##### `writing-plans` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 44/100 |

> Use when you have a spec or requirements for a multi-step task, before touching code

**File sections:** Overview · Bite-Sized Task Granularity · Plan Document Header · Task Structure · Remember · Execution Handoff

#### Security (111)

##### `seo-aeo-content-quality-auditor` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 44/100 |

> Audits content for SEO and AEO performance with scored reports, severity-ranked fix lists, and projected scores after fixes. Activate when the user wants to audit, review, or score content for SEO or

**File sections:** Overview · When to Use This Skill · How It Works · Scoring System · Examples · Best Practices

#### Testing (71)

##### `odoo-automated-tests` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 44/100 |

> Write and run Odoo automated tests using TransactionCase, HttpCase, and browser tour tests. Covers test data setup, mocking, and CI integration.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### AI / ML (287)

##### `apify-content-analytics` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 42/100 |

> Track engagement metrics, measure campaign ROI, and analyze content performance across Instagram, Facebook, YouTube, and TikTok.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `claude-code-guide` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 42/100 |

> To provide a comprehensive reference for configuring and using Claude Code (the agentic coding tool) to its full potential. This skill synthesizes best practices, configuration templates, and advanced

**File sections:** Purpose · Configuration (`CLAUDE.md`) · Commands · Code Style · Workflow · Advanced Features

##### `closed-loop-delivery` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 42/100 |

> Use when a coding task must be completed against explicit acceptance criteria with minimal user re-intervention across implementation, review feedback, deployment, and runtime verification.

**File sections:** Overview · When to Use · Required Inputs · Issue Gate Dependency · Default Workflow · PR Comment Polling Policy

##### `design-orchestration` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 40/100 |

> Orchestrates design workflows by routing work through brainstorming, multi-agent review, and execution readiness in the correct order.

**File sections:** Purpose · Operating Model · Controlled Skills · Entry Conditions · Routing Logic · Enforcement Rules

##### `docs-architect` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 41/100 |

> Creates comprehensive technical documentation from existing codebases. Analyzes architecture, design patterns, and implementation details to produce long-form technical manuals and ebooks.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Core Competencies · Documentation Process · Output Characteristics

##### `explain-like-socrates` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 42/100 |

> >

**File sections:** When to Use · 1. Curiosity Opening · 2. Guided Reasoning · 3. Single Analogy · 4. Clarification · 5. Reflection

##### `local-llm-expert` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 42/100 |

> Master local LLM inference, model selection, VRAM optimization, and local deployment using Ollama, llama.cpp, vLLM, and LM Studio. Expert in quantization formats (GGUF, EXL2) and local AI privacy.

**File sections:** Purpose · Use this skill when · Do not use this skill when · Instructions · Capabilities · Behavioral Traits

##### `news-sentiment-engine` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 40/100 |

> Multi-source RSS news aggregation with Claude-powered sentiment analysis and structured briefing output

**File sections:** When to Use · What it does · Usage · Example Output · Output Format · Setup

#### API (32)

##### `apify-brand-reputation-monitoring` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 42/100 |

> Scrape reviews, ratings, and brand mentions from multiple platforms using Apify Actors.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `apify-influencer-discovery` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 42/100 |

> Find and evaluate influencers for brand partnerships, verify authenticity, and track collaboration performance across Instagram, Facebook, YouTube, and TikTok.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `apify-lead-generation` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 42/100 |

> Scrape leads from multiple platforms using Apify Actors.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `apify-market-research` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 42/100 |

> Analyze market conditions, geographic opportunities, pricing, consumer behavior, and product validation across Google Maps, Facebook, Instagram, Booking.com, and TripAdvisor.

**File sections:** When to Use · Prerequisites · Workflow · Error Handling · Limitations

##### `odoo-migration-helper` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 40/100 |

> Step-by-step guide for migrating Odoo custom modules between versions (v14→v15→v16→v17). Covers API changes, deprecated methods, and view migration.

**File sections:** Overview · When to Use This Skill · How It Works · Key Migration Changes by Version · Examples · Best Practices

##### `odoo-woocommerce-bridge` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 40/100 |

> Sync Odoo with WooCommerce: products, inventory, orders, and customers via WooCommerce REST API and Odoo external API.

**File sections:** Overview · When to Use This Skill · How It Works · Field Mapping: WooCommerce → Odoo · Examples · Best Practices

#### Automation (73)

##### `jobgpt` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 42/100 |

> Job search automation, auto apply, resume generation, application tracking, salary intelligence, and recruiter outreach using the JobGPT MCP server.

**File sections:** Overview · When to Use This Skill · Setup · Examples · Best Practices · Troubleshooting

#### Data (27)

##### `industrial-brutalist-ui` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 41/100 |

> Use when creating raw industrial or tactical telemetry UIs with rigid grids, stark typography, CRT effects, and high-density data.

**File sections:** When to Use · Limitations · 1. Skill Meta · 2. Visual Archetypes · 3. Typographic Architecture · 4. Color System

##### `odoo-edi-connector` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 40/100 |

> Guide for implementing EDI (Electronic Data Interchange) with Odoo: X12, EDIFACT document mapping, partner onboarding, and automated order processing.

**File sections:** Overview · When to Use This Skill · How It Works · EDI ↔ Odoo Object Mapping · Examples · Best Practices

#### Database (46)

##### `odoo-performance-tuner` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 42/100 |

> Expert guide for diagnosing and fixing Odoo performance issues: slow queries, worker configuration, memory limits, PostgreSQL tuning, and profiling tools.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Design (29)

##### `high-end-visual-design` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 42/100 |

> Use when designing expensive agency-grade interfaces with premium fonts, spatial rhythm, soft depth, and fluid microinteractions.

**File sections:** When to Use · Limitations · 1. Meta Information & Core Directive · 2. THE "ABSOLUTE ZERO" DIRECTIVE (STRICT ANTI-PATTERNS) · 3. THE CREATIVE VARIANCE ENGINE · 4. HAPTIC MICRO-AESTHETICS (COMPONENT MASTERY)

#### Frontend (81)

##### `codebase-to-wordpress-converter` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 42/100 |

> Expert skill for converting any codebase (React/HTML/Next.js) into a pixel-perfect, SEO-optimized, and dynamic WordPress theme.

**File sections:** Overview · When to Use This Skill · Core Capabilities · Step-by-Step Guide · Examples · Best Practices

##### `gpt-taste` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 40/100 |

> Use when generating elite GSAP-heavy frontend pages with strict AIDA structure, wide hero typography, and gapless bento grids.

**File sections:** When to Use · Limitations · 1. PYTHON-DRIVEN TRUE RANDOMIZATION (BREAKING THE LOOP) · 2. AIDA STRUCTURE & SPACING · 3. HERO ARCHITECTURE & THE 2-LINE IRON RULE · 4. THE GAPLESS BENTO GRID

##### `react-best-practices` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 40/100 |

> Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Use when writing new React components or Next.js pages, implementing data fetching (client or ser

**File sections:** When to Use · Rule Categories by Priority · Quick Reference · How to Use · Full Compiled Document · Limitations

##### `spline-3d-integration` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 40/100 |

> Use when adding interactive 3D scenes from Spline.design to web projects, including React embedding and runtime control API.

**File sections:** When to Use · Quick Reference · Working Examples · What Is Spline? · STEP 1 — Identify the Stack · STEP 2 — Get the Scene URL

##### `swiftui-liquid-glass` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 42/100 |

> Implement or review SwiftUI Liquid Glass APIs with correct fallbacks and modifier order.

**File sections:** Overview · When to Use · Workflow Decision Tree · Core Guidelines · Review Checklist · Implementation Checklist

##### `swiftui-performance-audit` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 40/100 |

> Audit SwiftUI performance issues from code review and profiling evidence.

**File sections:** Quick start · When to Use · Workflow · 1. Intake · 2. Code-First Review · 3. Guide the User to Profile

##### `ui-component` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 41/100 |

> Generate a new UI component that follows StyleSeed Toss conventions for structure, tokens, accessibility, and component ergonomics.

**File sections:** Overview · When to Use · How It Works · Output · Best Practices · Additional Resources

##### `ui-setup` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 41/100 |

> Interactive StyleSeed setup wizard for choosing app type, brand color, visual style, typography, and the first screen scaffold.

**File sections:** Overview · When to Use · How It Works · Output · Best Practices · Additional Resources

#### Git (30)

##### `comprehensive-review-pr-enhance` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 40/100 |

> >

**File sections:** When to Use · Workflow · PR Description Template · Summary · Changes · Why

##### `github` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 40/100 |

> Use the `gh` CLI for issues, pull requests, Actions runs, and GitHub API queries.

**File sections:** When to Use · Pull Requests · API for Advanced Queries · JSON Output · Limitations

#### Java / Kotlin (52)

##### `kotlin-coroutines-expert` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 41/100 |

> Expert patterns for Kotlin Coroutines and Flow, covering structured concurrency, error handling, and testing.

**File sections:** Overview · When to Use This Skill · Step-by-Step Guide · Examples · Best Practices · Troubleshooting

##### `latex-paper-conversion` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 40/100 |

> This skill should be used when the user asks to convert an academic paper in LaTeX from one format (e.g., Springer, IPOL) to another format (e.g., MDPI, IEEE, Nature). It automates extraction, injecti

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

#### Marketing (60)

##### `apify-trend-analysis` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 42/100 |

> Discover and track emerging trends across Google Trends, Instagram, Facebook, YouTube, and TikTok to inform content strategy.

**File sections:** Prerequisites · Workflow · Error Handling · When to Use · Limitations

##### `seo-aeo-meta-description-generator` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 42/100 |

> Writes 3 title tag variants and 3 meta description variants per page with SERP preview, OG tags, and Twitter Card tags. Activate when the user wants to write meta tags, title tags, or social sharing t

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `seo-content-planner` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 41/100 |

> 'Creates comprehensive content outlines and topic clusters for SEO.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Planning Framework · Approach

##### `seo-keyword-strategist` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 41/100 |

> Analyzes keyword usage in provided content, calculates density, suggests semantic variations and LSI keywords based on the topic. Prevents over-optimization. Use PROACTIVELY for content optimization.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Keyword Density Guidelines · Entity Analysis Framework

#### Other (233)

##### `ask-questions-if-underspecified` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 40/100 |

> Clarify requirements before implementing. Use when serious doubts arise.

**File sections:** When to Use · When NOT to Use · Goal · Workflow · Question templates · Anti-patterns

##### `clean-code` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 42/100 |

> This skill embodies the principles of \"Clean Code\" by Robert C. Martin (Uncle Bob). Use it to transform \"code that works\" into \"code that is clean.\

**File sections:** 🧠 Core Philosophy · When to Use · 1. Meaningful Names · 2. Functions · 3. Comments · 4. Formatting

##### `create-issue-gate` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 40/100 |

> Use when starting a new implementation task and an issue must be created with strict acceptance criteria gating before execution.

**File sections:** Overview · When to Use · Required Fields · Acceptance Criteria Gate · Issue Creation Mode · Problem

##### `customer-psychographic-profiler` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 40/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: IDENTITY-NEED MAPPING LADDER · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `odoo-inventory-optimizer` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 40/100 |

> Expert guide for Odoo Inventory: stock valuation (FIFO/AVCO), reordering rules, putaway strategies, routes, and multi-warehouse configuration.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-project-timesheet` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 41/100 |

> Expert guide for Odoo Project and Timesheets: task stages, billable time tracking, timesheet approval, budget alerts, and invoicing from timesheets.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `orchestrate-batch-refactor` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 42/100 |

> Plan and execute large refactors with dependency-aware work packets and parallel analysis.

**File sections:** Overview · When to Use · Inputs · When to Use Parallelization · Core Workflow · Work Packet Rules

##### `pitch-psychologist` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 40/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: DESIRE-THEN-SOLUTION ARC · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `requesting-code-review` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 41/100 |

> Use when completing tasks, implementing major features, or before merging to verify work meets requirements

**File sections:** When to Request Review · How to Request · Example · Integration with Workflows · Red Flags · When to Use

#### Python (70)

##### `odoo-rpc-api` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 42/100 |

> Expert on Odoo's external JSON-RPC and XML-RPC APIs. Covers authentication, model calls, record CRUD, and real-world integration examples in Python, JavaScript, and curl.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `xvary-stock-research` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 42/100 |

> Thesis-driven equity analysis from public SEC EDGAR and market data; /analyze, /score, /compare workflows with bundled Python tools (Claude Code, Cursor, Codex).

**File sections:** When to Use · Commands · Execution Rules · Output Format · Scoring + Methodology References · Data Tooling

#### Rust (20)

##### `akf-trust-metadata` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 42/100 |

> The AI native file format. EXIF for AI - stamps every file with trust scores, source provenance, and compliance metadata. Embeds into 20+ formats (DOCX, PDF, images, code). EU AI Act, SOX, HIPAA audit

**File sections:** When to Use · After creating or modifying files · Before modifying existing files · Compliance auditing · Classification · Install

#### Security (111)

##### `fixing-accessibility` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 42/100 |

> Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, and form errors. Use when adding interactive controls, forms, dialogs, or reviewin

**File sections:** how to use · When to Use · rule categories by priority · quick reference · common fixes · review guidance

##### `seo` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 41/100 |

> Run a broad SEO audit across technical SEO, on-page SEO, schema, sitemaps, content quality, AI search readiness, and GEO. Use as the umbrella skill when the user asks for a full SEO analysis or strate

**File sections:** When to Use · Quick Reference · Orchestration Logic · Industry Detection · Quality Gates · Reference Files

#### Testing (71)

##### `test-fixing` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 41/100 |

> Systematically identify and fix all failing tests using smart grouping strategies. Use when explicitly asks to fix tests (\"fix these tests\", \"make tests pass\"), reports test failures (\"tests are

**File sections:** When to Use · Systematic Approach · Best Practices · Example Workflow · Limitations

#### AI / ML (287)

##### `fp-either-ref` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 39/100 |

> Quick reference for Either type. Use when user needs error handling, validation, or operations that can fail with typed errors.

**File sections:** When to Use · Create · Transform · Extract · Common Patterns · vs try/catch

##### `hig-inputs` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 39/100 |

> Check for .claude/apple-design-context.md before asking questions. Use existing context and only ask for information not already covered.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `maxia` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 38/100 |

> Connect to MAXIA AI-to-AI marketplace on Solana. Discover, buy, sell AI services. Earn USDC. 13 MCP tools, A2A protocol, DeFi yields, sentiment analysis, rug detection.

**File sections:** When to use this skill · API Base URL · Free endpoints (no auth) · Authenticated endpoints (free API key) · MCP Server · Key facts

##### `progressive-estimation` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 38/100 |

> Estimate AI-assisted and hybrid human+agent development work with research-backed PERT statistics and calibration feedback loops

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

#### API (32)

##### `odoo-shopify-integration` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 38/100 |

> Connect Odoo with Shopify: sync products, inventory, orders, and customers using the Shopify API and Odoo's external API or connector modules.

**File sections:** Overview · When to Use This Skill · How It Works · Data Flow Architecture · Examples · Best Practices

##### `payment-integration` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 39/100 |

> Integrate Stripe, PayPal, and payment processors. Handles checkout flows, subscriptions, webhooks, and PCI compliance. Use PROACTIVELY when implementing payments, billing, or subscription features.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Critical Requirements

#### Backend (31)

##### `canvas-design` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 38/100 |

> These are instructions for creating design philosophies - aesthetic movements that are then EXPRESSED VISUALLY. Output only .md files, .pdf files, and .png files.

**File sections:** DESIGN PHILOSOPHY CREATION · DEDUCING THE SUBTLE REFERENCE · CANVAS CREATION · FINAL STEP · MULTI-PAGE OPTION · When to Use

#### Data (27)

##### `idea-os` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 38/100 |

> Five-phase pipeline (triage → clarify → research → PRD → plan) that turns a raw idea into four linked files: clarifying questions, deep research, a PRD with non-goals and metrics, and a phased executi

**File sections:** Overview · When to Use · How It Works · Limitations · Examples · Full source

##### `odoo-sales-crm-expert` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 38/100 |

> Expert guide for Odoo Sales and CRM: pipeline stages, quotation templates, pricelists, sales teams, lead scoring, and forecasting.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### DevOps (20)

##### `kubestellar-console` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 38/100 |

> Multi-cluster Kubernetes dashboard with AI-powered operations via MCP server and 10+ built-in agent skills

**File sections:** Overview · When to Use This Skill · How It Works · Key Features · Security & Safety Notes · Limitations

#### Frontend (81)

##### `scala-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 39/100 |

> Master enterprise-grade Scala development with functional programming, distributed systems, and big data processing. Expert in Apache Pekko, Akka, Spark, ZIO/Cats Effect, and reactive architectures.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Core Expertise · Technical Excellence · Architectural Principles

##### `ui-pattern` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 39/100 |

> Generate reusable UI patterns such as card sections, grids, lists, forms, and chart wrappers using StyleSeed Toss primitives.

**File sections:** Overview · When to Use · How It Works · Output · Best Practices · Additional Resources

#### Git (30)

##### `it-manager-hospital` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 38/100 |

> World-class Hospital IT Management Advisor specializing in clinical safety, digital maturity (HIMSS/ONA/JCI), and HIS/PEP ecosystems.

**File sections:** Purpose · When to Use · The Virtual Board of Experts (10 Personas) · Mandatory Instructional Protocol (IMPORTANT) · Core Knowledge Domains · Expert Instructions

##### `it-manager-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 38/100 |

> Elite IT Management Advisor specializing in data-driven strategy, executive communication, and human-centric leadership for the 2026 digital era.

**File sections:** Purpose · When to Use · The Virtual Expert Team (Collective Intelligence) · Core Capabilities · Mandatory Instructional Protocol (IMPORTANT) · Expert Instructions

#### Marketing (60)

##### `seo-content-writer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 38/100 |

> Writes SEO-optimized content based on provided keywords and topic briefs. Creates engaging, comprehensive content following best practices. Use PROACTIVELY for content creation tasks.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Content Creation Framework · Approach

##### `seo-meta-optimizer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 39/100 |

> Creates optimized meta titles, descriptions, and URL suggestions based on character limits and best practices. Generates compelling, keyword-rich metadata. Use PROACTIVELY for new content.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Optimization Rules · Approach

##### `seo-page` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 38/100 |

> >

**File sections:** When to Use · What to Analyze · Output · DataForSEO Integration (Optional) · Error Handling · Limitations

#### Mobile (19)

##### `macos-menubar-tuist-app` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 38/100 |

> Build, refactor, or review SwiftUI macOS menubar apps that use Tuist.

**File sections:** When to Use · Core Rules · Expected File Shape · Workflow · Validation Matrix · Failure Patterns and Fix Direction

##### `swift-concurrency-expert` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 38/100 |

> Review and fix Swift concurrency issues such as actor isolation and Sendable violations.

**File sections:** Overview · When to Use · Workflow · Reference material · Limitations

#### Other (233)

##### `dx-optimizer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 39/100 |

> Developer Experience specialist. Improves tooling, setup, and workflows. Use PROACTIVELY when setting up new projects, after team feedback, or when development friction is noticed.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Optimization Areas · Analysis Process · Deliverables

##### `identity-mirror` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 39/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: ASPIRATIONAL SELF-CONCEPT REFLECTION · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `options-flow-analyzer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 39/100 |

> Real vs lottery call separation for options P/C ratio analysis — prevents signal inversion from deep OTM noise

**File sections:** When to Use · What it does · Analysis Output · Example Output · Configuration · Requirements

##### `search-specialist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 38/100 |

> Expert web researcher using advanced search techniques and

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Search Strategies · Approach

##### `social-proof-architect` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 39/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: TRUST-GAP MATCHING · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `unreal-engine-cpp-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 38/100 |

> Expert guide for Unreal Engine 5.x C++ development, covering UObject hygiene, performance patterns, and best practices.

**File sections:** When to Use · Core Principles · Naming Conventions (Strict) · Common Patterns · Debugging · Checklist before PR

##### `windows-shell-reliability` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 39/100 |

> Reliable command execution on Windows: paths, encoding, and common binary pitfalls.

**File sections:** When to Use · 1. Encoding & Redirection · 2. Handling Paths & Spaces · 3. Common Binary & Cmdlet Pitfalls · 4. Dotnet CLI Reliability · 5. Environment Variables

#### Python (70)

##### `azure-ai-transcription-py` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 38/100 |

> Azure AI Transcription SDK for Python. Use for real-time and batch speech-to-text transcription with timestamps and diarization.

**File sections:** Installation · Environment Variables · Authentication · Transcription (Batch) · Transcription (Real-time) · Best Practices

##### `hugging-face-trackio` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 39/100 |

> Track ML experiments with Trackio using Python logging, alerts, and CLI metric retrieval.

**File sections:** Three Interfaces · When to Use Each · Minimal Logging Setup · Autonomous ML Experiment Workflow · Limitations

#### Security (111)

##### `odoo-security-rules` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 38/100 |

> Expert in Odoo access control: ir.model.access.csv, record rules (ir.rule), groups, and multi-company security patterns.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `seo-content-auditor` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 38/100 |

> Analyzes provided content for quality, E-E-A-T signals, and SEO best practices. Scores content and provides improvement recommendations based on established guidelines.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · What I Can Analyze · What I Cannot Do

#### AI / ML (287)

##### `agentfolio` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 37/100 |

> Skill for discovering and researching autonomous AI agents, tools, and ecosystems using the AgentFolio directory.

**File sections:** Capabilities · How to Use AgentFolio · Example Workflows · Example Prompts · When to Use · Limitations

##### `code-documentation-doc-generate` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> You are a documentation expert specializing in creating comprehensive, maintainable documentation from code. Generate API docs, architecture diagrams, user guides, and technical references using AI-po

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `codex-review` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 36/100 |

> Professional code review with auto CHANGELOG generation, integrated with Codex AI. Use when you want professional code review before commits, you need automatic CHANGELOG generation, or reviewing larg

**File sections:** Overview · When to Use · Installation · Step-by-Step Guide · Examples · Best Practices

##### `daily-gift` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> Relationship-aware daily gift engine with five-stage creative pipeline — editorial judgment, synthesis, concept generation, visual strategy, and rendering in H5, image, or video

**File sections:** Overview · When to Use This Skill · How It Works · Key Features · Best Practices · Limitations

##### `documentation-generation-doc-generate` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> You are a documentation expert specializing in creating comprehensive, maintainable documentation from code. Generate API docs, architecture diagrams, user guides, and technical references using AI-po

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `fp-taskeither-ref` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> Quick reference for TaskEither. Use when user needs async error handling, API calls, or Promise-based operations that can fail.

**File sections:** When to Use · Create · Transform · Execute · Common Patterns · vs async/await

##### `itil-expert` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> Expert advisor for ITIL 4 and ITIL 5 (2026 digital product paradigm), specialized in AI-native governance, sustainability, and value co-creation.

**File sections:** Purpose · Core Capabilities · When to Use · Expert Instructions · Applicability Suggestions (ITIL 5) · Strategic Examples

##### `legal-advisor` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> Draft privacy policies, terms of service, disclaimers, and legal notices. Creates GDPR-compliant texts, cookie policies, and data processing agreements.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Key Regulations

##### `mermaid-expert` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 36/100 |

> Create Mermaid diagrams for flowcharts, sequences, ERDs, and architectures. Masters syntax for all diagram types and styling.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Diagram Types Expertise · Approach

##### `minimalist-ui` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> Use when creating clean editorial interfaces with warm monochrome palettes, crisp borders, restrained motion, and flat bento layouts.

**File sections:** When to Use · Limitations · 1. Protocol Overview · 2. Absolute Negative Constraints (Banned Elements) · 3. Typographic Architecture · 4. Color Palette (Warm Monochrome + Spot Pastels)

##### `odoo-orm-expert` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 36/100 |

> Master Odoo ORM patterns: search, browse, create, write, domain filters, computed fields, and performance-safe query techniques.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-xml-views-builder` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> Expert at building Odoo XML views: Form, List, Kanban, Search, Calendar, and Graph. Generates correct XML for Odoo 14-17 with proper visibility syntax.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `skill-writer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 37/100 |

> Create and improve agent skills following the Agent Skills specification. Use when asked to create, write, or update skills.

**File sections:** Step 1: Resolve target and path · Step 2: Run synthesis when needed · Step 3: Run iteration first when improving from outcomes/examples · Step 4: Author or update skill artifacts · Step 5: Optimize description quality · Step 6: Evaluate outcomes

##### `tool-use-guardian` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 35/100 |

> FREE — Intelligent tool-call reliability wrapper. Monitors, retries, fixes, and learns from tool failures. Auto-recovers from truncated JSON, timeouts, rate limits, and mid-chain failures.

**File sections:** Overview · Install · When to Use This Skill · How It Works · Best Practices · Related Skills

##### `zipai-optimizer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 36/100 |

> Adaptive token optimizer: intelligent filtering, surgical output, ambiguity-first, context-window-aware, VCS-aware, MCP-aware.

**File sections:** When to Use · Rules · Negative Constraints · Limitations

#### Cloud (49)

##### `cloudflare-workers-expert` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 35/100 |

> Expert in Cloudflare Workers and the Edge Computing ecosystem. Covers Wrangler, KV, D1, Durable Objects, and R2 storage.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Examples · Best Practices · Troubleshooting

#### Design (29)

##### `emotional-arc-designer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 35/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: EMOTIONAL ARC SEQUENCING · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `hig-foundations` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 37/100 |

> Apple Human Interface Guidelines design foundations.

**File sections:** Key Principles · Reference Index · Applying Foundations Together · Output Format · Questions to Ask · Related Skills

#### DevOps (20)

##### `cicd-automation-workflow-automate` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 35/100 |

> You are a workflow automation expert specializing in creating efficient CI/CD pipelines, GitHub Actions workflows, and automated development processes. Design and implement automation that reduces man

**File sections:** Use this skill when · Do not use this skill when · Safety · Context · Requirements · Instructions

#### Docs (16)

##### `wiki-onboarding` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 35/100 |

> Generate two complementary onboarding documents that together give any engineer — from newcomer to principal — a complete understanding of a codebase. Use when user asks for onboarding docs or getting

**File sections:** When to Use · Language Detection · Guide 1: Principal-Level Onboarding · Guide 2: Zero-to-Hero Contributor Guide · Limitations

#### Frontend (81)

##### `baseline-ui` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 37/100 |

> Validates animation durations, enforces typography scale, checks component accessibility, and prevents layout anti-patterns in Tailwind CSS projects. Use when building UI components, reviewing CSS uti

**File sections:** When to Use · How to use · Stack · Components · Interaction · Animation

##### `context7-auto-research` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 35/100 |

> Automatically fetch latest library/framework documentation for Claude Code via Context7 API. Use when you need up-to-date documentation for libraries and frameworks or asking about React, Next.js, Pri

**File sections:** Overview · When to Use · Installation · Step-by-Step Guide · Examples · Best Practices

##### `ui-tokens` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 36/100 |

> List, add, and update StyleSeed design tokens while keeping JSON sources, CSS variables, and dark-mode values in sync.

**File sections:** Overview · When to Use · How It Works · Output · Best Practices · Additional Resources

#### Git (30)

##### `app-store-changelog` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 35/100 |

> Generate user-facing App Store release notes from git history since the last tag.

**File sections:** Overview · When to Use · Workflow · Commit-to-Bullet Examples · Example Output · Output Format

##### `gh-review-requests` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 35/100 |

> Fetch unread GitHub notifications for open PRs where review is requested from a specified team or opened by a team member. Use when asked to "find PRs I need to review", "show my review requests", "wh

**File sections:** When to Use · Step 1: Identify the Team · Step 2: Run the Script · Step 3: Present Results · Fallback · Limitations

#### JS / TS (64)

##### `hig-components-system` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 37/100 |

> 'Apple HIG guidance for system experience components: widgets, live activities, notifications, complications, home screen quick actions, top shelf, watch faces, app clips, and app shortcuts.'

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

#### Marketing (60)

##### `chrome-extension-developer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 35/100 |

> Expert in building Chrome Extensions using Manifest V3. Covers background scripts, service workers, content scripts, and cross-context communication.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Examples · Best Practices · Troubleshooting

##### `exa-search` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 35/100 |

> Semantic search, similar content discovery, and structured research using Exa API. Use when you need semantic/embeddings-based search, finding similar content, or searching by category (company, peopl

**File sections:** Overview · When to Use · Installation · Step-by-Step Guide · Examples · Best Practices

##### `firecrawl-scraper` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 36/100 |

> Deep web scraping, screenshots, PDF parsing, and website crawling using Firecrawl API. Use when you need deep content extraction from web pages, page interaction is required (clicking, scrolling, etc.

**File sections:** Overview · When to Use · Installation · Step-by-Step Guide · Examples · Best Practices

##### `seo-aeo-content-cluster` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 37/100 |

> Builds a topical authority map with a pillar page, prioritised cluster articles, content types, internal link map, and content gap analysis. Activate when the user wants to build a content cluster, to

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `seo-aeo-internal-linking` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 37/100 |

> Maps internal link opportunities between pages with anchor text, placement instructions, orphan page detection, and cannibalization checks. Activate when the user wants to build an internal linking st

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Common Pitfalls

##### `tavily-web` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 35/100 |

> Web search, content extraction, crawling, and research capabilities using Tavily API. Use when you need to search the web for current information, extracting content from URLs, or crawling websites.

**File sections:** Overview · When to Use · Installation · Step-by-Step Guide · Examples · Best Practices

#### Other (233)

##### `acceptance-orchestrator` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 36/100 |

> Use when a coding task should be driven end-to-end from issue intake through implementation, review, deployment, and acceptance verification with minimal human re-intervention.

**File sections:** Overview · When to Use · Required Sub-Skills · Inputs · State Machine · Workflow

##### `computer-vision-expert` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 35/100 |

> SOTA Computer Vision Expert (2026). Specialized in YOLO26, Segment Anything 3 (SAM 3), Vision Language Models, and real-time spatial analysis.

**File sections:** Purpose · When to Use · Capabilities · Patterns · Anti-Patterns · Sharp Edges (2026)

##### `conductor-validator` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 35/100 |

> 'Validates Conductor project artifacts for completeness,

**File sections:** Use this skill when · Do not use this skill when · Instructions · Pattern Matching · Limitations

##### `full-output-enforcement` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 35/100 |

> Use when a task requires exhaustive unabridged output, complete files, or strict prevention of placeholders and skipped code.

**File sections:** When to Use · Limitations · Baseline · Banned Output Patterns · Execution Process · Handling Long Outputs

##### `odoo-accounting-setup` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 37/100 |

> Expert guide for configuring Odoo Accounting: chart of accounts, journals, fiscal positions, taxes, payment terms, and bank reconciliation.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-hr-payroll-setup` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 37/100 |

> Expert guide for Odoo HR and Payroll: salary structures, payslip rules, leave policies, employee contracts, and payroll journal entries.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-manufacturing-advisor` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 37/100 |

> Expert guide for Odoo Manufacturing: Bills of Materials (BoM), Work Centers, routings, MRP planning, and production order workflows.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-module-developer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 36/100 |

> Expert guide for creating custom Odoo modules. Covers __manifest__.py, model inheritance, ORM patterns, and module structure best practices.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `odoo-purchase-workflow` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 37/100 |

> Expert guide for Odoo Purchase: RFQ → PO → Receipt → Vendor Bill workflow, purchase agreements, vendor price lists, and 3-way matching.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `puzzle-activity-planner` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 37/100 |

> Plan puzzle-based activities for classrooms, parties, and events with pre-configured generator links

**File sections:** Overview · When to Use This Skill · Process · Puzzle Types Supported · URL Parameters · Output Format

##### `viboscope` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 37/100 |

> Psychological compatibility matching — find cofounders, collaborators, and friends through validated psychometrics

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Links · Limitations

#### Python (70)

##### `dbos-python` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 37/100 |

> Guide for building reliable, fault-tolerant Python applications with DBOS durable workflows. Use when adding DBOS to existing Python code, creating workflows and steps, or using queues for concurrency

**File sections:** When to Use · Rule Categories by Priority · Critical Rules · How to Use · References · Limitations

#### Security (111)

##### `fixing-metadata` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 35/100 |

> Audit and fix HTML metadata including page titles, meta descriptions, canonical URLs, Open Graph tags, Twitter cards, favicons, JSON-LD structured data, and robots directives. Use when adding or revie

**File sections:** Workflow · When to Use · rule categories by priority · quick reference · review guidance · Limitations

##### `google-docs-automation` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 35/100 |

> Lightweight Google Docs integration with standalone OAuth authentication. No MCP server required.

**File sections:** When to Use · First-Time Setup · Commands · Document ID Format · Token Management · Limitations

#### AI / ML (287)

##### `odoo-qweb-templates` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 34/100 |

> Expert in Odoo QWeb templating for PDF reports, email templates, and website pages. Covers t-if, t-foreach, t-field, and report actions.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `osterwalder-canvas-architect` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 33/100 |

> Iterative consultant agent for building and validating logically consistent 9-block Business Model Canvases.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `recallmax` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 34/100 |

> FREE — God-tier long-context memory for AI agents. Injects 500K-1M clean tokens, auto-summarizes with tone/intent preservation, compresses 14-turn history into 800 tokens.

**File sections:** Overview · Install · When to Use This Skill · How It Works · Best Practices · Related Skills

#### Data (27)

##### `fp-option-ref` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 33/100 |

> Quick reference for Option type. Use when user needs to handle nullable values, optional data, or wants to avoid null checks.

**File sections:** When to Use · Create · Transform · Extract · Common Patterns · vs Nullable

##### `php-pro` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 33/100 |

> 'Write idiomatic PHP code with generators, iterators, SPL data

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

#### Database (46)

##### `database-migrations-sql-migrations` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 33/100 |

> SQL database migrations with zero-downtime strategies for PostgreSQL, MySQL, and SQL Server. Focus on data integrity and rollback plans.

**File sections:** Overview · When to Use This Skill · Do Not Use This Skill When · Context · Instructions · Output Format

##### `nosql-expert` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 33/100 |

> Expert guidance for distributed NoSQL databases (Cassandra, DynamoDB). Focuses on mental models, query-first modeling, single-table design, and avoiding hot partitions in high-scale systems.

**File sections:** Overview · When to Use · The Mental Shift: SQL vs. Distributed NoSQL · Core Design Patterns · Specific Guidance · Expert Checklist

##### `vector-database-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 33/100 |

> Expert in vector databases, embedding strategies, and semantic search implementation. Masters Pinecone, Weaviate, Qdrant, Milvus, and pgvector for RAG applications, recommendation systems, and similar

**File sections:** Do not use this skill when · Instructions · Capabilities · Use this skill when · Workflow · Best Practices

#### Design (29)

##### `loss-aversion-designer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: REFERENCE-POINT FRAMING · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

#### DevOps (20)

##### `terraform-aws-modules` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 34/100 |

> Terraform module creation for AWS — reusable modules, state management, and HCL best practices. Use when building or reviewing Terraform AWS infrastructure.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Examples · Best Practices · Troubleshooting

#### Frontend (81)

##### `ui-page` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 34/100 |

> Scaffold a new mobile-first page using StyleSeed Toss layout patterns, section rhythm, and existing shell components.

**File sections:** Overview · When to Use · How It Works · Output · Best Practices · Additional Resources

##### `ui-review` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 33/100 |

> Review UI code for StyleSeed design-system compliance, accessibility, mobile ergonomics, spacing discipline, and implementation quality.

**File sections:** Overview · When to Use · Review Checklist · Output Format · Best Practices · Additional Resources

##### `ux-copy` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 34/100 |

> Generate UX microcopy in StyleSeed's Toss-inspired voice for buttons, empty states, errors, toasts, confirmations, and form guidance.

**File sections:** Overview · When to Use · Tone Rules · Common Patterns · Output · Best Practices

##### `ux-persuasion-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: CHOICE ARCHITECTURE FLOW · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

#### Git (30)

##### `address-github-comments` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 33/100 |

> Use when you need to address review or issue comments on an open GitHub Pull Request using the gh CLI.

**File sections:** Overview · Prerequisites · Workflow · Common Mistakes · When to Use · Limitations

##### `git-pr-workflows-pr-enhance` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 33/100 |

> You are a PR optimization expert specializing in creating high-quality pull requests that facilitate efficient code reviews. Generate comprehensive PR descriptions, automate review processes, and ensu

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### JS / TS (64)

##### `hig-components-layout` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 33/100 |

> Apple Human Interface Guidelines for layout and navigation components.

**File sections:** Key Principles · Reference Index · Navigation Pattern Selection · Layout Adaptation Checklist · Output Format · Questions to Ask

#### Marketing (60)

##### `copywriting-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 34/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: MECHANISM-FIRST COPY STACK · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

#### Other (233)

##### `brand-perception-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: BRAND SCHEMA ALIGNMENT · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `error-diagnostics-error-trace` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> You are an error tracking and observability expert specializing in implementing comprehensive error monitoring solutions. Set up error tracking systems, configure alerts, implement structured logging,

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

##### `framework-migration-code-migrate` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> You are a code migration expert specializing in transitioning codebases between frameworks, languages, versions, and platforms. Generate comprehensive migration plans, automated migration scripts, and

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

##### `headline-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: CURIOSITY-CONTRAST HEADLINE ENGINE · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `jobs-to-be-done-analyst` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: PROGRESS JOB DECOMPOSITION · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `monorepo-architect` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> Expert in monorepo architecture, build systems, and dependency management at scale. Masters Nx, Turborepo, Bazel, and Lerna for efficient multi-project development. Use PROACTIVELY for monorepo setup,

**File sections:** Do not use this skill when · Instructions · Capabilities · Use this skill when · Workflow · Best Practices

##### `observability-monitoring-monitor-setup` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> You are a monitoring and observability expert specializing in implementing comprehensive monitoring solutions. Set up metrics collection, distributed tracing, log aggregation, and create insightful da

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

##### `onboarding-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: IDENTITY-TO-HABIT ONBOARDING · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `price-psychology-strategist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: PRICE SIGNAL ARCHITECTURE · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `risk-manager` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> Monitor portfolio risk, R-multiples, and position limits. Creates hedging strategies, calculates expectancy, and implements stop-losses.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `scarcity-urgency-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: GENUINE SCARCITY CALIBRATION · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `sequence-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: COMMITMENT-PACING SEQUENCE · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `subject-line-psychologist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: OPEN-TRIGGER SIGNALING · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

##### `using-superpowers` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 33/100 |

> Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions

**File sections:** How to Access Skills · The Rule · Red Flags · Skill Priority · Skill Types · User Instructions

#### Rust (20)

##### `trust-calibrator` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 33/100 |

> One sentence - what this skill does and when to invoke it

**File sections:** When to Use · CONTEXT GATHERING · PSYCHOLOGICAL FRAMEWORK: CREDIBILITY LADDER · DECISION MATRIX · FAILURE MODES - DO NOT DO THESE · ETHICAL GUARDRAILS

#### Security (111)

##### `antigravity-workflows` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 33/100 |

> Orchestrate multiple Antigravity skills through guided workflows for SaaS MVP delivery, security audits, AI agent builds, and browser QA.

**File sections:** When to Use This Skill · Workflow Source of Truth · How to Run This Skill · Default Workflow Routing · Copy-Paste Prompts · Limitations

##### `fda-medtech-compliance-auditor` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 34/100 |

> Expert AI auditor for Medical Device (SaMD) compliance, IEC 62304, and 21 CFR Part 820. Reviews DHFs, technical files, and software validation.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `kotler-macro-analyzer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 33/100 |

> Professional PESTEL/SWOT analysis agent based on Kotler's methodology for strategic market audits.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

##### `security-scanning-security-dependencies` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 33/100 |

> You are a security expert specializing in dependency vulnerability analysis, SBOM generation, and supply chain security. Scan project dependencies across multiple ecosystems to identify vulnerabilitie

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `service-mesh-expert` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 33/100 |

> Expert service mesh architect specializing in Istio, Linkerd, and cloud-native networking patterns. Masters traffic management, security policies, observability integration, and multi-cluster mesh con

**File sections:** Do not use this skill when · Instructions · Capabilities · Use this skill when · Workflow · Best Practices

#### Testing (71)

##### `android_ui_verification` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 34/100 |

> Automated end-to-end UI testing and verification on an Android Emulator using ADB.

**File sections:** When to Use · ?? Prerequisites · ?? Workflow · ?? Best Practices · Limitations

##### `framework-migration-deps-upgrade` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 33/100 |

> You are a dependency management expert specializing in safe, incremental upgrades of project dependencies. Plan and execute dependency updates with minimal risk, proper testing, and clear migration pa

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

#### AI / ML (287)

##### `agent-manager-skill` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 31/100 |

> Manage multiple local CLI agents via tmux sessions (start/stop/monitor/assign) with cron-friendly scheduling.

**File sections:** When to Use · Prerequisites · Common commands · Notes · Limitations

##### `cpp-pro` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 32/100 |

> Write idiomatic C++ code with modern features, RAII, smart pointers, and STL algorithms. Handles templates, move semantics, and performance optimization.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `domain-driven-design` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 30/100 |

> Plan and route Domain-Driven Design work from strategic modeling to tactical implementation and evented architecture patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Output requirements · Examples · Limitations

##### `emblemai-crypto-wallet` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 32/100 |

> Crypto wallet management across 7 blockchains via EmblemAI Agent Hustle API. Balance checks, token swaps, portfolio analysis, and transaction execution for Solana, Ethereum, Base, BSC, Polygon, Hedera

**File sections:** When to Use · Setup · Supported Chains · API Integration · Key Behaviors · Links

##### `llm-application-dev-ai-assistant` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 31/100 |

> You are an AI assistant development expert specializing in creating intelligent conversational interfaces, chatbots, and AI-powered applications. Design comprehensive AI assistant solutions with natur

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Resources

##### `llm-application-dev-prompt-optimize` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 31/100 |

> You are an expert prompt engineer specializing in crafting effective prompts for LLMs through advanced techniques including constitutional AI, chain-of-thought reasoning, and model-specific optimizati

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Resources

##### `obsidian-clipper-template-creator` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 32/100 |

> Guide for creating templates for the Obsidian Web Clipper. Use when you want to create a new clipping template, understand available variables, or format clipped content.

**File sections:** When to Use · Workflow · Selector Verification Rules · Output Format · Resources · Examples

##### `sales-automator` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 32/100 |

> 'Draft cold emails, follow-ups, and proposal templates. Creates pricing pages, case studies, and sales scripts. Use PROACTIVELY for sales outreach or lead nurturing. '

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `team-collaboration-standup-notes` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 31/100 |

> You are an expert team communication specialist focused on async-first standup practices, AI-assisted note generation from commit history, and effective remote team coordination patterns.

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Resources

##### `technical-change-tracker` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 30/100 |

> Track code changes with structured JSON records, state machine enforcement, and AI session handoff for bot continuity

**File sections:** Overview · When to Use This Skill · How It Works · Features · Full Repository · Limitations

##### `theme-factory` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 30/100 |

> This skill provides a curated collection of professional font and color themes themes, each with carefully selected color palettes and font pairings. Once a theme is chosen, it can be applied to any a

**File sections:** Purpose · Usage Instructions · Themes Available · Theme Details · Application Process · Create your Own Theme

#### API (32)

##### `api-patterns` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 31/100 |

> API design principles and decision-making. REST vs GraphQL vs tRPC selection, response formats, versioning, pagination.

**File sections:** ?? Selective Reading Rule · ?? Content Map · ?? Related Skills · ? Decision Checklist · ? Anti-Patterns · Script

#### Backend (31)

##### `ruby-pro` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 32/100 |

> Write idiomatic Ruby code with metaprogramming, Rails patterns, and performance optimization. Specializes in Ruby on Rails, gem development, and testing frameworks.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

#### Cloud (49)

##### `cloudformation-best-practices` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 32/100 |

> CloudFormation template optimization, nested stacks, drift detection, and production-ready patterns. Use when writing or reviewing CF templates.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Examples · Best Practices · Troubleshooting

#### Design (29)

##### `code-refactoring-refactor-clean` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 30/100 |

> You are a code refactoring expert specializing in clean code principles, SOLID design patterns, and modern software engineering best practices. Analyze and refactor the provided code to improve its qu

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `codebase-cleanup-refactor-clean` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 30/100 |

> You are a code refactoring expert specializing in clean code principles, SOLID design patterns, and modern software engineering best practices. Analyze and refactor the provided code to improve its qu

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `hig-patterns` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 32/100 |

> Apple Human Interface Guidelines interaction and UX patterns.

**File sections:** Key Principles · Reference Index · Pattern Selection Guide · Output Format · Questions to Ask · Related Skills

##### `hig-platforms` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 30/100 |

> Apple Human Interface Guidelines for platform-specific design.

**File sections:** Key Principles · Reference Index · Decision Framework · Output Format · Questions to Ask · Related Skills

##### `web-design-guidelines` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 30/100 |

> Review files for compliance with Web Interface Guidelines.

**File sections:** How It Works · Guidelines Source · Usage · When to Use · Limitations

#### Frontend (81)

##### `expo-ui-jetpack-compose` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 32/100 |

> expo-ui-jetpack-compose

**File sections:** When to Use · Installation · Instructions · Key Components · Limitations

##### `expo-ui-swift-ui` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 31/100 |

> expo-ui-swift-ui

**File sections:** When to Use · Installation · Instructions · Limitations

##### `ui-a11y` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 31/100 |

> Audit a StyleSeed-based component or page for WCAG 2.2 AA issues and apply practical accessibility fixes where the code makes them safe.

**File sections:** Overview · When to Use · Audit Areas · Output · Best Practices · Additional Resources

##### `ux-feedback` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 30/100 |

> Add loading, empty, error, and success feedback states to StyleSeed components and pages with practical mobile-first rules.

**File sections:** Overview · When to Use · The Four Required States · Output · Best Practices · Additional Resources

#### Git (30)

##### `team-collaboration-issue` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 31/100 |

> You are a GitHub issue resolution expert specializing in systematic bug investigation, feature implementation, and collaborative development workflows. Your expertise spans issue triage, root cause an

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Resources

#### Go (10)

##### `go-playwright` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 31/100 |

> Expert capability for robust, stealthy, and efficient browser automation using Playwright Go.

**File sections:** Overview · When to Use This Skill · Safety & Risk · Limitations · Strategic Implementation Guidelines · Resources

#### Java / Kotlin (52)

##### `animejs-animation` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 31/100 |

> Advanced JavaScript animation library skill for creating complex, high-performance web animations.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

##### `azure-communication-callingserver-java` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 32/100 |

> ⚠️ DEPRECATED: This SDK has been renamed to Call Automation. For new projects, use azure-communication-callautomation instead. This skill is for maintaining legacy code only.

**File sections:** Migration to Call Automation · Class Name Changes · Legacy Client Creation · Legacy Recording · For New Development · Trigger Phrases

#### JS / TS (64)

##### `hig-components-content` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 30/100 |

> Apple Human Interface Guidelines for content display components.

**File sections:** Key Principles · Reference Index · Component Selection Guide · Output Format · Questions to Ask · Related Skills

##### `hig-components-status` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 31/100 |

> Apple HIG guidance for status and progress UI components including progress indicators, status bars, and activity rings.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `web-artifacts-builder` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 32/100 |

> To build powerful frontend claude.ai artifacts, follow these steps:

**File sections:** Design & Style Guidelines · Quick Start · Reference · When to Use · Limitations

##### `zustand-store-ts` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 32/100 |

> Create Zustand stores following established patterns with proper TypeScript types and middleware.

**File sections:** Quick Start · Always Use subscribeWithSelector · Separate State and Actions · Use Individual Selectors · Subscribe Outside React · Integration Steps

#### Marketing (60)

##### `defuddle` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Marketing | 32/100 |

> Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation to save tokens. Use instead of WebFetch when the user provides a URL to read or analyze, for online do

**File sections:** When to Use · Usage · Output formats · Limitations

#### Other (233)

##### `c-pro` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 32/100 |

> Write efficient C code with proper memory management, pointer

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `elixir-pro` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 32/100 |

> Write idiomatic Elixir code with OTP patterns, supervision trees, and Phoenix LiveView. Masters concurrency, fault tolerance, and distributed systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `error-detective` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 32/100 |

> Search logs and codebases for error patterns, stack traces, and anomalies. Correlates errors across systems and identifies root causes.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `haskell-pro` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 32/100 |

> Expert Haskell engineer specializing in advanced type systems, pure

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `legacy-modernizer` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 32/100 |

> Refactor legacy codebases, migrate outdated frameworks, and implement gradual modernization. Handles technical debt, dependency updates, and backward compatibility.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `phase-gated-debugging` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 30/100 |

> Use when debugging any bug. Enforces a 5-phase protocol where code edits are blocked until root cause is confirmed. Prevents premature fix attempts.

**File sections:** Overview · When to Use · The Protocol · Bug-Type Strategies · Key Rules · Limitations

##### `professional-proofreader` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 30/100 |

> >

**File sections:** Overview · When to Use · Best Practices · Limitations

##### `satori` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 32/100 |

> Clinically informed wisdom companion blending psychology and philosophy into a structured thinking partner

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Security & Safety Notes

#### Python (70)

##### `cdk-patterns` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 32/100 |

> Common AWS CDK patterns and constructs for building cloud infrastructure with TypeScript, Python, or Java. Use when designing reusable CDK stacks and L3 constructs.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Examples · Best Practices · Troubleshooting

#### Rust (20)

##### `tokenwise` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 32/100 |

> Measurement-driven model router for Claude Code. Routes Haiku/Sonnet/Opus per task class, logs every routed task with real $ numbers, and A/B tests cheaper tiers before you trust the savings.

**File sections:** Overview · When to use · Subcommands · Routing taxonomy · Privacy · Install

#### Security (111)

##### `accessibility-compliance-accessibility-audit` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 31/100 |

> You are an accessibility expert specializing in WCAG compliance, inclusive design, and assistive technology compatibility. Conduct audits, identify barriers, and provide remediation guidance.

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Resources

##### `find-bugs` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 30/100 |

> Find bugs, security vulnerabilities, and code quality issues in local branch changes. Use when asked to review changes, find bugs, security review, or audit code on the current branch.

**File sections:** When to Use · Phase 1: Complete Input Gathering · Phase 2: Attack Surface Mapping · Phase 3: Security Checklist (check EVERY item for EVERY file) · Phase 4: Verification · Phase 5: Pre-Conclusion Audit

##### `security-compliance-compliance-check` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 30/100 |

> You are a compliance expert specializing in regulatory requirements for software systems including GDPR, HIPAA, SOC2, PCI-DSS, and other industry standards. Perform comprehensive compliance audits and

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `supply-chain-risk-auditor` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 30/100 |

> Identifies dependencies at heightened risk of exploitation or takeover. Use when assessing supply chain attack surface, evaluating dependency health, or scoping security engagements.

**File sections:** When to Use · When NOT to Use · Purpose · Prerequisites · Workflow (Initial Setup) · Workflow (Dependency Audit)

#### Testing (71)

##### `csharp-pro` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 32/100 |

> Write modern C# code with advanced features like records, pattern matching, and async/await. Optimizes .NET applications, implements enterprise patterns, and ensures comprehensive testing.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `quant-analyst` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 32/100 |

> Build financial models, backtest trading strategies, and analyze market data. Implements risk metrics, portfolio optimization, and statistical arbitrage.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

##### `tdd-workflows-tdd-green` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 30/100 |

> Implement the minimal code needed to make failing tests pass in the TDD green phase.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### AI / ML (287)

##### `avalonia-layout-zafiro` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 28/100 |

> Guidelines for modern Avalonia UI layout using Zafiro.Avalonia, emphasizing shared styles, generic components, and avoiding XAML redundancy.

**File sections:** 🎯 Selective Reading Rule · 📑 Content Map · 🔗 Related Project (Exemplary Implementation) · ✅ Checklist for Clean Layouts · ❌ Anti-Patterns · When to Use

##### `code-documentation-code-explain` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 28/100 |

> You are a code education expert specializing in explaining complex code through clear narratives, visual diagrams, and step-by-step breakdowns. Transform difficult concepts into understandable explana

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Output Format

##### `error-handling-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 28/100 |

> Build resilient applications with robust error handling strategies that gracefully handle failures and provide excellent debugging experiences.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `fp-pipe-ref` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 29/100 |

> Quick reference for pipe and flow. Use when user needs to chain functions, compose operations, or build data pipelines in fp-ts.

**File sections:** pipe - Transform a Value · flow - Create Reusable Pipeline · When to Use · With fp-ts Types · Common Pattern · Limitations

##### `ios-debugger-agent` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 29/100 |

> Debug the current iOS project on a booted simulator with XcodeBuildMCP.

**File sections:** Overview · When to Use · Core Workflow · UI Interaction & Debugging · Logs & Console Output · Troubleshooting

#### API (32)

##### `pydantic-models-py` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 29/100 |

> Create Pydantic models following the multi-model pattern for clean API contracts.

**File sections:** Quick Start · Multi-Model Pattern · camelCase Aliases · Optional Update Fields · Database Document · Integration Steps

#### Automation (73)

##### `makepad-reference` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 28/100 |

> This category provides reference materials for debugging, code quality, and advanced layout patterns.

**File sections:** When to Use · Quick Navigation · Common Issues Quick Reference · Debug Tips · Resources · Limitations

#### Backend (31)

##### `dotnet-backend-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 28/100 |

> Master C#/.NET patterns for building production-grade APIs, MCP servers, and enterprise backends with modern best practices (2024/2025).

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Database (46)

##### `sql-optimization-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 28/100 |

> Transform slow database queries into lightning-fast operations through systematic optimization, proper indexing, and query plan analysis.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `using-neon` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 29/100 |

> Neon is a serverless Postgres platform that separates compute and storage to offer autoscaling, branching, instant restore, and scale-to-zero. It's fully compatible with Postgres and works with any la

**File sections:** When to Use This Skill · Neon Documentation · Overview of Resources · Limitations

#### Design (29)

##### `event-sourcing-architect` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 29/100 |

> Expert in event sourcing, CQRS, and event-driven architecture patterns. Masters event store design, projection building, saga orchestration, and eventual consistency patterns. Use PROACTIVELY for even

**File sections:** Capabilities · Use this skill when · Do not use this skill when · Instructions · Safety · Best Practices

##### `observability-monitoring-slo-implement` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 28/100 |

> You are an SLO (Service Level Objective) expert specializing in implementing reliability standards and error budget-based engineering practices. Design comprehensive SLO frameworks, establish meaningf

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

#### DevOps (20)

##### `k8s-manifest-generator` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 28/100 |

> Step-by-step guidance for creating production-ready Kubernetes manifests including Deployments, Services, ConfigMaps, Secrets, and PersistentVolumeClaims.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Frontend (81)

##### `ux-flow` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 29/100 |

> Design user flows and screen structure using StyleSeed UX patterns such as progressive disclosure, hub-and-spoke navigation, and information pyramids.

**File sections:** Overview · When to Use · How It Works · Output · Best Practices · Additional Resources

#### Git (30)

##### `changelog-automation` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 29/100 |

> Automate changelog generation from commits, PRs, and releases following Keep a Changelog format. Use when setting up release workflows, generating release notes, or standardizing commit conventions.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### Java / Kotlin (52)

##### `javascript-testing-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 28/100 |

> Comprehensive guide for implementing robust testing strategies in JavaScript/TypeScript applications using modern testing frameworks and best practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `modern-javascript-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 28/100 |

> Comprehensive guide for mastering modern JavaScript (ES6+) features, functional programming patterns, and best practices for writing clean, maintainable, and performant code.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### JS / TS (64)

##### `hig-components-controls` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 29/100 |

> Check for .claude/apple-design-context.md before asking questions. Use existing context and only ask for information not already covered.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `hig-components-dialogs` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 28/100 |

> Apple HIG guidance for presentation components including alerts, action sheets, popovers, sheets, and digit entry views.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `hig-components-menus` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 28/100 |

> Check for .claude/apple-design-context.md before asking questions. Use existing context and only ask for information not already covered.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `nodejs-backend-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 28/100 |

> Comprehensive guidance for building scalable, maintainable, and production-ready Node.js backend applications with modern frameworks, architectural patterns, and best practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `typescript-advanced-types` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 28/100 |

> Comprehensive guidance for mastering TypeScript's advanced type system including generics, conditional types, mapped types, template literal types, and utility types for building robust, type-safe app

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Other (233)

##### `concise-planning` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 29/100 |

> Use when a user asks for a plan for a coding task, to generate a clear, actionable, and atomic checklist.

**File sections:** Goal · Workflow · Plan Template · Scope · Action Items · Open Questions

##### `error-debugging-error-trace` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 28/100 |

> You are an error tracking and observability expert specializing in implementing comprehensive error monitoring solutions. Set up error tracking systems, configure alerts, implement structured logging,

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `monorepo-management` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 28/100 |

> Build efficient, scalable monorepos that enable code sharing, consistent tooling, and atomic changes across multiple packages and applications.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Python (70)

##### `python-packaging` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 28/100 |

> Comprehensive guide to creating, structuring, and distributing Python packages using modern packaging tools, pyproject.toml, and publishing to PyPI.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `python-performance-optimization` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 28/100 |

> Profile and optimize Python code using cProfile, memory profilers, and performance best practices. Use when debugging slow Python code, optimizing bottlenecks, or improving application performance.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `python-testing-patterns` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 28/100 |

> Implement comprehensive testing strategies with pytest, fixtures, mocking, and test-driven development. Use when writing Python tests, setting up test suites, or implementing testing best practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `uv-package-manager` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 28/100 |

> Comprehensive guide to using uv, an extremely fast Python package installer and resolver written in Rust, for modern Python project management and dependency workflows.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Security (111)

##### `avoid-ai-writing` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 28/100 |

> Audit and rewrite content to remove 21 categories of AI writing patterns with a 43-entry replacement table

**File sections:** When to Use This Skill · What It Detects · Example · Limitations

##### `codebase-cleanup-deps-audit` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 29/100 |

> You are a dependency security expert specializing in vulnerability scanning, license compliance, and supply chain security. Analyze project dependencies for known vulnerabilities, licensing issues, ou

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `fda-food-safety-auditor` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 29/100 |

> Expert AI auditor for FDA Food Safety (FSMA), HACCP, and PCQI compliance. Reviews food facility records and preventive controls.

**File sections:** Overview · When to Use This Skill · How It Works · Examples · Best Practices · Limitations

#### Testing (71)

##### `api-testing-observability-api-mock` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 28/100 |

> You are an API mocking expert specializing in realistic mock services for development, testing, and demos. Design mocks that simulate real API behavior and enable parallel development.

**File sections:** Use this skill when · Do not use this skill when · Safety · Context · Requirements · Instructions

##### `debugger` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 28/100 |

> 'Debugging specialist for errors, test failures, and unexpected

**File sections:** Use this skill when · Do not use this skill when · Instructions · Limitations

#### AI / ML (287)

##### `brand-guidelines-anthropic` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> To access Anthropic's official brand identity and style resources, use this skill.

**File sections:** Overview · Brand Guidelines · Features · Technical Details · When to Use · Limitations

##### `brand-guidelines-community` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> To access Anthropic's official brand identity and style resources, use this skill.

**File sections:** Overview · Brand Guidelines · Features · Technical Details · When to Use · Limitations

##### `hybrid-search-implementation` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> Combine vector and keyword search for improved retrieval. Use when implementing RAG systems, building search engines, or when neither approach alone provides sufficient recall.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `incident-response-smart-fix` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> [Extended thinking: This workflow implements a sophisticated debugging and resolution pipeline that leverages AI-assisted debugging tools and observability platforms to systematically diagnose and res

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `memory-safety-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> Cross-language patterns for memory-safe programming including RAII, ownership, smart pointers, and resource management.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `openapi-spec-generation` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> Generate and maintain OpenAPI 3.1 specifications from code, design-first specs, and validation patterns. Use when creating API documentation, generating SDKs, or ensuring API contract compliance.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `product-manager` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 27/100 |

> Senior PM agent with 6 knowledge domains, 30+ frameworks, 12 templates, and 32 SaaS metrics with formulas. Pure Markdown, zero scripts.

**File sections:** When to Use · Knowledge Domains · Frameworks · Templates · SaaS Metrics · Compatibility

#### Automation (73)

##### `billing-automation` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Automation | 25/100 |

> Master automated billing systems including recurring billing, invoice generation, dunning management, proration, and tax calculation.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### Backend (31)

##### `fastapi-router-py` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 27/100 |

> Create FastAPI routers following established patterns with proper authentication, response models, and HTTP status codes.

**File sections:** Quick Start · Authentication Patterns · Response Models · HTTP Status Codes · Integration Steps · When to Use

##### `fastapi-templates` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 27/100 |

> Create production-ready FastAPI projects with async patterns, dependency injection, and comprehensive error handling. Use when building new FastAPI applications or setting up backend API projects.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Data (27)

##### `unity-ecs-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 27/100 |

> Production patterns for Unity's Data-Oriented Technology Stack (DOTS) including Entity Component System, Job System, and Burst Compiler.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Database (46)

##### `database-cloud-optimization-cost-optimize` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 27/100 |

> You are a cloud cost optimization expert specializing in reducing infrastructure expenses while maintaining performance and reliability. Analyze cloud spending, identify savings opportunities, and imp

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `postgres-best-practices` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 27/100 |

> Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations.

**File sections:** When to Use · Rule Categories by Priority · How to Use · Full Compiled Document · Limitations

##### `similarity-search-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 27/100 |

> Implement efficient similarity search with vector databases. Use when building semantic search, implementing nearest neighbor queries, or optimizing retrieval performance.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Design (29)

##### `software-architecture` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 25/100 |

> Guide for quality focused software architecture. This skill should be used when users want to write code, design architecture, analyze code, in any case that relates to software development.

**File sections:** Code Style Rules · When to Use · Limitations

#### DevOps (20)

##### `helm-chart-scaffolding` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | DevOps | 27/100 |

> Comprehensive guidance for creating, organizing, and managing Helm charts for packaging and deploying Kubernetes applications.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Docs (16)

##### `architecture` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 26/100 |

> Architectural decision-making framework. Requirements analysis, trade-off evaluation, ADR documentation. Use when making architecture decisions or analyzing system design.

**File sections:** 🎯 Selective Reading Rule · 🔗 Related Skills · Core Principle · Validation Checklist · When to Use · Limitations

##### `wiki-architect` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 27/100 |

> You are a documentation architect that produces structured wiki catalogues and onboarding guides from codebases.

**File sections:** When to Use · Procedure · Onboarding Guide Architecture · Language Detection · Constraints · Output

##### `wiki-page-writer` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 26/100 |

> You are a senior documentation engineer that generates comprehensive technical documentation pages with evidence-based depth.

**File sections:** When to Use · Depth Requirements (NON-NEGOTIABLE) · Procedure · Mandatory Requirements · Limitations

#### Frontend (81)

##### `avalonia-viewmodels-zafiro` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 27/100 |

> Optimal ViewModel and Wizard creation patterns for Avalonia using Zafiro and ReactiveUI.

**File sections:** Core Principles · Guides · Example Reference · When to Use · Limitations

##### `awt-e2e-testing` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 26/100 |

> AI-powered E2E web testing — eyes and hands for AI coding tools. Declarative YAML scenarios, Playwright execution, visual matching (OpenCV + OCR), platform auto-detection (Flutter/React/Vue), learning

**File sections:** When to Use · What works now · Links · Limitations

##### `react-modernization` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 27/100 |

> Master React version upgrades, class to hooks migration, concurrent features adoption, and codemods for automated transformation.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `react-native-architecture` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 27/100 |

> Production-ready patterns for React Native development with Expo, including navigation, state management, native modules, and offline-first architecture.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `tailwind-design-system` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 27/100 |

> Build production-ready design systems with Tailwind CSS, including design tokens, component variants, responsive patterns, and accessibility.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `ux-audit` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 27/100 |

> Audit screens against Nielsen's heuristics and mobile UX best practices using the StyleSeed Toss design language as the implementation context.

**File sections:** Overview · When to Use · Audit Framework · Output · Best Practices · Additional Resources

#### Git (30)

##### `gdpr-data-handling` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 27/100 |

> Practical implementation guide for GDPR-compliant data processing, consent management, and privacy controls.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Go (10)

##### `go-concurrency-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Go | 27/100 |

> Master Go concurrency with goroutines, channels, sync primitives, and context. Use when building concurrent Go applications, implementing worker pools, or debugging race conditions.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### JS / TS (64)

##### `bats-testing-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 27/100 |

> Master Bash Automated Testing System (Bats) for comprehensive shell script testing. Use when writing tests for shell scripts, CI/CD pipelines, or requiring test-driven development of shell utilities.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `hig-components-search` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 27/100 |

> Apple HIG guidance for navigation-related components including search fields, page controls, and path controls.

**File sections:** Key Principles · Reference Index · Output Format · Questions to Ask · Related Skills · When to Use

##### `nextjs-app-router-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 27/100 |

> Comprehensive patterns for Next.js 14+ App Router architecture, Server Components, and modern full-stack React development.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `react-flow-node-ts` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 26/100 |

> Create React Flow node components following established patterns with proper TypeScript types and store integration.

**File sections:** Quick Start · Templates · Node Component Pattern · Type Definition Pattern · Integration Steps · When to Use

#### Mobile (19)

##### `expo-deployment` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Mobile | 25/100 |

> Deploy Expo apps to production

**File sections:** Overview · When to Use This Skill · Instructions · Deployment Workflow · Best Practices · Resources

#### Other (233)

##### `competitive-landscape` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Comprehensive frameworks for analyzing competition, identifying differentiation opportunities, and developing winning market positioning strategies.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `ddd-context-mapping` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Map relationships between bounded contexts and define integration contracts using DDD context mapping patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Output requirements · Examples · Limitations

##### `distributed-debugging-debug-trace` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> You are a debugging expert specializing in setting up comprehensive debugging environments, distributed tracing, and diagnostic tools. Configure debugging workflows, implement tracing solutions, and e

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `error-debugging-error-analysis` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> You are an expert error analysis specialist with deep expertise in debugging distributed systems, analyzing production incidents, and implementing comprehensive observability solutions.

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `error-diagnostics-error-analysis` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> You are an expert error analysis specialist with deep expertise in debugging distributed systems, analyzing production incidents, and implementing comprehensive observability solutions.

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `executing-plans` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Use when you have a written implementation plan to execute in a separate session with review checkpoints

**File sections:** Overview · The Process · When to Stop and Ask for Help · When to Revisit Earlier Steps · Remember · When to Use

##### `fp-types-ref` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Quick reference for fp-ts types. Use when user asks which type to use, needs Option/Either/Task decision help, or wants fp-ts imports.

**File sections:** When to Use · Which Type Should I Use? · Common Imports · One-Line Patterns · Pattern Match · Limitations

##### `godot-gdscript-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Master Godot 4 GDScript patterns including signals, scenes, state machines, and optimization. Use when building Godot games, implementing game systems, or learning GDScript best practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `projection-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Build read models and projections from event streams. Use when implementing CQRS read sides, building materialized views, or optimizing query performance in event-sourced systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `risk-metrics-calculation` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Calculate portfolio risk metrics including VaR, CVaR, Sharpe, Sortino, and drawdown analysis. Use when measuring portfolio risk, implementing risk limits, or building risk monitoring systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `startup-metrics-framework` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Comprehensive guide to tracking, calculating, and optimizing key performance metrics for different startup business models from seed through Series A.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `track-management` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 27/100 |

> Use this skill when creating, managing, or working with Conductor tracks - the logical work units for features, bugs, and refactors. Applies to spec.md, plan.md, and track lifecycle operations.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `vector-index-tuning` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 25/100 |

> Optimize vector index performance for latency, recall, and memory. Use when tuning HNSW parameters, selecting quantization strategies, or scaling vector search infrastructure.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### Rust (20)

##### `rust-async-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 27/100 |

> Master Rust async programming with Tokio, async traits, error handling, and concurrent patterns. Use when building async Rust applications, implementing concurrent systems, or debugging async code.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Security (111)

##### `anti-reversing-techniques` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 25/100 |

> AUTHORIZED USE ONLY: This skill contains dual-use security techniques. Before proceeding with any bypass or analysis: > 1.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

##### `attack-tree-construction` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 25/100 |

> Build comprehensive attack trees to visualize threat paths. Use when mapping attack scenarios, identifying defense gaps, or communicating security risks to stakeholders.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

##### `dependency-management-deps-audit` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 27/100 |

> You are a dependency security expert specializing in vulnerability scanning, license compliance, and supply chain security. Analyze project dependencies for known vulnerabilities, licensing issues, ou

**File sections:** Use this skill when · Do not use this skill when · Context · Requirements · Instructions · Safety

##### `protocol-reverse-engineering` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 27/100 |

> Comprehensive techniques for capturing, analyzing, and documenting network protocols for security research, interoperability, and debugging.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `security-bluebook-builder` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 26/100 |

> Build a minimal but real security policy for sensitive apps. The output is a single, coherent Blue Book document using MUST/SHOULD/CAN language, with explicit assumptions, scope, and security gates.

**File sections:** When to Use · Overview · Workflow · Resources · Limitations

##### `security-requirement-extraction` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 27/100 |

> Derive security requirements from threat models and business context. Use when translating threats into actionable requirements, creating security user stories, or building security test cases.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `solidity-security` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 27/100 |

> Master smart contract security best practices, vulnerability prevention, and secure Solidity development patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `stride-analysis-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 27/100 |

> Apply STRIDE methodology to systematically identify threats. Use when analyzing system security, conducting threat modeling sessions, or creating security documentation.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `threat-mitigation-mapping` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 27/100 |

> Map identified threats to appropriate security controls and mitigations. Use when prioritizing security investments, creating remediation plans, or validating control effectiveness.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Testing (71)

##### `data-quality-frameworks` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 25/100 |

> Implement data quality validation with Great Expectations, dbt tests, and data contracts. Use when building data quality pipelines, implementing validation rules, or establishing data contracts.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

##### `dbt-transformation-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 27/100 |

> Production-ready patterns for dbt (data build tool) including model organization, testing strategies, documentation, and incremental processing.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `infinite-gratitude` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 27/100 |

> Multi-agent research skill for parallel research execution (10 agents, battle-tested with real case studies).

**File sections:** Description · When to Use · How to Use · Limitations

##### `screen-reader-testing` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 27/100 |

> Practical guide to testing web applications with screen readers for comprehensive accessibility validation.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `workflow-patterns` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 27/100 |

> Use this skill when implementing tasks according to Conductor's TDD workflow, handling phase checkpoints, managing git commits for tasks, or understanding the verification protocol.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Data (27)

##### `bash-defensive-patterns` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 24/100 |

> Master defensive Bash programming techniques for production-grade scripts. Use when writing robust shell scripts, CI/CD pipelines, or system utilities requiring fault tolerance and safety.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

##### `microservices-patterns` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Data | 23/100 |

> Master microservices architecture patterns including service boundaries, inter-service communication, data management, and resilience patterns for building distributed systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Docs (16)

##### `wiki-researcher` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 23/100 |

> You are an expert software engineer and systems analyst. Use when user asks \"how does X work\" with expectation of depth, user wants to understand a complex system spanning many files, or user asks f

**File sections:** When to Use · Core Invariants (NON-NEGOTIABLE) · Process: 5 Iterations · Rules · Limitations

#### Frontend (81)

##### `uxui-principles` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 24/100 |

> Evaluate interfaces against 168 research-backed UX/UI principles, detect antipatterns, and inject UX context into AI coding sessions.

**File sections:** Skills · When to Use · How It Works · Install · Limitations

#### Other (233)

##### `auth-implementation-patterns` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 24/100 |

> Build secure, scalable authentication and authorization systems using industry-standard patterns and modern best practices.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

##### `busybox-on-windows` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 23/100 |

> How to use a Win32 build of BusyBox to run many of the standard UNIX command line tools on Windows.

**File sections:** When to Use · Limitations

##### `lint-and-validate` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 23/100 |

> MANDATORY: Run appropriate validation tools after EVERY code change. Do not finish a task until the code is error-free.

**File sections:** The Quality Loop · Error Handling · Scripts · When to Use · Limitations

##### `oss-hunter` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 24/100 |

> Automatically hunt for high-impact OSS contribution opportunities in trending repositories.

**File sections:** When to Use · Quick Start · Workflow · Limitations · Contributing to the Matrix

#### Python (70)

##### `async-python-patterns` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Python | 23/100 |

> Comprehensive guidance for implementing asynchronous Python applications using asyncio, concurrent programming patterns, and async/await for building high-performance, non-blocking systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

#### Testing (71)

##### `airflow-dag-patterns` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 24/100 |

> Build production Apache Airflow DAGs with best practices for operators, sensors, testing, and deployment. Use when creating data pipelines, orchestrating workflows, or scheduling batch jobs.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

##### `api-design-principles` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 23/100 |

> Master REST and GraphQL API design principles to build intuitive, scalable, and maintainable APIs that delight developers and stand the test of time.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `backtesting-frameworks` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 24/100 |

> Build robust, production-grade backtesting systems that avoid common pitfalls and produce reliable strategy performance estimates.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### AI / ML (287)

##### `ddd-strategic-design` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 22/100 |

> Design DDD strategic artifacts including subdomains, bounded contexts, and ubiquitous language for complex business domains.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Required artifacts · Examples · Limitations

##### `ddd-tactical-patterns` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 20/100 |

> Apply DDD tactical patterns in code using entities, value objects, aggregates, repositories, and domain events with explicit invariants.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Example · Limitations

##### `iconsax-library` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 22/100 |

> Extensive icon library and AI-driven icon generation skill for premium UI/UX design.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

##### `internal-comms-anthropic` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 21/100 |

> To write internal communications, use this skill for:

**File sections:** When to use this skill · How to use this skill · Keywords · Limitations

##### `lightning-factory-explainer` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 21/100 |

> Explain Bitcoin Lightning channel factories and the SuperScalar protocol — scalable Lightning onboarding using shared UTXOs, Decker-Wattenhofer trees, timeout-signature trees, MuSig2, and Taproot. No

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Key Topics · References

##### `magic-animator` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 21/100 |

> AI-powered animation tool for creating motion in logos, UI, icons, and social media assets.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

##### `vizcom` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 21/100 |

> AI-powered product design tool for transforming sketches into full-fidelity 3D renders.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

#### API (32)

##### `fal-platform` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 20/100 |

> Platform APIs for model management, pricing, and usage tracking

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### Backend (31)

##### `new-rails-project` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 20/100 |

> Create a new Rails project

**File sections:** When to Use · Limitations

##### `x402-express-wrapper` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 22/100 |

> Wrapper oficial de M2MCent (Node.js) para inyectar muros de pago x402 en APIs o servidores Model Context Protocol (MCP). Usar al construir nuevos servicios que requieran monetización máquina a máquina

**File sections:** When to Use · 📦 Instalación · 🛠️ Implementación · 🧠 Consideraciones Arquitectónicas (Agentic Context) · Limitations

#### Database (46)

##### `database-design` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Database | 20/100 |

> Database design principles and decision-making. Schema design, indexing strategy, ORM selection, serverless databases.

**File sections:** 🎯 Selective Reading Rule · ⚠️ Core Principle · Decision Checklist · Anti-Patterns · When to Use · Limitations

#### Frontend (81)

##### `antigravity-design-expert` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 20/100 |

> Core UI/UX engineering skill for building highly interactive, spatial, weightless, and glassmorphism-based web interfaces using GSAP and 3D CSS.

**File sections:** When to Use · ?? Role Overview · ??? Preferred Tech Stack · ?? Design Principles (The "Antigravity" Vibe) · ?? Motion & Animation Rules · ?? Execution Constraints

##### `magic-ui-generator` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 22/100 |

> Utilizes Magic by 21st.dev to generate, compare, and integrate multiple production-ready UI component variations.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

##### `remotion-best-practices` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 20/100 |

> Best practices for Remotion - Video creation in React

**File sections:** When to Use · How to use · Limitations

#### Git (30)

##### `git-pushing` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 22/100 |

> Stage all changes, create a conventional commit, and push to the remote branch. Use when explicitly asks to push changes (\"push this\", \"commit and push\"), mentions saving work to remote (\"save to

**File sections:** When to Use · Workflow · Limitations

#### Java / Kotlin (52)

##### `javascript-pro` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Java / Kotlin | 21/100 |

> Master modern JavaScript with ES6+, async patterns, and Node.js APIs. Handles promises, event loops, and browser/Node compatibility.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

#### JS / TS (64)

##### `typescript-pro` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | JS / TS | 21/100 |

> Master TypeScript with advanced types, generics, and strict type safety. Handles complex type systems, decorators, and enterprise-grade patterns.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Focus Areas · Approach · Output

#### Other (233)

##### `avalonia-zafiro-development` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 21/100 |

> Mandatory skills, conventions, and behavioral rules for Avalonia UI development using the Zafiro toolkit.

**File sections:** Core Pillars · Guides · Procedure Before Writing Code · When to Use · Limitations

##### `cqrs-implementation` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 22/100 |

> Implement Command Query Responsibility Segregation for scalable architectures. Use when separating read and write models, optimizing query performance, or building event-sourced systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `internal-comms` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 21/100 |

> Write internal communications such as status reports, leadership updates, 3P updates, newsletters, FAQs, incident reports, and project updates using repeatable internal formats.

**File sections:** When to use this skill · How to use this skill · Keywords · Limitations

##### `internal-comms-community` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 21/100 |

> To write internal communications, use this skill for:

**File sections:** When to use this skill · How to use this skill · Keywords · Limitations

##### `lightning-channel-factories` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 21/100 |

> Technical reference on Lightning Network channel factories, multi-party channels, LSP architectures, and Bitcoin Layer 2 scaling without soft forks. Covers Decker-Wattenhofer, timeout trees, MuSig2 ke

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Key Topics · References

##### `speed` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 22/100 |

> Launch RSVP speed reader for text

**File sections:** When to Use · Instructions · Arguments · Limitations

#### Rust (20)

##### `debugging-strategies` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 21/100 |

> Transform debugging from frustrating guesswork into systematic problem-solving with proven strategies, powerful tools, and methodical approaches.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Resources · Limitations

##### `lightning-architecture-review` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 21/100 |

> Review Bitcoin Lightning Network protocol designs, compare channel factory approaches, and analyze Layer 2 scaling tradeoffs. Covers trust models, on-chain footprint, consensus requirements, HTLC/PTLC

**File sections:** Use this skill when · Do not use this skill when · Instructions · Purpose · Key Topics · References

#### Security (111)

##### `fix-review` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 21/100 |

> Verify fix commits address audit findings without new bugs

**File sections:** Overview · When to Use This Skill · Instructions · Review Process · Best Practices · Resources

##### `threat-modeling-expert` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 22/100 |

> Expert in threat modeling methodologies, security architecture review, and risk assessment. Masters STRIDE, PASTA, attack trees, and security requirement extraction. Use PROACTIVELY for security archi

**File sections:** Capabilities · Use this skill when · Do not use this skill when · Instructions · Safety · Best Practices

#### API (32)

##### `conductor-manage` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | API | 18/100 |

> Manage track lifecycle: archive, restore, delete, rename, and cleanup

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### Backend (31)

##### `architecture-patterns` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Backend | 19/100 |

> Master proven backend architecture patterns including Clean Architecture, Hexagonal Architecture, and Domain-Driven Design to build maintainable, testable, and scalable systems.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Related Skills · Resources · Limitations

#### Docs (16)

##### `employment-contract-templates` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 18/100 |

> Templates and patterns for creating legally sound employment documentation including contracts, offer letters, and HR policies.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### Other (233)

##### `code-review-excellence` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 19/100 |

> Transform code reviews from gatekeeping to knowledge sharing through constructive feedback, systematic analysis, and collaborative improvement.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Output Format · Resources · Limitations

#### Security (111)

##### `wcag-audit-patterns` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Security | 19/100 |

> Comprehensive guide to auditing web content against WCAG 2.2 guidelines with actionable remediation strategies.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### Testing (71)

##### `e2e-testing-patterns` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 19/100 |

> Build reliable, fast, and maintainable end-to-end test suites that provide confidence to ship code quickly and catch regressions before users do.

**File sections:** Use this skill when · Do not use this skill when · Instructions · Safety · Resources · Limitations

#### AI / ML (287)

##### `design-spells` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 16/100 |

> Curated micro-interactions and design details that add "magic" and personality to websites and apps.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

#### Docs (16)

##### `wiki-qa` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Docs | 17/100 |

> Answer repository questions grounded entirely in source code evidence. Use when user asks a question about the codebase, user wants to understand a specific file, function, or component, or user asks

**File sections:** When to Use · Procedure · Response Format · Rules · Limitations

#### Other (233)

##### `unsplash-integration` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 16/100 |

> Integration skill for searching and fetching high-quality, free-to-use professional photography from Unsplash.

**File sections:** Context · When to Use · Execution Workflow · Strict Rules · Limitations

#### AI / ML (287)

##### `claude-ally-health` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> A health assistant skill for medical information analysis, symptom tracking, and wellness guidance.

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `claude-scientific-skills` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Scientific research and analysis skills

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `claude-speed-reader` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> -Speed read Claude's responses at 600+ WPM using RSVP with Spritz-style ORP highlighting

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `claude-win11-speckit-update-skill` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Windows 11 system management

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `fal-audio` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Text-to-speech and speech-to-text using fal.ai audio models

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `fal-generate` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Generate images and videos using fal.ai AI models

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `fal-image-edit` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> AI-powered image editing with style transfer and object removal

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `fal-upscale` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Upscale and enhance image and video resolution using AI

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `fal-workflow` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Generate workflow JSON files for chaining AI models

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `ffuf-claude-skill` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Web fuzzing with ffuf

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `nanobanana-ppt-skills` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> AI-powered PPT generation with document analysis and styled images

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `skill-seekers` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> -Automatically convert documentation websites, GitHub repositories, and PDFs into Claude AI skills in minutes.

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `superpowers-lab` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Lab environment for Claude superpowers

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `varlock-claude-skill` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Secure environment variable management ensuring secrets are never exposed in Claude sessions, terminals, logs, or git commits

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

##### `vexor` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 14/100 |

> Vector-powered CLI for semantic file search with a Claude/Codex skill

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### Cloud (49)

##### `aws-skills` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Cloud | 14/100 |

> AWS development with infrastructure automation and cloud architecture patterns

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### Design (29)

##### `nerdzao-elite-gemini-high` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Design | 13/100 |

> Modo Elite Coder + UX Pixel-Perfect otimizado especificamente para Gemini 3.1 Pro High. Workflow completo com foco em qualidade máxima e eficiência de tokens.

**File sections:** When to Use · Limitations

#### Frontend (81)

##### `ui-skills` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Frontend | 14/100 |

> Opinionated, evolving constraints to guide agents when building interfaces

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### Git (30)

##### `wiki-changelog` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 13/100 |

> Generate structured changelogs from git history. Use when user asks \"what changed recently\", \"generate a changelog\", \"summarize commits\" or user wants to understand recent development activity.

**File sections:** When to Use · Procedure · Constraints

#### Other (233)

##### `x-article-publisher-skill` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Other | 14/100 |

> Publish articles to X/Twitter

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### Rust (20)

##### `makepad-skills` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Rust | 14/100 |

> Makepad UI development skills for Rust apps: setup, patterns, shaders, packaging, and troubleshooting.

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### Testing (71)

##### `pypict-skill` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 14/100 |

> Pairwise test generation

**File sections:** Overview · When to Use This Skill · Instructions · Limitations

#### AI / ML (287)

##### `cc-skill-continuous-learning` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 10/100 |

> Development skill from everything-claude-code

**File sections:** When to Use · Limitations

##### `cc-skill-strategic-compact` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | AI / ML | 10/100 |

> Development skill from everything-claude-code

**File sections:** When to Use · Limitations

#### Git (30)

##### `create-pr` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Git | 10/100 |

> Alias for sentry-skills:pr-writer. Use when users explicitly ask for "create-pr" or reference the legacy skill name. Redirects to the canonical PR writing workflow.

**File sections:** When to Use · Limitations

#### Testing (71)

##### `nerdzao-elite` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ⭐ 39k | Testing | 11/100 |

> Senior Elite Software Engineer (15+) and Senior Product Designer. Full workflow with planning, architecture, TDD, clean code, and pixel-perfect UX validation.

**File sections:** When to Use · Limitations

---

## Finta Composite Skills — Sport & Holistic (12)

> **Source:** `finta` · **Tier:** community · **Category:** sport / holistic  
> These 12 composite workflow skills orchestrate multiple Finta agents together to handle complex, multi-domain tasks. Each skill reads the relevant agent files, applies their combined expertise in a structured workflow, and produces a complete, actionable output document. Quality: **88–90/100**.

---

### Sport Skills (8)

#### Football / Coaching (4)

##### `football-training-session` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 90/100 |

> Design a complete, periodisation-aligned football training session. Use when a coach asks to build a session, plan training for a specific objective (pressing, transitions, set pieces, physical load), or needs a structured session with warm-up, main block, game activity, and cool-down — grounded in skill acquisition science and biomechanical safety.

**Agents orchestrated:** `finta_coaching_philosophy-development` · `finta_coaching_physical-preparation` · `finta_coaching_skill-acquisition` · `finta_coaching_biomechanics`  
**File sections:** Required Inputs · Periodisation Check · Tactical Objective Framing · Session Architecture · Biomechanical Safety Layer · Session Document Assembly · Output Quality Standards

---

##### `player-development-plan` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 90/100 |

> Build a personalised, multi-domain player development plan for a football player. Use when a coach or player needs a structured development roadmap covering technical skills, physical qualities, psychological skills, and tactical understanding — with clear priorities, timelines, and measurable milestones.

**Agents orchestrated:** `finta_coaching_skill-acquisition` · `finta_coaching_biomechanics` · `finta_coaching_physical-preparation` · `finta_coaching_sport-neuroscience` · `finta_coaching_mental-preparation`  
**File sections:** Required Inputs · Player Profile Analysis · Technical Skill Gap Analysis · Cognitive-Perceptual Development · Psychological Skills Foundation · Plan Architecture

---

##### `match-preparation-protocol` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 90/100 |

> Build a complete match preparation protocol for a football team or player. Use when a coach needs a structured MD-2/MD-1/MD-0 preparation cycle covering tactical briefing, mental activation, physical readiness, set piece review, and pre-match routine — optimised for the specific opponent and context.

**Agents orchestrated:** `finta_coaching_decision-science` · `finta_coaching_complex-systems` · `finta_coaching_physical-preparation` · `finta_coaching_mental-preparation` · `finta_coaching_team-culture-leadership`  
**File sections:** Required Inputs · Opponent Analysis Frame · Tactical Preparation Plan · Physical Readiness Plan · Mental Preparation Protocol · Team Culture & Communication · Protocol Document

---

##### `coaching-philosophy-audit` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 90/100 |

> Audit, develop, or articulate a football coaching philosophy. Use when a coach wants to define their coaching identity, test the coherence of their values and methods, build a personal coaching model, or prepare a philosophy statement for a job application or club documentation.

**Agents orchestrated:** `finta_coaching_philosophy-development` · `finta_coaching_decision-science` · `finta_coaching_ethics-behavioral-economics` · `finta_coaching_team-culture-leadership`  
**File sections:** Required Inputs · Values Excavation · Beliefs–Behaviour Coherence Check · Ethical Foundations Audit · Culture & Relationships Framework · Philosophy Document Construction · Coherence Review

---

#### Multi-Sport (2)

##### `sport-performance-plan` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 90/100 |

> Build a periodised performance plan for any sport. Use when an athlete or coach needs a structured annual or seasonal training plan covering physical preparation, technical skill development, psychological periodisation, and technology-supported monitoring — adapted to the sport's competitive calendar.

**Agents orchestrated:** `finta_sport_physical-preparation` · `finta_sport_skill-acquisition` · `finta_sport_sport-neuroscience` · `finta_sport_mental-preparation` · `finta_sport_sport-technology`  
**File sections:** Required Inputs · Competitive Calendar Analysis · Physical Development Priorities · Technical Skill Plan · Perceptual-Cognitive Layer · Psychological Periodisation · Technology Stack · Seasonal Plan Document

---

##### `athlete-psychological-profile` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 90/100 |

> Build a comprehensive psychological performance profile for an athlete across any sport. Use when a sport psychologist, coach, or athlete needs a structured assessment of mental performance strengths and development areas — covering arousal regulation, attention, confidence, motivation, and resilience.

**Agents orchestrated:** `finta_sport_mental-preparation` · `finta_sport_sport-neuroscience` · `finta_sport_decision-science` · `finta_sport_complex-systems`  
**File sections:** Required Inputs · Psychological Performance Profile (6 domains) · Neuroscience Layer · Decision Making Under Pressure · Performance Environment Analysis · PST Development Plan

---

#### Cross-Domain (2)

##### `athlete-holistic-development` — ★★★★★ **90/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 92/100 |

> Build a holistic development plan that integrates sport performance with life skills, personal leadership, and long-term wellbeing for an athlete. Use when working with elite or semi-elite athletes who need to develop not only as performers but as complete people — covering dual-career planning and post-sport transition readiness.

**Agents orchestrated:** `finta_sport_physical-preparation` · `finta_sport_mental-preparation` · `finta_holistic_purpose-values` · `finta_holistic_emotional-intelligence` · `finta_holistic_personal-leadership` · `finta_holistic_career-development` · `finta_holistic_wellbeing-lifestyle`  
**File sections:** Required Inputs · Athletic Performance Foundations · Personal Identity & Values · EQ & Self-Regulation · Leadership & Influence · Dual-Career Planning · Wellbeing & Sustainable Performance · Integrated Development Plan · Post-Sport Readiness Assessment

---

##### `coaching-excellence-360` — ★★★★★ **90/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Sport | 92/100 |

> Run a comprehensive 360-degree coaching excellence audit for a football or multi-sport coach — spanning technical knowledge, decision quality, ethical practice, culture leadership, communication, personal wellbeing, and professional development. The most comprehensive finta skill.

**Agents orchestrated:** `finta_coaching_philosophy-development` · `finta_coaching_decision-science` · `finta_coaching_team-culture-leadership` · `finta_coaching_ethics-behavioral-economics` · `finta_holistic_communication-influence` · `finta_holistic_wellbeing-lifestyle` · `finta_holistic_professional-resilience`  
**File sections:** Required Inputs · Technical/Tactical Audit · Decision Quality Audit · Systems Thinking · Culture & Leadership Audit · Ethical Practice · Communication & Influence · Coach Wellbeing & Resilience · 360° Report (domain ratings + honest summary)

---

### Holistic Skills (4)

##### `professional-development-roadmap` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Holistic | 90/100 |

> Build a comprehensive professional development roadmap for a career-focused professional. Use when someone needs a structured 12-month development plan covering career strategy, skill acquisition, leadership growth, productivity design, and learning architecture — grounded in evidence-based frameworks and aligned with values and goals.

**Agents orchestrated:** `finta_holistic_career-development` · `finta_holistic_learning-mindset` · `finta_holistic_personal-leadership` · `finta_holistic_productivity-performance` · `finta_holistic_communication-influence`  
**File sections:** Required Inputs · Career Capital Assessment · Values Alignment Check · Learning Architecture · Leadership & Communication Plan · Productivity Architecture · Roadmap Document (SMART goals + quarterly milestones)

---

##### `burnout-recovery-protocol` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Holistic | 90/100 |

> Assess burnout severity and build a structured recovery protocol. Use when a professional shows signs of burnout, has explicitly identified burnout, or is returning to work after burnout leave — combining Maslach's clinical framework, ACT-based resilience, behavioural change science, and wellbeing lifestyle design.

**Agents orchestrated:** `finta_holistic_wellbeing-lifestyle` · `finta_holistic_professional-resilience` · `finta_holistic_behavioral-change` · `finta_holistic_purpose-values`  
**File sections:** Required Inputs · Burnout Severity Assessment (3 dimensions) · Six-Factor Causal Analysis · Values & Meaning Re-Orientation · Behavioural Recovery Architecture · Phased Recovery Plan · Sustainability & Relapse Prevention

---

##### `purpose-career-alignment` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Holistic | 90/100 |

> Guide a professional through a structured purpose discovery and career alignment process. Use when someone feels their career lacks meaning, is considering a major career change, wants to reconnect with why they work, or needs to align their professional trajectory with their authentic values and life goals.

**Agents orchestrated:** `finta_holistic_purpose-values` · `finta_holistic_career-development` · `finta_holistic_personal-leadership` · `finta_holistic_emotional-intelligence`  
**File sections:** Required Inputs · Values Excavation · Current Alignment Audit · Identity & Self-Concept · Emotional Processing · Ikigai Mapping · Three Career Design Options · 90-Day Action Architecture

---

##### `peak-performance-lifestyle` — ★★★★☆ **88/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | finta | ⭐ 0 | Holistic | 90/100 |

> Design a complete high-performance personal operating system. Use when a professional wants to maximise their cognitive output, build deep work capacity, optimise their energy and recovery, and create a lifestyle architecture that sustains elite professional performance without sacrificing health, relationships, or long-term wellbeing.

**Agents orchestrated:** `finta_holistic_productivity-performance` · `finta_holistic_learning-mindset` · `finta_holistic_wellbeing-lifestyle` · `finta_holistic_behavioral-change`  
**File sections:** Required Inputs · Energy Profile Mapping · Deep Work Architecture · Learning System Integration · Behavioral Architecture · Weekly Architecture Design · 4-Week Implementation Ramp
