import { motion } from "framer-motion";

// Curtain that lifts after the wordmark appears.
export default function Preloader() {
  return (
    <motion.div className="loader" aria-hidden initial={{ y: 0 }} animate={{ y: "-100%" }}
      transition={{ delay: 1.2, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Casio</motion.span>
    </motion.div>
  );
}
