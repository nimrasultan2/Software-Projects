function healthColor(v) {
  return v < 50 ? 'var(--critical)' : v < 75 ? 'var(--warning)' : 'var(--success)'
}

export default function Infrastructure({ infrastructure }) {
  return (
    <div className="page">
      <div className="section-head">
        <h2>Infrastructure Monitoring</h2>
      </div>
      <div className="table-wrap panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Location</th>
              <th>Health</th>
              <th>Maintenance</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {infrastructure.map((i) => (
              <tr key={i.id}>
                <td>
                  <b>{i.name}</b>
                  <div className="row-sub">Inspected {i.inspected}</div>
                </td>
                <td>{i.type}</td>
                <td>{i.loc}</td>
                <td style={{ minWidth: 110 }}>
                  <div className="cell-mono" style={{ marginBottom: 4 }}>
                    {i.health}%
                  </div>
                  <div className="progress">
                    <span style={{ width: `${i.health}%`, background: healthColor(i.health) }} />
                  </div>
                </td>
                <td>{i.maintenance}</td>
                <td>
                  <span className={`status-text ${i.priority}`}>{i.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
