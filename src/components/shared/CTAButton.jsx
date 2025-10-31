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

  return (
    <div className={`relative ${className}`} style={{ paddingRight: '10px', paddingBottom: '10px' }}>
      <div
        aria-hidden
        className={`absolute top-0 left-0 right-2.5 bottom-2.5 rounded-3xl ${variantStyles.shadow} ${variantStyles.border}`}
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
        className={`relative w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-3xl border-2 font-semibold text-sm sm:text-base md:text-lg ${variantStyles.bg} ${variantStyles.text} ${variantStyles.border} flex items-center justify-center gap-2 sm:gap-3 transition-transform duration-150 ease-out ${pressed ? 'translate-x-1.5 translate-y-1.5' : ''}`}
        style={{ 
          zIndex: 10 
        }}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="material-icons text-sm sm:text-base">{icon}</span>}
        <span className="pointer-events-none">{children}</span>
      </button>
    </div>
  )
}

export default CTAButton
