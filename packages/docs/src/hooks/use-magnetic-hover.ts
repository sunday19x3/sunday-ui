"use client";

import * as React from "react";
import gsap from "gsap";

interface MagneticHoverOptions {
  /** Strength of the magnetic pull (0-1). Default 0.3 */
  strength?: number;
  /** Size of the glow in pixels. Default 80 */
  glowSize?: number;
  /** Glow color (CSS color string). Default "rgba(255,255,255,0.15)" */
  glowColor?: string;
  /** Disable the effect entirely */
  disabled?: boolean;
}

export function useMagneticHover<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: MagneticHoverOptions = {}
) {
  const {
    strength = 0.3,
    glowSize = 80,
    glowColor = "rgba(255,255,255,0.15)",
    disabled = false,
  } = options;

  const rafId = React.useRef<number>(0);
  const isHovered = React.useRef(false);

  // Fix #1: removed `ref` from dependency array — ref is a stable object,
  // and we read ref.current inside the effect. Including the object identity
  // is unnecessary and hazardous if a non-stable ref is passed.
  React.useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    // Fix #2: respond to prefers-reduced-motion changes at runtime
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let tornDown = false;

    // Fix #4: use an overlay div for the glow instead of mutating backgroundImage.
    // This avoids stale snapshot issues with dynamic gradient classes.
    const glow = document.createElement("div");
    glow.setAttribute("aria-hidden", "true");
    Object.assign(glow.style, {
      position: "absolute",
      inset: "0",
      borderRadius: "inherit",
      pointerEvents: "none",
      opacity: "0",
      background: `radial-gradient(${glowSize}px circle at 50% 50%, ${glowColor}, transparent)`,
      transition: "opacity 0.3s ease",
      zIndex: "1",
    });

    // Ensure the parent can contain the overlay
    const prevPosition = el.style.position;
    if (getComputedStyle(el).position === "static") {
      el.style.position = "relative";
    }
    el.style.overflow = "hidden";
    el.appendChild(glow);

    function teardown() {
      if (tornDown) return;
      tornDown = true;

      // Fix #3: mark RAF as cancelled so queued callbacks bail out
      const id = rafId.current;
      rafId.current = 0;
      cancelAnimationFrame(id);

      el!.removeEventListener("mousemove", onMouseMove);
      el!.removeEventListener("mouseenter", onMouseEnter);
      el!.removeEventListener("mouseleave", onMouseLeave);

      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0, scale: 1, clearProps: "transform" });

      if (glow.parentNode) glow.remove();
      el!.style.position = prevPosition;
      el!.style.overflow = "";
    }

    function onMouseMove(e: MouseEvent) {
      if (!el || tornDown) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        // Fix #3: bail if cancelled between schedule and execution
        if (!rafId.current || tornDown) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const moveX = deltaX * strength;
        const moveY = deltaY * strength;

        gsap.to(el, {
          x: moveX,
          y: moveY,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Position the glow at the cursor location within the element
        const glowX = ((e.clientX - rect.left) / rect.width) * 100;
        const glowY = ((e.clientY - rect.top) / rect.height) * 100;
        glow.style.background = `radial-gradient(${glowSize}px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent)`;
      });
    }

    function onMouseEnter() {
      if (!el || tornDown) return;
      isHovered.current = true;
      glow.style.opacity = "1";
    }

    function onMouseLeave() {
      if (!el || tornDown) return;
      isHovered.current = false;

      // Fix #3: cancel and mark
      const id = rafId.current;
      rafId.current = 0;
      cancelAnimationFrame(id);

      // Spring back to origin
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });

      glow.style.opacity = "0";
    }

    // Fix #2: listen for runtime reduced-motion changes
    function onReduceMotionChange(e: MediaQueryListEvent) {
      if (e.matches) teardown();
    }
    mq.addEventListener("change", onReduceMotionChange);

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      mq.removeEventListener("change", onReduceMotionChange);
      teardown();
    };
  }, [strength, glowSize, glowColor, disabled]);
}
