import React from 'react'

const stats = [
  { value: '404,290', label: 'Question Pairs' },
  { value: '22+', label: 'Engineered Features' },
  { value: '~80%', label: 'Model Accuracy' },
  { value: '6', label: 'ML Algorithms Tested' },
]

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
