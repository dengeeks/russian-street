import styles from './EventCard.module.css'
import Icon from '@/shared/icon'

const Events = () => {
  return (
    <li className={styles.item}>
      <p className={styles.city}>Москва</p>
      <div className={styles.details}>
        <p className={styles.city}>Соревнования по скейтбордингу</p>
        <p className={styles.city}>Сб. 4 ноября 2024г., 12:00</p>
        <p className={styles.city}>Скейтпарк Дом на колесах, (ул. Тухачевского 48Б)</p>
      </div>
      <div className={styles.sponsors}>
        <Icon icon="profile" width={24} height={24} />
        <Icon icon="profile" width={24} height={24} />
      </div>
    </li>
  )
}

export default Events
