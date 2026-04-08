# Accessibility Rules — sunday-ui

This document defines the accessibility requirements for all sunday-ui components. AI agents MUST follow these rules. Every component must meet **WCAG 2.1 AA** compliance.

---

## Universal Rules

1. **All interactive elements** must be keyboard accessible
2. **All interactive elements** must have visible `focus-visible` indicators
3. **Never use `<div>` or `<span>` as interactive elements** — use `<button>`, `<a>`, `<input>`, `<select>`, or appropriate semantic elements
4. **Color must not be the only indicator** — always pair with icons, text, or patterns
5. **Minimum contrast ratio**: 4.5:1 for normal text, 3:1 for large text (18px+)
6. **Touch targets**: Minimum 44x44px for interactive elements
7. **Animations**: Respect `prefers-reduced-motion` — wrap animations in `motion-safe:` prefix

---

## Per-Component Accessibility Specs

### Button

| Requirement | Implementation |
|-------------|---------------|
| Element | `<button>` (or rendered element via `asChild`) |
| Keyboard | `Enter` and `Space` activate |
| Disabled | `disabled` attribute + `aria-disabled="true"` |
| Loading | `aria-busy="true"` + disable interaction, keep button text for screen readers |
| Icon-only | MUST have `aria-label` or `<span className="sr-only">` |
| Role | Implicit `button` role — do NOT add `role="button"` |

### Input

| Requirement | Implementation |
|-------------|---------------|
| Element | `<input>` wrapped in `<div>`, with `<label>` |
| Label | Always associate via `htmlFor` + `id` (use `use-id` hook) |
| Required | `required` attribute + `aria-required="true"` |
| Error state | `aria-invalid="true"` + `aria-describedby` pointing to error message `<p>` |
| Helper text | `aria-describedby` pointing to helper `<p>` (compose IDs if both helper + error) |
| Disabled | `disabled` attribute on `<input>` |
| Placeholder | Never use as label replacement — always provide a `<label>` |

### Card

| Requirement | Implementation |
|-------------|---------------|
| Element | `<article>` as root |
| Header | `<header>` wrapping title and description |
| Title | `<h3>` (user can override heading level) |
| Footer | `<footer>` |
| Interactive card | If clickable, the whole card should be keyboard accessible via an inner `<a>` or `<button>`, not by adding `onClick` to the `<article>` |

### Badge

| Requirement | Implementation |
|-------------|---------------|
| Element | `<span>` |
| Screen reader | If badge conveys status, ensure surrounding context makes meaning clear |
| Color | Never rely on color alone — variant text (e.g., "Error", "Success") should be in or near the badge |

### Dialog

| Requirement | Implementation |
|-------------|---------------|
| Element | `<dialog>` element or `<div>` with `role="dialog"` |
| Attributes | `aria-modal="true"`, `aria-labelledby` (→ title ID), `aria-describedby` (→ description ID) |
| Focus trap | Tab/Shift+Tab cycles within dialog only |
| Initial focus | First focusable element, or `DialogContent` itself (with `tabIndex={-1}`) |
| Close | `Escape` key closes dialog |
| Focus return | On close, return focus to the trigger element that opened it |
| Scroll lock | Body scroll disabled while open |
| Overlay | Clicking overlay closes dialog |
| Screen reader | Announce dialog title on open |
| Nesting | Support nested dialogs (stacked focus traps) |

**Keyboard Pattern (WAI-ARIA Dialog)**:
- `Tab`: Move focus to next focusable element inside dialog
- `Shift+Tab`: Move focus to previous focusable element inside dialog
- `Escape`: Close dialog

### Select

| Requirement | Implementation |
|-------------|---------------|
| Trigger | `<button>` with `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls` |
| Content | `<div>` with `role="listbox"`, `aria-labelledby` |
| Items | `<div>` with `role="option"`, `aria-selected`, unique `id` |
| Active item | `aria-activedescendant` on trigger points to active option's `id` |
| Disabled items | `aria-disabled="true"` on option |
| Groups | `role="group"` with `aria-labelledby` pointing to group label |

**Keyboard Pattern (WAI-ARIA Listbox)**:
- `Enter` / `Space`: Open select or select focused item
- `ArrowDown`: Move focus to next item (open select if closed)
- `ArrowUp`: Move focus to previous item
- `Home`: Move focus to first item
- `End`: Move focus to last item
- `Escape`: Close select without changing value
- `Type-ahead`: Typing characters jumps to matching item (with debounce)

---

## Screen Reader Utilities

Every component file should be able to use this utility class:

```tsx
// sr-only: visually hidden but accessible to screen readers
// Tailwind class: "sr-only"
// Equivalent CSS: position: absolute; width: 1px; height: 1px; padding: 0;
//                 margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
//                 white-space: nowrap; border-width: 0;
```

---

## Testing Checklist

Before any component is considered complete:

- [ ] Keyboard-only navigation works
- [ ] Tab order is logical
- [ ] Focus indicator is visible
- [ ] Screen reader announces element correctly
- [ ] ARIA attributes are present and correct
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Touch target is >= 44x44px
- [ ] Disabled state is communicated to assistive tech
- [ ] No ARIA warnings in browser console
- [ ] `prefers-reduced-motion` is respected for any animations
