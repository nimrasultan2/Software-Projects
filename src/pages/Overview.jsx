import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import StatCard from '../components/StatCard.jsx'
import ActivityFeed from '../components/ActivityFeed.jsx'
import './Overview.css'

function zoneClass(level) {
  return level === 'red' ? 'critical' : level === 'orange' ? 'high' : level === 'yellow' ? 'medium' : 'low'
}

const ENERGY_COLORS = ['var(--primary)', 'var(--warning)', 'var(--success)', 'var(--faint)']
const tooltipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12 }

export default function Overview({ hospitals, incidents, traffic, energy, feed, openModal, closeModal }) {
  const activeIncidents = incidents.filter((i) => i.status === 'active').length

  const energyMix = [
    { name: 'Solar', value: energy.solar },
    { name: 'Wind', value: energy.wind },
    { name: 'Hydro', value: energy.hydro },
    { name: 'Grid', value: energy.grid },
  ]

  const openHospital = (h) => {
    openModal(
      h.name,
      <>
        <div className="detail-row">
          <span>District</span>
          <b>{h.district}</b>
        </div>
        <div className="detail-row">
          <span>Bed Capacity</span>
          <b>{h.beds}%</b>
        </div>
        <div className="detail-row">
          <span>ICU Capacity</span>
          <b>{h.icu}%</b>
        </div>
        <div className="detail-row">
          <span>Emergency Capacity</span>
          <b>{h.er}%</b>
        </div>
        <div className="detail-row" style={{ border: 'none' }}>
          <span>Status</span>
          <span className={`status-text ${h.status}`}>{h.status}</span>
        </div>
      </>,
      [{ label: 'Close', cls: 'ghost', onClick: closeModal }]
    )
  }

  return (
    <div className="page">
      <div className="section">
        <div className="section-head">
          <h2>Overview</h2>
        </div>
        <div className="kpi-strip">
          <StatCard label="Active Incidents" value={activeIncidents} delta="+2 today" />
          <StatCard label="City Energy Load" value={`${energy.load.toFixed(2)} GW`} delta="+3.2%" />
          <StatCard label="Avg Traffic Congestion" value={`${Math.round(traffic.congestion)}%`} delta="-1.4%" />
          <StatCard label="Network Status" value="97.4%" delta="+0.2%" />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>City Snapshot</h2>
        </div>
        <div className="grid grid-2">
          <div className="panel panel-pad">
            <div className="panel-title">Hospital Capacity</div>
            {hospitals.slice(0, 4).map((h) => (
              <div key={h.id} className="list-row hospital-mini" onClick={() => openHospital(h)}>
                <div className="row-main">
                  <div className="row-title">{h.name}</div>
                  <div className="progress">
                    <span
                      style={{
                        width: `${h.beds}%`,
                        background: h.beds > 80 ? 'var(--critical)' : h.beds > 60 ? 'var(--warning)' : 'var(--success)',
                      }}
                    />
                  </div>
                </div>
                <span className="mono mini-pct">{h.beds}%</span>
              </div>
            ))}
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Live Activity</div>
            <ActivityFeed feed={feed} />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Traffic &amp; Energy</h2>
        </div>
        <div className="grid grid-2">
          <div className="panel panel-pad">
            <div className="panel-title">Traffic Zones</div>
            <div className="zone-pills">
              {traffic.zones.map((z, idx) => (
                <span key={idx} className={`status-text ${zoneClass(z.level)} zone-item`}>
                  {z.name} <span className="zone-level">{z.level.toUpperCase()}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Energy Mix</div>
            <div className="chart-wrap small">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={energyMix} dataKey="value" nameKey="name" innerRadius={40} outerRadius={64} paddingAngle={2}>
                    {energyMix.map((entry, idx) => (
                      <Cell key={idx} fill={ENERGY_COLORS[idx % ENERGY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
