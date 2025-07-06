'use client'
import SelectFilters from '@/features/filter-select'
import { useDisciplines } from '../model/useDisciplines'
import { useBlogData } from '@/shared/context/blog/useBlogDataContext'

const PostFilter = () => {
  const { disciplines } = useDisciplines()
  const {blogFilters, onFilterChange} = useBlogData()
  return <SelectFilters directions={disciplines} filter={blogFilters} onFilterChange={onFilterChange} />
}

export default PostFilter
