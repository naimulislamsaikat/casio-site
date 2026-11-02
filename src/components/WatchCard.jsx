import { useState, forwardRef, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTilt from "../hooks/useTilt.js";
import Magnetic from "./Magnetic.jsx";

const WatchCard = forwardRef(function WatchCard({ watch: w, onSelect, index = 0 }, ref) {
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false); // no photo file yet -> CSS illustration
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const cardRef = useRef(null);
  const tilt = useTilt(8);

  // Spotlight gradient that follows cursor over card
  const handlePointerMove = (e) => {
    tilt.onPointerMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handlePointerLeave = (e) => {
    tilt.onPointerLeave(e);
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.article
      ref={(node) => {
        cardRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      layout
      layoutId={`watch-card-${w.id}`}
      className="card watch-spotlight-card"
      style={tilt.style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      data-cursor="view"
      onClick={() => onSelect && onSelect(w)}
    >
      {/* Interactive cursor spotlight sheen */}
      <div
        className="card-spotlight-glow"
        aria-hidden="true"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(195, 205, 166, 0.28), transparent 70%)`,
        }}
      />

      {/* Art container with clip-path image reveal */}
      <motion.div
        layoutId={`watch-art-${w.id}`}
        className="art card-art-reveal"
        data-shape={w.shape}
        style={{ "--b": w.body, "--f": w.face, "--s": w.strap }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      >
        {broken ? (
          <>
            <i className="band" />
            <i className="case">
              <i className="face">{w.digits || "QUARTZ"}</i>
            </i>
            <i className="band" />
          </>
        ) : (
          <>
            <img
              className="photo"
              src={w.image}
              alt={w.name}
              loading="lazy"
              onError={() => setBroken(true)}
            />
            <span className="card-photo-tag" aria-label="Authentic studio photo">
              ORIGINAL
            </span>
          </>
        )}
      </motion.div>

      <div className="card-meta">
        <span className="line">{w.line}</span>
        <motion.h3 layoutId={`watch-title-${w.id}`}>{w.name}</motion.h3>
        <p className="card-tagline">{w.tagline}</p>
      </div>

      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <Magnetic strength={0.2}>
          <button
            className="link card-details-btn"
            onClick={() => onSelect && onSelect(w)}
            aria-label={`Inspect detailed specifications for ${w.name}`}
          >
            Inspect specs &rarr;
          </button>
        </Magnetic>

        <button
          className="card-quick-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle quick fact bullet points"
        >
          {open ? "− Quick traits" : "+ Quick traits"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="card-facts-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {w.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

export default WatchCard;
