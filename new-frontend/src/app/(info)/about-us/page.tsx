import { Suspense } from 'react'
import Loader from '@/shared/ui/Loader'
import loadable from 'next/dynamic'
import Banner from '@/widgets-page/about-us/banner'
import TeamSection from '@/widgets-page/about-us/team'
import Mission from '@/widgets-page/about-us/mission'

const Facts = loadable(() => import('@/widgets-page/about-us/facts'))
const ContentShowcase = loadable(() => import('@/widgets/сontent-showcase'))
const Partners = loadable(() => import('@/widgets/partners'))
import Breadcrumbs from '@/widgets/breadcrumbs'
import { getAboutUs } from '@/shared/api/static/about-us/getAboutUs'

export default async function AboutUsPage() {
  const about = await getAboutUs()
  const { join_street, info, mission } = about
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'О нас' }]} />
      <Banner joinStreet={join_street} />
      <Mission missionImage={mission} />
      <TeamSection />
      {info && (
        <Suspense fallback={<Loader />}>
          <Facts factsInfo={info} />
        </Suspense>
      )}
      <Suspense fallback={<Loader />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ContentShowcase title="Новости" />
      </Suspense>
    </>
  )
}
