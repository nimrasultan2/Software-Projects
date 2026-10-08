import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import StatCard from '../components/StatCard.jsx'

const DONUT_COLORS = ['var(--primary)', 'var(--warning)', 'var(--success)', 'var(--faint)']
const tooltipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12 }
const axisTick = { fill: 'var(--faint)', fontSize: 11 }

export default function Analytics({ analytics }) {
  const { kpis, line, bar, donut, radar } = analytics

  return (
    <div className="page">
      <div className="section">
        <div className="section-head">
          <h2>Analytics</h2>
        </div>
        <div className="kpi-strip">
          {Object.entries(kpis).map(([label, v]) => (
            <StatCard key={label} label={label} value={`${v}%`} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="grid grid-2">
          <div className="panel panel-pad">
            <div className="panel-title">Trend — Line</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={line}>
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
            <div className="panel-title">Comparison — Bar</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bar}>
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
            <div className="panel-title">Distribution — Donut</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donut} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {donut.map((entry, idx) => (
                      <Cell key={idx} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="panel panel-pad">
            <div className="panel-title">Service Radar</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={axisTick} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.18} strokeWidth={2} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
