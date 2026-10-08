# NEXUS — City Operations Dashboard

> A frontend-only, simulated urban operations dashboard for monitoring and managing a fictional city.

Built with **React + Vite** — no backend, no API calls, just simulated data and clean component architecture.

---

##  About

**NEXUS** is a frontend-only urban operations dashboard that simulates the command center of a city. It displays live-ish data across multiple domains — traffic, emergencies, hospitals, energy, environment, transport, and infrastructure — and lets you monitor, filter, and react to changes in real time.

All data is simulated locally. Nothing calls a real backend.

---

##  Features

- **Multi-page navigation** — Overview, Traffic, Emergency, Hospitals, Energy, Environment, Transport, Infrastructure, Analytics, Incidents, Settings, and a full Map view.
- **Real-time simulation** — Traffic, energy, and air quality numbers update every few seconds via `setInterval`, with new activity feed lines pushed automatically.
- **Disaster mode** — A toggleable state that changes how the dashboard behaves.
- **Command palette** — Quick navigation and actions.
- **Operations Assistant** — A keyword-matching helper against local data.
- **Notifications & toasts** — Live alerts surfaced through a notification panel.
- **Reusable design system** — Shared `.data-table`, `.panel`, `.section`, and `.kpi-strip` classes power a consistent layout.
- **Charts** — Declarative charts via Recharts.

---

##  Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | React                          |
| Build Tool | Vite                           |
| Charts     | Recharts                       |
| Icons      | lucide-react                   |
| Styling    | CSS (`src/index.css`)          |
| Data       | Local simulated data (no API)  |

---

##  Project Structure

```
nexus/
├── src/
│   ├── data/
│   │   └── cityData.js        # All simulated city data
│   ├── components/            # Reusable UI pieces
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── StatCard.jsx
│   │   ├── CityMap.jsx
│   │   ├── Modal.jsx
│   │   ├── NotificationPanel.jsx
│   │   ├── CommandPalette.jsx
│   │   ├── AssistantPanel.jsx
│   │   ├── Toast.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── HospitalCard.jsx
│   │   ├── IncidentCard.jsx
│   │   └── Landing.jsx
│   ├── pages/                 # One component per navigation destination
│   │   ├── Overview.jsx
│   │   ├── Traffic.jsx
│   │   ├── Emergency.jsx
│   │   ├── Hospitals.jsx
│   │   ├── Energy.jsx
│   │   ├── Environment.jsx
│   │   ├── Transport.jsx
│   │   ├── Infrastructure.jsx
│   │   ├── Analytics.jsx
│   │   ├── Incidents.jsx
│   │   ├── Settings.jsx
│   │   └── Map.jsx
│   ├── App.jsx                # Top-level state + simulation interval
│   ├── main.jsx
│   └── index.css              # Design system (data-table, panel, section, kpi-strip)
├── index.html
├── package.json
└── vite.config.js
```

---

##  Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually <http://localhost:5173>).

---

##  How It Works

- **`src/data/cityData.js`** — All simulated city data (hospitals, incidents, traffic, energy, environment, transport, infrastructure, map markers, analytics). Edit this to change what the dashboard shows.
- **`src/App.jsx`** — Top-level state (current page, theme, selections, notifications, disaster mode) and the real-time simulation interval. This is the **brain** of the app; everything else receives data through props.
- **`src/components/`** — Reusable pieces used across pages (Sidebar, TopBar, StatCard, CityMap, Modal, NotificationPanel, CommandPalette, AssistantPanel, Toast, ActivityFeed, HospitalCard, IncidentCard, Landing).
- **`src/pages/`** — One component per navigation destination. Each page is just a function that receives data and renders it — no page talks to another page directly.

---

##  Explaining It in a Meeting

- "`App.jsx` holds all the state with `useState` — which page is active, what's selected, whether disaster mode is on — and passes it down as props."
- "Each page in `pages/` is just a function that receives data and renders it. No page talks to another page directly."
- "`StatCard` is one small reusable component used for every KPI number across every page."
- "The `useEffect` with `setInterval` in `App.jsx` simulates live data — it nudges traffic, energy and air quality numbers every few seconds and pushes new activity feed lines."
- "Nothing calls a real backend. All the data lives in `src/data/cityData.js` and is only ever mutated through `setState`."

---

##  Notes

- Charts use **Recharts** (declarative React charts, no manual canvas lifecycle to manage).
- Icons use **lucide-react**.
- The **Operations Assistant** is a keyword-matching function against local data — it is **not** a real AI model or API call.
- NEXUS uses a **single light theme** (maroon accent, `#7A263A`). There is no dark mode and no theme toggle.
- Hospitals, incidents, and infrastructure are shown as **data tables** rather than card grids — see `src/index.css` for the shared `.data-table`, `.panel`, `.section`, and `.kpi-strip` classes that make up the design system.

---

##  Status

Personal / portfolio project. **Frontend only** — all data is simulated locally with no persistence layer.
