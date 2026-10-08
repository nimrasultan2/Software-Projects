// Renders one row of the hospital table on the Hospitals page. Same props
// as before (hospital, onClick) — markup changed from a floating card to
// a table row so the network reads like operational software.
export default function HospitalCard({ hospital, onClick }) {
  const h = hospital
  return (
    <tr onClick={onClick}>
      <td>
        <b>{h.name}</b>
        <div className="row-sub">{h.district}</div>
      </td>
      <td className="cell-mono">{h.beds}%</td>
      <td className="cell-mono">{h.icu}%</td>
      <td className="cell-mono">{h.er}%</td>
      <td>
        <span className={`status-text ${h.status}`}>{h.status}</span>
      </td>
    </tr>
  )
}
