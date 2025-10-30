import React from 'react'
import { FALLBACK_IMAGE } from '../../constants/gameData'
import CTAButton from './CTAButton'

const CandidateCard = ({ candidateKey, gameInfo, onSelect }) => {
  return (
    <div 
      className="bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-colors" 
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
          <img 
            src={gameInfo.image} 
            alt={gameInfo.fullName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE
            }}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{gameInfo.fullName}</h3>
        <p className="text-sm text-gray-600 mb-4">{gameInfo.subhead}</p>
        <div className="flex justify-center">
          <CTAButton 
            onClick={(e) => {
              e.stopPropagation()
              onSelect(candidateKey, gameInfo.fullName)
            }}
            icon="campaign"
          >
            START CAMPAIGN
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
