"use client"

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface LeafletMapClientProps {
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

export default function LeafletMapClient({ data }: LeafletMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [0, 0],
      zoom: 2,
      zoomControl: true,
      worldCopyJump: true,
      preferCanvas: true
    })

    mapInstanceRef.current = map

    // Add tile layer with dark ocean theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    // Comprehensive ocean position validation
    const isValidOceanPosition = (lat: number, lng: number): boolean => {
      // Normalize longitude
      lng = ((lng + 180) % 360 + 360) % 360 - 180
      
      // Antarctica
      if (lat < -60) return false
      
      // Greenland
      if (lat > 60 && lat < 84 && lng > -75 && lng < -12) return false
      
      // North America
      if (lat > 25 && lat < 72 && lng > -168 && lng < -52) {
        if (lat > 54 && lng > -168 && lng < -130) return false // Alaska
        if (lat > 42 && lng > -140 && lng < -52) return false  // Canada
        if (lat > 25 && lat < 49 && lng > -125 && lng < -66) return false // USA
        if (lat > 14 && lat < 33 && lng > -118 && lng < -86) return false // Mexico
      }
      
      // South America
      if (lat > -56 && lat < 13 && lng > -82 && lng < -34) return false
      
      // Europe
      if (lat > 35 && lat < 72 && lng > -10 && lng < 40) return false
      
      // Africa
      if (lat > -35 && lat < 38 && lng > -18 && lng < 52) return false
      
      // Asia
      if (lat > 5 && lat < 78 && lng > 40 && lng < 180) {
        if (lat > 35 && lng > 40 && lng < 180) return false // Russia/Central Asia
        if (lat > 12 && lat < 42 && lng > 25 && lng < 75) return false // Middle East
        if (lat > 5 && lat < 40 && lng > 68 && lng < 145) return false // India/SE Asia
        if (lat > 18 && lat < 54 && lng > 75 && lng < 135) return false // China
      }
      
      // Australia and New Zealand
      if (lat > -45 && lat < -10 && lng > 110 && lng < 180) return false
      
      // Japan
      if (lat > 30 && lat < 46 && lng > 129 && lng < 146) return false
      
      // Philippines and Indonesia
      if (lat > -11 && lat < 21 && lng > 95 && lng < 141) return false
      
      return true
    }

    // Generate realistic global ARGO float distribution
    const generateGlobalArgoFloats = () => {
      const coreFloats: [number, number][] = []
      const deepFloats: [number, number][] = []
      const bgcFloats: [number, number][] = []
      
      // Ocean regions with different densities (matching reference map)
      const regions = [
        // Atlantic Ocean
        { bounds: [[-60, -70], [70, 20]], density: 0.8, coreRatio: 0.7 },
        // Pacific Ocean  
        { bounds: [[-60, 120], [70, -120]], density: 1.0, coreRatio: 0.65 },
        // Indian Ocean
        { bounds: [[-60, 20], [30, 120]], density: 0.7, coreRatio: 0.75 },
        // Southern Ocean
        { bounds: [[-70, -180], [-40, 180]], density: 0.6, coreRatio: 0.8 },
        // Arctic Ocean
        { bounds: [[70, -180], [85, 180]], density: 0.3, coreRatio: 0.9 }
      ]
      
      let totalCore = 0
      let totalDeep = 0
      let totalBgc = 0
      
      regions.forEach(region => {
        const floatsInRegion = Math.floor(600 * region.density) // ~3000 total
        const coreCount = Math.floor(floatsInRegion * region.coreRatio)
        const deepCount = Math.floor(floatsInRegion * 0.2)
        const bgcCount = floatsInRegion - coreCount - deepCount
        
        // Generate core floats
        for (let i = 0; i < coreCount && totalCore < 1800; i++) {
          let attempts = 0
          let lat, lng
          do {
            lat = region.bounds[0][0] + Math.random() * (region.bounds[1][0] - region.bounds[0][0])
            lng = region.bounds[0][1] + Math.random() * (region.bounds[1][1] - region.bounds[0][1])
            attempts++
          } while (!isValidOceanPosition(lat, lng) && attempts < 50)
          
          if (isValidOceanPosition(lat, lng)) {
            coreFloats.push([lat, lng])
            totalCore++
          }
        }
        
        // Generate deep floats
        for (let i = 0; i < deepCount && totalDeep < 800; i++) {
          let attempts = 0
          let lat, lng
          do {
            lat = region.bounds[0][0] + Math.random() * (region.bounds[1][0] - region.bounds[0][0])
            lng = region.bounds[0][1] + Math.random() * (region.bounds[1][1] - region.bounds[0][1])
            attempts++
          } while (!isValidOceanPosition(lat, lng) && attempts < 50)
          
          if (isValidOceanPosition(lat, lng)) {
            deepFloats.push([lat, lng])
            totalDeep++
          }
        }
        
        // Generate BGC floats
        for (let i = 0; i < bgcCount && totalBgc < 400; i++) {
          let attempts = 0
          let lat, lng
          do {
            lat = region.bounds[0][0] + Math.random() * (region.bounds[1][0] - region.bounds[0][0])
            lng = region.bounds[0][1] + Math.random() * (region.bounds[1][1] - region.bounds[0][1])
            attempts++
          } while (!isValidOceanPosition(lat, lng) && attempts < 50)
          
          if (isValidOceanPosition(lat, lng)) {
            bgcFloats.push([lat, lng])
            totalBgc++
          }
        }
      })
      
      return { coreFloats, deepFloats, bgcFloats, totalCore, totalDeep, totalBgc }
    }

    // Create custom icons
    const coreIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: #dc2626; width: 6px; height: 6px; border-radius: 50%; border: 1px solid white; box-shadow: 0 0 4px rgba(220,38,38,0.6);"></div>',
      iconSize: [8, 8],
      iconAnchor: [4, 4]
    })
    
    const deepIcon = L.divIcon({
      className: 'custom-marker', 
      html: '<div style="background-color: #2563eb; width: 6px; height: 6px; border-radius: 50%; border: 1px solid white; box-shadow: 0 0 4px rgba(37,99,235,0.6);"></div>',
      iconSize: [8, 8],
      iconAnchor: [4, 4]
    })
    
    const bgcIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: #16a34a; width: 6px; height: 6px; border-radius: 50%; border: 1px solid white; box-shadow: 0 0 4px rgba(22,163,74,0.6);"></div>',
      iconSize: [8, 8],
      iconAnchor: [4, 4]
    })

    // Generate floats
    const { coreFloats, deepFloats, bgcFloats, totalCore, totalDeep, totalBgc } = generateGlobalArgoFloats()

    // Create layer groups for different float types (without clustering for now)
    const coreFloatGroup = L.layerGroup()
    const deepFloatGroup = L.layerGroup()
    const bgcFloatGroup = L.layerGroup()

    // Add core floats
    coreFloats.forEach((position, index) => {
      const marker = L.marker(position, { icon: coreIcon })
        .bindPopup(`
          <div style="font-family: system-ui; line-height: 1.4;">
            <div style="font-weight: bold; color: #1e293b; margin-bottom: 8px;">Core Float #${index + 1}</div>
            <div><strong>Type:</strong> Core ARGO Float</div>
            <div><strong>Depth Range:</strong> 0-2000m</div>
            <div><strong>Position:</strong> ${position[0].toFixed(2)}°N, ${position[1].toFixed(2)}°E</div>
            <div><strong>Measurements:</strong> Temperature, Salinity, Pressure</div>
            <div><strong>Cycle:</strong> 10-day profiles</div>
          </div>
        `)
      coreFloatGroup.addLayer(marker)
    })
    
    // Add deep floats
    deepFloats.forEach((position, index) => {
      const marker = L.marker(position, { icon: deepIcon })
        .bindPopup(`
          <div style="font-family: system-ui; line-height: 1.4;">
            <div style="font-weight: bold; color: #1e293b; margin-bottom: 8px;">Deep Float #${index + 1}</div>
            <div><strong>Type:</strong> Deep ARGO Float</div>
            <div><strong>Depth Range:</strong> 0-4000m+</div>
            <div><strong>Position:</strong> ${position[0].toFixed(2)}°N, ${position[1].toFixed(2)}°E</div>
            <div><strong>Measurements:</strong> Extended Temperature, Salinity</div>
            <div><strong>Cycle:</strong> 10-day profiles</div>
          </div>
        `)
      deepFloatGroup.addLayer(marker)
    })
    
    // Add BGC floats
    bgcFloats.forEach((position, index) => {
      const marker = L.marker(position, { icon: bgcIcon })
        .bindPopup(`
          <div style="font-family: system-ui; line-height: 1.4;">
            <div style="font-weight: bold; color: #1e293b; margin-bottom: 8px;">BGC Float #${index + 1}</div>
            <div><strong>Type:</strong> BGC ARGO Float</div>
            <div><strong>Depth Range:</strong> 0-2000m</div>
            <div><strong>Position:</strong> ${position[0].toFixed(2)}°N, ${position[1].toFixed(2)}°E</div>
            <div><strong>Measurements:</strong> T, S, O₂, pH, NO₃, Chl-a</div>
            <div><strong>Cycle:</strong> 10-day profiles</div>
          </div>
        `)
      bgcFloatGroup.addLayer(marker)
    })

    // Add all layer groups to map
    map.addLayer(coreFloatGroup)
    map.addLayer(deepFloatGroup)
    map.addLayer(bgcFloatGroup)

    // Add layer control
    const overlays = {
      [`🔴 Core Floats (${totalCore})`]: coreFloatGroup,
      [`🔵 Deep Floats (${totalDeep})`]: deepFloatGroup,
      [`🟢 BGC Floats (${totalBgc})`]: bgcFloatGroup
    }
    
    L.control.layers(null, overlays, {
      position: 'topleft',
      collapsed: false
    }).addTo(map)

    // Add scale control
    L.control.scale({
      position: 'bottomleft',
      metric: true,
      imperial: false
    }).addTo(map)

    // Add compact info panel
    const info = L.control({ position: 'bottomright' })
    info.onAdd = function() {
      const div = L.DomUtil.create('div', 'info-panel')
      div.style.cssText = `
        background: rgba(15, 23, 42, 0.9);
        color: white;
        padding: 8px 10px;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 1px solid rgba(51, 65, 85, 0.4);
        backdrop-filter: blur(8px);
        font-family: system-ui;
        font-size: 0.75em;
        line-height: 1.3;
        max-width: 140px;
      `
      div.innerHTML = `
        <div style="color: #60a5fa; font-weight: 600; margin-bottom: 4px;">ARGO Network</div>
        <div style="color: #dc2626;">● ${totalCore} Core</div>
        <div style="color: #2563eb;">● ${totalDeep} Deep</div>
        <div style="color: #16a34a;">● ${totalBgc} BGC</div>
        <div style="color: #94a3b8; margin-top: 2px; font-size: 0.9em;">Total: ${totalCore + totalDeep + totalBgc}</div>
      `
      return div
    }
    info.addTo(map)

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
}
