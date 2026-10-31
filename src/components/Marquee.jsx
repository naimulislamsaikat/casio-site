import { motion } from "framer-motion";

const words = ["G-Shock", "Classic", "Edifice", "Pro Trek", "Built to be dropped"];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden>
      <motion.div className="track" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
        {[0, 1].flatMap((k) => words.map((w) => <span key={k + w}>{w}</span>))}
      </motion.div>
    </div>
  );
}
