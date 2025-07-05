import styles from './RegionalLeaderCard.module.css'
import Image from 'next/image'

const RegionalLeaderCard = () => {
  return (
    <article className={styles.regionalLeaderCard}>
      <Image
        className={styles.regionalLeaderCardImage}
        src="/assets/test/team.png"
        alt="Фото представителя региона"
        width={286}
        height={249}
      />
      <div className={styles.regionalLeaderCardInfo}>
        <span className={styles.regionalLeaderCardTitle}>Представитель региона</span>
        <p className={styles.regionalLeaderCardName}>Алена Васильева</p>
        <div className={styles.regionalLeaderCardContacts}>
          <a href="mailto:alyona@mail.ru" className={styles.regionalLeaderCardEmail}>alyona@mail.ru</a>
          <a href="tel:+7923567789" className={styles.regionalLeaderCardPhone}>+7 923 567-78-9</a>
        </div>
        <address className={styles.regionalLeaderCardOffice}>
          Офис: 16 мкр, д. 50, оф. 216
          пн–пт с 09:00–18:00
        </address>
      </div>
    </article>
  )
}

export default RegionalLeaderCard
