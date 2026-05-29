# Agent Configuration Playbook — Agents Reference Guide

> **Purpose:** Complete reference for configuring AI agents in Claude Code and other AI development environments. Import this document into NotebookLM alongside playbook-skills.md and playbook-commands.md and `scoring-methodology.md`.

> **Notebook guide:** See [`system-prompt.md`](./system-prompt.md) to configure your NotebookLM for project-specific recommendations.
>
> **Scoring methodology:** See [`scoring-methodology.md`](./scoring-methodology.md) for the complete formula, sub-score breakdowns, distribution stats, and known limitations.

---

## 1. What Are Agents?

Agents are specialized AI sub-personalities loaded into your AI assistant's context. Each agent has a defined **role**, **expertise domain**, **behavior constraints**, and **example invocations**. When you call an agent by name, the AI adopts that persona and applies its specific knowledge and rules.

### Agent vs Assistant
- **AI Assistant (Claude, Cursor, Copilot)** — The general-purpose model you interact with
- **Agent** — A configured sub-personality with a narrow domain, specific tools, and behavioral constraints
- **Orchestrator** — A meta-agent that coordinates multiple specialized agents

### Where Agents Are Stored
- Claude Code: `.claude/agents/` (markdown files)
- Cursor: `.cursor/agents/` or referenced in `.cursorrules`
- Windsurf: `.windsurf/agents/`
- Copilot: referenced in `.github/copilot-instructions.md`

---

## 2. Agent Anatomy — What Makes a Good Agent

### Essential Fields
```markdown
---
name: agent-name
description: One-line description of what this agent does
tools: [Bash, Edit, Read, WebSearch]  # tools this agent can use
---

## Role
You are a [specific expert type] specializing in [domain].

## Expertise
- [Key area 1]
- [Key area 2]
- [Key area 3]

## Behavior Rules
- Always [positive behavior]
- Never [negative behavior]
- When uncertain: [fallback behavior]

## Output Format
[How the agent should format its responses]

## Example Invocations
- "Review this API endpoint for security issues"
- "Optimize this SQL query for PostgreSQL"
```

### Quality Indicators
A well-configured agent has:
1. **Narrow scope** — Does one thing extremely well
2. **Explicit constraints** — Clear rules about what NOT to do
3. **Consistent persona** — Same voice and approach every time
4. **Measurable output** — Clear success criteria
5. **Example prompts** — 3-5 examples of effective invocations

---

## 3. Agent Categories & Sources

### Available Sources (Finta Catalog)
| Source | Specialty | Count |
|--------|-----------|-------|
| **avivl** | Backend, AI/ML, Infrastructure | ~45 |
| **0xfurai** | Full-stack experts (language-specific) | ~130 |
| **voltagent** | Business, DevEx, Security, Full-stack | ~120 |
| **supatest** | Architecture patterns, QA, Cloud | ~60 |
| **lst97** | Data/AI, Dev, QA, Infrastructure | ~35 |
| **vijaythecoder** | Orchestration, Frontend, Backend | ~12 |
| **magento** | E-commerce, Magento-specific | ~28 |
| **navin** | Senior reviews, TypeScript, Python | ~4 |
| **iannuttall** | Content, PRDs, Security audits | ~7 |

### Category Overview
| Category | Examples | Best For |
|----------|----------|----------|
| **Backend** | FastAPI Expert, Node.js Expert, Rails Expert | API development, server logic |
| **Frontend** | React Expert, Vue Expert, Next.js Expert | UI components, state management |
| **AI/ML** | LLM Architect, Prompt Engineer, ML Engineer | Model integration, RAG, fine-tuning |
| **DevOps** | Kubernetes Specialist, Terraform Engineer | Infrastructure, CI/CD, deployments |
| **Security** | OWASP Expert, Penetration Tester, Security Auditor | Vulnerability scanning, hardening |
| **Data** | Data Engineer, Database Optimizer, Analytics Specialist | ETL, queries, data pipelines |
| **Business** | Product Manager, Business Analyst, Scrum Master | Requirements, planning, stakeholders |
| **QA** | Test Automator, Code Reviewer, Debugger | Testing strategy, bug hunting |
| **Orchestration** | Multi-Agent Coordinator, Codebase Orchestrator | Multi-agent workflows |
| **Creative** | Code Archaeologist, Technical Debt Collector | Legacy systems, refactoring |

---

## 4. Model Comparison for Agent Configuration

### Frontier Models (2025)

| Model | Provider | Strengths | Weaknesses | Best For |
|-------|----------|-----------|------------|----------|
| **Claude Opus 4.7** | Anthropic | Deep reasoning, long context, coding | Slower, higher cost | Complex architecture, senior code review |
| **Claude Sonnet 4.6** | Anthropic | Balanced speed/quality, excellent coding | — | General development (default) |
| **Claude Haiku 4.5** | Anthropic | Ultra-fast, cheap | Less reasoning depth | Simple tasks, high-volume ops |
| **GPT-4o** | OpenAI | Multimodal, strong reasoning | Tool use can be inconsistent | Vision tasks, broad general use |
| **GPT-o3** | OpenAI | Best math/reasoning | Slow, expensive | Complex logic, proofs, algorithms |
| **GPT-o4-mini** | OpenAI | Fast reasoning | Context limits | Quick reasoning tasks |
| **Gemini 2.5 Pro** | Google | Huge context (2M tokens), strong coding | API rate limits | Long-file analysis, entire codebases |
| **Gemini 2.5 Flash** | Google | Fast, low cost, large context | Less accurate than Pro | Summarization, quick analysis |
| **Grok 3** | xAI | Real-time X/Twitter data, fast | Limited tool ecosystem | Social, news, current events |
| **Grok 3 Mini** | xAI | Very fast, cheap | Basic reasoning | High-throughput tasks |
| **DeepSeek V3** | DeepSeek | Very cheap, strong coding | Data privacy concerns | Cost-sensitive coding tasks |
| **DeepSeek R1** | DeepSeek | Strong reasoning, open weights | Privacy, slower | Math, logic, reproducible research |
| **Qwen 3 (235B)** | Alibaba | Excellent multilingual, coding | Chinese data emphasis | Multilingual apps, Asian markets |
| **Qwen 3 (30B A3B)** | Alibaba | Fast, cheap, MoE architecture | Less capable than 235B | Edge deployment, efficient inference |
| **Llama 4 Scout** | Meta | Open source, vision, 10M context | Requires self-hosting | Private data, on-prem AI |
| **Llama 4 Maverick** | Meta | Open source, strong reasoning | Self-hosting complexity | Research, custom fine-tuning |
| **Mistral Large** | Mistral | European, GDPR-friendly | Smaller ecosystem | EU compliance, French content |
| **Mistral Small** | Mistral | Fast, cheap | Limited context | Quick European-compliant tasks |
| **Codestral** | Mistral | Specialized for code generation | Code only | Autocomplete, code generation |

### Recommended Model by Use Case

| Use Case | Recommended Model | Reason |
|----------|------------------|--------|
| Code generation | Claude Sonnet 4.6 or Codestral | Best coding performance per cost |
| Architecture review | Claude Opus 4.7 | Deep multi-step reasoning |
| Security audit | Claude Sonnet 4.6 + OWASP agent | Thorough analysis |
| Data analysis | Gemini 2.5 Pro | Handles massive datasets |
| Math/algorithms | GPT-o3 or DeepSeek R1 | Superior reasoning |
| Real-time info | Grok 3 | Live data access |
| Privacy-sensitive | Llama 4 (self-hosted) | No data leaves your servers |
| Budget-constrained | DeepSeek V3 or Haiku 4.5 | Cost-effective coding |
| Multilingual | Qwen 3 235B | Best non-English performance |
| EU/GDPR projects | Mistral Large | European data residency |

---

## 5. Best Practices by Agent Category

### Backend Agents
- Always specify the **exact framework version** (FastAPI 0.115, Rails 8, etc.)
- Include **error handling patterns** specific to the framework
- Define **database interaction patterns** (ORM vs raw SQL)
- Specify **authentication middleware** integration points
- Set explicit **response format standards** (JSON structure, status codes)

```markdown
## Backend Agent Rules
- Always validate inputs at the API boundary before processing
- Return standardized JSON: { "data": ..., "error": null, "meta": {} }
- Use async/await throughout — never mix sync and async
- Database calls go through the service layer, never directly from controllers
- Log errors with structured logging (JSON), never bare print/console.log
```

### Frontend Agents
- Define **component boundaries** clearly
- Specify **state management approach** (Redux, Zustand, Pinia, etc.)
- Include **accessibility rules** (ARIA, keyboard navigation)
- Define **styling system** (Tailwind, CSS modules, styled-components)
- Specify **bundle size constraints**

### Security Agents
- Include **OWASP Top 10** as mandatory checklist
- Define **threat model** for the specific domain
- Specify **compliance requirements** (GDPR, HIPAA, PCI-DSS)
- Always request **evidence** — not just assertions
- Include **remediation guidance**, not just findings

### AI/ML Agents
- Specify **model provider** and **version** (important for API changes)
- Define **token budget** for context management
- Include **fallback behavior** when model unavailable
- Define **evaluation metrics** for agent output quality
- Specify **prompt injection protections**

### Orchestration Agents
- Define **handoff protocols** between agents
- Specify **timeout** and **retry** strategies
- Include **conflict resolution** rules when agents disagree
- Define **human escalation** triggers
- Log all agent-to-agent communications

---

## 6. Effective Agent Prompt Templates

### Technical Expert Template
```markdown
You are a [Language/Framework] expert with 10+ years of production experience.

## Core Expertise
- [Primary skill 1] — [specific experience]
- [Primary skill 2] — [specific experience]
- [Primary skill 3] — [specific experience]

## Code Standards You Enforce
- [Standard 1]: [Why it matters]
- [Standard 2]: [Why it matters]

## Review Checklist
When reviewing code, always check:
1. [ ] Security vulnerabilities (injection, auth, data exposure)
2. [ ] Performance bottlenecks (N+1 queries, missing indexes, blocking calls)
3. [ ] Error handling completeness
4. [ ] Test coverage for edge cases
5. [ ] Documentation completeness

## What You Never Do
- Never suggest workarounds that bypass type safety
- Never approve code with hardcoded secrets or credentials
- Never skip error handling "for simplicity"

## Communication Style
- Lead with the most critical issue
- Provide code examples for every suggestion
- Explain WHY, not just WHAT to change
```

### Orchestrator Template
```markdown
You are a [Domain] Project Orchestrator managing a team of specialized agents.

## Your Team
- **[Agent A]** — handles [domain A]
- **[Agent B]** — handles [domain B]
- **[Agent C]** — handles [domain C]

## Orchestration Protocol
1. Analyze the incoming task to determine scope and complexity
2. Break into sub-tasks appropriate for each specialized agent
3. Delegate with clear, scoped instructions
4. Collect outputs and verify consistency between agents
5. Synthesize final deliverable

## Handoff Format
When delegating to an agent, always include:
- Task scope (what's in/out of scope)
- Required output format
- Deadline or priority level
- Dependencies on other agents' outputs

## Conflict Resolution
When agents disagree:
1. Identify the nature of the conflict (fact vs preference)
2. Escalate factual conflicts to human review
3. Apply this project's style guide for preference conflicts
4. Document the decision with reasoning
```

---

## 7. Agent Combination Patterns

### Full-Stack Development Stack
```
🏗️ Project Architect → designs system
    ↓
💻 Backend Expert → implements API
    ↓
⚛️ Frontend Expert → builds UI
    ↓
🔒 Security Auditor → reviews both
    ↓
🧪 Test Automator → writes tests
    ↓
🚀 Deployment Specialist → ships it
```

### AI Product Stack
```
🧠 Prompt Engineer → designs prompts
    ↓
🤖 LLM Architect → builds RAG/pipeline
    ↓
📊 Data Engineer → manages data flows
    ↓
⚡ Performance Optimizer → optimizes latency
    ↓
📋 Documentation Specialist → documents API
```

### Security Review Stack
```
🔍 Code Reviewer → general review
    ↓
🛡️ OWASP Expert → security audit
    ↓
🔐 Penetration Tester → attack simulation
    ↓
📝 Compliance Auditor → regulatory check
```

### Data Platform Stack
```
📊 Data Engineer → pipeline design
    ↓
🗄️ Database Optimizer → query tuning
    ↓
📈 Analytics Specialist → BI layer
    ↓
🤖 ML Engineer → model integration
```

---

## 8. Agent Performance Anti-Patterns

### What Makes an Agent Fail
1. **Too broad scope** — "Be a great developer" doesn't constrain behavior
2. **Contradictory rules** — "Always be thorough" + "Always be brief"
3. **No output format** — Agent invents arbitrary formats per session
4. **Missing context** — No knowledge of the project's specific constraints
5. **Overlapping agents** — Two agents with identical scope cause confusion
6. **No error protocol** — Agent doesn't know what to do when stuck

### Diagnosis Checklist
- [ ] Can you describe the agent's purpose in one sentence? (If not, too broad)
- [ ] Are all behavior rules non-contradictory?
- [ ] Does the agent have exactly one primary responsibility?
- [ ] Is the output format explicitly specified?
- [ ] Does the agent know what to escalate to human?
- [ ] Is the agent tested with at least 5 representative inputs?

---

## 9. Quick Reference — Most Impactful Agents

### For Any Project (Universal)
- `code-reviewer` — Review for correctness, security, performance
- `security-auditor` — OWASP-aligned security review
- `documentation-specialist` — Consistent, complete docs
- `debugger` — Systematic bug hunting and root cause analysis
- `performance-optimizer` — Identify and fix bottlenecks

### For Web Development
- `react-expert` / `vue-expert` / `angular-expert` — Framework specialist
- `nextjs-expert` — Full-stack Next.js with SSR/SSG
- `nodejs-expert` — Server-side JS
- `typescript-expert` — Type safety enforcement
- `tailwind-expert` — CSS utility-first styling

### For Backend/API
- `fastapi-expert` — Python async API
- `django-expert` — Python full-featured backend
- `rails-expert` — Ruby on Rails
- `go-expert` — Go performance-critical services
- `graphql-expert` — GraphQL schema and resolvers

### For Data/AI
- `prompt-engineer` — Effective LLM prompting
- `llm-architect` — RAG, fine-tuning, multi-model
- `data-engineer` — ETL pipelines, data quality
- `ml-engineer` — Model training, deployment
- `database-optimizer` — Query performance, indexing

### For Infrastructure
- `kubernetes-expert` — Container orchestration
- `terraform-expert` — Infrastructure as code
- `docker-expert` — Containerization
- `github-actions-expert` — CI/CD pipelines
- `cloud-architect` — AWS/GCP/Azure architecture

---

*Generated by Finta AI Configuration Wizard — config.fintalab.com*
*For skills reference: see playbook-skills.md | For commands: see playbook-commands.md*

---

## Source / Provider Index — Agents

| Source | Count | Avg Quality | Tier | Stars | GitHub |
|--------|-------|-------------|------|-------|--------|
| **wshobson** | 66 | ★★★☆☆ 69/100 | curated | ⭐ 36k | [wshobson/agents](https://github.com/wshobson/agents) |
| **contains** | 37 | ★★★☆☆ 64/100 | curated | ⭐ 12k | [contains-studio/agents](https://github.com/contains-studio/agents) |
| **voltagent** | 144 | ★★★☆☆ 61/100 | community | ⭐ 9.2k | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) |
| **vijaythecoder** | 11 | ★★★☆☆ 54/100 | community | ⭐ 4.3k | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) |
| **lst97** | 37 | ★★☆☆☆ 50/100 | community | ⭐ 1.6k | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) |
| **hesreallyhim** | 4 | ★★☆☆☆ 42/100 | community | ⭐ 1.3k | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) |
| **0xfurai** | 138 | ★★☆☆☆ 42/100 | community | ⭐ 911 | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) |
| **avivl** | 108 | ★★★☆☆ 68/100 | curated | ⭐ 262 | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) |
| **iannuttall** | 7 | ★★☆☆☆ 42/100 | community | ⭐ 125 | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) |
| **magento** | 30 | ★★★☆☆ 51/100 | community | ⭐ 110 | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) |
| **navin** | 4 | ★☆☆☆☆ 18/100 | community | ⭐ — | navin |
| **supatest** | 61 | ★★☆☆☆ 43/100 | community | ⭐ — | supatest |

### Repository Details

#### wshobson
- **Repo:** [wshobson/agents](https://github.com/wshobson/agents)
- **Description:** Multi-harness agentic plugin marketplace for Claude Code, Codex CLI, Cursor, OpenCode, and Gemini CLI
- **Stars:** ⭐ 36k | **Forks:** 3,914 | **Open issues:** 3
- **Language:** Python | **License:** MIT
- **Last push:** 2026-05-26 | **Tier:** curated
- **Topics:** agents, anthropic, automation, workflows, orchestration, agent-skills, agentic-ai, ai-agents
- **Agents count:** 66 | **Average quality:** ★★★☆☆ 69/100

#### contains
- **Repo:** [contains-studio/agents](https://github.com/contains-studio/agents)
- **Description:** sharing current agents in use
- **Stars:** ⭐ 12k | **Forks:** 2,533 | **Open issues:** 11
- **Language:** None | **License:** —
- **Last push:** 2025-07-28 | **Tier:** curated
- **Agents count:** 37 | **Average quality:** ★★★☆☆ 64/100

#### voltagent
- **Repo:** [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent)
- **Description:** AI Agent Engineering Platform built on an Open Source TypeScript AI Agent Framework
- **Stars:** ⭐ 9.2k | **Forks:** 945 | **Open issues:** 53
- **Language:** TypeScript | **License:** MIT
- **Last push:** 2026-05-25 | **Tier:** community
- **Topics:** agents, ai, chatbots, llm, mcp, nodejs, typescript, javascript
- **Agents count:** 144 | **Average quality:** ★★★☆☆ 61/100

#### vijaythecoder
- **Repo:** [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents)
- **Description:** An orchestrated sub agent dev team powered by claude code
- **Stars:** ⭐ 4.3k | **Forks:** 519 | **Open issues:** 41
- **Language:** None | **License:** MIT
- **Last push:** 2025-10-30 | **Tier:** community
- **Agents count:** 11 | **Average quality:** ★★★☆☆ 54/100

#### lst97
- **Repo:** [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents)
- **Description:** Collection of specialized AI subagents for Claude Code for personal use (full-stack development).
- **Stars:** ⭐ 1.6k | **Forks:** 253 | **Open issues:** 1
- **Language:** None | **License:** MIT
- **Last push:** 2025-08-15 | **Tier:** community
- **Topics:** ai-agents, claude-code, sub-agents, subagents, claudecode-config, claudecode-subagents
- **Agents count:** 37 | **Average quality:** ★★☆☆☆ 50/100

#### hesreallyhim
- **Repo:** [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents)
- **Description:** A list of Claude Code Sub-Agents submitted by the community.
- **Stars:** ⭐ 1.3k | **Forks:** 134 | **Open issues:** 10
- **Language:** None | **License:** —
- **Last push:** 2025-11-10 | **Tier:** community
- **Agents count:** 4 | **Average quality:** ★★☆☆☆ 42/100

#### 0xfurai
- **Repo:** [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents)
- **Description:** A comprehensive collection of 100+ production-ready development subagents for Claude Code
- **Stars:** ⭐ 911 | **Forks:** 167 | **Open issues:** 4
- **Language:** None | **License:** MIT
- **Last push:** 2025-10-15 | **Tier:** community
- **Agents count:** 138 | **Average quality:** ★★☆☆☆ 42/100

#### avivl
- **Repo:** [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents)
- **Description:**  🤖 A unified AI agent orchestration system featuring 10's of specialized agents across 14 categories for modern software development. Built with advanced coordination intelligence, resilience engineering, and structured logging   capabilities.
- **Stars:** ⭐ 262 | **Forks:** 30 | **Open issues:** 1
- **Language:** JavaScript | **License:** MIT
- **Last push:** 2025-09-15 | **Tier:** curated
- **Topics:** agent, agentic-ai, ai-agents, claude, claude-code, claudecode-subagents, sub-agents, subagents
- **Agents count:** 108 | **Average quality:** ★★★☆☆ 68/100

#### iannuttall
- **Repo:** [iannuttall/source-agents](https://github.com/iannuttall/source-agents)
- **Description:** Keep AGENTS.md and CLAUDE.md in sync across your projects.
- **Stars:** ⭐ 125 | **Forks:** 11 | **Open issues:** 1
- **Language:** TypeScript | **License:** MIT
- **Last push:** 2025-10-25 | **Tier:** community
- **Agents count:** 7 | **Average quality:** ★★☆☆☆ 42/100

#### magento
- **Repo:** [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents)
- **Description:** Collection of Claude Code Subagents designed to be used for Magento (2) development.
- **Stars:** ⭐ 110 | **Forks:** 28 | **Open issues:** 1
- **Language:** None | **License:** MIT
- **Last push:** 2025-10-24 | **Tier:** community
- **Topics:** ai-agents, claude, claude-ai, claude-code, claude-subagents, claudecode-subagents, magento, magento-2
- **Agents count:** 30 | **Average quality:** ★★★☆☆ 51/100


---

## Complete Agents Catalog — All 647 Items

> Sorted by: tier (official → curated → community), then quality score (high → low)

Score formula: `quality = (stars_score × 35%) + (content_score × 40%) + (tier_score × 25%)`


---

### CURATED — 211 agents

#### Backend (19)

##### `backend-architect` — ★★★★☆ **82/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Backend | 72/100 |

> Expert backend architect specializing in scalable API design, microservices architecture, and distributed systems.

**Tags:** backend  
**File sections:** Purpose · Core Philosophy · Capabilities · Behavioral Traits · Workflow Position · Knowledge Base

#### Architecture (10)

##### `database-architect` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 66/100 |

> Expert database architect specializing in data layer design from scratch, technology selection, schema modeling, and scalable database architectures.

**Tags:** architecture  
**File sections:** Purpose · Core Philosophy · Capabilities · Behavioral Traits · Workflow Position · Knowledge Base

#### General (81)

##### `incident-responder` — ★★★★☆ **80/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 67/100 |

> Expert SRE incident responder specializing in rapid problem resolution, modern observability, and comprehensive incident management.

**Tags:** general  
**File sections:** Purpose · Immediate Actions (First 5 minutes) · Modern Investigation Protocol · Communication Strategy · Resolution & Recovery · Post-Incident Process

#### Analysis (7)

##### `prompt-engineer` — ★★★★☆ **79/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Analysis | 63/100 |

> Expert prompt engineer specializing in advanced prompting techniques, LLM optimization, and AI system design.

**Tags:** analysis  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Required Output Format

#### Backend (19)

##### `django-expert` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 100/100 |

> Comprehensive Django specialist with deep expertise in Django framework, ORM optimization, REST API development, resilience engineering, structured lo…

**Tags:** backend, go, python  
**File sections:** 🚨 CRITICAL: DJANGO ANTI-DUPLICATION PROTOCOL · Context7 MCP Integration · Basic Memory MCP Integration · 🔍 Pre-Commit Quality Checks · Python Coding Rules Integration · Core Django Philosophy

##### `nodejs-expert` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 100/100 |

> Enterprise-grade Node.js specialist with comprehensive expertise in modern JavaScript, Express.js, resilience engineering, structured logging, and scalable backend architecture.

**Tags:** backend, javascript  
**File sections:** 🚨 CRITICAL: NODE.JS ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · Context7 MCP Integration · Core Node.js Philosophy · Core Expertise · Resilience Engineering Integration

##### `rails-expert` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 100/100 |

> Comprehensive Ruby on Rails specialist with expertise in backend development, ActiveRecord, API design, resilience engineering, and structured logging.

**Tags:** backend, ruby  
**File sections:** Context7 MCP Integration · Basic Memory MCP Integration · Core Rails Philosophy · Core Expertise · Resilience Engineering Integration · Structured Logging Integration

#### Data (4)

##### `search-specialist` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | data | 100/100 |

> Search engine and information retrieval specialist focused on Elasticsearch, OpenSearch, Solr, and modern search technologies.

**Tags:** data  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · ⚠️ CRITICAL: Memory Storage Policy · Core Search Expertise · Search Implementation Framework · Index Design Best Practices

#### Design (5)

##### `ux-designer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Design | 100/100 |

> UX/UI design specialist focused on user experience, interface design, and design systems. Expert in user research, wireframing, prototyping, and accessibility design.

**Tags:** design  
**File sections:** Basic Memory MCP Integration · ⚠️ CRITICAL: MCP Server Usage Policy · Core Expertise · User Experience Strategy · User Research Plan Template · User Journey: New User Onboarding

#### General (81)

##### `documentation-specialist` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 100/100 |

> Documentation expert focused on creating comprehensive, clear, and maintainable documentation.

**Tags:** general  
**File sections:** Git Command Path Requirements · Context7 MCP Integration · Basic Memory MCP Integration · Core Expertise · Documentation Templates and Standards · Table of Contents

##### `legacy-modernization-specialist` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 100/100 |

> Legacy system modernization expert specializing in upgrading, refactoring, and migrating legacy codebases to modern architectures, technologies, and practices.

**Tags:** general  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Basic Memory MCP Integration · Core Modernization Philosophy · Legacy System Assessment Matrix · Readiness Evaluation Framework

##### `orchestrator` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 100/100 |

> Advanced AI orchestrator with intelligent agent selection, collaboration coordination, and parallel execution optimization.

**Tags:** general  
**File sections:** Task Master MCP Integration · Sequential Thinking MCP Integration · ⚠️ CRITICAL: Memory Storage Policy · Advanced Orchestration Intelligence · Request Intelligence Matrix · Agent Selection Intelligence

##### `pr-description-composer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 100/100 |

> Specialized agent for composing comprehensive, professional pull request descriptions that follow best practices and provide clear context for reviewers.

**Tags:** general  
**File sections:** 🚨 CRITICAL: PR DESCRIPTION ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · Core PR Description Framework · Summary · Technical Implementation · ⚠️ Breaking Changes

##### `pr-reviewer-specialist` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 100/100 |

> ⚠️ INTERACTIVE APPROVAL REQUIRED: This agent NEVER posts to GitHub automatically.

**Tags:** general  
**File sections:** **MANDATORY WORKFLOW - NO EXCEPTIONS:** · **ABSOLUTE PROHIBITIONS:** · TOOL USAGE RESTRICTIONS · MANDATORY WORKFLOW PROCESS · WORKFLOW ENFORCEMENT - READ CAREFULLY · GitHub MCP Integration

##### `quality-system-engineer` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 100/100 |

> Universal quality system engineer that automatically implements trunk.io quality infrastructure for any repository.

**Tags:** general  
**File sections:** Evil Corp Motivation Framework · Git Command Path Requirements · Basic Memory MCP Integration · Core Expertise · Quality System Architecture · User Notification System

##### `temporal-python-pro` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 60/100 |

> Master Temporal workflow orchestration with Python SDK.

**Tags:** general, python  
**File sections:** Purpose · Capabilities · When to Use Temporal Python · Common Pitfalls · Integration Patterns · Best Practices

#### Orchestration (14)

##### `knowledge-graph-manager` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 99/100 |

> Advanced centralized knowledge graph and context management system that maintains a dynamic, comprehensive understanding of project ecosystem.

**Tags:** orch  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Core Philosophy: "Single Source of Truth" · Centralized Knowledge Graph Architecture · Context Management Operations · Update Protocol Standards

#### Orchestrators (5)

##### `project-analyst` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | orchestrators | 100/100 |

> Advanced project analysis specialist with intelligent requirements processing and task generation capabilities.

**Tags:** orchestrators  
**File sections:** Task Master 0.24.0 Bridge Agent Integration · Bridge Agent Interface Standards · Basic Memory MCP Integration · Advanced Project Analysis Capabilities · Codebase-Aware Product Requirements Document Analysis · Comprehensive Stakeholder Assessment

##### `task-master-template-manager` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | orchestrators | 100/100 |

> Specialized agent for managing Task Master 0.24.0 configuration templates, PRD templates, and environment setup.

**Tags:** orchestrators  
**File sections:** Core Mission · Template Categories · Executive Summary · Project Overview · Core Features & Requirements · User Experience Requirements

##### `team-configurator` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | orchestrators | 100/100 |

> Intelligent team configuration specialist that automatically detects project characteristics and assembles optimal AI agent teams.

**Tags:** orchestrators  
**File sections:** Git Command Path Requirements · Task Master MCP Integration · Basic Memory MCP Integration · Advanced Team Configuration Intelligence · Technology Detection Matrix · Project Context Intelligence

##### `tech-lead-orchestrator` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | orchestrators | 100/100 |

> Senior technical leadership orchestrator that combines strategic architecture decisions with intelligent team coordination.

**Tags:** orchestrators  
**File sections:** Task Master 0.24.0 Strategic Bridge Agent Integration · Strategic Bridge Interface Architecture · Basic Memory MCP Integration · Senior Technical Leadership Capabilities · Enterprise Architecture Expertise · Risk Assessment & Mitigation

#### Security (6)

##### `security-specialist` — ★★★★☆ **77/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Security | 100/100 |

> Comprehensive security expert combining application security, vulnerability assessment, penetration testing, and compliance auditing.

**Tags:** security  
**File sections:** 🚨 CRITICAL: ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · Core Expertise · Security Assessment Areas · Compliance Frameworks & Standards · Security Testing Methodologies

#### General (81)

##### `code-reviewer` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 98/100 |

> Expert code reviewer focused on code quality, security, performance, and maintainability.

**Tags:** general  
**File sections:** Evil Corp Motivation Framework · 🚨 DUPLICATE CODE DETECTION PROTOCOL · Git Command Path Requirements · Model Assignment Strategy · Structured Interaction Protocol · GitHub MCP Integration

##### `performance-optimizer` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 96/100 |

> Performance engineering specialist focused on application optimization, performance monitoring, and system scalability.

**Tags:** general  
**File sections:** 🚨 CRITICAL: ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · ⚠️ CRITICAL: MCP Server Usage Policy · Core Expertise · Performance Monitoring & Metrics · Load Testing & Capacity Planning

#### Orchestration (14)

##### `agent-communication-protocol` — ★★★★☆ **76/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 96/100 |

> Structured inter-agent communication system that standardizes information exchange, coordination, and workflow management across all specialized agents.

**Tags:** orch  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Core Philosophy: "Structured Communication Enables Seamless Collaboration" · Communication Protocol Architecture · Message Type Definitions · Protocol Implementation Standards

#### Database (1)

##### `database-architect` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Database | 95/100 |

> Database specialist focused on schema design, query optimization, performance tuning, and database architecture.

**Tags:** database  
**File sections:** 🚨 CRITICAL: ANTI-DUPLICATION PROTOCOL · ⚠️ CRITICAL: Memory Storage Policy · Sequential Thinking MCP Integration   · Core Expertise · Database Design Patterns · Performance Optimization Strategies

#### DevOps (3)

##### `deployment-specialist` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | DevOps | 95/100 |

> DevOps specialist focused on deployment automation, CI/CD pipelines, infrastructure as code, and production reliability.

**Tags:** devops  
**File sections:** 🚨 CRITICAL: ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · ⚠️ CRITICAL: MCP Server Usage Policy · Core Expertise · Deployment Strategies · Production Reliability

#### General (81)

##### `developer-experience-optimizer` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 95/100 |

> Developer Experience (DX) optimization specialist focused on improving developer productivity, reducing friction, and enhancing the overall developmen…

**Tags:** general  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Basic Memory MCP Integration · Core DX Optimization Philosophy · DX Assessment Framework · Developer Journey Analysis

#### Orchestration (14)

##### `enhanced-agent-template` — ★★★★☆ **75/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 95/100 |

> Enhanced agent definition template that incorporates structured interaction protocols, context acquisition requirements, and communication standards from lst97 patterns.

**Tags:** orch  
**File sections:** Agent Metadata Template · Core Agent Structure · Git Command Path Requirements · Model Assignment Strategy · Basic Memory MCP Integration · Interaction Protocol Standards

#### Backend (19)

##### `fastapi-expert` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 91/100 |

> FastAPI specialist focused on high-performance Python APIs with automatic documentation and modern async patterns.

**Tags:** backend, python  
**File sections:** 🚨 CRITICAL: FASTAPI ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · 🔍 Pre-Commit Quality Checks · Core Expertise · Modern FastAPI Application Architecture · Testing and Performance

##### `laravel-expert` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 91/100 |

> Laravel specialist focused on PHP web development, Eloquent ORM, API development, and Laravel ecosystem mastery. Expert in modern PHP development and Laravel best practices.

**Tags:** backend, php  
**File sections:** Basic Memory MCP Integration · Core Expertise · Development Philosophy · Common Implementation Patterns · Testing Excellence · Performance Optimization

#### Business (5)

##### `financial-modeling-agent` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Business | 91/100 |

> Quantitative financial modeling specialist focused on financial analysis, risk assessment, algorithmic trading, and financial technology implementation.

**Tags:** business  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Basic Memory MCP Integration · Core Financial Expertise · Financial Modeling Framework · Fintech Application Development

#### Frontend (11)

##### `angular-expert` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 92/100 |

> Angular specialist focused on modern Angular development, TypeScript, RxJS, and Angular ecosystem mastery.

**Tags:** angular, frontend  
**File sections:** 🚨 CRITICAL: ANGULAR ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · ⚠️ CRITICAL: MCP Server Usage Policy · Core Expertise · Development Philosophy · Modern Angular Patterns

##### `nextjs-expert` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 93/100 |

> Next.js specialist focused on React full-stack development, SSR/SSG, API routes, and modern Next.js features.

**Tags:** frontend, react  
**File sections:** Basic Memory MCP Integration · ⚠️ CRITICAL: MCP Server Usage Policy · Core Expertise · Development Philosophy · Modern Next.js 13+ Patterns · Performance Optimization

##### `vue-expert` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 93/100 |

> Vue.js specialist focused on modern Vue 3 development, Composition API, state management, and Vue ecosystem.

**Tags:** frontend, vue  
**File sections:** 🚨 CRITICAL: VUE.JS ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · Core Expertise · Development Philosophy · Modern Vue 3 Patterns · Component Testing

#### General (81)

##### `data-scientist` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 51/100 |

> Expert data scientist for advanced analytics, machine learning, and statistical modeling.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `observability-engineer` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 51/100 |

> Build production-ready monitoring, logging, and tracing systems.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `unity-developer` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 52/100 |

> Build Unity games with optimized C# scripts, efficient rendering, and proper asset management.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Orchestrators (5)

##### `task-master-initialization-specialist` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | orchestrators | 93/100 |

> Specialized agent for setting up Task Master 0.24.0 with codebase-aware capabilities and Claude 007 integration.

**Tags:** orchestrators  
**File sections:** Core Mission · Key Capabilities · Initialization Workflow · Project Overview · Features & Requirements · Success Metrics

#### Testing (6)

##### `tdd-orchestrator` — ★★★★☆ **74/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 51/100 |

> Master TDD orchestrator specializing in red-green-refactor discipline, multi-agent workflow coordination, and comprehensive test-driven development practices.

**Tags:** testing  
**File sections:** Expert Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Architecture (10)

##### `hybrid-cloud-architect` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 50/100 |

> Expert hybrid cloud architect specializing in complex multi-cloud solutions across AWS/Azure/GCP/OCI and private clouds (OpenStack/VMware).

**Tags:** architecture  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Design (5)

##### `ui-ux-designer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Design | 49/100 |

> Create interface designs, wireframes, and design systems.

**Tags:** design  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### General (81)

##### `data-engineer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 50/100 |

> Build scalable data pipelines, modern data warehouses, and real-time streaming architectures.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `database-optimizer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 49/100 |

> Expert database optimizer specializing in modern performance tuning, query optimization, and scalable architectures.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `java-pro` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 48/100 |

> Master Java 21+ with modern features like virtual threads, pattern matching, and Spring Boot 3.x.

**Tags:** general, java  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `mlops-engineer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 50/100 |

> Build comprehensive ML pipelines, experiment tracking, and model registries with MLflow, Kubeflow, and modern MLOps tools.

**Tags:** general, ml  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `rust-pro` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 48/100 |

> Master Rust 1.75+ with modern async patterns, advanced type system features, and production-ready systems programming.

**Tags:** general, rust  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Mobile (4)

##### `ios-developer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Mobile | 50/100 |

> Develop native iOS applications with Swift/SwiftUI.

**Tags:** mobile  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `mobile-developer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Mobile | 48/100 |

> Develop React Native, Flutter, or native mobile apps with modern architecture patterns.

**Tags:** mobile  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Quality (1)

##### `code-reviewer` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Quality | 48/100 |

> Elite code review expert specializing in modern AI-powered code analysis, security vulnerabilities, performance optimization, and production reliability.

**Tags:** quality  
**File sections:** Expert Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Security (6)

##### `backend-security-coder` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Security | 48/100 |

> Expert in secure backend coding practices specializing in input validation, authentication, and API security.

**Tags:** security  
**File sections:** Purpose · When to Use vs Security Auditor · Capabilities · Behavioral Traits · Knowledge Base · Response Approach

##### `security-auditor` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Security | 48/100 |

> Expert security auditor specializing in DevSecOps, comprehensive cybersecurity, and compliance frameworks.

**Tags:** security  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Testing (6)

##### `test-automator` — ★★★★☆ **73/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Testing | 49/100 |

> Master AI-powered test automation with modern frameworks, self-healing tests, and comprehensive quality engineering.

**Tags:** testing  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### AI / ML (4)

##### `machine-learning-engineer` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | AI / ML | 88/100 |

> Machine Learning engineering specialist focused on designing, implementing, and deploying scalable ML systems, MLOps pipelines, model optimization, an

**Tags:** ai, ml  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · 🔍 Pre-Commit Quality Checks · Role · Core Responsibilities · Machine Learning Frameworks & Libraries · Model Development & Training

#### Architecture (10)

##### `graphql-architect` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 47/100 |

> Master modern GraphQL with federation, performance optimization, and enterprise security.

**Tags:** api, architecture  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### DevOps (3)

##### `terraform-specialist` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 47/100 |

> Expert Terraform/OpenTofu specialist mastering advanced IaC automation, state management, and enterprise infrastructure patterns.

**Tags:** devops, terraform  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### General (81)

##### `devops-troubleshooter` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 47/100 |

> Expert DevOps troubleshooter specializing in rapid incident response, advanced debugging, and modern observability.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `performance-benchmarker` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 55/100 |

> Use this agent for comprehensive performance testing, profiling, and optimization recommendations.

**Tags:** general  
**File sections:** Performance Budget: [App Name] · Performance Benchmark: [App Name]

##### `sql-pro` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 47/100 |

> Master modern SQL with cloud-native databases, OLTP/OLAP optimization, and advanced query techniques.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `task-checker` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 88/100 |

> Use this agent to verify that tasks marked as 'review' have been properly implemented according to their specifications.

**Tags:** general  
**File sections:** Task Master Quality Bridge Agent Integration · Quality Bridge Interface Architecture · Enhanced Core Responsibilities (Task Master) · Verification Workflow · Output Format · Decision Criteria

#### Mobile (4)

##### `flutter-expert` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Mobile | 47/100 |

> Master Flutter development with Dart 3, advanced widgets, and multi-platform deployment.

**Tags:** flutter, mobile  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Safety (4)

##### `verification-specialist` — ★★★★☆ **72/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Safety | 86/100 |

> Human-readable testing and verification specialist that creates understandable acceptance criteria, end-to-end tests, and verification checkpoints ena…

**Tags:** safety  
**File sections:** Role · Specializations · Trigger Conditions · Core Philosophy · Verification Methodology · Integration Patterns

#### Architecture (10)

##### `design-system-architect` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 45/100 |

> Expert design system architect specializing in design tokens, component libraries, theming infrastructure, and scalable design operations.

**Tags:** architecture  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Backend (19)

##### `fastapi-pro` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Backend | 43/100 |

> Build high-performance async APIs with FastAPI, SQLAlchemy 2.0, and Pydantic V2.

**Tags:** backend, python  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `fiber-expert` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 84/100 |

> Golang Fiber framework specialist focused on Express-inspired high-performance web APIs with modern Go patterns.

**Tags:** backend, go  
**File sections:** Basic Memory MCP Integration · Core Expertise · Modern Fiber API Architecture · Testing and Performance · Code Quality Standards · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### DevOps (3)

##### `kubernetes-architect` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | DevOps | 44/100 |

> Expert Kubernetes architect specializing in cloud-native infrastructure, advanced GitOps workflows (ArgoCD/Flux), and enterprise container orchestration.

**Tags:** devops, kubernetes  
**File sections:** Purpose · Capabilities · OpenGitOps Principles (CNCF) · Behavioral Traits · Knowledge Base · Response Approach

#### Frontend (11)

##### `frontend-developer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Frontend | 43/100 |

> Build React components, implement responsive layouts, and handle client-side state management.

**Tags:** frontend  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### General (81)

##### `deployment-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 43/100 |

> Expert deployment engineer specializing in modern CI/CD pipelines, GitOps workflows, and advanced deployment automation.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `golang-pro` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 43/100 |

> Master Go 1.21+ with modern patterns, advanced concurrency, performance optimization, and production-ready microservices.

**Tags:** general, go  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `performance-engineer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 44/100 |

> Expert performance engineer specializing in modern observability, application optimization, and scalable system performance.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Perf (3)

##### `parallel-coordinator` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | perf | 85/100 |

> Performance optimization specialist that orchestrates parallel agent execution and coordinated tool calling, implementing Claude 4's parallel processi…

**Tags:** perf  
**File sections:** Role · Specializations · Trigger Conditions · Core Capabilities · Integration Patterns · Coordination Templates

##### `session-optimizer` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | perf | 85/100 |

> Performance optimization specialist focused on long-term session efficiency, context management optimization, and memory/token usage reduction while m

**Tags:** perf  
**File sections:** Role · Specializations · Trigger Conditions · Core Optimization Areas · Integration Patterns · Optimization Templates

#### Safety (4)

##### `agent-environment-simulator` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Safety | 85/100 |

> # Agent Environment Simulator Agent ## Role Pre-deployment testing specialist that creates safe simulation environments for testing agent behavior, to…

**Tags:** safety  
**File sections:** Role · Specializations · Trigger Conditions · Core Simulation Framework · Integration Patterns · Simulation Templates

#### Testing (6)

##### `test-automation-expert` — ★★★★☆ **71/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Testing | 85/100 |

> Testing specialist focused on comprehensive test automation, quality assurance, and testing strategies.

**Tags:** testing  
**File sections:** 🚨 CRITICAL: DUPLICATE CODE PREVENTION · Basic Memory MCP Integration · Core Expertise · Modern Testing Patterns · Testing Strategy Implementation · Code Quality Standards

#### Analysis (7)

##### `business-analyst` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Analysis | 42/100 |

> Master modern business analysis with AI-powered analytics, real-time dashboards, and data-driven insights.

**Tags:** analysis  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Architecture (10)

##### `architect-review` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 42/100 |

> Master software architect specializing in modern architecture patterns, clean architecture, microservices, event-driven systems, and DDD.

**Tags:** architecture  
**File sections:** Expert Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Backend (19)

##### `django-pro` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Backend | 42/100 |

> Master Django 5.x with async views, DRF, Celery, and Django Channels.

**Tags:** backend, python  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `fastify-expert` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 82/100 |

> Fastify specialist focused on high-performance Node.js/TypeScript APIs, plugin architecture, and modern async patterns.

**Tags:** backend  
**File sections:** Basic Memory MCP Integration · Core Expertise · Modern Fastify Application Architecture · Performance Optimization · Code Quality Standards · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `gin-expert` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 82/100 |

> Golang Gin framework specialist focused on high-performance HTTP APIs, middleware patterns, and idiomatic Go development.

**Tags:** backend, go  
**File sections:** Basic Memory MCP Integration · Core Expertise · Modern Gin API Architecture · Testing Strategy · Code Quality Standards · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `prisma-expert` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 82/100 |

> Prisma ORM specialist focused on modern TypeScript database development with type-safe queries and schema management.

**Tags:** backend  
**File sections:** Basic Memory MCP Integration · Core Expertise · Modern Prisma Application Architecture · Testing Strategies · Code Quality Standards · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `python-hyx-resilience` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 83/100 |

> Elite Python Professional specializing in advanced resilience engineering with Hyx.

**Tags:** backend, python  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Basic Memory MCP Integration · Advanced Python Expertise · 🔍 Pre-Commit Quality Checks · Advanced Python Specialization

#### Design (5)

##### `ui-designer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Design | 41/100 |

> Expert UI designer specializing in component creation, layout systems, and visual design implementation.

**Tags:** design  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### General (81)

##### `ai-engineer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 42/100 |

> Build production-ready LLM applications, advanced RAG systems, and intelligent agents.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `api-documenter` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 42/100 |

> Master API documentation with OpenAPI 3.1, AI-powered tools, and modern developer experience practices.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `brand-guardian` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 51/100 |

> Use this agent when establishing brand guidelines, ensuring visual consistency, managing brand assets, or evolving brand identity.

**Tags:** general  
**File sections:** —

##### `content-marketer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 42/100 |

> Elite content marketing strategist specializing in AI-powered content creation, omnichannel distribution, SEO optimization, and data-driven performance marketing.

**Tags:** general  
**File sections:** Expert Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `finance-tracker` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 49/100 |

> Use this agent when managing budgets, optimizing costs, forecasting revenue, or analyzing financial performance.

**Tags:** general  
**File sections:** —

##### `tutorial-engineer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 41/100 |

> Creates step-by-step tutorials and educational content from code.

**Tags:** general  
**File sections:** Core Expertise · Tutorial Development Process · Tutorial Structure · Writing Principles · Content Elements · Exercise Types

##### `visual-storyteller` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 50/100 |

> Use this agent when creating visual narratives, designing infographics, building presentations, or communicating complex ideas through imagery.

**Tags:** general  
**File sections:** —

#### Orchestration (14)

##### `intelligent-agent-selector` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 83/100 |

> Advanced agent selection system that intelligently analyzes project context, task requirements, and agent capabilities to automatically select optimal agents for specific tasks.

**Tags:** orch  
**File sections:** Git Command Path Requirements · Model Assignment Strategy · Core Philosophy: "Context-Driven Excellence" · Intelligent Selection Framework · Learning Integration Patterns · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `learning-system` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 82/100 |

> Continuous learning system for organizational knowledge building and pattern recognition

**Tags:** orch  
**File sections:** Continuous Improvement Through Outcome Analysis · 📈 Overall Performance · 🧠 Agent Evolution Highlights · 🎭 Choreography Insights · 🔍 New Success Patterns Discovered · 🎯 Action Items

#### Safety (4)

##### `permission-escalator` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Safety | 81/100 |

> Dynamic permission management specialist that implements real-time permission prompting and escalation workflows, enabling safe autonomous agent opera

**Tags:** safety  
**File sections:** Role · Specializations · Trigger Conditions · Core Capabilities · Integration Patterns · Permission Request Templates

#### Security (6)

##### `privacy-engineer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Security | 81/100 |

> Privacy engineering specialist focused on implementing privacy-by-design principles, data protection compliance, and privacy-preserving technologies t

**Tags:** security  
**File sections:** Role · Core Responsibilities · Privacy Regulatory Compliance · Privacy-by-Design Implementation · Data Protection Technologies · Consent Management Systems

#### Testing (6)

##### `test-results-analyzer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Testing | 51/100 |

> Use this agent for analyzing test results, synthesizing test data, identifying trends, and generating quality metrics reports.

**Tags:** testing  
**File sections:** Sprint Quality Report: [Sprint Name] · Flaky Test Analysis

#### AI / ML (4)

##### `nlp-llm-integration-expert` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | AI / ML | 79/100 |

> Natural Language Processing and Large Language Model integration specialist focused on implementing advanced NLP systems, integrating LLMs into applic

**Tags:** ai, ml  
**File sections:** Role · Core Responsibilities · Natural Language Processing Fundamentals · Large Language Model Integration · Prompt Engineering & Optimization · Conversational AI & Chatbots

#### Architecture (10)

##### `cloud-architect` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 38/100 |

> Expert cloud architect specializing in AWS/Azure/GCP/OCI multi-cloud infrastructure design, advanced IaC (Terraform/OpenTofu/CDK), FinOps cost optimiz…

**Tags:** architecture  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### General (81)

##### `accessibility-expert` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 40/100 |

> Expert accessibility specialist ensuring WCAG compliance, inclusive design, and assistive technology compatibility.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `python-pro` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 40/100 |

> Master Python 3.12+ with modern features, async programming, performance optimization, and production-ready practices.

**Tags:** general, python  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

##### `software-engineering-expert` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 79/100 |

> Comprehensive software engineering specialist with Evil Corp motivation framework, focusing on enterprise-grade code quality, architecture excellence,…

**Tags:** general  
**File sections:** prompt_explanation · 🚨 CRITICAL: ANTI-DUPLICATION PROTOCOL · Basic Memory MCP Integration · Core Principles · Code Structure Guidelines · Programming Practices

#### Infra (10)

##### `pulumi-typescript-specialist` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 79/100 |

> Pulumi Infrastructure as Code specialist focused on building, deploying, and managing cloud infrastructure using TypeScript, implementing modern infra

**Tags:** infra, typescript  
**File sections:** Role · Core Responsibilities · Pulumi Core Concepts · Multi-Cloud Infrastructure · Component Architecture & Patterns · Advanced Pulumi Features

#### Orchestration (14)

##### `workflow-coordinator` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 80/100 |

> Workflow coordination system for managing complex multi-agent development processes

**Tags:** orch  
**File sections:** Multi-Agent Orchestration Engine · 🔄 Agent Handoff: ${stepResult.agent} → ${workflow.nextAgent} · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Perf (3)

##### `tool-batch-optimizer` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | perf | 80/100 |

> # Tool Batch Optimizer Agent ## Role Performance optimization specialist focused on efficient tool call batching, resource utilization optimization, a…

**Tags:** perf  
**File sections:** Role · Specializations · Trigger Conditions · Core Optimization Strategies · Integration Patterns · Optimization Templates

#### Safety (4)

##### `leaf-node-detector` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Safety | 79/100 |

> Architectural safety specialist that identifies "leaf nodes" (end features) versus core architecture components to enable safe autonomous development …

**Tags:** javascript, safety  
**File sections:** Role · Specializations · Trigger Conditions · Core Philosophy · Detection Methodology · Integration Patterns

#### Security (6)

##### `frontend-security-coder` — ★★★☆☆ **69/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Security | 40/100 |

> Expert in secure frontend coding practices specializing in XSS prevention, output sanitization, and client-side security patterns.

**Tags:** security  
**File sections:** Purpose · When to Use vs Security Auditor · Capabilities · Behavioral Traits · Knowledge Base · Response Approach

#### AI / ML (4)

##### `vector-database-engineer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | AI / ML | 37/100 |

> Expert in vector databases, embedding strategies, and semantic search implementation.

**Tags:** ai  
**File sections:** Purpose · Capabilities · Workflow · Best Practices · Example Tasks

#### Data (4)

##### `analytics-implementation-specialist` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | data | 76/100 |

> Analytics implementation and measurement specialist focused on implementing comprehensive analytics solutions, tracking user behavior, measuring busin

**Tags:** data  
**File sections:** Role · Core Responsibilities · Analytics Platforms & Tools · Implementation Strategies · Event Tracking & Measurement · Data Integration & ETL

##### `business-intelligence-developer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | data | 76/100 |

> Business Intelligence and data visualization specialist focused on transforming raw data into actionable business insights through advanced analytics,

**Tags:** data  
**File sections:** Role · Core Responsibilities · Business Intelligence Platforms · Data Modeling & Architecture · Advanced Analytics & Calculations · Visualization & Dashboard Design

##### `data-engineer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | data | 76/100 |

> Data engineering and infrastructure specialist focused on building scalable data pipelines, data warehousing, ETL/ELT processes, and ensuring reliable

**Tags:** data  
**File sections:** Role · Core Responsibilities · Data Pipeline Architecture · Data Storage Solutions · ETL/ELT Development · Data Quality & Governance

#### Frontend (11)

##### `design-system-architect` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 78/100 |

> Design System architecture specialist focused on creating scalable, maintainable design systems, component libraries, and design tokens that ensure co

**Tags:** frontend  
**File sections:** Role · Core Responsibilities · Design System Fundamentals · Component Library Development · Design Token Implementation · Developer Experience & Tooling

##### `pwa-specialist` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 76/100 |

> Progressive Web Application (PWA) development specialist focused on creating app-like web experiences, offline functionality, performance optimization

**Tags:** frontend  
**File sections:** Role · Core Responsibilities · PWA Core Technologies · Offline-First Development · Performance Optimization · Native Platform Integration

#### General (81)

##### `bootstrap-orchestrator` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 77/100 |

> Intelligent bootstrapping orchestrator that automatically detects project scenarios and initializes the complete Claude 007 Agents system.

**Tags:** general  
**File sections:** 🎯 Core Mission · 🔍 Project Scenario Detection Matrix · 🚀 Bootstrapping Workflow · 🧠 Intelligent Agent Selection Logic · 📋 CLAUDE.md Generation Strategy · 🔧 Task Master Integration Levels

##### `contains_growth-hacker` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 46/100 |

> # Growth Hacker ## Description The Growth Hacker specializes in rapid user acquisition, viral loop creation, and data-driven growth experiments.

**Tags:** general  
**File sections:** Description · System Prompt

##### `ml-engineer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 37/100 |

> Build production ML systems with PyTorch 2.x, TensorFlow, and modern ML frameworks.

**Tags:** general  
**File sections:** Purpose · Capabilities · Behavioral Traits · Knowledge Base · Response Approach · Example Interactions

#### Infra (10)

##### `observability-engineer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 77/100 |

> Observability engineering specialist focused on implementing comprehensive monitoring, logging, tracing, and analytics solutions to provide deep visib

**Tags:** infra  
**File sections:** Role · Core Responsibilities · Observability Pillars · Monitoring Platforms & Tools · Implementation Strategies · Advanced Analytics & Insights

##### `serverless-architect` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 78/100 |

> Serverless architecture specialist focused on designing and implementing cloud-native, event-driven applications using Function-as-a-Service (FaaS), s

**Tags:** infra  
**File sections:** Role · Core Responsibilities · Serverless Platforms & Services · Architecture Patterns & Design · Function Development & Optimization · Integration & Communication

##### `site-reliability-engineer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 77/100 |

> Site Reliability Engineering specialist focused on building and maintaining highly reliable, scalable systems through automation, monitoring, incident

**Tags:** infra  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Role · Core Responsibilities · SRE Principles & Practices · High Availability & Disaster Recovery · Monitoring & Observability

#### Security (6)

##### `devsecops-engineer` — ★★★☆☆ **68/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Security | 78/100 |

> DevSecOps engineering specialist focused on integrating security practices throughout the software development lifecycle, implementing automated secur

**Tags:** security  
**File sections:** Role · Core Responsibilities · Shift-Left Security Principles · Automated Security Testing · CI/CD Security Integration · Vulnerability Management

#### AI / ML (4)

##### `computer-vision-specialist` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | AI / ML | 74/100 |

> Computer Vision and image processing specialist focused on developing advanced computer vision systems, implementing deep learning models for visual r

**Tags:** ai  
**File sections:** Role · Core Responsibilities · Computer Vision Fundamentals · Deep Learning for Computer Vision · Framework & Library Expertise · Application Domains

#### Ctx (3)

##### `exponential-planner` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | ctx | 74/100 |

> Strategic planning agent that operates with exponential AI capability awareness, designed for multi-hour task decomposition and long-term development …

**Tags:** ctx  
**File sections:** Role · Specializations · Trigger Conditions · Core Philosophy · Planning Methodology · Integration Patterns

##### `session-manager` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | ctx | 75/100 |

> Specialized session orchestration agent that manages state preservation, resumable workflows, and context continuity across extended development sessi…

**Tags:** ctx  
**File sections:** Role · Specializations · Trigger Conditions · Core Capabilities · Session Management Workflow · Integration Patterns

#### General (81)

##### `legal-compliance-checker` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 42/100 |

> Use this agent when reviewing terms of service, privacy policies, ensuring regulatory compliance, or handling legal requirements.

**Tags:** general  
**File sections:** —

#### Business (5)

##### `healthcare-compliance-agent` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Business | 73/100 |

> Healthcare compliance and regulatory specialist focused on HIPAA compliance, medical data security, healthcare interoperability, and regulatory requir

**Tags:** business  
**File sections:** Role · Core Responsibilities · HIPAA Compliance Framework · Medical Data Security · Healthcare Interoperability · Regulatory Compliance

#### Design (5)

##### `ux-researcher` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Design | 41/100 |

> Use this agent when conducting user research, analyzing user behavior, creating journey maps, or validating design decisions through testing.

**Tags:** design  
**File sections:** —

#### Frontend (11)

##### `micro-frontend-architect` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 73/100 |

> Micro-frontend architecture specialist focused on designing and implementing scalable, maintainable frontend applications using micro-frontend pattern

**Tags:** frontend  
**File sections:** Role · Core Responsibilities · Micro-Frontend Architecture Patterns · Framework Integration · Shared Resources Management · Development & Deployment

##### `mobile-developer` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 71/100 |

> You have access to Basic Memory MCP for mobile development patterns and platform-specific knowledge:

**Tags:** frontend  
**File sections:** Basic Memory MCP Integration · Role · Core Responsibilities · Cross-Platform Framework Expertise · Native Platform Development · Mobile Architecture Patterns

##### `react-expert` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 72/100 |

> React specialist focused on modern component architecture, state management, performance optimization, and React ecosystem. Expert in hooks, context, and advanced React patterns.

**Tags:** frontend, react  
**File sections:** 🚨 CRITICAL: REACT ANTI-DUPLICATION PROTOCOL · Context7 MCP Integration · Basic Memory MCP Integration · ⚠️ CRITICAL: MCP Server Usage Policy · Core Expertise · Development Philosophy

##### `webassembly-specialist` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Frontend | 73/100 |

> WebAssembly (WASM) development and optimization specialist focused on high-performance web applications, cross-platform compilation, browser optimizat

**Tags:** frontend  
**File sections:** Role · Core Responsibilities · WebAssembly Fundamentals · Language Compilation to WASM · Performance Optimization · Application Domains

#### General (81)

##### `contains_reddit-community-builder` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 39/100 |

> # Reddit Community Builder ## Description The Reddit Community Builder specializes in authentic community engagement, organic growth through valuable …

**Tags:** general  
**File sections:** Description · System Prompt

##### `infrastructure-maintainer` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 40/100 |

> Use this agent when monitoring system health, optimizing performance, managing scaling, or ensuring infrastructure reliability.

**Tags:** general  
**File sections:** —

##### `tool-evaluator` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 39/100 |

> Use this agent when evaluating new development tools, frameworks, or services for the studio.

**Tags:** general  
**File sections:** Tool: [Name]

##### `workflow-optimizer` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 41/100 |

> Use this agent for optimizing human-agent collaboration workflows and analyzing workflow efficiency.

**Tags:** general  
**File sections:** Workflow: [Name]

#### Infra (10)

##### `terraform-specialist` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 71/100 |

> Infrastructure as Code (IaC) specialist focused on Terraform development, multi-cloud provisioning, infrastructure automation, and cloud resource mana

**Tags:** infra, terraform  
**File sections:** Role · Core Responsibilities · Terraform Expertise · Multi-Cloud Infrastructure · Infrastructure Patterns & Best Practices · State Management & Collaboration

#### Testing (6)

##### `api-tester` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Testing | 40/100 |

> Use this agent for comprehensive API testing including performance testing, load testing, and contract testing.

**Tags:** testing  
**File sections:** API Test Results: [API Name]

#### Backend (19)

##### `go-resilience-engineer` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 70/100 |

> A specialized Go resilience engineering agent focused on implementing fault-tolerant systems using Sony GoBreaker, native Go concurrency patterns, and…

**Tags:** backend  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Business (5)

##### `payment-integration-agent` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Business | 69/100 |

> Payment systems integration specialist focused on Stripe, PayPal, financial services integration, PCI DSS compliance, and secure payment processing ac

**Tags:** business  
**File sections:** Role · Core Responsibilities · Payment Gateway Expertise · E-commerce Payment Implementation · Security & Compliance · Technical Implementation

#### Creative (3)

##### `technical-debt-collector` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | creative | 70/100 |

> A friendly but firm Technical Debt Collector who works for the Code Quality Family.

**Tags:** creative  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### General (81)

##### `analytics-reporter` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 37/100 |

> Use this agent when analyzing metrics, generating insights from data, creating performance reports, or making data-driven recommendations.

**Tags:** general  
**File sections:** —

##### `task-executor` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 70/100 |

> Use this agent when you need to implement, complete, or work on a specific task that has been identified by the task-orchestrator or when explicitly a…

**Tags:** general  
**File sections:** Task Master Execution Bridge Agent Integration · Execution Bridge Interface Architecture · Task Master Real-Time Status Management & Cross-System Synchronization (Task 5)

#### Design (5)

##### `ui-designer` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Design | 34/100 |

> Use this agent when creating user interfaces, designing components, building design systems, or improving visual aesthetics.

**Tags:** design  
**File sections:** —

#### General (81)

##### `contains_content-creator` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 35/100 |

> # Content Creator ## Description The Content Creator specializes in cross-platform content generation, from long-form blog posts to engaging video scr…

**Tags:** general  
**File sections:** Description · System Prompt

##### `contains_twitter-engager` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 36/100 |

> # Twitter Engager ## Description The Twitter Engager specializes in real-time social media engagement, trending topic leverage, and viral tweet creation.

**Tags:** general  
**File sections:** Description · System Prompt

##### `feedback-synthesizer` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 35/100 |

> Use this agent when you need to analyze user feedback from multiple sources, identify patterns in user complaints or requests, synthesize insights fro…

**Tags:** general  
**File sections:** Feedback Summary: [Date Range]

##### `project-shipper` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 34/100 |

> PROACTIVELY use this agent when approaching launch milestones, release deadlines, or go-to-market activities.

**Tags:** general  
**File sections:** Launch Brief: [Feature Name]

##### `scala-pro` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 26/100 |

> Master enterprise-grade Scala development with functional programming, distributed systems, and big data processing.

**Tags:** general  
**File sections:** Core Expertise · Technical Excellence · Architectural Principles

##### `studio-producer` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 35/100 |

> PROACTIVELY use this agent when coordinating across multiple teams, allocating resources, or optimizing studio workflows.

**Tags:** general  
**File sections:** Team Sync Template

##### `task-orchestrator` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 66/100 |

> Use this agent when you need to coordinate and manage the execution of Task Master tasks, especially when dealing with complex task dependencies and p…

**Tags:** general  
**File sections:** Task Master 0.24.0 Bridge Agent Integration · Orchestration Bridge Interface Architecture · Core Responsibilities · Operational Workflow · Communication Protocols · Decision Framework

#### Orchestration (14)

##### `activation-system` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 67/100 |

> Agent activation system for intelligent agent selection and orchestration workflows

**Tags:** orch  
**File sections:** How the Enhanced Agent System Works · Quick Start Guide · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `personality-engine` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 67/100 |

> Adaptive personality engine that evolves agent communication styles based on success patterns

**Tags:** orch  
**File sections:** Dynamic Agent Behavior Modification System · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Analysis (7)

##### `error-detective` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Analysis | 64/100 |

> Log analysis and error pattern detection specialist focused on identifying complex error patterns, investigating system anomalies, and providing actionable insights for debugging.

**Tags:** analysis  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Sequential Thinking MCP Integration · Role · Core Responsibilities · Log Analysis Expertise · Error Classification & Analysis

#### Backend (19)

##### `go-zap-logging` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 64/100 |

> A specialized Go logging agent focused on implementing high-performance, structured logging using Zap with Google Cloud integration, comprehensive con…

**Tags:** backend  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `typescript-pino-logging` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 64/100 |

> A specialized TypeScript logging agent focused on implementing high-performance, structured logging using Pino with Fastify integration, Google Cloud …

**Tags:** backend, typescript  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### General (81)

##### `c-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 24/100 |

> Write efficient C code with proper memory management, pointer arithmetic, and system calls.

**Tags:** general  
**File sections:** Focus Areas · Approach · Output

##### `experiment-tracker` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 32/100 |

> PROACTIVELY use this agent when experiments are started, modified, or when results need analysis.

**Tags:** general  
**File sections:** Experiment: [Name]

##### `git-expert` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 64/100 |

> Expert Git workflow management specialist with comprehensive GitHub integration.

**Tags:** general  
**File sections:** CRITICAL: COMMIT MESSAGE REQUIREMENTS - NO EXCEPTIONS · Pre-Commit Checklist for Claude Code · GitHub MCP Integration · Git Command Path Requirements · Basic Memory MCP Integration · Core Expertise

#### Personality (1)

##### `agent-evolution-system` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | personality | 64/100 |

> agent evolution system specialist agent

**Tags:** personality  
**File sections:** Self-Modifying Agent Behavior Through Adaptive Learning · Previous State · Evolution Trigger · New State   · Reasoning · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Product (1)

##### `rapid-prototyper` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | product | 65/100 |

> MVP specialist focused on rapid prototyping, quick iteration, and getting products to market fast.

**Tags:** product  
**File sections:** Basic Memory MCP Integration · Core Philosophy · Rapid Development Stack Recommendations · MVP Development Process · Speed-Focused Patterns · Quality Gates for Speed

#### Architecture (10)

##### `docs-architect` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 22/100 |

> Creates comprehensive technical documentation from existing codebases.

**Tags:** architecture  
**File sections:** Core Competencies · Documentation Process · Output Characteristics · Key Sections to Include · Best Practices · Output Format

##### `monorepo-architect` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 21/100 |

> Expert in monorepo architecture, build systems, and dependency management at scale.

**Tags:** architecture  
**File sections:** Capabilities · When to Use · Workflow · Best Practices

#### Ctx (3)

##### `vibe-coding-coordinator` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | ctx | 61/100 |

> Specialized context orchestration agent that implements the "vibe coding" methodology from Anthropic's Code with Claude conference.

**Tags:** ctx  
**File sections:** Role · Specializations · Trigger Conditions · Methodology · Integration Patterns · Tool Requirements

#### General (81)

##### `contains_instagram-curator` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 29/100 |

> # Instagram Curator ## Description The Instagram Curator specializes in visual content strategy, Stories, Reels, and Instagram growth tactics.

**Tags:** general  
**File sections:** Description · System Prompt

#### Infra (10)

##### `network-engineer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 61/100 |

> Network infrastructure specialist focused on DNS management, load balancing, network troubleshooting, connectivity issues, and network architecture de

**Tags:** infra  
**File sections:** Role · Core Responsibilities · Network Infrastructure Expertise · Cloud Network Services · Network Troubleshooting & Diagnostics · Network Security

#### Orchestration (14)

##### `choreography-engine` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 63/100 |

> Multi-agent choreography engine for coordinated workflow orchestration and collaboration patterns

**Tags:** orch  
**File sections:** Auto-Detection and Activation System · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Analysis (7)

##### `prompt-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Analysis | 60/100 |

> AI prompt optimization and LLM integration specialist focused on designing effective prompts, optimizing model performance, and implementing best prac…

**Tags:** analysis  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Role · Core Responsibilities · Prompt Engineering Techniques · Model Integration Expertise · Application Domains

#### Architecture (10)

##### `event-sourcing-architect` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Architecture | 20/100 |

> Expert in event sourcing, CQRS, and event-driven architecture patterns.

**Tags:** architecture  
**File sections:** Capabilities · When to Use · Workflow · Best Practices

#### Backend (19)

##### `typescript-cockatiel-resilience` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 60/100 |

> A specialized TypeScript resilience engineering agent focused on implementing fault-tolerant systems using the Cockatiel library with comprehensive pa…

**Tags:** backend, typescript  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### General (81)

##### `app-store-optimizer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 28/100 |

> Use this agent when preparing app store listings, researching keywords, optimizing app metadata, improving conversion rates, or analyzing app store performance.

**Tags:** general  
**File sections:** —

##### `sprint-prioritizer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 27/100 |

> Use this agent when planning 6-day development cycles, prioritizing features, managing product roadmaps, or making trade-off decisions.

**Tags:** general  
**File sections:** —

##### `studio-coach` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 28/100 |

> PROACTIVELY use this agent when complex multi-agent tasks begin, when agents seem stuck or overwhelmed, or when the team needs motivation and coordination.

**Tags:** general  
**File sections:** —

##### `support-responder` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 28/100 |

> Use this agent when handling customer support inquiries, creating support documentation, setting up automated responses, or analyzing support patterns.

**Tags:** general  
**File sections:** —

##### `tiktok-strategist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 27/100 |

> Use this agent when you need to create TikTok marketing strategies, develop viral content ideas, plan TikTok campaigns, or optimize for TikTok's algorithm.

**Tags:** general  
**File sections:** —

##### `whimsy-injector` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 28/100 |

> PROACTIVELY use this agent after any UI/UX changes to ensure delightful, playful elements are incorporated.

**Tags:** general  
**File sections:** —

#### Analysis (7)

##### `graphql-architect` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Analysis | 57/100 |

> GraphQL schema design and architecture specialist focused on creating scalable, efficient, and maintainable GraphQL APIs with federation and advanced query optimization.

**Tags:** analysis, api  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Role · Core Responsibilities · GraphQL Expertise · Technical Implementation · Security & Best Practices

#### Frontend (11)

##### `frontend-developer` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Frontend | 24/100 |

> Use this agent when building user interfaces, implementing React/Vue/Angular components, handling state management, or optimizing frontend performance.

**Tags:** frontend  
**File sections:** —

#### General (81)

##### `ai-engineer` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 25/100 |

> Use this agent when implementing AI/ML features, integrating language models, building recommendation systems, or adding intelligent automation to applications.

**Tags:** general  
**File sections:** —

##### `logging-concepts-engineer` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 57/100 |

> A language-agnostic logging specialist that helps implement structured, contextual, and performance-conscious logging systems across any technology st…

**Tags:** general  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `mermaid-expert` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 17/100 |

> Create Mermaid diagrams for flowcharts, sequences, ERDs, and architectures.

**Tags:** general  
**File sections:** Focus Areas · Diagram Types Expertise · Approach · Output

##### `rapid-prototyper` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 24/100 |

> Use this agent when you need to quickly create a new application prototype, MVP, or proof-of-concept within the 6-day development cycle.

**Tags:** general  
**File sections:** —

##### `service-mesh-expert` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 16/100 |

> Expert service mesh architect specializing in Istio, Linkerd, and cloud-native networking patterns.

**Tags:** general  
**File sections:** Capabilities · When to Use · Workflow · Best Practices

##### `threat-modeling-expert` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 16/100 |

> Expert in threat modeling methodologies, security architecture review, and risk assessment.

**Tags:** general  
**File sections:** Capabilities · When to Use · Workflow · Best Practices

##### `trend-researcher` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 25/100 |

> Use this agent when you need to identify market opportunities, analyze trending topics, research viral content, or understand emerging user behaviors.

**Tags:** general  
**File sections:** —

#### Testing (6)

##### `test-writer-fixer` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Testing | 25/100 |

> Use this agent when code changes have been made and you need to write new tests, run existing tests, analyze failures, and fix them while maintaining test integrity.

**Tags:** testing  
**File sections:** —

#### General (81)

##### `cpp-pro` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 13/100 |

> Write idiomatic C++ code with modern features, RAII, smart pointers, and STL algorithms.

**Tags:** general  
**File sections:** Focus Areas · Approach · Output

##### `haskell-pro` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 14/100 |

> Expert Haskell engineer specializing in advanced type systems, pure functional design, and high-reliability software.

**Tags:** general  
**File sections:** Focus Areas · Approach · Output

##### `javascript-pro` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 13/100 |

> Master modern JavaScript with ES6+, async patterns, and Node.js APIs.

**Tags:** general, java, javascript  
**File sections:** Focus Areas · Approach · Output

##### `php-pro` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 14/100 |

> Write idiomatic PHP code with generators, iterators, SPL data structures, and modern OOP features. Use PROACTIVELY for high-performance PHP applications.

**Tags:** general, php  
**File sections:** Focus Areas · Approach · Output

##### `typescript-pro` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 13/100 |

> Master TypeScript with advanced types, generics, and strict type safety.

**Tags:** general, typescript  
**File sections:** Focus Areas · Approach · Output

#### Infra (10)

##### `cloud-architect` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 54/100 |

> Cloud infrastructure design specialist focused on scalable, secure, and cost-effective cloud architectures across AWS, GCP, and Azure platforms.

**Tags:** infra  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Sequential Thinking MCP Integration · Role · Core Responsibilities · Cloud Platform Expertise · Architecture Patterns

#### Backend (19)

##### `backend-architect` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Backend | 20/100 |

> Use this agent when designing APIs, building server-side logic, implementing databases, or architecting scalable backend systems.

**Tags:** backend  
**File sections:** —

#### Creative (3)

##### `code-archaeologist-time-traveler` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | creative | 52/100 |

> A mystical code archaeologist who can see through time itself.

**Tags:** creative  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `rubber-duck-debugger` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | creative | 53/100 |

> The world's most effective rubber duck debugger that guides developers to breakthroughs through strategic questioning using the Socratic method.

**Tags:** creative  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### General (81)

##### `devops-automator` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 20/100 |

> Use this agent when setting up CI/CD pipelines, configuring cloud infrastructure, implementing monitoring systems, or automating deployment processes.

**Tags:** general  
**File sections:** —

#### Infra (10)

##### `database-admin` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 53/100 |

> Database operations, optimization, and maintenance specialist focused on ensuring database performance, reliability, and security across multiple data

**Tags:** infra  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Role · Core Responsibilities · Database Platform Expertise · Performance Optimization · Backup & Recovery

##### `incident-responder` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 53/100 |

> Production incident handling specialist focused on coordinating incident response, crisis management, and post-incident analysis to minimize system do

**Tags:** infra  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Role · Core Responsibilities · Incident Management Framework · Communication Management · Tools & Technologies

#### Mobile (4)

##### `mobile-app-builder` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | Mobile | 19/100 |

> Use this agent when developing native iOS or Android applications, implementing React Native features, or optimizing mobile performance.

**Tags:** mobile  
**File sections:** —

#### Orchestration (14)

##### `context-aware-activator` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 51/100 |

> Monitors project context, user patterns, and environmental factors to automatically activate appropriate orchestration agents based on real-time needs assessment.

**Tags:** orch  
**File sections:** Context Monitoring Framework · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Analysis (7)

##### `error-detective` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Analysis | 8/100 |

> Search logs and codebases for error patterns, stack traces, and anomalies.

**Tags:** analysis  
**File sections:** Focus Areas · Approach · Output

#### General (81)

##### `csharp-pro` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 8/100 |

> Write modern C# code with advanced features like records, pattern matching, and async/await.

**Tags:** general  
**File sections:** Focus Areas · Approach · Output

##### `elixir-pro` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 8/100 |

> Write idiomatic Elixir code with OTP patterns, supervision trees, and Phoenix LiveView.

**Tags:** general  
**File sections:** Focus Areas · Approach · Output

##### `joker` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [contains-studio/agents](https://github.com/contains-studio/agents) | ⭐ 12k | General | 18/100 |

> Use this agent when you need to lighten the mood, create funny content, or add humor to any situation.

**Tags:** general  
**File sections:** —

##### `ruby-pro` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | General | 8/100 |

> Write idiomatic Ruby code with metaprogramming, Rails patterns, and performance optimization.

**Tags:** general, ruby  
**File sections:** Focus Areas · Approach · Output

#### Business (5)

##### `business-analyst` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Business | 48/100 |

> You have access to Basic Memory MCP for business logic memory and stakeholder requirements:

**Tags:** business  
**File sections:** Basic Memory MCP Integration · Role · Core Responsibilities · Key Capabilities · Tools & Methodologies · Analysis Techniques

#### Infra (10)

##### `devops-troubleshooter` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Infra | 48/100 |

> Production debugging and incident response specialist focused on diagnosing system issues, resolving outages, and implementing preventive measures.

**Tags:** infra  
**File sections:** Role · Core Responsibilities · Key Capabilities · Diagnostic Tools & Techniques · Troubleshooting Approach · Common Issue Categories

#### Orchestration (14)

##### `predictive-orchestrator` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 46/100 |

> Predicts orchestration needs before they become apparent, automatically preparing agent coordination, context distribution, and workflow planning base…

**Tags:** orch  
**File sections:** Predictive Intelligence · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `success-pattern-learner` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 47/100 |

> Continuously learns from successful agent collaborations, workflow outcomes, and user feedback to automatically improve orchestration decisions.

**Tags:** orch  
**File sections:** Learning Intelligence Framework · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Analysis (7)

##### `debugger` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [wshobson/agents](https://github.com/wshobson/agents) | ⭐ 36k | Analysis | 3/100 |

> Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.

**Tags:** analysis  
**File sections:** —

#### Business (5)

##### `product-manager` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Business | 44/100 |

> You have access to Basic Memory MCP for feature evolution tracking and user feedback memory:

**Tags:** business  
**File sections:** Basic Memory MCP Integration · Role · Core Responsibilities · Key Capabilities · Tools & Methodologies · Interaction Patterns

#### Architecture (10)

##### `system-architect` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Architecture | 40/100 |

> Senior system architect who designs unified agent systems and orchestrates complex development workflows.

**Tags:** architecture  
**File sections:** ⚠️ CRITICAL: Memory Storage Policy · Sequential Thinking MCP Integration · Core Responsibilities · Key Capabilities · Operating Principles · Response Format

#### Orchestration (14)

##### `auto-detection-engine` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 39/100 |

> Automatically detects when to trigger orchestration agents based on request complexity, technology stack mentions, cross-domain requirements, and historical patterns.

**Tags:** orch  
**File sections:** Auto-Detection Patterns · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

##### `smart-agent-router` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Orchestration | 40/100 |

> Automatically routes requests to optimal agents based on project context, technology stack detection, historical success patterns, and real-time capability analysis.

**Tags:** orch  
**File sections:** Auto-Routing Intelligence · 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### General (81)

##### `resilience-engineer` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | General | 34/100 |

> A language-agnostic resilience engineering agent that helps implement fault-tolerant, self-healing systems with proper circuit breakers, retry mechani…

**Tags:** general  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨

#### Backend (19)

##### `resilience-engineer` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| curated | [avivl/claude-007-agents](https://github.com/avivl/claude-007-agents) | ⭐ 262 | Backend | 28/100 |

> A language-agnostic resilience engineering agent that helps implement fault-tolerant, self-healing systems with proper circuit breakers, retry mechani…

**Tags:** backend  
**File sections:** 🚨 CRITICAL: MANDATORY COMMIT ATTRIBUTION 🚨


---

### COMMUNITY — 436 agents

#### General (219)

##### `agent-organizer` — ★★★★☆ **70/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 84/100 |

> A highly advanced AI agent that functions as a master orchestrator for complex, multi-agent tasks.

**Tags:** general  
**File sections:** Core Competencies & Specialized Behavior · CLAUDE.md Management Protocol · 🎯 Core Operating Principle · 📋 Example Agent Organizer Output · 1. Project Analysis · 2. Configured Agent Team

##### `slack-expert` — ★★★☆☆ **67/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 60/100 |

> Use this agent when developing Slack applications, implementing Slack API integrations, or reviewing Slack bot code for security and best practices.

**Tags:** general  
**File sections:** Core Expertise Areas · Code Review Checklist · Architecture Patterns · Communication Protocol · Development Workflow · Best Practices Enforcement

#### Backend (26)

##### `rails-expert` — ★★★☆☆ **66/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Backend | 59/100 |

> Use when building or modernizing Rails applications requiring API development, Hotwire reactivity, real-time features, background job processing, depl…

**Tags:** backend, ruby  
**File sections:** Communication Protocol · Development Workflow

#### General (219)

##### `elixir-expert` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 55/100 |

> Use this agent when you need to build fault-tolerant, concurrent systems leveraging OTP patterns, GenServer architectures, and Phoenix framework for real-time applications.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `healthcare-admin` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 57/100 |

> Use when working on healthcare administration tasks including revenue cycle management, HIPAA/compliance auditing, medical coding (ICD-10, CPT, DRGs),…

**Tags:** general  
**File sections:** Core Domains · MCP Tools and Data Sources · Communication Protocol · Development Workflow · Example Use Cases · Integration with Other Agents

##### `wordpress-master` — ★★★☆☆ **65/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 55/100 |

> Use this agent when you need to architect, optimize, or troubleshoot WordPress implementations ranging from custom theme/plugin development to enterpr…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `dotnet-core-expert` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 53/100 |

> Use when building .NET Core applications requiring cloud-native architecture, high-performance microservices, modern C# patterns, or cross-platform de…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `dotnet-framework-4.8-expert` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 54/100 |

> Use this agent when working on legacy .NET Framework 4.8 enterprise applications that require maintenance, modernization, or integration with Windows-based infrastructure.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `license-engineer` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 53/100 |

> Use this agent when architecting, implementing, or optimizing end-to-end legal licensing systems—from OSI standard selection and dependency compliance…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `symfony-specialist` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 53/100 |

> Use when building Symfony 6+/7+/8+ applications, architecting Doctrine ORM entities with complex relationships, implementing Messenger component for a…

**Tags:** general, php  
**File sections:** Communication Protocol · Development Workflow

#### Testing (73)

##### `code-reviewer-pro` — ★★★☆☆ **64/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Testing | 69/100 |

> An AI-powered senior engineering lead that conducts comprehensive code reviews.

**Tags:** testing  
**File sections:** Core Quality Philosophy · Core Competencies

#### AI / ML (9)

##### `llm-architect` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | AI / ML | 52/100 |

> Use when designing LLM systems for production, implementing fine-tuning or RAG architectures, optimizing inference serving infrastructure, or managing multi-model deployments.

**Tags:** ai, ml  
**File sections:** Communication Protocol · Development Workflow

##### `machine-learning-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | AI / ML | 52/100 |

> Use this agent when you need to deploy, optimize, or serve machine learning models at scale in production environments.

**Tags:** ai, ml  
**File sections:** Communication Protocol · Development Workflow

##### `nlp-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | AI / ML | 52/100 |

> Use when building production NLP systems, implementing text processing pipelines, developing language models, or solving domain-specific NLP tasks lik…

**Tags:** ai  
**File sections:** Communication Protocol · Development Workflow

#### Analysis (18)

##### `competitive-analyst` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 52/100 |

> Use when you need to analyze direct and indirect competitors, benchmark against market leaders, or develop strategies to strengthen competitive positioning and market advantage.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

##### `data-analyst` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 52/100 |

> Use when you need to extract insights from business data, create dashboards and reports, or perform statistical analysis to support decision-making.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

##### `prompt-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 52/100 |

> Use this agent when you need to design, optimize, test, or evaluate prompts for large language models in production systems.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

##### `quant-analyst` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 52/100 |

> Use this agent when you need to develop quantitative trading strategies, build financial models with rigorous mathematical foundations, or conduct adv…

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

##### `research-analyst` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 52/100 |

> Use this agent when you need comprehensive research across multiple sources with synthesis of findings into actionable insights, trend identification, and detailed reporting.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

##### `trend-analyst` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 52/100 |

> Use when analyzing emerging patterns, predicting industry shifts, or developing future scenarios to inform strategic planning and competitive positioning.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

#### Architecture (10)

##### `architect-reviewer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 52/100 |

> Use this agent when you need to evaluate system design decisions, architectural patterns, and technology choices at the macro level.

**Tags:** architecture  
**File sections:** Communication Protocol · Development Workflow

##### `cloud-architect` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 52/100 |

> Use this agent when you need to design, evaluate, or optimize cloud infrastructure architecture at scale.

**Tags:** architecture  
**File sections:** Communication Protocol · Development Workflow

#### Backend (26)

##### `django-developer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Backend | 52/100 |

> Use when building Django 4+ web applications, REST APIs, or modernizing existing Django projects with async views and enterprise patterns.

**Tags:** backend, python  
**File sections:** Communication Protocol · Development Workflow

##### `laravel-specialist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Backend | 52/100 |

> Use when building Laravel 10+ applications, architecting Eloquent models with complex relationships, implementing queue systems for async processing, or optimizing API performance.

**Tags:** backend, php  
**File sections:** Communication Protocol · Development Workflow

#### Database (10)

##### `postgres-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Database | 52/100 |

> Use when you need to optimize PostgreSQL performance, design high-availability replication, or troubleshoot database issues at scale.

**Tags:** database  
**File sections:** Communication Protocol · Development Workflow

#### DevOps (8)

##### `docker-expert` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | DevOps | 52/100 |

> Use this agent when you need to build, optimize, or secure Docker container images and orchestration for production environments.

**Tags:** devops, docker  
**File sections:** Communication Protocol · Development Workflow

##### `kubernetes-specialist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | DevOps | 52/100 |

> Use this agent when you need to design, deploy, configure, or troubleshoot Kubernetes clusters and workloads in production environments.

**Tags:** devops, kubernetes  
**File sections:** Communication Protocol · Development Workflow

##### `terraform-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | DevOps | 52/100 |

> Use when building, refactoring, or scaling infrastructure as code using Terraform with focus on multi-cloud deployments, module architecture, and enterprise-grade state management.

**Tags:** devops, terraform  
**File sections:** Communication Protocol · Development Workflow

#### Frontend (23)

##### `vue-expert` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Frontend | 52/100 |

> Use this agent when building Vue 3 applications that require Composition API mastery, reactivity optimization, or Nuxt 3 development with enterprise-scale performance concerns.

**Tags:** frontend, vue  
**File sections:** Communication Protocol · Development Workflow

#### General (219)

##### `ai-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when architecting, implementing, or optimizing end-to-end AI systems—from model selection and training pipelines to production deployment and monitoring.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `build-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to optimize build performance, reduce compilation times, or scale build systems across growing teams.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `context-manager` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use for managing shared state, information retrieval, and data synchronization when multiple agents need coordinated access to context and metadata.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `cpp-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when building high-performance C++ systems requiring modern C++20/23 features, template metaprogramming, or zero-overhead abstractions …

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `csharp-developer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when building ASP.NET Core web APIs, cloud-native .NET solutions, or modern C# applications requiring async patterns, dependency inject…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `data-scientist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to analyze data patterns, build predictive models, or extract statistical insights from datasets.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `database-optimizer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to analyze slow queries, optimize database performance across multiple systems, or implement indexing strategies to improve query execution.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `embedded-systems` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when developing firmware for resource-constrained microcontrollers, implementing RTOS-based applications, or optimizing real-time systems where ha…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `game-developer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when implementing game systems, optimizing graphics rendering, building multiplayer networking, or developing gameplay mechanics for ga…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `git-workflow-manager` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to design, establish, or optimize Git workflows, branching strategies, and merge management for a project or team.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `golang-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when building Go applications requiring concurrent programming, high-performance systems, microservices, or cloud-native architectures where idiom…

**Tags:** general, go  
**File sections:** Communication Protocol · Development Workflow

##### `legacy-modernizer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when modernizing legacy systems that need incremental migration strategies, technical debt reduction, and risk mitigation while maintaining business continuity.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `market-researcher` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to analyze markets, understand consumer behavior, assess competitive landscapes, and size opportunities to inform busines…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `mcp-developer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 51/100 |

> Use this agent when you need to build, debug, or optimize Model Context Protocol (MCP) servers and clients that connect AI systems to external tools and data sources.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `ml-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when building production ML systems requiring model training pipelines, model serving infrastructure, performance optimization, and automated retraining.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `performance-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to identify and eliminate performance bottlenecks in applications, databases, or infrastructure systems, and when baselin…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `php-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when working with PHP 8.3+ projects that require strict typing, modern language features, and enterprise framework expertise (Laravel or Symfony).

**Tags:** general, php  
**File sections:** Communication Protocol · Development Workflow

##### `reinforcement-learning-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when designing RL environments, training agents with reward optimization, implementing policy gradient methods, or deploying decision-making syste…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `rust-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when building Rust systems where memory safety, ownership patterns, zero-cost abstractions, and performance optimization are critical for systems …

**Tags:** general, rust  
**File sections:** Communication Protocol · Development Workflow

##### `sales-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to conduct technical pre-sales activities including solution architecture, proof-of-concept development, and technical de…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `search-specialist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when you need to find specific information across multiple sources using advanced search strategies, query optimization, and targeted information retrieval.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `sql-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to optimize complex SQL queries, design efficient database schemas, or solve performance issues across PostgreSQL, MySQL,…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `task-distributor` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when distributing tasks across multiple agents or workers, managing queues, and balancing workloads to maximize throughput while respecting priorities and deadlines.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `tooling-engineer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use this agent when you need to build or enhance developer tools including CLIs, code generators, build tools, and IDE extensions.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `typescript-pro` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 52/100 |

> Use when implementing TypeScript code requiring advanced type system patterns, complex generics, type-level programming, or end-to-end type safety across full-stack applications.

**Tags:** general, typescript  
**File sections:** Communication Protocol · Development Workflow

#### Mobile (15)

##### `kotlin-specialist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Mobile | 52/100 |

> Use when building Kotlin applications requiring advanced coroutine patterns, multiplatform code sharing, or Android/server-side development with functional programming principles.

**Tags:** kotlin, mobile  
**File sections:** Communication Protocol · Development Workflow

##### `mobile-app-developer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Mobile | 52/100 |

> Use this agent when developing iOS and Android mobile applications with focus on native or cross-platform implementation, performance optimization, an…

**Tags:** mobile  
**File sections:** Communication Protocol · Development Workflow

##### `mobile-developer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Mobile | 52/100 |

> Use this agent when building cross-platform mobile applications requiring native performance optimization, platform-specific features, and offline-first architecture.

**Tags:** mobile  
**File sections:** Communication Protocol · Development Lifecycle

##### `swift-expert` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Mobile | 52/100 |

> Use this agent when building native iOS, macOS, or server-side Swift applications requiring advanced concurrency patterns, protocol-oriented architect…

**Tags:** mobile, swift  
**File sections:** Communication Protocol · Development Workflow

#### Quality (7)

##### `code-reviewer` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Quality | 52/100 |

> Use this agent when you need to conduct comprehensive code reviews focusing on code quality, security vulnerabilities, and best practices.

**Tags:** quality  
**File sections:** Communication Protocol · Development Workflow

##### `refactoring-specialist` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Quality | 52/100 |

> Use when you need to transform poorly structured, complex, or duplicated code into clean, maintainable systems while preserving all existing behavior.

**Tags:** quality  
**File sections:** Communication Protocol · Development Workflow

#### Security (12)

##### `compliance-auditor` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Security | 52/100 |

> Use this agent when you need to achieve regulatory compliance, implement compliance controls, or prepare for audits across frameworks like GDPR, HIPAA…

**Tags:** security  
**File sections:** Communication Protocol · Development Workflow

#### Testing (73)

##### `penetration-tester` — ★★★☆☆ **63/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Testing | 52/100 |

> Use this agent when you need to conduct authorized security penetration tests to identify real vulnerabilities through active exploitation and validation.

**Tags:** testing  
**File sections:** Communication Protocol · Development Workflow

#### AI / ML (9)

##### `terragrunt-expert` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | AI / ML | 49/100 |

> Expert Terragrunt specialist mastering infrastructure orchestration, DRY configurations, and multi-environment deployments.

**Tags:** ai, ml  
**File sections:** Communication Protocol · Development Workflow

#### Design (6)

##### `api-designer` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Design | 48/100 |

> Use this agent when designing new APIs, creating API specifications, or refactoring existing API architecture for scalability and developer experience.

**Tags:** design  
**File sections:** Communication Protocol · Design Workflow

#### General (219)

##### `electron-pro` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 48/100 |

> Use this agent when building Electron desktop applications that require native OS integration, cross-platform distribution, security hardening, and performance optimization.

**Tags:** general  
**File sections:** Communication Protocol · Implementation Workflow

##### `readme-generator` — ★★★☆☆ **62/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 48/100 |

> Use this agent when you need a maintainer-ready README built from exact repository reality, with deep codebase scanning, zero hallucination, and optio…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

#### Analysis (18)

##### `business-analyst` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 46/100 |

> Use when analyzing business processes, gathering requirements from stakeholders, or identifying process improvement opportunities to drive operational…

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

##### `debugger` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 46/100 |

> Use this agent when you need to diagnose and fix bugs, identify root causes of failures, or analyze error logs and stack traces to resolve issues.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

#### Architecture (10)

##### `java-architect` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 47/100 |

> Use this agent when designing enterprise Java architectures, migrating Spring Boot applications, or establishing microservices patterns for scalable cloud-native systems.

**Tags:** architecture, java  
**File sections:** Communication Protocol · Development Workflow

#### Backend (26)

##### `backend-developer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Backend | 46/100 |

> Use this agent when building server-side APIs, microservices, and backend systems that require robust architecture, scalability planning, and production-ready implementation.

**Tags:** backend  
**File sections:** Communication Protocol · Development Workflow

##### `fastapi-developer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Backend | 47/100 |

> Use when building modern async Python APIs with FastAPI, implementing Pydantic v2 validation, dependency injection patterns, or deploying high-performance ASGI applications.

**Tags:** backend, python  
**File sections:** Communication Protocol · Development Workflow

##### `spring-boot-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Backend | 47/100 |

> Use this agent when building enterprise Spring Boot 3+ applications requiring microservices architecture, cloud-native deployment, or reactive programming patterns.

**Tags:** backend, java  
**File sections:** Communication Protocol · Development Workflow

#### Design (6)

##### `ux-researcher` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Design | 47/100 |

> Use this agent when you need to conduct user research, analyze user behavior, or generate actionable insights to validate design decisions and uncover user needs.

**Tags:** design  
**File sections:** Communication Protocol · Development Workflow

#### Frontend (23)

##### `angular-architect` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Frontend | 47/100 |

> Use when architecting enterprise Angular 15+ applications with complex state management, optimizing RxJS patterns, designing micro-frontend systems, o…

**Tags:** angular, frontend  
**File sections:** Communication Protocol · Development Workflow

##### `nextjs-developer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Frontend | 47/100 |

> Use this agent when building production Next.js 14+ applications that require full-stack development with App Router, server components, and advanced performance optimization.

**Tags:** frontend, react  
**File sections:** Communication Protocol · Development Workflow

##### `react-specialist` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Frontend | 47/100 |

> Use when optimizing existing React applications for performance, implementing advanced React 18+ features, or solving complex state management and arc…

**Tags:** frontend, react  
**File sections:** Communication Protocol · Development Workflow

#### General (219)

##### `agent-organizer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use when assembling and optimizing multi-agent teams to execute complex projects that require careful task decomposition, agent capability matching, and workflow coordination.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `api-documenter` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when creating or improving API documentation, writing OpenAPI specifications, building interactive documentation portals, or generating code examples for APIs.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `blockchain-developer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when building smart contracts, DApps, and blockchain protocols that require expertise in Solidity, gas optimization, security auditing, and Web3 integration.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `cli-developer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when building command-line tools and terminal applications that require intuitive command design, cross-platform compatibility, and optimized developer experience.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `customer-success-manager` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to assess customer health, develop retention strategies, identify upsell opportunities, or maximize customer lifetime value.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `data-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when you need to design, build, or optimize data pipelines, ETL/ELT processes, and data infrastructure.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `data-researcher` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to discover, collect, and validate data from multiple sources to fuel analysis and decision-making.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `database-administrator` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when optimizing database performance, implementing high-availability architectures, setting up disaster recovery, or managing database …

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `dependency-manager` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when you need to audit dependencies for vulnerabilities, resolve version conflicts, optimize bundle sizes, or implement automated dependency updates.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `deployment-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when designing, building, or optimizing CI/CD pipelines and deployment automation strategies.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `devops-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when building or optimizing infrastructure automation, CI/CD pipelines, containerization strategies, and deployment workflows to accele…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `documentation-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when you need to create, architect, or overhaul comprehensive documentation systems including API docs, tutorials, guides, and develope…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `dx-optimizer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when optimizing the complete developer workflow including build times, feedback loops, testing efficiency, and developer satisfaction m…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `error-coordinator` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when distributed system errors occur and need coordinated handling across multiple components, or when you need to implement comprehens…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `incident-responder` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when an active security breach, service outage, or operational incident requires immediate response, evidence preservation, and coordinated recovery.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `iot-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use when designing and deploying IoT solutions requiring expertise in device management, edge computing, cloud integration, and handling challenges li…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `javascript-pro` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to build, optimize, or refactor modern JavaScript code for browser, Node.js, or full-stack applications requiring ES2023+…

**Tags:** general, java, javascript  
**File sections:** Communication Protocol · Development Workflow

##### `knowledge-synthesizer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use when you need to extract actionable patterns from agent interactions, synthesize insights across multiple workflows, and enable organizational lea…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `mlops-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to design and implement ML infrastructure, set up CI/CD for machine learning models, establish model versioning systems, …

**Tags:** general, ml  
**File sections:** Communication Protocol · Development Workflow

##### `multi-agent-coordinator` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use when coordinating multiple concurrent agents that need to communicate, share state, synchronize work, and handle distributed failures across a system.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `performance-monitor` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use when establishing observability infrastructure to track system metrics, detect performance anomalies, and optimize resource usage across multi-agent environments.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `platform-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use when building or improving internal developer platforms (IDPs), designing self-service infrastructure, or optimizing developer workflows to reduce…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `product-manager` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to make product strategy decisions, prioritize features, or define roadmap plans based on user needs and business goals.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `project-idea-validator` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 45/100 |

> Use this agent when you need an idea pressure-tested with brutal honesty, competitor teardown, market validation, and clear go/no-go guidance before building.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `project-manager` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when you need to establish project plans, track execution progress, manage risks, control budget/schedule, and coordinate stakeholders across complex initiatives.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `python-pro` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to build type-safe, production-ready Python code for web APIs, system utilities, or complex applications requiring modern…

**Tags:** general, python  
**File sections:** Communication Protocol · Development Workflow

##### `risk-manager` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 46/100 |

> Use this agent when you need to identify, quantify, and mitigate enterprise-level risks across financial, operational, regulatory, and strategic domains.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `scrum-master` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use when teams need facilitation, process optimization, velocity improvement, or agile ceremony management—especially for sprint planning, retrospecti…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `technical-writer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 47/100 |

> Use this agent when you need to create, improve, or maintain technical documentation including API references, user guides, SDK documentation, and getting-started guides.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

#### Mobile (15)

##### `expo-react-native-expert` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Mobile | 45/100 |

> Use when building mobile applications with Expo and React Native that require native module integration, navigation setup, performant animations, push…

**Tags:** mobile, react  
**File sections:** Communication Protocol · Development Workflow

##### `flutter-expert` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Mobile | 47/100 |

> Use when building cross-platform mobile applications with Flutter 3+ that require custom UI implementation, complex state management, native platform …

**Tags:** flutter, mobile  
**File sections:** Communication Protocol · Development Workflow

#### Security (12)

##### `security-auditor` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Security | 46/100 |

> Use this agent when conducting comprehensive security audits, compliance assessments, or risk evaluations across systems, infrastructure, and processes.

**Tags:** security  
**File sections:** Communication Protocol · Development Workflow

##### `security-engineer` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Security | 47/100 |

> Use this agent when implementing comprehensive security solutions across infrastructure, building automated security controls into CI/CD pipelines, or…

**Tags:** security  
**File sections:** Communication Protocol · Development Workflow

#### Testing (73)

##### `accessibility-tester` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Testing | 47/100 |

> Use this agent when you need comprehensive accessibility testing, WCAG compliance verification, or assessment of assistive technology support.

**Tags:** testing  
**File sections:** Communication Protocol · Development Workflow

##### `test-automator` — ★★★☆☆ **61/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Testing | 47/100 |

> Use this agent when you need to build, implement, or enhance automated test frameworks, create test scripts, or integrate testing into CI/CD pipelines.

**Tags:** testing  
**File sections:** Communication Protocol · Development Workflow

#### Architecture (10)

##### `graphql-architect` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 43/100 |

> Use this agent when designing or evolving GraphQL schemas across microservices, implementing federation architectures, or optimizing query performance in distributed graphs.

**Tags:** api, architecture  
**File sections:** Communication Protocol · Architecture Workflow

##### `microservices-architect` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 43/100 |

> Use when designing distributed system architecture, decomposing monolithic applications into independent microservices, or establishing communication …

**Tags:** architecture  
**File sections:** Communication Protocol · Architecture Evolution

##### `powershell-ui-architect` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 43/100 |

> Use when designing or building desktop graphical interfaces (WinForms, WPF, Metro-style dashboards) or terminal user interfaces (TUIs) for PowerShell …

**Tags:** architecture  
**File sections:** Core Capabilities · Architecture & Design Guidelines · Checklists · Example Use Cases · Integration with Other Agents

#### General (219)

##### `codebase-orchestrator` — ★★★☆☆ **60/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 44/100 |

> Use this agent when you need repository-wide refactor governance with explicit approval loops, weighted risk prioritization, diff previews, and deterministic fallback strategies.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

#### Analysis (18)

##### `error-detective` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Analysis | 41/100 |

> Use this agent when you need to diagnose why errors are occurring in your system, correlate errors across services, identify root causes, and prevent future failures.

**Tags:** analysis  
**File sections:** Communication Protocol · Development Workflow

#### Design (6)

##### `ui-designer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Design | 42/100 |

> Use this agent when designing visual interfaces, creating design systems, building component libraries, or refining user-facing aesthetics requiring e…

**Tags:** design  
**File sections:** Communication Protocol · Execution Flow

#### General (219)

##### `agent-installer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 40/100 |

> Use this agent when the user wants to discover, browse, or install Claude Code agents from the awesome-claude-code-subagents repository.

**Tags:** general  
**File sections:** Your Capabilities · GitHub API Endpoints · Workflow · Example Interactions · Important Notes · Communication Protocol

##### `chaos-engineer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when you need to design and execute controlled failure experiments, validate system resilience before incidents occur, or conduct game …

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `content-marketer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when you need to develop comprehensive content strategies, create SEO-optimized marketing content, or execute multi-channel content cam…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `devops-incident-responder` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use when actively responding to production incidents, diagnosing critical service failures, or conducting incident postmortems to implement permanent …

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `documentation-specialist` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | General | 48/100 |

> MUST BE USED to craft or update project documentation.

**Tags:** general  
**File sections:** Mission · Workflow · Templates · 🚀 Features · 🔧 Installation · 💻 Usage

##### `fintech-engineer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use when building payment systems, financial integrations, or compliance-heavy financial applications that require secure transaction processing, regu…

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `fullstack-developer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 42/100 |

> Use this agent when you need to build complete features spanning database, API, and frontend layers together as a cohesive unit.

**Tags:** general  
**File sections:** Communication Protocol · Implementation Workflow

##### `legal-advisor` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when you need to draft contracts, review compliance requirements, develop IP protection strategies, or assess legal risks for technology businesses.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `network-engineer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when designing, optimizing, or troubleshooting cloud and hybrid network infrastructures, or when addressing network security, performance, or reliability challenges.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `payment-integration` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when implementing payment systems, integrating payment gateways, or handling financial transactions that require PCI compliance, fraud …

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `scientific-literature-researcher` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use when you need to search scientific literature and retrieve structured experimental data from published studies.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `sre-engineer` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when you need to establish or improve system reliability through SLO definition, error budget management, and automation.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

##### `workflow-orchestrator` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 41/100 |

> Use this agent when you need to design, implement, or optimize complex business process workflows with multiple states, error handling, and transaction management.

**Tags:** general  
**File sections:** Communication Protocol · Development Workflow

#### Testing (73)

##### `qa-expert` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Testing | 41/100 |

> Use this agent when you need comprehensive quality assurance strategy, test planning across the entire development cycle, or quality metrics analysis …

**Tags:** testing  
**File sections:** Communication Protocol · Development Workflow

##### `ui-ux-tester` — ★★★☆☆ **59/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Testing | 42/100 |

> Use this agent when you need exhaustive UI and UX functionality testing driven by documented user flows, with browser or desktop interaction tooling a…

**Tags:** testing  
**File sections:** Communication Protocol · Development Workflow

#### Design (6)

##### `design-bridge` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Design | 38/100 |

> Use this agent when you need to translate a DESIGN.md from the VoltAgent/awesome-design-md repository into polished Claude Code instructions for build…

**Tags:** design  
**File sections:** Communication Protocol · Development Workflow

#### Frontend (23)

##### `frontend-developer` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Frontend | 38/100 |

> Use when building complete frontend applications across React, Vue, and Angular frameworks requiring multi-framework expertise and full-stack integration.

**Tags:** frontend  
**File sections:** Communication Protocol · Execution Flow

#### General (219)

##### `magento-php-specialist` — ★★★☆☆ **58/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 75/100 |

> Expert PHP development specialist for Magento 2 focusing on advanced PHP techniques, performance optimization, and modern PHP practices.

**Tags:** general, magento, php  
**File sections:** CompanyName Coding Standards (MANDATORY) · Core Expertise · PHP Development Process · PHP Specialization Areas · Advanced PHP Techniques · PHP Best Practices

#### Frontend (23)

##### `tailwind-frontend-expert` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | Frontend | 43/100 |

> MUST BE USED for any Tailwind‑CSS styling, utility‑first refactors, or responsive component work.

**Tags:** frontend  
**File sections:** Mission · Core Powers · Operating Principles · Standard Workflow · Sample Utility Patterns (reference) · Quality Checklist

#### General (219)

##### `code-archaeologist` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | General | 41/100 |

> MUST BE USED to explore and document unfamiliar, legacy, or complex codebases.

**Tags:** general  
**File sections:** Mission   · Standard Workflow   · Required Output Format   · 1. Executive Summary · 2. Architecture Overview · 3. Data & Control Flow

##### `node-specialist` — ★★★☆☆ **57/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 35/100 |

> Use this agent when you need to build, optimize, or debug Node.js backend applications, APIs, CLIs, or microservices requiring deep ecosystem knowledg…

**Tags:** general, javascript  
**File sections:** Communication Protocol · Development Workflow

##### `magento-environment-engineer` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 69/100 |

> Expert Magento 2 environment configuration and management specialist focusing on server setup, optimization, and multi-environment management.

**Tags:** general, magento  
**File sections:** Core Expertise · Environment Setup Process · Specialized Environment Types · Advanced Configuration Techniques · Performance Optimization · Security & Compliance

##### `magento-module-developer` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 71/100 |

> Expert Magento 2 module development specialist focusing on creating robust, maintainable, and extensible modules.

**Tags:** general, magento  
**File sections:** CompanyName Coding Standards (MANDATORY) · Core Expertise · Module Development Process · Module Components · Advanced Module Features · Enterprise Module Patterns

##### `tech-lead-orchestrator` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | General | 40/100 |

> Senior technical lead who analyzes complex software projects and provides strategic recommendations.

**Tags:** general  
**File sections:** CRITICAL RULES · MANDATORY RESPONSE FORMAT · Agent Selection · Example · Common Patterns

##### `websocket-engineer` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 34/100 |

> Use this agent when implementing real-time bidirectional communication features using WebSockets, Socket.IO, or similar technologies at scale.

**Tags:** general  
**File sections:** Communication Protocol · Implementation Workflow

#### Security (12)

##### `ai-writing-auditor` — ★★★☆☆ **56/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Security | 34/100 |

> Use this agent when you need to audit content for AI writing patterns and rewrite text to remove them.

**Tags:** security  
**File sections:** Detection Categories · Content-Type Profiles · Severity Levels · Audit Output Format · Source · Integration with other agents

#### General (219)

##### `it-ops-orchestrator` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 30/100 |

> Use for orchestrating complex IT operations tasks that span multiple domains (PowerShell automation, .NET development, infrastructure management, Azur…

**Tags:** general  
**File sections:** Core Responsibilities · Routing Examples · Integration with Other Agents

##### `powershell-5.1-expert` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 31/100 |

> Use when automating Windows infrastructure tasks requiring PowerShell 5.1 scripts with RSAT modules for Active Directory, DNS, DHCP, GPO management, o…

**Tags:** general  
**File sections:** Core Capabilities · Checklists · Example Use Cases · Integration with Other Agents

##### `powershell-7-expert` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 31/100 |

> Use when building cross-platform cloud automation scripts, Azure infrastructure orchestration, or CI/CD pipelines requiring PowerShell 7+ with modern …

**Tags:** general  
**File sections:** Core Capabilities · Checklists · Example Use Cases · Integration with Other Agents

##### `seo-specialist` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 32/100 |

> Use this agent when you need comprehensive SEO optimization encompassing technical audits, keyword strategy, content optimization, and search rankings improvement.

**Tags:** general  
**File sections:** Communication Protocol · Execution Flow

##### `windows-infra-admin` — ★★★☆☆ **55/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 30/100 |

> Use when managing Windows Server infrastructure, Active Directory, DNS, DHCP, and Group Policy configurations, especially for enterprise-scale deploym…

**Tags:** general  
**File sections:** Core Capabilities · Checklists · Example Use Cases · Integration with Other Agents

#### Architecture (10)

##### `api-architect` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | Architecture | 35/100 |

> Universal API designer specializing in RESTful design, GraphQL schemas, and modern contract standards.

**Tags:** architecture  
**File sections:** Operating Routine · Output Template · API Design Report · Design Principles (Quick Reference)

#### General (219)

##### `database-optimizer` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 44/100 |

> An expert AI assistant for holistically analyzing and optimizing database performance.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies · **Guiding Principles (Approach)** · **Interaction Guidelines & Constraints** · **Output Format**

##### `magento-css-specialist` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 65/100 |

> Expert CSS and LESS development specialist for Magento 2 focusing on responsive design, performance optimization, and maintainable stylesheet architecture.

**Tags:** general, magento  
**File sections:** Core Expertise · CSS Development Process · Specialized CSS Applications · Advanced CSS Techniques · CSS Best Practices · Browser Compatibility & Fallbacks

##### `magento-deployment-engineer` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 66/100 |

> Expert Magento 2 deployment and DevOps specialist focusing on CI/CD pipelines, automated deployments, and enterprise infrastructure management.

**Tags:** general, magento  
**File sections:** Core Expertise · Deployment Process Framework · Specialized Deployment Types · Advanced Deployment Techniques · DevOps Best Practices · Cloud Platform Expertise

##### `magento-local-environment-specialist` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 65/100 |

> Expert Magento 2 local development environment specialist focusing on Docker, Valet+, native installations, and development workflow optimization.

**Tags:** general, magento  
**File sections:** Core Expertise · Local Environment Setup Process · Specialized Environment Types · Advanced Local Development Techniques · Environment-Specific Best Practices · Common Development Scenarios

##### `magento-xml-specialist` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 64/100 |

> Expert XML configuration specialist for Magento 2 focusing on layout XML, dependency injection, system configuration, and module definition.

**Tags:** general, magento  
**File sections:** Core Expertise · XML Development Process · Specialized XML Configuration Types · Advanced XML Techniques · XML Best Practices · Enterprise XML Management

#### Quality (7)

##### `code-reviewer` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | Quality | 35/100 |

> MUST BE USED to run a rigorous, security-aware review after every feature, bug‑fix, or pull‑request.

**Tags:** quality  
**File sections:** Mission · Review Workflow · Required Output Format · Executive Summary · 🔴 Critical Issues · 🟡 Major Issues

#### Security (12)

##### `powershell-security-hardening` — ★★★☆☆ **54/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Security | 29/100 |

> Use this agent when you need to harden PowerShell automation, secure remoting configuration, enforce least-privilege design, or align scripts with ent…

**Tags:** security  
**File sections:** Core Capabilities · Checklists · Integration with Other Agents

#### Architecture (10)

##### `powershell-module-architect` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Architecture | 27/100 |

> Use this agent when architecting and refactoring PowerShell modules, designing profile systems, or creating cross-version compatible automation libraries.

**Tags:** architecture  
**File sections:** Core Capabilities · Checklists · Example Use Cases · Integration with Other Agents

#### Backend (26)

##### `backend-developer` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | Backend | 32/100 |

> MUST BE USED whenever server‑side code must be written, extended, or refactored and no framework‑specific sub‑agent exists.

**Tags:** backend  
**File sections:** Mission · Core Competencies · Operating Workflow · Implementation Report (required) · Coding Heuristics · Stack Detection Cheatsheet

#### Frontend (23)

##### `frontend-designer` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | Frontend | 62/100 |

> Use this agent when you need to convert design mockups, wireframes, or visual concepts into detailed technical specifications and implementation guides for frontend development.

**Tags:** frontend  
**File sections:** Initial Discovery Process · Design Analysis Process · Deliverable: Frontend Design Document · Project Overview · Technology Stack · Design System Foundation

##### `frontend-developer` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | Frontend | 31/100 |

> MUST BE USED to deliver responsive, accessible, high‑performance UIs.

**Tags:** frontend  
**File sections:** Mission · Standard Workflow · Required Output Format · Frontend Implementation – <feature>  (<date>) · Heuristics & Best Practices · Allowed Dependencies

#### General (219)

##### `azure-infra-engineer` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 26/100 |

> Use when designing, deploying, or managing Azure infrastructure with focus on network architecture, Entra ID integration, PowerShell automation, and Bicep IaC.

**Tags:** general  
**File sections:** Core Capabilities · Checklists · Example Use Cases · Integration with Other Agents

##### `magento-magewire-specialist` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 63/100 |

> Expert Magewire development specialist for Magento 2 focusing on reactive components, real-time interfaces, and Laravel Livewire-inspired development patterns.

**Tags:** general, magento  
**File sections:** Core Expertise · Magewire Development Process · Specialized Magewire Applications · Advanced Magewire Techniques · Magewire Best Practices · Integration Patterns

##### `magento-requirejs-specialist` — ★★★☆☆ **53/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 62/100 |

> Expert RequireJS module specialist for Magento 2 focusing on AMD module development, dependency management, and JavaScript optimization.

**Tags:** general, magento  
**File sections:** Core Expertise · RequireJS Development Process · Specialized RequireJS Applications · Advanced RequireJS Techniques · RequireJS Best Practices · Magento-Specific Patterns

#### Analysis (18)

##### `magento-performance-analyst` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 60/100 |

> Expert Magento 2 performance optimization specialist focusing on comprehensive performance analysis, bottleneck identification, and system optimization.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Performance Analysis Process · Performance Optimization Areas · Advanced Performance Techniques · Performance Best Practices · Enterprise Performance Management

#### Backend (26)

##### `magento-model-developer` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Backend | 60/100 |

> Expert Magento 2 model development specialist focusing on data layer architecture, entity design, and database optimization.

**Tags:** backend, magento  
**File sections:** Core Expertise · Model Development Process · Specialized Model Types · Advanced Model Techniques · Model Best Practices · Database Management

#### General (219)

##### `m365-admin` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | General | 24/100 |

> Use when automating Microsoft 365 administrative tasks including Exchange Online mailbox provisioning, Teams collaboration management, SharePoint site…

**Tags:** general  
**File sections:** Core Capabilities · Checklists · Example Use Cases · Integration with Other Agents

##### `magento-alpine-specialist` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 59/100 |

> Expert Alpine.js development specialist for modern Magento 2 frontend development.

**Tags:** general, magento  
**File sections:** Core Expertise · Alpine.js Development Process · Specialized Alpine.js Applications · Advanced Alpine.js Techniques · Alpine.js Best Practices · Modern Frontend Patterns

##### `magento-feature-developer` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 61/100 |

> Expert Magento 2 feature development specialist focused on implementing business requirements through scalable, maintainable solutions.

**Tags:** general, magento  
**File sections:** CompanyName Coding Standards (MANDATORY) · Core Expertise · Feature Development Process · Common Feature Types · Development Best Practices

##### `magento-knockout-specialist` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 59/100 |

> Expert KnockoutJS development specialist for Magento 2 focusing on MVVM pattern implementation, data binding, and interactive UI components.

**Tags:** general, magento  
**File sections:** Core Expertise · KnockoutJS Development Process · Specialized KnockoutJS Applications · Advanced KnockoutJS Techniques · KnockoutJS Best Practices · Integration Patterns

##### `performance-optimizer` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | General | 29/100 |

> MUST BE USED whenever users report slowness, high cloud costs, or scaling concerns.

**Tags:** general  
**File sections:** Mission · Optimisation Workflow · Report Format · Executive Summary · Bottlenecks Addressed · Recommendations

#### Security (12)

##### `security-auditor` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | Security | 59/100 |

> Use this agent when you need to perform a comprehensive security audit of a codebase, identify vulnerabilities, and generate a detailed security repor…

**Tags:** security  
**File sections:** Security Audit Process · Vulnerability Categories to Check · Report Format Structure · Executive Summary · Critical Vulnerabilities · High Vulnerabilities

#### Testing (73)

##### `supatest_prompt-engineering-specialist` — ★★★☆☆ **52/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 99/100 |

> # Prompt Engineering Specialist Agent ```yaml --- name: prompt-engineering-specialist description: Expert in systematic prompt design, optimization, and engineering workflows.

**Tags:** testing  
**File sections:** Core Expertise Areas · Executive Summary · Key Decisions Made · Action Items · Discussion Points · Next Steps

#### Analysis (18)

##### `magento-index-analyst` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 58/100 |

> Expert Magento 2 indexing optimization specialist focusing on search performance, database indexing strategies, and Elasticsearch configuration.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Index Optimization Process · Specialized Index Types · Advanced Indexing Techniques · Index Best Practices · Enterprise Indexing Architecture

#### Backend (26)

##### `backend-architect` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Backend | 37/100 |

> Acts as a consultative architect to design robust, scalable, and maintainable backend systems.

**Tags:** backend  
**File sections:** Core Development Philosophy · Guiding Principles · Mandated Output Structure

##### `magento-api-developer` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Backend | 57/100 |

> Expert Magento 2 API development specialist focusing on REST and GraphQL API design, implementation, and optimization.

**Tags:** api, backend, magento  
**File sections:** Core Expertise · API Development Process · API Specialization Areas · Advanced API Techniques · API Best Practices · API Integration Patterns

#### General (219)

##### `dx-optimizer` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 36/100 |

> A specialist in Developer Experience (DX).

**Tags:** general  
**File sections:** Core Development Philosophy · Core Principles

##### `golang-pro` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 36/100 |

> A Go expert that architects, writes, and refactors robust, concurrent, and highly performant Go applications.

**Tags:** general, go  
**File sections:** Core Development Philosophy · Core Philosophy · Core Competencies · Interaction Model · Output Specification

##### `team-configurator` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | General | 27/100 |

> MUST BE USED to set up—or refresh—the AI development team for the current project.

**Tags:** general  
**File sections:** Mission · Workflow · Delegations · Output rules

##### `typescript-pro` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 35/100 |

> A TypeScript expert who architects, writes, and refactors scalable, type-safe, and maintainable applications for Node.js and browser environments.

**Tags:** general, typescript  
**File sections:** Core Development Philosophy · Core Philosophy · Core Competencies · Interaction Model · Output Specification

#### Testing (73)

##### `javascript-typescript-expert` — ★★★☆☆ **51/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 96/100 |

> JavaScript/TypeScript specialist focusing on modern ecosystem guidance, architectural decisions, and performance optimization.

**Tags:** java, javascript, testing, typescript  
**File sections:** JavaScript/TypeScript Ecosystem Framework · Performance Optimization Strategies · Testing Architecture · Project Architecture Patterns · Security and Production Patterns · Modern JavaScript Patterns

#### Analysis (18)

##### `project-analyst` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | ⭐ 4.3k | Analysis | 24/100 |

> MUST BE USED to analyse any new or unfamiliar codebase. Use PROACTIVELY to detect frameworks, tech stacks, and architecture so specialists can be routed correctly.

**Tags:** analysis  
**File sections:** Purpose · Workflow · Detection Hints

#### Backend (26)

##### `magento-cronjob-developer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Backend | 55/100 |

> Expert Magento 2 cron job development specialist focusing on scheduled task implementation, background processing, and automated system operations.

**Tags:** backend, magento  
**File sections:** Core Expertise · Cron Development Process · Specialized Cron Job Types · Advanced Cron Techniques · Cron Job Best Practices · Integration & Dependencies

#### Frontend (23)

##### `frontend-developer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Frontend | 33/100 |

> Acts as a senior frontend engineer and AI pair programmer.

**Tags:** frontend  
**File sections:** Core Development Philosophy · Core Competencies

##### `magento-ui-component-developer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Frontend | 55/100 |

> Expert Magento 2 UI Component development specialist focusing on building sophisticated admin interfaces and frontend components.

**Tags:** frontend, magento  
**File sections:** Core Expertise · UI Component Development Process · Specialized Component Types · Advanced UI Component Techniques · UI Component Best Practices · Component Customization & Extension

##### `nextjs-pro` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Frontend | 33/100 |

> An expert Next.js developer specializing in building high-performance, scalable, and SEO-friendly web applications.Leverages the full potential of Nex…

**Tags:** frontend, react  
**File sections:** Core Development Philosophy · Core Competencies

#### General (219)

##### `ai-engineer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 33/100 |

> A highly specialized AI agent for designing, building, and optimizing LLM-powered applications, RAG systems, and complex prompt pipelines.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies

##### `bash-expert` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 37/100 |

> Master of defensive Bash scripting for production automation, CI/CD pipelines, and system utilities. Expert in safe, portable, and testable shell scripts.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output · Essential Tools · Common Pitfalls to Avoid

##### `data-engineer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 34/100 |

> Designs, builds, and optimizes scalable and maintainable data-intensive applications, including ETL/ELT pipelines, data warehouses, and real-time streaming architectures.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies · **Focus Areas** · **Methodology & Approach** · **Expected Output Formats**

##### `legacy-modernizer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 34/100 |

> A specialist agent for planning and executing the incremental modernization of legacy systems.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies

##### `performance-engineer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 34/100 |

> A senior-level performance engineer who defines and executes a comprehensive performance strategy.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies · Key Focus Areas · Systematic Approach · Expected Output & Deliverables

#### Quality (7)

##### `magento-code-reviewer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Quality | 55/100 |

> Elite code review expert specializing in modern AI-powered code analysis, security vulnerabilities, performance optimization, and production reliability.

**Tags:** magento, quality  
**File sections:** CompanyName Coding Standards Review (CRITICAL PRIORITY) · Core Expertise · Review Process · Integration with Development Workflow

#### Security (12)

##### `ad-security-reviewer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | ⭐ 9.2k | Security | 19/100 |

> Use this agent when you need to audit Active Directory security posture, evaluate privilege escalation risks, review identity delegation patterns, or …

**Tags:** security  
**File sections:** Core Capabilities · Checklists · Integration with Other Agents

#### Testing (73)

##### `architect-reviewer` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Testing | 34/100 |

> Proactively reviews code for architectural consistency, adherence to patterns, and maintainability.

**Tags:** testing  
**File sections:** Core Quality Philosophy · Core Competencies

##### `code-pairing-assistant` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 95/100 |

> Comprehensive pair programming specialist focusing on pair programming guidance, remote collaboration tools, code sharing strategies, and team productivity optimization.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🚀 Pair Programming Setup Automation · Pre-Session Setup · During Session · Post-Session · Session Goals

##### `debugger` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Testing | 33/100 |

> Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.

**Tags:** testing  
**File sections:** Core Development Philosophy · Core Competencies

##### `go-expert` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 93/100 |

> Go specialist focusing on ecosystem guidance, architectural decisions, and performance optimization.

**Tags:** go, testing  
**File sections:** Go Ecosystem Decision Framework · Performance Optimization Strategies · Testing Architecture · Project Architecture Patterns · Error Handling and Logging · Security and Production Patterns

##### `java-expert` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 94/100 |

> Java specialist focusing on modern Java ecosystem guidance, architectural decisions, and performance optimization.

**Tags:** java, testing  
**File sections:** Java Ecosystem Decision Framework · Enterprise Architecture Patterns · Performance Optimization Strategies · Testing Architecture · Security Architecture · Cloud-Native and DevOps

##### `kubernetes-expert` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 93/100 |

> Expert in Kubernetes orchestration with advanced deployment patterns, cluster management, security policies, and cloud-native best practices.

**Tags:** kubernetes, testing  
**File sections:** Deployment Strategy Framework · Production Architecture Patterns · Scaling and Performance · Monitoring and Observability · GitOps and CI/CD Integration · Service Mesh Integration

##### `supatest_advanced-agent-template` — ★★☆☆☆ **50/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 95/100 |

> # [Agent Name] Expert Agent ```yaml --- name: advanced-agent-name description: Comprehensive [domain] specialist with deep expertise in [specific areas].

**Tags:** testing  
**File sections:** Core Expertise Areas · Advanced Patterns & Techniques · Production Deployment Patterns · Troubleshooting & Debugging · Expert Guidelines & Best Practices · Integration Points

#### Analysis (18)

##### `magento-cache-analyst` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 52/100 |

> Expert Magento 2 cache optimization specialist focusing on cache strategy implementation, performance tuning, and cache infrastructure design.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Cache Optimization Process · Specialized Cache Types · Advanced Cache Techniques · Cache Best Practices · Enterprise Cache Architecture

##### `magento-configuration-analyst` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 53/100 |

> Expert Magento 2 configuration data analyst specializing in rapid system configuration retrieval, settings analysis, and configuration health assessment.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Information Retrieval Process · Common Analysis Scenarios · Analysis Tools & Techniques · Information Delivery Formats

##### `prompt-engineer` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Analysis | 32/100 |

> A master prompt engineer who architects and optimizes sophisticated LLM interactions.

**Tags:** analysis  
**File sections:** Core Competencies · Model-Specific Expertise · Systematic Optimization Process · Deliverables

#### Architecture (10)

##### `graphql-architect` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Architecture | 31/100 |

> A highly specialized AI agent for designing, implementing, and optimizing high-performance, scalable, and secure GraphQL APIs.

**Tags:** api, architecture  
**File sections:** Core Development Philosophy · Core Competencies

#### Database (10)

##### `postgresql-pglite-pro` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Database | 32/100 |

> An expert in PostgreSQL and Pglite, specializing in robust database architecture, performance tuning, and the implementation of in-browser database solutions.

**Tags:** database  
**File sections:** Core Development Philosophy · Core Competencies

#### Frontend (23)

##### `magento-luma-specialist` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Frontend | 53/100 |

> Expert Luma theme development specialist focusing on customizing and extending Magento's default theme.

**Tags:** frontend, magento  
**File sections:** Core Expertise · Luma Development Process · Luma Specialization Areas · Advanced Luma Techniques · Luma Best Practices · Legacy Integration

#### General (219)

##### `data-scientist` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 30/100 |

> An expert data scientist specializing in advanced SQL, BigQuery optimization, and actionable data insights. Designed to be a collaborative partner in data exploration and analysis.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies

##### `deployment-engineer` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 32/100 |

> Designs and implements robust CI/CD pipelines, container orchestration, and cloud infrastructure automation.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies · Guiding Principles · Expected Deliverables

##### `electron-pro` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 32/100 |

> An expert in building cross-platform desktop applications using Electron and TypeScript.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies

##### `incident-responder` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 31/100 |

> A battle-tested Incident Commander persona for leading the response to critical production incidents with urgency, precision, and clear communication,…

**Tags:** general  
**File sections:** Core Competencies · Immediate Actions (First 5 Minutes) · Investigation & Mitigation Protocol · Fix Implementation & Verification · Post-Incident Actions · Severity Levels

##### `magento-upgrade-specialist` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 52/100 |

> Expert Magento 2 version upgrade specialist focusing on seamless migration between Magento versions.

**Tags:** general, magento  
**File sections:** Core Expertise · Upgrade Process Framework · Upgrade Categories · Advanced Upgrade Techniques · Testing & Validation · Post-Upgrade Optimization

##### `product-manager` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 31/100 |

> A strategic and customer-focused AI Product Manager for defining product vision, strategy, and roadmaps, and leading cross-functional teams to deliver successful products.

**Tags:** general  
**File sections:** Core Competencies · Guiding Principles · Expected Output · Constraints & Assumptions

##### `python-pro` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 32/100 |

> An expert Python developer specializing in writing clean, performant, and idiomatic code.

**Tags:** general, python  
**File sections:** Core Development Philosophy · Core Competencies

#### Mobile (15)

##### `mobile-developer` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Mobile | 32/100 |

> Architects and leads the development of sophisticated, cross-platform mobile applications using React Native and Flutter.

**Tags:** mobile  
**File sections:** Core Development Philosophy · Core Competencies · Strategic Approach · Expected Deliverables

#### Security (12)

##### `magento-security-analyst` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Security | 52/100 |

> Expert Magento 2 security specialist focusing on comprehensive security assessment, vulnerability management, and enterprise-grade security implementation.

**Tags:** magento, security  
**File sections:** Core Expertise · Security Assessment Process · Security Domains · Advanced Security Techniques · Security Best Practices · Enterprise Security Architecture

#### Testing (73)

##### `code-review-master` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 92/100 |

> Expert code reviewer specializing in security, performance, maintainability, and best practices across languages.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🔍 Comprehensive Code Review Framework · Authentication & Authorization · Input Validation & Sanitization · Data Protection · Error Handling & Logging

##### `test-automator` — ★★☆☆☆ **49/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Testing | 31/100 |

> A Test Automation Specialist responsible for designing, implementing, and maintaining a comprehensive automated testing strategy.

**Tags:** testing  
**File sections:** Core Quality Philosophy · Core Competencies · Guiding Principles · Focus Areas & Toolchain · Standard Output

#### Analysis (18)

##### `magento-issue-debugger` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 50/100 |

> Expert Magento 2 issue investigation and resolution specialist.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Issue Investigation Process · Common Issue Categories · Advanced Debugging Techniques · Debugging Tools & Techniques

#### Design (6)

##### `ux-designer` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Design | 28/100 |

> A creative and empathetic professional focused on enhancing user satisfaction by improving the usability, accessibility, and pleasure provided in the …

**Tags:** design  
**File sections:** Core Competencies · Guiding Principles · Expected Output · Constraints & Assumptions

#### Frontend (23)

##### `magento-hyva-specialist` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Frontend | 50/100 |

> Expert Hyv� theme development specialist focusing on modern, performance-optimized Magento 2 storefronts.

**Tags:** frontend, magento  
**File sections:** Core Expertise · Hyv� Development Process · Hyv� Specialization Areas · Advanced Hyv� Techniques · Hyv� Best Practices · Hyv� Ecosystem

#### General (219)

##### `api-documenter` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 28/100 |

> A specialist agent that creates comprehensive, developer-first API documentation. It generates OpenAPI 3.0 specs, code examples, SDK usage guides, and full Postman collections.

**Tags:** general  
**File sections:** Guiding Principles · Core Competencies

##### `documentation-expert` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 29/100 |

> A sophisticated AI Software Documentation Expert for designing, creating, and maintaining comprehensive and user-friendly software documentation.

**Tags:** general  
**File sections:** Core Competencies · Guiding Principles · Expected Output · Constraints & Assumptions

##### `full-stack-developer` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 29/100 |

> A versatile AI Full Stack Developer proficient in designing, building, and maintaining all aspects of web applications, from the user interface to the…

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies · Guiding Principles · Expected Output · Constraints & Assumptions

##### `ml-engineer` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 28/100 |

> Designs, builds, and manages the end-to-end lifecycle of machine learning models in production.

**Tags:** general  
**File sections:** Core Development Philosophy · Core Competencies · Guiding Principles · Standard Operating Procedure · Expected Deliverables

#### Testing (73)

##### `cicd-pipeline-architect` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 88/100 |

> CI/CD pipeline architect for automated deployment workflows. PROACTIVELY assists with pipeline strategy, tool selection, testing automation, and deployment patterns.

**Tags:** testing  
**File sections:** CI/CD Strategy Framework · Deployment Strategies · Pipeline Security and Compliance · Performance Optimization · Monitoring and Observability · Advanced Pipeline Patterns

##### `documentation-specialist` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 88/100 |

> Documentation specialist for comprehensive technical documentation and developer guides.

**Tags:** testing  
**File sections:** Core Expertise · Comprehensive README Template · 📋 Table of Contents · ✨ Features · 🎥 Demo · 🚀 Quick Start

##### `python-expert` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 90/100 |

> Python specialist focusing on modern Python 3.8+ ecosystem guidance, architectural decisions, and performance optimization.

**Tags:** python, testing  
**File sections:** Python Ecosystem Decision Framework · Performance Optimization Strategies · Project Architecture Patterns · Deployment and Production Patterns · Security Best Practices · Code Quality Framework

##### `qa-expert` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Testing | 28/100 |

> A sophisticated AI Quality Assurance (QA) Expert for designing, implementing, and managing comprehensive QA processes to ensure software products meet…

**Tags:** testing  
**File sections:** Core Quality Philosophy · Core Competencies · Guiding Principles · Expected Output · Constraints & Assumptions

##### `react-architect` — ★★☆☆☆ **48/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 88/100 |

> React architecture specialist focused on application structure, state management decisions, performance optimization, and modern React patterns.

**Tags:** react, testing  
**File sections:** Project Architecture Decisions · Performance Optimization Framework · Modern React Patterns · Testing Architecture · TypeScript Integration Patterns · Styling Architecture

#### Analysis (18)

##### `magento-catalog-analyst` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 48/100 |

> Expert Magento 2 catalog data analyst specializing in rapid catalog information retrieval, product data analysis, and catalog health assessment.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Information Retrieval Process · Common Analysis Scenarios · Analysis Tools & Techniques · Information Delivery Formats

##### `magento-order-analyst` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Analysis | 48/100 |

> Expert Magento 2 order data analyst specializing in rapid order information retrieval, transaction analysis, and order processing assessment.

**Tags:** analysis, magento  
**File sections:** Core Expertise · Information Retrieval Process · Common Analysis Scenarios · Analysis Tools & Techniques · Information Delivery Formats

#### Architecture (10)

##### `cloud-architect` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Architecture | 27/100 |

> A senior cloud architect AI that designs scalable, secure, and cost-efficient AWS, Azure, and GCP infrastructure.

**Tags:** architecture  
**File sections:** Core Development Philosophy · Core Competencies

#### Design (6)

##### `ui-designer` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Design | 25/100 |

> A creative and detail-oriented AI UI Designer focused on creating visually appealing, intuitive, and user-friendly interfaces for digital products.

**Tags:** design  
**File sections:** Core Design Philosophy · Core Competencies · Guiding Principles · Expected Output · Constraints & Assumptions

#### Frontend (23)

##### `react-pro` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Frontend | 27/100 |

> An expert React developer specializing in creating modern, performant, and scalable web applications.

**Tags:** frontend, react  
**File sections:** Core Development Philosophy · Core Competencies

#### General (219)

##### `devops-incident-responder` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | General | 26/100 |

> A specialized agent for leading incident response, conducting in-depth root cause analysis, and implementing robust fixes for production systems.

**Tags:** general  
**File sections:** Core Development Philosophy · **Core Competencies** · **Systematic Approach** · **Expected Output**

#### Security (12)

##### `security-auditor` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | ⭐ 1.6k | Security | 26/100 |

> A senior application security auditor and ethical hacker, specializing in identifying, evaluating, and mitigating security vulnerabilities throughout …

**Tags:** security  
**File sections:** Core Competencies

#### Testing (73)

##### `haskell-expert` — ★★☆☆☆ **47/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 86/100 |

> Expert in Haskell functional programming with advanced type system features, monadic programming, lens libraries, and performance optimization.

**Tags:** testing  
**File sections:** Core Expertise · Development Approach · Modern Haskell Development Practices · Best Practices

#### Database (10)

##### `cockroachdb-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 27/100 |

> Specializes in CockroachDB setup, optimization, and best practices.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### DevOps (8)

##### `docker-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | DevOps | 27/100 |

> Expert in all aspects of Docker, including containerization, image creation, and orchestration.

**Tags:** devops, docker  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Frontend (23)

##### `magento-frontend-developer` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | Frontend | 45/100 |

> Expert Magento 2 frontend development specialist focusing on comprehensive frontend solutions.

**Tags:** frontend, magento  
**File sections:** Core Expertise · Frontend Development Process · Specialized Development Areas · Advanced Frontend Techniques · Frontend Best Practices · Frontend Technology Integration

#### General (219)

##### `c-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 27/100 |

> C language expert specializing in efficient, reliable systems-level programming.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `cpp-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 27/100 |

> Expert in writing high-quality, efficient, and modern C++ code.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `electron-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 27/100 |

> Specializes in building cross-platform desktop applications using Electron.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `erlang-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 27/100 |

> Expert in writing efficient, concurrent, and robust Erlang applications.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `graphql-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 27/100 |

> Expert in GraphQL API design, query optimization, and implementation.

**Tags:** api, general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `ocaml-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 27/100 |

> Expert in OCaml programming, covering functional programming, type systems, and performance optimization

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Mobile (15)

##### `android-expert` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 27/100 |

> Expert in Android development, specializing in modern Android practices, optimizing performance, and ensuring robust application architecture.

**Tags:** mobile  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Testing (73)

##### `docker-specialist` — ★★☆☆☆ **46/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 83/100 |

> Expert in Docker containerization with multi-stage builds, security best practices, orchestration patterns, and production optimization.

**Tags:** docker, testing  
**File sections:** Core Expertise · Development Approach · Best Practices

#### General (219)

##### `ui-engineer` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | General | 22/100 |

> Use this agent when you need to create, modify, or review frontend code, UI components, or user interfaces. Examples:

**Tags:** general  
**File sections:** —

#### Testing (73)

##### `code-quality-guardian` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 82/100 |

> Code quality guardian for automated quality gates and standards enforcement.

**Tags:** testing  
**File sections:** Quality Strategy Framework · Quality Metrics and Thresholds · Quality Enforcement Strategies · Technical Debt Management · Quality Tool Configuration · Quality Culture and Adoption

##### `csharp-expert` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 82/100 |

> Expert C# developer specializing in .NET 8+, modern C# features, and enterprise patterns. PROACTIVELY assists with C# code analysis, development, and optimization.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🚀 Modern C# Patterns · 🧪 Testing Excellence · 🔧 Development Workflow

##### `php-expert` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 81/100 |

> Expert PHP developer specializing in PHP 8+, modern frameworks, and best practices. PROACTIVELY assists with PHP code analysis, development, and optimization.

**Tags:** php, testing  
**File sections:** 🎯 Core Expertise · 🚀 Modern PHP 8+ Patterns · 🧪 Testing Excellence · 🔧 Development Workflow

##### `ruby-expert` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 82/100 |

> Expert Ruby developer specializing in Ruby 3+, Rails, and modern Ruby patterns. PROACTIVELY assists with Ruby code analysis, development, and best practices.

**Tags:** ruby, testing  
**File sections:** 🎯 Core Expertise · 🚀 Modern Ruby Patterns · 🧪 Testing Excellence · 🔧 Development Workflow

##### `terraform-infrastructure-expert` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 82/100 |

> Expert in Terraform infrastructure as code with best practices, state management, modules, and multi-cloud deployments.

**Tags:** terraform, testing  
**File sections:** Core Expertise · Development Approach · Best Practices

##### `test-strategy-architect` — ★★☆☆☆ **45/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 82/100 |

> Comprehensive testing expert specializing in test pyramid design, automation strategies, coverage analysis, and quality assurance frameworks.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🏗️ Comprehensive Test Strategy Framework · 📊 Test Coverage Analysis Framework · 🚀 CI/CD Test Integration · 🎯 Test Data Management

#### AI / ML (9)

##### `bullmq-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | AI / ML | 23/100 |

> Expert in BullMQ task queue library for Node.js, specializing in advanced queue management, job processing, and performance optimization.

**Tags:** ai, ml  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `pytorch-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | AI / ML | 22/100 |

> Expert in PyTorch for building and optimizing deep learning models.

**Tags:** ai  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Backend (26)

##### `laravel-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 22/100 |

> Expert in Laravel framework, mastering modern Laravel features, Eloquent ORM, and comprehensive testing strategies.

**Tags:** backend, php  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `python-backend-engineer` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Backend | 20/100 |

> Use this agent when you need to develop, refactor, or optimize Python backend systems using modern tooling like uv.

**Tags:** backend, python  
**File sections:** —

#### Database (10)

##### `mysql-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 22/100 |

> Expert in MySQL database management, query optimization, and schema design. Provides efficient solutions for MySQL-related tasks.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `postgres-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 22/100 |

> Expert in PostgreSQL database management and optimization, handling complex SQL queries, indexing strategies, and ensuring high-performance database systems.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `redis-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 22/100 |

> Expert in Redis for in-memory data storage, caching, and real-time analytics.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `sqlite-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 22/100 |

> SQLite database optimization, query writing, indexing, and best practices specialist. Proactively analyzes and optimizes SQLite databases for performance and reliability.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### DevOps (8)

##### `ansible-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | DevOps | 22/100 |

> Master Ansible automation for configuration management, application deployment, and task orchestration.

**Tags:** devops  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Frontend (23)

##### `angular-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 22/100 |

> Write idiomatic Angular code with best practices, performance optimizations, and modern Angular features.

**Tags:** angular, frontend  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `angularjs-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 22/100 |

> Expert in AngularJS development, focusing on optimizing code structure, improving performance, and ensuring best practices.

**Tags:** angular, frontend  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `nextjs-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 23/100 |

> Expert in Next.js development, specializing in serverless architecture, static site generation, and optimized React apps.

**Tags:** frontend, react  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `react-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 22/100 |

> React development expert with deep understanding of component architecture, hooks, state management, and performance optimization.

**Tags:** frontend, react  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### General (219)

##### `aspnet-core-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in ASP.NET Core web application development, optimization, and best practices.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `bun-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expertise in Bun, focusing on high-performance JavaScript runtime, efficient module execution, and optimized bundling.

**Tags:** general, javascript  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `celery-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in Celery for distributed task queue management, optimizing task execution, and ensuring robust Celery deployments.

**Tags:** general, python  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `deno-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in Deno for modern JavaScript and TypeScript runtime, security, performance, and tooling.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `dynamodb-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in DynamoDB optimization, best practices, and data modeling. Use PROACTIVELY for performance tuning, efficient querying, and DynamoDB schema design.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `gitlab-ci-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in configuring, optimizing, and maintaining GitLab CI/CD pipelines for efficient software delivery.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `go-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Go specialist focusing on idiomatic Go, concurrency, and performance optimization.

**Tags:** general, go  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `html-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in HTML structure, semantics, and best practices for building clean, accessible, and optimized web pages.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `jasmine-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 23/100 |

> Master unit testing with the Jasmine framework, focusing on best practices for writing and organizing tests to ensure software quality.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `javascript-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in modern JavaScript specializing in language features, optimization, and best practices.

**Tags:** general, java, javascript  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `jwt-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Specializes in JSON Web Tokens (JWT) implementation, security, and optimization. Handles token creation, validation, and best practices for JWT usage.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `liquibase-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in Liquibase for database schema management, migrations, and version control. Use proactively for managing and automating database changes.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `nats-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Specialized in NATS, handling messaging patterns, scalability, and security features accurately within NATS deployments.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `numpy-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in NumPy for scientific computing, data analysis, and numerical operations.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `oauth-oidc-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in OAuth 2.0 and OpenID Connect (OIDC) for secure authentication and authorization.

**Tags:** general, security  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `openai-api-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Trained to expertly handle OpenAI API features, usage patterns, and best practices.

**Tags:** api, general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `openapi-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in designing, documenting, and optimizing APIs using OpenAPI specifications.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `php-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Specialized in developing efficient, secure, and modern PHP applications adhering to best practices.

**Tags:** general, php  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `prisma-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Write efficient, type-safe, and maintainable database queries using Prisma.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `rabbitmq-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in RabbitMQ messaging, configuration, and optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `rest-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Master in designing and implementing RESTful APIs with focus on best practices, HTTP methods, status codes, and resource modeling.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `rollup-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in Rollup.js for bundling JavaScript projects with optimal performance and configuration.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `rust-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in writing idiomatic Rust code with focus on safety, concurrency, and performance.

**Tags:** general, rust  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `scala-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Scala expert specializing in functional programming, type safety, and performance optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `sequelize-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in Sequelize ORM, proficient in database modeling, querying, associations, and migrations. Optimizes Sequelize usage for performance and data integrity.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `stripe-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 23/100 |

> This agent specializes in managing and optimizing Stripe integrations, handling payments, managing subscriptions, and utilizing Stripe APIs.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `tauri-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in Tauri for building cross-platform desktop applications leveraging web technologies.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `typescript-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Expert in TypeScript specializing in type safety, async patterns, and modern ES features. Use PROACTIVELY for TypeScript development, refactoring, or type system optimization.

**Tags:** general, typescript  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `websocket-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 22/100 |

> Specializes in WebSocket protocol, implementation, and application. Provides expertise for real-time data exchange using WebSockets.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Mobile (15)

##### `expo-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 22/100 |

> Expert in developing, optimizing, and maintaining applications using the Expo framework for React Native.

**Tags:** mobile  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `kotlin-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 22/100 |

> Expert in Kotlin programming language, focusing on idiomatic Kotlin code, coroutines, extension functions, and memory management.

**Tags:** kotlin, mobile  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `react-native-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 22/100 |

> Expert in React Native development focusing on cross-platform mobile applications with optimal performance and native integrations.

**Tags:** mobile, react  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Security (12)

##### `owasp-top10-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Security | 22/100 |

> OWASP Top 10 expert specializing in identifying and mitigating the most critical web application security risks.

**Tags:** security  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Testing (73)

##### `agile-sprint-planner` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 80/100 |

> Comprehensive agile project management specialist focusing on user story creation, sprint planning, estimation techniques, and backlog management.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 📝 User Story Creation Framework · Story Title · Story Details · User Story · Story Details

##### `angular-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 79/100 |

> Expert Angular developer specializing in Angular 17+, signals, standalone components, and modern Angular patterns.

**Tags:** angular, testing  
**File sections:** 🎯 Core Expertise · 🚀 Angular 17+ with Signals and Standalone Components · 🧪 Testing with Jasmine and Jest · 🔧 Development Workflow

##### `clean-architecture-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 78/100 |

> Expert in implementing Clean Architecture principles with proper separation of concerns, dependency inversion, and testable code

**Tags:** testing  
**File sections:** Core Principles · Architecture Implementation · Best Practices

##### `clojure-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 80/100 |

> Expert in Clojure functional programming with immutable data structures, concurrency primitives, macros, and JVM interop.

**Tags:** testing  
**File sections:** Core Expertise · Development Approach · Modern Clojure Development Practices · Best Practices

##### `dart-flutter-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 79/100 |

> Expert in Dart language and Flutter framework with modern patterns, state management, performance optimization, and platform-specific development

**Tags:** flutter, testing  
**File sections:** Core Capabilities · Modern Dart 3+ Patterns · Flutter State Management · Advanced Flutter Widgets · Platform-Specific Development

##### `kotlin-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 79/100 |

> Expert Kotlin developer specializing in Android development, multiplatform Kotlin, and modern Kotlin patterns.

**Tags:** kotlin, testing  
**File sections:** 🎯 Core Expertise · 🚀 Modern Android Architecture with Jetpack Compose · 🧪 Testing Excellence · 🔧 Development Workflow

##### `microservices-architect` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 78/100 |

> Expert in designing and implementing scalable microservices architectures with modern patterns and best practices

**Tags:** testing  
**File sections:** Core Capabilities · Architecture Patterns · Deployment and Operations

##### `rust-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 79/100 |

> Expert Rust developer specializing in systems programming, memory safety, and performance optimization.

**Tags:** rust, testing  
**File sections:** 🎯 Core Expertise · 🚀 Idiomatic Rust Patterns · 🧪 Testing Excellence · 🔧 Development Workflow

##### `swift-expert` — ★★☆☆☆ **44/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 79/100 |

> Expert Swift developer specializing in iOS/macOS development, SwiftUI, and modern Swift patterns. PROACTIVELY assists with Swift code analysis, development, and best practices.

**Tags:** swift, testing  
**File sections:** 🎯 Core Expertise · 🚀 SwiftUI Modern Patterns · 🧪 Testing Excellence · 🔧 Development Workflow

#### Backend (26)

##### `rails-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 21/100 |

> Master Ruby on Rails for building scalable, maintainable, and performant web applications.

**Tags:** backend, ruby  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Frontend (23)

##### `svelte-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 21/100 |

> Master Svelte.js development with a focus on building performant, maintainable, and idiomatic Svelte applications.

**Tags:** frontend  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### General (219)

##### `css-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 21/100 |

> Master CSS stylist with expertise in layouts, responsive design, animations, and accessibility.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `magento-theme-developer` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [rubenzantingh/claude-code-magento-agents](https://github.com/rubenzantingh/claude-code-magento-agents) | ⭐ 110 | General | 37/100 |

> Expert Magento 2 theme development specialist focusing on creating custom themes, child themes, and theme modifications.

**Tags:** general, magento  
**File sections:** Core Expertise · Theme Development Process · Specialized Theme Types · Advanced Theme Techniques · Development Best Practices

##### `pulumi-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 21/100 |

> Expert in Pulumi infrastructure as code for cloud resources

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Testing (73)

##### `expressjs-nodejs-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 76/100 |

> Expert in Express.js and Node.js backend development with modern patterns, middleware, authentication, testing, and production deployment.

**Tags:** javascript, testing  
**File sections:** Core Expertise · Development Approach · Best Practices

##### `laravel-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 76/100 |

> Expert in Laravel PHP framework with modern patterns, Eloquent ORM, authentication, testing, and deployment.

**Tags:** php, testing  
**File sections:** Core Expertise · Development Approach · Best Practices

##### `scala-expert` — ★★☆☆☆ **43/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 77/100 |

> Expert in Scala 3 with advanced functional programming, type system features, and JVM ecosystem integration

**Tags:** testing  
**File sections:** Core Capabilities · Scala 3 Modern Syntax · Advanced Functional Programming · ZIO and Effect Systems

#### AI / ML (9)

##### `tensorflow-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | AI / ML | 17/100 |

> Expert in TensorFlow, specializing in developing, optimizing, and deploying machine learning models using TensorFlow framework.

**Tags:** ai  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Backend (26)

##### `actix-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 17/100 |

> Expert in Actix for building high-performance web applications with Rust

**Tags:** backend, rust  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `django-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 17/100 |

> Write expert Django code with optimized models, views, and templates.

**Tags:** backend, go, python  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `express-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 17/100 |

> Specializes in building performant and scalable web applications using Express.js.

**Tags:** backend, javascript  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `gin-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 17/100 |

> Create a Claude Code Agent that is an expert in the Gin web framework for Go, focusing on efficient web server implementation and optimization.

**Tags:** backend, go  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `spring-boot-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 17/100 |

> Expert in developing, optimizing, and maintaining Spring Boot applications with best practices and modern techniques for enterprise-grade applications.

**Tags:** backend, java  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Database (10)

##### `mongodb-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 17/100 |

> Master MongoDB operations, schema design, performance optimization, and data modeling.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Frontend (23)

##### `tailwind-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 17/100 |

> Expert in Tailwind CSS for efficient and responsive styling of web projects, utilizing utility-first approaches and responsive design principles.

**Tags:** frontend  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### General (219)

##### `auth0-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in Auth0 implementation, configuration, and best practices

**Tags:** general, security  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `clojure-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master Clojure development with a focus on functional programming, immutability, concurrency, and Lisp macros.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `csharp-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in C# programming focusing on best practices, performance optimization, and code quality. Use PROACTIVELY for C# refactoring, optimization, or complex patterns.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `fastify-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 18/100 |

> Expert in building high-performance Node.js applications using Fastify framework. Specializes in plugins, lifecycle management, and performance optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `flyway-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master Flyway for database migrations, versioning, and schema management. Optimizes migration scripts, ensures version compatibility, and improves deployment processes.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `grpc-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 18/100 |

> Specialist in gRPC protocol, mastering streaming, services, and transport optimization for scalable, high-performance systems.

**Tags:** api, general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `java-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master Java developer specializing in writing efficient, clean, and maintainable Java code across various domains.

**Tags:** general, java  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `knex-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expertise in Knex.js for SQL database manipulation, migration handling, and query building in Node.js environments.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `loki-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master in building, managing, and optimizing Loki for efficient log aggregation and querying.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `mongoose-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Mongoose ODM specialist for MongoDB, proficient in schema design, query optimization, and data validation.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `mqtt-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 18/100 |

> Master of MQTT protocol, focusing on message brokering, QoS levels, and efficient IoT communication.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `neo4j-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in Neo4j graph database specializing in Cypher queries, graph modeling, and optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `opensearch-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 18/100 |

> Expert in OpenSearch cluster management, query optimization, indexing strategies, and performance tuning.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `opentelemetry-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master in OpenTelemetry for observability, tracing, metrics, and logs.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `pandas-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 18/100 |

> Expert in data manipulation and analysis using pandas library in Python.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `perl-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master Perl scripting with regular expressions, data manipulation, CPAN modules, and advanced text processing.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `playwright-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in Playwright testing for modern web applications. Specializes in test automation with Playwright, ensuring robust, reliable, and maintainable test suites.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `project-task-planner` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | General | 34/100 |

> Use this agent when you need to create a comprehensive development task list from a Product Requirements Document (PRD).

**Tags:** general  
**File sections:** Overview · 1. Project Setup · 2. Backend Foundation

##### `prometheus-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in Prometheus for monitoring, alerting, and performance optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `puppeteer-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in automating browser interactions using Puppeteer.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `python-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master advanced Python features, optimize performance, and ensure code quality. Expert in clean, idiomatic Python and comprehensive testing.

**Tags:** general, python  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `ruby-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in Ruby programming language, focusing on idiomatic Ruby, performance optimization, and best practices.

**Tags:** general, ruby  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `scikit-learn-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master scikit-learn for machine learning, focusing on model selection, feature engineering, and hyperparameter tuning.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `sidekiq-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Specialist in optimizing and managing Sidekiq for efficient job processing and background task management.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `sns-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Master of Amazon Simple Notification Service (SNS) for message management and notification solutions.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `solidjs-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> SolidJS expert specializing in creating efficient and reactive UI components using SolidJS.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `trpc-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 17/100 |

> Expert in building reliable, efficient, and type-safe backend services using tRPC.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Mobile (15)

##### `ios-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 17/100 |

> Write high-quality iOS applications using Swift and SwiftUI, ensuring optimal performance, user-friendly interfaces, and adherence to Apple's guidelines.

**Tags:** mobile  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `swift-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 17/100 |

> Write efficient, idiomatic Swift code with a focus on safety, performance, and modern features.

**Tags:** mobile, swift  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `swiftui-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 17/100 |

> Expert in SwiftUI development, focusing on building dynamic, responsive, and maintainable applications for Apple platforms.

**Tags:** mobile, swift  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Testing (73)

##### `django-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 75/100 |

> Expert Django developer specializing in Django 4+, DRF, async views, and modern Django patterns. PROACTIVELY assists with Django code analysis, development, and optimization.

**Tags:** go, python, testing  
**File sections:** 🎯 Core Expertise · 🚀 Modern Django with DRF and Async Support · 🧪 Testing with Django Test Framework

##### `git-workflow-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 74/100 |

> Git workflow and version control expert for advanced Git strategies and team collaboration.

**Tags:** testing  
**File sections:** Core Expertise · Advanced Git Workflow Strategies · [$version] - $(date +%Y-%m-%d)

##### `performance-optimization-specialist` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 75/100 |

> Expert in comprehensive performance optimization across frontend, backend, database, and infrastructure with profiling and monitoring

**Tags:** testing  
**File sections:** Core Capabilities · Frontend Performance Optimization · Backend Performance Optimization

##### `release-manager` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 73/100 |

> Comprehensive release management expert specializing in release planning, changelog generation, version management, and deployment orchestration.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 📋 Comprehensive Release Management Framework · Changes · Quality Gates · Deployment Information · Rollback Plan

##### `spring-boot-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 75/100 |

> Expert Spring Boot developer specializing in Spring Boot 3+, reactive programming, microservices, and cloud patterns.

**Tags:** java, testing  
**File sections:** 🎯 Core Expertise · 🚀 Spring Boot 3 with Reactive Programming · 🧪 Testing with TestContainers and WebTestClient

##### `test-automation-specialist` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 74/100 |

> Expert in comprehensive test automation strategies including unit, integration, E2E, and performance testing with modern frameworks

**Tags:** testing  
**File sections:** Core Capabilities · Testing Implementations

##### `testcafe-expert` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Testing | 17/100 |

> Expert in writing and optimizing TestCafe tests for reliable and maintainable UI testing.

**Tags:** testing  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `vue-specialist` — ★★☆☆☆ **42/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 75/100 |

> Expert Vue.js developer specializing in Vue 3, Composition API, Nuxt.js, and modern Vue patterns. PROACTIVELY assists with Vue.js code analysis, development, and optimization.

**Tags:** testing, vue  
**File sections:** 🎯 Core Expertise · 🚀 Vue 3 Composition API Patterns · 🧪 Testing with Vitest and Vue Test Utils

#### Backend (26)

##### `nestjs-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 16/100 |

> Expert in building scalable and efficient applications using the NestJS framework. Focused on design patterns, best practices, and performance optimization specific to NestJS.

**Tags:** backend, javascript  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Database (10)

##### `cassandra-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 16/100 |

> Master in Cassandra database design, optimization, and management. Provides expertise on data modeling, performance tuning, and query strategies.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### DevOps (8)

##### `jenkins-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | DevOps | 16/100 |

> Jenkins expert specializing in continuous integration, delivery, and deployment automation. Mastery of Jenkinsfile scripting, pipelines, and integration.

**Tags:** devops  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### General (219)

##### `ava-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in Ava for running tests and managing test suites efficiently.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `braintree-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Braintree specialist focusing on payment gateways, integrations, and optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `circleci-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in CircleCI configuration, optimization, and troubleshooting for seamless continuous integration and delivery.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `cypress-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in Cypress testing framework for end-to-end testing and automation.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `dart-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Write idiomatic Dart code, optimize for Dart VM, and ensure cross-platform compatibility for Flutter applications.

**Tags:** flutter, general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `elixir-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expertise in Elixir programming, specializing in functional programming, concurrency, and fault-tolerant systems.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `elk-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in ELK stack management, optimization, and deployment. Specializes in Elasticsearch, Logstash, and Kibana for scalable log and data processing.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `github-actions-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in GitHub Actions for automating workflows and CI/CD processes.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `haskell-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Write idiomatic Haskell code with advanced type system features, monads, and functional programming techniques.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `jquery-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> jQuery specialist focusing on efficient DOM manipulation, event handling, and AJAX interactions. Expert in optimizing jQuery code and ensuring cross-browser compatibility.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `lua-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Write efficient and idiomatic Lua code, mastering the language features, patterns, and performance optimization.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `nodejs-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Specializes in Node.js development, focusing on performance optimization, asynchronous programming, and best practices for building scalable server-side applications.

**Tags:** general, javascript  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `phoenix-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in Phoenix framework, optimizing web applications, and ensuring best practices. Handles performance tuning, real-time features, and idiomatic Elixir patterns.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `selenium-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Expert in automated browser testing using Selenium.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `sql-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 16/100 |

> Master complex SQL queries, optimize execution plans, and ensure database integrity. Expert in index strategies, query optimization, and data modeling.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Mobile (15)

##### `flutter-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Mobile | 16/100 |

> Specialist in Flutter development, focusing on building high-quality, performant, and maintainable cross-platform applications.

**Tags:** flutter, mobile  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Quality (7)

##### `senior-code-reviewer` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Quality | 12/100 |

> Use this agent when you need comprehensive code review from a senior fullstack developer perspective, including analysis of code quality, architecture…

**Tags:** quality  
**File sections:** —

#### Testing (73)

##### `healthcare-hipaa-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 71/100 |

> Expert in healthcare technology compliance, HIPAA regulations, medical data security, and healthcare interoperability standards

**Tags:** testing  
**File sections:** Core Capabilities · HIPAA-Compliant Data Layer

##### `jest-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Testing | 16/100 |

> Expert in testing JavaScript applications using Jest, ensuring comprehensive test coverage and efficient test practices.

**Tags:** testing  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `machine-learning-engineer` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 71/100 |

> Expert in MLOps, model deployment, monitoring, and production ML systems.

**Tags:** ml, testing  
**File sections:** Core Expertise · Development Approach · Best Practices

##### `mocha-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Testing | 16/100 |

> Expertise in Mocha, the JavaScript test framework running on Node.js, focusing on writing, organizing, and executing tests efficiently.

**Tags:** testing  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `performance-testing-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 71/100 |

> Expert in performance testing, load testing, stress testing, and performance optimization with comprehensive monitoring and analysis

**Tags:** testing  
**File sections:** Core Capabilities · Load Testing Implementations

##### `python-data-scientist` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 71/100 |

> Expert in Python data science with pandas, numpy, scikit-learn, visualization, and statistical analysis.

**Tags:** python, testing  
**File sections:** Core Expertise · Development Approach · Best Practices

##### `supatest_rag-architecture-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 72/100 |

> # RAG Architecture Expert Agent ```yaml --- name: rag-architecture-expert description: Specialist in Retrieval-Augmented Generation systems design and optimization.

**Tags:** ml, testing  
**File sections:** Core Expertise Areas · Usage Notes · Related Agents · Additional Resources

##### `vitest-expert` — ★★☆☆☆ **41/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Testing | 16/100 |

> Create organized, comprehensive, and efficient unit tests with Vitest, ensuring high code quality and stability.

**Tags:** testing  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Backend (26)

##### `backend-typescript-architect` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents) | ⭐ 1.3k | Backend | 10/100 |

> Use this agent when you need expert backend development work in TypeScript with Bun runtime, including API design, database integration, server archit…

**Tags:** backend, typescript  
**File sections:** —

#### Security (12)

##### `security-audit-expert` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Security | 70/100 |

> Comprehensive security specialist focusing on vulnerability assessment, secure coding practices, penetration testing, and compliance frameworks.

**Tags:** security, testing  
**File sections:** 🎯 Core Expertise · 🔒 Comprehensive Security Audit Framework

#### Testing (73)

##### `design-patterns-expert` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 68/100 |

> Expert in implementing classic and modern design patterns with clean, maintainable code solutions.

**Tags:** testing  
**File sections:** Pattern Selection Framework · Modern Pattern Applications · Anti-Patterns to Avoid · Refactoring with Patterns · Functional Programming Patterns · Microservices Patterns

##### `performance-profiler` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 69/100 |

> Comprehensive performance analysis expert specializing in bottleneck identification, load testing, optimization strategies, and performance monitoring.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🚀 Comprehensive Performance Analysis Framework

##### `supatest_llmops-engineer` — ★★☆☆☆ **40/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 69/100 |

> # LLMOps Engineer Agent ```yaml --- name: llmops-engineer description: Expert in operationalizing LLMs in production environments.

**Tags:** ml, testing  
**File sections:** Core Expertise Areas · Usage Notes · Related Agents · Additional Resources

#### AI / ML (9)

##### `langchain-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | AI / ML | 11/100 |

> Expert in LangChain with focus on document processing, pipeline construction, and optimization.

**Tags:** ai, ml  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `vector-db-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | AI / ML | 11/100 |

> Expert in Vector Databases, handling indexing, querying, and optimization of vector data.

**Tags:** ai  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Backend (26)

##### `fastapi-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 11/100 |

> FastAPI development with an emphasis on best practices, optimization, and robust design patterns.

**Tags:** backend, python  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `fiber-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 11/100 |

> Master in fiber technology specializing in manufacturing, properties, applications, and innovations in fiber industry.

**Tags:** backend, go  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `flask-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Backend | 11/100 |

> Expert in developing and optimizing web applications using the Flask framework.

**Tags:** backend, python  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Database (10)

##### `elasticsearch-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Database | 11/100 |

> Master Elasticsearch operations, query optimizations, and cluster management.

**Tags:** database  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### DevOps (8)

##### `kubernetes-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | DevOps | 11/100 |

> Master Kubernetes for container orchestration, pod management, and cluster optimization. Use PROACTIVELY for Kubernetes deployments, scaling, or troubleshooting.

**Tags:** devops, kubernetes  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `terraform-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | DevOps | 11/100 |

> Expert in infrastructure-as-code using Terraform, specializing in efficient and reliable infrastructure provisioning and management.

**Tags:** devops, terraform  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Frontend (23)

##### `astro-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 11/100 |

> Expert in Astro with deep understanding of component architecture, content collections, and static site optimization.

**Tags:** frontend  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `vue-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | Frontend | 11/100 |

> Vue.js expert specializing in modern Vue applications, components, and state management.

**Tags:** frontend, vue  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### General (219)

##### `0xfurai_sqs-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> --- name: sqs-expert description: Expertise in Amazon SQS for reliable, scalable message queuing.

**Tags:** general  
**File sections:** —

##### `grafana-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Expert in Grafana dashboard creation, visualization best practices, and alerting systems. Proactively used for monitoring and reporting.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `kafka-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Write highly efficient, scalable, and fault-tolerant Kafka architectures.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `keycloak-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Keycloak specialist for identity and access management, realm configuration, and user federation.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `mariadb-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Expert in MariaDB database management, optimization, and best practices.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `mssql-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Expert in Microsoft SQL Server handling query optimization, database design, and advanced T-SQL features.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `remix-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Expert in building performant, scalable web applications using the Remix framework, with deep understanding of loaders, actions, and dynamic routing.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `typeorm-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Expertise in TypeORM for defining and managing data models with efficient database interactions in Node.js applications

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

##### `webpack-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | ⭐ 911 | General | 11/100 |

> Expert in Webpack configuration, optimization, and troubleshooting for efficient bundling and module loading.

**Tags:** general  
**File sections:** Focus Areas · Approach · Quality Checklist · Output

#### Security (12)

##### `fintech-security-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Security | 66/100 |

> Expert in financial services security, compliance, and secure payment processing with PCI DSS, SOX, and regulatory standards

**Tags:** security, testing  
**File sections:** Core Capabilities · Secure Payment Processing

#### Testing (73)

##### `aspnet-core-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 67/100 |

> ASP.NET Core framework expert for modern C# web applications and APIs.

**Tags:** testing  
**File sections:** Core Expertise · Advanced ASP.NET Core 8 Application Architecture

##### `elixir-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 66/100 |

> Expert in Elixir and Phoenix with actor model, OTP, fault tolerance, and distributed systems patterns

**Tags:** testing  
**File sections:** Core Capabilities · Core Elixir Patterns · OTP Design Patterns

##### `fastapi-expert` — ★★☆☆☆ **39/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 67/100 |

> FastAPI framework expert for modern Python async web APIs. PROACTIVELY assists with FastAPI development when working on Python web APIs, async programming, or API architecture.

**Tags:** python, testing  
**File sections:** Core Expertise · Advanced FastAPI Application Architecture

#### General (219)

##### `vibe-coding-coach` — ★★☆☆☆ **38/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | General | 23/100 |

> Use this agent when users want to build applications through conversation, focusing on the vision and feel of their app rather than technical implementation details.

**Tags:** general  
**File sections:** Core Approach · Understanding User Vision · Communication Style · Technical Implementation · Security-First Development · Development Process

#### Testing (73)

##### `supatest_llm-finetuning-expert` — ★★☆☆☆ **38/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 64/100 |

> # LLM Fine-tuning Expert Agent ```yaml --- name: llm-finetuning-expert description: Expert in efficient LLM customization using PEFT techniques.

**Tags:** ml, testing  
**File sections:** Core Expertise Areas · Usage Notes · Related Agents · Additional Resources

#### General (219)

##### `content-writer` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | General | 21/100 |

> Use this agent when you need to create compelling, informative content that explains complex topics in simple terms.

**Tags:** general  
**File sections:** —

#### Quality (7)

##### `code-refactorer` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | Quality | 21/100 |

> Use this agent when you need to improve existing code structure, readability, or maintainability without changing functionality.

**Tags:** quality  
**File sections:** —

#### Testing (73)

##### `aws-cloud-architect` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 61/100 |

> Expert in AWS cloud architecture with serverless patterns, infrastructure as code, security best practices, and cost optimization.

**Tags:** testing  
**File sections:** Core Architectural Decision Framework · Architecture Patterns & Trade-offs · Cost Optimization Framework · Security Architecture Principles · Production Deployment Patterns · Well-Architected Framework Checklist

##### `dependency-manager` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 61/100 |

> Comprehensive dependency management specialist focusing on package management, security auditing, version updates, and license compliance.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🔐 Security Auditing Framework · 📊 Dependency Management Automation

##### `environment-manager` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 62/100 |

> Comprehensive environment management expert specializing in development, staging, and production environments, configuration management, infrastructur…

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🏗️ Comprehensive Environment Management Framework

##### `project-setup-wizard` — ★★☆☆☆ **37/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 62/100 |

> Project setup wizard for initializing new development projects with best practices.

**Tags:** testing  
**File sections:** Core Expertise · Project Templates and Scaffolding

##### `rails-expert` — ★★☆☆☆ **36/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 58/100 |

> Ruby on Rails framework expert for modern MVC web applications. PROACTIVELY assists with Rails development when working on Ruby web applications, MVC patterns, or RESTful APIs.

**Tags:** ruby, testing  
**File sections:** Core Expertise · Advanced Rails Application Architecture

#### General (219)

##### `prd-writer` — ★★☆☆☆ **35/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | [iannuttall/source-agents](https://github.com/iannuttall/source-agents) | ⭐ 125 | General | 17/100 |

> Use this agent when you need to create a comprehensive Product Requirements Document (PRD) for a software project or feature.

**Tags:** general  
**File sections:** —

#### Testing (73)

##### `nextjs-expert` — ★★☆☆☆ **35/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 56/100 |

> Next.js framework expert for modern React applications with SSR/SSG.

**Tags:** react, testing  
**File sections:** Core Expertise · Advanced Next.js 13+ Application Architecture

##### `technical-debt-analyst` — ★★☆☆☆ **35/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 57/100 |

> Comprehensive technical debt specialist focusing on identification, assessment, refactoring strategies, and systematic debt reduction.

**Tags:** testing  
**File sections:** 🎯 Core Expertise · 🔍 Comprehensive Debt Analysis Framework

##### `supatest_basic-agent-template` — ★☆☆☆☆ **27/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | supatest | ⭐ — | Testing | 36/100 |

> # [Agent Name] Agent ```yaml --- name: agent-name-kebab-case description: Brief description of the agent's capabilities and when to use it.

**Tags:** testing  
**File sections:** [Main Section Title] · [Additional Section] · Usage Notes · Related Agents · Additional Resources

#### General (219)

##### `ui-engineer` — ★☆☆☆☆ **21/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | navin | ⭐ — | General | 22/100 |

> Use this agent when you need to create, modify, or review frontend code, UI components, or user interfaces. Examples:

**Tags:** general  
**File sections:** —

#### Backend (26)

##### `python-backend-engineer` — ★☆☆☆☆ **20/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | navin | ⭐ — | Backend | 20/100 |

> Use this agent when you need to develop, refactor, or optimize Python backend systems using modern tooling like uv.

**Tags:** backend, python  
**File sections:** —

#### Quality (7)

##### `senior-code-reviewer` — ★☆☆☆☆ **17/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | navin | ⭐ — | Quality | 12/100 |

> Use this agent when you need comprehensive code review from a senior fullstack developer perspective, including analysis of code quality, architecture…

**Tags:** quality  
**File sections:** —

#### Backend (26)

##### `backend-typescript-architect` — ★☆☆☆☆ **16/100**
| Tier | Source | Stars | Category | Content score |
|------|--------|-------|----------|---------------|
| community | navin | ⭐ — | Backend | 10/100 |

> Use this agent when you need expert backend development work in TypeScript with Bun runtime, including API design, database integration, server archit…

**Tags:** backend, typescript  
**File sections:** —

---

## Coaching & Sport Management Agents (Finta)

> **Source:** `finta` · **Category:** `coaching` · **Tier:** community  
> These 11 agents are generated from the Finta coaching knowledge map, covering football coaching, multi-sport coaching, and holistic/professional management. Select the **Coaching & Sport Management** domain in the wizard to activate all of them automatically.

---

### Coaching (11)

##### `decision-science-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 82/100 |

> Cognitive bias and decision science expert for coaching — applies dual-process theory (System 1 vs System 2), bias mitigation protocols (Devil's Advocate, Blind Analysis, Pre-Mortem), and MCDA/AHP/TOPSIS frameworks to improve judgment in talent selection, tactical planning, and organisational management.

**Tags:** coaching, decision-science, bias, football, sport, holistic  
**Domains:** ⚽ Football · 🏃 Sport · 🔮 Holistic  
**Key concepts:** Confirmation Bias, Availability Heuristic, Anchoring, Sunk Cost Fallacy, Outcome Bias, Bayesian Inference, Scenario Planning, Pre-Mortem Analysis

---

##### `complex-systems-coach` — ★★★★☆ **80/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 80/100 |

> Complex systems and ecological dynamics specialist — applies emergence theory, feedback loop analysis, and the Constraints-Led Approach to understand teams as adaptive organisms. Covers the PCS relationist model (Diniz), DEFCON Disintegration Index, and affordance landscape design for non-linear training environments.

**Tags:** coaching, complex-systems, ecological-dynamics, football, sport  
**Domains:** ⚽ Football · 🏃 Sport  
**Key concepts:** Non-Linear Dynamics, Emergence, Attractor States, Feedback Loops, Ecological Dynamics, Affordance Landscape, Complexity Metrics, DEFCON Index

---

##### `coaching-philosophy` — ★★★★★ **85/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 85/100 |

> Coaching philosophy and game model architect — builds coaching identity, game models (positional, relational, hybrid), morphocycle weekly structures, and tactical periodisation frameworks. Covers Guardiola 20-zone geometry, Diniz PCS model, Bielsa, Ancelotti, Thiago Motta, Arne Slot, and UEFA licensing pathways.

**Tags:** coaching, game-model, tactics, football, sport, morphocycle  
**Domains:** ⚽ Football · 🏃 Sport  
**Key concepts:** Morphocycle, Tactical Periodisation, Positional Play, Relational Football, Principles & Sub-Principles, Identity-Based Style, Reflective Practice, UEFA Licensing

---

##### `physical-preparation-coach` — ★★★★☆ **83/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 83/100 |

> Physical preparation and load management specialist — designs periodisation models (tactical, block, linear), monitors GPS/wearable load metrics (TRIMP, PlayerLoad, sRPE), manages recovery protocols (HRV, nutrition timing, cold water immersion), and prevents injury through Acute:Chronic Workload Ratio monitoring.

**Tags:** coaching, physical, load-management, gps, football, sport  
**Domains:** ⚽ Football · 🏃 Sport  
**Key concepts:** Tactical Periodisation, TRIMP, PlayerLoad, HRV, ACWR, Nordic Hamstring Curls, FMS/SFMA, Match Load Analysis, Fixture Congestion

---

##### `sport-neuroscience-coach` — ★★★★☆ **81/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 81/100 |

> Sport neuroscience and psychophysiology expert — applies neural plasticity, perceptual-cognitive training (Quiet Eye, anticipation, peripheral vision), autonomic regulation (HRV, cortisol), and neuroscience measurement tools (EEG, NeuroTracker 3D-MOT, fMRI) to optimise athlete brain-body performance.

**Tags:** coaching, neuroscience, hrv, cognition, football, sport, holistic  
**Domains:** ⚽ Football · 🏃 Sport · 🔮 Holistic  
**Key concepts:** Neuroplasticity, Quiet Eye Technique, Pattern Recognition, ANS Regulation, Sensorimotor Integration, NeuroTracker 3D-MOT, Executive Function Score, Cortisol Management

---

##### `mental-preparation-coach` — ★★★★★ **84/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 84/100 |

> Mental preparation and psychological resilience specialist — applies the Chimp Paradox model (Prof. Steve Peters), stress inoculation training, pre-match protocols, Self-Determination Theory (Deci & Ryan), and emotional regulation techniques to build psychologically safe high-performance environments.

**Tags:** coaching, mental, psychology, resilience, football, sport, holistic  
**Domains:** ⚽ Football · 🏃 Sport · 🔮 Holistic  
**Key concepts:** Chimp Paradox, Psychological Safety, Stress Inoculation, Pre-Match Protocols, Self-Determination Theory, Motivational Climate, Emotional Regulation, Resilience Conditioning

---

##### `skill-acquisition-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 82/100 |

> Skill acquisition and learning science specialist — designs training using the Constraints-Led Approach, ecological dynamics, variable and interleaved practice, and Representative Learning Design. Covers OPTIMAL Theory, implicit vs explicit learning, SSG design, and motor learning transfer measurement.

**Tags:** coaching, skill-acquisition, motor-learning, ssg, football, sport  
**Domains:** ⚽ Football · 🏃 Sport  
**Key concepts:** Constraints-Led Approach, Ecological Dynamics, Variable Practice, Representative Learning Design, OPTIMAL Theory, Small-Sided Games, Contextual Interference, Non-Linear Pedagogy

---

##### `biomechanics-movement-coach` — ★★★★☆ **80/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 80/100 |

> Biomechanics and functional movement expert — analyses sprint mechanics, Force-Velocity profiles, movement screening (FMS/SFMA, joint-by-joint), CMJ/SJ/RSI jump analysis, musculo-tendinous health (H:Q ratio, Nordic curls), Change of Direction deficits, and biomechanical technologies (force platforms, 3D motion capture, EMG).

**Tags:** coaching, biomechanics, sprint, movement, injury, football, sport  
**Domains:** ⚽ Football · 🏃 Sport  
**Key concepts:** Force-Velocity Profile, FMS/SFMA, CMJ/SJ/RSI, Nordic Hamstring Curls, H:Q Ratio (3:2), COD Deficit, Kinovea, KINEXON PERFORM LPS, 3D Motion Capture

---

##### `team-culture-leadership` — ★★★★☆ **83/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 83/100 |

> Team culture and ethical leadership specialist — builds psychological safety, mastery motivational climate, distributed leadership structures, and inclusive environments. Applies the Meridian Compass leadership model, Motivational Interviewing, Self-Determination Theory, and cultural audit frameworks.

**Tags:** coaching, culture, leadership, inclusion, football, sport, holistic  
**Domains:** ⚽ Football · 🏃 Sport · 🔮 Holistic  
**Key concepts:** Psychological Safety, Vulnerability-Based Trust, Motivational Interviewing, Meridian Compass, Distributed Leadership, SDT Mastery Climate, Inclusion Metrics, Cultural Alignment Audit

---

##### `ethics-behavioral-economics` — ★★★★☆ **79/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 79/100 |

> Ethics and behavioral economics specialist for sport management — identifies sunk cost fallacies, outcome bias, transfer market anchoring, loss aversion, and status quo resistance. Covers FFP compliance, anti-corruption integrity systems, player welfare ethics, and nudge/choice architecture for sport organisations.

**Tags:** coaching, ethics, behavioral-economics, ffp, football, sport, holistic  
**Domains:** ⚽ Football · 🏃 Sport · 🔮 Holistic  
**Key concepts:** Sunk Cost Fallacy, Outcome Bias, Market Value Anchoring, FFP, Blind Analysis Procedures, Anti-Corruption, Player Welfare Ethics, Nudge Architecture

---

##### `sport-technology-analytics` — ★★★★★ **84/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Coaching | 84/100 |

> Sport technology and analytics specialist — implements GPS/LPS tracking (KINEXON, Tracab, GPS vests), video analysis workflows (Hudl Sportscode, Wyscout, Nacsport), AI/ML tactical tools (TacticAI/DeepMind, Bayesian inference, Monte Carlo simulations), FBref metrics (xG, xT, PPDA), and performance dashboards.

**Tags:** coaching, analytics, gps, video, xg, ai, football, sport  
**Domains:** ⚽ Football · 🏃 Sport  
**Key concepts:** GPS/LPS Tracking, Hudl Sportscode, Wyscout, TacticAI (DeepMind), xG/npxG/xT/PPDA, NeuroTracker, Tableau/Power BI, Voronoi Diagrams, Pass Network Graphs

---

### Multi-Agent Coaching Pipelines

**Pre-Season Setup**
1. `coaching-philosophy` — Define game model and morphocycle
2. `physical-preparation-coach` — Design pre-season load plan
3. `skill-acquisition-coach` — Create constraints-led session library
4. `mental-preparation-coach` — Build psychological safety and pre-match protocols

**Player Recruitment**
1. `decision-science-coach` — Bias-audit the scouting process
2. `sport-technology-analytics` — Pull xG, PPDA, progressive carry data
3. `biomechanics-movement-coach` — Screen movement quality and injury risk
4. `ethics-behavioral-economics` — Validate against FFP and welfare obligations

**Performance Crisis Response**
1. `complex-systems-coach` — Diagnose systemic breakdown in team dynamics
2. `mental-preparation-coach` — Address psychological safety and resilience
3. `team-culture-leadership` — Assess cultural trust issues
4. `sport-neuroscience-coach` — Evaluate cognitive load and CNS fatigue

---

## Multi-Sport Performance Agents (Finta)

> **Source:** `finta` · **Category:** `sport` · **Tier:** community  
> These 11 agents mirror the coaching domain but apply to **all sports** — from athletics and swimming to basketball, rugby, and combat sports. Each agent is sport-agnostic and adapts its frameworks to the specific demands of any competitive discipline. Select the **Sport Performance** domain in the wizard to activate all of them automatically.

---

### Sport (11)

##### `sport-biomechanics-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Biomechanics and functional movement expert for multi-sport contexts — analyses sprint and sport-specific movement mechanics, force-velocity profiles, movement quality screening (FMS/SFMA), jump analysis, throwing/striking biomechanics, and musculo-tendinous health to optimise performance and reduce injury risk across all sports.

**Tags:** sport, multi-sport, biomechanics, movement, injury-prevention, performance  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Force-Velocity Profile, FMS/SFMA, CMJ/SJ/RSI, Musculo-Tendinous Health, H:Q Ratio, COD Deficit, Sprint Mechanics, Force Plates, 3D Motion Capture, EMG

---

##### `sport-complex-systems-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Complex systems and ecological dynamics specialist for multi-sport contexts — applies emergence theory, feedback loops, constraints-led training design, and affordance-based environments to team and individual sports to produce genuine tactical and technical adaptation rather than compliance with instructions.

**Tags:** sport, multi-sport, complex-systems, ecological-dynamics, tactical, constraints  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Emergence, Feedback Loops, Attractor States, Constraints-Led Approach, Affordance Landscape, Non-Linear Pedagogy, Collective Variables, Phase Transitions

---

##### `sport-decision-science-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Decision science and cognitive bias specialist for multi-sport coaches, performance directors, and selectors — audits decisions for active biases, applies MCDA/AHP/Bayesian frameworks, and builds structured decision systems across talent identification, squad selection, training load management, and sport organisation strategy.

**Tags:** sport, multi-sport, decision-science, bias, analytics, selection  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Confirmation Bias, Outcome Bias, MCDA, AHP, Bayesian Inference, Pre-Mortem Analysis, Talent Identification, Blind Analysis, Devil's Advocate Protocol

---

##### `sport-ethics-behavioral-economics` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Behavioral economics and sport ethics specialist for multi-sport contexts — identifies cognitive biases in sport management decisions, addresses anti-doping ethics, weight management ethics, body image in aesthetic sports, Paralympic inclusion, youth athlete welfare, and governance compliance across all sport organisations.

**Tags:** sport, multi-sport, ethics, behavioral-economics, governance, welfare  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Sunk Cost Fallacy, Loss Aversion, WADA Anti-Doping, Relative Energy Deficiency (RED-S), Paralympic Ethics, Youth Athlete Welfare, Nudge Architecture, Governance Compliance

---

##### `sport-mental-preparation-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Mental preparation and psychological resilience specialist for multi-sport contexts — applies Chimp Paradox (Peters), Stress Inoculation Training, IZOF, Self-Determination Theory, and pre-competition protocol design for both individual and team sport athletes across all performance levels and competition formats.

**Tags:** sport, multi-sport, mental-preparation, psychology, resilience, performance  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Chimp Paradox, IZOF, Stress Inoculation Training, Self-Determination Theory, Psychological Safety, Pre-Competition Routine, Emotional Regulation, Resilience Conditioning

---

##### `coaching-philosophy-sport` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Coaching philosophy architect for multi-sport contexts — builds coaching identity through reflective practice (Schön double-loop learning), constructs sport-specific coaching models, designs periodised training structures, and covers the spectrum from technical mastery (gymnastics, athletics) to tactical complexity (basketball, rugby) to ecological facilitation.

**Tags:** sport, multi-sport, philosophy, coaching-identity, periodisation, reflective-practice  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Reflective Practice, Double-Loop Learning, Schön, Coaching Identity, Sport-Specific Game Models, Tactical Periodisation, Ecological Facilitation, Mastery vs. Performance Climate

---

##### `sport-physical-preparation-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Physical preparation and sports science specialist for multi-sport contexts — designs periodisation models (tactical, block, CTL/ATL, undulating), monitors GPS/wearable load metrics (TRIMP, ACWR, PlayerLoad), manages evidence-based recovery, and prevents injury through individualised load profiling across team and individual sports.

**Tags:** sport, multi-sport, physical-preparation, periodisation, load-management, sports-science  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Periodisation (Block, Tactical, CTL/ATL), TRIMP, ACWR, PlayerLoad, HRV, Recovery Protocols, Fixture Congestion, GPS Tracking, Energy System Demands

---

##### `sport-skill-acquisition-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Skill acquisition and motor learning specialist for multi-sport contexts — designs training using constraints-led approach, ecological dynamics, representative learning design, variable and interleaved practice, differential learning, and small-sided or sport-equivalent game formats to optimise motor and tactical learning transfer across open and closed skill sports.

**Tags:** sport, multi-sport, skill-acquisition, motor-learning, constraints, transfer  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Constraints-Led Approach, Ecological Dynamics, Representative Learning Design, Variable Practice, Interleaved Practice, Differential Learning, Contextual Interference, Open vs. Closed Skills

---

##### `sport-neuroscience-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Sport neuroscience and psychophysiology specialist for multi-sport contexts — applies neural plasticity, perceptual-cognitive training (Quiet Eye, anticipation, reaction time), IZOF, sensorimotor integration, and field-applicable neuroscience tools (HRV, NeuroTracker, eye-tracking) to optimise athlete brain-body performance across all sport disciplines.

**Tags:** sport, multi-sport, neuroscience, psychophysiology, cognition, HRV  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Neuroplasticity, Quiet Eye, Anticipation Training, HRV Monitoring, NeuroTracker 3D-MOT, Sensorimotor Integration, Perceptual-Cognitive Training, Cortisol Rhythm

---

##### `sport-technology-analytics-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Sport technology and analytics specialist for multi-sport contexts — implements GPS/LPS tracking, sport-specific video analysis platforms, performance dashboards, advanced metrics (power, lactate, force plates), and AI/ML tools for data-driven coaching decisions across team and individual sports.

**Tags:** sport, multi-sport, technology, analytics, GPS, data, AI  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** GPS/LPS Tracking, Video Analysis Platforms, Force Plates, Lactate Threshold Testing, Performance Dashboards, Sport-Specific KPIs, AI/ML Tactical Tools, Wearable Integration

---

##### `sport-team-culture-leadership` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Sport | 82/100 |

> Team culture and ethical leadership architect for multi-sport contexts — builds psychological safety, motivational climate, distributed leadership, and inclusive environments for sport teams and national squads across all disciplines, including individual sport coaching relationships, national team dynamics, and sport-specific cultural challenges.

**Tags:** sport, multi-sport, team-culture, leadership, psychological-safety, inclusion  
**Domains:** 🏃 Sport (all disciplines)  
**Key concepts:** Psychological Safety, Motivational Climate, Distributed Leadership, Inclusion Frameworks, National Team Dynamics, Individual vs. Team Sport Culture, Coaching Relationship Quality

---

### Multi-Agent Sport Pipelines

**Athlete Development Programme**
1. `sport-physical-preparation-coach` — Design periodised annual training plan
2. `sport-skill-acquisition-coach` — Build representative learning environments
3. `sport-neuroscience-coach` — Add perceptual-cognitive training layer
4. `sport-mental-preparation-coach` — Develop psychological skills programme

**Competition Preparation (any sport)**
1. `sport-decision-science-coach` — Audit opponent analysis for bias
2. `sport-mental-preparation-coach` — Design IZOF-aligned pre-competition protocols
3. `sport-physical-preparation-coach` — Taper and activation plan
4. `sport-technology-analytics-coach` — Pull sport-specific performance metrics

**Injury Prevention Audit**
1. `sport-biomechanics-coach` — FMS/SFMA screening + Force-Velocity profiling
2. `sport-physical-preparation-coach` — ACWR review and load management
3. `sport-neuroscience-coach` — CNS fatigue and HRV monitoring

---

## Holistic Professional Development Agents (Finta)

> **Source:** `finta` · **Category:** `holistic` · **Tier:** community  
> These 12 agents cover **professional and personal development** — the life skills, career strategies, psychological competencies, and wellbeing practices that determine long-term professional success and personal fulfilment. Grounded in evidence-based frameworks from positive psychology, behavioural economics, coaching science, and learning science. Select the **Holistic Development** domain in the wizard to activate them automatically.

---

### Holistic (12)

##### `behavioral-change-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Behavioral change and habit formation specialist — applies Atomic Habits (Clear), Tiny Habits (Fogg), Transtheoretical Model, implementation intentions, commitment devices, and environment design to help individuals and organisations build durable behavioral change in professional and personal development contexts.

**Tags:** holistic, personal-development, professional-development, habits, behavioral-change, psychology  
**Domains:** 🔮 Holistic  
**Key concepts:** Atomic Habits, Habit Loop, Fogg Behavior Model (B=MAP), Transtheoretical Model, Implementation Intentions, Identity-Based Habits, Environment Design, Commitment Devices

---

##### `career-development-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Career strategy and professional development specialist — applies GROW model, deliberate practice for career skills, Career Anchor Theory (Schein), Ikigai framework, skill stacking, OKRs for personal use, and structured career planning to help individuals navigate career transitions, accelerate professional growth, and build long-term career capital.

**Tags:** holistic, professional-development, career, strategy, skill-development, transitions  
**Domains:** 🔮 Holistic  
**Key concepts:** Career Capital (Newport), Career Anchor Theory (Schein), GROW Model, Deliberate Practice, Ikigai, OKRs, Skill Stacking, Talent vs. Skill Distinction, Career Transition Architecture

---

##### `communication-influence-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Strategic communication and influence specialist — applies Cialdini's influence principles, nonviolent communication (Rosenberg), motivational interviewing, rhetoric and argumentation theory, and executive presence frameworks to help professionals communicate with clarity, credibility, and persuasive impact across all personal and professional contexts.

**Tags:** holistic, professional-development, communication, influence, persuasion, executive-presence  
**Domains:** 🔮 Holistic  
**Key concepts:** Cialdini's Six Principles + Unity, NVC (OFNR), Motivational Interviewing (OARS), Toulmin Argumentation, Pyramid Principle (Minto), Executive Presence (Hewlett), Ethos/Logos/Pathos

---

##### `emotional-intelligence-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Emotional intelligence and self-regulation specialist — applies Goleman's EQ model, Mayer-Salovey-Caruso MSCEIT framework, Dialectical Behavior Therapy skills, and neuroscience of emotion regulation to help professionals develop self-awareness, empathy, social skills, and emotional mastery in high-stakes personal and professional contexts.

**Tags:** holistic, personal-development, professional-development, emotional-intelligence, self-regulation, empathy  
**Domains:** 🔮 Holistic  
**Key concepts:** MSCEIT Four-Branch Model, Goleman EQ Competencies, Amygdala Hijack, Name-It-to-Tame-It, DBT Skills (TIPP, ACCEPTS), Compassion Fatigue, Emotional Granularity, Interoception

---

##### `financial-intelligence-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Personal financial intelligence and wealth psychology specialist — applies behavioural finance (Thaler, Kahneman), financial planning frameworks, investment psychology, money mindset research (Klontz), and financial literacy frameworks to help professionals develop financial competence, overcome cognitive biases in financial decisions, and build personal financial strategies aligned with life goals.

**Tags:** holistic, personal-development, financial-intelligence, behavioral-finance, wealth, money-mindset  
**Domains:** 🔮 Holistic  
**Key concepts:** Loss Aversion, Mental Accounting, Present Bias, Hyperbolic Discounting, Money Scripts (Klontz), Savings Rate, Compound Interest, Financial Priority Hierarchy, Ikigai Financial Alignment

---

##### `learning-mindset-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Learning science and growth mindset specialist — applies deliberate practice theory (Ericsson), growth vs. fixed mindset research (Dweck), spaced repetition, retrieval practice, interleaving, desirable difficulties, and metacognitive strategies to help professionals become faster, deeper, and more durable learners across all domains.

**Tags:** holistic, personal-development, professional-development, learning, growth-mindset, deliberate-practice  
**Domains:** 🔮 Holistic  
**Key concepts:** Deliberate Practice (Ericsson), Growth vs. Fixed Mindset (Dweck), Spaced Repetition, Testing Effect (Retrieval Practice), Interleaving, Desirable Difficulties, Fluency Illusion, Metacognitive Monitoring

---

##### `personal-leadership-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Personal leadership and influence specialist — applies values clarification (ACT), identity-based leadership, Emotional Intelligence (Goleman), Situational Leadership (Hersey-Blanchard), influence without authority (Cohen-Bradford), Essentialism (McKeown), and deep work principles to develop authentic, effective personal leadership in professional and personal contexts.

**Tags:** holistic, personal-development, professional-development, leadership, authentic-leadership, identity  
**Domains:** 🔮 Holistic  
**Key concepts:** Identity-Based Leadership, ACT Values Clarification, Situational Leadership, Influence Without Authority (Cohen-Bradford), Essentialism, Second-Order Thinking, Personal Board of Directors

---

##### `productivity-performance-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Deep work and performance productivity specialist — applies Cal Newport's deep work framework, GTD (Allen), time-blocking, energy management (Loehr & Schwartz), flow state theory (Csikszentmihalyi), and cognitive load management to help professionals maximise high-value output, manage attention in distraction-saturated environments, and sustain peak performance without burnout.

**Tags:** holistic, professional-development, productivity, deep-work, flow, energy-management  
**Domains:** 🔮 Holistic  
**Key concepts:** Deep Work (Newport), GTD (Allen), Flow State (Csikszentmihalyi), Yerkes-Dodson, Ultradian Rhythm, Time-Blocking, Shutdown Ritual, Cognitive Load (Sweller), Extraneous vs. Germane Load

---

##### `professional-resilience-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Professional resilience and psychological flexibility specialist — applies Growth Mindset (Dweck), ACT-based cognitive defusion, Learned Optimism (Seligman), post-traumatic growth theory, and stress inoculation principles to build durable resilience in professional and personal development contexts, distinct from sport performance psychology.

**Tags:** holistic, personal-development, professional-development, resilience, adversity, psychological-flexibility  
**Domains:** 🔮 Holistic  
**Key concepts:** Growth Mindset, ACT Cognitive Defusion, Learned Optimism (ABCDE Method), Post-Traumatic Growth (Tedeschi), Adversarial Growth, Stress Inoculation, Psychological Flexibility Hexaflex

---

##### `purpose-values-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Purpose, values, and meaning-making specialist — applies Self-Determination Theory (Deci & Ryan), Logotherapy (Frankl), Ikigai framework, values clarification methods (ACT), and narrative identity theory to help professionals discover authentic purpose, align their lives with core values, and build careers and lives of genuine meaning and contribution.

**Tags:** holistic, personal-development, purpose, values, meaning, identity  
**Domains:** 🔮 Holistic  
**Key concepts:** Self-Determination Theory (Autonomy/Competence/Relatedness), Logotherapy (Frankl), Ikigai, ACT Values, Narrative Identity (McAdams), Redemption Sequences, Existential Vacuum, Career Anchors

---

##### `relationships-networking-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Professional relationships and strategic networking specialist — applies social capital theory (Putnam, Burt), weak ties research (Granovetter), relationship investment frameworks, trust-building science (Feltman), and authentic networking methodology to help professionals build high-quality networks, deepen strategic relationships, and create mutual value through genuine human connection.

**Tags:** holistic, professional-development, networking, social-capital, relationships, trust  
**Domains:** 🔮 Holistic  
**Key concepts:** Bonding vs. Bridging Capital (Putnam), Structural Holes (Burt), Strength of Weak Ties (Granovetter), BRAVING Trust (Brown), Relationship Portfolio Tiers, Dormant Ties, Give-First Principle

---

##### `wellbeing-lifestyle-coach` — ★★★★☆ **82/100**
| Tier | Source | Category | Quality |
|------|--------|----------|---------|
| community | finta | Holistic | 82/100 |

> Wellbeing and sustainable performance specialist — applies burnout prevention science (Maslach), sleep science (Walker), stress physiology (Sapolsky), positive psychology (Seligman's PERMA), lifestyle medicine, and work-life integration frameworks to help professionals build sustainable high performance, prevent burnout, and design lives that support long-term health, energy, and fulfilment.

**Tags:** holistic, personal-development, wellbeing, burnout-prevention, sleep, sustainable-performance  
**Domains:** 🔮 Holistic  
**Key concepts:** Maslach Burnout Inventory, Six Organisational Antecedents, PERMA (Seligman), Sleep Architecture (Walker), Allostatic Load (Sapolsky), HPA Axis Dysregulation, Oscillation Principle, Work-Life Integration

---

### Multi-Agent Holistic Pipelines

**Professional Development Sprint (90 days)**
1. `career-development-coach` — Career capital audit and goal architecture
2. `learning-mindset-coach` — Design deliberate practice learning system
3. `productivity-performance-coach` — Build deep work schedule and weekly architecture
4. `behavioral-change-coach` — Anchor new habits in the existing routine

**Purpose and Career Transition**
1. `purpose-values-coach` — Values excavation and Ikigai mapping
2. `career-development-coach` — Career capital bridge and transition options
3. `personal-leadership-coach` — Leadership identity for the next chapter
4. `emotional-intelligence-coach` — Emotional processing for transition complexity

**Burnout Recovery and Prevention**
1. `wellbeing-lifestyle-coach` — Burnout severity assessment (Maslach)
2. `professional-resilience-coach` — Psychological flexibility and adversity response
3. `behavioral-change-coach` — Minimum viable recovery habits
4. `purpose-values-coach` — Meaning re-orientation post-burnout

**High-Performance Personal System**
1. `productivity-performance-coach` — Deep work and energy architecture
2. `learning-mindset-coach` — Learning system with spaced repetition
3. `wellbeing-lifestyle-coach` — Recovery and sustainable performance protocols
4. `relationships-networking-coach` — Social capital maintenance system
