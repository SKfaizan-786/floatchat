"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FloatingElementProps {
  className?: string
  delay?: number
  duration?: number
  children: React.ReactNode
}

export function FloatingElement({ 
  className = "", 
  delay = 0, 
  duration = 3,
  children 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function OceanParticles() {
  const { scrollY } = useScrollAnimation()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const particles = React.useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({ // Reduced from 20 to 8
      id: i,
      size: (i * 0.4) % 6 + 3, // Smaller particles
      x: (i * 12.5) % 100, // More spread out
      y: (i * 15.7) % 100,
      duration: 6, // Fixed duration for all
      delay: i * 0.5, // Simpler delay pattern
    })), []
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/10 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20">
      <svg
        className="relative block w-[calc(100%+1.3px)] h-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="currentColor"
          className="text-blue-500/30"
          animate={{
            d: [
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              "M321.39,66.44c58-5.79,114.16-25.13,172-36.86,82.39-11.72,168.19-12.73,250.45,4.39C823.78,41,906.67,82,985.66,102.83c70.05,23.48,146.53,31.09,214.34,8V0H0V37.35A600.21,600.21,0,0,0,321.39,66.44Z",
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

export function DataVisualization() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const bars = React.useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      height: (i * 7.5) % 60 + 20, // Deterministic height
      delay: i * 0.1,
    })), []
  )

  if (!mounted) {
    return <div className="h-20" /> // Placeholder to maintain layout
  }

  return (
    <div className="flex items-end justify-center space-x-2 h-20">
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="bg-blue-400/60 rounded-t w-4"
          initial={{ height: 0 }}
          animate={{ height: bar.height }}
          transition={{
            duration: 1.5,
            delay: bar.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
