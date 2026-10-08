export default function Incidents({ incidents }) {
  return (
    <div className="page">
      <div className="section-head">
        <h2>Incident Log</h2>
      </div>
      <div className="table-wrap panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id}>
                <td className="cell-mono">{i.id}</td>
                <td>{i.type}</td>
                <td>{i.location}</td>
                <td>
                  <span className={`status-text ${i.status === 'resolved' ? 'low' : i.severity}`}>{i.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
