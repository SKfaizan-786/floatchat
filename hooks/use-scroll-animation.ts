"use client"

import { useEffect, useState, useCallback } from "react"

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    
    setScrollY(currentScrollY)
    setScrollProgress(currentScrollY / maxScroll)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Call once to set initial values
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return { scrollY, scrollProgress }
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  threshold = 0.1
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [elementRef, threshold])

  return isIntersecting
}
