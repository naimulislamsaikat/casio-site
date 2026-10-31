import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { watches, lines } from "../data/watches.js";
import WatchCard from "./WatchCard.jsx";

export default function Collection() {
  const [line, setLine] = useState("All");
  const shown = watches.filter((w) => line === "All" || w.line === line);

  return (
    <section id="collection" className="section">
      <div className="wrap">
        <h2>Find the one that fits your wrist</h2>
        <div className="chips">
          {lines.map((l) => (
            <button key={l} className={l === line ? "chip on" : "chip"} onClick={() => setLine(l)}>{l}</button>
          ))}
        </div>
        <div className="grid">
          <AnimatePresence mode="popLayout">
            {shown.map((w) => <WatchCard key={w.id} watch={w} />)}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
