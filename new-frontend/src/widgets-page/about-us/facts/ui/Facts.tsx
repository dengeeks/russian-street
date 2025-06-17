import styles from './Facts.module.css'
import { InfoType } from '@/shared/api/static/about-us/type'

interface FactsProps {
  factsInfo: InfoType;
}

const Facts = ({factsInfo}: FactsProps) => {
  return (
    <section className={`${styles.factsSection} section-spacing-top section-spacing-bottom}`}>
      <div className={`container ${styles.factsContainer}`}>
        <div className={styles.facts}>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>{factsInfo?.person}</div>
            <div className={styles.factDescription}>
              человек из России занимаются уличной культурой и спортом
            </div>
          </div>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>{factsInfo?.discipline}+</div>
            <div className={styles.factDescription}>
              направлений уличной культуры и спорта
            </div>
          </div>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>{factsInfo?.organization}</div>
            <div className={styles.factDescription}>
              организаций в России ежедневно формируют креативную экономику
            </div>
          </div>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>{factsInfo?.event}</div>
            <div className={styles.factDescription}>
              мероприятий в год проходит в России в области уличной культуры и спорта
              от муниципального до международного уровня
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Facts
