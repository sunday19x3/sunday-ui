"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Card ---------------------------------- */

interface CardProps extends React.HTMLAttributes<HTMLElement> {}

const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-background shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* ------------------------------- CardHeader ------------------------------- */

interface CardHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn("flex flex-col gap-2 px-6 py-4", className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

/* -------------------------------- CardTitle ------------------------------- */

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Tag = "h3", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

/* ----------------------------- CardDescription ---------------------------- */

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

/* ------------------------------- CardContent ------------------------------ */

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    );
  }
);
CardContent.displayName = "CardContent";

/* ------------------------------- CardFooter ------------------------------- */

interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {}

const CardFooter = React.forwardRef<HTMLElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "flex items-center px-6 py-4 border-t border-border",
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
