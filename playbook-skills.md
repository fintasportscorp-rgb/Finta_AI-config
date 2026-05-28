# Agent Configuration Playbook — Skills Reference Guide

> **Purpose:** Complete reference for Claude Code skills (reusable instruction sets). Import this document into NotebookLM alongside playbook-agents.md and playbook-commands.md.

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
