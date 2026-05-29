# Plan 08 — Export Config: File Tree Per Assistant

**Scope:** In the "Project Files" section of the export page, when multiple assistants are selected, show the file tree grouped by assistant. ZIP encapsulates each assistant's folder inside a single root folder.

---

## Dependency

This plan is closely related to **Plan 04** (multi-assistant export). Plan 04 defines the ZIP structure. Plan 08 focuses on the **visual file tree** and the **download encapsulation**.

If Plan 04 is implemented first, Plan 08 only needs to update the tree rendering to match the new structure.

---

## Target behavior

### File tree (multi-assistant)

```
📁 claude-code/
  📄 CLAUDE.md
  📄 CLAUDE.local.md
  📁 .claude/
    📁 agents/ (N files)
    📁 rules/ (N files)
    📄 settings.json
📁 cursor/
  📄 cursor_rules.md
  📄 cursor_rules.local.md
  📁 .cursor/
    ...
📁 shared/
  📁 docs/
  📁 prompts/
  📄 .gitignore
```

Each top-level group is collapsible. The default open group is the first assistant.

---

## Implementation

### `renderTreeNode()` — already works per-path structure

If Plan 04 prefixes paths with `{tool-slug}/`, the existing `buildTree()` and `renderTreeNode()` will automatically produce the grouped tree. **No change needed to the tree logic** — only to how the root `tifolder` entries look.

### Collapsible top-level folders

Add a toggle to `tifolder` divs at depth 0:

```js
function renderTreeNode(node, depth) {
  let h = '';
  const pad = (depth * 13 + 5) + 'px';
  Object.entries(node.dirs).sort(([a],[b]) => a.localeCompare(b)).forEach(([name, child]) => {
    const uid = 'dir-' + name.replace(/\W/g, '-');
    const isRoot = depth === 0;
    h += `<div class="ti tifolder${isRoot?' ti-root':''}" style="padding-left:${pad}"
      onclick="${isRoot ? `toggleDir('${uid}')` : ''}"
      id="${uid}-hd">
      <span class="ti-caret">${isRoot ? '▼' : ''}</span> 📁 ${name}/
    </div>`;
    h += `<div id="${uid}" class="ti-children">${renderTreeNode(child, depth+1)}</div>`;
  });
  // ... files unchanged
  return h;
}

function toggleDir(uid) {
  const el = document.getElementById(uid);
  el.classList.toggle('collapsed');
}
```

```css
.ti-children.collapsed { display: none; }
.ti-root { cursor: pointer; font-weight: 600; }
```

### File preview — tool switcher

When multiple tools present, add a simple tab row above the file tree:

```html
<div class="tree-tabs">
  <button class="tree-tab act" onclick="switchTreeView('claude-code')">Claude Code</button>
  <button class="tree-tab" onclick="switchTreeView('cursor')">Cursor</button>
  <button class="tree-tab" onclick="switchTreeView('shared')">Shared</button>
</div>
```

`switchTreeView(prefix)` collapses all root dirs and expands the selected one, and opens the first file in that group.

---

## ZIP download

**Single assistant:** ZIP root = `{project-name}/` with all files (no prefix). Same as today.

**Multiple assistants:** ZIP root = `{project-name}-multi-setup/` containing:
- `claude-code/`
- `cursor/`
- `shared/`

Achieved automatically if `generateFiles()` returns prefixed paths (Plan 04).

---

## Verification checklist

- [ ] Single assistant → tree unchanged vs today
- [ ] 2+ assistants → tree groups by tool at root level
- [ ] Root folders are collapsible / expandable
- [ ] Tool tabs allow switching focus to a specific assistant's files
- [ ] Selected file is previewed in the code panel on click
- [ ] ZIP contains the grouped structure

---

## Complexity: Low (if Plan 04 done) / Medium (standalone)
