# Plan 06 — Advanced Orchestration Module

**Scope:** Replace the current single-orchestration picker with a full multi-orchestration manager featuring:
- Create / edit / delete multiple named orchestrations
- Editable per-agent notes
- Directed dependency arrows between agents (drag-and-drop)
- Multi-source dependencies per agent
- Export: one file per orchestration + executable commands
- ZIP structure reflecting all orchestrations

This is a **standalone complex task** requiring its own focused sprint.

---

## Decisions confirmed ✅

| Question | Answer |
|----------|--------|
| Agent in multiple orchestrations? | Yes — same agent can appear in multiple orchestrations with different roles |
| User-defined names? | Yes — each orchestration has a user-defined name |
| Arrow A → B meaning | **Sequential** — A must finish before B starts |
| Redirect UX | Click edge → side panel with source/target dropdowns |
| Per-agent notes location | Click node → right side panel (role selector + textarea + save) |
| Export format | `docs/orchestrations/{name}.md` (human-readable doc only) |
| Run command | Claude Code slash command: `/orchestrate {name}` |
| Standards reference | **Claude Code subagent system** specifically |

---

## Preliminary architecture (pending answers)

### Data model

```js
// S.ans.orchestrations — array of orchestration objects
[
  {
    id: 'orch-1',
    name: 'Main Pipeline',
    type: 'sequential',          // sequential | parallel | hierarchical | hybrid
    agents: ['agent-id-1', 'agent-id-2', ...],
    roles: {
      'agent-id-1': 'supervisor',
      'agent-id-2': 'worker',
    },
    notes: {
      'agent-id-1': 'Coordinates the full pipeline. Reads from docs/specs/',
      'agent-id-2': 'Handles code generation only.',
    },
    dependencies: [
      { from: 'agent-id-1', to: 'agent-id-2', label: 'triggers' },
      { from: 'agent-id-1', to: 'agent-id-3', label: 'feeds' },
    ],
    diagramGraph: { /* Cytoscape JSON snapshot */ },
    diagramPng: null,
  },
  // ...more orchestrations
]
```

### UI flow

```
┌─────────────────────────────────────────────────────┐
│  AGENT ORCHESTRATION STRATEGY                       │
│  ─────────────────────────────                      │
│  [+ New orchestration]                              │
│                                                     │
│  ◉ Main Pipeline          [Edit] [Delete]           │
│    Type: Sequential · 4 agents · 3 dependencies     │
│                                                     │
│  ◎ QA Pipeline            [Edit] [Delete]           │
│    Type: Parallel · 2 agents · 1 dependency         │
└─────────────────────────────────────────────────────┘
```

**Edit modal / expanded section:**
- Name input
- Type picker (sequential / parallel / hierarchical / hybrid)
- Agent role assignment table
- Editable notes per agent
- Cytoscape diagram with dependency arrows
- Save button

---

## Cytoscape changes (dependencies)

### Current: role-only nodes, no edges

Current implementation shows agents as nodes with color-coded roles. No edges.

### New: directed dependency edges

```js
// When rendering the Cytoscape diagram:
cy.add(orchestration.dependencies.map(dep => ({
  group: 'edges',
  data: {
    id: `${dep.from}-${dep.to}`,
    source: dep.from,
    target: dep.to,
    label: dep.label || '',
  }
})));

cy.style([
  // ... existing node styles ...
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'arrow-scale': 1.3,
      'line-color': 'rgba(255,255,255,.35)',
      'target-arrow-color': 'rgba(255,255,255,.35)',
      'label': 'data(label)',
      'font-size': 9,
      'color': '#aaa',
    }
  }
]);
```

### Edge editing (draggable arrowheads)

Cytoscape supports `edgehandles` extension for drawing new edges. For **redirecting** existing edges:
- Option A: Click edge → show a small panel with source/target dropdowns → update dependency
- Option B: Cytoscape `edgehandles` with `snap` — requires the `cytoscape-edgehandles` plugin

Recommendation: **Option A** (panel-based) — simpler, no extra plugin, works on touch.

### Per-agent notes in diagram

When a node is clicked → open a right-side panel (or a tooltip near the node):

```js
cy.on('tap', 'node', function(evt) {
  const agentId = evt.target.id();
  const note    = currentOrch.notes[agentId] || '';
  showAgentPanel(agentId, note);
});

function showAgentPanel(agentId, note) {
  // Renders a panel div with:
  // - Agent name
  // - Role selector
  // - Textarea for note
  // - Save button → updates currentOrch.notes[agentId]
}
```

---

## Export — ZIP structure

```
project-ai-setup/
├── docs/
│   └── orchestrations/
│       ├── index.md               ← overview of all orchestrations
│       ├── main-pipeline.md       ← human-readable doc per orchestration
│       └── qa-pipeline.md
├── .claude/
│   └── commands/
│       └── orchestrate.md         ← /orchestrate slash command (dispatches by name)
└── CLAUDE.md                      ← "Orchestrations" section listing all names
```

### `docs/orchestrations/main-pipeline.md` (per orchestration)

```markdown
# Orchestration: Main Pipeline

**Type:** Sequential  
**Agents:** Code Generator → Reviewer → Deployer

## Agent roles

| Agent | Role | Note |
|-------|------|------|
| Code Generator | worker | Handles file generation from specs |
| Reviewer | reviewer | Reads output, checks for errors |
| Deployer | supervisor | Final push to staging |

## Execution order

1. Code Generator — reads specs, generates files
2. Reviewer — validates output (must complete before step 3)
3. Deployer — deploys if review passes

## Run this orchestration

```
/orchestrate main-pipeline
```

## Diagram

![Orchestration Diagram](./main-pipeline-diagram.png)
```

### `.claude/commands/orchestrate.md` — slash command

```markdown
---
description: Run a named orchestration (sequential multi-agent workflow)
---

Run the orchestration named: $ARGUMENTS

Steps:
1. Read `docs/orchestrations/$ARGUMENTS.md`
2. Follow the execution order exactly
3. For each agent in sequence: spawn a subagent with the agent's role and note as context
4. Wait for each agent to complete before starting the next
5. Report the final status of all agents
```

### CLAUDE.md — orchestrations section

```markdown
## Orchestrations

| Name | Type | Agents | Run |
|------|------|--------|-----|
| Main Pipeline | sequential | 3 agents | `/orchestrate main-pipeline` |
| QA Pipeline | parallel | 2 agents | `/orchestrate qa-pipeline` |
```

---

## Implementation phases

### Phase 1 — Data model + list UI (no diagram changes)
- `S.ans.orchestrations` array
- Create / rename / delete orchestrations from list
- Migrate existing single `S.ans.orchestration` → `S.ans.orchestrations[0]`

### Phase 2 — Per-orchestration Cytoscape diagram
- One Cytoscape instance per orchestration (lazy-init when editing)
- Role assignment + notes panel

### Phase 3 — Dependency edges
- Draw edges via panel UI (click node → pick dependency target)
- Visual edge rendering in Cytoscape
- Delete edges via click → panel → remove button

### Phase 4 — Drag-to-redirect (optional, after user confirms UX)
- Only if user confirms they want full drag behavior (requires `cytoscape-edgehandles`)

### Phase 5 — Export
- `docs/orchestrations/{name}.md` per orchestration
- Shell scripts per orchestration
- CLAUDE.md section update

---

## Verification checklist

- [ ] Can create multiple orchestrations with unique names
- [ ] Can edit orchestration name, type, agent roles
- [ ] Per-agent notes save correctly and persist in session
- [ ] Dependencies shown as arrows in Cytoscape
- [ ] Can add / remove dependencies via UI
- [ ] Arrows can be redirected (via panel or drag)
- [ ] One agent can have multiple outgoing AND incoming dependencies
- [ ] ZIP contains one MD + one shell script per orchestration
- [ ] CLAUDE.md has orchestrations table
- [ ] Migration: existing single-orchestration sessions load correctly

---

## Complexity: Very High (standalone sprint)
Requires 5 implementation phases. Estimated: 3-5 dev days.
