"use client"

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import('./leaflet-map-client'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-blue-300 text-sm">Loading ARGO Network Map...</p>
      </div>
    </div>
  )
})

interface LeafletArgoMapProps {
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

export function LeafletArgoMap({ data }: LeafletArgoMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-blue-300 text-sm">Loading ARGO Network Map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <LeafletMap data={data} />
    </div>
  )
}
