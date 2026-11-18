import React, { useState } from 'react'
import { FiArrowRight, FiZap } from 'react-icons/fi'

const STOP_WORDS = new Set([
  'i','me','my','myself','we','our','ours','ourselves','you','your','yours',
  'yourself','yourselves','he','him','his','himself','she','her','hers',
  'herself','it','its','itself','they','them','their','theirs','themselves',
  'what','which','who','whom','this','that','these','those','am','is','are',
  'was','were','be','been','being','have','has','had','having','do','does',
  'did','doing','a','an','the','and','but','if','or','because','as','until',
  'while','of','at','by','for','with','about','against','between','through',
  'during','before','after','above','below','to','from','up','down','in',
  'out','on','off','over','under','again','further','then','once','here',
  'there','when','where','why','how','all','both','each','few','more','most',
  'other','some','such','no','nor','not','only','own','same','so','than',
  'too','very','s','t','can','will','just','don','should','now','d','ll',
  'm','o','re','ve','y','ain','aren','couldn','didn','doesn','hadn','hasn',
  'haven','isn','ma','mightn','mustn','needn','shan','shouldn','wasn',
  'weren','won','wouldn',
])

function computeSimilarity(q1, q2) {
  const normalize = (q) => q.toLowerCase().replace(/[^\w\s]/g, '').trim()
  const n1 = normalize(q1)
  const n2 = normalize(q2)

  const tokens1 = n1.split(/\s+/).filter(Boolean)
  const tokens2 = n2.split(/\s+/).filter(Boolean)

  if (tokens1.length === 0 || tokens2.length === 0) return false

  // Content words (non-stop-words)
  const content1 = new Set(tokens1.filter(w => !STOP_WORDS.has(w)))
  const content2 = new Set(tokens2.filter(w => !STOP_WORDS.has(w)))

  // All tokens as sets
  const set1 = new Set(tokens1)
  const set2 = new Set(tokens2)

  // 1. Content word overlap (most important signal)
  const commonContent = [...content1].filter(w => content2.has(w))
  const minContent = Math.min(content1.size, content2.size) || 1
  const maxContent = Math.max(content1.size, content2.size) || 1
  const contentOverlapMin = commonContent.length / minContent   // high if smaller set is covered
  const contentOverlapMax = commonContent.length / maxContent   // high if larger set is covered

  // 2. All-token Jaccard
  const commonAll = [...set1].filter(w => set2.has(w))
  const union = new Set([...set1, ...set2])
  const jaccard = commonAll.length / union.size

  // 3. Bigram overlap (captures word-pair similarity)
  const bigrams = (tokens) => {
    const bg = new Set()
    for (let i = 0; i < tokens.length - 1; i++) bg.add(tokens[i] + ' ' + tokens[i + 1])
    return bg
  }
  const bg1 = bigrams(tokens1)
  const bg2 = bigrams(tokens2)
  const commonBg = [...bg1].filter(b => bg2.has(b))
  const bigramSim = (bg1.size + bg2.size) > 0 ? (2 * commonBg.length) / (bg1.size + bg2.size) : 0

  // 4. Length similarity
  const lenRatio = Math.min(tokens1.length, tokens2.length) / Math.max(tokens1.length, tokens2.length)

  // 5. First/last word match
  const firstMatch = tokens1[0] === tokens2[0] ? 0.1 : 0
  const lastMatch = tokens1[tokens1.length - 1] === tokens2[tokens2.length - 1] ? 0.15 : 0

  // Combined weighted score
  const score =
    contentOverlapMin * 0.30 +
    contentOverlapMax * 0.20 +
    jaccard * 0.10 +
    bigramSim * 0.10 +
    lenRatio * 0.05 +
    firstMatch +
    lastMatch

  return score >= 0.28
}

const EXAMPLE_PAIRS = [
  { q1: "How can I be a good geologist?", q2: "What should I do to be a great geologist?", expected: 'duplicate' },
  { q1: "What is the meaning of life?", q2: "How do I make a pizza?", expected: 'not-duplicate' },
]

export default function Hero() {
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    if (!q1.trim() || !q2.trim()) return
    setLoading(true)
    setResult(null)

    // Simulate ML prediction (frontend-only demo)
    setTimeout(() => {
      setResult(computeSimilarity(q1, q2) ? 'duplicate' : 'not-duplicate')
      setLoading(false)
    }, 1200)
  }

  const loadExample = (pair) => {
    setQ1(pair.q1)
    setQ2(pair.q2)
    setResult(null)
  }

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            NLP • Machine Learning • Kaggle
          </div>

          <h1>
            Detect <span className="gradient-text">Duplicate</span> Questions with AI
          </h1>

          <p>
            An advanced NLP system that uses machine learning to determine whether 
            two Quora questions are semantically identical — powered by feature engineering, 
            fuzzy matching, and Random Forest classification.
          </p>

          <div className="hero-actions">
            <a href="#playground" className="btn btn-primary">
              <FiZap /> Try the Demo
            </a>
            <a href="#about" className="btn btn-secondary">
              Learn More <FiArrowRight />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="demo-header">
              <span className="demo-dot red"></span>
              <span className="demo-dot yellow"></span>
              <span className="demo-dot green"></span>
              <span className="demo-label">live demo</span>
            </div>

            <div className="demo-input-group">
              <label>Question 1</label>
              <input
                className="demo-input"
                type="text"
                placeholder="e.g. How can I be a good geologist?"
                value={q1}
                onChange={(e) => { setQ1(e.target.value); setResult(null) }}
              />
            </div>

            <div className="demo-input-group">
              <label>Question 2</label>
              <input
                className="demo-input"
                type="text"
                placeholder="e.g. What should I do to be a great geologist?"
                value={q2}
                onChange={(e) => { setQ2(e.target.value); setResult(null) }}
              />
            </div>

            <button
              className="demo-btn"
              onClick={handleAnalyze}
              disabled={loading || !q1.trim() || !q2.trim()}
            >
              {loading ? <><span className="spinner"></span> Analyzing...</> : 'Analyze Similarity'}
            </button>

            {result && (
              <div className={`demo-result ${result}`}>
                {result === 'duplicate' 
                  ? '🔴 Duplicate — These questions are semantically similar'
                  : '🟢 Not Duplicate — These are different questions'}
              </div>
            )}

            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              {EXAMPLE_PAIRS.map((pair, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(pair)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.7rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    lineHeight: 1.4,
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <span style={{ color: pair.expected === 'duplicate' ? 'var(--danger)' : 'var(--success)', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {pair.expected === 'duplicate' ? '● Duplicate' : '● Unique'}
                  </span>
                  <br />
                  Try example →
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
