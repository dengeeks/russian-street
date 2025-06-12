'use client'
import { useCallback, useEffect, useState } from 'react'

export function useMobileDetection(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  const updateIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= breakpoint)
  }, [breakpoint])

  useEffect(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [updateIsMobile])

  return isMobile
}