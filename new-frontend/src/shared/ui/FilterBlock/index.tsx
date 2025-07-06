'use client'
import { useState } from 'react'
import styles from './FilterBlock.module.css'
import Icon from '@/shared/icon'

type FilterItem = {
  id: string;
  name: string;
};

interface FilterBlockProps {
  title: string;
  items: FilterItem[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  showToggleAll?: boolean;
}

const FilterBlock = ({ title, items, selectedIds, onChange, showToggleAll = false }: FilterBlockProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const toggleItem = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id]

    onChange(updated)
  }

  const handleToggleAll = () => {
    setShowAll(prev => !prev)
    if (!isOpen) setIsOpen(true)
  }

  const displayedItems = showAll ? items : items.slice(0, 3)

  return (
    <div className={styles.FilterBlock}>
      <div
        className={styles.FilterBlockCheckboxRow}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        <div className={styles.FilterBlockCustomBox}>
          <Icon icon={isOpen ? 'plus' : 'minus'} width={14} height={14} />
        </div>
        <span className={styles.FilterBlockLabel}>{title}</span>
      </div>

      {isOpen && (
        <div className={styles.FilterBlockItems}>
          {displayedItems.map(item => {
            const checked = selectedIds.includes(item.id)
            return (
              <label key={item.id} className={styles.FilterBlockCheckboxRow}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(item.id)}
                  className={styles.FilterBlockCheckbox}
                />
                <div className={styles.FilterBlockCustomBox}>
                  {checked && <Icon icon="check" width={16} height={12} />}
                </div>
                <span className={styles.FilterBlockLabel}>{item.name}</span>
              </label>
            )
          })}
        </div>
      )}

      {showToggleAll && items.length > 3 && (
        <div
          className={styles.FilterBlockToggleAll}
          onClick={handleToggleAll}
          role="button"
        >
          {showAll ? 'Свернуть' : 'Смотреть все'}
        </div>
      )}
    </div>
  )
}

export default FilterBlock
