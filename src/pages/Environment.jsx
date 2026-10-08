import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../components/StatCard.jsx'

const tooltipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12 }
const axisTick = { fill: 'var(--faint)', fontSize: 11 }

export default function Environment({ environment }) {
  const e = environment

  return (
    <div className="page">
      <div className="section">
        <div className="section-head">
          <h2>Environment</h2>
        </div>
        <div className="kpi-strip">
          <StatCard label="Air Quality" value={Math.round(e.air)} />
          <StatCard label="Temperature" value={`${e.temp}°C`} />
          <StatCard label="Humidity" value={`${e.humidity}%`} />
          <StatCard label="Wind Speed" value={`${e.wind} km/h`} />
        </div>
      </div>

      <div className="section">
        <div className="grid grid-3">
          <div className="panel panel-pad">
            <div className="panel-title">Noise Level</div>
            <div className="kpi-value">{e.noise} dB</div>
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Pollution Level</div>
            <div className="kpi-value">{e.pollution}%</div>
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Environmental Alert</div>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>
              {e.pollution > 40 ? 'Elevated pollution in industrial sectors.' : 'All environmental readings nominal.'}
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Air Quality Trend</h2>
        </div>
        <div className="panel panel-pad">
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={e.airHistory}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="value" stroke="var(--success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
