'use client';
import { useState } from 'react';
import styles from './EventPlaceToggle.module.css';

const EventPlaceToggle = () => {
  const [active, setActive] = useState<'events' | 'places'>('events');

  const toggle = () => {
    setActive(prev => (prev === 'events' ? 'places' : 'events'));
  };

  return (
    <div className={styles.eventPlaceToggle}>
      <span
        className={styles.typeOption}
        onClick={() => setActive('events')}
      >
        МЕРОПРИЯТИЯ
      </span>

      <div
        className={`${styles.typeIndicator} ${active === 'events' ? styles.red : styles.blue}`}
        onClick={toggle}
      >
        <div className={styles.typeIndicatorEvent}></div>
      </div>

      <span
        className={styles.typeOption}
        onClick={() => setActive('places')}
      >
        ПЛОЩАДКИ
      </span>
    </div>
  );
};

export default EventPlaceToggle;
