import React, { useEffect, useRef } from 'react'
import { trackUserShown } from '../../utils/analytics'

const GameplayScreen = ({ 
  currentNode, 
  choiceHistory, 
  onChoice, 
  onBack 
}) => {
  const progress = Math.min((choiceHistory.length / 5) * 100, 100)
  const hasTrackedRef = useRef(false)
  
  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true
      trackUserShown({ page_template: 'gameplay', section: 'toisimulationroom' })
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-icons text-lg">arrow_back</span>
            </button>
            <span className="material-icons text-white text-lg sm:text-xl md:text-2xl">how_to_vote</span>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white">Bihar Election</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* Left Panel - Scenario */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                <span className="material-icons text-black text-lg sm:text-xl md:text-2xl mt-1">description</span>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black mb-2 sm:mb-3 md:mb-4">Current Situation</h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {currentNode.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-black text-lg">decision_tree</span>
                  <h3 className="font-semibold text-black text-base text-left">Your Options</h3>
                </div>
              </div>
              {currentNode.options?.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-white border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-black p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl text-left transition-all duration-200 group"
                  onClick={() => onChoice(option.nextNode)}
                >
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed font-medium text-left normal-case tracking-normal flex-1">{option.text}</p>
                  </div>
                  <div className="mt-2 sm:mt-3 flex items-center justify-end">
                    <span className="material-icons text-gray-400 group-hover:text-black text-base sm:text-lg transition-colors">arrow_forward_ios</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Progress */}
          <div className="order-1 lg:order-2">
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm md:text-base text-gray-600">Campaign Progress</span>
                  <span className="text-xs sm:text-sm md:text-base text-black font-semibold">{choiceHistory.length}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GameplayScreen
