import { useEffect, useRef, useState } from 'react'
import './AssistantPanel.css'

// Keyword-matched local responses against current data. This is not a real
// AI model or API call — it is a small function that inspects the message
// and looks up facts from the data already in this app.
function respond(query, { hospitals, incidents, traffic, energy, environment }) {
  const q = query.toLowerCase()

  if (q.includes('icu')) {
    const list = hospitals.filter((h) => h.icu > 80).sort((a, b) => b.icu - a.icu)
    return (
      `${list.length} hospitals match your request.\n` +
      list.map((h) => `${h.name} – ${h.icu}%`).join('\n')
    )
  }
  if (q.includes('incident') || q.includes('emergency')) {
    const active = incidents.filter((i) => i.status === 'active')
    return (
      `${active.length} active incidents right now.\n` +
      active.map((i) => `${i.type} – ${i.location} (${i.severity})`).join('\n')
    )
  }
  if (q.includes('traffic')) {
    return `Congestion is at ${Math.round(traffic.congestion)}%. Average speed ${traffic.avgSpeed} km/h across ${traffic.active.toLocaleString()} active vehicles.`
  }
  if (q.includes('energy') || q.includes('power')) {
    return `Current city load is ${energy.load.toFixed(2)} GW.\nSolar ${energy.solar}% · Wind ${energy.wind}% · Hydro ${energy.hydro}% · Grid ${energy.grid}%`
  }
  if (q.includes('hospital')) {
    return hospitals.map((h) => `${h.name} – beds ${h.beds}%`).join('\n')
  }
  if (q.includes('weather') || q.includes('air')) {
    return `Air quality is ${Math.round(environment.air)}. Temperature ${environment.temp}°C, humidity ${environment.humidity}%.`
  }
  return 'I can help with: hospital ICU capacity, active incidents, traffic conditions, energy load, and environment readings. Try "show hospitals with ICU capacity above 80%".'
}

export default function AssistantPanel({ open, onClose, messages, setMessages, ...data }) {
  const [input, setInput] = useState('')
  const logRef = useRef(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 'intro',
          from: 'bot',
          text: 'Hello. I can help you check hospitals, traffic, energy and active incidents. Ask me about hospitals, traffic, energy or active incidents.',
        },
      ])
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages])

  if (!open) return null

  const send = () => {
    const q = input.trim()
    if (!q) return
    setMessages((m) => [...m, { id: Date.now(), from: 'user', text: q }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: respond(q, data) }])
    }, 300)
  }

  return (
    <div className="side-panel" id="assistant-panel">
      <div className="panel-head">
        <b>Operations Assistant</b>
        <button className="text-btn" onClick={onClose}>
          Close
        </button>
      </div>
      <div id="ai-log" ref={logRef}>
        {messages.map((m) => (
          <div key={m.id} className={`ai-msg ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div id="ai-input-row">
        <input
          type="text"
          placeholder="Ask about hospitals, traffic, energy…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="btn primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  )
}
