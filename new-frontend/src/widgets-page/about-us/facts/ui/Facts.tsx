import styles from './Facts.module.css'

const Facts = () => {
  return (
    <section className={styles.factsSection + ' section-spacing-top section-spacing-bottom'}>
      <div className={`container ${styles.factsContainer}`}>
        <div className={styles.facts}>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>10 370 00</div>
            <div className={styles.factDescription}>
              человек из России занимаются уличной культурой и спортом
            </div>
          </div>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>50+</div>
            <div className={styles.factDescription}>
              направлений уличной культуры и спорта
            </div>
          </div>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>4 678</div>
            <div className={styles.factDescription}>
              организаций в России ежедневно формируют креативную экономику
            </div>
          </div>
          <div className={styles.factItem}>
            <div className={styles.factNumber}>40 800</div>
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
