import { useState, useMemo } from 'react'
import type { OptionType } from '../model/type'

export function useSelectMenu(options: OptionType[], searchable: boolean) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase()
    return !searchable || !query
      ? options
      : options.filter(opt => opt.name.toLowerCase().includes(query))
  }, [search, options, searchable])

  const longestOption = useMemo(() => {
    return options.reduce((a, b) => (a.name.length > b.name.length ? a : b), { name: '' }).name
  }, [options])

  return {
    isOpen,
    setIsOpen,
    search,
    toggleOpen: () => setIsOpen(prev => !prev),
    setSearch,
    filteredOptions,
    longestOption,
  }
}
