import React, { useState, useEffect } from 'react'
import { FiBarChart2, FiTarget } from 'react-icons/fi'

const metrics = [
  { name: 'Accuracy', value: '79.6%', cls: 'high' },
  { name: 'Precision', value: '73.2%', cls: 'high' },
  { name: 'Recall', value: '68.5%', cls: 'mid' },
  { name: 'F1 Score', value: '70.8%', cls: 'high' },
  { name: 'Log Loss', value: '0.52', cls: 'mid' },
  { name: 'AUC-ROC', value: '0.86', cls: 'high' },
]

const models = [
  { name: 'Random Forest', accuracy: 79.6, color: 'red' },
  { name: 'XGBoost', accuracy: 77.2, color: 'green' },
  { name: 'Logistic Regression', accuracy: 72.1, color: 'blue' },
  { name: 'Naive Bayes', accuracy: 68.4, color: 'blue' },
  { name: 'SVM', accuracy: 74.5, color: 'green' },
  { name: 'Decision Tree', accuracy: 71.3, color: 'blue' },
]

export default function Performance() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    const el = document.getElementById('performance')
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section className="section" id="performance">
      <div className="container">
        <span className="section-label"><FiTarget /> Results</span>
        <h2 className="section-title">Model Performance</h2>
        <p className="section-desc">
          Comparative analysis of multiple classifiers. Random Forest achieved 
          the best overall performance on the test set.
        </p>

        <div className="performance-grid">
          <div className="glass-card perf-card">
            <h3><FiBarChart2 /> Model Comparison</h3>
            <div className="progress-bar-container">
              {models.map((m, i) => (
                <div key={i}>
                  <div className="progress-label">
                    <span>{m.name}</span>
                    <span>{m.accuracy}%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${m.color}`}
                      style={{ width: visible ? `${m.accuracy}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card perf-card">
            <h3><FiTarget /> Best Model Metrics</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16, marginTop: -8 }}>
              Random Forest Classifier (n_estimators=300)
            </p>
            {metrics.map((m, i) => (
              <div key={i} className="metric-row">
                <span className="metric-name">{m.name}</span>
                <span className={`metric-value ${m.cls}`}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
