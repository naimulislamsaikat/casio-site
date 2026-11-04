<div align="center">

# Casio — Watches That Keep Up With You

A cinematic, interactive watch showcase inspired by Casio's iconic design language. Explore a curated collection, inspect model specifications, and discover the engineering story behind the watches.

[**Open the live demo →**](https://naimulislamsaikat.github.io/casio-site/)

</div>

---

## Overview

Casio is a responsive, single-page product experience built with React. It pairs watch-inspired visual design with motion-led storytelling: visitors can browse watch families, open detailed model views, and explore an interactive showcase and timeline.

> This is an independent front-end showcase project, not an official Casio website. It does not provide checkout, account, or backend functionality.

## Highlights

- **Interactive watch collection** with filters for Classic, G-Shock, Edifice, and Pro Trek.
- **Detailed model views** with technical specifications, feature notes, and keyboard-accessible modal controls.
- **Animated hero experience** with a live digital dial and an optional 3D watch presentation on supported desktop devices.
- **Scroll-driven product showcase** with photo and blueprint modes, animated feature callouts, and progress indicator.
- **Brand story and timeline** with animated metrics and historical milestones.
- **Motion-conscious behavior** that respects the user's reduced-motion preference.
- **Responsive presentation** with local watch imagery and CSS-drawn fallback artwork.

## Screenshots

Add your UI screenshots to `screenshots/` in the repository, then replace or uncomment the examples below. Use clear filenames such as `desktop-home.png`, `collection.png`, and `mobile-home.png`.

<!--
### Desktop
![Desktop home page](screenshots/desktop-home.png)

### Watch collection
![Watch collection](screenshots/collection.png)

### Mobile
![Mobile home page](screenshots/mobile-home.png)
-->

## Built with

- [React 18](https://react.dev/) for the component-based interface
- [Vite](https://vite.dev/) for local development and production builds
- [Framer Motion](https://www.framer.com/motion/) for transitions, scroll-linked effects, and shared-element animations
- [Three.js](https://threejs.org/) for the optional 3D hero presentation
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- JavaScript and CSS

## Getting started

### Prerequisites

- Node.js and npm
- Git

### Run locally

```bash
git clone https://github.com/naimulislamsaikat/casio-site.git
cd casio-site
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`; `npm run preview` serves that build locally for verification.

## Deployment

The project is configured for GitHub Pages at `https://naimulislamsaikat.github.io/casio-site/`. The `deploy` script publishes the built `dist/` directory using `gh-pages`:

```bash
npm run deploy
```

The `predeploy` script runs the production build automatically. Make sure GitHub Pages is configured to serve the `gh-pages` branch and that you have permission to publish to the repository.

## Project structure

```text
src/
├── components/   Page sections, watch cards, modals, and visual elements
├── data/         Watch catalogue and collection data
├── hooks/        Reusable clock, scrolling, and pointer interaction hooks
├── styles/       Global styles and responsive layouts
├── App.jsx       Composes the page sections
└── main.jsx      React entry point
public/
└── images/       Product imagery used by the watch catalogue
index.html        HTML document and page metadata
vite.config.js    Vite and GitHub Pages base-path configuration
```

## Customizing the collection

Watch models and collection filters are defined in [`src/data/watches.js`](src/data/watches.js). Update the `lines` array and the watch entries to change the catalogue. Product images are loaded from `public/images/` using each model's `id` (for example, `f91w` maps to `public/images/f91w.jpg`). If an image is unavailable, the interface falls back to CSS watch artwork.

## License

This project is distributed under the [MIT License](LICENSE).

---

<div align="center">

Made by [Naimul Islam](https://github.com/naimulislamsaikat)

</div>
