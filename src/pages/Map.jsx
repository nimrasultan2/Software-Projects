import CityMap from '../components/CityMap.jsx'

export default function MapPage({ openModal, closeModal }) {
  const onSelectMarker = (m) => {
    openModal(
      m.label,
      <>
        <div className="detail-row">
          <span>Type</span>
          <b>{m.type}</b>
        </div>
        <div className="detail-row">
          <span>Marker ID</span>
          <b className="mono">{m.id}</b>
        </div>
        <div className="detail-row">
          <span>Coordinates</span>
          <b>
            {m.x.toFixed(1)}%, {m.y.toFixed(1)}%
          </b>
        </div>
        <div className="detail-row" style={{ border: 'none' }}>
          <span>Status</span>
          <b>Active</b>
        </div>
      </>,
      [{ label: 'Close', cls: 'ghost', onClick: closeModal }]
    )
  }

  return (
    <div className="page">
      <div className="section-head">
        <h2>Live Map</h2>
      </div>
      <CityMap onSelectMarker={onSelectMarker} />
    </div>
  )
}
