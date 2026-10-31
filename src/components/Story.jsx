import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const moments = [
  ["1946", "Tadao Kashio opens a small workshop in Tokyo."],
  ["1974", "The Casiotron arrives, our first watch with an automatic calendar."],
  ["1983", "Engineer Kikuo Ibe wants a watch that survives a fall. G-Shock is born."],
  ["1991", "The F-91W launches and quietly becomes everyone's favorite digital."],
];

export default function Story() {
  const ref = useRef(null);
  // The red line draws itself as you scroll through the timeline.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 80%"] });
  return (
    <section id="story" className="section dark">
      <div className="wrap">
        <h2>How we got here</h2>
        <ol className="timeline" ref={ref}>
          <motion.i className="tl-line" style={{ scaleY: scrollYProgress }} />
          {moments.map(([year, text], i) => (
            <motion.li key={year} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <strong>{year}</strong><span>{text}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
