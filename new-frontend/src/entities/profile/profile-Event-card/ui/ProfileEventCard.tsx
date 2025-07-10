import styles from "./ProfileEventCard.module.css"
import Icon from '@/shared/icon'
import Tag from '@/shared/ui/Tag'
import Image from 'next/image'
import type { EventOrAreaItem } from '@/shared/api/event-or-area/list/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'
import Link from 'next/link'
import { formatFullDateTime } from '@/shared/utils/formatDate'


const ProfileEventCard = ({card_image, id, city, address, title, starting_date, ending_date, sub_discipline}: EventOrAreaItem) => {
  return (
    <article className={styles.profileEventCard}>
      <Link href={`/events/${id}/?type=event`} className={styles.profileEventCardWrapperImage}>
        <Image src={getImageUrl(card_image)} alt={title} fill className={styles.profileEventCardImage}
               sizes="(min-width: 1100px) 650px,
       (min-width: 950px) 500px,
       (min-width: 768px) 400px,
       calc(100vw - 32px)"
        />
      </Link>
      <div className={styles.profileEventCardContent}>
        <div className={styles.profileEventCardTags}>
          <Tag variant="location">{city}</Tag>
          <Tag>{sub_discipline.name}</Tag>
        </div>

        <div className={styles.profileEventCardDetails}>
          <Link href={`/events/${id}/?type=event`} className={styles.profileEventCardHeading}>
            {title}
          </Link>
          {address && (
          <div className={styles.profileEventCardInfoBlock}>
            <Icon icon="place" width={24} height={24} />
            <div className={styles.profileEventCardInfoContent}>
              <div className={styles.profileEventCardInfoTitle}>Адрес</div>
              <div className={styles.profileEventCardInfoValue}>
                {address}
              </div>
            </div>
          </div>
          )}

          {(starting_date || ending_date) && (
            <div className={styles.profileEventCardInfoBlock}>
              <Icon icon="clock" width={24} height={24} />
              <div className={styles.profileEventCardInfoContent}>
                <div className={styles.profileEventCardInfoTitle}>Дата проведения</div>
                <div className={styles.profileEventCardInfoValue}>
                  {starting_date && formatFullDateTime(starting_date)}<br />
                  {ending_date && formatFullDateTime(ending_date)}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </article>
  )
}

export default ProfileEventCard;
