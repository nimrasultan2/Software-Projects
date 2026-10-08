import { useRef, useState } from 'react'
import { Plus, Minus, RotateCcw } from 'lucide-react'
import { mapMarkers, markerColors } from '../data/cityData.js'
import './CityMap.css'

const TYPES = Object.keys(markerColors)

export default function CityMap({ onSelectMarker }) {
  const [filters, setFilters] = useState(() => Object.fromEntries(TYPES.map((t) => [t, true])))
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedId, setSelectedId] = useState(null)
  const dragRef = useRef(null)

  const toggleFilter = (t) => setFilters((f) => ({ ...f, [t]: !f[t] }))

  const onMouseDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, startPan: pan }
  }
  const onMouseMove = (e) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    setPan({ x: dragRef.current.startPan.x + dx, y: dragRef.current.startPan.y + dy })
  }
  const onMouseUp = () => {
    dragRef.current = null
  }

  const selectMarker = (m) => {
    setSelectedId(m.id)
    onSelectMarker(m)
  }

  const visibleMarkers = mapMarkers.filter((m) => filters[m.type])

  return (
    <div id="map-wrap">
      <div className="map-filters">
        {TYPES.map((t) => (
          <button
            key={t}
            className={`tag-filter ${filters[t] ? 'active' : ''}`}
            onClick={() => toggleFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="map-controls">
        <button className="icon-btn" onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))} aria-label="Zoom in">
          <Plus size={15} strokeWidth={1.8} />
        </button>
        <button className="icon-btn" onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))} aria-label="Zoom out">
          <Minus size={15} strokeWidth={1.8} />
        </button>
        <button
          className="icon-btn"
          onClick={() => {
            setZoom(1)
            setPan({ x: 0, y: 0 })
          }}
          aria-label="Reset view"
        >
          <RotateCcw size={14} strokeWidth={1.8} />
        </button>
      </div>

      <div
        id="map-canvas"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        {visibleMarkers.map((m) => {
          const isSelected = m.id === selectedId
          const color = isSelected ? 'var(--primary)' : markerColors[m.type]
          return (
            <div
              key={m.id}
              className={`marker ${m.status !== 'normal' ? `pulse-${m.status}` : ''} ${isSelected ? 'selected' : ''}`}
              title={m.label}
              style={{ left: `${m.x}%`, top: `${m.y}%`, background: color, color }}
              onClick={() => selectMarker(m)}
            />
          )
        })}
      </div>

      <div className="map-legend">
        {TYPES.map((t) => (
          <span key={t}>
            <span className="dot" style={{ background: markerColors[t] }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
