# Casio Showcase Site

A polished React + Vite showcase for Casio watch lines, built to feel premium, editorial, and cinematic while keeping the content easy to update.

## Features
- Curated product collection for Classic, G-Shock, Edifice, and Pro Trek models
- Interactive filter chips and animated watch cards
- Shared-element product modal with technical specifications
- Responsive layout with strong editorial typography and motion design
- Photo-first presentation with graceful CSS fallback when no branded image is available

## Getting started

```bash
npm install
npm run dev
```

Open the local Vite URL in your browser to view the site.

## Project structure

- `src/data/watches.js`: manage the watch catalog and metadata
- `src/components/`: one component per section or UI pattern
- `src/styles/global.css`: global styling, color tokens, and theme variables
- `public/images/`: licensed watch photography or your own reference shots

## Adding or editing watches

All collection content is driven from `src/data/watches.js`.

Example entry:

```js
{
  id: "f91w",
  line: "Classic",
  name: "F-91W",
  shape: "square",
  digits: "10:08",
  body: "#2b2f29",
  face: "#c3cda6",
  strap: "#3a3f37",
  tagline: "The 1991 digital that never left.",
  facts: [
    "Featherweight 21g resin case and flexible strap",
    "Daily alarm, hourly chime & 1/100s stopwatch",
    "7-year ultra-low drain lithium cell"
  ],
  caliber: "Module 593 Digital Quartz",
  accuracy: "±30 Seconds / Month",
  caseStructure: "Ultralight Resin (38.2 × 35.2 × 8.5 mm)",
  waterResist: "Water Resistant (Splash / Rain Standard)",
  batteryLife: "7-Year Lithium (CR2016)",
  releaseYear: "1989 / 1991 Tokyo Heritage",
  weight: "21g",
  snapshots: [
    "/images/f91w.jpg",
    "/images/f91w-detail.jpg"
  ]
}
```

Notes:
- `id` is the model slug and is used for the main image path.
- `image` is generated automatically from the `id` if a matching file exists.
- `snapshots` is optional and can be used to add extra reference photos or detail shots.
- If a file is missing, the site falls back to its CSS-generated watch illustration.

## Photos and snapshots

Place licensed photography in `public/images/` using the watch id as the filename:

- `f91w.jpg`
- `a168.jpg`
- `ga2100.jpg`
- `dw5600.jpg`
- `edifice.jpg`
- `protrek.jpg`

For additional product shots or detail views, add them to the `snapshots` array for that watch, for example:

```js
snapshots: [
  "/images/f91w.jpg",
  "/images/f91w-side.jpg",
  "/images/f91w-detail.jpg"
]
```

Use official Casio press/media assets or your own photography. Missing or broken files will automatically fall back to the illustration.

## Recommended workflow

1. Add or update watch data in `src/data/watches.js`
2. Add matching images to `public/images/`
3. Use `snapshots` for alternate angles or close-up details
4. Run the app locally and refine content visually

## License and asset guidance

Use only licensed or properly owned imagery. For public-facing product showcases, prefer official Casio media releases or your own authored photography when possible.
