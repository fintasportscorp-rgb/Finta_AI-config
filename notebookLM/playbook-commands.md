# Agent Configuration Playbook — Commands Reference Guide

> **Purpose:** Complete reference for Claude Code slash commands. Import this document into NotebookLM alongside playbook-agents.md and playbook-skills.md and `scoring-methodology.md`.

> **Notebook guide:** See [`system-prompt.md`](./system-prompt.md) to configure your NotebookLM for project-specific recommendations.
>
> **Scoring methodology:** See [`scoring-methodology.md`](./scoring-methodology.md) for the complete formula, sub-score breakdowns, distribution stats, and known limitations.

---

## 1. What Are Slash Commands?

Slash commands are **workflow automation triggers** invoked with `/command-name` syntax in Claude Code (and compatible AI tools). Unlike skills (reusable behaviors) or agents (full personas), commands represent **complete, multi-step workflows** that execute a defined sequence of actions.

### Anatomy of a Slash Command
```markdown
# /command-name

## Description
One-line description of what this command does.

## Arguments
- `$ARGUMENTS` — description of optional arguments

## Workflow

### Step 1 — [Action]
[Instructions for step 1]

### Step 2 — [Action]
[Instructions for step 2]

## Output
[What the command produces]
```

### Where Commands Are Stored
- Claude Code: `.claude/commands/` (markdown files, one per command)
- Custom commands can use `$ARGUMENTS` to accept user input at invocation time

---

## 2. Command Inventory by Category

### 2.1 Git & Version Control Commands

**`/commit`** — Create a structured git commit
- Analyzes staged changes
- Generates Conventional Commits message
- Groups related changes with appropriate type prefix
- Usage: `/commit` or `/commit feat: add user auth`

**`/pr`** — Create a pull request description
- Analyzes branch diff vs main
- Generates: title, summary, changes, testing checklist
- Usage: `/pr` (auto-detects branch and diff)

**`/pr-review`** — Review an open pull request
- Reads the PR diff
- Applies code quality, security, and logic checks
- Outputs: inline comments ready to paste + summary
- Usage: `/pr-review #123` or `/pr-review` (current branch)

**`/changelog`** — Generate a changelog entry
- Reads commits since last tag
- Formats in Keep-a-Changelog standard
- Usage: `/changelog` or `/changelog v1.2.0..v1.3.0`

**`/release`** — Prepare a full release
- Bumps version (semver), updates changelog, creates tag message
- Usage: `/release patch` / `/release minor` / `/release major`

**`/hotfix`** — Emergency fix workflow
- Creates hotfix branch from main
- Applies minimal fix
- Prepares immediate PR
- Usage: `/hotfix description-of-fix`

**`/squash`** — Summarize and squash commits
- Groups related commits into clean history
- Generates descriptive squash commit message
- Usage: `/squash` (interactive on current branch commits)

### 2.2 Code Review & Quality Commands

**`/review`** — Comprehensive code review
- Checks: correctness, security, performance, style, tests
- Severity: critical / major / minor / suggestion
- Usage: `/review` (current file) or `/review src/auth/`

**`/security`** — Security-focused review
- OWASP Top 10 checklist
- Dependency vulnerability scan
- Secret detection
- Usage: `/security` or `/security src/api/`

**`/refactor`** — Code refactoring assistant
- Identifies refactoring opportunities
- Applies: extract function, simplify conditions, remove duplication
- Usage: `/refactor` (current file) or `/refactor --type extract-function`

**`/lint-fix`** — Auto-fix linting issues
- Runs linter analysis
- Applies safe auto-fixes
- Reports manually-fixable issues
- Usage: `/lint-fix` or `/lint-fix src/`

**`/dead-code`** — Find unused code
- Identifies: unused exports, unreachable code, stale imports
- Usage: `/dead-code` (scans entire project)

**`/coverage`** — Analyze test coverage
- Identifies: uncovered paths, missing edge cases
- Generates: suggested test cases for gaps
- Usage: `/coverage` or `/coverage src/auth/`

**`/complexity`** — Code complexity analysis
- Cyclomatic complexity, cognitive complexity
- Flags: functions above threshold (default: 10)
- Usage: `/complexity` or `/complexity --threshold 15`

### 2.3 Documentation Commands

**`/docs`** — Generate or update documentation
- Reads: source files, existing docs
- Generates: JSDoc/docstring, README updates, API reference
- Usage: `/docs src/api/users.ts` or `/docs --type readme`

**`/explain`** — Explain complex code
- Provides: plain language explanation, flow diagram, examples
- Usage: `/explain src/auth/jwt.ts` or `/explain [selected code]`

**`/diagram`** — Generate architecture diagrams
- Output: Mermaid diagram (flowchart, sequence, class, ER)
- Usage: `/diagram --type flowchart src/` or `/diagram sequence`

**`/glossary`** — Build project glossary
- Extracts: domain terms from code and docs
- Generates: structured glossary with definitions
- Usage: `/glossary` or `/glossary --update`

**`/onboard`** — Generate onboarding guide for new developers
- Covers: project structure, key workflows, local setup
- Output: docs/onboarding.md
- Usage: `/onboard`

### 2.4 Testing Commands

**`/test`** — Generate tests for current file
- Creates: unit tests, mocks, edge cases
- Framework: auto-detected (Jest, Vitest, pytest, etc.)
- Usage: `/test src/auth/service.ts` or `/test --type integration`

**`/test-plan`** — Create a test plan for a feature
- Covers: unit, integration, e2e scenarios
- Output: structured test plan with acceptance criteria
- Usage: `/test-plan feature/user-auth`

**`/mock`** — Generate mock data and fixtures
- Creates: realistic test data, factory functions
- Usage: `/mock User 10` (10 user fixtures)

**`/e2e`** — Generate end-to-end test scenarios
- Frameworks: Playwright, Cypress
- Covers: critical user journeys
- Usage: `/e2e login-flow` or `/e2e --framework playwright`

**`/snapshot`** — Create or update test snapshots
- Reviews: existing snapshot drift
- Generates: new snapshot assertions
- Usage: `/snapshot` or `/snapshot --update`

### 2.5 Debugging Commands

**`/debug`** — Systematic debugging assistant
- Process: reproduce → isolate → hypothesize → verify → fix
- Analyzes: error messages, stack traces, log patterns
- Usage: `/debug "TypeError: Cannot read property of undefined"`

**`/trace`** — Trace execution flow
- Maps: function call chain for a given entry point
- Identifies: unexpected branches, missing error handling
- Usage: `/trace src/api/routes.ts:handleRequest`

**`/perf`** — Performance investigation
- Identifies: slow paths, unnecessary renders, N+1 queries
- Output: bottleneck report with optimization suggestions
- Usage: `/perf` or `/perf src/database/queries.ts`

**`/memory`** — Memory leak detection
- Analyzes: object retention, closure captures, event listener leaks
- Usage: `/memory src/components/`

**`/logs`** — Log analysis and pattern detection
- Identifies: error patterns, anomalies, correlation
- Usage: `/logs error.log` or pipe: `cat error.log | /logs`

### 2.6 Architecture Commands

**`/architect`** — System design consultation
- Input: feature requirement or problem statement
- Output: component design, data model, API contract, trade-offs
- Usage: `/architect "add real-time notifications"`

**`/adr`** — Create an Architecture Decision Record
- Format: MADR (Markdown Architecture Decision Records)
- Usage: `/adr "Use PostgreSQL over MongoDB for user data"`

**`/migrate`** — Plan a code migration
- Covers: incremental migration strategy, rollback plan, testing strategy
- Usage: `/migrate "React 17 to React 19"` or `/migrate --from enzyme --to testing-library`

**`/api-design`** — Design a new API endpoint or interface
- Covers: naming, versioning, request/response schema, error handling
- Usage: `/api-design "user profile update endpoint"`

**`/scale`** — Scalability analysis and recommendations
- Analyzes: current architecture, load patterns
- Output: scaling roadmap with specific recommendations
- Usage: `/scale` or `/scale --target "10x traffic"`

### 2.7 AI & Agent Commands

**`/agent`** — Invoke a specific agent
- Usage: `/agent security-auditor` or `/agent react-expert review this component`

**`/orchestrate`** — Launch multi-agent workflow
- Coordinates multiple specialists on a complex task
- Usage: `/orchestrate "full security audit" --agents security-auditor,code-reviewer,dependency-audit`

**`/prompt`** — Optimize an AI prompt
- Applies: prompt engineering best practices
- Usage: `/prompt "improve this system prompt: [prompt]"`

**`/eval`** — Evaluate AI output quality
- Checks: accuracy, hallucination, format adherence
- Usage: `/eval [ai-generated-content]`

### 2.8 Project Management Commands

**`/task`** — Break down a feature into tasks
- Creates: ordered task list with effort estimates
- Usage: `/task "implement user authentication"`

**`/standup`** — Generate standup report
- Reads: recent git activity, open issues
- Output: Yesterday / Today / Blockers format
- Usage: `/standup`

**`/estimate`** — Story point / time estimation
- Analyzes: task complexity, dependencies, scope
- Output: confidence interval estimate with rationale
- Usage: `/estimate "add OAuth integration"`

**`/risk`** — Risk assessment for a change
- Identifies: technical risk, business risk, security risk
- Output: risk matrix with mitigation strategies
- Usage: `/risk src/payments/` or `/risk "deploy to production Friday"`

---

## 3. Power User Patterns

### 3.1 Pre-PR Ritual
Run before every pull request:
```
1. /review          → Quality check
2. /security        → Security scan
3. /coverage        → Test gaps
4. /pr              → PR description
```

### 3.2 Feature Sprint Workflow
```
Planning:   /architect → /task → /estimate
Building:   /test (TDD) → build → /review
Shipping:   /security → /docs → /pr → /changelog
```

### 3.3 Debugging Session
```
1. /debug [error]   → Initial analysis
2. /trace [file]    → Execution flow
3. /logs [file]     → Log patterns
4. /test            → Regression prevention
```

### 3.4 Weekly Maintenance
```
/dead-code          → Remove unused code
/complexity         → Flag complex functions
/coverage           → Test gap report
/perf               → Performance review
```

### 3.5 Release Process
```
/coverage           → Verify test coverage
/security           → Final security scan
/changelog          → Prepare changelog
/release [type]     → Bump version and tag
/docs               → Update documentation
```

---

## 4. Writing Effective Custom Commands

### Template Structure
```markdown
# /your-command

## When to Use
[Describe the exact situation where this command is valuable]

## Prerequisites
- [Required context or files that must exist]
- [Required tools or permissions]

## Workflow

### Step 1 — Analyze
Read and analyze: $ARGUMENTS or [specific files]
Look for: [specific patterns, issues, or information]

### Step 2 — Process
[Core logic of the command]

### Step 3 — Output
Generate [output format] containing:
- [Required output element 1]
- [Required output element 2]

## Success Criteria
The command is complete when:
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Common Failures
- **[Failure scenario]**: [How to handle it]
```

### Best Practices
1. **One responsibility** — Commands that do one thing well are reusable across projects
2. **Explicit success criteria** — Define done so the AI knows when to stop
3. **Error handling** — Include what to do when inputs are missing or invalid
4. **$ARGUMENTS** — Use this variable to make commands flexible
5. **Output format** — Always specify the format (markdown table, numbered list, code block, etc.)
6. **Idempotent** — Running the command twice should be safe

### Anti-Patterns
- **Too vague**: `/review "make it better"` — no success criteria
- **Too coupled**: Commands that require specific file structures
- **No error handling**: Commands that fail silently
- **Too long**: Commands that try to do everything

---

## 5. Command vs Skill vs Agent: Decision Guide

| Situation | Tool | Example |
|-----------|------|---------|
| Always-on behavior | Rule | Enforce no `console.log` in production |
| Expert role for session | Agent | Security Auditor persona |
| Repeatable single-operation | Skill | Generate a commit message |
| Multi-step workflow | **Command** | `/release` = version + changelog + tag |
| One-off task | Inline prompt | Ask a question |

### Command Sweet Spot
Commands shine when:
- The workflow has **3+ steps** that always run in sequence
- You invoke this workflow **multiple times per week**
- The workflow benefits from **arguments** (e.g., `/test src/auth/`)
- You want **team consistency** (everyone runs the same process)

---

## 6. Command Sources in the Catalog

### Available Sources
| Source | Focus | Notable Commands |
|--------|-------|-----------------|
| **hesreallyhim** | Git workflow, commits | `/commit`, `/pr`, `/changelog` |
| **wshobson** | Code quality | `/review`, `/refactor`, `/security` |
| **pedrohcgs** | Testing | `/test`, `/mock`, `/e2e` |
| **agenticbuddy** | Debugging | `/debug`, `/trace`, `/logs` |
| **AgriciDaniel** | Documentation | `/docs`, `/explain`, `/diagram` |
| **centminmod** | Performance | `/perf`, `/complexity`, `/scale` |
| **elizabethfuentes12** | AI workflows | `/orchestrate`, `/eval`, `/prompt` |
| **vijaythecoder** | Project management | `/task`, `/estimate`, `/standup` |

### Most Downloaded Commands
1. `/commit` — Used daily in most projects
2. `/review` — Pre-PR quality gate
3. `/test` — TDD workflow support
4. `/debug` — Systematic debugging
5. `/pr` — PR description automation
6. `/security` — Security review
7. `/docs` — Documentation generation
8. `/architect` — Design assistance

---

## 7. Integration with CI/CD

### Pre-commit Hook Integration
```bash
# .git/hooks/pre-commit
# Run Claude Code security scan before allowing commit
claude --command "/security --fast" || exit 1
```

### PR Bot Integration
```yaml
# .github/workflows/ai-review.yml
- name: AI Code Review
  run: claude --command "/review --output github-annotations"
```

### Scheduled Maintenance
```yaml
# Weekly code health check
- cron: "0 9 * * 1"  # Every Monday 9am
  run: claude --command "/dead-code && /complexity && /coverage"
```

---

## 8. Commands Quick Reference Card

| Command | Category | What It Does |
|---------|----------|--------------|
| `/commit` | Git | Conventional commit message |
| `/pr` | Git | Pull request description |
| `/pr-review` | Git | Review open PR |
| `/changelog` | Git | Generate changelog entry |
| `/release` | Git | Full release preparation |
| `/review` | Quality | Comprehensive code review |
| `/security` | Quality | OWASP security scan |
| `/refactor` | Quality | Identify refactoring opportunities |
| `/coverage` | Quality | Test coverage gaps |
| `/complexity` | Quality | Code complexity analysis |
| `/docs` | Documentation | Generate documentation |
| `/explain` | Documentation | Plain-language explanation |
| `/diagram` | Documentation | Architecture diagrams |
| `/test` | Testing | Generate unit tests |
| `/mock` | Testing | Create test fixtures |
| `/e2e` | Testing | End-to-end test scenarios |
| `/debug` | Debugging | Systematic debugging |
| `/perf` | Debugging | Performance investigation |
| `/architect` | Architecture | System design consultation |
| `/adr` | Architecture | Architecture Decision Record |
| `/migrate` | Architecture | Migration planning |
| `/task` | Management | Feature breakdown |
| `/estimate` | Management | Effort estimation |
| `/risk` | Management | Risk assessment |

---

*Generated by Finta AI Configuration Wizard — config.fintalab.com*
*For agents reference: see playbook-agents.md | For skills reference: see playbook-skills.md*

---

## Source / Provider Index — Commands

| Source | Count | Avg Quality | Tier | Stars | GitHub |
|--------|-------|-------------|------|-------|--------|
| **wshobson** | 57 | ★★★★☆ 72/100 | curated | ⭐ 36k | [wshobson/agents](https://github.com/wshobson/agents) |
| **hesreallyhim** | 26 | ★★☆☆☆ 42/100 | community | ⭐ 1.3k | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) |
| **AgriciDaniel** | 8 | ★☆☆☆☆ 23/100 | community | ⭐ 12 | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) |
| **centminmod** | 14 | ★★☆☆☆ 42/100 | community | ⭐ 6 | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) |
| **pedrohcgs** | 17 | ★★☆☆☆ 36/100 | community | ⭐ 5 | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) |
| **elizabethfuentes12** | 1 | ★★☆☆☆ 49/100 | community | ⭐ 2 | elizabethfuentes12 |
| **agenticbuddy** | 5 | ★★☆☆☆ 44/100 | community | ⭐ — | [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands) |

### Repository Details

#### wshobson
- **Repo:** [wshobson/agents](https://github.com/wshobson/agents)
- **Description:** Multi-harness agentic plugin marketplace for Claude Code, Codex CLI, Cursor, OpenCode, and Gemini CLI
- **Stars:** ⭐ 36k | **Forks:** 3,914 | **Open issues:** 3
- **Language:** Python | **License:** MIT
- **Last push:** 2026-05-26 | **Tier:** curated
- **Topics:** agents, anthropic, automation, workflows, orchestration, agent-skills, agentic-ai, ai-agents
- **Commands count:** 57 | **Average quality:** ★★★★☆ 72/100

#### hesreallyhim
- **Repo:** [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents)
- **Description:** A list of Claude Code Sub-Agents submitted by the community.
- **Stars:** ⭐ 1.3k | **Forks:** 134 | **Open issues:** 10
- **Language:** None | **License:** —
- **Last push:** 2025-11-10 | **Tier:** community
- **Commands count:** 26 | **Average quality:** ★★☆☆☆ 42/100

#### AgriciDaniel
- **Repo:** [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music)
- **Description:** AI music production skill for Claude Code — powered by ACE-Step 1.5. Generate songs, covers, remixes, and more from your terminal.
- **Stars:** ⭐ 12 | **Forks:** 3 | **Open issues:** 0
- **Language:** Python | **License:** NOASSERTION
- **Last push:** 2026-04-17 | **Tier:** community
- **Commands count:** 8 | **Average quality:** ★☆☆☆☆ 23/100

#### centminmod
- **Repo:** [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins)
- **Description:** Personal Claude Code plugin marketplace — session-metrics, more to come.
- **Stars:** ⭐ 6 | **Forks:** 0 | **Open issues:** 0
- **Language:** Python | **License:** NOASSERTION
- **Last push:** 2026-05-03 | **Tier:** community
- **Topics:** claude-ai, claude-code, claude-code-plugin, claudeai, claudecode, claudecode-plugin
- **Commands count:** 14 | **Average quality:** ★★☆☆☆ 42/100

#### pedrohcgs
- **Repo:** [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini)
- **Description:** 4-hour Notre Dame faculty seminar on agentic AI for academic research — Quarto slides + curated demo bundle. Companion to claude-code-my-workflow.
- **Stars:** ⭐ 5 | **Forks:** 3 | **Open issues:** 0
- **Language:** HTML | **License:** MIT
- **Last push:** 2026-05-01 | **Tier:** community
- **Commands count:** 17 | **Average quality:** ★★☆☆☆ 36/100

#### agenticbuddy
- **Repo:** [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands)
- **Description:** None
- **Stars:** ⭐ — | **Forks:** 0 | **Open issues:** 0
- **Language:** PowerShell | **License:** MIT
- **Last push:** 2025-08-28 | **Tier:** community
- **Commands count:** 5 | **Average quality:** ★★☆☆☆ 44/100


---

## Complete Commands Catalog — All 128 Items

> Sorted by: tier (official → curated → community), then quality score (high → low)

Score formula: `quality = (stars_score × 35%) + (content_score × 40%) + (tier_score × 25%)`


---

### CURATED — 57 commands

#### Docs (3)

##### `/code-explain` — ★★★★★ **93/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Docs | 100/100 |

> Code Explanation and Analysis

**File sections:** Context · Requirements · Instructions · What This Code Does · Understanding Decorators · Understanding Generators

##### `/doc-generate` — ★★★★★ **93/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Docs | 100/100 |

> Automated Documentation Generation

**File sections:** Context · Requirements · Instructions · Installation · Quick Start · Authentication

#### Other (7)

##### `/deps-upgrade` — ★★★★★ **93/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 99/100 |

> Dependency Upgrade Strategy

**File sections:** Context · Requirements · Instructions · Overview · Pre-Migration Checklist · Migration Steps

#### Security (3)

##### `/security-scan` — ★★★★★ **93/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Security | 100/100 |

> Security Scan and Vulnerability Assessment

**File sections:** Context · Requirements · Instructions · Summary · Risk Assessment · Immediate Actions Required

#### Docs (3)

##### `/docker-optimize` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Docs | 89/100 |

> Docker Optimization

**File sections:** Context · Requirements · Instructions · Dockerfile Best Practices Checklist · Output Format · Cross-Command Integration

#### Frontend (2)

##### `/slo-implement` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Frontend | 88/100 |

> SLO Implementation Guide

**File sections:** Context · Requirements · Instructions · Agenda (30 minutes) · Review Checklist · Output Template

#### Git (14)

##### `/pr-enhance` — ★★★★☆ **89/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 90/100 |

> Pull Request Enhancement

**File sections:** Context · Requirements · Instructions · Summary · What Changed · Why These Changes

#### Database (2)

##### `/db-migrate` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Database | 84/100 |

> Database Migration Strategy and Implementation

**File sections:** Context · Requirements · Instructions · Output Format · Cross-Command Integration

#### DevOps (5)

##### `/k8s-manifest` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 85/100 |

> Kubernetes Manifest Generation

**File sections:** Context · Requirements · Instructions · Output Format · Cross-Command Integration

#### Other (7)

##### `/compliance-check` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 84/100 |

> Regulatory Compliance Check

**File sections:** Context · Requirements · Instructions · 1. Data Controller · 2. Data We Collect · 3. Legal Basis for Processing

##### `/tech-debt` — ★★★★☆ **87/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 85/100 |

> Technical Debt Analysis and Remediation

**File sections:** Context · Requirements · Instructions · Executive Summary · Key Risks · Proposed Actions

#### AI / ML (3)

##### `/ai-assistant` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | AI / ML | 81/100 |

> AI Assistant Development

**File sections:** Context · Requirements · Instructions · Output Format

#### API (3)

##### `/api-mock` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | API | 81/100 |

> API Mocking Framework

**File sections:** Context · Requirements · Instructions · Overview · Available Endpoints · Scenarios

#### Debug (4)

##### `/debug-trace` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Debug | 81/100 |

> Debug and Trace Configuration

**File sections:** Context · Requirements · Instructions · Output Format

#### Workflow (1)

##### `/workflow-automate` — ★★★★☆ **86/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Workflow | 81/100 |

> Workflow Automation

**File sections:** Context · Requirements · Instructions · Output Format

#### Git (14)

##### `/test-harness` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 80/100 |

> Comprehensive Test Harness Generator

**File sections:** Context · Requirements · Instructions · Cross-Command Integration · Validation Checklist

#### Other (7)

##### `/config-validate` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 80/100 |

> Configuration Validation

**File sections:** Context · Requirements · Instructions · Output Format

#### Security (3)

##### `/deps-audit` — ★★★★☆ **85/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Security | 78/100 |

> Dependency Audit and Security Analysis

**File sections:** Context · Requirements · Instructions · License Compliance Report · 🔒 Dependency Security Update · Output Format

#### API (3)

##### `/api-scaffold` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | API | 75/100 |

> API Scaffold Generator

**File sections:** Context · Requirements · Instructions · Cross-Command Integration · Validation Checklist

#### Testing (7)

##### `/accessibility-audit` — ★★★★☆ **83/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 75/100 |

> Accessibility Audit and Testing

**File sections:** Context · Requirements · Instructions · Manual Accessibility Testing Checklist · Output Format

#### Database (2)

##### `/code-migrate` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Database | 71/100 |

> Code Migration Assistant

**File sections:** Context · Requirements · Instructions · Output Format

#### Perf (1)

##### `/cost-optimize` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Perf | 71/100 |

> Cloud Cost Optimization

**File sections:** Context · Requirements · Instructions · Output Format

#### Debug (4)

##### `/error-trace` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Debug | 70/100 |

> Error Tracking and Monitoring

**File sections:** Context · Requirements · Instructions · Output Format

#### Other (7)

##### `/monitor-setup` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 70/100 |

> Monitoring and Observability Setup

**File sections:** Context · Requirements · Instructions · Output Format

#### Quality (2)

##### `/refactor-clean` — ★★★★☆ **81/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Quality | 69/100 |

> Refactor and Clean Code

**File sections:** Context · Requirements · Instructions · Severity Levels · Output Format

#### Git (14)

##### `/tdd-cycle` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 59/100 |

> Execute a comprehensive Test-Driven Development (TDD) workflow with strict red-green-refactor discipline:

**File sections:** Configuration · Phase 1: Test Specification and Design · Phase 2: RED - Write Failing Tests · Phase 3: GREEN - Make Tests Pass · Phase 4: REFACTOR - Improve Code Quality · Phase 5: Integration and System Tests

##### `/tdd-refactor` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 40/100 |

> Refactor code with confidence using comprehensive test safety net:

**File sections:** Refactoring Process · Refactoring Safety Checklist · Recovery Process · Integration Points · Best Practices

##### `/full-review` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 28/100 |

> Perform a comprehensive review using multiple specialized agents with explicit Task tool invocations:

**File sections:** Review Configuration · 1. Code Quality Review · 2. Security Audit · 3. Architecture Review · 4. Performance Analysis · 5. Test Coverage Assessment

##### `/tdd-red` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 28/100 |

> Write comprehensive failing tests following TDD red phase principles:

**File sections:** Test Generation Process · Validation Steps · Recovery Process · Integration Points · Best Practices

#### Testing (7)

##### `/performance-optimization` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 29/100 |

> Optimize application performance end-to-end using specialized performance and optimization agents:

**File sections:** Phase 1: Performance Analysis · Phase 2: Backend Optimization · Phase 3: Frontend Optimization · Phase 4: Infrastructure Optimization · Phase 5: Monitoring and Validation · Coordination Notes

##### `/smart-debug` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 30/100 |

> Debug complex issues using specialized debugging agents:

**File sections:** Debugging Approach · Debug Output Structure

##### `/tdd-green` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 30/100 |

> Implement minimal code to make failing tests pass in TDD green phase:

**File sections:** Implementation Process · Post-Implementation Checks · Recovery Process · Integration Points · Best Practices

#### Git (14)

##### `/incident-response` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 25/100 |

> Respond to production incidents with coordinated agent expertise for rapid resolution:

**File sections:** Phase 1: Immediate Response · Phase 2: Root Cause Analysis · Phase 3: Resolution Implementation · Phase 4: Stabilization and Prevention · Phase 5: Post-Incident Activities · Coordination Notes

#### Other (7)

##### `/standup-notes` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 24/100 |

> Standup Notes Generator

**File sections:** Usage · Prerequisites · Process · Implementation Steps · Context Extraction Patterns

#### Testing (7)

##### `/data-driven-feature` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 23/100 |

> Build data-driven features with integrated pipelines and ML capabilities using specialized agents:

**File sections:** Phase 1: Data Analysis and Design · Phase 2: Backend Integration · Phase 3: ML and AI Implementation · Phase 4: Implementation and Optimization · Phase 5: Testing and Deployment · Coordination Notes

##### `/multi-agent-optimize` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 22/100 |

> Optimize application stack using specialized optimization agents:

**File sections:** Optimization Strategy · Consolidated Optimization Plan

#### AI / ML (3)

##### `/full-stack-feature` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | AI / ML | 19/100 |

> Implement a full-stack feature across multiple platforms with coordinated agent orchestration:

**File sections:** Phase 1: Architecture and API Design · Phase 2: Implementation · Phase 3: Quality Assurance · Phase 4: Optimization and Deployment · Coordination Notes

#### Debug (4)

##### `/smart-fix` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Debug | 19/100 |

> Intelligently fix the issue using automatic agent selection with explicit Task tool invocations:

**File sections:** Analysis Phase · Agent Selection and Execution · Multi-Domain Coordination

#### Git (14)

##### `/context-restore` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 19/100 |

> Restore saved project context for agent coordination:

**File sections:** Context Restoration Process · Context Integration · Usage Scenarios · Additional Options

##### `/improve-agent` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 18/100 |

> Improve an existing agent based on recent performance:

**File sections:** —

#### Security (3)

##### `/security-hardening` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Security | 20/100 |

> Implement security-first architecture and hardening measures with coordinated agent orchestration:

**File sections:** Phase 1: Security Assessment · Phase 2: Security Implementation · Phase 3: Compliance and Testing · Phase 4: Deployment and Monitoring · Coordination Notes

#### DevOps (5)

##### `/data-validation` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 16/100 |

> Data Validation Pipeline

**File sections:** —

#### Git (14)

##### `/context-save` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 17/100 |

> Save current project context for future agent coordination:

**File sections:** Context Capture Process · Context Storage · Usage Scenarios

#### Testing (7)

##### `/feature-development` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 16/100 |

> Implement a new feature using specialized agents with explicit Task tool invocations:

**File sections:** Development Mode Selection · Traditional Development Steps · TDD Development Steps · Execution Parameters

#### API (3)

##### `/langchain-agent` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | API | 12/100 |

> LangChain/LangGraph Agent Scaffold

**File sections:** —

#### DevOps (5)

##### `/data-pipeline` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 12/100 |

> Data Pipeline Architecture

**File sections:** —

#### Git (14)

##### `/multi-agent-review` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 11/100 |

> Perform comprehensive multi-agent code review with specialized reviewers:

**File sections:** Review Process · Consolidated Review Output

##### `/prompt-optimize` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 11/100 |

> AI Prompt Optimization

**File sections:** —

#### Quality (2)

##### `/ai-review` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Quality | 12/100 |

> AI/ML Code Review

**File sections:** —

#### Debug (4)

##### `/error-analysis` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Debug | 6/100 |

> Error Analysis and Resolution

**File sections:** —

#### DevOps (5)

##### `/deploy-checklist` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 7/100 |

> Deployment Checklist and Configuration

**File sections:** —

##### `/ml-pipeline` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 4/100 |

> Machine Learning Pipeline

**File sections:** —

#### Git (14)

##### `/issue` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 4/100 |

> Please analyze and fix the GitHub issue: $ARGUMENTS.

**File sections:** —

#### Other (7)

##### `/onboard` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Other | 4/100 |

> Onboard

**File sections:** Instructions

#### AI / ML (3)

##### `/legacy-modernize` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | AI / ML | 1/100 |

> Modernize legacy code using expert agents:

**File sections:** —

#### Frontend (2)

##### `/multi-platform` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Frontend | 1/100 |

> Build the same feature across multiple platforms:

**File sections:** —

#### Git (14)

##### `/git-workflow` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Git | 1/100 |

> Complete Git workflow using specialized agents:

**File sections:** —


---

### COMMUNITY — 71 commands

#### Git (37)

##### `/convert-to-todowrite-tasklist-prompt` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 100/100 |

> Convert Complex Prompts to TodoWrite Tasklist Method

**File sections:** CONVERSION EXECUTION · Argument Variable Integration · ARGUMENT HANDLING · Conversion Analysis Framework · TodoWrite Structure for Parallel Execution · CONDITIONAL EXECUTION LOGIC

#### Other (8)

##### `/create-release-note` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Other | 100/100 |

> Release Note Generator

**File sections:** Interactive Workflow · Mode 1: By Commit Count · Mode 2: By Commit Hash Range · Core Requirements · Section 1: Release Note (Customer-Facing) · Release Note (Customer-Facing)

#### Quality (5)

##### `/refactor-code` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Quality | 100/100 |

> Refactoring Analysis Command

**File sections:** YOUR TASK · REFACTORING ANALYSIS FRAMEWORK · PHASE 0: CODEBASE-WIDE DISCOVERY (Optional) · PHASE 1: PROJECT DISCOVERY & CONTEXT · PHASE 2: TEST COVERAGE ANALYSIS · PHASE 3: COMPLEXITY ANALYSIS

#### Git (37)

##### `/secure-prompts` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 98/100 |

> ENTERPRISE PROMPT INJECTION SECURITY ANALYZER

**File sections:** **LAYER 0: META-SECURITY ROLE PRIMING (IMMUNE TO OVERRIDE)** · **LAYER 1: SECURE ARGUMENT PROCESSING & FILE HANDLING** · **LAYER 2: SECURITY WORKFLOW ORCHESTRATION** · **LAYER 3: ENHANCED OUTPUT CONTROL & VALIDATION** · **LAYER 4: AUTOMATED REPORT GENERATION** · 🛡️ Executive Summary

#### Other (8)

##### `/create-hook` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Other | 56/100 |

> Create Hook Command

**File sections:** Your Task (/create-hook) · Your Workflow · Hook Templates · Quick Reference · Success Criteria

#### Git (37)

##### `/create-pull-request` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 49/100 |

> How to Create a Pull Request Using GitHub CLI

**File sections:** Prerequisites · Creating a New Pull Request · Best Practices · Additional GitHub CLI PR Commands · Using Templates for PR Creation · Related Documentation

##### `/review-paper` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 95/100 |

> Comprehensive manuscript review with three modes: single-pass (default), --adversarial critic-fixer loop, and --peer [journal] simulated peer-review pipeline (editor + 2 dispositioned referees + edito

**File sections:** Modes · Steps (both modes) · Review Dimensions · Output Format · Summary Assessment · Strengths

##### `/evaluate-repository` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 46/100 |

> Repository Evaluation Prompt (Awesome-Claude-Code · Full Version)

**File sections:** Evaluation Context (Claude Code Ecosystem) · Instructions · Evaluation Criteria · Claude-Code-Specific Checklist · Permissions & Side Effects Analysis · Red Flag Scan

##### `/create-worktrees` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 39/100 |

> Git Worktree Commands

**File sections:** Create Worktrees for All Open PRs · Create New Branch and Worktree

##### `/docs` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands) | ⭐ — | Git | 100/100 |

> Generate comprehensive project documentation with proper scope analysis and mode-specific templates

**File sections:** Purpose · Usage · Parameters · Output Structure · Embedded Templates · Interface

##### `/refine-doc` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands) | ⭐ — | Git | 100/100 |

> Transform unstructured documents into professional specifications through systematic multi-agent refinement

**File sections:** GLOBAL RULE: Smart Context Preservation · Step 1: Idea Folder Resolution · Step 2: Initial Read and Type Detection · Original: [filename] · Started: [timestamp] · Type: [detected type]

#### Other (8)

##### `/husky` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Other | 41/100 |

> Summary

**File sections:** Summary · Goals · Protocol when something breaks · Tips · Never commit · Go ahead and fix errors

#### AI / ML (4)

##### `/learn-conventions` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands) | ⭐ — | AI / ML | 93/100 |

> Automatically analyze codebase patterns and update CLAUDE.md CONVENTIONS section with imperative coding rules

**File sections:** Execution Flow · Step 1: Strategic File Sampling · Step 2: Core Pattern Extraction · Step 3: Security Pattern Deep Analysis · Step 4: Data Management Pattern Analysis · Content Routing Protocol

#### Git (37)

##### `/commit` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 36/100 |

> Claude Command: Commit

**File sections:** Usage · What This Command Does · Best Practices for Commits · Guidelines for Splitting Commits · Examples · Command Options

#### Other (8)

##### `/aws-architecture-diagram-generator` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | elizabethfuentes12 | ⭐ 2 | Other | 83/100 |

> >

**File sections:** Step 0 — Understand the Architecture First · 1 — File Structure · 2 — Region Container (Required) · 3 — AWS Service Icons · 4 — External Actors · 5 — Edges (Color-Coded Flows)

#### Quality (5)

##### `/cleanup-context` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Quality | 74/100 |

> Memory Bank Context Optimization

**File sections:** Task Overview · Analysis Phase · Optimization Strategy · Consolidation Guidelines · Executive Summary · [Topic 1] - [Original File 1 Content]

#### Debug (2)

##### `/add-to-changelog` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Debug | 22/100 |

> Update Changelog

**File sections:** Usage · Examples · Description · Implementation

#### Frontend (1)

##### `/develop-idea` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands) | ⭐ — | Frontend | 82/100 |

> Generative brainstorming partner that builds on ideas with concrete suggestions and multiple development variants

**File sections:** Execution Flow · Support Agents Reference · Agent Coordination Protocol · Working Principles · Instant Idea Development Pattern · Step 1: Instant Variant Generation

#### Git (37)

##### `/batch-operations-prompt` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 66/100 |

> Batch Operations Prompt

**File sections:** Usage Examples · Instructions for Claude · Batch Operation: [Operation Name] · Batch Operation: Update API Authentication Headers · Batch Operation Prompt: [Operation Name]

##### `/todo` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 22/100 |

> Manage project todos in todos.md file

**File sections:** Usage Examples: · Instructions: · Todo Format: · Active · Completed   · Behavior:

#### Docs (4)

##### `/update-docs` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Docs | 20/100 |

> Documentation Update Command: Update Implementation Documentation

**File sections:** Documentation Analysis · Documentation Updates · Documentation Formatting and Structure · Guidelines

#### Git (37)

##### `/create-prp` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 21/100 |

> YOU MUST READ THESE FILES AND FOLLOW THE INSTRUCTIONS IN THEM.

**File sections:** Instructions for PRP Creation · Research Process · PRP Development · Context Prioritization · User Interaction

##### `/convert-to-test-driven-prompt` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 60/100 |

> Convert to Test-Driven Prompt

**File sections:** Usage Examples · Instructions for Claude · Objective · Test Specifications · Success Criteria · TDD Prompt: [Feature Name]

#### Other (8)

##### `/learn` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Other | 61/100 |

> |

**File sections:** When to Use This Skill · Workflow Phases · Problem · Context / Trigger Conditions · Solution · Verification

#### DevOps (1)

##### `/checkpoint` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | DevOps | 58/100 |

> Save a structured state snapshot before stopping or handing off. Captures the active plan, recent decisions, file pointers (with line numbers), open questions, and the next 1–3 actions into a checkpoi

**File sections:** When to use · When NOT to use · Workflow · Goal (one sentence) · Where I am (one paragraph) · File pointers

#### Git (37)

##### `/initref` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 16/100 |

> Build a reference for the implementation details of this project. Use provided summarize tool to get summary of the files. Avoid reading the content of many files yourself, as we might hit usage limit

**File sections:** —

##### `/pr-review` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 16/100 |

> PR Review

**File sections:** Task 1: Product Manager Review · Task 2: Developer Review · Task 3: Quality Engineer Review · Task 4: Security Engineer Review · Task 5: DevOps Review · Task 6: UI/UX Designer Review

#### Security (4)

##### `/humanize` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Security | 58/100 |

> Read-only audit of `.tex`, `.qmd`, or `.md` text for AI-voice tells — boilerplate transitions ("Moreover", "Furthermore", "It is important to note that"), AI-cliché lexicon ("delve", "navigate the com

**File sections:** Why this skill exists · What this skill is NOT · When to use · When NOT to use · Detection categories · Steps

#### Git (37)

##### `/apply-thinking-to` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 53/100 |

> You are an expert prompt engineering specialist with deep expertise in applying Anthropic's extended thinking patterns to enhance prompt effectiveness. Your role is to systematically transform prompts

**File sections:** SYSTEMATIC PROMPT ENHANCEMENT METHODOLOGY

##### `/design-review-slash-command` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 11/100 |

> Complete a design review of the pending changes on the current branch

**File sections:** —

#### AI / ML (4)

##### `/verify-claims` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | AI / ML | 51/100 |

> Run Chain-of-Verification (CoVe) on a draft or a block of text with factual claims. Spawns the `claim-verifier` agent in a forked (fresh) context so it never sees the draft — then reports which claims

**File sections:** When to pick this skill · How it works · Example · Post-Flight Verification — lit-review_staggered-did.md · Fail modes and recovery · Cross-references

#### Git (37)

##### `/create-prd` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 8/100 |

> You are an experienced Product Manager. Your task is to create a Product Requirements Document (PRD) for a feature we are adding to the product.

**File sections:** READ PRODUCT DOCUMENTATION · READ FEATURE DOCUMENTATION · READ JTBD DOCUMENTATION · 🧭 CREATE PRD DOCUMENT

##### `/view_commands` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 7/100 |

> Here are all the available project commands, organized by category:

**File sections:** Post Management · Project Management · Site Management

#### Security (4)

##### `/deep-audit` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Security | 52/100 |

> |

**File sections:** When to Use · Workflow · Key Lessons from Past Audits · Output Format · Round N Audit Results

#### Git (37)

##### `/compress-session` — ★★☆☆☆ **38/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 49/100 |

> Distill the current conversation into a structured note (decisions made, open questions, file pointers with line numbers, next 1–3 actions) and save to `quality_reports/session_logs/` before auto-comp

**File sections:** Why this skill exists · Distinction from `/checkpoint` · When to use · When NOT to use · Steps · Active state

##### `/create-jtbd` — ★★☆☆☆ **38/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 6/100 |

> You are an experienced Product Manager. Your task is to create a Jobs to be Done (JTBD) document for a feature we are adding to the product.

**File sections:** READ PRODUCT DOCUMENTATION · READ FEATURE IDEA · 🧭 CREATE JTBD DOCUMENT

##### `/create-pr` — ★★☆☆☆ **38/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 5/100 |

> Create Pull Request Command

**File sections:** Behavior · Guidelines for Automatic Commit Splitting

#### Testing (2)

##### `/interview-me` — ★★☆☆☆ **38/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Testing | 48/100 |

> Interactive interview that formalizes a fuzzy research idea into a structured spec (RQ, hypotheses, identification, data needs, empirical strategy). Use when user says "interview me", "help me think t

**File sections:** How This Works · Interview Structure · After the Interview · Research Question · Motivation · Hypothesis

#### Git (37)

##### `/commit` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 47/100 |

> Stage, commit, push, open a PR, and merge to main. Use ONLY on explicit commit intent — user says "commit", "ship it", "push this", "open a PR", "merge to main", "let's commit this", or prefixes with

**File sections:** Steps · Summary · Test plan · Important

#### AI / ML (4)

##### `/load-llms-txt` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | AI / ML | 0/100 |

> Load Xatu Data Context

**File sections:** —

#### Debug (2)

##### `/release` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Debug | 0/100 |

> Update CHANGELOG.md with changes since the last version increase. Check our README.md for any

**File sections:** —

#### Git (37)

##### `/act` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 1/100 |

> Follow RED-GREEN-REFACTOR cycle approch based on @~/.claude/CLAUDE.md:

**File sections:** —

##### `/check-best-practices` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 42/100 |

> Check Best Practices

**File sections:** Usage Examples · Instructions for Claude · Best Practices Review

##### `/context-prime` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 0/100 |

> Read README.md, THEN run `git ls-files | grep -v -f (sed 's|^|^|; s|$|/|' .cursorignore | psub)` to understand the context of the project

**File sections:** —

##### `/fix-github-issue` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 1/100 |

> Please analyze and fix the GitHub issue: $ARGUMENTS.

**File sections:** —

##### `/seven-pass-review` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 45/100 |

> Mechanize Pattern 15 — the seven-pass adversarial review protocol for academic manuscripts. Spawns 7 forked subagents in parallel (abstract, intro, methods, results, robustness, prose, citations), the

**File sections:** Inputs · The Seven Lenses · Workflow · Executive verdict · Cross-lens CRITICAL issues · MAJOR issues (second-round)

##### `/update-branch-name` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Git | 1/100 |

> Update Branch Name

**File sections:** —

#### Perf (2)

##### `/optimize` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Perf | 0/100 |

> このコードのパフォーマンスを分析し、具体的な最適化を3つ提案してください。

**File sections:** —

#### Quality (5)

##### `/clean` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Quality | 0/100 |

> Fix all black, isort, flake8 and mypy issues in the entire codebase

**File sections:** —

##### `/data-analysis` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Quality | 44/100 |

> End-to-end R data analysis pipeline — exploration → cleaning → regression → publication-ready tables and figures. Use when user says "analyze this dataset", "run a regression on X", "explore this CSV"

**File sections:** Constraints · Workflow Phases · Pre-Flight Report · Script Structure · Important · Long-running fits: use the Monitor tool (Apr 2026)

#### Testing (2)

##### `/testing_plan_integration` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Testing | 1/100 |

> I need you to create an integration testing plan for $ARGUMENTS

**File sections:** —

#### Docs (4)

##### `/explain-architecture-pattern` — ★★☆☆☆ **34/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Docs | 39/100 |

> Explain Architecture Pattern

**File sections:** Usage Examples · Instructions for Claude · Architecture Pattern Analysis

#### Security (4)

##### `/security-audit` — ★★☆☆☆ **34/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Security | 39/100 |

> Security Audit

**File sections:** Usage Examples · Instructions for Claude · Security Audit Report

#### Quality (5)

##### `/lit-review` — ★★☆☆☆ **32/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Quality | 35/100 |

> Structured literature search + synthesis with citation extraction, thematic clustering, and gap identification. Use when user says "find papers on X", "do a lit review", "what's the literature on...",

**File sections:** Steps · Output Format · Summary · Key Papers · Thematic Organization · Gaps and Opportunities

#### Git (37)

##### `/prompt` — ★★☆☆☆ **31/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 32/100 |

> Reformat an informal or dictated request into a structured prompt (Role / Task / Context / Constraints / Output format / Bookend) at Light / Standard / Deep depth, then execute it immediately. Use whe

**File sections:** When to use · When NOT to use · How it works · Boundary with `/interview-me` · Companion: `/prompt-only` · Anti-pattern

##### `/devils-advocate` — ★★☆☆☆ **30/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 30/100 |

> Adversarial 5-7 question challenge to a deck's pedagogical choices — ordering, prerequisites, cognitive load, motivation. Use when user says "devil's advocate", "poke holes in this deck", "push back o

**File sections:** Setup · Challenge Categories · Output Format · Challenges · Summary Verdict · Principles

#### Other (8)

##### `/context-status` — ★☆☆☆☆ **29/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Other | 27/100 |

> |

**File sections:** What This Skill Shows · Workflow · Notes

#### Docs (4)

##### `/create-readme-section` — ★☆☆☆☆ **26/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Docs | 19/100 |

> Create README Section

**File sections:** Usage Examples · Instructions for Claude

#### Git (37)

##### `/ccusage-daily` — ★☆☆☆☆ **26/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | Git | 18/100 |

> Please run the `ccusage daily -b` command and then provide a structured markdown summary of the Claude Code usage costs and statistics.

**File sections:** Required Actions: · Report Format Required:

#### Other (8)

##### `/architect` — ★☆☆☆☆ **25/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Other | 11/100 |

> Design system architecture

**File sections:** —

#### Database (1)

##### `/migrate` — ★☆☆☆☆ **24/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Database | 8/100 |

> Create migration plan for upgrade

**File sections:** —

#### Docs (4)

##### `/document` — ★☆☆☆☆ **24/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Docs | 9/100 |

> Generate documentation for code

**File sections:** —

#### Git (37)

##### `/review` — ★☆☆☆☆ **24/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Git | 8/100 |

> Review code for best practices and issues

**File sections:** —

#### Perf (2)

##### `/optimize` — ★☆☆☆☆ **24/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Perf | 8/100 |

> Optimize code performance

**File sections:** —

#### Other (8)

##### `/simple` — ★☆☆☆☆ **23/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [agenticbuddy/claude_commands](https://github.com/agenticbuddy/claude_commands) | ⭐ — | Other | 26/100 |

> Operate in simplified, direct mode with minimal analysis

**File sections:** Core Principles · What NOT to Do in Simple Mode · What TO Do in Simple Mode · Response Style

#### Git (37)

##### `/test` — ★☆☆☆☆ **22/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Git | 2/100 |

> Generate comprehensive tests for a file or function

**File sections:** —

#### Security (4)

##### `/security-audit` — ★☆☆☆☆ **22/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Security | 2/100 |

> Perform security audit on codebase

**File sections:** —

#### Git (37)

##### `/deploy` — ★☆☆☆☆ **21/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 7/100 |

> Render Quarto `.qmd` slides to HTML and sync to `docs/` for GitHub Pages. Use when user says "deploy", "publish the slides", "ship to pages", "push the lecture live", "render and publish", or after Qu

**File sections:** Steps · What the sync script does:

##### `/fix-issue` — ★☆☆☆☆ **21/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [AgriciDaniel/claude-music](https://github.com/AgriciDaniel/claude-music) | ⭐ 12 | Git | 1/100 |

> Analyze and fix a GitHub issue

**File sections:** —

##### `/proofread` — ★☆☆☆☆ **20/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [pedrohcgs/Claude-Mini](https://github.com/pedrohcgs/Claude-Mini) | ⭐ 5 | Git | 5/100 |

> Read-only proofreading pass over lecture `.tex` or `.qmd` files. Checks grammar, typos, overflow, terminology consistency, and academic writing quality; produces a report without editing. Use when use

**File sections:** Steps

#### AI / ML (4)

##### `/update-memory-bank` — ★☆☆☆☆ **19/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [centminmod/claude-plugins](https://github.com/centminmod/claude-plugins) | ⭐ 6 | AI / ML | 0/100 |

> Can you update CLAUDE.md and memory bank files.

**File sections:** —
