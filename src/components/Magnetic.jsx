import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic component
 * Gently pulls child interactive elements toward the pointer on hover.
 * Uses spring physics for tactile luxury feel.
 * Gracefully disables on touch devices or reduced motion.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High responsiveness with controlled damping
  const springConfig = { damping: 15, stiffness: 220, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse), (hover: none)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) {
      setDisabled(true);
    }
  }, []);

  if (disabled) {
    return <div className={`magnetic-wrap ${className}`}>{children}</div>;
  }

  const handlePointerMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = (e.clientX - centerX) * strength;
    const pullY = (e.clientY - centerY) * strength;

    x.set(pullX);
    y.set(pullY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
