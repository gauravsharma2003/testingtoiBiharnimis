import React, { useState, useEffect } from 'react'
import './App.css'

const JSON_BASE_URL = 'https://testingtoi-simulationroom.vercel.app/json'

function App() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameDataMap, setGameDataMap] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGameData = async () => {
      try {
        const [nitishData, chiragData, prashantData, tejashwiData] = await Promise.all([
          fetch(`${JSON_BASE_URL}/nitish.json`).then(res => res.json()),
          fetch(`${JSON_BASE_URL}/chirag.json`).then(res => res.json()),
          fetch(`${JSON_BASE_URL}/prashant.json`).then(res => res.json()),
          fetch(`${JSON_BASE_URL}/tejashwi.json`).then(res => res.json())
        ])

        setGameDataMap({
          nitish: { 
            data: nitishData, 
            fullName: "Nitish Kumar (NDA)",
            image: "https://cimp.ac.in/wp-content/uploads/2024/06/CM-Nitish-Kumar-1.png",
            subhead: "Chief Minister & Political Veteran"
          },
          // chirag: { 
          //   data: chiragData, 
          //   fullName: "Chirag Paswan",
          //   image: "https://www.livemint.com/lm-img/img/2025/07/12/original/Chirag-Paswan-9_1752283432064_1752283458020.jpg",
          //   subhead: "Young Leader & Alliance Builder"
          // },
          prashant: { 
            data: prashantData, 
            fullName: "Prashant Kishor (JS)",
            image: "https://pnglove.com/data/img/1142_pMyO.jpg",
            subhead: "Political Strategist & Reformer"
          },
          tejashwi: { 
            data: tejashwiData, 
            fullName: "Tejashwi Yadav (MG)",
            image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202112/5-l-Tejashwi.jpg?size=690:388",
            subhead: "Deputy CM & Youth Icon"
          }
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
    // Track character selection
    const eventData = { character_name: fullName }
    console.log('GA Event: character_select', eventData)
    if (window.gtag) {
      window.gtag('event', 'character_select', eventData)
    }
    setSelectedGame(key)
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-gray-900 text-6xl mb-4 block animate-spin">refresh</span>
          <p className="text-lg text-gray-600">Loading campaign data...</p>
        </div>
      </div>
    )
  }

  if (!gameDataMap) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-red-500 text-6xl mb-4 block">error</span>
          <p className="text-lg text-gray-600">Failed to load campaign data</p>
        </div>
      </div>
    )
  }

  if (!selectedGame) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <span className="material-icons text-gray-900 text-6xl mb-6 block">how_to_vote</span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Bihar Election</h1>
            <h2 className="text-2xl text-gray-700 mb-6">Choose Your Perspective</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the final weeks of Bihar's high-stakes political campaign from different viewpoints. 
              Each perspective offers a unique journey through the complex world of Indian politics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(gameDataMap).map(([key, gameInfo]) => (
              <div key={key} className="bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => handleCharacterSelect(key, gameInfo.fullName)}>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={gameInfo.image} 
                      alt={gameInfo.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0NkM0OC4yODQzIDQ2IDU1IDM5LjI4NDMgNTUgMzFDNTUgMjIuNzE1NyA0OC4yODQzIDE2IDQwIDE2QzMxLjcxNTcgMTYgMjUgMjIuNzE1NyAyNSAzMUMyNSAzOS4yODQzIDMxLjcxNTcgNDYgNDAgNDZaIiBmaWxsPSIjOUI5Q0EwIi8+CjxwYXRoIGQ9Ik00MCA0OEM0Ni42Mjc0IDQ4IDUyIDUzLjM3MjYgNTIgNjBWNjRINjhWNjBDNjggNDQuNTM2IDU1LjQ2NCAzMiA0MCAzMkMyNC41MzYgMzIgMTIgNDQuNTM2IDEyIDYwVjY0SDI4VjYwQzI4IDUzLjM3MjYgMzMuMzcyNiA0OCA0MCA0OFoiIGZpbGw9IiM5QjlDQTAiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{gameInfo.fullName}</h3>
                  <p className="text-sm text-gray-600 mb-4">{gameInfo.subhead}</p>
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Start Campaign
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return <GameComponent gameData={gameDataMap[selectedGame].data} candidateName={gameDataMap[selectedGame].fullName} onBack={() => setSelectedGame(null)} />
}

function GameComponent({ gameData, candidateName, onBack }) {
  const [currentNode, setCurrentNode] = useState(gameData.startNode)
  const [choiceHistory, setChoiceHistory] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [startTime, setStartTime] = useState(null)

  const getCurrentNodeData = () => gameData.nodes[currentNode]

  const makeChoice = (nextNode, choiceText) => {
    const decisionNumber = choiceHistory.length + 1
    
    // Track decision/choice
    const eventData = {
      character_name: candidateName,
      decision_number: decisionNumber,
      node_id: currentNode,
      choice_text: choiceText,
      next_node_id: nextNode
    }
    console.log('GA Event: make_choice', eventData)
    if (window.gtag) {
      window.gtag('event', 'make_choice', eventData)
    }
    
    setChoiceHistory(prev => [...prev, {
      from: currentNode,
      choice: choiceText,
      to: nextNode
    }])
    setCurrentNode(nextNode)
  }

  const restartGame = () => {
    // Track restart event
    const eventData = { character_name: candidateName }
    console.log('GA Event: restart', eventData)
    if (window.gtag) {
      window.gtag('event', 'restart', eventData)
    }
    
    setCurrentNode(gameData.startNode)
    setChoiceHistory([])
    setGameStarted(false)
    setStartTime(null)
  }

  const handleReturnToMenu = () => {
    // Determine from_screen based on current state
    let fromScreen = 'intro'
    if (node?.isEnding) {
      fromScreen = 'ending'
    } else if (gameStarted) {
      fromScreen = 'game'
    }
    
    // Track return_to_menu event
    const eventData = {
      from_screen: fromScreen,
      decision_number_at_exit: choiceHistory.length,
      character_name: candidateName
    }
    console.log('GA Event: return_to_menu', eventData)
    if (window.gtag) {
      window.gtag('event', 'return_to_menu', eventData)
    }
    
    onBack()
  }

  const startGame = () => {
    setStartTime(Date.now())
    
    // Track game start
    const eventData = { character_name: candidateName }
    console.log('GA Event: game_start', eventData)
    if (window.gtag) {
      window.gtag('event', 'game_start', eventData)
    }
    
    setGameStarted(true)
  }

  const node = getCurrentNodeData()
  const progress = Math.min((choiceHistory.length / 5) * 100, 100)

  // Track game completion
  useEffect(() => {
    if (node?.isEnding && startTime) {
      const duration = Math.round((Date.now() - startTime) / 1000)
      const resultMatch = node.text.match(/^[A-Z !]+/)
      const resultType = resultMatch ? resultMatch[0].trim() : 'UNKNOWN'

      const eventData = {
        character_name: candidateName,
        result_type: resultType,
        ending_id: currentNode,
        final_public_approval: node.stats?.publicApproval,
        play_duration_seconds: duration
      }

      console.log('GA Event: game_complete', eventData)
      if (window.gtag) {
        window.gtag('event', 'game_complete', eventData)
      }
    }
  }, [node, candidateName, currentNode, startTime])

  if (!gameStarted) {
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
              <button 
                className="bg-gray-100 text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2 sm:gap-3"
                onClick={handleReturnToMenu}
              >
                <span className="material-icons text-sm sm:text-base">arrow_back</span>
                Back
              </button>
              <button 
                className="bg-zinc-300  text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 sm:gap-3 w-auto min-w-[140px] sm:min-w-[160px]"
                onClick={startGame}
              >
                <span className="material-icons text-sm sm:text-base">play_arrow</span>
                Begin Campaign
              </button>
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
        <Footer />
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
      if (result.includes('VICTORY')) return 'text-black'
      if (result.includes('DEFEAT')) return 'text-gray-600'
      return 'text-gray-800'
    }
    
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="material-icons text-white text-lg sm:text-xl md:text-2xl">how_to_vote</span>
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white">Bihar Election</h1>
            </div>
            <div className="w-full sm:w-48 md:w-56 lg:w-64 bg-gray-700 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
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
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <span className="material-icons text-black text-lg sm:text-xl md:text-2xl">summarize</span>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black">Campaign Summary</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{node.summary}</p>
            </div>

            {/* Statistics */}
            {node.stats && (
              <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <span className="material-icons text-black text-lg sm:text-xl md:text-2xl">analytics</span>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black">Final Statistics</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {Object.entries(node.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 sm:p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-600 font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-xs sm:text-sm md:text-base text-black font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="text-center">
            <div className="flex gap-4 justify-center">
              <button 
                className="bg-gray-200 text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2 sm:gap-3"
                onClick={handleReturnToMenu}
              >
                <span className="material-icons text-sm sm:text-base">arrow_back</span>
                Back to Menu
              </button>
              <button 
                className="bg-white text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 sm:gap-3 min-w-[120px] sm:min-w-[140px]"
                onClick={restartGame}
              >
                <span className="material-icons text-sm sm:text-base">refresh</span>
                Play Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={handleReturnToMenu}
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
                    {node.text}
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
              {node.options?.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-white border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-black p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl text-left transition-all duration-200 group"
                  onClick={() => makeChoice(option.nextNode, option.text)}
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
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 px-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          It is POC for Times of India. For feedback: <a href="mailto:gaurav.sharma4@timesinternet.in" className="text-gray-900 hover:text-gray-700 underline">gaurav.sharma4@timesinternet.in</a>
        </p>
      </div>
    </footer>
  )
}

export default App