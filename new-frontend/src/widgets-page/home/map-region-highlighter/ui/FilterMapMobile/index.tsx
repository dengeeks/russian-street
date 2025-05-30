'use client'
import styles from './FilterMapMobile.module.css'
import MobileFilterModal from '@/shared/ui/MobileFilterModal'
import { regionOptions } from '@/widgets-page/home/map-region-highlighter/model/mock/regions'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useState } from 'react'
import FilterBlock from '@/shared/ui/FilterBlock'
import Icon from '@/shared/icon'

const initialItems = [
  { label: 'Паркур', checked: false },
  { label: 'Воркаут', checked: true },
  { label: 'Фриран', checked: false }
]

const FilterMapMobile = () => {
  const [items, setItems] = useState(initialItems)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.filterMapMobileWrapper}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(true)}
      >
        <Icon icon="filter-mob" width={24} height={24} />
      </button>

      {isOpen && (
        <MobileFilterModal onClose={() => setIsOpen(false)}>
          <SelectMenu options={regionOptions} searchable placeholder="РЕГИОН" />
          <FilterBlock title="Спорт" items={items} onChange={setItems} showToggleAll />
        </MobileFilterModal>
      )}
    </div>
  )
}

export default FilterMapMobile
