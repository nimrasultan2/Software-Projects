export default function Settings() {
  return (
    <div className="page">
      <div className="section-head">
        <h2>System Settings</h2>
      </div>
      <div className="grid grid-2">
        <div className="panel panel-pad">
          <div className="panel-title">Appearance</div>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>NEXUS uses a single light theme.</p>
        </div>
        <div className="panel panel-pad">
          <div className="panel-title">Keyboard Shortcuts</div>
          <div className="detail-row">
            <span>Command Palette</span>
            <kbd>Ctrl K</kbd>
          </div>
          <div className="detail-row">
            <span>Global Search</span>
            <kbd>Ctrl /</kbd>
          </div>
          <div className="detail-row" style={{ border: 'none' }}>
            <span>Close Modal / Palette</span>
            <kbd>Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
