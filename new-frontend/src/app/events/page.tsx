import Breadcrumbs from '@/widgets/breadcrumbs'
import EventsList from '@/widgets-page/events/events-list'
import { EventsDateFilter, EventsSelectFilters, EventsSidebarFilters } from '@/features/events'
import { EventsDataProvider } from '@/shared/context/events/EventsDataContext'
import { getEventAreaBanner } from '@/shared/api/static/getEventAreaBanner'
import BannerEventWrapper from '@/widgets-page/events/BannerEventWrapper'

export default async function EventsPage() {
  const eventBanner = await getEventAreaBanner()
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Мероприятия' }]} />
      <EventsDataProvider>
        <BannerEventWrapper event={eventBanner.event}/>
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
