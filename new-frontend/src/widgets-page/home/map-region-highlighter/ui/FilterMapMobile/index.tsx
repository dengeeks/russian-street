'use client'
import styles from './FilterMapMobile.module.css'
import MobileFilterModal from '@/shared/ui/MobileFilterModal'
import { regionOptions } from '@/widgets-page/home/map-region-highlighter/model/mock/regions'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useState } from 'react'
import FilterBlock from '@/shared/ui/FilterBlock'
import Icon from '@/shared/icon'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'

const initialItems = [
  { label: 'мероприятия', checked: false },
  { label: 'площадки', checked: false }
]

const FilterMapMobile = () => {
  const [items, setItems] = useState(initialItems)
  const [isOpen, setIsOpen] = useState(false)

  const handleReset = () => {
    setItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        checked: false
      }))
    );
  };

  useBodyScrollLock(isOpen)

  return (
    <div className={styles.filterMapMobileWrapper}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть фильтр"
        title="Открыть фильтр"
      >
        <Icon icon="filter-mob" width={24} height={24} />
      </button>

      {isOpen && (
        <MobileFilterModal onClose={() => setIsOpen(false)} onReset={handleReset}>
          <SelectMenu options={regionOptions} searchable placeholder="РЕГИОН" />
          <FilterBlock title="активности" items={items} onChange={setItems} />
        </MobileFilterModal>
      )}
    </div>
  )
}

export default FilterMapMobile
