import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { JSON_BASE_URL, GAME_DATA_CONFIG } from '../../constants/gameData'
import { trackUserClick, trackUserShown } from '../../utils/analytics'
import { LoadingSpinner, ErrorMessage } from '../shared/LoadingStates'
import CandidateCard from '../shared/CandidateCard'
import Footer from '../shared/Footer'

const LandingPage = () => {
  const navigate = useNavigate()
  const [gameDataMap, setGameDataMap] = useState(null)
  const [loading, setLoading] = useState(true)

  const hasTrackedRef = useRef(false)
  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true
      // Screen view
      trackUserShown({ page_template: 'listing', section: 'toisimulationroom' })
    }

    const loadGameData = async () => {
      try {
        const [nitishData, prashantData, tejashwiData] = await Promise.all([
          fetch(`${JSON_BASE_URL}/nitish.json`).then(res => res.json()),
          fetch(`${JSON_BASE_URL}/prashant.json`).then(res => res.json()),
          fetch(`${JSON_BASE_URL}/tejashwi.json`).then(res => res.json())
        ])

        setGameDataMap({
          nitish: { data: nitishData, ...GAME_DATA_CONFIG.nitish },
          prashant: { data: prashantData, ...GAME_DATA_CONFIG.prashant },
          tejashwi: { data: tejashwiData, ...GAME_DATA_CONFIG.tejashwi }
        })
        setLoading(false)
      } catch (error) {
        console.error('Error loading game data:', error)
        setLoading(false)
      }
    }

    loadGameData()
  }, [])

  const handleCharacterSelect = (key, fullName) => {
    trackUserClick({ label: 'select_character', type: `${key}_widget` })
    navigate(`/${key}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!gameDataMap) {
    return <ErrorMessage />
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <span className="text-gray-900 text-base mb-6 flex items-center justify-center gap-2">Bihar Elections with <img src="https://static.toiimg.com/photo/124997104.cms" alt="" className="h-10 w-auto inline-block" /> </span>
            <h1 className="text-5xl font-extrabold text-gray-950 mb-4">Dance of Democracy</h1>
            <h2 className="text-2xl text-gray-700 mb-6">Choose Your Perspective: Explore Bihar’s campaign through concise, distinct viewpoints.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(gameDataMap).map(([key, gameInfo]) => (
              <CandidateCard 
                key={key}
                candidateKey={key}
                gameInfo={gameInfo}
                onSelect={handleCharacterSelect}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage
