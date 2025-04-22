import React from 'react'

const DashboardLoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500" />
        <p className="text-lg text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default DashboardLoadingScreen;
