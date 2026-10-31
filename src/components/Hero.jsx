import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import DigitalWatch from "./DigitalWatch.jsx";
import useTilt from "../hooks/useTilt.js";
import Magnetic from "./Magnetic.jsx";

const ThreeHeroWatch = lazy(() => import("./ThreeHeroWatch.jsx"));

const START = 1.2; // wait for the preloader curtain
const ease = [0.2, 0.7, 0.2, 1];
const item = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: START + 0.15 * i, duration: 0.7, ease },
});
const words = "Watches that keep up with your real life.".split(" ");

export default function Hero() {
  const heroRef = useRef(null);
  const tilt = useTilt(10);
  const [viewMode, setViewMode] = useState("2d"); // "2d" | "3d"
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // Check if device is desktop and doesn't prefer reduced motion
    const isMobile = window.innerWidth < 800 || window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile && !reducedMotion) {
      setCanRender3D(true);
    }
  }, []);

  // Parallax & exit transitions tied to scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, 50]);

  // Background outlined "TIME" parallax
  const timeY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const timeScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Pointer-following ambient glow behind the watch
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 120, damping: 20 });
  const springGlowY = useSpring(glowY, { stiffness: 120, damping: 20 });

  const handleWatchPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    glowX.set(x * 0.45);
    glowY.set(y * 0.45);
  };

  const handleWatchPointerLeave = () => {
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <section id="top" className="hero" ref={heroRef}>
      {/* Giant outlined background typography */}
      <div className="hero-time-bg" aria-hidden="true">
        <motion.div
          className="hero-time-text"
          style={{ y: timeY, scale: timeScale }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease }}
        >
          TIME
        </motion.div>
      </div>

      <motion.div
        className="wrap hero-in"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
      >
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse" />
            <span>EST. 1974 &bull; TOKYO, JAPAN</span>
          </div>

          <h1>
            {words.map((w, i) => (
              <span className="mask" key={i}>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: START + i * 0.08, duration: 0.8, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...item(3)}>
            We have been making watches since 1974. Some of them survive drops, rain and
            long weeks, and some just look good with a shirt. Take a look around.
          </motion.p>

          <motion.div {...item(4)} className="hero-actions">
            <Magnetic strength={0.35}>
              <a className="btn" href="#collection">
                Browse the collection
              </a>
            </Magnetic>
            <a className="hero-secondary-link" href="#showcase">
              Explore Craft &darr;
            </a>
          </motion.div>
        </div>

        <motion.div
          {...item(2)}
          className="hero-watch-stage"
          onPointerMove={handleWatchPointerMove}
          onPointerLeave={handleWatchPointerLeave}
        >
          {/* Dynamic pointer-following ambient backlight */}
          <motion.div
            className="hero-watch-glow"
            style={{
              x: springGlowX,
              y: springGlowY,
            }}
          />

          {/* View Mode Switcher (2D Live Quartz vs 3D Procedural Mesh) */}
          {canRender3D && (
            <div className="hero-view-switcher" role="tablist" aria-label="Watch Presentation Mode">
              <button
                className={`switcher-pill ${viewMode === "2d" ? "active" : ""}`}
                onClick={() => setViewMode("2d")}
                role="tab"
                aria-selected={viewMode === "2d"}
              >
                2D Live Dial
              </button>
              <button
                className={`switcher-pill ${viewMode === "3d" ? "active" : ""}`}
                onClick={() => setViewMode("3d")}
                role="tab"
                aria-selected={viewMode === "3d"}
              >
                3D Caliber Mesh
              </button>
            </div>
          )}

          {viewMode === "3d" && canRender3D ? (
            <Suspense
              fallback={
                <motion.div {...tilt} className="hero-watch-interactive">
                  <DigitalWatch />
                </motion.div>
              }
            >
              <ThreeHeroWatch />
            </Suspense>
          ) : (
            <motion.div {...tilt} className="hero-watch-interactive">
              <DigitalWatch />
            </motion.div>
          )}

          <p className="hint">
            {viewMode === "3d"
              ? "Scroll or move pointer to rotate 3D caliber geometry in realtime."
              : "Live quartz sync. Tilt the case, or trigger backlight illumination."}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
