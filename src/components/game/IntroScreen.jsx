import React, { useEffect, useRef } from 'react'
import { trackUserShown } from '../../utils/analytics'
import CTAButton from '../shared/CTAButton'
import { GAME_DATA_CONFIG } from '../../constants/gameData'

const IntroScreen = ({ candidateName, candidateKey, onBack, onStart }) => {
  const hasTrackedRef = useRef(false)
  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true
      trackUserShown({ page_template: 'splash', section: 'toisimulationroom', level: `${candidateKey}_widget`, browisng_platform: 'web' })
    }
  }, [])
  const splashImageUrl = GAME_DATA_CONFIG[candidateKey]?.splashimage

  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative">
      {/* Top-left back button (rounded with light grey border) */}
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="fixed top-4 left-4 z-20 h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition"
      >
        <span className="material-icons text-gray-700">arrow_back</span>
      </button>

      {/* Splash image at top - full width, responsive height */}
      {splashImageUrl && (
        <div className="w-full h-[40vh] sm:h-[50vh] overflow-hidden">
          <img src={splashImageUrl} alt={`${candidateName} splash`} className="w-full h-full object-cover scale-110" />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1">Play as</div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl whitespace-nowrap">{candidateName}</div>
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 font-medium">
              Play as {candidateName} and create your election strategy. Choose your actions wisely and lead your campaign toward success
            </h2>
          </div>
          
          <div className="flex gap-4 justify-center">
            <CTAButton 
              onClick={onStart}
              icon="play_arrow"
            >
              Play Now
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroScreen
