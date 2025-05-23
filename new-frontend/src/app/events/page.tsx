import Breadcrumbs from '@/widgets/breadcrumbs'

export default async function EventsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'О нас' }]} />

    </>
  )
}
