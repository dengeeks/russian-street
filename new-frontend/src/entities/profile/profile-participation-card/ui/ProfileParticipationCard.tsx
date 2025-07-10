import styles from "./ProfileParticipationCard.module.css";
import Icon from '@/shared/icon'
import Tag from '@/shared/ui/Tag'
import Image from 'next/image'
import { getImageUrl } from '@/shared/utils/getImageUrl'
import EditableTextBlock from '@/shared/ui/EditableTextBlock'
import { EventOrAreaType} from '@/shared/api/type'
import Link from 'next/link'
import { formatDateRange } from '@/shared/utils/formatDate'
import type { FavoriteItemType } from '@/shared/api/favorite/list/type'

interface ProfileParticipationCardProps extends FavoriteItemType{
  type: EventOrAreaType;
}

const ProfileParticipationCard = ({ card_image, title, description, type, id, sub_discipline, city, ending_date, starting_date }: ProfileParticipationCardProps) => {
  return (
    <div className={styles.participationCard}>
      <Link href={`/events/${id}?type=${type}`} className={styles.participationCardImageWrapper}>
        <Image
          src={getImageUrl(card_image)}
          alt={title}
          fill
          sizes="
  (min-width: 1200px) 286px,
  (min-width: 1100px) 260px,
  (min-width: 1024px) 240px,
  (max-width: 1023px) calc(50vw - 16px),
  (max-width: 767px) calc(100vw - 32px),
"
        />
      </Link>
      <div className={styles.participationCardContent}>
        <div className={styles.participationCardInfo}>
          <div className={styles.participationCardTags}>
            <Tag variant="location">{city}</Tag>
            <Tag>{sub_discipline.name}</Tag>
          </div>
          {starting_date && ending_date && (
            <div className={styles.participationCardDate}>
              {formatDateRange(starting_date, ending_date)}
            </div>
          )}

        </div>
        <div className={styles.participationCardText}>
          <Link href={`/events/${id}?type=${type}`} className={styles.participationCardTitle} title={title}>
            {title}
          </Link>
          <EditableTextBlock
            text={description}
            className={styles.participationCardDescription}
            variant="none"
          />
        </div>
        <Link href={`/events/${id}?type=${type}`} className={styles.participationCardButton}>
          <div className={styles.participationCardButtonText}>Подробнее</div>
          <Icon icon="chevron" width={24} height={24} className="right" />
        </Link>
      </div>
    </div>
  )
}

export default ProfileParticipationCard;
