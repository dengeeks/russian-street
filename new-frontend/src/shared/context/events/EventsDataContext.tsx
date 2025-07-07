'use client'
import { createContext, ReactNode } from 'react'
import { useEventsData, useDirections, useEventFilterFromQuery } from './hook'
import { EventsDataContextType } from './type'

export const EventsDataContext = createContext<| EventsDataContextType | undefined>(undefined)

type Props = { children: ReactNode }

export const EventsDataProvider = ({ children }: Props) => {
  const { eventFilter, onFilterChange} = useEventFilterFromQuery()
  const { eventsData, isLoading } = useEventsData(eventFilter)
  const directions = useDirections(eventFilter)

  return (
    <EventsDataContext.Provider value={{ eventFilter, onFilterChange, eventsData, directions, isLoading }}>
      {children}
    </EventsDataContext.Provider>
  )
}
