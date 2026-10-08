import { useState } from 'react'
import './Transport.css'

export default function Transport({ transport }) {
  const [selectedId, setSelectedId] = useState(null)
  const selected = transport.find((t) => t.id === selectedId)

  return (
    <div className="page">
      <div className="section-head">
        <h2>Public Transportation</h2>
      </div>
      <div className="grid grid-2 transport-grid">
        <div className="panel">
          {transport.map((t) => (
            <div key={t.id} className="list-row transport-row" onClick={() => setSelectedId(t.id)}>
              <span className="dot" style={{ background: t.status === 'delayed' ? 'var(--warning)' : 'var(--success)' }} />
              <div className="row-main">
                <div className="row-title">
                  {t.name} · {t.type}
                </div>
                <div className="row-sub">
                  {t.loc} → {t.dest}
                </div>
              </div>
              <span className={`status-text ${t.status === 'delayed' ? 'high' : 'low'}`}>{t.eta}</span>
            </div>
          ))}
        </div>

        <div className="panel panel-pad" id="transport-detail">
          <div className="panel-title">Route Detail</div>
          {!selected && <p className="empty-note">Select a route to view details.</p>}
          {selected && (
            <>
              <div className="detail-row">
                <span>Route</span>
                <b>{selected.name}</b>
              </div>
              <div className="detail-row">
                <span>Type</span>
                <b>{selected.type}</b>
              </div>
              <div className="detail-row">
                <span>Current Location</span>
                <b>{selected.loc}</b>
              </div>
              <div className="detail-row">
                <span>Destination</span>
                <b>{selected.dest}</b>
              </div>
              <div className="detail-row">
                <span>ETA</span>
                <b className="mono">{selected.eta}</b>
              </div>
              <div className="detail-row">
                <span>Delay</span>
                <b>{selected.delay} min</b>
              </div>
              <div className="detail-row" style={{ border: 'none' }}>
                <span>Status</span>
                <span className={`status-text ${selected.status === 'delayed' ? 'high' : 'low'}`}>{selected.status}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
