import BannerEvent from '@/widgets-page/events/banner'

import Breadcrumbs from '@/widgets/breadcrumbs'
import EmptyState from '@/shared/ui/EmptyState'

export default async function EventsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Мероприятия' }]} />
      <BannerEvent/>
      <EmptyState title="Нет мероприятий:(" description="К сожалению, по выбранным параметрам мы ничего не нашли. Попробуйте выбрать другие или возвращайтесь на главную страницу."/>
    </>
  )
}
