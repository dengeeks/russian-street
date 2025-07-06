'use client'
import './SelectMenu.css'
import Icon from '@/shared/icon'
import { useSelectMenuController, useSelectMenu } from '../model'
import type { SelectMenuProps } from '../model/type'
import useClickOutside from '@/shared/hooks/useClickOutside'

const SelectMenu = ({ options, onChange, searchable = false, placeholder, value }: SelectMenuProps) => {
  const { isOpen, search, setSearch, setIsOpen, filteredOptions, longestOption, toggleOpen } = useSelectMenu(options, searchable)
  const {
    menuRef,
    hoveredItem,
    setHoveredItem,
    getSelectedLabel,
    handleMouseEnter
  } = useSelectMenuController(options, value, placeholder)


  const onOptionClick = (id: string) => {
    onChange?.(id)
    setHoveredItem(null)
    setIsOpen(false)
  }

  useClickOutside(menuRef, () => isOpen && toggleOpen())

  return (
    <div className={`select-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
      <div className="select-menu__width-helper">{longestOption}</div>
      <div className="select-menu__selected" onClick={toggleOpen}>
        <span className="select-menu__selected-text">{getSelectedLabel()}</span>
        <Icon icon="chevron" width={20} height={20} className={isOpen ? 'bottom' : ''} />
      </div>

      {isOpen && (
        <ul className="select-menu__list">
          {searchable && (
            <li className="select-search">
              <Icon icon="search" width={24} height={24} />
              <input
                type="text"
                placeholder="Поиск"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </li>
          )}

          {filteredOptions.map(data => {
            const isSelected = data.id === value

            return (
              <li
                key={data.id}
                className={`select-menu__item ${isSelected ? 'select-menu__item--selected' : ''}`}
                onClick={() => onOptionClick(data.id)}
                onMouseEnter={e => handleMouseEnter(e, data)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>{data.name}</span>
                {isSelected && <Icon icon="check" width={16} height={12} />}
              </li>
            )
          })}

          {filteredOptions.length === 0 && (
            <li className="select-menu__empty">Ничего не найдено</li>
          )}
        </ul>
      )}

      {hoveredItem && (hoveredItem.count_events !== undefined || hoveredItem.count_areas !== undefined) && (
        <div
          className="select-menu__tooltip"
          style={{
            top: hoveredItem.top,
            left: hoveredItem.left
          }}
        >
          <div className="tooltip-item tooltip-events">Событий: {hoveredItem.count_events ?? 0}</div>
          <div className="tooltip-item tooltip-areas">Площадок: {hoveredItem.count_areas ?? 0}</div>
        </div>
      )}
    </div>
  )
}

export default SelectMenu
