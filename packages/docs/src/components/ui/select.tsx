"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Portal } from "@/lib/portal";
import { useControllableState } from "@/hooks/use-controllable-state";
import { useEscapeKey } from "@/hooks/use-escape-key";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useId } from "@/hooks/use-id";
import { useTypeahead } from "@/hooks/use-typeahead";

/* -------------------------------- Context --------------------------------- */

interface SelectContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  activeDescendant: string;
  setActiveDescendant: (id: string) => void;
  triggerId: string;
  listboxId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  items: React.MutableRefObject<Map<string, { value: string; label: string; disabled: boolean }>>;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select compound components must be used within <Select>"
    );
  }
  return context;
}

/* --------------------------------- Select --------------------------------- */

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
}: SelectProps) {
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });
  const [open, setOpen] = React.useState(false);
  const [activeDescendant, setActiveDescendant] = React.useState("");

  const id = useId();
  const triggerId = `${id}-trigger`;
  const listboxId = `${id}-listbox`;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const items = React.useRef<Map<string, { value: string; label: string; disabled: boolean }>>(new Map());

  return (
    <SelectContext.Provider
      value={{
        open,
        onOpenChange: setOpen,
        value,
        onValueChange: setValue,
        activeDescendant,
        setActiveDescendant,
        triggerId,
        listboxId,
        triggerRef,
        contentRef,
        items,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}
Select.displayName = "Select";

/* ----------------------------- SelectTrigger ------------------------------ */

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useSelectContext();

    const composedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        (ctx.triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref, ctx.triggerRef]
    );

    function handleKeyDown(e: React.KeyboardEvent) {
      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
          e.preventDefault();
          ctx.onOpenChange(true);
          break;
        case "ArrowUp":
          e.preventDefault();
          ctx.onOpenChange(true);
          break;
      }
    }

    return (
      <button
        ref={composedRef}
        id={ctx.triggerId}
        type="button"
        role="combobox"
        aria-expanded={ctx.open}
        aria-haspopup="listbox"
        aria-controls={ctx.open ? ctx.listboxId : undefined}
        aria-activedescendant={ctx.open ? ctx.activeDescendant : undefined}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-2.5 text-base transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        onClick={() => ctx.onOpenChange(!ctx.open)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            ctx.open && "rotate-180"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

/* ------------------------------ SelectValue ------------------------------- */

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, className, ...props }, ref) => {
    const { value, items } = useSelectContext();

    // Find the label for the current value
    let displayText = placeholder;
    for (const [, item] of items.current) {
      if (item.value === value) {
        displayText = item.label;
        break;
      }
    }

    return (
      <span
        ref={ref}
        className={cn(
          !value && "text-muted-foreground",
          className
        )}
        {...props}
      >
        {displayText}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

/* ----------------------------- SelectContent ------------------------------ */

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useSelectContext();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState<{
      top: number;
      left: number;
      width: number;
    } | null>(null);

    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (ctx.contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref, ctx.contentRef]
    );

    // Position the dropdown
    React.useEffect(() => {
      if (!ctx.open || !ctx.triggerRef.current) return;

      const trigger = ctx.triggerRef.current;
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 256; // max-h-64 = 16rem = 256px

      const top =
        spaceBelow >= dropdownHeight
          ? rect.bottom + 4
          : rect.top - dropdownHeight - 4;

      setPosition({
        top: top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }, [ctx.open, ctx.triggerRef]);

    // Collect item labels for typeahead
    const itemLabels = React.useMemo(() => {
      const labels: string[] = [];
      for (const [, item] of ctx.items.current) {
        labels.push(item.label);
      }
      return labels;
    }, [ctx.items, ctx.open]);

    const { handleTypeahead } = useTypeahead({
      items: itemLabels,
      onMatch: (index) => {
        const entries = Array.from(ctx.items.current.entries());
        if (entries[index]) {
          ctx.setActiveDescendant(entries[index][0]);
        }
      },
      enabled: ctx.open,
    });

    // Close on outside click
    useClickOutside(innerRef, () => ctx.onOpenChange(false), ctx.open);
    useEscapeKey(() => {
      ctx.onOpenChange(false);
      ctx.triggerRef.current?.focus();
    }, ctx.open);

    // Keyboard navigation
    React.useEffect(() => {
      if (!ctx.open) return;

      function handleKeyDown(e: KeyboardEvent) {
        const entries = Array.from(ctx.items.current.entries());
        const currentIndex = entries.findIndex(
          ([id]) => id === ctx.activeDescendant
        );

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            let next = currentIndex + 1;
            while (next < entries.length && entries[next][1].disabled) next++;
            if (next < entries.length) {
              ctx.setActiveDescendant(entries[next][0]);
            }
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            let prev = currentIndex - 1;
            while (prev >= 0 && entries[prev][1].disabled) prev--;
            if (prev >= 0) {
              ctx.setActiveDescendant(entries[prev][0]);
            }
            break;
          }
          case "Home": {
            e.preventDefault();
            const first = entries.find(([, item]) => !item.disabled);
            if (first) ctx.setActiveDescendant(first[0]);
            break;
          }
          case "End": {
            e.preventDefault();
            const last = [...entries].reverse().find(([, item]) => !item.disabled);
            if (last) ctx.setActiveDescendant(last[0]);
            break;
          }
          case "Enter":
          case " ": {
            e.preventDefault();
            if (currentIndex >= 0 && !entries[currentIndex][1].disabled) {
              ctx.onValueChange(entries[currentIndex][1].value);
              ctx.onOpenChange(false);
              ctx.triggerRef.current?.focus();
            }
            break;
          }
          default: {
            // Type-ahead
            handleTypeahead(e.key);
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [ctx.open, ctx.activeDescendant, handleTypeahead]);

    // Set initial active descendant
    React.useEffect(() => {
      if (!ctx.open) return;
      const entries = Array.from(ctx.items.current.entries());
      // Activate current value or first non-disabled item
      const selected = entries.find(([, item]) => item.value === ctx.value);
      const first = entries.find(([, item]) => !item.disabled);
      const initial = selected ?? first;
      if (initial) ctx.setActiveDescendant(initial[0]);
    }, [ctx.open]);

    if (!ctx.open || !position) return null;

    return (
      <Portal>
        <div
          ref={composedRef}
          role="listbox"
          id={ctx.listboxId}
          aria-labelledby={ctx.triggerId}
          tabIndex={-1}
          className={cn(
            "fixed z-50 max-h-64 overflow-auto rounded-xl border border-border bg-background p-1 shadow-md",
            "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95",
            className
          )}
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
          }}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);
SelectContent.displayName = "SelectContent";

/* ------------------------------- SelectItem ------------------------------- */

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const ctx = useSelectContext();
    const itemId = useId();
    const label = typeof children === "string" ? children : "";

    // Register item on mount
    React.useEffect(() => {
      ctx.items.current.set(itemId, { value, label, disabled });
      return () => {
        ctx.items.current.delete(itemId);
      };
    }, [itemId, value, label, disabled]);

    const isSelected = ctx.value === value;
    const isActive = ctx.activeDescendant === itemId;

    return (
      <div
        ref={ref}
        id={itemId}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        className={cn(
          "relative flex items-center rounded-lg px-3 py-2 text-sm cursor-pointer select-none transition-colors duration-150",
          isActive && "bg-accent text-accent-foreground",
          isSelected && "font-medium",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => {
          if (disabled) return;
          ctx.onValueChange(value);
          ctx.onOpenChange(false);
          ctx.triggerRef.current?.focus();
        }}
        onMouseEnter={() => {
          if (!disabled) ctx.setActiveDescendant(itemId);
        }}
        {...props}
      >
        {children}
        {isSelected && (
          <svg
            className="ml-auto h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

/* ------------------------------ SelectGroup ------------------------------- */

interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn("py-1", className)}
        {...props}
      />
    );
  }
);
SelectGroup.displayName = "SelectGroup";

/* ------------------------------ SelectLabel ------------------------------- */

interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-3 py-1.5 text-xs font-semibold text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
SelectLabel.displayName = "SelectLabel";

/* -------------------------------- Exports --------------------------------- */

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
};
export type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
};
