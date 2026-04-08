"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { composeRefs } from "@/lib/compose-refs";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    const child = React.Children.only(children) as React.ReactElement;

    if (!React.isValidElement(child)) {
      console.warn("Slot requires a single valid React element as child");
      return null;
    }

    const childProps = child.props as Record<string, unknown>;

    // Merge className
    const mergedClassName = cn(
      slotProps.className as string | undefined,
      childProps.className as string | undefined
    );

    // Compose event handlers
    const mergedProps: Record<string, unknown> = { ...slotProps };
    for (const key of Object.keys(childProps)) {
      if (key === "className" || key === "ref") continue;

      const slotHandler = slotProps[key as keyof typeof slotProps];
      const childHandler = childProps[key];

      if (
        typeof slotHandler === "function" &&
        typeof childHandler === "function" &&
        key.startsWith("on")
      ) {
        mergedProps[key] = (...args: unknown[]) => {
          (childHandler as Function)(...args);
          (slotHandler as Function)(...args);
        };
      } else if (key in childProps) {
        mergedProps[key] = childHandler;
      }
    }

    // Compose refs
    const childRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
    const composedRef = composeRefs(forwardedRef, childRef);

    return React.cloneElement(child, {
      ...mergedProps,
      className: mergedClassName || undefined,
      ref: composedRef,
    } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });
  }
);
Slot.displayName = "Slot";

export { Slot };
export type { SlotProps };
