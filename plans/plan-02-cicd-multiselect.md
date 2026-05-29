# Plan 02 — CI/CD Multi-select

**Scope:** Q `ci_cd` — switch from `type: "single"` to `type: "multi"` to allow selecting multiple CI/CD platforms.

---

## Change 1 — `data/questions.json`

```diff
- "type": "single",
+ "type": "multi",
```

That's the only change needed in the data file. The `multi` type already handles "Multiple selection allowed" hint and toggleM behavior.

---

## Change 2 — `js/wizard.js` — `generateFiles()` (line ~1775)

Currently `ci_cd` is read as a single string value and used to generate settings hooks.
After making it multi, `ro('ci_cd', 'none')` returns an array.

### All occurrences to update:

**Search for:** `ro('ci_cd'` or `ans.ci_cd` in `generateFiles`.

For each usage:
- Replace `cicd === 'github'` → `cicd.includes('github')`
- Replace `cicd === 'gitlab'` → `cicd.includes('gitlab')`
- etc.

**Example pattern change:**

```js
// Before
const cicd = ro('ci_cd', 'none');
if (cicd === 'github') { ... }

// After
const cicd = [].concat(ro('ci_cd', []));
const hasGithub = cicd.includes('github');
const hasGitlab = cicd.includes('gitlab');
const hasCircle = cicd.includes('circle');
const hasArgocd = cicd.includes('argocd');
const noCicd    = !cicd.length || (cicd.length === 1 && cicd[0] === 'none');
```

**Template output:** When multiple CI/CD platforms are selected, the generated sections (CLAUDE.md CI/CD block, settings.json hooks) should list all selected platforms, not just the first.

---

## Change 3 — Answer preview (`ansValuePreview`)

`ansValuePreview` already handles `type: "multi"` generically, so no change needed — it will join all selected values with ", ".

---

## Verification checklist

- [ ] Can select multiple CI/CD options simultaneously
- [ ] "Multiple selection allowed" hint appears
- [ ] `generateFiles` correctly handles array — no crash when 2+ selected
- [ ] Settings.json hooks are generated for each selected CI/CD platform
- [ ] Answer preview in export panel shows all selected platforms

---

## Complexity: Low
One JSON type change + guard array handling in generateFiles.
