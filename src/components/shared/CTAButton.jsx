import React, { useState } from 'react'

const CTAButton = ({ 
  children, 
  onClick, 
  icon, 
  className = '',
  variant = 'primary', // primary, secondary
  ...props 
}) => {
  const [pressed, setPressed] = useState(false)

  const variants = {
    primary: {
      bg: 'bg-[#fffdf8]',
      text: 'text-gray-900',
      border: 'border-[#111827]',
      shadow: 'bg-[#111827]'
    },
    secondary: {
      bg: 'bg-white',
      text: 'text-black',
      border: 'border-[#111827]',
      shadow: 'bg-gray-300'
    }
  }

  const variantStyles = variants[variant] || variants.primary

  const handleClick = (e) => {
    // Set pressed state immediately to show animation
    setPressed(true)
    
    // Reset pressed state after animation completes
    setTimeout(() => {
      setPressed(false)
    }, 150)
    
    // Call onClick after delay
    if (onClick) {
      setTimeout(() => {
        onClick(e)
      }, 400)
    }
  }

  return (
    <div className={`relative ${className}`} style={{ paddingRight: '10px', paddingBottom: '10px' }}>
      <div
        aria-hidden
        className={`absolute top-0 left-0 right-3 bottom-3 rounded-xl ${variantStyles.shadow} ${variantStyles.border}`}
        style={{ 
          transform: "translate(6px, 6px)",
          transition: "none"
        }}
      />
      <button
        type="button"
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPressed(true) }}
        onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') setPressed(false) }}
        className={`relative w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 font-semibold text-xs xs:text-sm sm:text-base md:text-lg whitespace-nowrap ${variantStyles.bg} ${variantStyles.text} ${variantStyles.border} flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 transition-transform duration-150 ease-out ${pressed ? 'translate-x-1.5 translate-y-1.5' : ''}`}
        style={{ 
          zIndex: 10 
        }}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="material-icons text-xs xs:text-sm sm:text-base">{icon}</span>}
        <span className="pointer-events-none">{children}</span>
      </button>
    </div>
  )
}

export default CTAButton
