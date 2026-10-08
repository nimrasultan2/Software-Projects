import { X } from 'lucide-react'
import './Modal.css'

export default function Modal({ modal, onClose }) {
  if (!modal) return null
  const { title, body, actions } = modal

  return (
    <div className="overlay-bg center active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="panel" id="detail-modal">
        <div className="panel-head">
          <b>{title}</b>
          <button className="icon-x" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>
        <div id="detail-body">{body}</div>
        {actions && actions.length > 0 && (
          <div id="detail-actions">
            {actions.map((a, idx) => (
              <button key={idx} className={`btn ${a.cls || ''}`} onClick={a.onClick} disabled={a.disabled}>
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
