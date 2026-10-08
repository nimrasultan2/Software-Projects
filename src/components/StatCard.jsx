import './StatCard.css'

// Reused for every compact metric across every page. Renders as one block
// inside a .kpi-strip panel (see index.css) rather than its own floating
// card — several StatCards sit side by side, separated by a thin divider.
export default function StatCard({ label, value, delta }) {
  const isUp = delta && delta.trim().startsWith('+')
  return (
    <div className="kpi-block">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {delta && <span className={`kpi-delta ${isUp ? 'up' : 'down'}`}>{delta}</span>}
    </div>
  )
}
