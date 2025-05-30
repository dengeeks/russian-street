'use client'
import './MapRegionHighlighter.css'
import Map from '@/features/home/map-region-highlighter'
import TypeToggle from './TypeToggle'
import { regionOptions } from '../model/mock/regions'
import SelectMenu from '@/shared/ui/SelectMenu'
import FilterMapMobile from './FilterMapMobile'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

const MapRegionHighlighter = () => {
  const isMobile = useIsMobile()
  return (
    <section className="container map-region-wrapper section-spacing-top">
      {isMobile ? (
        <FilterMapMobile />
      ) : (
        <div className="map-region-filter">
          <TypeToggle />
          <SelectMenu options={regionOptions} searchable placeholder="ВЫБРАТЬ РЕГИОН" />
        </div>
      )}
      <Map />
    </section>
  )
}

export default MapRegionHighlighter
