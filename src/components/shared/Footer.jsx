import React from 'react'

const Footer = () => {
  return (
    <footer className="px-3 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-5 bg-zinc-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 ">
          <h3 className="text-sm sm:text-lg md:text-xl lg:text-sm xl:text-sm font-base text-zinc-400">Disclaimer: This is a simulated game created for entertainment purposes related to the Bihar elections. All politicians, scenarios and outcomes depicted are for the purpose of the game only. They should not be construed as political commentary or endorsement of a particular party or politician in any way.</h3>
        </div>
      </div>
    </footer>
  )
}

export default Footer