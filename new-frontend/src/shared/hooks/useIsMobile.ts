'use client'
import { useEffect, useState } from 'react'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

export function useMobileDetection(breakpoint = 768) {
  const { serverIsMobile } = useGlobalData()

  // Инициализируем из serverIsMobile, но дальше слушаем только resize
  const [isMobile, setIsMobile] = useState(serverIsMobile)

  useEffect(() => {
    const handleResize = () => {
      const next = window.innerWidth <= breakpoint
      setIsMobile(prev => (prev !== next ? next : prev)) // только если изменилось
    }

    // Слушаем только после монтирования
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isMobile
}

// старый вариант
// export function useIsMobile(breakpoint = 768) {
//   const [isMobile, setIsMobile] = useState(false)
//
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth <= breakpoint)
//     check()
//     window.addEventListener('resize', check)
//     return () => window.removeEventListener('resize', check)
//   }, [breakpoint])
//
//   return isMobile
// }
