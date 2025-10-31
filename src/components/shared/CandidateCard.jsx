import React from 'react'
import { FALLBACK_IMAGE } from '../../constants/gameData'
import CTAButton from './CTAButton'

const CandidateCard = ({ candidateKey, gameInfo, onSelect }) => {
  return (
    <div className="bg-white w-full max-w-xs mx-auto sm:w-full sm:max-w-none sm:mx-0">
      {/* Image at the top */}
      <div className="w-full h-48 rounded-t-xl overflow-hidden">
        <img 
          src={gameInfo.listingimage} 
          alt={gameInfo.fullName}
          className="w-full h-full object-contain sm:object-cover block mt-6 sm:mt-0"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE
          }}
        />
      </div>
      
      {/* Left-aligned content below */}
      <div className="p-6 border-l border-r border-b border-gray-300 rounded-b-xl w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 whitespace-nowrap truncate">{gameInfo.name}</h3>
        <p className="text-sm text-gray-800 mb-3 line-clamp-2">{gameInfo.subhead}</p>
        <hr className="border-t border-gray-300 my-3 mx-0.5" />
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{gameInfo.partyname}</p>
        <CTAButton 
          onClick={(e) => {
            e.stopPropagation()
            onSelect(candidateKey, gameInfo.fullName)
          }}
          icon="campaign"
        >
          Start Campaign
        </CTAButton>
      </div>
    </div>
  )
}

export default CandidateCard
