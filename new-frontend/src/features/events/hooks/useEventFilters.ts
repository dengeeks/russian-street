import { useState } from 'react'
import {
  categorizedDirections as defaultDirections,
  eventsFilter as defaultEvents,
  locationsFilter as defaultLocations
} from '../model/mock/directionfilter'

export const useEventFilters = () => {
  const [locations, setLocations] = useState(defaultLocations)
  const [events, setEvents] = useState(defaultEvents)
  const [directions, setDirections] = useState(defaultDirections)

  const handleDirectionChange = (
    category: string,
    newItems: typeof defaultDirections[0]['filters']
  ) => {
    setDirections(prev =>
      prev.map(group =>
        group.category === category ? { ...group, filters: newItems } : group
      )
    )
  }

  const resetFilters = () => {
    setLocations(prev => prev.map(item => ({ ...item, checked: false })))
    setEvents(prev => prev.map(item => ({ ...item, checked: false })))
    setDirections(prev =>
      prev.map(group => ({
        ...group,
        filters: group.filters.map(item => ({ ...item, checked: false }))
      }))
    )
  }

  return {
    locations, setLocations,
    events, setEvents,
    directions, handleDirectionChange,
    resetFilters
  }
}
