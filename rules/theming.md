# Theming Rules — sunday-ui

This document defines how theming works in sunday-ui. AI agents MUST follow these patterns.

---

## Architecture

Theming is built on three layers:

1. **CSS Variables** (`--sui-*`) — define the actual color/token values
2. **Tailwind Theme Mapping** (`@theme inline`) — maps CSS vars to Tailwind tokens
3. **`data-theme` Attribute** — selects which variable set is active

```
[data-theme="dark"] on <html>
        ↓
CSS variables change values
        ↓
Tailwind classes automatically use new values
        ↓
Components re-render with new colors
```

---

## CSS Variable Layer

### Naming

All variables use `--sui-` prefix to avoid collisions:

```css
:root {
  --sui-primary: #ff6e00;
  --sui-primary-foreground: #ffffff;
  --sui-background: #ffffff;
  --sui-foreground: #1a1a1a;
  /* ... */
}
```

### Convention: Background + Foreground Pairs

Every background color has a matching foreground (text color):

| Background | Foreground |
|-----------|-----------|
| `--sui-primary` | `--sui-primary-foreground` |
| `--sui-secondary` | `--sui-secondary-foreground` |
| `--sui-destructive` | `--sui-destructive-foreground` |
| `--sui-success` | `--sui-success-foreground` |
| `--sui-warning` | `--sui-warning-foreground` |
| `--sui-muted` | `--sui-muted-foreground` |
| `--sui-accent` | `--sui-accent-foreground` |
| `--sui-background` | `--sui-foreground` |

Components always use both: `bg-primary text-primary-foreground`.

---

## Tailwind v4 Integration

Tailwind v4 uses CSS-first configuration. No `tailwind.config.js`.

### Theme Mapping Block

```css
@theme inline {
  /* Colors */
  --color-primary: var(--sui-primary);
  --color-primary-foreground: var(--sui-primary-foreground);
  --color-secondary: var(--sui-secondary);
  --color-secondary-foreground: var(--sui-secondary-foreground);
  --color-destructive: var(--sui-destructive);
  --color-destructive-foreground: var(--sui-destructive-foreground);
  --color-success: var(--sui-success);
  --color-success-foreground: var(--sui-success-foreground);
  --color-warning: var(--sui-warning);
  --color-warning-foreground: var(--sui-warning-foreground);
  --color-muted: var(--sui-muted);
  --color-muted-foreground: var(--sui-muted-foreground);
  --color-accent: var(--sui-accent);
  --color-accent-foreground: var(--sui-accent-foreground);
  --color-background: var(--sui-background);
  --color-foreground: var(--sui-foreground);
  --color-border: var(--sui-border);
  --color-input: var(--sui-input);
  --color-ring: var(--sui-ring);

  /* Typography */
  --font-sans: var(--sui-font-sans);

  /* Border Radius */
  --radius-sm: calc(var(--sui-radius) - 4px);
  --radius-md: calc(var(--sui-radius) - 2px);
  --radius-lg: var(--sui-radius);
  --radius-xl: calc(var(--sui-radius) + 4px);
  --radius-2xl: calc(var(--sui-radius) + 8px);
}
```

### Dark Mode Variant

```css
@custom-variant dark (&:is([data-theme="dark"] *));
```

This means `dark:bg-background` activates when an ancestor has `data-theme="dark"`.

---

## Theme Switching

### Current Approach (v1)

Themes are switched by setting `data-theme` on `<html>`:

```tsx
// Switch to dark
document.documentElement.setAttribute("data-theme", "dark");

// Switch to light (remove attribute or set "light")
document.documentElement.removeAttribute("data-theme");
```

### Future Theme Manager (planned)

A theme manager will be added later to handle:
- User preference detection (`prefers-color-scheme`)
- Persistence (localStorage / cookie)
- System theme sync
- Custom theme registration
- SSR/SSG flash prevention

For now, components just use the CSS variables — they don't care HOW the theme was set.

---

## Component Theming Rules

### DO

- Use Tailwind semantic classes: `bg-primary`, `text-foreground`, `border-border`
- Use background+foreground pairs: `bg-destructive text-destructive-foreground`
- Use opacity modifiers for hover: `hover:bg-primary/90`
- Use `ring-ring/30` for focus rings

### DO NOT

- Never hardcode hex colors in components: ~~`bg-[#ff6e00]`~~
- Never use Tailwind's built-in color palette: ~~`bg-orange-500`~~, ~~`text-gray-900`~~
- Never use `dark:` Tailwind variant with hardcoded colors: ~~`dark:bg-gray-800`~~
- Never reference `--sui-*` variables directly in components — always go through Tailwind classes

---

## Adding a New Theme

To add a custom theme (e.g., "ocean"):

1. Define a new CSS variable block:
```css
[data-theme="ocean"] {
  --sui-primary: #0077b6;
  --sui-primary-foreground: #ffffff;
  /* ... override all tokens ... */
}
```

2. Set the attribute:
```tsx
document.documentElement.setAttribute("data-theme", "ocean");
```

No component code changes needed — everything flows through variables.

---

## Color Format

- Use **hex** format for all color definitions: `#ff6e00`
- For opacity, use Tailwind's `/` modifier: `bg-primary/90`, `ring-ring/30`
- In CSS variables, always define as full hex (no alpha channel in the variable itself)
