import { useState, useEffect, useCallback, useRef } from 'react'

export type Option = {
  id: string
  name: string
}

export function useFormSelect(options: Option[], onBlur?: () => void) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const sortedOptions = [...options].sort((a, b) =>
    a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' })
  )

  const filteredOptions = sortedOptions.filter(opt =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setOpen(false)
      onBlur?.()
    }
  }, [onBlur])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const toggleOpen = () => {
    setOpen(prev => {
      const newState = !prev
      if (!newState) setSearch('')
      return newState
    })
  }

  const handleSelect = (id: string, onChange?: (value: string) => void) => {
    onChange?.(id)
    setOpen(false)
  }

  return {
    open,
    search,
    setSearch,
    filteredOptions,
    containerRef,
    toggleOpen,
    handleSelect,
  }
}
