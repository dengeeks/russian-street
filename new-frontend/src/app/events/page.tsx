import Breadcrumbs from '@/widgets/breadcrumbs'

import BannerEvent from '@/widgets-page/events/banner'
import EventsList from '@/widgets-page/events/events-list'
// import EmptyState from '@/shared/ui/EmptyState'
import {EventsDateFilter, EventsSelectFilters, EventsSidebarFilters} from '@/features/events'

export default async function EventsPage() {

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Мероприятия' }]} />
      <BannerEvent/>
      <EventsDateFilter/>
      <EventsSelectFilters/>
      <div className="container event-list-page section-spacing-bottom">
        <EventsSidebarFilters/>
        <EventsList/>
      </div>
      {/*<EmptyState title="Нет мероприятий:(" description="К сожалению, по выбранным параметрам мы ничего не нашли. Попробуйте выбрать другие или возвращайтесь на главную страницу."/>*/}
    </>
  )
}
