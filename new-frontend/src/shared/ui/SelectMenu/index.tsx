'use client'
import { useState } from 'react'
import './SelectMenu.css'
import Icon from '@/shared/icon'

interface SelectMenuProps {
  options: string[]
  onChange?: (value: string) => void
}

const SelectMenu = ({ options, onChange }: SelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>(options[0])

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleSelect = (option: string) => {
    setSelected(option)
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div>
      <div className={`select-menu${isOpen ? ' open' : ''}`}>
        <div className="select-menu__selected" onClick={toggleOpen}>
          {selected}
          <Icon icon="chevron" width={20} height={20} className={isOpen ? 'bottom' : ''} />
        </div>
        {isOpen && (
          <ul className="select-menu__list">
            {options.map(option => (
              <li
                key={option}
                className={`select-menu__item ${option === selected ? ' select-menu__item--selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <span>{option}</span>
                {option === selected && <Icon icon="check" width={16} height={12} />}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default SelectMenu
