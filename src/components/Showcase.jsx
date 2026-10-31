import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    step: "01",
    tag: "GEOMETRIC HERITAGE",
    title: "Carbon Core Octagon",
    desc: "Forged resin reinforced with high-modulus carbon fibers. Absorbs multidirectional shock while shaving case thickness to an ultra-slim 11.8mm.",
    spec: "10M Drop Resistance",
  },
  {
    step: "02",
    tag: "ANALOG-DIGITAL HARMONY",
    title: "High-Precision Quartz",
    desc: "Laser-cut skeleton hands move in sync with a high-contrast negative LCD readout. Calibrated to within ±15 seconds deviation per month.",
    spec: "±15 Sec / Month",
  },
  {
    step: "03",
    tag: "AQUATIC REINFORCEMENT",
    title: "20-Bar Hydro Barrier",
    desc: "Hermetically sealed with dual vulcanized O-rings and four recessed stainless-steel caseback screws to withstand underwater pressure to 200 meters.",
    spec: "200M ISO Certified",
  },
  {
    step: "04",
    tag: "ENDURING ILLUMINATION",
    title: "Dual Super Illuminator",
    desc: "Independent high-output LEDs light both the dial surface and digital display with selectable 1.5s / 3s afterglow, powered by high-efficiency cells.",
    spec: "3-Year Low-Drain Power",
  },
];

export default function Showcase() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Watch rotation and subtle scale across scroll
  const watchRotate = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [-8, 4, -4, 6]);
  const watchScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.05, 0.98]);

  // Opacities & Y translations for each of the 4 feature callouts
  const callout1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.27], [0.1, 1, 1, 0]);
  const callout1Y = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.27], [30, 0, 0, -30]);

  const callout2Opacity = useTransform(scrollYProgress, [0.26, 0.33, 0.47, 0.52], [0, 1, 1, 0]);
  const callout2Y = useTransform(scrollYProgress, [0.26, 0.33, 0.47, 0.52], [30, 0, 0, -30]);

  const callout3Opacity = useTransform(scrollYProgress, [0.51, 0.58, 0.72, 0.77], [0, 1, 1, 0]);
  const callout3Y = useTransform(scrollYProgress, [0.51, 0.58, 0.72, 0.77], [30, 0, 0, -30]);

  const callout4Opacity = useTransform(scrollYProgress, [0.76, 0.83, 0.95, 1], [0, 1, 1, 0.9]);
  const callout4Y = useTransform(scrollYProgress, [0.76, 0.83, 0.95, 1], [30, 0, 0, 0]);

  const calloutTransforms = [
    { opacity: callout1Opacity, y: callout1Y },
    { opacity: callout2Opacity, y: callout2Y },
    { opacity: callout3Opacity, y: callout3Y },
    { opacity: callout4Opacity, y: callout4Y },
  ];

  // Side progress line
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="showcase" className="showcase-scroll-track" ref={containerRef}>
      <div className="showcase-sticky-viewport">
        <div className="showcase-bg-grid" aria-hidden="true" />
        <div className="showcase-pedestal-light" aria-hidden="true" />

        <div className="wrap showcase-layout">
          {/* Left Column: Heading and feature callouts */}
          <div className="showcase-narrative">
            <div className="showcase-kicker">
              <span className="kicker-line" />
              <span>PINNED SPECIFICATION SHOWCASE</span>
            </div>
            <h2 className="showcase-title">Anatomy of the GA-2100</h2>
            <p className="showcase-subtitle">
              Scroll down to inspect the four layers of precision engineering that make the octagonal icon indestructible.
            </p>

            <div className="showcase-callouts-stack">
              {features.map((f, i) => (
                <motion.div
                  key={f.step}
                  className="showcase-callout-card"
                  style={{
                    opacity: calloutTransforms[i].opacity,
                    y: calloutTransforms[i].y,
                  }}
                >
                  <div className="callout-header">
                    <span className="callout-step">{f.step}</span>
                    <span className="callout-tag">{f.tag}</span>
                  </div>
                  <h3 className="callout-name">{f.title}</h3>
                  <p className="callout-desc">{f.desc}</p>
                  <div className="callout-spec">
                    <span className="spec-label">BENCHMARK</span>
                    <span className="spec-value">{f.spec}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Featured Watch Stage */}
          <div className="showcase-center-stage">
            <motion.div
              className="showcase-watch-wrapper"
              style={{
                rotateZ: watchRotate,
                scale: watchScale,
              }}
            >
              {/* Luxury Illuminated Watch Representation */}
              <div className="showcase-watch-fixture">
                <div className="fixture-halo" />
                <div className="fixture-strap fixture-strap-top" />
                <div className="fixture-bezel" data-shape="octagon">
                  <div className="fixture-dial">
                    <div className="dial-index-ring" />
                    <div className="dial-hands">
                      <div className="hand hand-hour" />
                      <div className="hand hand-min" />
                      <div className="hand-pin" />
                    </div>
                    <div className="dial-lcd-sub">
                      <span>MON 10:08</span>
                    </div>
                  </div>
                </div>
                <div className="fixture-strap fixture-strap-bottom" />
              </div>

              <div className="showcase-reflection-disc" />
            </motion.div>

            {/* Vertical milestone indicator */}
            <div className="showcase-rail">
              <span className="rail-label">STAGE</span>
              <div className="rail-track">
                <motion.div className="rail-fill" style={{ height: progressHeight }} />
              </div>
              <span className="rail-total">04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
