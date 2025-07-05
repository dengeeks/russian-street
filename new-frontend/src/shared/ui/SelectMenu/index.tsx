'use client'
import { useState, useRef, useMemo } from 'react'
import './SelectMenu.css'
import Icon from '@/shared/icon'
import useClickOutside from '@/shared/hooks/useClickOutside'

interface SelectMenuProps {
  options: string[];
  onChange?: (value: string) => void;
  searchable?: boolean;
  placeholder?: string;
}

const SelectMenu = ({ options, onChange, searchable = false, placeholder }: SelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(placeholder ? null : options[0] || null)
  const [search, setSearch] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setIsOpen(false))

  const toggleOpen = () => setIsOpen(prev => !prev)

  const handleSelect = (option: string) => {
    setSelected(option)
    setIsOpen(false)
    onChange?.(option)
  }

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return options
    return options.filter(option =>
      option.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, options, searchable])

  const longestOption = options.reduce((a, b) => (a.length > b.length ? a : b), '')

  return (
      <div className={`select-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="select-menu__width-helper">{longestOption}</div>
        <div className="select-menu__selected" onClick={toggleOpen}>
          {selected ?? placeholder ?? options[0]}
          <Icon icon="chevron" width={20} height={20} className={isOpen ? 'bottom' : ''} />
        </div>
        {isOpen && (
          <ul className="select-menu__list">
            {searchable && (
              <li className="select-search">
                <Icon icon="search" width={24} height={24} />
                  <input
                    type="text"
                    placeholder="Поиск по региону"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
              </li>
            )}
            {filteredOptions.map(option => (
              <li
                key={option}
                className={`select-menu__item ${option === selected ? 'select-menu__item--selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <span>{option}</span>
                {option === selected && <Icon icon="check" width={16} height={12} />}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="select-menu__empty">Ничего не найдено</li>
            )}
          </ul>
        )}
      </div>
  )
}

export default SelectMenu
