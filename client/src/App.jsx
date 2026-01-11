import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-omega-red mb-4">
          OMEGA
        </h1>
        <p className="text-xl text-gray-700 tracking-widest uppercase">
          Swiss Made Since 1848
        </p>
        <div className="mt-8 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <p className="text-sm text-gray-500">Project Setup Complete</p>
          <p className="font-mono text-xs mt-2">Client + Server Ready</p>
        </div>
      </div>
    </div>
  )
}

export default App
