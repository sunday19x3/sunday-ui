"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@/lib/slot";
import { composeRefs } from "@/lib/compose-refs";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/85 hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/85 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/85 hover:shadow-md",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary !h-auto !p-0 !rounded-none bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat bg-gradient-to-r from-primary to-primary hover:bg-[length:100%_1px] transition-[background-size] duration-200 ease-out [&:not(:hover)]:bg-[position:100%_100%]",
      },
      size: {
        sm: "h-9 rounded-xl px-4 py-2 text-sm",
        md: "h-11 rounded-xl px-5 py-2.5 text-base",
        lg: "h-13 rounded-xl px-6 py-3 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  /** Enable magnetic hover + glow animation. Defaults to true (disabled for "link" variant). */
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      magnetic,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    // Fix #5: use HTMLElement — asChild can render any element, not just <button>
    const internalRef = React.useRef<HTMLElement>(null);

    // Magnetic hover is on by default, except for link variant or disabled state
    const isMagnetic = magnetic ?? variant !== "link";

    useMagneticHover(internalRef, {
      disabled: !isMagnetic || isDisabled,
      glowColor:
        variant === "ghost" || variant === "outline"
          ? "rgba(255,110,0,0.10)"
          : "rgba(255,255,255,0.15)",
    });

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={composeRefs(ref, internalRef)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...(asChild ? { "aria-disabled": isDisabled || undefined } : {})}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
