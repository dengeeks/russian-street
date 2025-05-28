'use client'
import './MapRegionHighlighter.css'
import Map from '@/features/home/map-region-highlighter'
import SelectWithSearch from '@/shared/ui/SelectWithSearch'
import TypeToggle from './TypeToggle'
import { regionOptions } from '../model/mock/regions'

const MapRegionHighlighter = () => {
  return (
    <section className="container map-region-wrapper section-spacing-top">
        <div className="map-region-filter">
          <TypeToggle/>
          <SelectWithSearch options={regionOptions} value="belgorod" placeholder="ВЫБРАТЬ РЕГИОН" />
        </div>
        <Map />
    </section>
  )
}

export default MapRegionHighlighter
