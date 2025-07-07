'use client'
import { createContext, ReactNode } from 'react'
import { useDirections, useEventFilterFromQuery } from './hook'
import { EventsDataContextType } from './type'
import { useEventList } from '@/shared/hooks/useEventList'

export const EventsDataContext = createContext<| EventsDataContextType | undefined>(undefined)

type Props = { children: ReactNode }

export const EventsDataProvider = ({ children }: Props) => {
  const { eventFilter, onFilterChange, onFilterChangeMultiple} = useEventFilterFromQuery()

  const {isLoading, eventList} = useEventList(eventFilter)
  const directions = useDirections(eventFilter)

  return (
    <EventsDataContext.Provider value={{ eventFilter, onFilterChange, eventsData: eventList, directions, isLoading, onFilterChangeMultiple }}>
      {children}
    </EventsDataContext.Provider>
  )
}
