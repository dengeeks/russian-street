'use client'
import SelectMenu from '@/shared/ui/SelectMenu'
import type { CommonFiltersProps } from '../../model/type'

const CommonFilters = ({
  cities,
  directions,
  filter,
  onFilterChange,
  children,
  onRegionRequired,
  date
}: CommonFiltersProps) => {

  return (
    <>
      <div
        className={`${!filter.region_id ? 'selectDisabled' : ''}`}
        onClick={() => {
          if (!filter.region_id) {
            onRegionRequired?.()
          }
        }}>
        <SelectMenu
          placeholder="Город"
          value={filter.city_id}
          options={cities}
          onChange={value => onFilterChange('city_id', value)}
          searchable
        />
      </div>

      <SelectMenu
        placeholder="Направление"
        value={filter.subdiscipline_ids}
        options={directions}
        onChange={value => onFilterChange('subdiscipline_ids', value)}
        searchable
      />

      <SelectMenu
        placeholder="Сначала популярные"
        value={filter.sort}
        options={[
          { id: '', name: 'Сначала популярные' },
          { id: 'recent', name: 'Сначала новые' }
        ]}
        onChange={value => onFilterChange('sort', value)}
      />
      {date}
      {children}
    </>
  )
}

export default CommonFilters
