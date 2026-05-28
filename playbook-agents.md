# Agent Configuration Playbook — Agents Reference Guide

> **Purpose:** Complete reference for configuring AI agents in Claude Code and other AI development environments. Import this document into NotebookLM alongside playbook-skills.md and playbook-commands.md.

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
