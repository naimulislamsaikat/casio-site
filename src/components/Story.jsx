import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useInView } from "framer-motion";

/**
 * Animated number counter component
 * Counts up smoothly to target number using easeOutExpo when scrolled into view.
 */
function Counter({ value, suffix = "", duration = 1.4 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = parseInt(value, 10);
    if (isNaN(target)) return;

    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    if (!inView) return;

    let startTime = null;
    let animId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // easeOutExpo for crisp countdown/countup feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * target));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="counter-num">
      {display}
      {suffix}
    </span>
  );
}

/**
 * Masked line-by-line text reveal
 */
function MaskedText({ text, baseDelay = 0 }) {
  const words = text.split(" ");
  return (
    <span className="story-mask-wrap">
      {words.map((w, idx) => (
        <span key={idx} className="story-mask-cell">
          <motion.span
            className="story-mask-token"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.65,
              delay: baseDelay + idx * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const metrics = [
  { val: "50", suffix: "+", label: "Years of Horology", detail: "Continuous quartz and digital evolution since 1974." },
  { val: "100", suffix: "M+", label: "Watches Produced", detail: "Worn across 140 countries through five decades." },
  { val: "10", suffix: "M", label: "Drop Benchmark", detail: "Standardized shock dissipation test threshold." },
  { val: "200", suffix: "M", label: "Water Barrier", detail: "Hermetically sealed underwater pressure endurance." },
];

const moments = [
  {
    year: "1946",
    title: "Origins in Mitaka, Tokyo",
    text: "Tadao Kashio establishes Kashio Seisakujo, laying foundational micro-machining and calculating technology.",
  },
  {
    year: "1974",
    title: "The Casiotron Revelation",
    text: "Casio debuts the Casiotron, the world's first digital wristwatch featuring a fully automatic perpetual calendar.",
  },
  {
    year: "1983",
    title: "Birth of the Indestructible",
    text: "Project Team Tough and engineer Kikuo Ibe craft the first G-Shock, rejecting the belief that watches are inherently fragile.",
  },
  {
    year: "1991",
    title: "The Universal Icon",
    text: "The F-91W launches into global ubiquity with its seven-year battery, featherlight footprint, and timeless utilitarian clarity.",
  },
];

export default function Story() {
  const ref = useRef(null);
  // The red line draws itself as you scroll through the timeline.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 80%"],
  });

  return (
    <section id="story" className="section dark story-section">
      <div className="wrap">
        <div className="story-header">
          <div className="section-badge story-badge">CHRONICLE OF INNOVATION</div>
          <h2>How we got here</h2>
          <p className="story-intro">
            From postwar micro-machining in Tokyo to the universal digital wristwatches worn by field scientists, architects, and explorers across the globe.
          </p>
        </div>

        {/* Metric Counters Grid */}
        <div className="story-metrics-grid">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              className="story-metric-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className="metric-number-row">
                <Counter value={m.val} suffix={m.suffix} />
              </div>
              <h4 className="metric-label">{m.label}</h4>
              <p className="metric-detail">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll-Drawn Interactive Timeline */}
        <ol className="timeline story-timeline" ref={ref}>
          <motion.i className="tl-line" style={{ scaleY: scrollYProgress }} />
          {moments.map((item, i) => (
            <motion.li
              key={item.year}
              className="story-milestone-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              {/* Chrono indicator node */}
              <div className="milestone-node" aria-hidden="true">
                <span className="node-ring" />
                <span className="node-dot" />
              </div>

              <div className="milestone-year-header">
                <strong className="milestone-year">
                  <Counter value={item.year} duration={0.9} />
                </strong>
                <span className="milestone-title">{item.title}</span>
              </div>

              <div className="milestone-body">
                <MaskedText text={item.text} baseDelay={i * 0.05} />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
