# Component Anatomy Rules — sunday-ui

This document defines how components are structured, named, and composed. AI agents MUST follow these patterns when creating or modifying components.

---

## File Structure

Each component lives in a single file at `ui/<component-name>.tsx`:

```tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Variant definitions (if applicable)
const buttonVariants = cva("base-classes", {
  variants: { ... },
  defaultVariants: { ... },
});

// 2. Type definitions
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// 3. Component implementation with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Component logic
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// 4. Exports (always named, never default)
export { Button, buttonVariants };
export type { ButtonProps };
```

---

## Naming Conventions

### Files
- Component files: `kebab-case.tsx` (e.g., `button.tsx`, `dialog.tsx`)
- Hook files: `kebab-case.ts` (e.g., `use-focus-trap.ts`)
- Lib files: `kebab-case.ts` (e.g., `compose-refs.ts`)

### Components
- Component names: `PascalCase` (e.g., `Button`, `DialogContent`)
- Compound components: `Parent` + `ParentChild` (e.g., `Card`, `CardHeader`, `CardTitle`)
- Variant definitions: `camelCase` + `Variants` suffix (e.g., `buttonVariants`, `badgeVariants`)

### Props
- Props interface: `PascalCase` + `Props` (e.g., `ButtonProps`, `DialogProps`)
- Boolean props: no `is`/`has` prefix — use `open`, `disabled`, `loading` (not `isOpen`, `isDisabled`)
- Callback props: `on` + `Event` (e.g., `onOpenChange`, `onClick`)
- Render props: avoid — prefer compound components

### CSS Variables
- Prefix: `--sui-`
- Format: `--sui-<token>` (e.g., `--sui-primary`, `--sui-radius`)

---

## Component Patterns

### Simple Component (Button, Badge, Input)

- Single `forwardRef` component
- Uses `cva` for variants
- Extends native HTML element attributes
- Spreads remaining props onto root element

### Compound Component (Dialog, Select)

- Parent provides React Context with shared state
- Children consume context
- Each sub-component is its own `forwardRef`
- All exported from the same file

```tsx
// Context
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within <Dialog>");
  }
  return context;
}

// Parent manages state
function Dialog({ open, onOpenChange, defaultOpen, children }: DialogProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

// Children use context
const DialogTrigger = React.forwardRef<...>((...) => {
  const { onOpenChange } = useDialogContext();
  // ...
});
```

---

## Props Conventions

### `asChild` Pattern

Available on: `Button`, `Badge` (components that might render as a different element).

```tsx
// Usage: renders as <a> with Button styles
<Button asChild>
  <a href="/login">Login</a>
</Button>
```

Implementation uses the custom `Slot` component from `lib/slot.tsx`.

### Controlled vs Uncontrolled

Compound components (Dialog, Select) support both:

```tsx
// Uncontrolled (manages own state)
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>

// Controlled (parent manages state)
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>...</DialogContent>
</Dialog>
```

Use `useControllableState` hook for this pattern.

---

## Export Rules

1. **Named exports only** — never `export default`
2. Export the component, variants (if any), and props type
3. Compound component: export parent + all children + types

```tsx
// button.tsx
export { Button, buttonVariants };
export type { ButtonProps };

// dialog.tsx
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
export type { DialogProps };
```

---

## "use client" Directive

**Every component file MUST start with `"use client";`**

This ensures compatibility with Next.js App Router and React Server Components. Components use hooks, event handlers, and refs which require client-side rendering.

---

## Ref Forwarding

**Every rendered component MUST use `React.forwardRef`**

This allows consumers to:
- Access DOM nodes directly
- Use with third-party libraries
- Compose with other ref-based utilities

Always set `displayName` for better DevTools experience:
```tsx
Button.displayName = "Button";
```

---

## Import Aliases

Components use path aliases that map to the user's project:

| Import | Alias |
|--------|-------|
| `@/lib/utils` | cn() utility |
| `@/lib/slot` | Slot component |
| `@/lib/portal` | Portal component |
| `@/lib/compose-refs` | Ref composition |
| `@/hooks/use-*` | Custom hooks |

The CLI transforms these paths based on the user's `sunday-ui.json` config.
