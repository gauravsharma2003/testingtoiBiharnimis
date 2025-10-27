import React, { useState } from 'react'
import './App.css'
import gameData from '../data.json'

function App() {
  const [currentNode, setCurrentNode] = useState(gameData.startNode)
  const [choiceHistory, setChoiceHistory] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  const getCurrentNodeData = () => gameData.nodes[currentNode]

  const makeChoice = (nextNode, choiceText) => {
    setChoiceHistory(prev => [...prev, {
      from: currentNode,
      choice: choiceText,
      to: nextNode
    }])
    setCurrentNode(nextNode)
  }

  const restartGame = () => {
    setCurrentNode(gameData.startNode)
    setChoiceHistory([])
    setGameStarted(false)
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const node = getCurrentNodeData()
  const progress = Math.min((choiceHistory.length / 5) * 100, 100)

  if (!gameStarted) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col lg:flex-row">
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
                As Nitish Kumar, every decision you make will shape the outcome of the election.
              </p>
            </div>
            
            <button 
              className="bg-white text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 sm:gap-3 mx-auto lg:mx-0 w-auto min-w-[140px] sm:min-w-[160px]"
              onClick={startGame}
            >
              <span className="material-icons text-sm sm:text-base">play_arrow</span>
              Begin Campaign
            </button>
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
    )
  }

  if (node?.isEnding) {
    const resultMatch = node.text.match(/^(VICTORY!|DEFEAT|NARROW VICTORY|LANDSLIDE VICTORY|NARROW DEFEAT|PYRRHIC VICTORY)/)
    const result = resultMatch ? resultMatch[1] : 'RESULT'
    
    const getResultIcon = (result) => {
      if (result.includes('VICTORY')) return 'emoji_events'
      if (result.includes('DEFEAT')) return 'sentiment_dissatisfied'
      return 'help_outline'
    }
    
    const getResultColor = (result) => {
      if (result.includes('VICTORY')) return 'text-green-400'
      if (result.includes('DEFEAT')) return 'text-red-400'
      return 'text-yellow-400'
    }
    
    return (
      <div className="w-full min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gray-100 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="material-icons text-gray-900 text-lg sm:text-xl md:text-2xl">how_to_vote</span>
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Bihar Election</h1>
            </div>
            <div className="w-full sm:w-48 md:w-56 lg:w-64 bg-gray-200 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
          {/* Result Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <span className={`material-icons text-4xl sm:text-5xl md:text-6xl lg:text-8xl ${getResultColor(result)} mb-3 sm:mb-4 md:mb-6 block`}>
              {getResultIcon(result)}
            </span>
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold ${getResultColor(result)} mb-3 sm:mb-4 md:mb-6 px-2`}>
              {result}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-3 sm:px-4">
              {node.text.replace(/^[A-Z ]+!\s*/, '')}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mb-6 sm:mb-8 lg:mb-12">
            {/* Campaign Summary */}
            <div className="bg-gray-100 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <span className="material-icons text-gray-900 text-lg sm:text-xl md:text-2xl">summarize</span>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Campaign Summary</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{node.summary}</p>
            </div>

            {/* Statistics */}
            {node.stats && (
              <div className="bg-gray-100 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <span className="material-icons text-gray-900 text-lg sm:text-xl md:text-2xl">analytics</span>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Final Statistics</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {Object.entries(node.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 sm:p-3 md:p-4 bg-gray-200 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-600 font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-xs sm:text-sm md:text-base text-gray-900 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="text-center">
            <button 
              className="bg-white text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 sm:gap-3 mx-auto min-w-[120px] sm:min-w-[140px]"
              onClick={restartGame}
            >
              <span className="material-icons text-sm sm:text-base">refresh</span>
              Play Again
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-100 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="material-icons text-gray-900 text-lg sm:text-xl md:text-2xl">how_to_vote</span>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Bihar Election</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
            <span className="text-gray-600 text-xs sm:text-sm">Decision {choiceHistory.length + 1}</span>
            <div className="w-full sm:w-40 md:w-48 lg:w-64 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* Left Panel - Scenario */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-gray-100 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                <span className="material-icons text-gray-900 text-lg sm:text-xl md:text-2xl mt-1">description</span>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">Current Situation</h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {node.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="bg-gray-200 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-icons flex-shrink-0" style={{ color: 'white', fontSize: '20px', width: '20px', height: '20px', lineHeight: '20px' }}>decision_tree</span>
                  <h3 className="font-semibold flex-1" style={{ color: 'white', fontSize: '16px', margin: '0', padding: '0', display: 'block' }}>Your Options</h3>
                </div>
              </div>
              {node.options?.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-gray-100 hover:bg-zinc-600 text-gray-900 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl text-left transition-all duration-200 relative opacity-90 hover:opacity-100 active:top-1 shadow-[0_7px_2px_0_rgb(63,63,70),0_8px_5px_0_rgba(0,0,0,0.3)] active:shadow-[0_3px_2px_0_rgb(63,63,70),0_3px_5px_0_rgba(0,0,0,0.3)]"
                  onClick={() => makeChoice(option.nextNode, option.text)}
                >
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white text-zinc-700 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base shadow-md">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed font-medium text-left normal-case tracking-normal flex-1">{option.text}</p>
                  </div>
                  <div className="mt-2 sm:mt-3 flex items-center justify-end">
                    <span className="material-icons text-zinc-400 text-base sm:text-lg">arrow_forward_ios</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Progress */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-100 rounded-xl p-3 sm:p-4 md:p-6">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm md:text-base text-gray-600">Campaign Progress</span>
                  <span className="text-xs sm:text-sm md:text-base text-gray-900 font-semibold">{choiceHistory.length}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500" 
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

export default App