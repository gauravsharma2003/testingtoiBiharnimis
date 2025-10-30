import React, { useRef, useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

const ShareCard = ({ nodeData, candidateKey }) => {
  const cardRef = useRef(null)
  const hasSharedRef = useRef(false)
  const [isSharing, setIsSharing] = useState(false)

  const resultMatch = nodeData.text.match(/^(VICTORY!|DEFEAT|NARROW VICTORY|LANDSLIDE VICTORY|NARROW DEFEAT|PYRRHIC VICTORY)/)
  const result = resultMatch ? resultMatch[1] : 'RESULT'
  const resultDescription = nodeData.text.replace(/^[A-Z ]+!\s*/, '')

  useEffect(() => {
    // Prevent multiple shares
    if (hasSharedRef.current || isSharing) return
    
    // Automatically trigger share when component mounts
    const shareCard = async () => {
      hasSharedRef.current = true
      setIsSharing(true)
      
      const element = cardRef.current
      if (!element) {
        setIsSharing(false)
        return
      }

      try {
        // Wait a moment for images to load
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          useCORS: true
        })
        
        const blob = await (await fetch(canvas.toDataURL('image/png'))).blob()
        const file = new File([blob], 'TOISimGame.png', { type: 'image/png' })

        const shareText = `I just completed the Bihar Election simulation as ${candidateKey}!\n\n${result}\n\nCheck out my result and try it yourself!\nhttps://timesofindia.indiatimes.com/elections/assembly-elections/bihar/simulation-room/`

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'TOI Bihar Election Simulation',
            text: shareText,
            files: [file]
          })
          console.log('Shared successfully!')
        } else {
          alert('Sharing not supported on this browser/device.')
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error)
          alert('Share failed: ' + error.message)
        }
      } finally {
        setIsSharing(false)
      }
    }

    shareCard()
  }, [candidateKey, nodeData, result, isSharing])

  // Hidden card that will be captured (smaller dimensions)
  return (
    <div 
      ref={cardRef}
      className="fixed -left-[9999px] bg-white"
      style={{ width: '400px' }}
      aria-hidden="true"
    >
      {/* Header Image */}
      <div className="w-full">
        <img 
          src="/election_header.jpeg" 
          alt="Bihar Election Header"
          className="w-full h-auto"
          crossOrigin="anonymous"
        />
      </div>

      {/* Result Section */}
      <div className="px-6 py-4 text-center" style={{ backgroundColor: '#ffffff' }}>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>
          {result}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
          {resultDescription}
        </p>
      </div>

      {/* Final Statistics */}
      {nodeData.stats && (
        <div className="px-6 py-4" style={{ backgroundColor: '#f9fafb' }}>
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: '#111827' }}>
            <span className="material-icons text-base">analytics</span>
            Final Statistics
          </h4>
          <div className="space-y-2">
            {Object.entries(nodeData.stats).map(([key, value]) => (
              <div 
                key={key} 
                className="flex justify-between items-center p-2 rounded-lg"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
              >
                <span className="text-xs font-medium" style={{ color: '#4b5563' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="text-xs font-bold" style={{ color: '#111827' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Banner Image */}
      <div className="w-full">
        <img 
          src="/election_banner.jpeg" 
          alt="Bihar Election Banner"
          className="w-full h-auto"
          crossOrigin="anonymous"
        />
      </div>

      {/* Call to Action */}
      <div className="px-6 py-4 text-center" style={{ backgroundColor: '#ffffff' }}>
        <p className="text-sm font-medium" style={{ color: '#374151' }}>
          Play the Bihar Election Simulation and test your political strategy!
        </p>
      </div>
    </div>
  )
}

export default ShareCard
