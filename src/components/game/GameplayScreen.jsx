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
      <header className="bg-white px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <button 
            onClick={onBack}
            className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition"
          >
            <span className="material-icons text-gray-700">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="https://static.toiimg.com/photo/124997104.cms" alt="" className="h-8 w-auto inline-block" />
            <span className="text-gray-900 text-sm font-medium whitespace-nowrap">Simulation Room : Bihar election</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Current Situation - Full Width */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
            <span className="material-icons text-black text-lg sm:text-xl md:text-2xl mt-1">description</span>
            <div className="text-left">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black mb-2 sm:mb-3 md:mb-4">Current Situation</h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                {currentNode.text}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Progress - Show on mobile only */}
        <div className="lg:hidden order-1 mb-4 sm:mb-6">
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

        {/* Desktop: Your Options Header with Progress Widget */}
        <div className="hidden lg:block  mb-6">
          <div className="flex justify-between  items-center">
            <div className="lg:pl-8 ">
              <div className="flex items-start gap-4">
                <div className="w-10 flex justify-center">
                  <span className="material-icons text-black text-lg">decision_tree</span>
                </div>
                <h2 className="font-semibold text-black  text-base">Your Options</h2>
              </div>
            </div>
            
            {/* Desktop Progress Widget */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-120">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Campaign Progress</span>
                  <span className="text-sm text-black font-semibold">{choiceHistory.length}/5</span>
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

        {/* Mobile: Your Options Header */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <span className="material-icons text-black text-lg">decision_tree</span>
            <h3 className="font-semibold text-black text-base text-left">Your Options</h3>
          </div>
        </div>

        {/* Choices - Mobile: Stack, Desktop: Smart Grid */}
        <div className={`space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-0 ${
          currentNode.options?.length === 1 
            ? 'lg:flex lg:justify-center' 
            : currentNode.options?.length === 2 
              ? 'lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6' 
              : currentNode.options?.length === 3
                ? 'lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6'
                : 'lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6'
        }`}>
          {currentNode.options?.map((option, index) => (
            <button
              key={index}
              className={`w-full bg-white border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-black p-3 sm:p-4 md:p-5 lg:p-8 rounded-xl text-left transition-all duration-200 group lg:min-h-40 xl:min-h-44 flex flex-col justify-between ${
                currentNode.options?.length === 1 ? 'lg:max-w-md' : ''
              } ${
                currentNode.options?.length === 3 && index === 2 ? 'lg:col-span-2 lg:mx-auto lg:max-w-md' : ''
              }`}
              onClick={() => onChoice(option.nextNode)}
            >
              <div className="flex items-start gap-2 sm:gap-3 md:gap-6 flex-1">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-base text-black leading-relaxed font-medium text-left normal-case tracking-normal flex-1">{option.text}</p>
              </div>
              <div className="mt-2 sm:mt-3 flex items-center justify-end">
                <span className="material-icons text-gray-400 group-hover:text-black text-base sm:text-lg transition-colors">arrow_forward_ios</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

export default GameplayScreen
