import React from 'react'
import { FiDatabase } from 'react-icons/fi'

const sampleData = [
  { id: '001', q1: 'What is the step by step guide to invest in share market in India?', q2: 'What is the step by step guide to invest in share market?', label: 'dup' },
  { id: '002', q1: 'What is the story of Kohinoor diamond?', q2: 'What would happen if the Indian subcontinent never existed?', label: 'not-dup' },
  { id: '003', q1: 'How can I increase the speed of my internet?', q2: 'How can I increase the speed of internet on my PC?', label: 'dup' },
  { id: '004', q1: 'Why am I mentally very direct?', q2: 'Why am I such a mentally weak person?', label: 'not-dup' },
  { id: '005', q1: 'Which one dissolve in water quickly sugar, salt or pepper?', q2: 'Which fish would survive in salt water?', label: 'not-dup' },
]

export default function Dataset() {
  return (
    <section className="section" id="dataset">
      <div className="container">
        <span className="section-label"><FiDatabase /> Dataset</span>
        <h2 className="section-title">Kaggle Question Pairs</h2>
        <p className="section-desc">
          The official Quora Question Pairs dataset from the Kaggle competition, 
          featuring 404,290 labeled question pairs.
        </p>

        <div className="dataset-info">
          <div className="glass-card dataset-table">
            <div className="table-header">
              <span>ID</span>
              <span>Question 1</span>
              <span>Question 2</span>
              <span>Label</span>
            </div>
            {sampleData.map((row, i) => (
              <div key={i} className="table-row">
                <span className="row-id">{row.id}</span>
                <span className="row-question">{row.q1}</span>
                <span className="row-question">{row.q2}</span>
                <span className={`row-label ${row.label}`}>
                  {row.label === 'dup' ? 'Duplicate' : 'Unique'}
                </span>
              </div>
            ))}
          </div>

          <div className="dataset-stats">
            <div className="glass-card dataset-stat-card">
              <h4>Total Pairs</h4>
              <div className="stat-big" style={{ color: 'var(--text-primary)' }}>404,290</div>
              <div className="stat-sub">question pairs</div>
            </div>
            <div className="glass-card dataset-stat-card">
              <h4>Duplicate Rate</h4>
              <div className="stat-big" style={{ color: 'var(--danger)' }}>36.9%</div>
              <div className="stat-sub">~149K duplicates</div>
            </div>
            <div className="glass-card dataset-stat-card">
              <h4>Unique Questions</h4>
              <div className="stat-big" style={{ color: 'var(--success)' }}>63.1%</div>
              <div className="stat-sub">~255K unique pairs</div>
            </div>
            <div className="glass-card dataset-stat-card">
              <h4>Source</h4>
              <div className="stat-big" style={{ fontSize: '1.2rem', color: 'var(--accent-light)' }}>Kaggle</div>
              <div className="stat-sub">Quora Competition</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
