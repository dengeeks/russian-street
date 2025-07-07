import Breadcrumbs from '@/widgets/breadcrumbs'

import BannerEvent from '@/widgets-page/events/banner'
import EventsList from '@/widgets-page/events/events-list'
import { EventsDateFilter, EventsSelectFilters, EventsSidebarFilters } from '@/features/events'
import { EventsDataProvider } from '@/shared/context/events/EventsDataContext'

export default async function EventsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Мероприятия' }]} />
      <BannerEvent title="Соревнования по скейтбордингу" image='/assets/test/events.png' format_type="image" video_url={null}/>
      <EventsDataProvider>
        <EventsDateFilter />
        <EventsSelectFilters />
        <div className="container event-list-page section-spacing-bottom">
          <EventsSidebarFilters />
          <EventsList />
        </div>
      </EventsDataProvider>
    </>
  )
}
