import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTilt from "../hooks/useTilt.js";

export default function WatchCard({ watch: w }) {
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false); // no photo file yet -> CSS illustration
  const tilt = useTilt(8);
  return (
    <motion.article
      layout
      className="card"
      {...tilt}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35 }}
    >
      <div className="art" data-shape={w.shape} style={{ "--b": w.body, "--f": w.face, "--s": w.strap }}>
        {broken ? (
          <>
            <i className="band" />
            <i className="case"><i className="face">{w.digits}</i></i>
            <i className="band" />
          </>
        ) : (
          <img className="photo" src={w.image} alt={w.name} loading="lazy" onError={() => setBroken(true)} />
        )}
      </div>
      <h3>{w.name}</h3>
      <p className="line">{w.line}</p>
      <p>{w.tagline}</p>
      <button className="link" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? "Hide details" : "See the details"}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {w.facts.map((f) => <li key={f}>{f}</li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
