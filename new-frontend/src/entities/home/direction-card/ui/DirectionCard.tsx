import styles from './DirectionCard.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'
import { MouseEvent } from 'react'
import Link from 'next/link'
import type {SubDisciplinesType} from "@/shared/api/direction/sub-disciplines/type"
import { getImageUrl } from '@/shared/utils/getImageUrl'

interface DirectionCardProps extends SubDisciplinesType{
  isActive: boolean;
  onClick: () => void;
  onClose: (e: MouseEvent) => void;
}

const DirectionCard = ({name, id, image, main_page_info, isActive, onClick, onClose }: DirectionCardProps) => {
  return (
    <div
      className={`${styles.directionItem} ${isActive ? styles.directionItemActive : ''}`}
      onClick={onClick}>
      <Image src={getImageUrl(image)} alt={name} fill className={styles.directionImage} sizes="
  (min-width: 1050px) 600px,
  (min-width: 768px) 350px,
  (max-width: 767px) calc(100vw - 32px)
"/>
      <div className={styles.directionOverlay} />
      <div className={styles.directionMobile}>
        <span className={styles.directionTitle}>{name}</span>
        <Icon icon="chevron" />
      </div>

      {isActive && (
        <div className={styles.directionDetails}>
          <div className={styles.directionInfo}>
            <Icon icon="close" className={styles.directionClose} onClick={onClose} />
            <span className={styles.directionTitleInfo}>{name}</span>
            <div className={styles.directionContent}>
              <p>
                {main_page_info}
              </p>
            </div>
          </div>
          <div className={styles.directionMore}>
            <Link href={`/directions/${id}`} className="more-link">
              Подробнее
            </Link>
        </div>
        </div>
      )}
    </div>
  )
}

export default DirectionCard
