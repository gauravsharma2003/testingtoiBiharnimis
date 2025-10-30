import React from 'react'

export const LoadingSpinner = ({ message = "Loading campaign data..." }) => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <span className="material-icons text-gray-900 text-6xl mb-4 block animate-spin">refresh</span>
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export const ErrorMessage = ({ message = "Failed to load campaign data" }) => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <span className="material-icons text-red-500 text-6xl mb-4 block">error</span>
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  )
}
