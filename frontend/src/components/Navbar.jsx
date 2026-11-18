import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="navbar-brand">
          <div className="brand-icon">QP</div>
          <span>QuoraPairs</span>
        </a>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={() => setMobileOpen(false)}>About</a></li>
          <li><a href="#features" onClick={() => setMobileOpen(false)}>Features</a></li>
          <li><a href="#pipeline" onClick={() => setMobileOpen(false)}>Pipeline</a></li>
          <li><a href="#performance" onClick={() => setMobileOpen(false)}>Performance</a></li>
          <li><a href="#dataset" onClick={() => setMobileOpen(false)}>Dataset</a></li>
          <li><a href="#playground" className="nav-cta" onClick={() => setMobileOpen(false)}>Try It →</a></li>
        </ul>
      </div>
    </nav>
  )
}
