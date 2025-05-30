import { useEffect, RefObject } from 'react'

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, onClose])
}

export default useClickOutside
