# Agent Configuration Playbook — Commands Reference Guide

> **Purpose:** Complete reference for Claude Code slash commands. Import this document into NotebookLM alongside playbook-agents.md and playbook-skills.md.

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
