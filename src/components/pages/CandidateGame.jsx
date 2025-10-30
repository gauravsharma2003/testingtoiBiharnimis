import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GAME_DATA_CONFIG } from '../../constants/gameData'
import { trackGameStart, trackMakeChoice, trackGameComplete } from '../../utils/analytics'
import { LoadingSpinner, ErrorMessage } from '../shared/LoadingStates'
import IntroScreen from '../game/IntroScreen'
import GameplayScreen from '../game/GameplayScreen'
import ResultScreen from '../game/ResultScreen'

const CandidateGame = () => {
  const { candidateKey, endNode } = useParams()
  const navigate = useNavigate()
  
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentNode, setCurrentNode] = useState(null)
  const [choiceHistory, setChoiceHistory] = useState([])
  const [startTime, setStartTime] = useState(null)

  // Load game data
  useEffect(() => {
    const candidateConfig = GAME_DATA_CONFIG[candidateKey]
    
    if (!candidateConfig) {
      setError('Candidate not found')
      setLoading(false)
      return
    }

    fetch(candidateConfig.url)
      .then(res => res.json())
      .then(data => {
        setGameData(data)
        setCurrentNode(data.startNode)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading game data:', err)
        setError('Failed to load game data')
        setLoading(false)
      })
  }, [candidateKey])

  // Handle result page navigation
  useEffect(() => {
    if (endNode && gameData) {
      setGameStarted(true)
      // Check if the end node exists in the data
      const endNodeData = gameData.nodes[endNode]
      if (endNodeData) {
        setCurrentNode(endNode)
      }
    }
  }, [endNode, gameData])

  // Update URL when game state changes
  useEffect(() => {
    if (!gameData) return
    
    const currentNodeData = gameData.nodes[currentNode]
    if (!currentNodeData) return

    if (currentNodeData.isEnding && gameStarted) {
      navigate(`/${candidateKey}/result/${currentNode}`, { replace: true })
    } else if (gameStarted) {
      navigate(`/${candidateKey}`, { replace: true })
    }
  }, [currentNode, gameStarted, gameData, candidateKey, navigate])

  const handleStartGame = () => {
    setGameStarted(true)
    setStartTime(Date.now())
    trackGameStart(candidateKey)
  }

  const handleChoice = (nextNode) => {
    const currentNodeData = gameData.nodes[currentNode]
    const choice = currentNodeData?.options?.find(c => c.nextNode === nextNode)
    const choiceText = choice?.text || 'Unknown choice'
    
    setChoiceHistory([...choiceHistory, {
      node: currentNode,
      choice: choiceText,
      timestamp: Date.now()
    }])
    
    trackMakeChoice(candidateKey, currentNode, nextNode, choiceText)
    
    setCurrentNode(nextNode)
    
    const nextNodeData = gameData.nodes[nextNode]
    if (nextNodeData?.isEnding) {
      const elapsedTime = Date.now() - startTime
      trackGameComplete(candidateKey, nextNode, choiceHistory.length + 1, elapsedTime)
    }
  }

  const handleBackToMenu = () => {
    navigate('/')
  }

  const handlePlayAgain = () => {
    setGameStarted(false)
    setCurrentNode(gameData.startNode)
    setChoiceHistory([])
    setStartTime(null)
    navigate(`/${candidateKey}`)
  }

  const handleBackFromIntro = () => {
    navigate('/')
  }

  const handleBackFromGame = () => {
    setGameStarted(false)
    setCurrentNode(gameData.startNode)
    setChoiceHistory([])
    setStartTime(null)
  }

  if (loading || !currentNode) {
    return <LoadingSpinner message="Loading campaign data..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  const currentNodeData = gameData.nodes[currentNode]
  
  if (!currentNodeData) {
    return <ErrorMessage message="Game node not found" />
  }

  // Show intro screen if game hasn't started
  if (!gameStarted) {
    return (
      <IntroScreen 
        candidateName={GAME_DATA_CONFIG[candidateKey].name}
        onBack={handleBackFromIntro}
        onStart={handleStartGame}
      />
    )
  }

  // Show result screen if at end node
  if (currentNodeData.isEnding) {
    const elapsedTime = startTime ? Date.now() - startTime : 0
    return (
      <ResultScreen 
        nodeData={currentNodeData}
        candidateKey={candidateKey}
        choiceHistory={choiceHistory}
        elapsedTime={elapsedTime}
        onBackToMenu={handleBackToMenu}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  // Show gameplay screen
  return (
    <GameplayScreen 
      currentNode={currentNodeData}
      choiceHistory={choiceHistory}
      onChoice={handleChoice}
      onBack={handleBackFromGame}
    />
  )
}

export default CandidateGame
