import React from 'react'
import { FiGithub, FiExternalLink, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-brand">
              <div className="brand-icon">QP</div>
              <span>QuoraPairs</span>
            </div>
            <p className="footer-desc">
              An NLP project to find whether given 2 questions are the same 
              or not, semantically speaking. Built with Python, scikit-learn, 
              and React.
            </p>
          </div>

          <div className="footer-col">
            <h4>Project</h4>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#pipeline">Pipeline</a>
            <a href="#performance">Performance</a>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <a href="https://www.kaggle.com/c/quora-question-pairs" target="_blank" rel="noreferrer">
              Kaggle Dataset <FiExternalLink size={10} />
            </a>
            <a href="https://scikit-learn.org/" target="_blank" rel="noreferrer">
              scikit-learn <FiExternalLink size={10} />
            </a>
            <a href="https://streamlit.io/" target="_blank" rel="noreferrer">
              Streamlit <FiExternalLink size={10} />
            </a>
          </div>

          <div className="footer-col">
            <h4>Links</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FiGithub size={12} /> GitHub
            </a>
            <a href="#playground">Try Demo</a>
            <a href="#dataset">Dataset</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Quora Question Pairs. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <FiHeart size={12} style={{ color: 'var(--primary-light)' }} /> for NLP
          </span>
        </div>
      </div>
    </footer>
  )
}
