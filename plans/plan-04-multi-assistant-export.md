# Plan 04 — Multi-assistant Export ZIP

**Scope:** When multiple AI tools are selected in Q1, the export ZIP groups files by assistant, and the download button label lists the selected tools.

---

## Current behavior

`generateFiles()` uses only `aiToolsAll[0]` (primary tool) to determine config folder. All files live under one config structure.

---

## Target behavior

### ZIP structure (2+ assistants selected)

```
my-project-ai-setup.zip
├── claude-code/
│   ├── CLAUDE.md
│   ├── CLAUDE.local.md
│   └── .claude/
│       ├── agents/
│       ├── rules/
│       └── settings.json
├── cursor/
│   ├── cursor_rules.md
│   ├── cursor_rules.local.md
│   └── .cursor/
│       ├── agents/
│       ├── rules/
│       └── settings.json
└── shared/
    ├── docs/
    ├── prompts/
    └── .gitignore
```

**Rule:** Tool-specific files (`cfg/`, `mainFile`, `localFile`) go under `{tool-slug}/`. Files under `docs/`, `prompts/`, and root-level (`.gitignore`) go under `shared/`.

### Download button label

```
⬇ download ZIP — Claude Code · Cursor · Windsurf (47 files)
```

---

## Implementation

### `generateFiles()` — refactor for multi-tool

Current: single tool → single config folder.
New: loop over `aiToolsAll`, generate config-specific files for each, plus shared files once.

```js
function generateFilesForTool(ans, level, tool, agentContents, skillContents, commandContents) {
  // Same as current generateFiles() but uses `tool` instead of `primaryTool`
  // Returns only tool-specific keys (cfg/, mainFile, localFile)
}

function generateSharedFiles(ans, level, agentContents, skillContents, commandContents) {
  // Returns: docs/, prompts/, .gitignore, bootstrap-init.md
}

function generateFiles(ans, level, agentContents, skillContents, commandContents) {
  const aiToolsAll = [].concat(ro('ai_tools', 'claude_code') || 'claude_code').filter(Boolean);
  const F = {};

  if (aiToolsAll.length <= 1) {
    // Legacy single-tool behavior — no folder prefix
    return generateLegacySingleTool(ans, level, aiToolsAll[0], agentContents, skillContents, commandContents);
  }

  // Multi-tool: prefix by tool slug
  const M = ARBO.mappings;
  const toolSlug = t => (M.aiTools[t] || t).toLowerCase().replace(/\s+/g, '-');

  for (const tool of aiToolsAll) {
    const toolFiles = generateFilesForTool(ans, level, tool, agentContents, skillContents, commandContents);
    const prefix = toolSlug(tool) + '/';
    Object.entries(toolFiles).forEach(([k, v]) => { F[prefix + k] = v; });
  }

  const shared = generateSharedFiles(ans, level, agentContents, skillContents, commandContents);
  Object.entries(shared).forEach(([k, v]) => { F['shared/' + k] = v; });

  return F;
}
```

### `rResults()` — file tree display

When multi-tool, show a tab or grouped tree per assistant. Each group is collapsible.

```
📁 claude-code/
  📁 .claude/
    📄 CLAUDE.md  ← selected by default
    ...
📁 cursor/
  📁 .cursor/
    📄 cursor_rules.md
    ...
📁 shared/
  📁 docs/
  📄 .gitignore
```

### Download button

```js
const toolLabels = aiToolsAll.map(t => (M.aiTools[t] || t));
const btnLabel = `⬇ download ZIP — ${toolLabels.join(' · ')} (${paths.length} files)`;
```

### `dlZip()` — filename

```js
const toolSlugs = aiToolsAll.map(t => (M.aiTools[t]||t).toLowerCase().replace(/\s+/g,'-')).join('_');
a.download = `${projectName}-${toolSlugs}-ai-setup.zip`;
```

---

## Edge cases

- Single tool selected → legacy behavior, no prefix folders (backward compatible)
- All tools generate the same `docs/` → only generate once in `shared/`
- `prompts/bootstrap-init.md` lives in `shared/` and instructs all assistants
- File preview in results panel: allow switching between tools with tabs

---

## Open question (ask user before implementing)

> When 2+ tools are selected, should `docs/`, `prompts/`, `.gitignore` be **shared** (once in a `shared/` folder) or **duplicated** under each tool folder?
> Shared is simpler but requires the user to copy manually. Duplicated is larger but self-contained per tool.

---

## Verification checklist

- [ ] Single tool → same behavior as before
- [ ] 2 tools → ZIP has `tool1/`, `tool2/`, `shared/` folders
- [ ] File tree in UI groups by tool
- [ ] Download button shows tool names
- [ ] ZIP filename includes tool slugs
- [ ] `prompts/bootstrap-init.md` and `docs/` only generated once

---

## Complexity: Medium-High
Requires refactoring `generateFiles()` into sub-functions without breaking single-tool mode.
