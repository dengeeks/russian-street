'use client'
import './MapRegionHighlighter.css'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'

const MapRegion = dynamic(() => import('@/features/home/map-region-highlighter'), {
  ssr: false,
  loading: () => <Loader />
})

const FilterMapMobile = dynamic(() => import('./FilterMapMobile'), {
  ssr: false
})

import TypeToggle from '@/features/event-place-toggle'
import SelectMenu from '@/shared/ui/SelectMenu'

import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { useMapRegion } from '../hook/useMapRegion'
import { useMapRegionData } from '@/shared/context/map-region/useMapRegionContext'


const MapRegionHighlighter = () => {
  const {selectedRegionId, setSelectedRegionId, setSelectedType, selectedType} = useMapRegionData()
  const isMobile = useMobileDetection()
  const { mapRegion } = useMapRegion()
  return (
    <section className="container map-region-wrapper section-spacing-top">
      {isMobile ? (
        <FilterMapMobile regions={mapRegion.regions} />
      ) : (
        <div className="map-region-filter">
          <TypeToggle value={selectedType} onChange={(val) => setSelectedType(val)} />
          {mapRegion.regions && mapRegion.regions.length > 0 && (
            <SelectMenu
              value={selectedRegionId}
              options={mapRegion.regions}
              searchable
              placeholder="ВЫБРАТЬ РЕГИОН"
              onChange={(id) => setSelectedRegionId(id)}
            />
          )}
        </div>
      )}
      <MapRegion {...mapRegion} />
    </section>
  )
}

export default MapRegionHighlighter
