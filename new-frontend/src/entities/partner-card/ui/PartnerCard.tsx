import styles from './PartnerCard.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'
import { PartnerType } from '../model/type'

interface PartnerCardProps extends PartnerType {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const PartnerCard = ({ isExpanded, onToggle, description, link, img, title }: PartnerCardProps) => {
  return (
    <div className={styles.partnerCard}>
      <a href={link} target="_blank"
         rel="noopener noreferrer"
         className={styles.partnerCard_imgWrapper}
         aria-label={`Переход на сайт партнёра: ${title}`}
      >
        <Image src={img} alt={title} fill sizes="285px" overrideSrc={img} />
      </a>
      <div className={styles.partnerCard_content}>
        <div className={styles.partnerCard_textWrapper}>
          <h4 className={styles.partnerCard_title}>{title}</h4>
          <p
            className={`${styles.partnerCard_description} ${
              isExpanded ? styles.partnerCard_description_expanded : ''
            }`}>
            {description}
          </p>
        </div>
        <button type="button" className={styles.partnerCard_button} onClick={onToggle}>
          Подробнее
          <Icon icon="chevron" />
        </button>
      </div>
    </div>
  )
}
export default PartnerCard;
