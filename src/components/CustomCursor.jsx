import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor
 * Features:
 * - Precision inner dot directly tracking pointer
 * - Spring-damped follower ring with fluid lag
 * - Expands with "VIEW" badge over watch cards
 * - Magnetic-like expansion ring over clickable controls
 * - Hides cleanly on touch/coarse devices and reduced motion
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // "default" | "view" | "pointer"
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the fluid follower ring
  const springConfig = { damping: 24, stiffness: 280, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch / coarse pointer or reduced motion
    const touchCheck = window.matchMedia("(pointer: coarse), (hover: none)");
    const motionCheck = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (touchCheck.matches || motionCheck.matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Event delegation to detect hover context
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const card = target.closest(".card, [data-cursor='view']");
      if (card) {
        setCursorType("view");
        return;
      }

      const interactive = target.closest("a, button, input, [role='button'], .chip, .link");
      if (interactive) {
        setCursorType("pointer");
        return;
      }

      setCursorType("default");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  // Follower ring sizes & animations based on active cursor state
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(34, 40, 32, 0.05)",
      borderColor: "rgba(34, 40, 32, 0.4)",
      scale: 1,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(224, 38, 27, 0.12)",
      borderColor: "rgba(224, 38, 27, 0.6)",
      scale: 1.15,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(34, 40, 32, 0.92)",
      borderColor: "var(--amber)",
      scale: 1,
    },
  };

  return (
    <div
      className="custom-cursor-wrap"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* Precision inner center dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType === "view" ? 0 : cursorType === "pointer" ? 1.5 : 1,
          opacity: cursorType === "view" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Fluid spring follower ring with dynamic label */}
      <motion.div
        className={`cursor-ring cursor-${cursorType}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorType}
        variants={ringVariants}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorType === "view" && (
          <motion.span
            className="cursor-label"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
