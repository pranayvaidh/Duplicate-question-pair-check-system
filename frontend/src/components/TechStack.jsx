import React from 'react'
import { FiCode } from 'react-icons/fi'

const techs = [
  { emoji: '🐍', name: 'Python', desc: 'Core language' },
  { emoji: '📊', name: 'Pandas', desc: 'Data processing' },
  { emoji: '🔢', name: 'NumPy', desc: 'Numerical ops' },
  { emoji: '🌲', name: 'scikit-learn', desc: 'ML framework' },
  { emoji: '🔤', name: 'FuzzyWuzzy', desc: 'Fuzzy matching' },
  { emoji: '🧹', name: 'BeautifulSoup', desc: 'HTML parsing' },
  { emoji: '📈', name: 'Matplotlib', desc: 'Visualization' },
  { emoji: '🎨', name: 'Seaborn', desc: 'Statistical plots' },
  { emoji: '🚀', name: 'Streamlit', desc: 'Web deployment' },
  { emoji: '💾', name: 'Pickle', desc: 'Serialization' },
  { emoji: '📦', name: 'CountVectorizer', desc: 'BoW encoding' },
  { emoji: '⚛️', name: 'React', desc: 'Frontend UI' },
]

export default function TechStack() {
  return (
    <section className="section" id="tech">
      <div className="container">
        <span className="section-label"><FiCode /> Stack</span>
        <h2 className="section-title">Technology Stack</h2>
        <p className="section-desc">
          Built with industry-standard tools for NLP, machine learning, and web deployment.
        </p>

        <div className="tech-grid">
          {techs.map((t, i) => (
            <div key={i} className="glass-card tech-item">
              <span className="tech-emoji">{t.emoji}</span>
              <h4>{t.name}</h4>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
