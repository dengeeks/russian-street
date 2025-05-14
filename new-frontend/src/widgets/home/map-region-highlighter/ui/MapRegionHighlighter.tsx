'use client'
import './MapRegionHighlighter.css'
import Map from '@/features/home/map-region-highlighter'
import SelectWithSearch from '@/shared/ui/SelectWithSearch'
import TypeToggle from './TypeToggle'

const regionOptions = [
  { label: 'БЕЛГОРОДСКАЯ ОБЛАСТЬ', value: 'belgorod' },
  { label: 'БРЯНСКАЯ ОБЛАСТЬ', value: 'bryansk' },
  { label: 'ВЛАДИМИРСКАЯ ОБЛАСТЬ', value: 'vladimir' },
  { label: 'ВОРОНЕЖСКАЯ ОБЛАСТЬ', value: 'voronezh' },
  { label: 'ИВАНОВСКАЯ ОБЛАСТЬ', value: 'ivanovo' },
  { label: 'КАЛУЖСКАЯ ОБЛАСТЬ', value: 'kaluga' },
  { label: 'КОСТРОМСКАЯ ОБЛАСТЬ', value: 'kostroma' }
]

const MapRegionHighlighter = () => {
  return (
    <section className="background map-region-section">
      <div className="container map-region-wrapper">
        <div className="map-region-filter">
          <TypeToggle/>
          <SelectWithSearch options={regionOptions} value="belgorod" placeholder="ВЫБРАТЬ РЕГИОН" />
        </div>
        <Map />
      </div>
    </section>
  )
}

export default MapRegionHighlighter
