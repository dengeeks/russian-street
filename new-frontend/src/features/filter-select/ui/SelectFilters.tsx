'use client'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
import { useState } from 'react'
import './SelectFilters.css'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { useRegionList } from '@/shared/hooks/filter/useRegionList'

import CommonFilters from './internal/CommonFilters'
import type { BaseFilterProps } from '../model/type'
import { useCityList } from '@/shared/hooks/filter/useCityList'

const EventsFilterMobile = dynamic(() => import('./internal/FilterMobile'), {
  loading: () => <Loader />
})

const SelectFilters = ({ onFilterChange, filter, directions, children, date}: BaseFilterProps) => {
  const [isRegionError, setIsRegionError] = useState(false)

  const isMobile = useMobileDetection()
  const { regions } = useRegionList()
  const { cities } = useCityList(filter.region_id)

  const handleRegionChange = (value: string | undefined) => {
    setIsRegionError(false)
    onFilterChange('region_id', value)
  }

  const handleRegionRequired = () => {
    setIsRegionError(true)
  }

  return (
    <div className="container selectFilters" id="pagination-scroll">
      <div className="regionSelectWrapper">
        {isRegionError && <div className="not-region-error">*</div>}
        <SelectMenu
          placeholder="Выбрать регион"
          value={filter.region_id}
          options={regions}
          searchable
          onChange={handleRegionChange}
        />
      </div>
      {isMobile ? (
        <EventsFilterMobile>
          <CommonFilters
            cities={cities}
            filter={filter}
            onFilterChange={onFilterChange}
            directions={directions}
            onRegionRequired={handleRegionRequired}
            date={date}>
            {children}
          </CommonFilters>
        </EventsFilterMobile>
      ) : (
        <CommonFilters
          cities={cities}
          filter={filter}
          onFilterChange={onFilterChange}
          directions={directions}
          onRegionRequired={handleRegionRequired}
          date={date}
        />
      )}
    </div>
  )
}

export default SelectFilters
