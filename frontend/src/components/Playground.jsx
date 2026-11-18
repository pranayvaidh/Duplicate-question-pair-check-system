import React, { useState } from 'react'
import { FiPlay, FiZap } from 'react-icons/fi'

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

const examplePairs = [
  {
    q1: "How can I be a good geologist?",
    q2: "What should I do to be a great geologist?",
    label: 'dup',
  },
  {
    q1: "What are natural methods to cure a headache?",
    q2: "What are some natural remedies for headaches?",
    label: 'dup',
  },
  {
    q1: "What is the meaning of life?",
    q2: "How do I make a pizza from scratch?",
    label: 'not-dup',
  },
  {
    q1: "How do I improve my English speaking skills?",
    q2: "What is the capital of France?",
    label: 'not-dup',
  },
]

function computeFeatures(q1, q2) {
  const normalize = (q) => q.toLowerCase().replace(/[^\w\s]/g, '').trim()
  const n1 = normalize(q1)
  const n2 = normalize(q2)

  const w1 = n1.split(/\s+/).filter(Boolean)
  const w2 = n2.split(/\s+/).filter(Boolean)
  const set1 = new Set(w1)
  const set2 = new Set(w2)

  // Content words (non-stop-words)
  const content1 = new Set(w1.filter(w => !STOP_WORDS.has(w)))
  const content2 = new Set(w2.filter(w => !STOP_WORDS.has(w)))
  const commonContent = [...content1].filter(w => content2.has(w))
  const minContent = Math.min(content1.size, content2.size) || 1
  const maxContent = Math.max(content1.size, content2.size) || 1
  const contentOverlapMin = commonContent.length / minContent
  const contentOverlapMax = commonContent.length / maxContent

  // All-token overlap
  const common = [...set1].filter(w => set2.has(w))
  const union = new Set([...set1, ...set2])
  const jaccard = common.length / union.size

  // Bigram overlap
  const bigrams = (tokens) => {
    const bg = new Set()
    for (let i = 0; i < tokens.length - 1; i++) bg.add(tokens[i] + ' ' + tokens[i + 1])
    return bg
  }
  const bg1 = bigrams(w1)
  const bg2 = bigrams(w2)
  const commonBg = [...bg1].filter(b => bg2.has(b))
  const bigramSim = (bg1.size + bg2.size) > 0 ? (2 * commonBg.length) / (bg1.size + bg2.size) : 0

  // Length ratio
  const lenRatio = w1.length && w2.length ? Math.min(w1.length, w2.length) / Math.max(w1.length, w2.length) : 0

  // First/last word match bonuses
  const firstMatch = w1[0] === w2[0] ? 0.1 : 0
  const lastMatch = w1.length && w2.length && w1[w1.length - 1] === w2[w2.length - 1] ? 0.15 : 0

  // Combined weighted score
  const score =
    contentOverlapMin * 0.30 +
    contentOverlapMax * 0.20 +
    jaccard * 0.10 +
    bigramSim * 0.10 +
    lenRatio * 0.05 +
    firstMatch +
    lastMatch

  const similarityPct = Math.min(score * 100 / 0.6, 100)  // scale to percentage

  return {
    q1Length: q1.length,
    q2Length: q2.length,
    q1Words: w1.length,
    q2Words: w2.length,
    commonWords: commonContent.length,
    totalWords: content1.size + content2.size,
    wordShare: (commonContent.length / ((content1.size + content2.size) || 1)).toFixed(3),
    similarity: similarityPct.toFixed(1),
    isDuplicate: score >= 0.28,
  }
}

export default function Playground() {
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    if (!q1.trim() || !q2.trim()) return
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const features = computeFeatures(q1, q2)
      setResult(features)
      setLoading(false)
    }, 1500)
  }

  const loadExample = (pair) => {
    setQ1(pair.q1)
    setQ2(pair.q2)
    setResult(null)
  }

  return (
    <section className="section playground" id="playground">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label"><FiPlay /> Interactive Demo</span>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Try It Yourself</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Enter any two questions and see the similarity analysis in action.
            The demo runs a simplified feature extraction in your browser.
          </p>
        </div>

        <div className="glass-card playground-card">
          <div className="playground-inputs">
            <div className="input-group">
              <label>Question 1</label>
              <textarea
                placeholder="Type your first question here..."
                value={q1}
                onChange={(e) => { setQ1(e.target.value); setResult(null) }}
              />
            </div>
            <div className="input-group">
              <label>Question 2</label>
              <textarea
                placeholder="Type your second question here..."
                value={q2}
                onChange={(e) => { setQ2(e.target.value); setResult(null) }}
              />
            </div>
          </div>

          <button
            className="playground-btn"
            onClick={handleAnalyze}
            disabled={loading || !q1.trim() || !q2.trim()}
          >
            {loading ? (
              <><span className="spinner"></span> Analyzing Features...</>
            ) : (
              <><FiZap style={{ marginRight: 8, verticalAlign: 'middle' }} /> Analyze Question Pair</>
            )}
          </button>

          {result && (
            <>
              <div className={`playground-result ${result.isDuplicate ? 'is-duplicate' : 'is-not-duplicate'}`}>
                <h3>
                  {result.isDuplicate 
                    ? '🔴 Duplicate Detected' 
                    : '🟢 Not Duplicate'}
                </h3>
                <p>
                  {result.isDuplicate
                    ? 'These questions appear to be semantically similar and likely duplicates.'
                    : 'These questions appear to be asking about different topics.'}
                </p>
              </div>

              <div className="analysis-grid" style={{ marginTop: 20 }}>
                <div className="analysis-item">
                  <div className="analysis-label">Similarity Score</div>
                  <div className="analysis-value" style={{ color: result.isDuplicate ? 'var(--danger)' : 'var(--success)' }}>
                    {result.similarity}%
                  </div>
                </div>
                <div className="analysis-item">
                  <div className="analysis-label">Common Words</div>
                  <div className="analysis-value">{result.commonWords}</div>
                </div>
                <div className="analysis-item">
                  <div className="analysis-label">Word Share Ratio</div>
                  <div className="analysis-value">{result.wordShare}</div>
                </div>
                <div className="analysis-item">
                  <div className="analysis-label">Q1 / Q2 Length</div>
                  <div className="analysis-value">{result.q1Length} / {result.q2Length}</div>
                </div>
                <div className="analysis-item">
                  <div className="analysis-label">Q1 Words</div>
                  <div className="analysis-value">{result.q1Words}</div>
                </div>
                <div className="analysis-item">
                  <div className="analysis-label">Q2 Words</div>
                  <div className="analysis-value">{result.q2Words}</div>
                </div>
              </div>
            </>
          )}

          <div className="example-pairs">
            <h4>Try an example</h4>
            {examplePairs.map((pair, i) => (
              <button key={i} className="example-pair-btn" onClick={() => loadExample(pair)}>
                <span className={`pair-label ${pair.label === 'dup' ? 'dup' : 'not-dup'}`}>
                  {pair.label === 'dup' ? '● Duplicate pair' : '● Unique pair'}
                </span>
                "{pair.q1}" vs "{pair.q2}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
