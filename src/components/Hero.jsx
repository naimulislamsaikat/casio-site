import { motion } from "framer-motion";
import DigitalWatch from "./DigitalWatch.jsx";
import useTilt from "../hooks/useTilt.js";

const START = 1.2; // wait for the preloader curtain
const ease = [0.2, 0.7, 0.2, 1];
const item = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: START + 0.15 * i, duration: 0.7, ease },
});
const words = "Watches that keep up with your real life.".split(" ");

export default function Hero() {
  const tilt = useTilt(10);
  return (
    <section id="top" className="hero">
      <div className="wrap hero-in">
        <div>
          <h1>
            {words.map((w, i) => (
              <span className="mask" key={i}>
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: START + i * 0.08, duration: 0.8, ease }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...item(3)}>
            We have been making watches since 1974. Some of them survive drops, rain and
            long weeks, and some just look good with a shirt. Take a look around.
          </motion.p>
          <motion.a className="btn" href="#collection" {...item(4)}>Browse the collection</motion.a>
        </div>
        <motion.div {...item(2)}>
          <motion.div {...tilt}><DigitalWatch /></motion.div>
          <p className="hint">That clock is live. Move your mouse over it, then try the light button.</p>
        </motion.div>
      </div>
    </section>
  );
}
