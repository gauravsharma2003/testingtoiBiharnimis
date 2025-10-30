import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import CandidateGame from './components/pages/CandidateGame'
import Hi from './Hi'
import './App.css'

const getBasename = () => {
  // Local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/'
  }
  // Production with reverse proxy
  if (window.location.hostname === 'timesofindia.indiatimes.com') {
    return '/elections/assembly-elections/bihar/simulation-room'
  }
  // Vercel direct access
  return '/'
}


function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/hi" element={<Hi />} />
        <Route path="/:candidateKey" element={<CandidateGame />} />
        <Route path="/:candidateKey/result/:endNode" element={<CandidateGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App