"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/navigation";

function MobileNavDrawer({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const initialPathRef = React.useRef(pathname);

  // Close on route change (not on mount)
  React.useEffect(() => {
    if (pathname !== initialPathRef.current) {
      onClose();
    }
  }, [pathname]);

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background lg:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <img src="/logo.svg" alt="" className="h-6 w-6 dark:invert-0 invert" aria-hidden="true" />
            <span className="text-lg font-bold text-foreground">sunday</span>
            <span className="text-lg font-bold text-primary">ui</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close navigation">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <nav className="overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            {navigation.map((group) => (
              <div key={group.title}>
                <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </h4>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                          isActive
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>,
    document.body
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>

      {open && <MobileNavDrawer onClose={() => setOpen(false)} />}
    </>
  );
}
