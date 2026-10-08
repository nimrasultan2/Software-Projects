import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import StatCard from '../components/StatCard.jsx'

const RANGES = ['24H', '7D', '30D', '1Y']
const ENERGY_COLORS = ['var(--primary)', 'var(--warning)', 'var(--success)', 'var(--faint)']
const tooltipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12 }
const axisTick = { fill: 'var(--faint)', fontSize: 11 }

export default function Energy({ energy }) {
  const [range, setRange] = useState('24H')
  const history = energy.history[range].map((v, i) => ({ label: String(i), value: v }))

  const energyMix = [
    { name: 'Solar', value: energy.solar },
    { name: 'Wind', value: energy.wind },
    { name: 'Hydro', value: energy.hydro },
    { name: 'Grid', value: energy.grid },
  ]

  return (
    <div className="page">
      <div className="section">
        <div className="section-head">
          <h2>Energy</h2>
        </div>
        <div className="kpi-strip">
          <StatCard label="Current Load" value={`${energy.load.toFixed(2)} GW`} />
          <StatCard label="Solar" value={`${energy.solar}%`} delta="+0.4%" />
          <StatCard label="Wind" value={`${energy.wind}%`} />
          <StatCard label="Grid" value={`${energy.grid}%`} />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Historical Consumption</h2>
          <div style={{ display: 'flex', gap: 6 }}>
            {RANGES.map((r) => (
              <button key={r} className={`tag-filter ${range === r ? 'active' : ''}`} onClick={() => setRange(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-2">
          <div className="panel panel-pad">
            <div className="panel-title">Load — Line</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
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
            <div className="panel-title">Load — Bar</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={history}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="var(--warning)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-2" style={{ marginTop: 14 }}>
          <div className="panel panel-pad">
            <div className="panel-title">Source Mix — Donut</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={energyMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {energyMix.map((entry, idx) => (
                      <Cell key={idx} fill={ENERGY_COLORS[idx % ENERGY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Load — Area</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="value" stroke="var(--primary)" fill="var(--primary-light)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
