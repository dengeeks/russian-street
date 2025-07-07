import "./MapTotalInfo.css"

type MapTotalInfoProps = {
  eventsCount: number
  areasCount: number
}

const MapTotalInfo = ({ eventsCount, areasCount }: MapTotalInfoProps) => (

  <div className="map-info-container">
    <div
      className="map-total-item map-region--red"
      title={`Количество событий: ${eventsCount}`}
    >
      {eventsCount}
    </div>
    <div
      className="map-total-item map-region--blue"
      title={`Количество площадок: ${areasCount}`}
    >
      {areasCount}
    </div>
  </div>
)

export default MapTotalInfo
