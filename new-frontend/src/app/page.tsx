import BannerHome from '@/widgets/home/banner'
import MapRegionHighlighter from '@/widgets/home/map-region-highlighter'
import Events from '@/widgets/home/events'
import StreetGallery from '@/widgets/home/street-gallery'
import Direction from '@/widgets/home/direction'

export default async function HomePage() {
  return (
    <>
      <BannerHome />
      <MapRegionHighlighter />
      <Events />
      <StreetGallery />
      <Direction/>
    </>
  )
}
