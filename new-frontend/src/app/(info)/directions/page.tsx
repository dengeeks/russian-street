import { Suspense } from 'react'
import loadable from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
import Breadcrumbs from '@/widgets/breadcrumbs'
import EveryoneWillLikeUs from '@/widgets/everyone-will-like-us'
import MarqueeText from '@/widgets/marquee-text'

const Banner = loadable(() => import('@/widgets-page/directions/banner'))
const DirectionSection = loadable(() => import('@/widgets-page/directions/direction-section'))

import { getDisciplines } from '@/shared/api/direction/disciplines/getDisciplines'
export default async function DirectionsPage() {
  const directionList = await getDisciplines()
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Направления' }]} />
      {directionList.length > 0 && (
      <Suspense fallback={<Loader />}>
        <Banner data={directionList} />
      </Suspense>
      )}
      <MarqueeText singleText="мир улиц " type="single" />
      {directionList.length > 0 && (
        <Suspense fallback={<Loader />}>
          <DirectionSection data={directionList} />
        </Suspense>
      )}
      <Suspense fallback={<Loader />}>
        <EveryoneWillLikeUs />
      </Suspense>
    </>
  )
}
