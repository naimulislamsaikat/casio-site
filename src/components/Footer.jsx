import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./Magnetic.jsx";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const footerRef = useRef(null);

  // Parallax reveal for the giant footer wordmark
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.7], [0.2, 1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    // Simulate luxury API dispatch
    setTimeout(() => {
      setStatus("success");
    }, 700);
  };

  return (
    <footer className="footer-wrap" ref={footerRef}>
      <div className="wrap footer-content">
        {/* Newsletter Section with Micro-Interactions */}
        <div className="footer-dispatch-card">
          <div className="dispatch-badge">
            <span className="dispatch-dot" />
            <span>DISPATCH & ARCHIVE ALERTS</span>
          </div>
          <h3 className="dispatch-title">Never miss a limited reference run</h3>
          <p className="dispatch-desc">
            Direct notifications when archival reissues, technical white papers, and boutique allocations drop.
          </p>

          <form className="dispatch-form" onSubmit={handleSubmit} noValidate>
            <div className={`input-shell ${status === "error" ? "shell-error" : ""}`}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email (e.g. collector@tokyo.io)"
                disabled={status === "loading" || status === "success"}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "dispatch-err" : undefined}
                className="dispatch-input"
              />

              <Magnetic strength={0.25}>
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`dispatch-submit-btn ${status === "success" ? "btn-success" : ""}`}
                  aria-label="Subscribe to dispatch alerts"
                >
                  {status === "loading" ? (
                    <span className="submit-spinner" />
                  ) : status === "success" ? (
                    <span className="submit-check">&check;</span>
                  ) : (
                    <span>Join</span>
                  )}
                </button>
              </Magnetic>
            </div>

            {status === "error" && (
              <motion.p
                id="dispatch-err"
                className="dispatch-error-text"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
              >
                {errorMsg}
              </motion.p>
            )}

            {status === "success" && (
              <motion.div
                className="dispatch-success-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                aria-live="polite"
              >
                <span className="success-icon">&check;</span>
                <span>You are on the allocation list. Welcome to the lineage.</span>
              </motion.div>
            )}
          </form>
        </div>

        {/* Brand Meta Links */}
        <div className="footer-links-row">
          <div className="footer-col-brand">
            <span className="footer-brand-name">CASIO</span>
            <p className="footer-brand-tagline">
              Digital horology and shock-resistant engineering since 1974.
            </p>
          </div>

          <div className="footer-nav-groups">
            <div className="footer-group">
              <span className="group-heading">COLLECTIONS</span>
              <a href="#collection">Classic Digitals</a>
              <a href="#showcase">G-Shock Architecture</a>
              <a href="#collection">Edifice Speed</a>
              <a href="#collection">Pro Trek Field</a>
            </div>

            <div className="footer-group">
              <span className="group-heading">EXPLORATION</span>
              <a href="#story">Our History</a>
              <a href="#showcase">Carbon Core Guard</a>
              <a href="#top">Live Caliber Test</a>
            </div>

            <div className="footer-group">
              <span className="group-heading">HEADQUARTERS</span>
              <span>Shibuya, Tokyo</span>
              <span>support@example.com</span>
              <span>Universal Caliber Lab</span>
            </div>
          </div>
        </div>

        {/* Large Wordmark Revealed on Scroll */}
        <div className="footer-wordmark-container" aria-hidden="true">
          <motion.div
            className="footer-giant-wordmark"
            style={{
              y: wordmarkY,
              scale: wordmarkScale,
              opacity: wordmarkOpacity,
            }}
          >
            CASIO
          </motion.div>
        </div>

        {/* Bottom copyright notice */}
        <div className="footer-bottom-row">
          <p className="small">
            &copy; {new Date().getFullYear()} Precision Watchmaking Project. Tribute demonstration.
          </p>
          <p className="small">
            Crafted for enthusiasts who appreciate authentic digital timepieces.
          </p>
        </div>
      </div>
    </footer>
  );
}
