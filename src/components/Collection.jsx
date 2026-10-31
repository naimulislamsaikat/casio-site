import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { watches, lines } from "../data/watches.js";
import WatchCard from "./WatchCard.jsx";
import WatchModal from "./WatchModal.jsx";
import Magnetic from "./Magnetic.jsx";

export default function Collection() {
  const [line, setLine] = useState("All");
  const [selectedWatch, setSelectedWatch] = useState(null);
  const shown = watches.filter((w) => line === "All" || w.line === line);

  return (
    <section id="collection" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="section-badge">CURATED EDITIONS</div>
          <h2>Find the one that fits your wrist</h2>
          <p className="section-intro">
            From vintage resin classics to ultra-shock titanium architectures. Click any model to inspect full horological specifications.
          </p>
        </div>

        <div className="chips" role="tablist" aria-label="Watch Collections">
          {lines.map((l) => (
            <Magnetic key={l} strength={0.25}>
              <button
                className={l === line ? "chip on" : "chip"}
                onClick={() => setLine(l)}
                role="tab"
                aria-selected={l === line}
              >
                {l}
              </button>
            </Magnetic>
          ))}
        </div>

        <div className="grid">
          <AnimatePresence mode="popLayout">
            {shown.map((w, index) => (
              <WatchCard
                key={w.id}
                watch={w}
                index={index}
                onSelect={(watch) => setSelectedWatch(watch)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded Shared-Element Modal */}
      <AnimatePresence>
        {selectedWatch && (
          <WatchModal
            watch={selectedWatch}
            onClose={() => setSelectedWatch(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
