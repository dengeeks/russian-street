'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { EventFilterType } from '@/shared/api/event-or-area/list/type'

// Константы для значений по умолчанию
const INITIAL_FILTER = {
  page: 1,
  page_size: 12,
} as const;

type ValidType = EventFilterType['type'];

const VALID_TYPES: ValidType[] = ['event', 'area'];
const isValidType = (val: string): val is ValidType => VALID_TYPES.includes(val as ValidType)

export const useEventFilterFromQuery = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Генерация параметров фильтра из URL
  const eventFilter = useMemo((): EventFilterType => {
    const params = Object.fromEntries(searchParams.entries())
    const filter: EventFilterType = {
      type: 'event',
      ...INITIAL_FILTER,
    }

    // Валидация типа
    if (params.type && isValidType(params.type)) {
      filter.type = params.type
    }

    // Числовые параметры
    const numericKeys: (keyof Pick<EventFilterType, 'page' | 'page_size'>)[] = ['page', 'page_size']
    numericKeys.forEach(key => {
      if (params[key]) {
        const num = Number(params[key])
        if (!isNaN(num) && num > 0) {
          filter[key] = num
        }
      }
    })

    // Строковые параметры
    const stringKeys: (keyof Omit<EventFilterType, 'type' | 'page' | 'page_size'>)[] = [
      'region_id', 'city_id', 'type_ids', 'subdiscipline_ids',
      'starting_date', 'ending_date', 'sort'
    ]

    stringKeys.forEach(key => {
      if (params[key]) {
        filter[key] = params[key]
      }
    })

    return filter
  }, [searchParams])

  // Обновление параметров запроса
  const updateQuery = useCallback((params: Partial<EventFilterType>) => {
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
  const onFilterChange = useCallback(<K extends keyof EventFilterType>(
    key: K,
    value: EventFilterType[K]
  ) => {
    if (key === 'type') {
      // Полный сброс при смене типа
      updateQuery({
        type: value as ValidType,
        page: 1,
        region_id: undefined,
        city_id: undefined,
        type_ids: undefined,
        subdiscipline_ids: undefined,
        starting_date: undefined,
        ending_date: undefined,
        sort: undefined,
      })
    } else if (key === 'region_id') {
      // Сброс города при смене региона
      updateQuery({
        region_id: value as string | undefined,
        city_id: undefined,
        page: 1
      })
    } else {
      // Стандартное обновление
      const update: Partial<EventFilterType> = { [key]: value }
      if (key !== 'page') update.page = 1
      updateQuery(update)
    }
  }, [updateQuery])

  const onFilterChangeMultiple = (params: Partial<EventFilterType>) => {
    const update: Partial<EventFilterType> = { ...params, page: 1 }
    updateQuery(update)
  }

  return {
    eventFilter,
    onFilterChange,
    onFilterChangeMultiple
  }
}