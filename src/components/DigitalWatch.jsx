import { useState } from "react";
import { motion } from "framer-motion";
import useClock from "../hooks/useClock.js";

const pad = (n) => String(n).padStart(2, "0");

export default function DigitalWatch() {
  const now = useClock();
  const [lit, setLit] = useState(false);
  const day = now.toLocaleDateString("en", { weekday: "short" }).toUpperCase();

  return (
    <motion.div className="dw" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      <span className="dw-strap" />
      <div className="dw-case">
        <div className={`lcd ${lit ? "lit" : ""}`}>
          <span className="day">{day}</span>
          <div className="digits">
            <span className="ghost">88:88</span>
            <span className="live">{pad(now.getHours())}:{pad(now.getMinutes())}</span>
            <span className="secs">{pad(now.getSeconds())}</span>
          </div>
        </div>
        <button className="light-btn" onClick={() => setLit(!lit)} aria-pressed={lit}>
          {lit ? "Light off" : "Press light"}
        </button>
      </div>
      <span className="dw-strap" />
    </motion.div>
  );
}
