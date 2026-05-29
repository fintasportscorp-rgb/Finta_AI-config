# Plan 10 — Coaching RAG Agents (from mindmap-fr.js)

**Scope:** Generate agent MD files from `data/mindmap-fr.js` for three coaching domains: football coaching, sports coaching, and holistic coaching/management. Add them to `agents-catalog.json`.

---

## Source: `data/mindmap-fr.js`

The file exports `window.THEMES_FR` — an array of 11 top-level themes (based on file size). Each theme has:
- `id`, `name`, `color`
- `subs[]` → each sub has `name` and `concepts[]`

Key coaching themes identified:
1. Sciences de la Décision & Biais Cognitifs
2. Systèmes Complexes & Pensée Systémique
3. Philosophie d'Entraînement & Développement
4. Préparation Physique & Gestion des Charges
5. Neurosciences du Sport & Psychophysiologie
6. Préparation Mentale & Modèle Chimpanzé
7. … (remaining themes)

---

## Three coaching domains

| Domain | Prefix | Audience |
|--------|--------|----------|
| Football Coaching | `coaching_football_` | Football coaches, scouts, analysts |
| Sports Coaching | `coaching_sport_` | Multi-sport coaches, PE teachers |
| Holistic Coaching | `coaching_holistic_` | Life coaches, HR, management, personal dev |

---

## Decision confirmed ✅

**Granularity:** One agent per top-level theme (~11 agents). Each covers all its sub-themes and concepts as its knowledge base.

---

## Agent generation strategy

### One agent per top-level theme

Each `THEMES_FR[]` entry becomes one agent. The agent:
- Has a name derived from the sub-theme
- Has a description derived from the concepts list
- Has a domain tag matching one of the three domains above
- Is formatted exactly like existing agents in `/agents/`

### Domain tagging per theme

Each agent is tagged with one or more coaching domains. The agent file content includes all 3 domains' perspectives but the tags control which domain filter surfaces it in the wizard.

| Mindmap theme | Football | Sport | Holistic |
|---------------|----------|-------|----------|
| Décision & Biais Cognitifs | ✓ | ✓ | ✓ |
| Systèmes Complexes | ✓ | ✓ | — |
| Philosophie d'Entraînement | ✓ | ✓ | — |
| Préparation Physique | ✓ | ✓ | — |
| Neurosciences du Sport | ✓ | ✓ | ✓ |
| Préparation Mentale | ✓ | ✓ | ✓ |
| Leadership & Management | ✓ | ✓ | ✓ |
| Communication | ✓ | ✓ | ✓ |
| Performance Mentale | ✓ | ✓ | ✓ |
| Innovation Tactique | ✓ | — | — |
| … | … | … | … |

---

## Agent MD file format

Following existing format in `/agents/avivl_*.md`:

```markdown
---
name: tactical-analyst-football
description: Expert in football tactical analysis using positional play frameworks (Guardiola geometry, pressing structures), match pattern recognition, and game model design. Applies complex systems thinking to football tactics.
tools: [Read, Edit, Bash]

instructions: |
---

## Role
You are a football tactical analyst specializing in modern game models and positional play.

## Core knowledge
- 20-zone Guardiola geometry
- Pressing structures (Klopp, Xabi Alonso)
- Periodization Tactique / Morphocycle
- Relational football (Diniz, PCS model)

## When to use
Activate this agent when: analyzing match footage, designing training sessions, building game models, evaluating player positioning systems.

## Key concepts
{{concepts from mindmap sub-theme}}
```

---

## File naming convention

```
agents/finta_coaching_football_tactical-analyst.md
agents/finta_coaching_football_physical-preparation.md
agents/finta_coaching_sport_mental-preparation.md
agents/finta_coaching_holistic_decision-making.md
...
```

Prefix: `finta_coaching_{domain}_{sub-theme-slug}.md`

---

## `agents-catalog.json` entries

Each agent needs an entry:

```json
{
  "id": "finta_coaching_football_tactical-analyst",
  "name": "tactical-analyst-football",
  "desc": "Expert in football tactical analysis — positional play, pressing, game model design.",
  "category": "coaching",
  "tags": ["football", "tactics", "coaching", "sport"],
  "tier": "community",
  "quality": 80,
  "source": "finta",
  "folder": "agents",
  "file": "finta_coaching_football_tactical-analyst.md"
}
```

Add a new `"coaching"` category to `CAT_LABELS` in `wizard.js`:

```js
coaching: 'Coaching'
```

---

## Wizard integration

### Option A: New domain in Q3 (domains)

Add a new domain option in `questions.json`:

```json
{ "v": "coaching", "l": "Coaching & Sport Management", "i": "🏃" }
```

This unlocks coaching-specific agent recommendations in the scoring engine.

### Option B: Subdomains under existing domains

Add coaching sub-themes under "Business Strategy" or a new domain. Less disruptive.

**Recommendation:** Option A — clean domain entry that makes the coaching context explicit.

---

## Generation script approach

Rather than hand-writing all agents, create a one-time Node.js script:

```js
// scripts/generate-coaching-agents.js
const fs = require('fs');
// Load THEMES_FR from mindmap-fr.js (eval or parse)
// For each theme → for each sub → generate MD file
// Also write catalog entries to a JSON partial
```

This script is run once and committed. Output: ~50-80 agent files.

---

## Open questions / decisions needed

1. **Languages**: mindmap is in French. Should generated agent MD files be in English (matching existing agents) or French?
2. **Granularity**: one agent per sub-theme (~50 agents) vs one agent per top-level theme (~11 agents)? Sub-theme gives more precision; top-level is simpler.
3. **Activation**: should these agents appear in the wizard only when the "Coaching" domain is selected, or always visible in the catalog?
4. **Content depth**: should agent instructions include all concepts from the sub-theme as bullet points, or be more narrative?
5. **Wizard domain**: add a new "Coaching & Sport" domain to Q3, or use subdomain tags only?

---

## Verification checklist

- [ ] `generate-coaching-agents.js` script runs without error
- [ ] Agent MD files follow the same frontmatter format as `/agents/avivl_*.md`
- [ ] `agents-catalog.json` updated with all new entries
- [ ] "coaching" category appears in the agent picker's category filter
- [ ] Selecting "Coaching" domain in Q3 triggers coaching agent recommendations
- [ ] No regression in existing agent picker behavior

---

## Complexity: High (standalone task)
Requires design decisions, script writing, ~50+ file generation, catalog update, and wizard integration.
