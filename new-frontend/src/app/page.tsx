import loadable from 'next/dynamic'
import { Suspense } from 'react'
import Loader from '@/shared/ui/Loader'

import BannerHome from '@/widgets-page/home/banner'
import MapRegionHighlighter from '@/widgets-page/home/map-region-highlighter'
import Events from '@/widgets-page/home/events'

const StreetGallery = loadable(() => import('@/widgets-page/home/street-gallery'))
const WhoWeAre = loadable(() => import('@/widgets-page/home/who-we-are'))
const Direction = loadable(() => import('@/widgets-page/home/direction'))
const FeedbackContact = loadable(() => import('@/widgets-page/home/feedback-contact'))

import MarqueeText from '@/widgets/marquee-text'
import EveryoneWillLikeUs from '@/widgets/everyone-will-like-us'
import Partners from '@/widgets/partners'
import ContentShowcase from '@/widgets/сontent-showcase'
import { getHome } from '@/shared/api/static/home/getHome'
import { HomeDataProvider } from '@/shared/context/home-data/HomeDataContext'

export default async function HomePage() {
  const homeData = await getHome()

  const { promotional_video, street_images, mission_and_goals_text } = homeData

  return (
    <HomeDataProvider homeData={homeData}>
      <BannerHome promoVideo={promotional_video} />
      <MapRegionHighlighter />
      <Events />
      {street_images.length > 0 && (
        <Suspense fallback={<Loader />}>
          <StreetGallery />
        </Suspense>
      )}
      <Suspense fallback={<Loader />}>
        <Direction />
      </Suspense>
      {mission_and_goals_text && (
        <Suspense fallback={<Loader />}>
          <WhoWeAre />
        </Suspense>
      )}
      <MarqueeText />
      <Suspense fallback={<Loader />}>
        <EveryoneWillLikeUs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ContentShowcase title="Блог" />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <FeedbackContact />
      </Suspense>
    </HomeDataProvider>
  )
}
