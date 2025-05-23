'use client'
import styles from './Events.module.css'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'
import Button from '@/shared/ui/Button'
import EventCard from '@/entities/home/event-card'

const Events = () => {
  return (
    <section className="section-spacing-top container">
        <div className={styles.section}>
          <SectionTitle>Мероприятия</SectionTitle>

          <div className={styles.content}>
            <ul className={styles.list}>
              {[...Array(5)].map((_, index) => (
                <EventCard key={index}/>
              ))}
            </ul>

            <div className={styles.imageWrapper}>
              <Image
                src="/test/events.png"
                className={styles.image}
                fill
                alt="event"
                sizes="(min-width: 1000px) 490px,
         (min-width: 900px) 950px,
         (min-width: 800px) 850px,
         (min-width: 700px) 750px,
         (min-width: 600px) 650px,
         (min-width: 500px) 550px,
             (min-width: 400px) 450px,
                 (min-width: 300px) 350px,
         100vw"
              />
            </div>
          </div>

          <Button type="button" className={`${styles.buttonEvent} red`}>Участвовать</Button>
        </div>
    </section>
  )
}

export default Events
