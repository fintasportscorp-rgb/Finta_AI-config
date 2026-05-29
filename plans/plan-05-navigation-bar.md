# Plan 05 — Responsive Navigation Bar (Board + Step-by-step)

**Scope:** Add a bookmark-style nav bar to the questions views. Remove "→ Voir le projet" button. Highlight "Export project" access.

---

## Current state

- **Board mode** (`rBoard`): a simple top bar with "board" label + "step-by-step" toggle button.
- **Step-by-step mode** (`rQuestion`): nav bar with Back/Next + a "→ Voir le projet" button (line 2888).
- No per-question navigation.

---

## Target state

A persistent **sidebar** (desktop) / **collapsible drawer** (mobile) with:
- One item per active question: `[01] Q label`  ← scrolls/navigates to it
- A highlighted "⚙ Export" item at the bottom → navigates to results
- Current question highlighted (step-by-step) or active anchor highlighted (board)
- Responsive: sidebar on ≥ 768px, hamburger toggle on < 768px

---

## Layout

### Desktop (≥ 768px)

```
┌─────────────────────────────────────────────────────┐
│  [sidebar]  │  [main content area]                  │
│             │                                        │
│  [01] AI… ✓ │  Question form                        │
│  [02] Proj… │                                        │
│  [03] Dom…  │                                        │
│  …          │                                        │
│  ─────────  │                                        │
│  ⚙ Export  │                                        │
└─────────────────────────────────────────────────────┘
```

### Mobile (< 768px)

Top bar with hamburger → slide-in drawer from left.

---

## HTML structure

Wrap questions view in a flex container:

```html
<div class="wiz-layout">
  <nav class="wiz-sidenav" id="wiz-sidenav">
    <div class="wiz-sidenav-items" id="sidenav-items">
      <!-- generated per question -->
    </div>
    <div class="sidenav-export-item" onclick="S.screen='results';render()">
      <span class="sidenav-icon">⚙</span>
      <span class="sidenav-label">Export project</span>
    </div>
  </nav>
  <div class="wiz-main" id="wiz-main">
    <!-- existing board or step-by-step content -->
  </div>
</div>
```

---

## JS changes

### New function: `buildSidenav(qs, activeIndex)`

```js
function buildSidenav(qs, activeIdx) {
  const items = qs.map((q, i) => {
    const ok  = isAnswered(q);
    const act = (i === activeIdx);
    const handler = S.boardMode
      ? `scrollToSection('${q.id}')`
      : `goToStepIdx(${i})`;
    return `<div class="sidenav-item${act?' act':''}${ok?' done':''}" onclick="${handler}" title="${esc(q.label)}">
      <span class="sidenav-num">[${String(i+1).padStart(2,'0')}]</span>
      <span class="sidenav-qlabel">${esc(q.label)}</span>
      ${ok ? '<span class="sidenav-check">✓</span>' : ''}
    </div>`;
  }).join('');
  return items;
}
```

### New helpers

```js
function scrollToSection(qId) {
  // Board mode: scroll to #bsect-{qId}
  const el = document.getElementById('bsect-' + qId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToStepIdx(idx) {
  // Step-by-step: jump to question at index
  S.step = idx;
  S.screen = 'questions';
  S.boardMode = false;
  render();
}

function toggleSidenav() {
  const nav = document.getElementById('wiz-sidenav');
  nav.classList.toggle('open');
}
```

### Board mode highlight

In board mode, use IntersectionObserver to highlight the sidenav item as the user scrolls:

```js
function initSidenavObserver(qs) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id.replace('bsect-', '');
        document.querySelectorAll('.sidenav-item').forEach(el => {
          el.classList.toggle('act', el.dataset.qid === id);
        });
      }
    });
  }, { threshold: 0.3 });
  qs.forEach(q => {
    const el = document.getElementById('bsect-' + q.id);
    if (el) observer.observe(el);
  });
}
```

### Remove "Voir le projet" button

In `rQuestion()` (line ~2888), delete:
```js
${S.step > 0 ? `<button class="btn bs" ... onclick="S.screen='results';render()">→ Voir le projet</button>` : ''}
```

---

## CSS additions (`css/wizard.css`)

```css
.wiz-layout { display: flex; min-height: 100vh; }

.wiz-sidenav {
  width: 220px; flex-shrink: 0;
  background: var(--bg2);
  border-right: 1px solid rgba(255,255,255,.07);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh; overflow-y: auto;
}

.sidenav-item {
  display: flex; align-items: center; gap: .45rem;
  padding: .45rem .7rem;
  font-size: .72rem; cursor: pointer;
  border-left: 2px solid transparent;
  transition: background .15s, border-color .15s;
}
.sidenav-item:hover      { background: rgba(255,255,255,.04); }
.sidenav-item.act        { border-left-color: var(--acl); color: var(--acl); }
.sidenav-item.done       { color: var(--grn2); }
.sidenav-qlabel          { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sidenav-export-item {
  margin-top: auto; padding: .7rem;
  background: var(--acd); border-top: 1px solid rgba(124,106,247,.3);
  cursor: pointer; display: flex; align-items: center; gap: .5rem;
  font-size: .78rem; font-weight: 600; color: var(--acl);
}
.sidenav-export-item:hover { background: rgba(124,106,247,.2); }

/* Hamburger toggle (mobile) */
.sidenav-toggle { display: none; }

@media (max-width: 768px) {
  .wiz-sidenav {
    position: fixed; left: -220px; top: 0; height: 100%;
    z-index: 200; transition: left .2s; box-shadow: 2px 0 12px rgba(0,0,0,.4);
  }
  .wiz-sidenav.open { left: 0; }
  .sidenav-toggle {
    display: flex; align-items: center; justify-content: center;
    position: fixed; top: .6rem; left: .6rem; z-index: 201;
    background: var(--bg2); border: 1px solid rgba(255,255,255,.1);
    width: 36px; height: 36px; cursor: pointer; font-size: 1.1rem;
  }
}
```

---

## Verification checklist

- [ ] Board mode: clicking a nav item scrolls to the correct section
- [ ] Board mode: active item updates as user scrolls (IntersectionObserver)
- [ ] Step-by-step: clicking nav item jumps to that question
- [ ] "⚙ Export" item navigates to results screen
- [ ] "→ Voir le projet" button is removed
- [ ] Answered questions show ✓ in the nav
- [ ] Desktop: sidebar visible alongside content
- [ ] Mobile: hamburger toggle opens/closes the drawer
- [ ] No layout regression on welcome / level / results screens (sidenav only shown in questions screen)

---

## Complexity: Medium
CSS layout change + new JS functions. IntersectionObserver is straightforward.
