import { useEffect, useState } from 'react'
import { Menu, Search, MessageSquareText, Bell } from 'lucide-react'
import './TopBar.css'

export default function TopBar({ pageTitle, onHamburger, onAssistant, onNotifications, unreadCount }) {
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString('en-GB'))

  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB')), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header id="topbar">
      <button className="icon-btn" id="hamburger" onClick={onHamburger} aria-label="Toggle menu">
        <Menu size={18} strokeWidth={1.8} />
      </button>
      <h1 id="page-title">{pageTitle}</h1>

      <div id="search-box">
        <Search size={14} strokeWidth={1.8} />
        <input id="global-search" type="text" placeholder="Search hospitals, incidents, routes…" />
      </div>

      <div className="topbar-right">
        <span className="clock mono">{clock}</span>
        <button className="icon-btn" onClick={onAssistant} title="Operations Assistant">
          <MessageSquareText size={17} strokeWidth={1.8} />
        </button>
        <button className="icon-btn" onClick={onNotifications} title="Notifications">
          <Bell size={17} strokeWidth={1.8} />
          {unreadCount > 0 && <span className="badge-dot">{unreadCount}</span>}
        </button>
      </div>
    </header>
  )
}
