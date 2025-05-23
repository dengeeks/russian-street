
import Breadcrumbs from '@/widgets/breadcrumbs'
import MediaSliderTabs from '@/widgets/media-slider-tabs'
import ContentShowcase from '@/widgets/сontent-showcase'


export default async function NewDetailPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Новости', href: '/news' }, {label: 'Детали новости'}]} />
      <MediaSliderTabs/>
      <ContentShowcase title="другие новости"/>

    </>
  )
}
