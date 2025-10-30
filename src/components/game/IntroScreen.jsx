import React from 'react'
import CTAButton from '../shared/CTAButton'

const IntroScreen = ({ candidateName, onBack, onStart }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Hero Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16">
          <div className="max-w-2xl w-full text-center lg:text-left">
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <span className="material-icons text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 md:mb-6 block">how_to_vote</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                Bihar Election
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 font-medium">
                The Final Countdown
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                Experience the final weeks of a high-stakes political campaign in Bihar. 
                As {candidateName}, every decision you make will shape the outcome of the election.
              </p>
            </div>
            
            <div className="flex gap-4 justify-center lg:justify-start">
              <CTAButton 
                onClick={onBack}
                icon="arrow_back"
                variant="secondary"
              >
                BACK
              </CTAButton>
              <CTAButton 
                onClick={onStart}
                icon="play_arrow"
              >
                BEGIN CAMPAIGN
              </CTAButton>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Visual */}
        <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
          <div className="text-center">
            <span className="material-icons text-gray-900 text-9xl opacity-20">campaign</span>
            <p className="text-gray-500 mt-4 text-sm uppercase tracking-widest">Political Simulation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroScreen
