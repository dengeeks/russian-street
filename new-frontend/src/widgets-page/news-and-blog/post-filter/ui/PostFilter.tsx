'use client'
import styles from './PostFilter.module.css'
import SelectFilters from '@/features/filter-select'
import { useDisciplines, monthOptions, getYearOptions } from '../model'
import { useBlogData } from '@/shared/context/blog/useBlogDataContext'
import SelectMenu from '@/shared/ui/SelectMenu'


const PostFilter = () => {
  const { disciplines } = useDisciplines()
  const { blogFilters, onFilterChange } = useBlogData()
  const yearOptions = getYearOptions()

  return (
    <div className={styles.postFilterWrapper}>
      <SelectFilters directions={disciplines} filter={blogFilters} onFilterChange={onFilterChange} date={
        <>
          <SelectMenu
            options={monthOptions}
            value={blogFilters.created_at_month}
            onChange={value => onFilterChange('created_at_month', value)}
            placeholder="Выберите месяц"
            searchable
          />
          <SelectMenu
            options={yearOptions}
            value={blogFilters.created_at_year}
            onChange={value => onFilterChange('created_at_year', value)}
            placeholder="Выберите год"
            searchable
          />
        </>
      } />
    </div>
  )
}

export default PostFilter
