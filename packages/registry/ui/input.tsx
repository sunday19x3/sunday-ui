"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useId } from "@/hooks/use-id";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  helperText?: string;
  error?: string;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helperText, error, id: providedId, required, ...props },
    ref
  ) => {
    const id = useId(providedId);
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const hasError = !!error;

    // Build aria-describedby from available descriptions
    const describedBy = [
      hasError ? errorId : null,
      helperText && !hasError ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="text-destructive ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={id}
          className={cn(
            "h-11 w-full rounded-xl border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-150 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError
              ? "border-destructive focus-visible:ring-destructive/30"
              : "border-input",
            className
          )}
          required={required}
          aria-required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...props}
        />

        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {helperText && !hasError && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
