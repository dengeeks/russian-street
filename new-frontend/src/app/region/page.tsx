import RegionPreview from '@/widgets-page/region/region-preview'
import Breadcrumbs from '@/widgets/breadcrumbs'
import RegionLeader from '@/widgets-page/region/region-leader'

export default async function RegionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Регион' }]} />
      <RegionPreview/>
      <RegionLeader/>

    </>
  )
}
