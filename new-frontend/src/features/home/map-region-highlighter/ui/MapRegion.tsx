'use client'

import './MapRegion.css'
import type { MapRegionListType } from '@/shared/api/region/map-region/type'
import { useMapRegionData } from '@/shared/context/map-region/useMapRegionContext'
import MapTotalInfo from './internal/MapTotalInfo'
import MapRegionTooltipLayer from './internal/MapRegionTooltipLayer'

const MapRegion = ({ total_events, total_areas, regions }: MapRegionListType) => {
  const { selectedRegionId } = useMapRegionData()
  const selectedRegion = regions.find(region => region.id === selectedRegionId)

  const eventsCount = selectedRegion?.count_events ?? total_events
  const areasCount = selectedRegion?.count_areas ?? total_areas

  return (
    <>
      <MapRegionTooltipLayer regions={regions} />
      <MapTotalInfo eventsCount={eventsCount} areasCount={areasCount} />
    </>
  )
}

export default MapRegion
