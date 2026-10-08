import { useEffect, useState } from 'react'
import './Landing.css'

export default function Landing({ onEnter }) {
  const [loading, setLoading] = useState(true)
  const [population, setPopulation] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const target = 1284921
    const step = target / 40
    let cur = 0
    const timer = setInterval(() => {
      cur += step
      if (cur >= target) {
        cur = target
        clearInterval(timer)
      }
      setPopulation(Math.floor(cur))
    }, 30)
    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <div id="landing-loader">
        <div className="bar">
          <span />
        </div>
        <p>Initializing NEXUS</p>
      </div>
    )
  }

  return (
    <div id="landing">
      <div className="landing-inner">
        <div className="landing-eyebrow">City Operations Platform</div>
        <h1 className="landing-title">NEXUS</h1>
        <p className="landing-sub">One interface. An entire city, live.</p>
        <button className="enter-btn" onClick={onEnter}>
          Enter Command Center
        </button>
        <div className="landing-stats">
          <div className="landing-stat">
            <b>24.7°C</b>
            <span>City Temp</span>
          </div>
          <div className="landing-stat">
            <b>82%</b>
            <span>Air Quality</span>
          </div>
          <div className="landing-stat">
            <b>{population.toLocaleString()}</b>
            <span>Active Citizens</span>
          </div>
          <div className="landing-stat">
            <b>97.4%</b>
            <span>Network Status</span>
          </div>
        </div>
      </div>
    </div>
  )
}
