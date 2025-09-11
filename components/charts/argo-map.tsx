"use client"

import React, { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ArgoMapProps {
  data: {
    coordinates: Array<{
      lat: number
      lng: number
      value: number
    }>
    region: string
    parameter: string
  }
}

export function ArgoMap({ data }: ArgoMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  const getColorForValue = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min)
    const hue = (1 - normalized) * 240 // Blue to red
    return `hsl(${hue}, 70%, 50%)`
  }

  const values = data.coordinates.map(coord => coord.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 5))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 0.5))
  const handleReset = () => {
    setZoomLevel(1)
    setPanX(0)
    setPanY(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y
      setPanX(prev => prev + deltaX / zoomLevel)
      setPanY(prev => prev + deltaY / zoomLevel)
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Realistic world map coordinates for major ocean regions
  const getRealisticCoastlines = () => {
    if (data.region.includes('Arabian')) {
      return [
        // Arabian Peninsula (more realistic shape)
        "M300 80 L340 85 L360 100 L370 130 L365 160 L350 180 L330 185 L310 175 L295 155 L290 130 L295 105 Z",
        // Western India coastline
        "M250 90 L270 95 L280 110 L285 130 L280 150 L270 170 L260 185 L245 180 L235 160 L240 140 L245 120 L250 100 Z",
        // Horn of Africa
        "M180 140 L200 135 L210 145 L215 160 L210 175 L195 180 L180 175 L175 160 L178 145 Z",
        // Socotra Island
        "M320 165 L330 163 L335 168 L330 173 L320 171 Z"
      ]
    } else if (data.region.includes('Pacific')) {
      return [
        // Japan archipelago
        "M340 100 L355 95 L365 105 L370 120 L365 135 L350 140 L340 135 L335 120 L338 105 Z",
        // Philippines
        "M320 150 L335 145 L340 155 L345 170 L340 185 L325 190 L315 180 L318 165 L320 155 Z",
        // Northern Australia
        "M280 210 L340 205 L380 215 L390 230 L380 240 L340 235 L280 230 Z",
        // New Zealand
        "M380 250 L390 245 L395 255 L390 265 L380 260 Z",
        // Hawaiian Islands (small dots)
        "M150 130 L155 128 L158 133 L155 138 L150 136 Z"
      ]
    } else if (data.region.includes('Atlantic')) {
      return [
        // Eastern US coast
        "M120 80 L140 75 L145 90 L150 110 L145 130 L140 150 L130 170 L120 180 L110 160 L115 140 L118 120 L120 100 Z",
        // Western Europe
        "M200 70 L220 65 L235 75 L240 90 L235 105 L225 115 L210 110 L200 95 L202 80 Z",
        // Western Africa
        "M190 120 L205 115 L210 130 L215 150 L210 170 L205 190 L195 200 L185 185 L188 165 L190 145 L192 130 Z",
        // UK/Ireland
        "M195 60 L205 58 L208 68 L205 78 L195 76 L192 66 Z"
      ]
    } else {
      return [
        // Generic realistic coastlines
        "M100 80 L200 75 L300 85 L350 95 L380 120 L370 180 L340 220 L280 240 L200 235 L120 220 L80 180 L90 120 Z"
      ]
    }
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
        <h4 className="text-white font-semibold text-sm">{data.region}</h4>
        <p className="text-blue-200 text-xs">{data.parameter}</p>
        <p className="text-blue-300 text-xs mt-1">Zoom: {zoomLevel.toFixed(1)}x</p>
      </div>
      
      {/* Map SVG */}
      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${panX}, ${panY}) scale(${zoomLevel})`}>
          {/* Ocean background with depth gradient */}
          <defs>
            <radialGradient id="oceanGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="70%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <pattern id="waves" patternUnits="userSpaceOnUse" width="20" height="10">
              <path d="M0,5 Q5,0 10,5 T20,5" stroke="#3b82f6" strokeWidth="0.5" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          
          <rect width="400" height="300" fill="url(#oceanGradient)" />
          <rect width="400" height="300" fill="url(#waves)" opacity="0.3" />
          
          {/* Realistic coastlines */}
          {getRealisticCoastlines().map((coastline, index) => (
            <path 
              key={index}
              d={coastline}
              fill="#059669" 
              stroke="#10b981"
              strokeWidth="1"
              opacity="0.8"
            />
          ))}
          
          {/* Bathymetry lines (depth contours) */}
          <g stroke="#3b82f6" strokeWidth="0.5" fill="none" opacity="0.4">
            <ellipse cx="200" cy="150" rx="180" ry="120" />
            <ellipse cx="200" cy="150" rx="140" ry="90" />
            <ellipse cx="200" cy="150" rx="100" ry="60" />
          </g>
          
          {/* ARGO float positions scattered ONLY in ocean waters */}
          {data.coordinates.map((coord, index) => {
            // Position floats ONLY in ocean areas, completely avoiding all land
            let x, y;
            
            if (data.region.includes('Arabian')) {
              // Arabian Sea - ONLY in deep blue ocean areas (completely avoiding green landmasses)
              const safeOceanAreas = [
                { centerX: 120, centerY: 120, radius: 20 }, // Far western Arabian Sea
                { centerX: 140, centerY: 160, radius: 25 }, // Southwest of India
                { centerX: 110, centerY: 180, radius: 20 }, // Central western basin
                { centerX: 130, centerY: 220, radius: 18 }, // Southern Arabian Sea
                { centerX: 100, centerY: 140, radius: 15 }  // Western deep water
              ]
              
              const area = safeOceanAreas[index % safeOceanAreas.length]
              const angle = (index * 2.4) % (2 * Math.PI)
              const distance = (index * 3.7) % area.radius
              x = area.centerX + Math.cos(angle) * distance
              y = area.centerY + Math.sin(angle) * distance
              
            } else if (data.region.includes('Pacific')) {
              // Pacific Ocean - ONLY in open blue ocean areas (avoiding all green islands)
              const safeOceanAreas = [
                { centerX: 50, centerY: 100, radius: 30 },  // Far Eastern Pacific
                { centerX: 70, centerY: 150, radius: 35 },  // Central Eastern Pacific
                { centerX: 80, centerY: 200, radius: 40 },  // South Eastern Pacific
                { centerX: 120, centerY: 80, radius: 25 },  // North Eastern Pacific
                { centerX: 180, centerY: 120, radius: 30 }  // Central Pacific (avoiding Japan/Philippines)
              ]
              
              const area = safeOceanAreas[index % safeOceanAreas.length]
              const angle = (index * 1.8) % (2 * Math.PI)
              const distance = (index * 4.2) % area.radius
              x = area.centerX + Math.cos(angle) * distance
              y = area.centerY + Math.sin(angle) * distance
              
            } else if (data.region.includes('Atlantic')) {
              // Atlantic Ocean - mid-ocean areas (avoiding all coastlines)
              const midAtlanticAreas = [
                { centerX: 150, centerY: 100, radius: 25 }, // North Atlantic (avoiding Europe/US)
                { centerX: 160, centerY: 150, radius: 30 }, // Central Atlantic
                { centerX: 170, centerY: 200, radius: 35 }, // South Atlantic
                { centerX: 140, centerY: 180, radius: 20 }, // Mid Atlantic Ridge
                { centerX: 130, centerY: 120, radius: 18 }  // Western North Atlantic
              ]
              
              const area = midAtlanticAreas[index % midAtlanticAreas.length]
              const angle = (index * 2.1) % (2 * Math.PI)
              const distance = (index * 3.9) % area.radius
              x = area.centerX + Math.cos(angle) * distance
              y = area.centerY + Math.sin(angle) * distance
              
            } else {
              // Global distribution - ONLY in deep blue ocean areas
              const pureOceanAreas = [
                { centerX: 50, centerY: 120, radius: 25 },  // Western Atlantic
                { centerX: 80, centerY: 180, radius: 30 },  // Central Atlantic
                { centerX: 120, centerY: 140, radius: 20 }, // Western Indian Ocean
                { centerX: 60, centerY: 220, radius: 35 },  // Southern Ocean
                { centerX: 90, centerY: 100, radius: 20 }   // North Atlantic
              ]
              
              const area = pureOceanAreas[index % pureOceanAreas.length]
              const angle = (index * 2.7) % (2 * Math.PI)
              const distance = (index * 4.1) % area.radius
              x = area.centerX + Math.cos(angle) * distance
              y = area.centerY + Math.sin(angle) * distance
            }
            
            const color = getColorForValue(coord.value, minValue, maxValue)
            
            return (
              <g key={index}>
                {/* Float position with glow effect */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={color}
                  fillOpacity="0.3"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="#ffffff"
                />
                
                {/* Value label */}
                <text
                  x={x}
                  y={y - 12}
                  fill="#ffffff"
                  fontSize="9"
                  textAnchor="middle"
                  className="pointer-events-none font-medium"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                >
                  {coord.value.toFixed(1)}
                </text>
                
                {/* Float ID - smaller and positioned better */}
                <text
                  x={x + 8}
                  y={y + 2}
                  fill="#94a3b8"
                  fontSize="7"
                  className="pointer-events-none"
                >
                  F{index + 1}
                </text>
              </g>
            )
          })}
        </g>
        
        
        {/* Scale indicator */}
        <g transform="translate(10, 250)">
          <line x1="0" y1="0" x2="50" y2="0" stroke="#ffffff" strokeWidth="2" />
          <text x="25" y="15" fill="#ffffff" fontSize="10" textAnchor="middle">
            ~500 km
          </text>
        </g>
      </svg>
      
      {/* External Legend - positioned outside SVG */}
      <div className="absolute bottom-4 right-4 z-30 bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 shadow-lg">
        <h5 className="text-white font-semibold text-xs mb-2">{data.parameter}</h5>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-3 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-sm"></div>
          <span className="text-blue-200 text-xs">Value Scale</span>
        </div>
        <div className="flex justify-between text-xs text-blue-300">
          <span>{minValue.toFixed(1)}</span>
          <span>{maxValue.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
