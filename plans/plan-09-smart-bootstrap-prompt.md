# Plan 09 — Smart Bootstrap Prompt (Next Step)

**Scope:** The "Next Step" prompt in the export page adapts to: (a) new project vs existing project, and (b) multiple assistants selected.

---

## Current state

The `prompts/bootstrap-init.md` already has basic logic:
- `isImprove = ans.objectif === 'improve_existing'` → adds a warning block
- Single assistant: references only the primary tool's config folder

The copy-paste prompt shown in the `boot-box` is a simple template:
```
unzip {name}-ai-setup.zip
```

---

## Target improvements

### A — New project vs existing project

When `objectif === 'improve_existing'`:

**Prompt should:**
1. Instruct the AI to first locate the existing config folder (`.claude/`, `.cursor/`, etc.)
2. Compare with the newly unzipped files
3. Merge: add new files that didn't exist, extend existing files without overwriting them
4. Explicitly list which files to merge vs which to add fresh

**Generated `boot_prompt_tpl` (new project):**
```
unzip {name}-ai-setup.zip && claude "Run prompts/bootstrap-init.md"
```

**Generated prompt (existing project — shown in UI, not just template):**
```
1. Unzip the archive: unzip {name}-ai-setup.zip
2. A new folder '{name}-ai-setup/' now exists alongside your project.
3. Start your assistant and paste:

   I have unzipped a new AI config in '{name}-ai-setup/'.
   My existing config is in '.claude/' (or the relevant folder).
   Follow prompts/bootstrap-init.md exactly — DO NOT overwrite existing files,
   only add new files and extend existing ones with new content.
```

### B — Multiple assistants selected

When `aiToolsAll.length > 1`, show one prompt block per assistant (tabs or sequential sections):

```
┌── Claude Code ────────────────────────────────────────┐
│  cp -r claude-code/.claude ./                         │
│  claude "Run shared/prompts/bootstrap-init.md"        │
└───────────────────────────────────────────────────────┘

┌── Cursor ─────────────────────────────────────────────┐
│  cp -r cursor/.cursor ./                              │
│  (Open Cursor and paste the bootstrap prompt)         │
└───────────────────────────────────────────────────────┘
```

---

## Implementation

### `rResults()` — boot-box section

Replace static template with a dynamic function:

```js
function buildBootPrompt(ans, files, M) {
  const aiToolsAll = [].concat(ans.ai_tools || ['claude_code']).filter(Boolean);
  const isImprove  = ans.objectif === 'improve_existing';
  const name       = ans.project_name || 'my-project';

  if (aiToolsAll.length === 1) {
    return buildSingleToolPrompt(aiToolsAll[0], isImprove, name, M);
  }
  return buildMultiToolPrompt(aiToolsAll, isImprove, name, M);
}

function buildSingleToolPrompt(tool, isImprove, name, M) {
  const cfg = (M.aiToolFolder || {})[tool] || '.claude';
  if (!isImprove) {
    return `unzip ${name}-ai-setup.zip\n# Then start your assistant — it will read prompts/bootstrap-init.md automatically.`;
  }
  return [
    `# Existing project — config extension`,
    `1. unzip ${name}-ai-setup.zip`,
    `2. Your new config is in: ${name}-ai-setup/`,
    `3. Paste this to your assistant:`,
    ``,
    `   I unzipped a new AI config in '${name}-ai-setup/'.`,
    `   My existing config folder is '${cfg}/'.`,
    `   Read and follow 'shared/prompts/bootstrap-init.md'.`,
    `   DO NOT overwrite any existing file.`,
    `   Only ADD new files and APPEND new content to existing ones.`,
  ].join('\n');
}

function buildMultiToolPrompt(tools, isImprove, name, M) {
  return tools.map(tool => {
    const cfg   = (M.aiToolFolder || {})[tool] || '.claude';
    const label = (M.aiTools || {})[tool] || tool;
    const copyCmd = isImprove
      ? `cp -rn ${name}-ai-setup/${label.toLowerCase().replace(/\s/g,'-')}/${cfg} ./`
      : `cp -r ${name}-ai-setup/${label.toLowerCase().replace(/\s/g,'-')}/${cfg} ./`;
    return `# ${label}\n${copyCmd}`;
  }).join('\n\n');
}
```

### UI — collapsible tool tabs for multi-tool

```html
<div class="boot-tabs">
  <button class="boot-tab act" onclick="switchBootTab('claude-code')">Claude Code</button>
  <button class="boot-tab" onclick="switchBootTab('cursor')">Cursor</button>
</div>
<pre id="boot-prompt">...</pre>
```

---

## `prompts/bootstrap-init.md` — content changes

The generated file already distinguishes new vs improve. Add per-tool section when multi:

```md
## Tool-specific setup

### Claude Code
- Config folder: `.claude/`
- Run: `claude "execute prompts/bootstrap-init.md"`

### Cursor
- Config folder: `.cursor/`
- Open Cursor → paste the Step 1 reading list prompt manually
```

---

## Verification checklist

- [ ] New single-tool: prompt shows simple unzip + auto-run instruction
- [ ] Existing single-tool: prompt shows merge instruction with explicit "DO NOT overwrite" language
- [ ] Multi-tool (new): each tool's copy command shown
- [ ] Multi-tool (existing): each tool's `cp -rn` (no-overwrite) command shown
- [ ] `bootstrap-init.md` in ZIP reflects the correct mode
- [ ] UI copy button copies the currently visible prompt block

---

## Complexity: Low-Medium
Logic is mostly in template strings. No structural changes.
