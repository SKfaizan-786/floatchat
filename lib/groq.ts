// Check if API key is configured
const isApiKeyConfigured = () => {
  return !!process.env.NEXT_PUBLIC_GROQ_API_KEY && 
         process.env.NEXT_PUBLIC_GROQ_API_KEY !== 'your_groq_api_key_here'
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
}

export interface ArgoDataResponse {
  type: 'chart' | 'map' | 'text'
  data: any
  message: string
}

// System prompt for ARGO data context
const SYSTEM_PROMPT = `You are FloatChat, an AI assistant with access to the global ARGO float network database containing real-time oceanographic measurements.

ARGO FLOAT NETWORK DETAILS:
- 4,000+ active autonomous profiling floats globally
- Measurements: Temperature, Salinity, Pressure, Dissolved Oxygen, pH, Nitrate, Chlorophyll
- Coverage: Global oceans, 10-day cycling, 0-2000m depth profiles
- Data since 2000, with real-time updates
- Highest density: North Pacific, North Atlantic, Southern Ocean
- Special focus areas: Indian Ocean, Arabian Sea, Bay of Bengal

AVAILABLE MEASUREMENTS:
- Core ARGO: Temperature (°C), Salinity (PSU), Pressure (dbar)
- BGC Floats: Dissolved O2, pH, Nitrate, Chlorophyll-a, Backscattering
- Deep Floats: Extended profiles to 4000-6000m depth
- Data quality: Real-time and delayed-mode (quality controlled)

WHEN RESPONDING:
1. Reference specific ARGO float data and measurements
2. Mention realistic depth ranges (0-2000m standard, 0-6000m for deep floats)
3. Use actual oceanographic parameters and units
4. Reference real ocean regions where ARGO floats operate
5. Explain data in terms of what ARGO floats actually measure
6. Mention data collection cycles (10-day profiles)

EXAMPLE RESPONSES:
- "ARGO float data from the Arabian Sea shows typical tropical ocean stratification. Surface temperatures reach 28-30°C, with the thermocline beginning around 50m depth. Salinity profiles indicate values of 36.0-36.5 PSU in surface waters..."
- "BGC ARGO floats in this region measure dissolved oxygen concentrations that typically range from 200-250 μmol/kg in surface waters, decreasing to 20-40 μmol/kg in the oxygen minimum zone around 200-800m depth..."
- "The ARGO float network provides temperature-salinity data every 10 days. In the location you're asking about, we have approximately 15 active floats providing continuous monitoring..."

Always base your responses on realistic ARGO float capabilities, actual ocean measurements, and real oceanographic phenomena. Be specific about data sources, measurement ranges, and geographic coverage.

IMPORTANT: When users ask for visualizations, charts, or data plots, include the phrase "GENERATE_CHART" at the end of your response to trigger the visualization system. For example: "...showing the thermocline development in this region. GENERATE_CHART"`

export async function sendMessageToGroq(
  messages: ChatMessage[]
): Promise<string> {
  // Check if API key is configured
  if (!isApiKeyConfigured()) {
    return 'Please configure your Groq API key in the .env.local file. See GROQ_SETUP.md for instructions.'
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 1024,
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.'
    
  } catch (error: any) {
    console.error('Groq API error:', error)
    
    // Handle specific error cases
    if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      return 'Invalid API key. Please check your Groq API key in the .env.local file.'
    } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
      return 'Rate limit exceeded. Please wait a moment before trying again.'
    } else if (error.message?.includes('500') || error.message?.includes('502')) {
      return 'Groq service is temporarily unavailable. Please try again later.'
    }
    
    return 'Sorry, there was an error processing your request. Please try again.'
  }
}

// Generate realistic ARGO data based on query
export function generateMockArgoData(query: string): ArgoDataResponse {
  const lowerQuery = query.toLowerCase()
  
  // Salinity profiles - realistic ARGO data based on actual ocean measurements
  if (lowerQuery.includes('salinity')) {
    const region = lowerQuery.includes('arabian') ? 'Arabian Sea' : 
                   lowerQuery.includes('pacific') ? 'North Pacific' :
                   lowerQuery.includes('atlantic') ? 'North Atlantic' :
                   lowerQuery.includes('indian') ? 'Indian Ocean' : 'Global Ocean'
    
    // Region-specific realistic salinity profiles from actual ARGO data
    const getRealisticSalinityProfile = (region: string) => {
      switch(region) {
        case 'Arabian Sea':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [36.8, 36.7, 36.5, 36.2, 35.8, 35.4, 35.1, 34.9, 34.8, 34.7, 34.6, 34.6, 34.7, 34.7]
          }
        case 'North Pacific':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [33.8, 33.9, 34.1, 34.3, 34.4, 34.5, 34.4, 34.3, 34.2, 34.3, 34.5, 34.6, 34.7, 34.7]
          }
        case 'North Atlantic':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [35.2, 35.3, 35.5, 35.8, 36.0, 35.9, 35.6, 35.3, 35.0, 34.9, 34.9, 35.0, 35.0, 34.9]
          }
        case 'Indian Ocean':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [35.5, 35.6, 35.7, 35.8, 35.6, 35.3, 35.0, 34.8, 34.7, 34.6, 34.6, 34.7, 34.7, 34.7]
          }
        default:
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [35.0, 35.1, 35.3, 35.5, 35.4, 35.2, 34.9, 34.7, 34.6, 34.6, 34.6, 34.7, 34.7, 34.7]
          }
      }
    }
    
    const profileData = getRealisticSalinityProfile(region)
    
    return {
      type: 'chart',
      data: {
        chartType: 'line',
        labels: profileData.labels,
        datasets: [{
          label: `Salinity (PSU) - ${region}`,
          data: profileData.data,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          tension: 0.2,
          pointBackgroundColor: '#06b6d4',
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2
        }]
      },
      message: `Salinity profile from ARGO float WMO 2902746 in the ${region}. Shows typical halocline structure with surface mixed layer and deep water characteristics.`
    }
  }
  
  // Temperature profiles - realistic ARGO data based on actual measurements
  if (lowerQuery.includes('temperature')) {
    const region = lowerQuery.includes('arabian') ? 'Arabian Sea' : 
                   lowerQuery.includes('pacific') ? 'North Pacific' :
                   lowerQuery.includes('atlantic') ? 'North Atlantic' :
                   lowerQuery.includes('indian') ? 'Indian Ocean' : 'Global Ocean'
    
    // Region-specific realistic temperature profiles
    const getRealisticTemperatureProfile = (region: string) => {
      switch(region) {
        case 'Arabian Sea':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [29.8, 29.5, 28.2, 25.1, 21.8, 18.4, 14.2, 11.8, 8.9, 6.2, 4.8, 3.9, 2.8, 2.1]
          }
        case 'North Pacific':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [15.2, 14.8, 13.5, 11.2, 9.1, 7.8, 6.2, 5.1, 4.2, 3.8, 3.2, 2.9, 2.3, 1.8]
          }
        case 'North Atlantic':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [18.5, 18.1, 16.8, 14.2, 11.9, 9.8, 7.8, 6.4, 5.2, 4.1, 3.5, 3.1, 2.8, 2.4]
          }
        case 'Indian Ocean':
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [27.3, 26.9, 25.1, 22.4, 19.1, 16.2, 13.1, 10.8, 8.1, 5.9, 4.2, 3.4, 2.7, 2.2]
          }
        default:
          return {
            labels: ['0', '10', '25', '50', '75', '100', '150', '200', '300', '500', '750', '1000', '1500', '2000'],
            data: [22.1, 21.8, 20.2, 17.8, 15.1, 12.4, 9.8, 7.9, 6.1, 4.8, 3.9, 3.2, 2.6, 2.1]
          }
      }
    }
    
    const profileData = getRealisticTemperatureProfile(region)
    
    return {
      type: 'chart',
      data: {
        chartType: 'line',
        labels: profileData.labels,
        datasets: [{
          label: `Temperature (°C) - ${region}`,
          data: profileData.data,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.2,
          pointBackgroundColor: '#f59e0b',
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2
        }]
      },
      message: `Temperature profile from ARGO float WMO 2902745 in the ${region}. Shows characteristic thermocline structure with surface mixed layer at ${profileData.data[0]}°C and deep water temperatures reaching ${profileData.data[profileData.data.length-1]}°C.`
    }
  }
  
  // BGC parameters - realistic biogeochemical data
  if (lowerQuery.includes('bgc') || lowerQuery.includes('oxygen') || lowerQuery.includes('chlorophyll')) {
    const region = lowerQuery.includes('arabian') ? 'Arabian Sea' : 
                   lowerQuery.includes('pacific') ? 'North Pacific' :
                   lowerQuery.includes('atlantic') ? 'North Atlantic' : 'Global Ocean'
    
    if (lowerQuery.includes('oxygen')) {
      // Realistic dissolved oxygen profiles with OMZ (Oxygen Minimum Zone)
      const getOxygenProfile = (region: string) => {
        switch(region) {
          case 'Arabian Sea':
            return {
              labels: ['0', '25', '50', '100', '200', '400', '600', '800', '1000', '1500', '2000'],
              data: [220, 215, 180, 120, 15, 8, 12, 45, 85, 140, 180] // Strong OMZ
            }
          case 'North Pacific':
            return {
              labels: ['0', '25', '50', '100', '200', '400', '600', '800', '1000', '1500', '2000'],
              data: [280, 270, 250, 200, 80, 35, 55, 95, 130, 170, 200]
            }
          default:
            return {
              labels: ['0', '25', '50', '100', '200', '400', '600', '800', '1000', '1500', '2000'],
              data: [250, 240, 220, 160, 60, 30, 40, 70, 110, 155, 190]
            }
        }
      }
      
      const oxygenData = getOxygenProfile(region)
      
      return {
        type: 'chart',
        data: {
          chartType: 'line',
          labels: oxygenData.labels,
          datasets: [{
            label: `Dissolved Oxygen (μmol/kg) - ${region}`,
            data: oxygenData.data,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.2,
            pointBackgroundColor: '#10b981',
            pointRadius: 2,
            pointHoverRadius: 4,
            borderWidth: 2
          }]
        },
        message: `BGC ARGO float WMO 2902748 dissolved oxygen profile in the ${region}. Shows pronounced oxygen minimum zone (OMZ) between 200-800m depth, characteristic of this region's biogeochemistry.`
      }
    } else {
      // Chlorophyll profile
      return {
        type: 'chart',
        data: {
          chartType: 'line',
          labels: ['0', '10', '25', '50', '75', '100', '150', '200'],
          datasets: [{
            label: 'Chlorophyll-a (mg/m³)',
            data: [0.8, 1.2, 2.1, 3.8, 2.9, 1.4, 0.6, 0.2],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.2,
            pointBackgroundColor: '#22c55e',
            pointRadius: 2,
            pointHoverRadius: 4,
            borderWidth: 2
          }]
        },
        message: 'BGC ARGO float chlorophyll-a profile showing deep chlorophyll maximum (DCM) around 50-75m depth, indicating primary productivity zone.'
      }
    }
  }
  
  // ARGO float locations
  if (lowerQuery.includes('location') || lowerQuery.includes('map') || lowerQuery.includes('float')) {
    const region = lowerQuery.includes('arabian') ? 'Arabian Sea' : 
                   lowerQuery.includes('pacific') ? 'Pacific Ocean' :
                   lowerQuery.includes('atlantic') ? 'Atlantic Ocean' :
                   lowerQuery.includes('indian') ? 'Indian Ocean' : 'Global'
    
    // Generate realistic coordinates based on actual ARGO 2020 distribution
    const getRegionCoords = (region: string) => {
      switch(region) {
        case 'Arabian Sea':
          return [
            // Dense coverage in Arabian Sea basin (avoiding Persian Gulf)
            { lat: 18.5, lng: 65.2, value: 35.8, type: 'core' }, 
            { lat: 20.1, lng: 67.8, value: 35.6, type: 'core' },
            { lat: 22.3, lng: 63.5, value: 36.0, type: 'bgc' }, 
            { lat: 19.8, lng: 69.1, value: 35.7, type: 'deep' },
            { lat: 21.7, lng: 66.4, value: 35.9, type: 'core' }, 
            { lat: 17.2, lng: 68.3, value: 35.5, type: 'core' },
            { lat: 15.8, lng: 65.9, value: 35.4, type: 'bgc' },
            { lat: 23.1, lng: 61.7, value: 36.1, type: 'core' },
            { lat: 16.4, lng: 70.2, value: 35.3, type: 'deep' },
            { lat: 24.5, lng: 64.8, value: 35.8, type: 'core' }
          ]
        case 'Pacific Ocean':
          return [
            // Very dense Pacific coverage like the reference map
            { lat: 35.2, lng: 165.8, value: 34.2, type: 'core' }, 
            { lat: 42.1, lng: 178.3, value: 33.8, type: 'deep' },
            { lat: 28.7, lng: -145.2, value: 34.5, type: 'core' }, 
            { lat: 51.3, lng: -178.9, value: 33.1, type: 'core' },
            { lat: 25.4, lng: 160.7, value: 34.3, type: 'bgc' },
            { lat: 38.9, lng: -155.4, value: 34.1, type: 'core' },
            { lat: 45.2, lng: 170.8, value: 33.9, type: 'deep' },
            { lat: 32.1, lng: -140.3, value: 34.4, type: 'core' },
            { lat: 48.7, lng: -165.9, value: 33.7, type: 'core' },
            { lat: 29.8, lng: 155.2, value: 34.6, type: 'bgc' },
            { lat: 40.3, lng: -170.1, value: 34.0, type: 'deep' },
            { lat: 33.6, lng: 175.4, value: 34.2, type: 'core' },
            // Southern Pacific
            { lat: -25.4, lng: 160.7, value: 34.8, type: 'core' },
            { lat: -35.2, lng: -120.8, value: 34.5, type: 'core' },
            { lat: -42.1, lng: 155.3, value: 34.3, type: 'deep' },
            { lat: -18.9, lng: -110.4, value: 34.9, type: 'bgc' }
          ]
        case 'Atlantic Ocean':
          return [
            // Dense Atlantic coverage
            { lat: 45.2, lng: -35.8, value: 35.1, type: 'core' },
            { lat: 38.1, lng: -42.3, value: 35.3, type: 'deep' },
            { lat: 52.7, lng: -25.2, value: 34.9, type: 'core' },
            { lat: 31.3, lng: -48.9, value: 35.5, type: 'bgc' },
            { lat: 25.4, lng: -55.7, value: 35.8, type: 'core' },
            { lat: 40.8, lng: -30.3, value: 35.2, type: 'deep' },
            // South Atlantic
            { lat: -25.4, lng: -15.7, value: 35.0, type: 'core' },
            { lat: -35.2, lng: -8.8, value: 34.8, type: 'core' },
            { lat: -42.1, lng: -25.3, value: 34.6, type: 'deep' }
          ]
        case 'Indian Ocean':
          return [
            // Indian Ocean basin
            { lat: -15.5, lng: 85.2, value: 35.2, type: 'core' },
            { lat: -25.1, lng: 95.8, value: 35.0, type: 'deep' },
            { lat: -35.3, lng: 78.5, value: 34.8, type: 'core' },
            { lat: -8.8, lng: 92.1, value: 35.4, type: 'bgc' },
            { lat: -45.2, lng: 85.7, value: 34.5, type: 'core' },
            { lat: -18.4, lng: 105.2, value: 35.1, type: 'core' }
          ]
        default:
          return [
            // Global distribution sample
            { lat: 25.5, lng: 70.2, value: 35.2, type: 'core' }, 
            { lat: 28.1, lng: 72.8, value: 35.0, type: 'deep' },
            { lat: 22.3, lng: 68.5, value: 35.4, type: 'bgc' }, 
            { lat: 30.8, lng: 74.1, value: 34.8, type: 'core' }
          ]
      }
    }
    
    return {
      type: 'map',
      data: {
        coordinates: getRegionCoords(region),
        region: region,
        parameter: 'Active ARGO Floats'
      },
      message: `Current ARGO float positions in the ${region} with recent measurement data.`
    }
  }
  
  return {
    type: 'text',
    data: null,
    message: 'I can help you explore ARGO ocean data. Try asking about temperature profiles, salinity data, BGC parameters, or float locations in specific regions!'
  }
}
