import dynamic from 'next/dynamic'
import Banner from '@/widgets-page/about-us/banner'
import TeamSection from '@/widgets-page/about-us/team'
import Mission from '@/widgets-page/about-us/mission'
const Facts = dynamic(() => import('@/widgets-page/about-us/facts'))

import ContentShowcase from '@/widgets/сontent-showcase'
import Partners from '@/widgets/partners'
import Breadcrumbs from '@/widgets/breadcrumbs'
import { getAboutUs } from '@/shared/api/static/about-us/getAboutUs'


export default async function AboutUsPage() {
  const about = await getAboutUs()
  const {join_street, info, mission} = about;
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'О нас' }]} />
      <Banner joinStreet={join_street}/>
      <Mission missionImage={mission}/>
      <TeamSection/>
      {info && <Facts factsInfo={info}/>}
      <Partners/>
      <ContentShowcase title="Новости"/>
    </>
  )
}
