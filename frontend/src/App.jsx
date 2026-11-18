import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Features from './components/Features'
import Pipeline from './components/Pipeline'
import Performance from './components/Performance'
import TechStack from './components/TechStack'
import Dataset from './components/Dataset'
import Playground from './components/Playground'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Features />
      <Pipeline />
      <Performance />
      <Dataset />
      <TechStack />
      <Playground />
      <Footer />
    </div>
  )
}

export default App
