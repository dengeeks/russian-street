import Banner from '@/widgets-page/about-us/banner'
import TeamSection from '@/widgets-page/about-us/team'
import Facts from '@/widgets-page/about-us/facts'
import Mission from '@/widgets-page/about-us/mission'

import ContentShowcase from '@/widgets/сontent-showcase'
import Partners from '@/widgets/partners'
import Breadcrumbs from '@/widgets/breadcrumbs'

export default async function AboutUsPage() {

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'О нас' }]} />
      <Banner/>
      <Mission/>
      <TeamSection/>
      <Facts/>
      <Partners/>
      <ContentShowcase title="Новости"/>
    </>
  )
}
