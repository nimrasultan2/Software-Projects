import './ActivityFeed.css'

export default function ActivityFeed({ feed }) {
  return (
    <div id="feed">
      {feed.map((f) => (
        <div className="feed-item" key={f.id}>
          <b>{f.time}</b> — {f.text}
        </div>
      ))}
    </div>
  )
}
