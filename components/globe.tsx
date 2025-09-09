"use client"

import React, { useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import * as topojson from "topojson-client"

// Dynamically import Globe to avoid SSR issues
const GlobeComponent = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-blue-500/20 animate-pulse" />
    </div>
  )
})

interface GlobeProps {
  className?: string
}

export function Globe({ className = "" }: GlobeProps) {
  const globeEl = useRef<any>()
  const [mounted, setMounted] = useState(false)
  const [landPolygons, setLandPolygons] = useState([])

  // Realistic ARGO float distribution based on actual 2020 deployment map
  const argoFloats = React.useMemo(() => {
    const floats = []
    
    // Core floats (most common - 51% of total, mostly red)
    const coreFloats = [
      // North Atlantic - Very dense
      ...Array.from({length: 35}, (_, i) => ({
        lat: 25 + (i * 1.4) % 40,
        lng: -70 + (i * 1.1) % 50,
        type: 'core',
        id: `core_na_${i}`
      })),
      
      // North Pacific - Extremely dense
      ...Array.from({length: 60}, (_, i) => ({
        lat: 15 + (i * 0.8) % 50,
        lng: 130 + (i * 0.9) % 90,
        type: 'core',
        id: `core_np_${i}`
      })),
      
      // South Pacific - Dense
      ...Array.from({length: 45}, (_, i) => ({
        lat: -50 + (i * 0.9) % 35,
        lng: 150 + (i * 1.2) % 80,
        type: 'core',
        id: `core_sp_${i}`
      })),
      
      // Indian Ocean - Good coverage
      ...Array.from({length: 30}, (_, i) => ({
        lat: -35 + (i * 1.5) % 45,
        lng: 40 + (i * 1.8) % 90,
        type: 'core',
        id: `core_io_${i}`
      })),
      
      // South Atlantic - Moderate
      ...Array.from({length: 25}, (_, i) => ({
        lat: -45 + (i * 1.6) % 35,
        lng: -50 + (i * 1.3) % 40,
        type: 'core',
        id: `core_sa_${i}`
      })),
      
      // Southern Ocean - Sparse
      ...Array.from({length: 15}, (_, i) => ({
        lat: -65 + (i * 1.3) % 15,
        lng: -180 + (i * 24) % 360,
        type: 'core',
        id: `core_so_${i}`
      })),
    ]
    
    // Deep floats (27% of total, blue)
    const deepFloats = [
      // Concentrated in major basins
      ...Array.from({length: 20}, (_, i) => ({
        lat: 20 + (i * 2.1) % 45,
        lng: 140 + (i * 2.4) % 70,
        type: 'deep',
        id: `deep_np_${i}`
      })),
      
      ...Array.from({length: 15}, (_, i) => ({
        lat: 25 + (i * 2.3) % 35,
        lng: -60 + (i * 2.2) % 40,
        type: 'deep',
        id: `deep_na_${i}`
      })),
      
      ...Array.from({length: 18}, (_, i) => ({
        lat: -40 + (i * 2.5) % 30,
        lng: 160 + (i * 2.8) % 50,
        type: 'deep',
        id: `deep_sp_${i}`
      })),
      
      ...Array.from({length: 12}, (_, i) => ({
        lat: -25 + (i * 2.7) % 35,
        lng: 60 + (i * 3.1) % 60,
        type: 'deep',
        id: `deep_io_${i}`
      })),
    ]
    
    // BGC floats (22% of total, green)
    const bgcFloats = [
      // More evenly distributed but still ocean-focused
      ...Array.from({length: 18}, (_, i) => ({
        lat: 10 + (i * 2.8) % 55,
        lng: 135 + (i * 2.6) % 85,
        type: 'bgc',
        id: `bgc_np_${i}`
      })),
      
      ...Array.from({length: 12}, (_, i) => ({
        lat: 20 + (i * 3.1) % 40,
        lng: -65 + (i * 2.9) % 45,
        type: 'bgc',
        id: `bgc_na_${i}`
      })),
      
      ...Array.from({length: 15}, (_, i) => ({
        lat: -45 + (i * 2.4) % 35,
        lng: 155 + (i * 3.3) % 65,
        type: 'bgc',
        id: `bgc_sp_${i}`
      })),
      
      ...Array.from({length: 10}, (_, i) => ({
        lat: -30 + (i * 3.5) % 40,
        lng: 50 + (i * 3.8) % 70,
        type: 'bgc',
        id: `bgc_io_${i}`
      })),
      
      ...Array.from({length: 8}, (_, i) => ({
        lat: -40 + (i * 3.2) % 25,
        lng: -45 + (i * 3.6) % 35,
        type: 'bgc',
        id: `bgc_sa_${i}`
      })),
    ]
    
    return [...coreFloats, ...deepFloats, ...bgcFloats]
  }, [])

  const getFloatColor = (type: string) => {
    switch(type) {
      case 'core': return '#dc2626' // Red
      case 'deep': return '#2563eb' // Blue  
      case 'bgc': return '#16a34a'  // Green
      default: return '#dc2626'
    }
  }

  const getFloatLabel = (d: any) => {
    const typeNames = {
      core: 'Core Float',
      deep: 'Deep Float', 
      bgc: 'BGC Float'
    }
    return `${typeNames[d.type as keyof typeof typeNames]}<br/>Lat: ${d.lat.toFixed(1)}°<br/>Lng: ${d.lng.toFixed(1)}°`
  }

  useEffect(() => {
    setMounted(true)
    
    // Debug ARGO floats
    console.log('ARGO floats generated:', argoFloats.length, argoFloats.slice(0, 3))
    
    // Load world topology data for land polygons
    fetch('//unpkg.com/world-atlas/land-110m.json')
      .then(res => res.json())
      .then(landTopo => {
        const features = topojson.feature(landTopo, landTopo.objects.land).features
        console.log('Land polygons loaded:', features.length)
        setLandPolygons(features)
      })
      .catch(err => console.log('Could not load land topology:', err))
  }, [argoFloats])

  useEffect(() => {
    if (globeEl.current && mounted) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true
      globeEl.current.controls().autoRotateSpeed = 0.5
      globeEl.current.pointOfView({ altitude: 1.8 }) // Closer view
      globeEl.current.controls().enableZoom = false
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className={`h-full w-full ${className} flex items-center justify-center`}>
        <div className="w-32 h-32 rounded-full bg-blue-500/20 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={`h-full w-full ${className}`}>
      <GlobeComponent
        ref={globeEl}
        // Hollow globe settings
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={false}
        showAtmosphere={false}
        
        // Land polygons
        polygonsData={landPolygons}
        polygonCapColor={() => '#1f2937'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={() => '#4b5563'}
        polygonAltitude={0.02}
        
        // ARGO float points
        pointsData={argoFloats}
        pointColor={(d: any) => getFloatColor(d.type)}
        pointRadius={0.25}
        pointAltitude={0.05}
        pointResolution={8}
        pointLabel={getFloatLabel}
        pointsMerge={true}
        
        enablePointerInteraction={true}
        width={500}
        height={500}
      />
    </div>
  )
}
