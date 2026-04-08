"use client";

import * as React from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  container?: Element | null;
}

function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const target = container ?? document.body;
  return createPortal(children, target);
}
Portal.displayName = "Portal";

export { Portal };
export type { PortalProps };
