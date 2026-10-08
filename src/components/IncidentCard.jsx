// Renders one row of the incident table on the Emergency page. Keeps the
// same props/behavior as before (incident, active, onClick) — only the
// markup changed, from a floating card to a table row.
export function severityColor(s) {
  return s === 'critical' ? 'var(--critical)' : s === 'high' ? 'var(--warning)' : 'var(--primary)'
}

export default function IncidentCard({ incident, active, onClick }) {
  const i = incident
  return (
    <tr className={active ? 'selected' : ''} onClick={onClick}>
      <td className="cell-mono">{i.id}</td>
      <td>{i.type}</td>
      <td>{i.location}</td>
      <td>
        <span className={`status-text ${i.severity}`}>{i.severity}</span>
      </td>
      <td>{i.units}</td>
      <td className="cell-mono">{i.eta}</td>
      <td>
        <span className={`status-text ${i.status === 'resolved' ? 'low' : i.severity}`}>{i.status}</span>
      </td>
    </tr>
  )
}
