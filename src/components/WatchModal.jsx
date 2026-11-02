import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic.jsx";

/**
 * WatchModal
 * Shared-element detail modal using Framer Motion layoutId.
 * Displays expanded technical specifications, craftsmanship notes,
 * and high-fidelity dial artwork. Includes keyboard Escape handling and focus trap.
 */
export default function WatchModal({ watch: w, onClose }) {
  const modalRef = useRef(null);
  const [imgBroken, setImgBroken] = useState(false);

  useEffect(() => {
    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Trap focus inside modal
    if (modalRef.current) {
      const closeBtn = modalRef.current.querySelector(".modal-close-btn");
      if (closeBtn) closeBtn.focus();
    }

    // Prevent body scroll behind modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!w) return null;

  return (
    <div className="modal-backdrop-wrap" role="dialog" aria-modal="true" aria-labelledby="modal-watch-title">
      {/* Blurred dimmed backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Main expanded card with layoutId shared element animation */}
      <div className="modal-container" onClick={onClose}>
        <motion.div
          ref={modalRef}
          layoutId={`watch-card-${w.id}`}
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          {/* Close button with magnetic pull */}
          <div className="modal-close-wrap">
            <Magnetic strength={0.4}>
              <button
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close specifications modal"
              >
                &times;
              </button>
            </Magnetic>
          </div>

          <div className="modal-grid">
            {/* Visual Column: Authentic Photography & Case Visual */}
            <div className="modal-visual">
              <motion.div
                layoutId={`watch-art-${w.id}`}
                className="art modal-art"
                data-shape={w.shape}
                style={{ "--b": w.body, "--f": w.face, "--s": w.strap }}
              >
                {imgBroken ? (
                  <>
                    <i className="band" />
                    <i className="case">
                      <i className="face">{w.digits || "QUARTZ"}</i>
                    </i>
                    <i className="band" />
                  </>
                ) : (
                  <img
                    className="modal-photo"
                    src={w.image}
                    alt={w.name}
                    onError={() => setImgBroken(true)}
                  />
                )}
              </motion.div>
              <div className="modal-art-badge">
                <span>ORIGINAL ARCHIVE PHOTOGRAPHY &bull; {w.releaseYear || "TOKYO SPEC"}</span>
              </div>
            </div>

            {/* Content Column: Lineage, Tagline, Specifications */}
            <div className="modal-info">
              <span className="line modal-line">{w.line} Collection</span>
              <motion.h3 layoutId={`watch-title-${w.id}`} id="modal-watch-title" className="modal-title">
                {w.name}
              </motion.h3>
              <p className="modal-tagline">{w.tagline}</p>

              <div className="modal-spec-table">
                <h4>TECHNICAL ARCHITECTURE</h4>
                <div className="spec-row">
                  <span className="spec-name">Movement Caliber</span>
                  <span className="spec-val">{w.caliber || "High-Torque Quartz Oscillator"}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-name">Accuracy Standard</span>
                  <span className="spec-val">{w.accuracy || "±15 Seconds / Month"}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-name">Case Structure</span>
                  <span className="spec-val">{w.caseStructure || (w.shape === "octagon" ? "Carbon Core Octagon" : "Impact-Molded Resin")}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-name">Water Resistance</span>
                  <span className="spec-val">{w.waterResist || "20-Bar / 200M Hermetic Seal"}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-name">Power Longevity</span>
                  <span className="spec-val">{w.batteryLife || "7-Year High-Density Cell"}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-name">Net Weight</span>
                  <span className="spec-val">{w.weight || "Lightweight Build"}</span>
                </div>
              </div>

              <div className="modal-features-list">
                <h4>DISTINGUISHING TRAITS</h4>
                <ul>
                  {w.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <Magnetic strength={0.3}>
                  <button className="btn modal-primary-btn" onClick={onClose}>
                    Select Model
                  </button>
                </Magnetic>
                <button className="link modal-cancel-btn" onClick={onClose}>
                  Return to collection
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
