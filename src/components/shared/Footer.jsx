import React, { useState } from 'react'

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <footer className="px-4 py-2 bg-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Accordion */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-2"
          >
            <span className="text-xs font-medium text-zinc-600">Disclaimer</span>
            <span className="material-icons text-zinc-600 text-sm">
              {isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>
          {isExpanded && (
            <div className="pb-2">
              <p className="text-xs font-normal text-zinc-400">
                This is a simulated game created for entertainment purposes related to the Bihar elections. All politicians, scenarios and outcomes depicted are for the purpose of the game only. They should not be construed as political commentary or endorsement of a particular party or politician in any way.
              </p>
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-xs font-normal !text-zinc-400">Disclaimer: This is a simulated game created for entertainment purposes related to the Bihar elections. All politicians, scenarios and outcomes depicted are for the purpose of the game only. They should not be construed as political commentary or endorsement of a particular party or politician in any way.</h3>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer