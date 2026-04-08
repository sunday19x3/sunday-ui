"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useId } from "@/hooks/use-id";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label?: string;
  description?: string;
  id?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id: providedId, disabled, ...props }, ref) => {
    const id = useId(providedId);
    const descriptionId = description ? `${id}-description` : undefined;
    const hasDescription = !!description;

    return (
      <div className={cn("flex gap-3", hasDescription ? "items-start" : "items-center")}>
        <label
          htmlFor={id}
          className={cn(
            "relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center",
            hasDescription && "mt-[3px]",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={cn(
              "peer h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-input bg-background transition-all duration-150",
              "checked:bg-primary checked:border-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            disabled={disabled}
            aria-describedby={descriptionId}
            {...props}
          />
          <svg
            className="pointer-events-none absolute inset-0 m-auto h-[10px] w-[10px] text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="1.5 5.5 4 8 8.5 2" />
          </svg>
        </label>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-sm font-medium text-foreground select-none leading-none",
                  disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={descriptionId}
                className={cn(
                  "text-sm text-muted-foreground leading-snug",
                  disabled && "opacity-50"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
