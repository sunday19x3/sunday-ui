"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Portal } from "@/lib/portal";
import { useControllableState } from "@/hooks/use-controllable-state";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useEscapeKey } from "@/hooks/use-escape-key";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useId } from "@/hooks/use-id";

/* -------------------------------- Context --------------------------------- */

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      "Dialog compound components must be used within <Dialog>"
    );
  }
  return context;
}

/* --------------------------------- Dialog --------------------------------- */

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <DialogContext.Provider
      value={{ open, onOpenChange: setOpen, titleId, descriptionId, triggerRef }}
    >
      {children}
    </DialogContext.Provider>
  );
}
Dialog.displayName = "Dialog";

/* ------------------------------ DialogTrigger ----------------------------- */

interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, ...props }, ref) => {
    const { onOpenChange, triggerRef } = useDialogContext();

    const composedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref, triggerRef]
    );

    return (
      <button
        ref={composedRef}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          onOpenChange(true);
        }}
        {...props}
      />
    );
  }
);
DialogTrigger.displayName = "DialogTrigger";

/* ------------------------------ DialogPortal ------------------------------ */

interface DialogPortalProps {
  children: React.ReactNode;
  container?: Element | null;
}

function DialogPortal({ children, container }: DialogPortalProps) {
  const { open } = useDialogContext();
  if (!open) return null;
  return <Portal container={container}>{children}</Portal>;
}
DialogPortal.displayName = "DialogPortal";

/* ----------------------------- DialogOverlay ------------------------------ */

interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
          "motion-safe:animate-in motion-safe:fade-in-0",
          className
        )}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = "DialogOverlay";

/* ----------------------------- DialogContent ------------------------------ */

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, titleId, descriptionId } = useDialogContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    useFocusTrap(contentRef, open);
    useScrollLock(open);
    useEscapeKey(() => onOpenChange(false), open);

    return (
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={composedRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={cn(
              "relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-lg",
              "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

/* ------------------------------ DialogHeader ------------------------------ */

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 mb-4", className)}
        {...props}
      />
    );
  }
);
DialogHeader.displayName = "DialogHeader";

/* ------------------------------ DialogFooter ------------------------------ */

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-3 mt-6",
          className
        )}
        {...props}
      />
    );
  }
);
DialogFooter.displayName = "DialogFooter";

/* ------------------------------ DialogTitle ------------------------------- */

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDialogContext();

    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn("text-xl font-bold text-foreground", className)}
        {...props}
      />
    );
  }
);
DialogTitle.displayName = "DialogTitle";

/* --------------------------- DialogDescription ---------------------------- */

interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useDialogContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

/* ------------------------------- DialogClose ------------------------------ */

interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          onOpenChange(false);
        }}
        {...props}
      />
    );
  }
);
DialogClose.displayName = "DialogClose";

/* -------------------------------- Exports --------------------------------- */

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
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
};
