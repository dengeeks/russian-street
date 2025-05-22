import BannerHome from '@/widgets/home/banner'
import MapRegionHighlighter from '@/widgets/home/map-region-highlighter'
import Events from '@/widgets/home/events'
import StreetGallery from '@/widgets/home/street-gallery'
import Direction from '@/widgets/home/direction'
import WhoWeAre from '@/widgets/home/who-we-are'
import MarqueeText from '@/widgets/marquee-text'
import EveryoneWillLikeUs from '@/widgets/everyone-will-like-us'
import Partners from '@/widgets/partners'
import ContentShowcase from '@/widgets/сontent-showcase'
import FeedbackContact from '@/widgets/home/feedback-contact'


export default async function HomePage() {
  return (
    <>
      <BannerHome />
      <MapRegionHighlighter />
      <Events />
      <StreetGallery />
      <Direction/>
      <WhoWeAre/>
      <MarqueeText/>
      <EveryoneWillLikeUs/>
      <Partners/>
      <ContentShowcase title="Блог"/>
      <FeedbackContact/>
    </>
  )
}
