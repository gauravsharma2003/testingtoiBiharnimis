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
      <div className="w-full min-h-screen bg-black flex flex-col lg:flex-row">
        {/* Left Panel - Hero Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16">
          <div className="max-w-2xl w-full text-center lg:text-left">
            <div className="mb-8 lg:mb-12">
              <span className="material-icons text-white text-4xl sm:text-6xl mb-4 sm:mb-6 block">how_to_vote</span>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Bihar Election
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 font-medium">
                The Final Countdown
              </h2>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                Experience the final weeks of a high-stakes political campaign in Bihar. 
                As Nitish Kumar, every decision you make will shape the outcome of the election.
              </p>
            </div>
            
            <button 
              className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 mx-auto lg:mx-0"
              onClick={startGame}
            >
              <span className="material-icons">play_arrow</span>
              Begin Campaign
            </button>
          </div>
        </div>
        
        {/* Right Panel - Visual */}
        <div className="hidden lg:flex w-1/2 bg-zinc-700 items-center justify-center">
          <div className="text-center">
            <span className="material-icons text-white text-9xl opacity-20">campaign</span>
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
      <div className="w-full min-h-screen bg-black">
        {/* Header */}
        <header className="bg-zinc-700 px-4 sm:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-icons text-white text-xl sm:text-2xl">how_to_vote</span>
              <h1 className="text-lg sm:text-xl font-semibold text-white">Bihar Election</h1>
            </div>
            <div className="w-full sm:w-64 bg-zinc-800 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
          {/* Result Section */}
          <div className="text-center mb-8 sm:mb-16">
            <span className={`material-icons text-6xl sm:text-8xl ${getResultColor(result)} mb-4 sm:mb-6 block`}>
              {getResultIcon(result)}
            </span>
            <h2 className={`text-2xl sm:text-4xl lg:text-6xl font-bold ${getResultColor(result)} mb-4 sm:mb-6`}>
              {result}
            </h2>
            <p className="text-base sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
              {node.text.replace(/^[A-Z ]+!\s*/, '')}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-12">
            {/* Campaign Summary */}
            <div className="bg-zinc-700 rounded-xl p-4 sm:p-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="material-icons text-white text-xl sm:text-2xl">summarize</span>
                <h3 className="text-lg sm:text-2xl font-semibold text-white">Campaign Summary</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{node.summary}</p>
            </div>

            {/* Statistics */}
            {node.stats && (
              <div className="bg-zinc-700 rounded-xl p-4 sm:p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="material-icons text-white text-xl sm:text-2xl">analytics</span>
                  <h3 className="text-lg sm:text-2xl font-semibold text-white">Final Statistics</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {Object.entries(node.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 sm:p-4 bg-zinc-800 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-400 font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm sm:text-base text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="text-center">
            <button 
              className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 mx-auto"
              onClick={restartGame}
            >
              <span className="material-icons">refresh</span>
              Play Again
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-700 px-4 sm:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-icons text-white text-xl sm:text-2xl">how_to_vote</span>
            <h1 className="text-lg sm:text-xl font-semibold text-white">Bihar Election</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <span className="text-gray-400 text-xs sm:text-sm">Decision {choiceHistory.length + 1}</span>
            <div className="w-full sm:w-48 lg:w-64 bg-zinc-800 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          {/* Left Panel - Scenario */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-zinc-700 rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="material-icons text-white text-xl sm:text-2xl mt-1">description</span>
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Current Situation</h2>
                  <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
                    {node.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="material-icons text-white text-xl sm:text-2xl">decision_tree</span>
                <h3 className="text-lg sm:text-xl font-semibold text-white">Your Options</h3>
              </div>
              {node.options?.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-zinc-700 hover:bg-zinc-600 text-white p-4 sm:p-6 rounded-xl text-left transition-all duration-200 relative opacity-90 hover:opacity-100 active:top-1 shadow-[0_7px_2px_0_rgb(63,63,70),0_8px_5px_0_rgba(0,0,0,0.3)] active:shadow-[0_3px_2px_0_rgb(63,63,70),0_3px_5px_0_rgba(0,0,0,0.3)]"
                  onClick={() => makeChoice(option.nextNode, option.text)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white text-zinc-700 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
                      {index + 1}
                    </div>
                    <p className="text-sm sm:text-base text-white leading-relaxed font-medium text-left normal-case tracking-normal">{option.text}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-end">
                    <span className="material-icons text-zinc-400 text-lg">arrow_forward_ios</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Progress */}
          <div className="order-1 lg:order-2">
            <div className="bg-zinc-700 rounded-xl p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-400">Campaign Progress</span>
                  <span className="text-sm sm:text-base text-white font-semibold">{choiceHistory.length}/5</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
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