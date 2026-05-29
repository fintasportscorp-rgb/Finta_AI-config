# Plan 07 — Export Config Page: Answers Panel Click → Question Anchor

**Scope:** In the export results page, clicking a question row in the "Réponses du questionnaire" panel navigates back to the right question.

---

## Current state

`buildAnsPanel()` generates rows with `onclick="goToQuestion(${idx})"`.

`goToQuestion()` — need to verify its implementation (may not exist or may not handle board/step distinction).

---

## Target behavior

- **Board mode** (was active when user generated config): click a row → navigate to `questions` screen in board mode, then scroll to `#bsect-{q.id}`.
- **Step-by-step mode** (was active): click a row → navigate to `questions` screen, set `S.step = idx`.

---

## Implementation

### `goToQuestion(idx)` — update or create

```js
function goToQuestion(idx) {
  const qs = activeQs();
  const q = qs[idx];
  if (!q) return;

  S.screen = 'questions';

  if (S.boardMode) {
    render();
    // After render, scroll to the section
    setTimeout(() => {
      const el = document.getElementById('bsect-' + q.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  } else {
    S.step = idx;
    render();
  }
}
```

The `setTimeout` is needed because `render()` rebuilds the DOM and the element may not exist until the next paint.

---

## Also: answer rows need `data-qid`

In `buildAnsPanel()`, add `data-qid="${q.id}"` to each row for easier debugging and potential CSS targeting:

```js
return `<div class="ans-row" onclick="goToQuestion(${idx})" data-qid="${q.id}" title="${esc(q.label)}">
```

---

## Verification checklist

- [ ] Results page: clicking a question row leaves the results screen
- [ ] Board mode: navigates to board, scrolls to the correct section
- [ ] Step-by-step mode: navigates to the correct question step
- [ ] Meta rows (Objectif, Profil) still work with their own `goObjectif()` / `goLevel()` handlers
- [ ] Back-navigation from questions returns to results (or at least doesn't break)

---

## Complexity: Low
Mostly a fix to `goToQuestion()`. One-day task.
