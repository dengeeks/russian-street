'use client'
import MobileFilterModal from '@/shared/ui/MobileFilterModal'
import { useState } from 'react'
import Icon from '@/shared/icon'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import CommonFilters from './CommonFilters'
import type { FilterMobileProps } from '@/features/filter-select/model/type'
import { usePathname, useRouter } from 'next/navigation'


const FilterMobile = ({ cities, filter, directions, onFilterChange, children }: FilterMobileProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleReset = () => {
    router.replace(pathname, { scroll: false })
    setIsOpen(false)
  }

  useBodyScrollLock(isOpen)

  return (
    <>
      <button
        className="selectFilterButton"
        onClick={() => setIsOpen(true)}
        aria-label="Открыть фильтр"
        title="Открыть фильтр">
        <Icon icon="filter-mob" width={24} height={24} />
      </button>

      {isOpen && (
        <MobileFilterModal onClose={() => setIsOpen(false)} onReset={handleReset}>
          <CommonFilters cities={cities} filter={filter} onFilterChange={onFilterChange} directions={directions} >{children}</CommonFilters>
        </MobileFilterModal>
      )}
    </>
  )
}

export default FilterMobile
