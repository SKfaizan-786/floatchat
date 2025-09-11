"use client"

import React, { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RealisticArgoMapProps {
  data: {
    coordinates: Array<{
      lat: number
      lng: number
      value: number
      type?: string
    }>
    region: string
    parameter: string
  }
}

export function RealisticArgoMap({ data }: RealisticArgoMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 5))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 0.5))
  const handleReset = () => {
    setZoomLevel(1)
    setPanX(0)
    setPanY(0)
  }

  // Generate realistic global ARGO distribution like the reference map
  const generateGlobalFloats = () => {
    const floats = []
    
    // North Pacific - Very dense (like reference map)
    for (let i = 0; i < 80; i++) {
      const lat = 20 + (i * 0.7) % 40
      const lng = 140 + (i * 0.9) % 80
      const type = i % 3 === 0 ? 'core' : i % 3 === 1 ? 'deep' : 'bgc'
      floats.push({ lat, lng, type, id: `np_${i}` })
    }
    
    // South Pacific - Dense
    for (let i = 0; i < 60; i++) {
      const lat = -50 + (i * 0.8) % 35
      const lng = 150 + (i * 1.1) % 70
      const type = i % 3 === 0 ? 'core' : i % 3 === 1 ? 'deep' : 'bgc'
      floats.push({ lat, lng, type, id: `sp_${i}` })
    }
    
    // North Atlantic - Dense
    for (let i = 0; i < 50; i++) {
      const lat = 30 + (i * 0.9) % 35
      const lng = -60 + (i * 0.8) % 40
      const type = i % 3 === 0 ? 'core' : i % 3 === 1 ? 'deep' : 'bgc'
      floats.push({ lat, lng, type, id: `na_${i}` })
    }
    
    // South Atlantic - Moderate
    for (let i = 0; i < 35; i++) {
      const lat = -45 + (i * 1.1) % 30
      const lng = -30 + (i * 1.2) % 35
      const type = i % 3 === 0 ? 'core' : i % 3 === 1 ? 'deep' : 'bgc'
      floats.push({ lat, lng, type, id: `sa_${i}` })
    }
    
    // Indian Ocean - Good coverage
    for (let i = 0; i < 45; i++) {
      const lat = -35 + (i * 0.9) % 40
      const lng = 60 + (i * 1.0) % 60
      const type = i % 3 === 0 ? 'core' : i % 3 === 1 ? 'deep' : 'bgc'
      floats.push({ lat, lng, type, id: `io_${i}` })
    }
    
    // Southern Ocean - Sparse but present
    for (let i = 0; i < 25; i++) {
      const lat = -65 + (i * 0.6) % 15
      const lng = -180 + (i * 14.4) % 360
      const type = i % 3 === 0 ? 'core' : i % 3 === 1 ? 'deep' : 'bgc'
      floats.push({ lat, lng, type, id: `so_${i}` })
    }
    
    return floats
  }

  const globalFloats = generateGlobalFloats()
  
  const getFloatColor = (type: string) => {
    switch(type) {
      case 'core': return '#dc2626'  // Red
      case 'deep': return '#2563eb'  // Blue
      case 'bgc': return '#16a34a'   // Green
      default: return '#dc2626'
    }
  }

  // Convert lat/lng to SVG coordinates (Mercator-like projection)
  const latLngToXY = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800 + 50
    const y = ((90 - lat) / 180) * 400 + 50
    return { x, y }
  }

  return (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <Button size="sm" onClick={handleZoomIn} className="bg-blue-600 hover:bg-blue-700 p-2">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={handleZoomOut} className="bg-blue-600 hover:bg-blue-700 p-2">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={handleReset} className="bg-blue-600 hover:bg-blue-700 p-2">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Info Panel */}
      <div className="absolute top-4 left-4 z-30 bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 shadow-lg">
        <h4 className="text-white font-semibold text-sm">Global ARGO Network</h4>
        <p className="text-blue-200 text-xs">Active Floats: {globalFloats.length}</p>
        <p className="text-blue-300 text-xs mt-1">Zoom: {zoomLevel.toFixed(1)}x</p>
      </div>
      
      {/* Map SVG - Global view like reference */}
      <svg 
        viewBox="0 0 900 500" 
        className="w-full h-full"
      >
        <g transform={`translate(${panX}, ${panY}) scale(${zoomLevel})`}>
          {/* Ocean background */}
          <rect width="900" height="500" fill="#1e40af" />
          
          {/* Simplified continental outlines (green landmasses like reference) */}
          <g fill="#22c55e" stroke="#16a34a" strokeWidth="1">
            {/* North America */}
            <path d="M150 80 L200 75 L250 90 L280 120 L270 160 L240 180 L200 175 L160 160 L140 130 L145 100 Z" />
            
            {/* South America */}
            <path d="M200 220 L230 215 L245 240 L250 280 L240 320 L220 340 L200 335 L185 315 L190 280 L195 250 Z" />
            
            {/* Europe */}
            <path d="M420 90 L450 85 L470 95 L475 110 L470 125 L450 130 L430 125 L420 110 Z" />
            
            {/* Africa */}
            <path d="M430 140 L460 135 L475 155 L480 180 L475 210 L460 240 L440 245 L425 225 L428 195 L432 165 Z" />
            
            {/* Asia */}
            <path d="M480 80 L550 75 L600 90 L620 110 L615 140 L590 155 L560 150 L530 140 L500 120 L485 100 Z" />
            
            {/* Australia */}
            <path d="M620 240 L670 235 L690 250 L685 270 L670 275 L640 270 L625 255 Z" />
            
            {/* Greenland */}
            <path d="M350 40 L370 35 L375 50 L370 65 L355 70 L350 55 Z" />
            
            {/* Antarctica */}
            <path d="M100 420 L800 420 L800 450 L100 450 Z" />
          </g>
          
          {/* ARGO floats distributed globally like reference map */}
          {globalFloats.map((float, index) => {
            const { x, y } = latLngToXY(float.lat, float.lng)
            const color = getFloatColor(float.type)
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={color}
                opacity="0.8"
              />
            )
          })}
        </g>
      </svg>
      
      {/* Legend matching reference map */}
      <div className="absolute bottom-4 left-4 z-30 bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 shadow-lg">
        <h5 className="text-white font-semibold text-xs mb-2">ARGO 2024 Network</h5>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-xs text-blue-200">Core Floats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-xs text-blue-200">Deep Floats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-xs text-blue-200">BGC Floats</span>
          </div>
        </div>
        <p className="text-xs text-blue-300 mt-2">Total: {globalFloats.length} Floats</p>
      </div>
    </div>
  )
}
