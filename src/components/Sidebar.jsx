import * as Icons from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { NAV } from '../data/cityData.js'
import './Sidebar.css'

export default function Sidebar({ page, goTo, sidebarOpen, disaster, toggleDisaster }) {
  return (
    <aside id="sidebar" className={sidebarOpen ? 'open' : ''}>
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <b>NEXUS</b>
          <small>CITY OPS · LIVE</small>
        </div>
      </div>

      <ul id="nav">
        {NAV.map((n) => {
          const Icon = Icons[n.icon]
          return (
            <li key={n.id}>
              <button className={`nav-btn ${page === n.id ? 'active' : ''}`} onClick={() => goTo(n.id)}>
                <span className="nav-ico">{Icon && <Icon size={16} strokeWidth={1.8} />}</span>
                {n.label}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="sidebar-foot">
        <button id="disaster-btn" className={disaster ? 'on' : ''} onClick={toggleDisaster}>
          <AlertTriangle size={14} strokeWidth={1.8} />
          Disaster Mode
        </button>
      </div>
    </aside>
  )
}
