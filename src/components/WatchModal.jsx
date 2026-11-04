import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic.jsx";

/**
 * WatchModal
 * Shared-element detail modal using Framer Motion layoutId.
 * Displays expanded technical specifications, craftsmanship notes,
 * snapshot gallery (when available), and high-fidelity dial artwork.
 * Includes keyboard Escape handling, robust focus trap, and focus restoration.
 */
export default function WatchModal({ watch: w, onClose, onSelect }) {
  const modalRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const onSelectRef = useRef(onSelect);

  const [imgBroken, setImgBroken] = useState(false);
  const [selectedImage, setSelectedImage] = useState(w?.image || "");

  // Keep callback references stable to prevent unnecessary effect re-executions
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Synchronize image and reset failure state whenever target watch changes
  useEffect(() => {
    setSelectedImage(w?.image || "");
    setImgBroken(false);
  }, [w?.id, w?.image]);

  const galleryImages =
    Array.isArray(w?.snapshots) && w.snapshots.length > 0
      ? w.snapshots
      : w?.image
      ? [w.image]
      : [];

  useEffect(() => {
    if (!w) return;

    // Cache the currently focused element to restore it upon modal dismissal
    const previouslyFocused = document.activeElement;

    // Handle Escape dismissal and Tab key focus trapping
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (
            document.activeElement === lastElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus placed safely onto the primary close button
    const initialFocusTimer = setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector(".modal-close-btn");
        if (closeBtn) {
          closeBtn.focus();
        } else {
          modalRef.current.focus?.();
        }
      }
    }, 50);

    // Prevent background scrolling behind active modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(initialFocusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [w?.id]);

  if (!w) return null;

  const handleSelect = () => {
    if (onSelectRef.current) {
      onSelectRef.current(w);
    }
    onCloseRef.current?.();
  };

  return (
    <div
      className="modal-backdrop-wrap"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-watch-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCloseRef.current?.();
        }
      }}
    >
      {/* Blurred dimmed backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => onCloseRef.current?.()}
        aria-hidden="true"
      />

      {/* Main expanded card with layoutId shared element animation */}
      <div
        className="modal-container"
        data-lenis-prevent
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onCloseRef.current?.();
          }
        }}
      >
        <motion.div
          ref={modalRef}
          layoutId={`watch-card-${w.id}`}
          className="modal-card"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          {/* Close button with magnetic pull */}
          <div className="modal-close-wrap">
            <Magnetic strength={0.4}>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => onCloseRef.current?.()}
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
                data-shape={w.shape || "square"}
                style={{
                  "--b": w.body || "#222",
                  "--f": w.face || "#c3cda6",
                  "--s": w.strap || "#333",
                }}
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
                    src={selectedImage || w.image}
                    alt={w.name}
                    onError={() => {
                      if (selectedImage && selectedImage !== w.image) {
                        setSelectedImage(w.image);
                      } else {
                        setImgBroken(true);
                      }
                    }}
                  />
                )}
              </motion.div>

              {galleryImages.length > 1 && (
                <div
                  className="modal-gallery"
                  role="tablist"
                  aria-label={`${w.name} snapshot gallery`}
                >
                  {galleryImages.map((src, idx) => (
                    <button
                      key={`${w.id}-thumb-${idx}`}
                      type="button"
                      className={`modal-thumb ${selectedImage === src ? "active" : ""}`}
                      onClick={() => {
                        setSelectedImage(src);
                        setImgBroken(false);
                      }}
                      aria-label={`View snapshot ${idx + 1} for ${w.name}`}
                      aria-pressed={selectedImage === src}
                    >
                      <img
                        src={src}
                        alt={`${w.name} snapshot ${idx + 1}`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="modal-art-badge">
                <span>
                  {imgBroken ? "VECTOR ARCHIVE SCHEMATIC" : "ORIGINAL ARCHIVE PHOTOGRAPHY"} &bull;{" "}
                  {w.releaseYear || "TOKYO SPEC"}
                </span>
              </div>
            </div>

            {/* Content Column: Lineage, Tagline, Specifications */}
            <div className="modal-info">
              <span className="line modal-line">{w.line} Collection</span>
              <motion.h3
                layoutId={`watch-title-${w.id}`}
                id="modal-watch-title"
                className="modal-title"
              >
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
                  <span className="spec-val">
                    {w.caseStructure ||
                      (w.shape === "octagon" ? "Carbon Core Octagon" : "Impact-Molded Resin")}
                  </span>
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

              {Array.isArray(w.facts) && w.facts.length > 0 && (
                <div className="modal-features-list">
                  <h4>DISTINGUISHING TRAITS</h4>
                  <ul>
                    {w.facts.map((f, idx) => (
                      <li key={`${f}-${idx}`}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-actions">
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    className="btn modal-primary-btn"
                    onClick={handleSelect}
                  >
                    Select Model
                  </button>
                </Magnetic>
                <button
                  type="button"
                  className="link modal-cancel-btn"
                  onClick={() => onCloseRef.current?.()}
                >
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
