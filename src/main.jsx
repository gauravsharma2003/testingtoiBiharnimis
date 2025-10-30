import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Hi from './Hi.jsx'

// Determine basename based on environment
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hi" element={<Hi />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)