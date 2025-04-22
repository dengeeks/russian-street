import React from 'react';
import './EventsCalendar.css';
import { UseCalendar } from '../../app/hooks/UseCalendar';
import { ArrowButton } from '../../UI/ArrowButton/ArrowButton';
import { EventsGrid } from '../EventsGrid/EventsGrid';

export function EventsCalendar() {

    const { currentDate, setcurrentDate, prevDays, setPrevDays, nextDays, setNextDays, days, prevDaysClick, nextDaysClick } = UseCalendar();


  return (<section className='events-calendar'>
    <h3 className='events-calendar__title'>Календарь мероприятий Июнь, 2024</h3>
   
    <div className='events-calendar__date-menu'>

        <ArrowButton direction='left' changeDate={prevDaysClick}/>

        {days.map(day => ( <button key={day} className={`events-calendar__day ${day === currentDate && 'events-calendar__day_current'}`} onClick={() => {setcurrentDate(day)}}>
            {day}
        </button>
        ))}

        <ArrowButton direction='right' changeDate={nextDaysClick}/>
    </div>

    <EventsGrid />
  </section>)
}
