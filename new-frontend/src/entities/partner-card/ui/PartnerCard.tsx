import styles from './PartnerCard.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'
import type { PartnerType } from '@/shared/api/partners/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

interface PartnerCardProps extends PartnerType {
  isExpanded?: boolean
  onToggle?: () => void
}

const PartnerCard = ({ isExpanded, onToggle, description, url, image, name }: PartnerCardProps) => {
  return (
    <div className={styles.partnerCard}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.partnerCard_imgWrapper}
        aria-label={`Переход на сайт партнёра: ${name}`}>
        <Image
          src={getImageUrl(image)}
          alt={name}
          fill
          sizes="
    (min-width: 1100px) 285px,
    (min-width: 1024px) 260px,
    (min-width: 910px) 210px,
    (min-width: 870px) 190px,
    (min-width: 768px) 160px,
    calc(100vw - 32px)"
          overrideSrc={getImageUrl(image)}
        />
      </a>
      <div className={styles.partnerCard_content}>
        <div className={styles.partnerCard_textWrapper}>
          <h4 className={styles.partnerCard_title}>{name}</h4>
          <p
            className={`${styles.partnerCard_description} ${
              isExpanded ? styles.partnerCard_description_expanded : ''
            }`}>
            {description}
          </p>
        </div>
        {onToggle && (
          <button type="button" className={styles.partnerCard_button} onClick={onToggle}>
            Подробнее
            <Icon icon="chevron" />
          </button>
        )}
      </div>
    </div>
  )
}
export default PartnerCard
