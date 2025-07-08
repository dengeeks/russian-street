'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { BlogListFilterType } from '@/shared/api/blog-new/list/type'

// Константы для значений по умолчанию
const INITIAL_FILTER = {
  page: 1,
  page_size: 12,
} as const;

export const useBlogFilterFromQuery = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Генерация параметров фильтра из URL
  const blogFilters = useMemo((): BlogListFilterType => {
    const params = Object.fromEntries(searchParams.entries())
    const filter: BlogListFilterType = {
      ...INITIAL_FILTER,
    }

    // Числовые параметры
    const numericKeys: (keyof Pick<BlogListFilterType, 'page' | 'page_size'>)[] = ['page', 'page_size']
    numericKeys.forEach(key => {
      if (params[key]) {
        const num = Number(params[key])
        if (!isNaN(num) && num > 0) {
          filter[key] = num
        }
      }
    })

    // Строковые параметры
    const stringKeys: (keyof Omit<BlogListFilterType, 'page' | 'page_size'>)[] = [
      'region_id', 'city_id',  'subdiscipline_ids', 'sort'
    ]

    stringKeys.forEach(key => {
      if (params[key]) {
        filter[key] = params[key]
      }
    })

    return filter
  }, [searchParams])

  // Обновление параметров запроса
  const updateQuery = useCallback((params: Partial<BlogListFilterType>) => {
    const newParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        newParams.delete(key)
      } else {
        newParams.set(key, String(value))
      }
    })

    // Всегда удаляем city_id при смене региона
    if ('region_id' in params) {
      newParams.delete('city_id')
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }, [searchParams, pathname, router])

  // Обработчик изменений фильтра
  const onFilterChange = useCallback(<K extends keyof BlogListFilterType>(
    key: K,
    value: BlogListFilterType[K]
  ) => {
   if (key === 'region_id') {
      // Сброс города при смене региона
      updateQuery({
        region_id: value as string | undefined,
        city_id: undefined,
        page: 1
      })
    } else {
      // Стандартное обновление
      const update: Partial<BlogListFilterType> = { [key]: value }
      if (key !== 'page') update.page = 1
      updateQuery(update)
    }
  }, [updateQuery])


  return {
    blogFilters,
    onFilterChange,
  }
}