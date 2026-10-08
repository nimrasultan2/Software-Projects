import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../components/StatCard.jsx'

function zoneClass(level) {
  return level === 'red' ? 'critical' : level === 'orange' ? 'high' : level === 'yellow' ? 'medium' : 'low'
}

const tooltipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12 }
const axisTick = { fill: 'var(--faint)', fontSize: 11 }

export default function Traffic({ traffic }) {
  return (
    <div className="page">
      <div className="section">
        <div className="section-head">
          <h2>Traffic</h2>
        </div>
        <div className="kpi-strip">
          <StatCard label="Active Vehicles" value={traffic.active.toLocaleString()} />
          <StatCard label="Average Speed" value={`${traffic.avgSpeed} km/h`} />
          <StatCard label="Congestion" value={`${Math.round(traffic.congestion)}%`} delta="+1.1%" />
          <StatCard label="Accidents Today" value={traffic.accidents} delta="-2" />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Traffic Analytics</h2>
        </div>
        <div className="grid grid-2">
          <div className="panel panel-pad">
            <div className="panel-title">Traffic Volume (24H)</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={traffic.volume24h}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Average Speed Trend</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={traffic.speedTrend}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="value" stroke="var(--warning)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Zone Status</h2>
        </div>
        <div className="table-wrap panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Congestion Level</th>
              </tr>
            </thead>
            <tbody>
              {traffic.zones.map((z, idx) => (
                <tr key={idx}>
                  <td>{z.name}</td>
                  <td>
                    <span className={`status-text ${zoneClass(z.level)}`}>{z.level.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
