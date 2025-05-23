
import Breadcrumbs from '@/widgets/breadcrumbs'


export default async function NewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Новости' }]} />

    </>
  )
}
