# NEXUS — City Operations Dashboard

A frontend-only, simulated urban operations dashboard built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Project structure

- `src/data/cityData.js` — all simulated city data (hospitals, incidents, traffic, energy, environment, transport, infrastructure, map markers, analytics). Edit this to change what the dashboard shows.
- `src/App.jsx` — top-level state (current page, theme, selections, notifications, disaster mode) and the real-time simulation interval. This is the "brain" of the app; everything else receives data through props.
- `src/components/` — reusable pieces used across pages (Sidebar, TopBar, StatCard, CityMap, Modal, NotificationPanel, CommandPalette, AssistantPanel, Toast, ActivityFeed, HospitalCard, IncidentCard, Landing).
- `src/pages/` — one component per navigation destination (Overview, Traffic, Emergency, Hospitals, Energy, Environment, Transport, Infrastructure, Analytics, Incidents, Settings, Map).

## How to explain it in a meeting

- "`App.jsx` holds all the state with `useState` — which page is active, what's selected, whether disaster mode is on — and passes it down as props."
- "Each page in `pages/` is just a function that receives data and renders it. No page talks to another page directly."
- "`StatCard` is one small reusable component used for every KPI number across every page."
- "The `useEffect` with `setInterval` in `App.jsx` simulates live data — it nudges traffic, energy and air quality numbers every few seconds and pushes new activity feed lines."
- "Nothing calls a real backend. All the data lives in `src/data/cityData.js` and is only ever mutated through `setState`."

## Notes

- Charts use Recharts (declarative React charts, no manual canvas lifecycle to manage).
- Icons use lucide-react.
- The Operations Assistant is a keyword-matching function against local data — it is not a real AI model or API call.
- NEXUS uses a single light theme (maroon accent, `#7A263A`). There is no dark mode and no theme toggle.
- Hospitals, incidents, and infrastructure are shown as data tables rather than card grids — see `src/index.css` for the shared `.data-table`, `.panel`, `.section` and `.kpi-strip` classes that make up the design system.
