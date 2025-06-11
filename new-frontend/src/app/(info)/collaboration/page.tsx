import CollaborationIntro from '@/widgets-page/collaboration/collaboration-intro'
import OurProjects from '@/widgets-page/collaboration/our-projects'

import Breadcrumbs from '@/widgets/breadcrumbs'
import Loader from '@/shared/ui/Loader'
import { Suspense } from 'react'

export default async function CollaborationPage() {

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сотрудничество' }]} />
      <Suspense fallback={<Loader/>}>
       <CollaborationIntro />
      </Suspense>
      <OurProjects/>

    </>
  )
}
