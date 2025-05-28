import styles from './EventFullInfo.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import RegionalLeaderCard from '@/entities/regional-leader-card'
import Icon from '@/shared/icon'
import Link from 'next/link'
import Button from '@/shared/ui/Button'

const EventFullInfo = () => {
  return (
  <section className={`container section-spacing-top ${styles.eventFullInfoContainer}`}>
    <div className={styles.eventFullInfoContentWrapper}>
      <div className={styles.eventFullInfoDescriptionBlock}>
        <SectionTitle>Описание</SectionTitle>
        <div className={styles.eventFullInfoDescriptionContent}>
          <p className={styles.eventFullInfoDescriptionText}>—Экстремальные состязания пройдут в обычном зачёте для всех, а также выделена отдельно детская номинация; <br/> — Мастер-классы и показательные выступления от сборной России по скейтборду, Центра экстремального спорта «Спортэкс» г. Красноярск;<br/> — Крутые призы и подарки от партнёров.<br/><br/> И так, встречаемся:<br/>4 июня 2024 года;<br/> 12:00 часов;<br/> Скейт-парк «Дом на колёсах», (ул. Тухачевского 48Б). <br/><br/>Организаторы: Федерация скейтбординга Кузбасса и скейт-парк «Дом на колёсах».<br/><br/> С собой берём своё транспортное средство, заряд энергии и хорошее настроение</p>

          <div className={styles.eventFullInfoContactsBlock}>
            <span className={styles.eventFullInfoContactsLabel}>Задать вопрос организаторам:</span>
            <div className={styles.eventFullInfoSocialLinks}>
              <Link href=""><Icon icon="telegram" /></Link>
              <Link href=""><Icon icon="whatsapp" /></Link>
            </div>
          </div>
        </div>
      </div>

      <RegionalLeaderCard />
    </div>

    <div className={styles.eventFullInfoActionsBlock}>
      <Link href="/" className="more-link">поддержать мероприятие</Link>
      <Button className="red">Участвовать</Button>
    </div>
  </section>

)
}

export default EventFullInfo
