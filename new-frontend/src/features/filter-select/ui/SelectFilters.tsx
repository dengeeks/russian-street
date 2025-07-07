'use client'
import './SelectFilters.css'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
import { useRegionList } from '@/shared/hooks/filter/useRegionList'

import CommonFilters from './internal/CommonFilters'
import type { BaseFilterProps} from '@/features/filter-select/model/type'
import { useCityList } from '@/shared/hooks/filter/useCityList'

const EventsFilterMobile = dynamic(() => import('./internal/FilterMobile'), {
  loading: () => <Loader />
})


const SelectFilters = ({ onFilterChange, filter, directions, children }: BaseFilterProps) => {
  const isMobile = useMobileDetection()
  const { regions } = useRegionList()
  const {cities} = useCityList(filter.region_id)

  return (
    <div className="container selectFilters" id="pagination-scroll">
      <SelectMenu
        placeholder="Выбрать регион"
        value={filter.region_id}
        options={regions}
        searchable
        onChange={value => onFilterChange('region_id', value)}
      />
      {isMobile ? (
        <EventsFilterMobile
          cities={cities}
          filter={filter}
          onFilterChange={onFilterChange}
          directions={directions}
        >
          {children}
        </EventsFilterMobile>
      ) : (
        <CommonFilters
          cities={cities}
          filter={filter}
          onFilterChange={onFilterChange}
          directions={directions}
        />
      )}
    </div>
  )
}

export default SelectFilters
