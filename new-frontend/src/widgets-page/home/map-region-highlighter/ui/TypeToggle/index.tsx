'use client';
import { useState } from 'react';
import styles from './TypeToggle.module.css';

const TypeToggle = () => {
  const [active, setActive] = useState<'event' | 'place'>('event');

  const toggle = () => {
    setActive(prev => (prev === 'event' ? 'place' : 'event'));
  };

  return (
    <div className={styles.typeToggle}>
      <span
        className={styles.typeOption}
        onClick={() => setActive('event')}
      >
        МЕРОПРИЯТИЯ
      </span>

      <div
        className={`${styles.typeIndicator} ${active === 'event' ? styles.red : styles.blue}`}
        onClick={toggle}
      >
        <div className={styles.typeIndicatorEvent}></div>
      </div>

      <span
        className={styles.typeOption}
        onClick={() => setActive('place')}
      >
        ПЛОЩАДКИ
      </span>
    </div>
  );
};

export default TypeToggle;
