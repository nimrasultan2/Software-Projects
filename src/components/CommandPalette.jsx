import { useEffect, useRef, useState } from 'react'
import { NAV } from '../data/cityData.js'
import './CommandPalette.css'

export default function CommandPalette({ open, onClose, goTo }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  if (!open) return null

  const items = NAV.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="overlay-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="panel" id="palette">
        <input
          ref={inputRef}
          id="palette-input"
          placeholder="Type a command or search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div id="palette-list">
          {items.length === 0 && <div className="palette-item">No matches</div>}
          {items.map((n, idx) => (
            <div
              key={n.id}
              className={`palette-item ${idx === 0 ? 'sel' : ''}`}
              onClick={() => {
                goTo(n.id)
                onClose()
              }}
            >
              Open {n.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
