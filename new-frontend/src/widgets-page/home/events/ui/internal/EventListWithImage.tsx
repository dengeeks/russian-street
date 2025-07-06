'use client'
import styles from './EventListWithImage.module.css'
import Image from 'next/image'
import EventCard from '@/entities/home/event-card'
import type { EventOrAreaHomeListType } from '@/shared/api/event-or-area/home-list/type'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { useState } from 'react'
import { getImageUrl } from '@/shared/utils/getImageUrl'

interface EventListWithImageProps {
  homeEventsList: EventOrAreaHomeListType[];
  type: 'event' | 'area';
}

const EventListWithImage = ({homeEventsList, type}: EventListWithImageProps) => {
  const isMobile = useMobileDetection();
  const [currentImage, setCurrentImage] = useState<string | null>(
    homeEventsList[0]?.card_image || null
  )

  const handleHover = (image?: string | null) => {
    if (!isMobile && image) {
      setCurrentImage(image)
    }
  }
  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {homeEventsList.map((event) => (
          <li
            key={event.id}
            className="list-style"
            onMouseEnter={() => handleHover(event.card_image)}
            onMouseLeave={() => handleHover(homeEventsList[0]?.card_image)}
          >
            <EventCard {...event} type={type} />
          </li>
        ))}
      </ul>

      <div className={styles.imageWrapper}>
        {currentImage && (
          <Image
            src={getImageUrl(currentImage)}
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
                   calc(100vw - 32px)"
          />
        )}
      </div>
    </div>
  )
}

export default EventListWithImage
