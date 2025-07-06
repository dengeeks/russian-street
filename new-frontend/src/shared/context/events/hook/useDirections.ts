import { useCallback, useEffect, useState } from 'react'
import {
  EMPTY_FILTER_SUB_DISCIPLINES,
  getFilterSubDisciplines,
} from '@/shared/api/filter/sub-discipline/getFilterSubDisciplines';
import type { FilterSubDisciplinesType } from '@/shared/api/filter/sub-discipline/type';
import type { EventFilterType } from '@/shared/api/event-or-area/list/type';

export function useDirections(filter: EventFilterType) {
  const [directions, setDirections] = useState<FilterSubDisciplinesType[]>(EMPTY_FILTER_SUB_DISCIPLINES);
  const { type, region_id, ending_date, starting_date } = filter;

  const fetchDirections = useCallback(async () => {
    const data = await getFilterSubDisciplines({ type, region_id, ending_date, starting_date });
    setDirections(data);
  }, [type, region_id, ending_date, starting_date]);

  useEffect(() => {
    void fetchDirections();
  }, [fetchDirections]);

  return directions;
}
