import { useState } from 'react'
import HospitalCard from '../components/HospitalCard.jsx'
import './Hospitals.css'

export default function Hospitals({ hospitals, openModal, closeModal }) {
  const [search, setSearch] = useState('')

  const filtered = hospitals.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()))

  const openDetail = (h) => {
    openModal(
      h.name,
      <>
        <div className="detail-row">
          <span>District</span>
          <b>{h.district}</b>
        </div>
        <div className="detail-row">
          <span>Bed Capacity</span>
          <b>{h.beds}%</b>
        </div>
        <div className="detail-row">
          <span>ICU Capacity</span>
          <b>{h.icu}%</b>
        </div>
        <div className="detail-row">
          <span>Emergency Capacity</span>
          <b>{h.er}%</b>
        </div>
        <div className="detail-row" style={{ border: 'none' }}>
          <span>Status</span>
          <span className={`status-text ${h.status}`}>{h.status}</span>
        </div>
      </>,
      [{ label: 'Close', cls: 'ghost', onClick: closeModal }]
    )
  }

  return (
    <div className="page">
      <div className="section-head">
        <h2>Hospital Network</h2>
        <input
          type="text"
          placeholder="Search hospitals…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-note">No hospitals match your search.</p>
      ) : (
        <div className="table-wrap panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Beds</th>
                <th>ICU</th>
                <th>Emergency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <HospitalCard key={h.id} hospital={h} onClick={() => openDetail(h)} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
