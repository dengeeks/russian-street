'use client'
import './MapRegionHighlighter.css'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'

const Map = dynamic(() => import('@/features/home/map-region-highlighter'), {
  ssr: false,
  loading: () => <Loader/>,
})

const FilterMapMobile = dynamic(() => import('./FilterMapMobile'), {
  ssr: false,
})


import TypeToggle from '@/features/event-place-toggle'
import SelectMenu from '@/shared/ui/SelectMenu'

import { regionOptions } from '../model/mock/regions'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'


const MapRegionHighlighter = () => {
  const isMobile = useMobileDetection()
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
