import React from 'react'
import { FiHelpCircle, FiAlertTriangle } from 'react-icons/fi'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <span className="section-label"><FiHelpCircle /> The Problem</span>
        <h2 className="section-title">Why Duplicate Detection Matters</h2>
        <p className="section-desc">
          Quora sees millions of questions daily. Many are semantically identical 
          but worded differently — detecting these duplicates improves user experience 
          and reduces information fragmentation.
        </p>

        <div className="about-grid">
          <div className="about-content">
            <h3>🎯 The Challenge</h3>
            <p>
              Given a pair of questions, determine whether they are semantically equivalent. 
              For example, <em>"How can I be a good geologist?"</em> and 
              <em>"What should I do to be a great geologist?"</em> ask the same thing — 
              but simple string matching would fail to detect this.
            </p>

            <h3>⚡ Our Approach</h3>
            <p>
              We engineered 22+ features across multiple categories — basic text statistics, 
              token-level analysis, length-based features, and fuzzy string matching — 
              then combined them with Bag-of-Words representations and trained a 
              Random Forest classifier to predict duplicate status.
            </p>

            <h3>📊 The Dataset</h3>
            <p>
              We use the official Kaggle Quora Question Pairs dataset containing 
              404,290 labeled question pairs with a ~37% duplicate rate, 
              making it a challenging binary classification task.
            </p>
          </div>

          <div className="about-visual">
            <div className="glass-card question-pair-demo">
              <div className="question-bubble">
                <span className="q-label">Question 1</span>
                How can I be a good geologist?
              </div>
              <div className="question-bubble">
                <span className="q-label">Question 2</span>
                What should I do to be a great geologist?
              </div>
              <div className="match-indicator">
                <div className="match-line"></div>
                <span className="match-badge duplicate">DUPLICATE</span>
                <div className="match-line"></div>
              </div>

              <div style={{ marginTop: 24 }}>
                <div className="question-bubble">
                  <span className="q-label">Question 1</span>
                  What is the meaning of life?
                </div>
                <div className="question-bubble">
                  <span className="q-label">Question 2</span>
                  How do I make a pizza?
                </div>
                <div className="match-indicator">
                  <div className="match-line"></div>
                  <span className="match-badge unique">NOT DUPLICATE</span>
                  <div className="match-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
