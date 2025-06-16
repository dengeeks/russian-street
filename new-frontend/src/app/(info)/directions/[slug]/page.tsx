import Breadcrumbs from '@/widgets/breadcrumbs'
import MediaSliderTabs from '@/widgets/media-slider-tabs'
import DirectionDetails from '@/widgets-page/directions/direction-details'

export default async function DirectionDetailPage() {

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Направления', href: '/directions' },
          { label: 'паркур' },
        ]}
      />
      <MediaSliderTabs />
      <DirectionDetails />
    </>
  )
}
