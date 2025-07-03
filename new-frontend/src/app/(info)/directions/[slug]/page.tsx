import Breadcrumbs from '@/widgets/breadcrumbs'
import MediaSliderTabs from '@/widgets/media-slider-tabs'
import DirectionDetails from '@/widgets-page/directions/direction-details'
import { getDetailDiscipline } from '@/shared/api/direction/detail-discipline/getDetailDiscipline'
import { notFound } from 'next/navigation'

interface DirectionDetailPageProps {
  params: Promise<{ slug: string }>;
}


export default async function DirectionDetailPage({params}:DirectionDetailPageProps) {
  const {slug} = await params;
  const directionDetail = await getDetailDiscipline(slug);

  if (directionDetail === 404) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Направления', href: '/directions' },
          { label: directionDetail.name },
        ]}
      />
      <MediaSliderTabs gallery_items={directionDetail.gallery_items}/>
      <DirectionDetails {...directionDetail}/>
    </>
  )
}
