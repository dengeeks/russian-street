'use client'
import { useCallback, useEffect, useState } from 'react'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

export function useMobileDetection(breakpoint = 768) {
  const { serverIsMobile } = useGlobalData()

  // Инициализируем из serverIsMobile, но дальше слушаем только resize
  const [isMobile, setIsMobile] = useState(serverIsMobile)

  const handleResize = useCallback(() => {
    const next = window.innerWidth <= breakpoint
    setIsMobile(prev => (prev !== next ? next : prev))
  }, [breakpoint])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return isMobile
}
