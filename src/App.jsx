import { useEffect, useState, useCallback } from 'react'
import Landing from './components/Landing.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Modal from './components/Modal.jsx'
import NotificationPanel from './components/NotificationPanel.jsx'
import AssistantPanel from './components/AssistantPanel.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import Toast from './components/Toast.jsx'

import Overview from './pages/Overview.jsx'
import MapPage from './pages/Map.jsx'
import Traffic from './pages/Traffic.jsx'
import Emergency from './pages/Emergency.jsx'
import Hospitals from './pages/Hospitals.jsx'
import Energy from './pages/Energy.jsx'
import Environment from './pages/Environment.jsx'
import Transport from './pages/Transport.jsx'
import Infrastructure from './pages/Infrastructure.jsx'
import Analytics from './pages/Analytics.jsx'
import Incidents from './pages/Incidents.jsx'
import Settings from './pages/Settings.jsx'

import {
  initialHospitals,
  initialIncidents,
  initialTraffic,
  initialEnergy,
  initialEnvironment,
  initialTransport,
  initialInfrastructure,
  initialAnalytics,
  initialNotifications,
  NAV,
  FEED_TEMPLATES,
  pick,
} from './data/cityData.js'
import { rand, clamp, nowClock } from './utils.js'
import './App.css'

export default function App() {
  const [entered, setEntered] = useState(false)

  const [page, setPage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [notifPanelOpen, setNotifPanelOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState([])
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [modal, setModal] = useState(null) // { title, body, actions }
  const [toasts, setToasts] = useState([])

  const [disaster, setDisaster] = useState(false)

  const [hospitals, setHospitals] = useState(initialHospitals)
  const [incidents, setIncidents] = useState(initialIncidents)
  const [traffic, setTraffic] = useState(initialTraffic)
  const [energy, setEnergy] = useState(initialEnergy)
  const [environment, setEnvironment] = useState(initialEnvironment)
  const [transport] = useState(initialTransport)
  const [infrastructure] = useState(initialInfrastructure)
  const [analytics] = useState(initialAnalytics)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [feed, setFeed] = useState([])

  // ---------------- Toasts ----------------
  const pushToast = useCallback((message, type) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800)
  }, [])

  // ---------------- Modal ----------------
  const openModal = useCallback((title, body, actions) => setModal({ title, body, actions }), [])
  const closeModal = useCallback(() => setModal(null), [])

  // ---------------- Notifications ----------------
  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })))
  const dismissNotif = (id) => setNotifications((n) => n.filter((x) => x.id !== id))
  const readNotif = (id) => setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)))
  const unreadCount = notifications.filter((n) => !n.read).length

  // ---------------- Activity feed ----------------
  const pushFeed = useCallback((text) => {
    setFeed((f) => [{ id: Date.now() + Math.random(), time: nowClock(), text }, ...f].slice(0, 30))
  }, [])
  useEffect(() => {
    for (let i = 0; i < 5; i++) pushFeed(FEED_TEMPLATES[i % FEED_TEMPLATES.length]())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------------- Navigation ----------------
  const goTo = (id) => {
    setPage(id)
    setSidebarOpen(false)
  }

  // ---------------- Disaster mode toggle ----------------
  const toggleDisaster = () => {
    const next = !disaster
    setDisaster(next)
    if (next) {
      setTraffic((t) => ({ ...t, congestion: 81 }))
      setEnergy((e) => ({ ...e, load: 3.9 }))
      setHospitals((hs) =>
        hs.map((h) => {
          const beds = Math.min(99, h.beds + 15)
          return { ...h, beds, status: beds > 85 ? 'critical' : h.status }
        })
      )
      setIncidents((inc) => [
        {
          id: 'INC-DIS',
          type: 'Citywide Grid Failure',
          location: 'Multiple Sectors',
          severity: 'critical',
          units: 9,
          eta: '02:10',
          status: 'active',
          route: 'All units',
        },
        ...inc,
      ])
      setNotifications((n) => [
        { id: Date.now(), type: 'critical', title: 'DISASTER MODE: City-wide emergency declared', time: 'just now', read: false },
        ...n,
      ])
      pushToast('Disaster mode activated — city systems under stress', 'critical')
    } else {
      pushToast('Disaster mode deactivated. Systems stabilizing.')
    }
  }

  // ---------------- Real-time simulation ----------------
  useEffect(() => {
    const id = setInterval(() => {
      setTraffic((t) => ({ ...t, congestion: clamp(t.congestion + rand(-2, 2), 20, 95) }))
      setEnergy((e) => ({ ...e, load: clamp(e.load + rand(-0.05, 0.08), 1.8, 4.2) }))
      setEnvironment((e) => ({ ...e, air: clamp(e.air + rand(-1, 1), 40, 99) }))
      pushFeed(FEED_TEMPLATES[Math.floor(Math.random() * FEED_TEMPLATES.length)]())
      if (Math.random() < 0.15) {
        setNotifications((n) => [
          {
            id: Date.now(),
            type: pick(['info', 'warning']),
            title: pick(['Sensor drift detected — Sector 3', 'New route optimization available', 'District 6 camera offline']),
            time: 'just now',
            read: false,
          },
          ...n,
        ])
      }
    }, 6000)
    return () => clearInterval(id)
  }, [pushFeed])

  // ---------------- Keyboard shortcuts ----------------
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      } else if (e.ctrlKey && e.key === '/') {
        e.preventDefault()
        document.getElementById('global-search')?.focus()
      } else if (e.key === 'Escape') {
        setPaletteOpen(false)
        setModal(null)
        setNotifPanelOpen(false)
        setAssistantOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  if (!entered) {
    return <Landing onEnter={() => setEntered(true)} />
  }

  const pageTitle = NAV.find((n) => n.id === page)?.label || ''

  const pageProps = {
    hospitals, setHospitals,
    incidents, setIncidents,
    traffic, energy, environment, transport, infrastructure, analytics,
    feed, pushFeed,
    openModal, closeModal,
    pushToast,
    disaster,
  }

  const renderPage = () => {
    switch (page) {
      case 'overview': return <Overview {...pageProps} />
      case 'map': return <MapPage {...pageProps} />
      case 'traffic': return <Traffic {...pageProps} />
      case 'emergency': return <Emergency {...pageProps} />
      case 'hospitals': return <Hospitals {...pageProps} />
      case 'energy': return <Energy {...pageProps} />
      case 'environment': return <Environment {...pageProps} />
      case 'transport': return <Transport {...pageProps} />
      case 'infrastructure': return <Infrastructure {...pageProps} />
      case 'analytics': return <Analytics {...pageProps} />
      case 'incidents': return <Incidents {...pageProps} />
      case 'settings': return <Settings {...pageProps} />
      default: return null
    }
  }

  return (
    <div id="app-shell" className={disaster ? 'disaster' : ''}>
      <Sidebar
        page={page}
        goTo={goTo}
        sidebarOpen={sidebarOpen}
        disaster={disaster}
        toggleDisaster={toggleDisaster}
      />

      <div id="main-col">
        {disaster && (
          <div id="disaster-banner">
            City-wide emergency protocol active — Disaster Mode engaged
          </div>
        )}

        <TopBar
          pageTitle={pageTitle}
          onHamburger={() => setSidebarOpen((v) => !v)}
          onAssistant={() => {
            setAssistantOpen((v) => !v)
            setNotifPanelOpen(false)
          }}
          onNotifications={() => {
            setNotifPanelOpen((v) => !v)
            setAssistantOpen(false)
          }}
          unreadCount={unreadCount}
        />

        <main id="page-content">{renderPage()}</main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} goTo={goTo} />

      <NotificationPanel
        open={notifPanelOpen}
        notifications={notifications}
        onMarkAllRead={markAllRead}
        onDismiss={dismissNotif}
        onRead={readNotif}
      />

      <AssistantPanel
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        messages={aiMessages}
        setMessages={setAiMessages}
        hospitals={hospitals}
        incidents={incidents}
        traffic={traffic}
        energy={energy}
        environment={environment}
      />

      <Modal modal={modal} onClose={closeModal} />

      <div id="toasts">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} />
        ))}
      </div>
    </div>
  )
}
