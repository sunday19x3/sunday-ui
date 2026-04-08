# sunday-ui

Beautiful, accessible UI components for React. Copy-paste into your project. No dependency lock-in.

**[Documentation](https://ui.sunday19x3.xyz)** | **[Components](https://ui.sunday19x3.xyz/docs/components)** | **[Getting Started](https://ui.sunday19x3.xyz/docs/getting-started)**

## Features

- **Copy-paste install** — Components live in your codebase, not node_modules
- **Accessible** — WCAG 2.1 AA, keyboard navigation, ARIA attributes, screen reader support
- **Tailwind v4** — CSS-first configuration, no tailwind.config.js
- **Themeable** — CSS variables with light/dark mode out of the box
- **React 18+** — forwardRef, compound components, TypeScript

## Quick Start

```bash
# Initialize sunday-ui in your project
npx sunday-ui init

# Add components
npx sunday-ui add button
npx sunday-ui add dialog
```

## Components

| Component | Description |
|-----------|-------------|
| **Button** | Variants, sizes, loading state, asChild |
| **Badge** | Status indicators with color variants |
| **Card** | Compound component with semantic HTML |
| **Checkbox** | Native input with label and description |
| **Input** | Label, helper text, error state, ARIA |
| **Dialog** | Focus trap, scroll lock, portal rendering |
| **Select** | WAI-ARIA listbox, keyboard nav, type-ahead |

## Theming

sunday-ui uses CSS variables with Tailwind v4's `@theme inline`:

```css
:root {
  --sui-primary: #ff6e00;
  --sui-background: #ffffff;
  --sui-foreground: #1a1a1a;
  /* ... */
}

[data-theme="dark"] {
  --sui-primary: #ff8a33;
  --sui-background: #121010;
  --sui-foreground: #e8e4e0;
}
```

Switch themes by setting `data-theme` on `<html>`:

```js
document.documentElement.setAttribute("data-theme", "dark");
```

## Tech Stack

- React 18+
- Tailwind CSS v4
- TypeScript
- class-variance-authority
- clsx + tailwind-merge

## License

MIT
