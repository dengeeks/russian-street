import CollaborationIntro from '@/widgets-page/collaboration/collaboration-intro'
import OurProjects from '@/widgets-page/collaboration/our-projects'

import Breadcrumbs from '@/widgets/breadcrumbs'

export default async function CollaborationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сотрудничество' }]} />
       <CollaborationIntro/>
      <OurProjects/>

    </>
  )
}
