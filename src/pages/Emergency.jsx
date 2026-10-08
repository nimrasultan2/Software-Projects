import { useState } from 'react'
import IncidentCard from '../components/IncidentCard.jsx'
import './Emergency.css'

export default function Emergency({ incidents, setIncidents, pushFeed, pushToast }) {
  const [selectedId, setSelectedId] = useState(null)
  const selected = incidents.find((i) => i.id === selectedId)

  const updateIncident = (id, patch) => {
    setIncidents((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  const dispatch = (i) => {
    updateIncident(i.id, { units: i.units + 1 })
    pushToast(`Additional unit dispatched to ${i.location}`, 'warn')
    pushFeed(`Unit dispatched — ${i.location}`)
  }
  const viewRoute = (i) => pushToast(`Route: ${i.route}`)
  const resolve = (i) => {
    updateIncident(i.id, { status: 'resolved' })
    pushToast(`Incident ${i.id} marked resolved`)
    pushFeed(`Incident resolved — ${i.location}`)
  }

  return (
    <div className="page">
      <div className="section">
        <div className="section-head">
          <h2>Active Incidents</h2>
        </div>
        <div className="grid grid-2 emergency-grid">
          <div className="table-wrap panel">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Severity</th>
                  <th>Units</th>
                  <th>ETA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((i) => (
                  <IncidentCard key={i.id} incident={i} active={i.id === selectedId} onClick={() => setSelectedId(i.id)} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel panel-pad" id="incident-detail">
            <div className="panel-title">Incident Detail</div>
            {!selected && <p className="empty-note">Select an incident to view details.</p>}
            {selected && (
              <>
                <div className="detail-row">
                  <span>ID</span>
                  <b className="mono">{selected.id}</b>
                </div>
                <div className="detail-row">
                  <span>Type</span>
                  <b>{selected.type}</b>
                </div>
                <div className="detail-row">
                  <span>Location</span>
                  <b>{selected.location}</b>
                </div>
                <div className="detail-row">
                  <span>Severity</span>
                  <span className={`status-text ${selected.severity}`}>{selected.severity}</span>
                </div>
                <div className="detail-row">
                  <span>Units Dispatched</span>
                  <b>{selected.units}</b>
                </div>
                <div className="detail-row">
                  <span>ETA</span>
                  <b className="mono">{selected.eta}</b>
                </div>
                <div className="detail-row">
                  <span>Route</span>
                  <b style={{ fontSize: 11 }}>{selected.route}</b>
                </div>
                <div className="detail-row" style={{ border: 'none' }}>
                  <span>Status</span>
                  <b>{selected.status}</b>
                </div>
                <div className="incident-actions">
                  <button className="btn primary" onClick={() => dispatch(selected)}>
                    Dispatch
                  </button>
                  <button className="btn" onClick={() => viewRoute(selected)}>
                    View Route
                  </button>
                  <button className="btn danger" disabled={selected.status === 'resolved'} onClick={() => resolve(selected)}>
                    Resolve
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
