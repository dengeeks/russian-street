'use client'
import { useState, useMemo } from 'react'
import './SelectWithSearch.css'
import Icon from '@/shared/icon'

interface Option {
  label: string
  value: string
}

interface SelectWithSearchProps {
  options: Option[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const SelectWithSearch = ({ options, placeholder = 'Выбрать', value, onChange }: SelectWithSearchProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    return options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
  }, [options, search])


  const handleSelect = (val: string) => {
    onChange?.(val)
    setIsOpen(false)
  }

  return (
    <div className="select-wrapper" >
      <button type="button" className="select-trigger" onClick={() => setIsOpen(prev => !prev)}>
        {placeholder}
        <Icon icon="chevron" className={isOpen ? 'bottom' : ''} />
      </button>

      {isOpen && (
        <div className="select-dropdown">
          <div className="select-search">
            <Icon icon="search" width={24} height={24}/>
            <div className="select-search-icon-group">
              <input
                type="text"
                placeholder="поиск по региону"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Icon icon="check" width={24} height={24}/>
            </div>
          </div>

          <ul className="select-options">
            {filteredOptions.map(opt => (
              <li
                key={opt.value}
                className={`select-option ${opt.value === value ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.value)}>
                {opt.label}
                {opt.value === value && <Icon icon="check" fill="#ffffff" width={24} height={24} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SelectWithSearch
