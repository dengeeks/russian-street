
import Breadcrumbs from '@/widgets/breadcrumbs'
import EveryoneWillLikeUs from '@/widgets/everyone-will-like-us'
import MarqueeText from '@/widgets/marquee-text'
import Banner from '@/widgets-page/directions/banner'
import DirectionSection from '@/widgets-page/directions/direction-section'

export default async function DirectionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Направления' }]} />
      <Banner/>
      <MarqueeText singleText="мир улиц " type="single"/>
      <DirectionSection/>
      <EveryoneWillLikeUs/>
    </>
  )
}
