import { useCallback, useEffect, useState } from 'react'
import type {EventOrAreaTypesCatalogType} from "@/shared/api/event-or-area/types-catalog/type"
import  {getEventOrAreaTypesCatalog, EMPTY_EVENT_OR_AREA_TYPES_CATALOG} from "@/shared/api/event-or-area/types-catalog/getEventOrAreaTypesCatalog"

export const useEventTypesCatalog = (type: 'event'| 'area') => {
  const [categories, setCategories] = useState<EventOrAreaTypesCatalogType[]>(EMPTY_EVENT_OR_AREA_TYPES_CATALOG)

  const fetchCategories = useCallback(async () => {
    const data = await getEventOrAreaTypesCatalog(type)
    setCategories(data)
  }, [type])

  useEffect(() => {
    void fetchCategories()
  }, [fetchCategories])

  return {
    categories
  }
}
