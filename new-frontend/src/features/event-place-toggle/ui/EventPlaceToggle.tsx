'use client';
import styles from './EventPlaceToggle.module.css';

interface EventPlaceToggleProps {
  value: 'event' | 'area';
  onChange?: (value: 'event' | 'area') => void;
}

const EventPlaceToggle = ({ onChange, value }: EventPlaceToggleProps) => {

  const toggle = () => {
    const newValue = value === 'event' ? 'area' : 'event';
    onChange?.(newValue);
  };

  const handleClick = (value: 'event' | 'area') => {
    onChange?.(value);
  };


  return (
    <div className={styles.eventPlaceToggle}>
      <span
        className={styles.typeOption}
        onClick={() => handleClick('event')}
      >
        МЕРОПРИЯТИЯ
      </span>

      <div
        className={`${styles.typeIndicator} ${value === 'area' ? styles.red : styles.blue}`}
        onClick={toggle}
      >
        <div className={styles.typeIndicatorEvent}></div>
      </div>

      <span
        className={styles.typeOption}
        onClick={() => handleClick('area')}
      >
        ПЛОЩАДКИ
      </span>
    </div>
  );
};

export default EventPlaceToggle;
