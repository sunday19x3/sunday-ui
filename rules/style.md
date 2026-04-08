# Style Rules — sunday-ui

This document defines the visual design tokens and styling conventions for all sunday-ui components. AI agents MUST follow these rules when generating or modifying components.

---

## Visual Identity

**Style**: Modern, rounded, Apple-inspired UI
**Feel**: Clean, spacious, breathable — generous whitespace, no visual clutter

---

## Colors

All colors are referenced via CSS variables with `--sui-` prefix. Components use Tailwind classes that map to these variables (e.g., `bg-primary`, `text-foreground`).

### Light Mode (`:root`)

| Token | Variable | Value | Usage |
|-------|----------|-------|-------|
| Primary | `--sui-primary` | `#ff6e00` | CTAs, links, active states, primary buttons |
| Primary Foreground | `--sui-primary-foreground` | `#ffffff` | Text on primary backgrounds |
| Secondary | `--sui-secondary` | `#1a1a2e` | Secondary buttons, emphasis |
| Secondary Foreground | `--sui-secondary-foreground` | `#ffffff` | Text on secondary backgrounds |
| Destructive | `--sui-destructive` | `#dc2626` | Errors, danger actions, delete buttons |
| Destructive Foreground | `--sui-destructive-foreground` | `#ffffff` | Text on destructive backgrounds |
| Success | `--sui-success` | `#16a34a` | Success states, confirmations |
| Success Foreground | `--sui-success-foreground` | `#ffffff` | Text on success backgrounds |
| Warning | `--sui-warning` | `#ca8a04` | Warning states, caution notices |
| Warning Foreground | `--sui-warning-foreground` | `#ffffff` | Text on warning backgrounds |
| Muted | `--sui-muted` | `#f5f0eb` | Subtle backgrounds, disabled states |
| Muted Foreground | `--sui-muted-foreground` | `#6b5e53` | Secondary text, placeholders |
| Background | `--sui-background` | `#ffffff` | Page background |
| Foreground | `--sui-foreground` | `#1a1a1a` | Primary text color |
| Border | `--sui-border` | `#e5ddd5` | Borders, dividers |
| Input | `--sui-input` | `#e5ddd5` | Input borders |
| Ring | `--sui-ring` | `#ff6e00` | Focus rings (used at 30% opacity) |
| Accent | `--sui-accent` | `#fff3e8` | Subtle accent backgrounds (hover states) |
| Accent Foreground | `--sui-accent-foreground` | `#ff6e00` | Text on accent backgrounds |

### Dark Mode (`[data-theme="dark"]`)

| Token | Variable | Value | Notes |
|-------|----------|-------|-------|
| Primary | `--sui-primary` | `#ff8a33` | Lighter orange for dark bg contrast |
| Primary Foreground | `--sui-primary-foreground` | `#1a1a1a` | Dark text on lighter orange |
| Secondary | `--sui-secondary` | `#2a2a4a` | Lighter navy |
| Secondary Foreground | `--sui-secondary-foreground` | `#e8e4e0` | Light text |
| Destructive | `--sui-destructive` | `#ef4444` | Lighter red |
| Destructive Foreground | `--sui-destructive-foreground` | `#1a1a1a` | |
| Success | `--sui-success` | `#22c55e` | Lighter green |
| Success Foreground | `--sui-success-foreground` | `#1a1a1a` | |
| Warning | `--sui-warning` | `#eab308` | Lighter amber |
| Warning Foreground | `--sui-warning-foreground` | `#1a1a1a` | |
| Muted | `--sui-muted` | `#2a2520` | Dark warm surface |
| Muted Foreground | `--sui-muted-foreground` | `#a89888` | Dimmed text |
| Background | `--sui-background` | `#121010` | Deep warm black |
| Foreground | `--sui-foreground` | `#e8e4e0` | Light warm text |
| Border | `--sui-border` | `#3a3330` | Warm dark border |
| Input | `--sui-input` | `#3a3330` | |
| Ring | `--sui-ring` | `#ff8a33` | |
| Accent | `--sui-accent` | `#2a1f15` | Dark warm accent |
| Accent Foreground | `--sui-accent-foreground` | `#ff8a33` | |

---

## Typography

- **Primary font**: `'Poppins', system-ui, -apple-system, sans-serif`
- **CSS variable**: `--sui-font-sans`
- **Font loading**: Users must import Poppins themselves (Google Fonts or `@fontsource/poppins`)

### Font Sizes (Tailwind scale)

| Usage | Class | Size |
|-------|-------|------|
| Small text, badges | `text-xs` | 12px |
| Helper text, captions | `text-sm` | 14px |
| Body text, inputs, buttons | `text-base` | 16px |
| Card titles | `text-lg` | 18px |
| Dialog titles | `text-xl` | 20px |

### Font Weights

| Usage | Class |
|-------|-------|
| Body text | `font-normal` (400) |
| Button labels, badges | `font-medium` (500) |
| Card titles, headings | `font-semibold` (600) |
| Dialog titles, emphasis | `font-bold` (700) |

---

## Border Radius

- **CSS variable**: `--sui-radius: 0.75rem` (12px)
- **Applied via Tailwind**: `rounded-xl` as default
- Components may use smaller radius for nested elements

| Context | Value | Class |
|---------|-------|-------|
| Buttons, inputs, cards | 12px | `rounded-xl` |
| Badges | 9999px (pill) | `rounded-full` |
| Dialog | 16px | `rounded-2xl` |
| Inner elements (e.g., select items) | 8px | `rounded-lg` |

---

## Spacing & Padding

Follow Apple's 44px minimum touch target guideline. Use Tailwind's 4px grid.

### Component Padding

| Component | Size | Padding | Min Height |
|-----------|------|---------|------------|
| Button | sm | `px-4 py-2` | 36px |
| Button | md (default) | `px-5 py-2.5` | 44px |
| Button | lg | `px-6 py-3` | 52px |
| Button | icon | `p-2.5` | 44px |
| Input | default | `px-4 py-2.5` | 44px |
| Card | content | `p-6` | — |
| Card | header/footer | `px-6 py-4` | — |
| Badge | default | `px-3 py-1` | — |
| Dialog | content | `p-6` | — |
| Select item | default | `px-3 py-2` | 36px |

### Spacing Between Elements

- Use `gap` instead of margins for consistent spacing
- Card sections: `gap-2` between header items, `gap-4` between sections
- Form fields: `gap-1.5` between label and input, `gap-4` between fields
- Dialog sections: `gap-4` between header/content/footer

---

## Shadows

Subtle, multi-layer shadows (Apple-style). Warm-tinted using `rgba(0,0,0,...)`.

| Token | Variable | Value |
|-------|----------|-------|
| Shadow SM | `--sui-shadow-sm` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)` |
| Shadow MD | `--sui-shadow-md` | `0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)` |
| Shadow LG | `--sui-shadow-lg` | `0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)` |

| Component | Shadow |
|-----------|--------|
| Button (default variant, hover) | `shadow-sm` |
| Card | `shadow-sm` |
| Dialog | `shadow-lg` |
| Select dropdown | `shadow-md` |

---

## Transitions

All interactive states use smooth transitions:

- **Duration**: `150ms` for hover, `200ms` for open/close
- **Easing**: `ease-out`
- **Properties**: `background-color`, `color`, `border-color`, `box-shadow`, `opacity`, `transform`
- **Tailwind class**: `transition-colors duration-150` for most, `transition-all duration-200` for open/close

---

## Borders

- **Width**: `1px` (default)
- **Color**: `border` token (`--sui-border`)
- **Style**: Visible but gentle — warm-tinted, not harsh
- Cards and inputs always have borders
- Buttons: only `outline` and `ghost` variants have visible borders

---

## Focus Ring

- **Style**: `ring-2 ring-ring/30 ring-offset-2 ring-offset-background`
- **Visible on**: `focus-visible` only (not on click)
- All interactive elements MUST have visible focus indicators
- Color: primary at 30% opacity
- Offset: 2px from element edge

---

## Hover States

| Component | Variant | Hover Effect |
|-----------|---------|-------------|
| Button | default (primary) | Slightly darker: `hover:bg-primary/90` |
| Button | secondary | `hover:bg-secondary/90` |
| Button | outline | `hover:bg-accent` |
| Button | ghost | `hover:bg-accent` |
| Button | link | `hover:underline` |
| Card | (if interactive) | `hover:shadow-md` transition |
| Select item | — | `bg-accent` |
| Badge | — | No hover (static element) |

---

## Disabled States

- **Opacity**: `opacity-50`
- **Cursor**: `cursor-not-allowed`
- **Interaction**: `pointer-events-none`
- Apply via: `disabled:opacity-50 disabled:pointer-events-none`
