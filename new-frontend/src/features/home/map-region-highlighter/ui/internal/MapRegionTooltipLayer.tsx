'use client'
import { useRef, useState, MouseEvent } from 'react'
import TooltipFloating from './TooltipFloating'
import type { MapRegionListType } from '@/shared/api/region/map-region/type'
import regionsPath from '../../model/regions.json'
import Link from 'next/link'
import { useMapRegionData } from '@/shared/context/map-region/useMapRegionContext'

type Props = {
  regions: MapRegionListType['regions']
}

type TooltipInfo = {
  region: MapRegionListType['regions'][0]
  x: number
  y: number
}

const MapRegionTooltipLayer = ({ regions }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)
  const {selectedType, selectedRegionId} = useMapRegionData()

  const handleMouseEnter = (id: string, event: MouseEvent<SVGPathElement>) => {
    const region = regions.find(r => r.code === id)
    if (!region || !svgRef.current) return

    const pathRect = event.currentTarget.getBoundingClientRect()
    const svgRect = svgRef.current.getBoundingClientRect()
    const x = pathRect.x + pathRect.width / 2 - svgRect.x
    const y = pathRect.y + pathRect.height / 2 - svgRect.y - 20

    setTooltip({ region, x, y })
  }

  const handleMouseLeave = () => setTooltip(null)

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1196 797"
      >
        {regionsPath.map(({ id, d }, index) => {
          const region = regions.find(r => r.code === id)

          let additionalClass = ''

          if (selectedRegionId) {
            if (region?.id === selectedRegionId) {
              const hasEvents = region?.have_events
              const hasAreas = region?.have_areas

              if (selectedType === 'event') {
                additionalClass = hasEvents ? 'map-region--blue' : 'map-region--empty'
              } else if (selectedType === 'area') {
                additionalClass = hasAreas ? 'map-region--red' : 'map-region--empty'
              }
            }
          } else {
            // Если НЕ выбран — подсвечиваем по selectedType для всех
            if (selectedType === 'event' && region?.have_events) {
              additionalClass = 'map-region--blue'
            } else if (selectedType === 'area' && region?.have_areas) {
              additionalClass = 'map-region--red'
            }
          }

          return (
            <Link href={`/events/?type=${selectedType}&region_id=${region?.id}`} key={`${id}-${index}`}>
              <path
                d={d}
                id={id}
                className={`map-region-path ${additionalClass}`}
                onMouseEnter={(e) => handleMouseEnter(id, e)}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          )
        })}
      </svg>

      {tooltip && <TooltipFloating region={tooltip.region} x={tooltip.x} y={tooltip.y} />}
    </>
  )
}

export default MapRegionTooltipLayer
