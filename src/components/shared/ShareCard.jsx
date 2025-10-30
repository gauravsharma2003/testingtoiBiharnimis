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
    
    // Automatically trigger share when component mounts properly
    const shareCard = async () => {
      hasSharedRef.current = true
      setIsSharing(true)
      
      const element = cardRef.current
      if (!element) {
        setIsSharing(false)
        return
      }

      try {
        // Wait for images to fully load
        const images = element.querySelectorAll('img')
        await Promise.all(
          Array.from(images).map(img => {
            if (img.complete) return Promise.resolve()
            return new Promise((resolve, reject) => {
              img.onload = resolve
              img.onerror = reject
              // Set a timeout in case image fails
              setTimeout(resolve, 2000)
            })
          })
        )
        
        // Additional wait for safety
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: true,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          useCORS: true,
          allowTaint: true
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
          src="https://testingtoi-simulationroom.vercel.app/election_header.jpeg" 
          alt="Bihar Election Header"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Result Section */}
      <div className="px-6 py-4 text-center" style={{ backgroundColor: '#ffffff' }}>
        <h3 className="text-2xl mb-2" style={{ color: '#111827', fontWeight: 'bold' }}>
          {result}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#374151', fontWeight: 'normal' }}>
          {resultDescription}
        </p>
      </div>

            {/* Final Statistics */}
      {nodeData.stats && (
        <div className="py-4 flex justify-center" style={{ backgroundColor: '#f9fafb' }}>
          <div style={{ width: '85%' }}>
            <h4 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: '#111827' }}>
              <span className="material-icons text-sm">analytics</span>
              Final Statistics
            </h4>
            <div className="space-y-2">
              {Object.entries(nodeData.stats).map(([key, value]) => (
                <div 
                  key={key} 
                  className="flex justify-between items-center rounded-lg mb-2"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', padding: '6px 8px' }}
                >
                  <span className="text-xs font-medium" style={{ color: '#4b5563' }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="text-xs font-bold" style={{ color: '#111827' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Banner Image */}
      <div className="w-full">
        <img 
          src="https://testingtoi-simulationroom.vercel.app/election_banner.jpeg" 
          alt="Bihar Election Banner"
          className="w-full h-auto"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  )
}

export default ShareCard
