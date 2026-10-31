import { useMotionValue, useSpring, useTransform } from "framer-motion";

// Pointer-following 3D tilt. Spread `style` and the handlers on a motion element.
export default function useTilt(max = 10) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    onPointerMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    onPointerLeave: () => { px.set(0); py.set(0); },
  };
}
