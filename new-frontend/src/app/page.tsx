import BannerHome from '@/widgets-page/home/banner'
import MapRegionHighlighter from '@/widgets-page/home/map-region-highlighter'
import Events from '@/widgets-page/home/events'
import StreetGallery from '@/widgets-page/home/street-gallery'
import Direction from '@/widgets-page/home/direction'
import WhoWeAre from '@/widgets-page/home/who-we-are'
import FeedbackContact from '@/widgets-page/home/feedback-contact'


import MarqueeText from '@/widgets/marquee-text'
import EveryoneWillLikeUs from '@/widgets/everyone-will-like-us'
import Partners from '@/widgets/partners'
import ContentShowcase from '@/widgets/сontent-showcase'


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
