'use client'

import type { BlogListFilterType } from '@/shared/api/blog-new/list/type'
import { useCallback, useState } from 'react'

const INITIAL_FILTER: BlogListFilterType = {
  page: 1,
  page_size: 10,
}

export const useBlogFilters = () => {
  const [blogFilters, setBlogFilters] = useState<BlogListFilterType>(INITIAL_FILTER)

  const onFilterChange = useCallback(
    <K extends keyof BlogListFilterType>(key: K, value: BlogListFilterType[K]) => {
      setBlogFilters(prev => {
        const updated: BlogListFilterType = {
          ...prev,
          [key]: value,
        }

        // сбрасываем page, если меняется любой фильтр кроме page/page_size
        if (key !== 'page' && key !== 'page_size') {
          updated.page = 1
        }

        // если меняется регион — сбросить город
        if (key === 'region_id') {
          updated.city_id = undefined
        }

        return updated
      })
    },
    []
  )

  return {
    blogFilters,
    onFilterChange,
  }
}
