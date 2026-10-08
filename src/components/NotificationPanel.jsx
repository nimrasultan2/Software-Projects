import { X } from 'lucide-react'
import './NotificationPanel.css'

function dotColor(type) {
  if (type === 'critical') return 'var(--critical)'
  if (type === 'warning') return 'var(--warning)'
  if (type === 'info') return 'var(--primary)'
  return 'var(--faint)'
}

export default function NotificationPanel({ open, notifications, onMarkAllRead, onDismiss, onRead }) {
  if (!open) return null
  return (
    <div className="side-panel" id="notif-panel">
      <div className="panel-head">
        <b>Notifications</b>
        <button className="text-btn" onClick={onMarkAllRead}>
          Mark all read
        </button>
      </div>
      <div id="notif-list">
        {notifications.length === 0 && <p className="empty-note" style={{ padding: 14 }}>No notifications.</p>}
        {notifications.map((n) => (
          <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`} onClick={() => onRead(n.id)}>
            <span className="dot" style={{ background: dotColor(n.type), marginTop: 4 }} />
            <div className="notif-body">
              <span>{n.title}</span>
              <small>{n.time}</small>
            </div>
            <button
              className="notif-close"
              onClick={(e) => {
                e.stopPropagation()
                onDismiss(n.id)
              }}
              aria-label="Dismiss"
            >
              <X size={13} strokeWidth={1.8} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
