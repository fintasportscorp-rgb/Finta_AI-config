# Finta Quality Scoring Methodology

> **Purpose:** Reference document for NotebookLM. Explains exactly how the quality score shown on every agent, skill, and command card is calculated.  
> Import alongside `playbook-agents.md`, `playbook-skills.md`, and `playbook-commands.md`.

---

## 1. Overview

Every item in the Finta catalog (647 agents · 1,611 skills · 128 commands) carries a **quality score from 0 to 100**, displayed as ★☆☆☆☆ to ★★★★★ on cards in the wizard UI and in the playbook catalogs.

The score is **pre-computed offline** (not calculated at runtime), stored directly in the catalog JSON files (`agents-catalog.json`, `skills-catalog.json`, `commands-catalog.json`), and refreshed whenever the enrichment script is re-run.

---

## 2. Formula

```
quality = (stars_score × 35%) + (content_score × 40%) + (tier_score × 25%)
```

Three independent sub-scores are weighted and summed. All inputs are normalized to **0–100** before weighting.

| Component | Weight | Measures |
|-----------|--------|---------|
| `stars_score` | 35% | Community adoption — how popular is the GitHub repo this item comes from |
| `content_score` | 40% | Intrinsic quality of the item's own markdown file |
| `tier_score` | 25% | Curation level — how was this item sourced and vetted |

---

## 3. Component 1 — `stars_score` (35%)

### What it measures
The number of GitHub stars on the **source repository** the item comes from. Stars are a proxy for community adoption, ongoing maintenance, and peer validation.

### Note on granularity
All items from the same source repo share the **same** `stars_score`. For example, all 66 agents from `wshobson/agents` (⭐ 36k) receive `stars_score = 99`. This is intentional — stars measure the credibility of the collection, not the individual file.

### Calculation
Stars are normalized using a **logarithmic scale** anchored at 40,000 stars (the approximate star count of `wshobson/agents` at time of enrichment):

```python
stars_score = min(100, log(stars + 1) / log(40001) × 100)
```

The log scale prevents large repos from completely dominating — the difference between 100 and 1,000 stars is meaningful, but between 50k and 127k is negligible.

### Reference table

| Stars | stars_score |
|-------|-------------|
| 0 | 0 |
| 100 | 44 |
| 500 | 59 |
| 1,000 | 65 |
| 5,000 | 80 |
| 10,000 | 87 |
| 36,000 | 99 |
| ≥ 40,000 | 100 |
| 127,000 (anthropics) | 100 (capped) |

### Source repo star counts (at time of last enrichment)

| Source | Repo | Stars | stars_score |
|--------|------|-------|-------------|
| anthropics | anthropics/claude-code | ⭐ 127k | 100 |
| composio | ComposioHQ/awesome-claude-skills | ⭐ 62k | 100 |
| antigravity | sickn33/antigravity-awesome-skills | ⭐ 39k | 100 |
| alirezarezvani | alirezarezvani/claude-skills | ⭐ 16k | 93 |
| voltagent | voltagent/voltagent | ⭐ 9.2k | 86 |
| vijaythecoder | vijaythecoder/awesome-claude-agents | ⭐ 4.3k | 79 |
| wshobson | wshobson/agents | ⭐ 36k | 99 |
| lst97 | lst97/claude-code-sub-agents | ⭐ 1.6k | 69 |
| hesreallyhim | hesreallyhim/a-list-of-claude-code-agents | ⭐ 1.3k | 67 |
| 0xfurai | 0xfurai/claude-code-subagents | ⭐ 911 | 63 |
| contains | contains-studio/agents | ⭐ 12k | 90 |
| avivl | avivl/claude-007-agents | ⭐ 262 | 51 |
| iannuttall | iannuttall/source-agents | ⭐ 125 | 44 |
| magento | rubenzantingh/claude-code-magento-agents | ⭐ 110 | 43 |
| navin | *(no matched repo)* | 0 | 0 |
| supatest | *(no matched repo)* | 0 | 0 |

---

## 4. Component 2 — `content_score` (40%)

### What it measures
The depth, structure, and completeness of the **item's own markdown file**. This is the highest-weight component because it directly measures the quality of the instruction set that gets injected into the AI assistant's context.

### Calculation
Six signals are extracted from the file and summed:

```python
content_score = min(100,
    min(lines, 400) / 400  × 38   # depth (line count, capped at 400)
  + min(h2,   12)  / 12   × 18   # structure (## section headers)
  + min(h3,   20)  / 20   × 14   # detail (### subsection headers)
  + min(code_blocks, 8) / 8 × 14 # concrete examples (``` code blocks)
  + has_examples × 6              # mentions "example", "usage", "demo", "sample"
  + has_constraints × 5           # mentions "don't", "avoid", "never", "constraint"
  + has_tools × 5                 # mentions "tool", "mcp", "bash", "command"
)
```

### Signal breakdown

| Signal | Max points | What it rewards |
|--------|-----------|-----------------|
| Line count | 38 | Depth and completeness — more content = more guidance |
| `##` headers | 18 | Logical structure — a well-organized agent covers distinct areas |
| `###` headers | 14 | Detailed sub-sections — granularity of expertise |
| Code blocks | 14 | Concrete examples — agents that show code samples are more actionable |
| Has examples | 6 | Explicit example invocations or use cases |
| Has constraints | 5 | Professional-grade agents define what NOT to do |
| Has tool refs | 5 | Grounded in actual tool usage (Bash, MCP, CLI) |

### Interpretation

| content_score | Meaning |
|---------------|---------|
| 90–100 | Very long, structured, with examples, constraints, and tool refs (Anthropic official quality) |
| 70–89 | Well-structured, multiple sections, code examples present |
| 50–69 | Moderate depth, basic structure |
| 30–49 | Short or unstructured — minimal guidance |
| 0–29 | Stub or near-empty file |

### Example (anthropics `Hook Development` skill)
- 713 lines → `min(713,400)/400 × 38 = 38`
- 12+ `##` headers → `18`
- 20+ `###` headers → `14`
- 8+ code blocks → `14`
- Has examples, constraints, tools → `6+5+5 = 16`
- **content_score ≈ 100** → used as quality benchmark

---

## 5. Component 3 — `tier_score` (25%)

### What it measures
The curation level of the source. Tier is assigned manually based on who maintains the repo and how items are reviewed before inclusion.

### Tier definitions

| Tier | tier_score | Description | Sources |
|------|-----------|-------------|---------|
| **official** | 100 | First-party Anthropic content — built and tested by the Claude team | anthropics |
| **curated** | 75 | Community repos that are actively maintained, well-organized, and widely adopted | wshobson, avivl, contains-studio, composio, alirezarezvani |
| **community** | 50 | Broader community contributions — high variance in quality | 0xfurai, voltagent, supatest, antigravity, navin, etc. |

### Why tier has the lowest weight (25%)
Tier reflects *who* made it, not *what* it contains. A `community` item with rich content and a popular repo can outscore a `curated` item with a thin file. The `content_score` (40%) is the dominant quality signal for individual items.

---

## 6. Final Score — Star Rating Mapping

```
quality = round((stars_score × 0.35) + (content_score × 0.40) + (tier_score × 0.25))
```

| Stars display | Score range | Interpretation |
|---------------|------------|----------------|
| ★★★★★ | 80–100 | Exceptional — high community adoption + rich content + curated/official |
| ★★★★☆ | 65–79 | Strong — well-structured content from active repos |
| ★★★☆☆ | 50–64 | Solid — adequate content, community-level sourcing |
| ★★☆☆☆ | 35–49 | Weak — limited content or obscure/inactive source |
| ★☆☆☆☆ | 0–34 | Minimal — stub file with no matched GitHub repo |

---

## 7. Score Distribution

### Agents (647 total)

| Rating | Count | % |
|--------|-------|---|
| ★★★★★ (80–100) | 3 | 0.5% |
| ★★★★☆ (65–79) | 293 | 45.3% |
| ★★★☆☆ (50–64) | 311 | 48.1% |
| ★★☆☆☆ (35–49) | 38 | 5.9% |
| ★☆☆☆☆ (0–34) | 2 | 0.3% |

**Min:** 16 · **Avg:** 56 · **Max:** 82  
**Tiers:** 211 curated · 436 community

### Skills (1,611 total)

| Rating | Count | % |
|--------|-------|---|
| ★★★★★ (80–100) | 471 | 29.2% |
| ★★★★☆ (65–79) | 970 | 60.2% |
| ★★★☆☆ (50–64) | 170 | 10.6% |
| ★★☆☆☆ (35–49) | 0 | 0% |
| ★☆☆☆☆ (0–34) | 0 | 0% |

**Min:** 52 · **Avg:** 73 · **Max:** 100  
**Tiers:** 18 official · 162 curated · 1,431 community

### Commands (128 total)

| Rating | Count | % |
|--------|-------|---|
| ★★★★★ (80–100) | 25 | 19.5% |
| ★★★★☆ (65–79) | 19 | 14.8% |
| ★★★☆☆ (50–64) | 43 | 33.6% |
| ★★☆☆☆ (35–49) | 40 | 31.3% |
| ★☆☆☆☆ (0–34) | 1 | 0.8% |

**Min:** 19 · **Avg:** 54 · **Max:** 93  
**Tiers:** 57 curated · 71 community

---

## 8. Known Limitations

### Stars reflect the collection, not the item
An excellent agent in a low-star repo scores lower than a mediocre agent in a high-star repo. `content_score` partially compensates for this, but a brilliant agent in a new or niche repo will be underrated.

### Unmatched repos score 0 for stars
Sources `navin` and `supatest` had no matched GitHub repo at enrichment time. Their items score purely on content + tier, capping stars_score at 0. These items (4 navin agents, 61 supatest agents) score in the 16–30 range as a result.

### Content scoring is heuristic
The content score uses text signals (line count, header count, keyword presence) that are imperfect proxies for actual instruction quality. A long but repetitive agent would score high; a concise but perfectly-targeted agent may score lower than its real value.

### Snapshot in time
Stars and GitHub metadata are fetched at enrichment time. A repo gaining 10k stars after the last enrichment run will not reflect in scores until the script is re-run.

---

## 9. Refreshing Scores

The enrichment script lives in the project as a standalone Python script. To refresh:

1. Generate a new GitHub Personal Access Token (no scopes needed — public read only)
2. Run the enrichment script with the new token
3. The three catalog JSON files will be updated in-place
4. Re-generate the playbook files to reflect updated scores

**Recommended refresh frequency:** monthly, or after adding new sources to the catalog.

---

## 10. Filter Thresholds in the Wizard UI

The quality filter bar in the wizard uses these exact cutoffs:

| Filter button | Minimum quality | Equivalent rating |
|---------------|-----------------|-------------------|
| `all` | 0 | All items |
| `★★★+` | 50 | ★★★☆☆ and above |
| `★★★★+` | 65 | ★★★★☆ and above |
| `★★★★★` | 80 | Perfect score items only |

Filters apply to the **catalog only** (not the pre-selection panel) and combine with the provider filter (multi-select by source name).

---

*Generated by Finta AI Configuration Wizard — config.fintalab.com*  
*Last enrichment: 2026-05-28*
