// All simulated city data lives here. Nothing in this file talks to a
// backend or external API — it is the single source of truth that every
// page reads from (and, through App.jsx, occasionally nudges to simulate
// live updates).

export const initialHospitals = [
  { id: 'H1', name: 'Central City Hospital', beds: 87, icu: 92, er: 76, status: 'critical', district: 'Central District' },
  { id: 'H2', name: 'Riverside Medical Center', beds: 63, icu: 71, er: 52, status: 'high', district: 'Central District' },
  { id: 'H3', name: 'Westside General', beds: 58, icu: 83, er: 64, status: 'high', district: 'Riverside' },
  { id: 'H4', name: 'North District Hospital', beds: 41, icu: 38, er: 45, status: 'normal', district: 'West End' },
  { id: 'H5', name: 'Riverside Community Clinic', beds: 35, icu: 29, er: 31, status: 'normal', district: 'Old Town' },
  { id: 'H6', name: 'Airport Trauma Center', beds: 74, icu: 88, er: 81, status: 'critical', district: 'Airport District' },
]

export const initialIncidents = [
  { id: 'INC-241', type: 'Fire', location: 'Central District', severity: 'critical', units: 4, eta: '04:32', status: 'active', route: 'Route 9 → Central District Depot' },
  { id: 'INC-238', type: 'Traffic Collision', location: 'North Junction', severity: 'high', units: 2, eta: '08:21', status: 'active', route: 'Route 3 → North Junction' },
  { id: 'INC-235', type: 'Power Failure', location: 'North Industrial Area', severity: 'medium', units: 1, eta: '12:14', status: 'active', route: 'Grid Crew 2 → North Industrial Area' },
  { id: 'INC-230', type: 'Medical Emergency', location: 'Riverside', severity: 'high', units: 2, eta: '05:40', status: 'active', route: 'Route 1 → Riverside' },
  { id: 'INC-221', type: 'Gas Leak', location: 'West End', severity: 'medium', units: 2, eta: '09:02', status: 'resolved', route: 'Route 5 → West End' },
]

export const initialTraffic = {
  active: 48213,
  avgSpeed: 38,
  congestion: 44,
  accidents: 7,
  zones: [
    { name: 'Old Town', level: 'green' },
    { name: 'Riverside', level: 'yellow' },
    { name: 'Central District', level: 'red' },
    { name: 'University Quarter', level: 'red' },
    { name: 'West End', level: 'orange' },
    { name: 'North Junction', level: 'orange' },
  ],
  volume24h: [
    { label: '00', value: 30 }, { label: '04', value: 22 }, { label: '08', value: 55 },
    { label: '12', value: 80 }, { label: '16', value: 72 }, { label: '20', value: 60 }, { label: '24', value: 48 },
  ],
  speedTrend: [
    { label: '00', value: 52 }, { label: '04', value: 58 }, { label: '08', value: 40 },
    { label: '12', value: 32 }, { label: '16', value: 35 }, { label: '20', value: 42 }, { label: '24', value: 38 },
  ],
}

export const initialEnergy = {
  load: 2.84,
  solar: 28,
  wind: 19,
  hydro: 14,
  grid: 39,
  history: {
    '24H': [2.3, 2.5, 2.8, 3.1, 2.9, 2.6, 2.4, 2.84],
    '7D': [2.6, 2.7, 2.5, 2.9, 3.0, 2.8, 2.84],
    '30D': [2.4, 2.5, 2.6, 2.7, 2.6, 2.8, 2.9, 2.84, 2.7, 2.6],
    '1Y': [2.1, 2.2, 2.4, 2.3, 2.5, 2.6, 2.7, 2.8, 2.75, 2.7, 2.8, 2.84],
  },
}

export const initialEnvironment = {
  air: 78,
  temp: 24.7,
  humidity: 61,
  wind: 14,
  noise: 63,
  pollution: 32,
  airHistory: [
    { label: '-6h', value: 74 }, { label: '-5h', value: 76 }, { label: '-4h', value: 75 },
    { label: '-3h', value: 79 }, { label: '-2h', value: 81 }, { label: '-1h', value: 78 }, { label: 'now', value: 78 },
  ],
}

export const initialTransport = [
  { id: 'T1', name: 'Bus 12', type: 'Bus', loc: '5th & Main', dest: 'Central Station', eta: '4 min', delay: 0, status: 'on-time' },
  { id: 'T2', name: 'Metro Line B', type: 'Metro', loc: 'Central District Stn', dest: 'Harbor Line', eta: '2 min', delay: 6, status: 'delayed' },
  { id: 'T3', name: 'Train 7', type: 'Train', loc: 'North Yard', dest: 'East Terminal', eta: '11 min', delay: 0, status: 'on-time' },
  { id: 'T4', name: 'Bus 44', type: 'Bus', loc: 'North Junction', dest: 'Riverside', eta: '7 min', delay: 3, status: 'delayed' },
  { id: 'T5', name: 'Metro Red', type: 'Metro', loc: 'North Industrial Area', dest: 'Central Loop', eta: '1 min', delay: 0, status: 'on-time' },
]

export const initialInfrastructure = [
  { id: 'I1', type: 'Bridge', name: 'Harbor Bridge', health: 82, maintenance: 'scheduled', inspected: '12 days ago', priority: 'medium', loc: 'Old Town' },
  { id: 'I2', type: 'Road', name: 'Route 9 Overpass', health: 54, maintenance: 'due', inspected: '61 days ago', priority: 'high', loc: 'Central District' },
  { id: 'I3', type: 'Water', name: 'North Industrial Area Main Line', health: 38, maintenance: 'urgent', inspected: '90 days ago', priority: 'critical', loc: 'North Industrial Area' },
  { id: 'I4', type: 'Power', name: 'Substation 6', health: 91, maintenance: 'ok', inspected: '3 days ago', priority: 'low', loc: 'West End' },
  { id: 'I5', type: 'Street Light', name: 'North Junction Grid', health: 67, maintenance: 'scheduled', inspected: '20 days ago', priority: 'medium', loc: 'North Junction' },
]

// Each marker carries a `status` used only to decide whether it shows a
// live pulse on the map: 'critical' and 'active' markers pulse (subtly —
// critical a little stronger), 'normal' markers sit still.
export const mapMarkers = [
  { id: 'm1', type: 'hospital', x: 22, y: 30, label: 'Central City Hospital', status: 'normal' },
  { id: 'm2', type: 'hospital', x: 68, y: 62, label: 'Riverside Medical Center', status: 'normal' },
  { id: 'm3', type: 'ambulance', x: 40, y: 45, label: 'Ambulance 12', status: 'active' },
  { id: 'm4', type: 'police', x: 55, y: 25, label: 'Patrol Unit 4', status: 'normal' },
  { id: 'm5', type: 'fire', x: 75, y: 35, label: 'Fire Unit 2 — Central District', status: 'critical' },
  { id: 'm6', type: 'traffic', x: 33, y: 70, label: 'Collision — North Junction', status: 'critical' },
  { id: 'm7', type: 'transport', x: 60, y: 80, label: 'Metro Line B', status: 'normal' },
  { id: 'm8', type: 'infrastructure', x: 80, y: 60, label: 'North Industrial Area Main Line', status: 'normal' },
  { id: 'm9', type: 'police', x: 15, y: 60, label: 'Patrol Unit 1', status: 'normal' },
  { id: 'm10', type: 'transport', x: 45, y: 20, label: 'Bus 12', status: 'active' },
]

// Marker/category colors reference CSS custom properties so a design
// change only ever needs to happen in index.css.
export const markerColors = {
  hospital: 'var(--muted)',
  ambulance: 'var(--critical)',
  police: 'var(--muted)',
  fire: 'var(--critical)',
  traffic: 'var(--warning)',
  transport: 'var(--success)',
  infrastructure: 'var(--muted)',
}

export const initialAnalytics = {
  kpis: { Efficiency: 87.4, Infrastructure: 92.1, Mobility: 78.6, Network: 94.2 },
  line: [
    { label: 'Mon', value: 62 }, { label: 'Tue', value: 68 }, { label: 'Wed', value: 64 },
    { label: 'Thu', value: 72 }, { label: 'Fri', value: 75 }, { label: 'Sat', value: 71 }, { label: 'Sun', value: 80 },
  ],
  bar: [
    { label: 'Mon', value: 40 }, { label: 'Tue', value: 55 }, { label: 'Wed', value: 48 },
    { label: 'Thu', value: 63 }, { label: 'Fri', value: 58 }, { label: 'Sat', value: 71 }, { label: 'Sun', value: 66 },
  ],
  donut: [
    { name: 'District A', value: 35 }, { name: 'District B', value: 25 },
    { name: 'District C', value: 20 }, { name: 'District D', value: 20 },
  ],
  radar: [
    { subject: 'Traffic', value: 80 }, { subject: 'Energy', value: 65 }, { subject: 'Health', value: 90 },
    { subject: 'Env', value: 72 }, { subject: 'Transit', value: 85 }, { subject: 'Safety', value: 60 },
  ],
}

export const NAV = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'map', label: 'Live Map', icon: 'Map' },
  { id: 'traffic', label: 'Traffic', icon: 'CarFront' },
  { id: 'emergency', label: 'Emergency', icon: 'Siren' },
  { id: 'hospitals', label: 'Hospitals', icon: 'Hospital' },
  { id: 'energy', label: 'Energy', icon: 'Zap' },
  { id: 'environment', label: 'Environment', icon: 'Leaf' },
  { id: 'transport', label: 'Transport', icon: 'BusFront' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'Construction' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'incidents', label: 'Incidents', icon: 'ListChecks' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
]

export const initialNotifications = [
  { id: 1, type: 'critical', title: 'Fire escalation — Central District', time: '2 min ago', read: false },
  { id: 2, type: 'warning', title: 'ICU capacity above 90% — Central City Hospital', time: '6 min ago', read: false },
  { id: 3, type: 'info', title: 'Metro Line B delayed 6 min', time: '12 min ago', read: false },
  { id: 4, type: 'system', title: 'Sensor log archive completed', time: '1 hr ago', read: true },
]

export const FEED_TEMPLATES = [
  () => `Traffic density increased — ${pick(['Old Town', 'University Quarter', 'North Junction'])}`,
  () => `Ambulance dispatched — ${pick(['Central District', 'Riverside', 'North Junction'])}`,
  () => `Power demand increased by ${(Math.random() * 4).toFixed(1)}% — ${pick(['North Industrial Area', 'West End'])}`,
  () => `New traffic incident detected — ${pick(['Riverside', 'West End', 'North Industrial Area'])}`,
  () => `Air quality sensor updated — ${pick(['Old Town', 'Central District'])}`,
  () => `Transit delay resolved — Metro Line B`,
  () => `Road maintenance request opened — West End`,
]

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
