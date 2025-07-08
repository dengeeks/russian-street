'use client'
import { useEventList } from '@/shared/hooks/useEventList'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import { useEffect, useRef, useState } from 'react'
import type { EventFilterType } from '@/shared/api/event-or-area/list/type'
import { EventOrAreaType } from '@/shared/api/type'

export const useUserRegionFilteredEventList = () => {
  const { userData } = useGlobalData()
  const [eventFilter, setEventFilter] = useState<EventFilterType>({
    type: 'event' as EventOrAreaType,
    page_size: 2,
  })

  // Сохраняем текущий регион пользователя в ref
  const userRegionIdRef = useRef(userData?.region?.id)

  // Эффект для обновления фильтра при изменении региона
  useEffect(() => {
    // Если регион изменился и есть новый регион
    if (userData?.region?.id !== userRegionIdRef.current) {
      userRegionIdRef.current = userData?.region?.id

      if (userData?.region?.id) {
        setEventFilter(prev => ({
          ...prev,
          region_id: userData.region?.id
        }))
      } else {
        setEventFilter(prev => {
          const rest = { ...prev }
          delete rest.region_id
          return rest
        })
      }
    }
  }, [userData?.region?.id])

  const { eventList, isLoading } = useEventList(eventFilter)

  // Эффект для удаления региона при пустом результате
  useEffect(() => {
    if (!isLoading &&
      eventFilter.region_id &&
      eventList.results.length === 0) {
      setEventFilter(prev => {
        const rest = { ...prev }
        delete rest.region_id
        return rest
      })

      // Сбрасываем ref региона чтобы можно было повторно добавить
      userRegionIdRef.current = undefined
    }
  }, [isLoading, eventFilter.region_id, eventList.results.length])

  return { eventList}
}