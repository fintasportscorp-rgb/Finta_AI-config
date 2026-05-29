# Plan 03 — Response Style: Export Language Free-text Input

**Scope:** Q25 `response_style` — remove fixed "Always in French" option, add a free-text language input pre-filled from the UI language picker.

---

## Current state

`response_style` opts include:
```json
{ "v": "french", "l": "Always in French", "i": "🇫🇷" }
```
This hardcodes French as the only language choice.

---

## Target state

1. Remove the `french` option from `response_style` opts.
2. Add a new question `output_language` of `type: "text"` inserted right after `response_style`.
3. The field is **pre-filled** based on the active UI language (`LANG` variable) via a `default_from_lang` mapping.

---

## Change 1 — `data/questions.json`

### Remove from `response_style.opts`:
```json
{ "v": "french", "l": "Always in French", "i": "🇫🇷" }
```

### Add new question after `response_style`:
```json
{
  "id": "output_language",
  "phase": "deep",
  "type": "text",
  "label": "Export language for assistant responses",
  "ph": "e.g. French, English, Spanish…",
  "default_from_lang": {
    "fr": "French",
    "en": "English",
    "es": "Spanish",
    "de": "German",
    "pt": "Portuguese",
    "ja": "Japanese",
    "zh": "Chinese",
    "ko": "Korean"
  },
  "targets": [".claude/rules/behavior.md"],
  "hint": {
    "fast": "The assistant will always respond in this language.",
    "advanced": "Encoded in behavior.md as a hard language constraint."
  }
}
```

---

## Change 2 — `js/wizard.js`

### Auto-fill on init / lang switch

In `applyLocale()` or `switchLang()`, after setting `LANG`, auto-populate `S.ans.output_language` if empty:

```js
function autoFillOutputLanguage() {
  const q = QUESTIONS.find(q => q.id === 'output_language');
  if (!q || S.ans.output_language) return; // don't overwrite if user already typed
  const map = q.default_from_lang || {};
  S.ans.output_language = map[LANG] || '';
}
```

Call `autoFillOutputLanguage()` at the end of `applyLocale()` and at the end of `switchLang()`.

### `generateFiles()` — behavior.md

Replace the `french` check with `output_language`:

```js
// Before
const isFrench = respStyle.includes('french');
if (isFrench) lines.push('- Always respond in French');

// After
const outputLang = (ans.output_language || '').trim();
if (outputLang) lines.push(`- Always respond in ${outputLang}`);
```

Remove any `aiMainFile`/behavior-template logic that hard-codes "Répondre en français".

---

## Change 3 — i18n files (optional)

For each `i18n/*.json`, add a translation for the new question label if needed. The `default_from_lang` map handles the pre-fill; the label translation can stay in English for now.

---

## Edge cases

- If user clears the input → no language constraint generated (acceptable)
- If user switches UI lang after already typing → do NOT overwrite (respect their explicit input)
- Existing sessions with `response_style: ['french']` → gracefully ignored (the `french` value simply won't match any option; no crash)

---

## Verification checklist

- [ ] "Always in French" chip no longer appears in Q25
- [ ] `output_language` field appears after `response_style`
- [ ] Field is pre-filled when the wizard loads (matching UI lang)
- [ ] Switching UI language while field is empty → updates the field
- [ ] Switching UI language while field has custom text → does NOT overwrite
- [ ] `behavior.md` generated with correct language constraint
- [ ] No regression on other response_style options

---

## Complexity: Low-Medium
JSON + small JS changes. Core logic straightforward.
