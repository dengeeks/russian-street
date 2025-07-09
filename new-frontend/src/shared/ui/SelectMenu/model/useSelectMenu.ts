import { useState, useMemo } from 'react'
import type { OptionType } from '../model/type'

export function useSelectMenu(options: OptionType[], searchable: boolean) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase()
    const sorted = [...options].sort((a, b) =>
      a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' })
    )

    return !searchable || !query
      ? sorted
      : sorted.filter(opt => opt.name.toLowerCase().includes(query))
  }, [search, options, searchable])


  const longestOption = useMemo(() => {
    return options.reduce((a, b) => (a.name.length > b.name.length ? a : b), { name: '' }).name
  }, [options])

  const toggleOpen = () => {
    setIsOpen(prev => {
      const next = !prev
      if (!next) setSearch('') // очистить поиск при закрытии
      return next
    })
  }

  return {
    isOpen,
    search,
    toggleOpen,
    setSearch,
    filteredOptions,
    longestOption,
  }
}
