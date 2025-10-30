import React, { useState } from 'react'

const CTAButton = ({ 
  children, 
  onClick, 
  icon, 
  className = '',
  variant = 'primary', // primary, secondary
  ...props 
}) => {
  const [hovered, setHovered] = useState(false)

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
    <div className={`relative inline-block ${className}`}>
      <div
        aria-hidden
        className={`absolute inset-0 rounded-lg ${variantStyles.shadow} ${variantStyles.border}`}
        style={{ 
          transform: hovered ? "translate(10px, 10px)" : "translate(6px, 6px)",
          transition: "transform 120ms ease"
        }}
      />
      <button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={`relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg ${variantStyles.bg} ${variantStyles.text} ${variantStyles.border} flex items-center gap-2 sm:gap-3`}
        style={{ 
          transition: "transform 120ms ease", 
          transform: hovered ? "translate(6px, 6px)" : "translate(0px, 0px)", 
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
