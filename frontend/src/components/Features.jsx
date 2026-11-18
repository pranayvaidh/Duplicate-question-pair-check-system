import React from 'react'
import { FiCpu, FiLayers, FiGrid, FiTrendingUp, FiSearch, FiBarChart2 } from 'react-icons/fi'

const features = [
  {
    icon: <FiLayers />,
    color: 'red',
    title: 'Basic Features',
    desc: 'Character count, word count, common words, total words, and word share ratio between question pairs.',
    tag: '7 features',
  },
  {
    icon: <FiSearch />,
    color: 'blue',
    title: 'Token Features',
    desc: 'Common word ratios, stop word overlap, first/last word matching using set intersection analysis.',
    tag: '8 features',
  },
  {
    icon: <FiBarChart2 />,
    color: 'purple',
    title: 'Length Features',
    desc: 'Absolute length difference, average token length, and longest common substring ratio.',
    tag: '3 features',
  },
  {
    icon: <FiTrendingUp />,
    color: 'green',
    title: 'Fuzzy Features',
    desc: 'FuzzyWuzzy metrics — QRatio, partial ratio, token sort ratio, and token set ratio for fuzzy matching.',
    tag: '4 features',
  },
  {
    icon: <FiGrid />,
    color: 'orange',
    title: 'Bag of Words',
    desc: 'CountVectorizer transforms both questions into sparse BoW representations for the classifier.',
    tag: 'BoW vectors',
  },
  {
    icon: <FiCpu />,
    color: 'cyan',
    title: 'Text Preprocessing',
    desc: 'HTML removal, contraction expansion, special character handling, and punctuation stripping.',
    tag: 'NLP pipeline',
  },
]

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <span className="section-label"><FiCpu /> Feature Engineering</span>
        <h2 className="section-title">22+ Engineered Features</h2>
        <p className="section-desc">
          A comprehensive feature engineering pipeline that extracts semantic, 
          syntactic, and statistical signals from question pairs.
        </p>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="glass-card feature-card">
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-tag">{f.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
