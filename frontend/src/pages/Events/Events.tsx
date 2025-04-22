import React from 'react';
import './Events.css';
import { EventsCalendar } from '../../components/EventsCalendar/EventsCalendar';
import { Slider } from '../../components/Slyder/Slider';

export function Events() {
  return (
      <section className='events'>
        <Slider />
        <EventsCalendar />
      </section>
  );
}
