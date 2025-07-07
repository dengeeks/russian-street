'use client'
import './Events.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import ActionButton from '@/features/action-buttons'
import { useMapRegionData } from '@/shared/context/map-region/useMapRegionContext'
import { useHomeEventsList } from '@/widgets-page/home/events/hook/useHomeEventsList'

import EventListWithImage from './internal/EventListWithImage'

const Events = () => {
  const {selectedRegionId, selectedType} = useMapRegionData()
  const {homeEventsList} = useHomeEventsList(selectedType, selectedRegionId)

  if (!homeEventsList || homeEventsList.length === 0) return null

  return (
        <section className="home-events--section section-spacing-top container">
          <SectionTitle>{selectedType === 'event' ? 'Мероприятия' : 'Площадки'}</SectionTitle>
          <EventListWithImage homeEventsList={homeEventsList} type={selectedType}/>
          <ActionButton className="red" modalName="join-organization" requireAuth>вступить в организацию</ActionButton>
        </section>
  )
}

export default Events
