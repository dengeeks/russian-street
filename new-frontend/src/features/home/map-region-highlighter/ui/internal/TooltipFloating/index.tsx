import './TooltipFloating.css'
import type { MapRegionListType } from '@/shared/api/region/map-region/type'

type TooltipFloatingProps = {
  region: MapRegionListType['regions'][0];
  x: number;
  y: number;
}

const TooltipFloating = ({ region, x, y }: TooltipFloatingProps) => {
  if (!region.manager) return null;

  return (
    <div className="tooltip-floating" style={{ left: x, top: y }}>
      {region.manager.address && (
        <div>
          <span className="red">Адрес офиса:</span> {region.manager.address}
        </div>
      )}
      {(region.manager.email || region.manager.phone) && (
        <div>
          <span className="red">Руководитель:</span> {region.manager.email}
          {region.manager.phone && (
            <>
              ,<br />
              {region.manager.phone}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TooltipFloating
