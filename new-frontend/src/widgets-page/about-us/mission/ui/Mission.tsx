import Image from 'next/image'
import styles from './Mission.module.css'

const Mission = () => {
  return (
    <section className={`container section-spacing-top ${styles.missionSection}`}>
      <div className={styles.missionLine} />
      <div className={styles.missionImageWrapper}>
        <Image src="/test/mission.png" alt="миссия" fill sizes="
    (min-width: 1220px) 685px,
    (min-width: 1100px) 585px,
    (min-width: 1024px) 540px,
    (min-width: 768px) 440px,
    (min-width: 700px) 725px,
    (min-width: 600px) 625px,
    (min-width: 500px) 525px,
    (min-width: 400px) 425px,
    (min-width: 300px) 350px,
    100vw
  "/>
      </div>
      <div className={styles.missionInfo}>
        <div className={styles.missionValues}>
          <div className={`${styles.missionValue} ${styles.missionBlue}`}>Новаторство</div>
          <div className={`${styles.missionValue} ${styles.missionWhite1} dashed-all`}>Открытость</div>
          <div className={`${styles.missionValue} ${styles.missionWhite2} dashed-all`}>Общность</div>
          <div className={`${styles.missionValue} ${styles.missionRed}`}>Ответственность</div>
          <div className={`${styles.missionValue} ${styles.missionWhite3} dashed-all`}>Независимость</div>
        </div>
        <div className={styles.missionDescriptionWrapper}>
          <div className={styles.missionDescription}>
            Наша миссия — создать условия для успешной реализации потенциала каждого, связанного с уличными
            дисциплинами и духовной профессиональной сферой.
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
