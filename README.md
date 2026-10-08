# Veloce

> A cinematic automotive digital experience — built to feel as fast as the machines it showcases.

A visually immersive, scroll-driven landing page for a fictional performance automotive brand. Built with **HTML, CSS, and JavaScript**, powered by **GSAP** for smooth, cinematic animations.

---

##  About

**Veloce** is a single-page, cinematic web experience for a fictional automotive brand. It walks the visitor through a performance narrative — from an animated loading screen, through performance stats and vehicle showcases, to a full-screen closing call to action — all tied together with smooth scroll-triggered animations and a dark, high-contrast aesthetic.

---

##  Features

- **Animated Loading Screen** — Branded preloader with a percentage counter and progress bar.
- **Hero Section** — Full-screen opening with parallax car imagery, glow effects, and a scroll cue.
- **Performance Stats** — Animated counters (0–100, top speed, power, range) that tick up on scroll.
- **Vehicle Showcase** — Three interactive, tilt-enabled vehicle cards with hover shine and specs.
- **Design Section** — Split layout highlighting the design language with layered imagery.
- **Cinematic Gallery** — Staggered, scroll-revealed detail shots in a mixed-size grid.
- **Closing CTA** — Full-bleed experience section with a background image and overlay.
- **Sticky Navbar** — Desktop nav with smooth-scroll anchor links and a mobile hamburger menu.
- **Custom Typography** — Uses `Lobster` from Google Fonts, with a stylized `V/E` wordmark.

---

##  Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Markup    | HTML5                          |
| Styling   | CSS3                           |
| Logic     | Vanilla JavaScript             |
| Animation | GSAP + ScrollTrigger (via CDN) |
| Fonts     | Google Fonts (Lobster)         |

> No build tools or package manager required — GSAP loads from a CDN.

---

##  Project Structure

```
veloce/
├── index.html          # Main HTML — loader, nav, all sections, footer
├── style.css           # All styles
├── script.js           # Loader, animations, menu, counters, tilt
└── assets/
    ├── hero-car.jpg
    ├── car-01.jpg
    ├── car-02.jpg
    ├── car-03.jpg
    ├── gallery-01.jpg
    ├── gallery-02.jpg
    └── gallery-03.jpg
```

---

##  Getting Started

1. **Clone or download** the repository.
2. Ensure `style.css`, `script.js`, and the `assets/` folder sit alongside `index.html`.
3. **Open `index.html`** in a modern browser.

No install or build step required. GSAP is loaded from a CDN, so an internet connection is needed for animations on first load.

**Optional — serve locally:**

```bash
# Using Python
python -m http.server

# Or use the VS Code Live Server extension
```

---

##  How It Works

- **Loader:** On page load, a percentage counter and progress bar animate, then fade the loader out to reveal the hero.
- **Smooth scrolling:** All nav and CTA links use `#anchor` targets for smooth in-page navigation.
- **Scroll animations:** GSAP `ScrollTrigger` reveals `.reveal` elements as they enter the viewport.
- **Animated stats:** Elements with `data-target` count up from `0` to their target value when scrolled into view.
- **Parallax:** The hero image uses a `data-speed` attribute for subtle parallax movement.
- **Tilt cards:** `.tilt-card` vehicle cards respond to mouse movement with a 3D tilt effect and shine.
- **Mobile menu:** `#menuToggle` opens/closes `#mobileMenu` for small screens.

---

##  Status

Personal / portfolio project. **Front-end only** — no backend or data persistence.

---

<p align="center">Veloce — engineered for the next move. 🏁</p>
