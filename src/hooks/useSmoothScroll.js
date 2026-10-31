import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * useSmoothScroll
 * Initializes Lenis smooth scrolling, binds the requestAnimationFrame loop,
 * syncs with native scroll events (for Framer Motion useScroll),
 * and intercepts internal anchor links with smooth easing.
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, // Keep native feel on touch devices
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor links for buttery-smooth scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          // Offset accounts for sticky header (64px) + breathing room
          lenis.scrollTo(el, {
            offset: -72,
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
