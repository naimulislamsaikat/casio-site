// Edit this file to add or change watches. Everything on the page reads from here.
export const lines = ["All", "Classic", "G-Shock", "Edifice", "Pro Trek"];

const base = [
  { id: "f91w", line: "Classic", name: "F-91W", shape: "square", digits: "10:08",
    body: "#2b2f29", face: "#c3cda6", strap: "#3a3f37",
    tagline: "The 1991 digital that never left.",
    facts: ["Light resin case and strap", "Daily alarm and hourly chime", "Battery that lasts for years"] },
  { id: "a168", line: "Classic", name: "A168", shape: "square", digits: "07:30",
    body: "#c9ccc2", face: "#b9c49a", strap: "#aeb2a6",
    tagline: "Retro metal, easy on the wrist.",
    facts: ["Stainless steel look", "Backlight for night reading", "Stopwatch and alarm"] },
  { id: "ga2100", line: "G-Shock", name: "GA-2100", shape: "octagon", digits: "12:00",
    body: "#1f2420", face: "#aab58f", strap: "#2d332d",
    tagline: "Slim, octagonal, still shock resistant.",
    facts: ["Carbon core guard case", "Shock resistant build", "Water resistant"] },
  { id: "dw5600", line: "G-Shock", name: "DW-5600", shape: "square", digits: "06:45",
    body: "#e0261b", face: "#c3cda6", strap: "#b81e15",
    tagline: "Square-faced, straight from the original family.",
    facts: ["Classic square G-Shock shape", "Shock resistant", "World time and stopwatch"] },
  { id: "edifice", line: "Edifice", name: "Edifice Chronograph", shape: "round", digits: "",
    body: "#9aa3a8", face: "#1d2a35", strap: "#2a343c",
    tagline: "Sharp enough for the office, quick enough for the track.",
    facts: ["Analog chronograph dials", "Steel case", "Made for racing fans"] },
  { id: "protrek", line: "Pro Trek", name: "Pro Trek Outdoor", shape: "round", digits: "",
    body: "#4f5d44", face: "#222820", strap: "#3b4632",
    tagline: "Built for trailheads and bad weather.",
    facts: ["Outdoor sensor features", "Tough, water resistant case", "Easy to read in sunlight"] },
];

// Drop photos into public/images named after each id (f91w.jpg, ga2100.jpg ...).
// Missing files fall back to the CSS illustration automatically.
export const watches = base.map((w) => ({ ...w, image: `/images/${w.id}.jpg` }));
