
# FRONTIER-X

> A front-end project & team workspace that brings projects, tasks, and people into a single clear dashboard.

Built entirely with vanilla **HTML, CSS, and JavaScript** — no frameworks, no backend, no build tools.

---

##  About

FRONTIER-X is a single-page application (SPA) that simulates a team productivity workspace. It lets you view projects, manage tasks on a kanban-style board, track team members, and follow activity — all in one place.

Navigation happens entirely client-side via view switching, with no page reloads.

---

##  Features

- **Home / Landing** — Hero section introducing the workspace, with quick entry points into the Dashboard or Projects view.
- **Dashboard** — Command center showing key stats, project progress bars, and a recent activity timeline.
- **Projects** — A list view of all active initiatives with progress tracking.
- **Task Matrix** — Kanban-style task board featuring:
  - Search
  - Status filters (All, Backlog, Active, Review, Completed)
  - Add-task modal for creating new tasks
- **Team** — Grid of team members showing who's working on what.
- **Activity** — Chronological timeline of every change made in the workspace.
- **Navigation** — Sticky navbar with search, dynamically rendered nav links, and a responsive mobile hamburger menu.

---

##  Tech Stack

| Layer   | Technology            |
| ------- | --------------------- |
| Markup  | HTML5                 |
| Styling | CSS3                  |
| Logic   | Vanilla JavaScript    |

> No build tools, no dependencies, no backend. Just open `index.html` in a browser.

---

##  Project Structure

```
frontier-x/
├── index.html          # Main HTML — all views + modal
├── style.css           # All styles
├── script.js           # App logic: rendering, state, navigation
└── assets/
    ├── hero-robots.png
    └── dashboard-hero.jpg
```

---

##  Getting Started

1. **Clone or download** the repository.
2. Ensure `style.css`, `script.js`, and the `assets/` folder are in the same directory as `index.html`.
3. **Open `index.html`** in any modern browser.

No install, no server required.

**Optional — serve locally:**

```bash
# Using Python
python -m http.server

# Or use the VS Code Live Server extension
```

---

## 📌 Status

Personal / portfolio project. **Front-end only** — data is held in JavaScript with no persistence layer.
