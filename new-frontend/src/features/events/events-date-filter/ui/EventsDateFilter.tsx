'use client'
import { useState } from 'react'
import styles from './EventsDateFilter.module.css'
import Icon from '@/shared/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { FreeMode, Navigation } from 'swiper/modules'
import EventPlaceToggle from '@/features/event-place-toggle'
import { getMultiMonthDays } from '../model/getCalendarDays'
import { updateSelectedDates, isDateSelected, buildTitle } from '../utils/eventsDateFilterUtils'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'

const EventsDateFilter = () => {
  const { eventFilter, onFilterChangeMultiple, onFilterChange } = useEventsData()
  const daysOfMonth = getMultiMonthDays([-1, 0, 1, 2, 3])
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const handleSelect = (dateStr: string) => {
    const clickedDate = new Date(dateStr)
    let updated = updateSelectedDates(selectedDates, clickedDate)

    if (updated.length > 2) {
      updated = [clickedDate]
    }

    setSelectedDates(updated)

    if (updated.length === 1) {
      const dateStr = updated[0].toISOString().split('T')[0]
      onFilterChangeMultiple({
        starting_date: dateStr,
        ending_date: undefined
      })
    }

    if (updated.length === 2) {
      const [d1, d2] = updated.sort((a, b) => a.getTime() - b.getTime())
      onFilterChangeMultiple({
        starting_date: d1.toISOString().split('T')[0],
        ending_date: d2.toISOString().split('T')[0]
      })
    }
  }


  return (
    <div className={`container ${styles.eventsDateFilterWrapper}`}>
      <div className={styles.eventsDateFilterHeading}>
        {eventFilter.type === 'event' ? (
          <div
            className={styles.eventsDateFilterTitle}
            dangerouslySetInnerHTML={{ __html: buildTitle(selectedDates) }}
          />
        ) : (
          <div className={styles.eventsDateFilterTitle}/>
        )}
        <EventPlaceToggle value={eventFilter.type} onChange={value => onFilterChange('type', value)} />
      </div>
      {eventFilter.type === 'event' && (
        <div className={styles.eventsDateFilterSlider}>
          <div className={`event-data-prev ${styles.eventsDateFilterChevron}`}>
            <Icon icon="chevron" className="left" />
          </div>

          <Swiper
            slidesPerView="auto"
            className={styles.eventsDateFilterDays}
            spaceBetween={8}
            slidesPerGroup={3}
            modules={[FreeMode, Navigation]}
            navigation={{
              prevEl: '.event-data-prev',
              nextEl: '.event-data-next',
              enabled: true
            }}>
            {daysOfMonth.map(([dayLabel, weekday, fullDate], idx) => {
              const isSelected = isDateSelected(fullDate, selectedDates)

              return (
                <SwiperSlide
                  key={idx}
                  className={`${styles.eventsDateFilterDay} ${isSelected ? styles.eventsDateFilterDayActive : ''}`}
                  onClick={() => handleSelect(fullDate)}>
                  <div className={styles.eventsDateFilterDayNumber}>{dayLabel.split(' ')[0]}</div>
                  <div className={styles.eventsDateFilterWeekday}>{weekday}</div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <div className={`event-data-next ${styles.eventsDateFilterChevron}`}>
            <Icon icon="chevron" className="right" />
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsDateFilter
