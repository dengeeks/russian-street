'use client'
import styles from './FilterMapMobile.module.css'
import MobileFilterModal from '@/shared/ui/MobileFilterModal'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useState } from 'react'
import FilterBlock from '@/shared/ui/FilterBlock'
import Icon from '@/shared/icon'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { FilterRegionType } from '@/shared/api/filter/region/type'
import { useMapRegionData } from '@/shared/context/map-region/useMapRegionContext'

interface FilterMapMobileProps {
  regions: FilterRegionType[];
}


const FilterMapMobile = ({regions}: FilterMapMobileProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {selectedRegionId, setSelectedRegionId, selectedType, setSelectedType} = useMapRegionData()

  const handleReset = () => {
    setSelectedRegionId(undefined)
    setSelectedType('event')
  }

  const handleTypeChange = (selectedIds: string[]) => {
    const lastSelected = selectedIds.at(-1);
    if (lastSelected === 'event' || lastSelected === 'area') {
      setSelectedType(lastSelected);
    }
  }

  useBodyScrollLock(isOpen)

  return (
    <div className={styles.filterMapMobileWrapper}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть фильтр"
        title="Открыть фильтр">
        <Icon icon="filter-mob" width={24} height={24} />
      </button>

      {isOpen && (
        <MobileFilterModal onClose={() => setIsOpen(false)} onReset={handleReset}>
          {regions && regions.length > 0 && (
            <SelectMenu
              value={selectedRegionId}
              options={regions}
              searchable
              placeholder="РЕГИОН"
              onChange={id => setSelectedRegionId(id)}
            />
          )}
          <FilterBlock title="Активности"
                       items={[{ id: 'event', name: 'События' },{ id: 'area', name: 'Площадки' }]}
                       selectedIds={[selectedType]}
                       onChange={handleTypeChange}
                       showToggleAll={false} />
        </MobileFilterModal>
      )}
    </div>
  )
}

export default FilterMapMobile
