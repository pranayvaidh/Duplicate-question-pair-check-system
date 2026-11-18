import React from 'react'
import { FiGitBranch } from 'react-icons/fi'

const steps = [
  {
    num: 1,
    title: 'Data Loading & EDA',
    desc: 'Load the Kaggle dataset with 404K pairs. Explore class distribution (63% not-duplicate, 37% duplicate), check for missing values, and analyze question length distributions.',
    tags: ['pandas', 'seaborn', 'matplotlib'],
  },
  {
    num: 2,
    title: 'Text Preprocessing',
    desc: 'Clean raw text by removing HTML tags, expanding contractions, replacing special characters, converting numbers to shorthand, and stripping punctuation.',
    tags: ['BeautifulSoup', 'regex', 're.sub'],
  },
  {
    num: 3,
    title: 'Feature Engineering',
    desc: 'Extract 22 handcrafted features across 4 categories: basic stats, token-level analysis, length-based metrics, and fuzzy string matching scores.',
    tags: ['fuzzywuzzy', 'distance', 'numpy'],
  },
  {
    num: 4,
    title: 'Vectorization',
    desc: 'Transform both questions using CountVectorizer (Bag of Words) and horizontally stack with the 22 features to create the final feature matrix.',
    tags: ['CountVectorizer', 'scipy.sparse', 'hstack'],
  },
  {
    num: 5,
    title: 'Model Training',
    desc: 'Train and compare multiple classifiers — Random Forest, XGBoost, Logistic Regression, and more — selecting the best performer on cross-validation.',
    tags: ['RandomForest', 'XGBoost', 'sklearn'],
  },
  {
    num: 6,
    title: 'Deployment',
    desc: 'Serialize the trained model and vectorizer with pickle. Deploy via Streamlit for interactive predictions on new question pairs.',
    tags: ['pickle', 'streamlit', 'heroku'],
  },
]

export default function Pipeline() {
  return (
    <section className="section" id="pipeline">
      <div className="container">
        <span className="section-label"><FiGitBranch /> ML Pipeline</span>
        <h2 className="section-title">How It Works</h2>
        <p className="section-desc">
          A six-step machine learning pipeline from raw text to production predictions.
        </p>

        <div className="pipeline-steps">
          {steps.map((step, i) => (
            <div key={i} className="pipeline-step">
              <div className={`step-number ${i < 6 ? 'active' : 'inactive'}`}>
                {step.num}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="step-tags">
                  {step.tags.map((tag, j) => (
                    <span key={j} className="step-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
