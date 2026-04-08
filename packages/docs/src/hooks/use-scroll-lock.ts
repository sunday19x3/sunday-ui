"use client";

import * as React from "react";

let lockCount = 0;
let originalStyles: { overflow: string; paddingRight: string } | null = null;

export function useScrollLock(enabled: boolean = true) {
  React.useEffect(() => {
    if (!enabled) return;

    lockCount++;

    if (lockCount === 1) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      originalStyles = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      lockCount--;

      if (lockCount === 0 && originalStyles) {
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
        originalStyles = null;
      }
    };
  }, [enabled]);
}
