import Partners from '@/widgets/partners'
import ContentShowcase from '@/widgets/сontent-showcase'
import Banner from '@/widgets/about-us/banner'
import AboutDescription from '@/widgets/about-us/AboutDescription'
import TeamSection from '@/widgets/about-us/team'
import Facts from '@/widgets/about-us/facts'
import Mission from '@/widgets/about-us/mission'
import Breadcrumbs from '@/widgets/breadcrumbs'

export default async function AboutUsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'О нас' }]} />
      <Banner/>
      <AboutDescription/>
      <Mission/>
      <TeamSection/>
      <Facts/>
      <Partners/>
      <ContentShowcase title="Новости"/>
    </>
  )
}
