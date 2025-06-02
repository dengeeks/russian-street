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
import {
  updateSelectedDates,
  isDateSelected,
  buildTitle
} from '../utils/eventsDateFilterUtils'

const EventsDateFilter = () => {
  const daysOfMonth = getMultiMonthDays([-1, 0, 1, 2, 3])

  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const handleSelect = (dateStr: string) => {
    const clickedDate = new Date(dateStr)
    setSelectedDates(prev => updateSelectedDates(prev, clickedDate))
  }

  return (
    <div className={`container ${styles.eventsDateFilterWrapper}`}>
      <div className={styles.eventsDateFilterHeading}>
        <div className={styles.eventsDateFilterTitle} dangerouslySetInnerHTML={{ __html: buildTitle(selectedDates) }}/>
        <EventPlaceToggle />
      </div>

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
          }}
        >
          {daysOfMonth.map(([dayLabel, weekday, fullDate], idx) => {
            const isSelected = isDateSelected(fullDate, selectedDates)

            return (
              <SwiperSlide
                key={idx}
                className={`${styles.eventsDateFilterDay} ${isSelected ? styles.eventsDateFilterDayActive : ''}`}
                onClick={() => handleSelect(fullDate)}
              >
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
    </div>
  )
}

export default EventsDateFilter
