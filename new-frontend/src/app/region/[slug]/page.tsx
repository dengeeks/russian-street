import RegionPreview from '@/widgets-page/region/region-preview'
import Breadcrumbs from '@/widgets/breadcrumbs'
import RegionLeader from '@/widgets-page/region/region-leader'
import { getRegionManagerDetail } from '@/shared/api/region/detail/getRegionManagerDetail'
import { notFound } from 'next/navigation'

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RegionPage({params}:RegionPageProps) {
  const {slug} = await params;
  const regionDetail = await getRegionManagerDetail(slug)
  if (regionDetail === 404) return notFound()
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: regionDetail.name }]} />
      <RegionPreview {...regionDetail}  />
      <RegionLeader {...regionDetail.manager}/>

    </>
  )
}
