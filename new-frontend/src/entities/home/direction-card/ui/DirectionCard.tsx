import styles from './DirectionCard.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'
import { MouseEvent } from 'react'

type DirectionCardProps = {
  title: string
  img: string
  isActive: boolean
  onClick: () => void
  onClose: (e: MouseEvent) => void
}

const DirectionCard = ({ title, img, isActive, onClick, onClose }: DirectionCardProps) => {
  return (
    <div
      className={`${styles.directionItem} ${isActive ? styles.directionItemActive : ''}`}
      onClick={onClick}
    >
      <Image src={img} alt={title} fill className={styles.directionImage} />
      <div className={styles.directionOverlay} />
      <div className={styles.directionMobile}><span className={styles.directionTitle}>{title}</span><Icon icon="chevron" fill="#fffff" width={24} height={24}/></div>

      {isActive && (
        <div className={styles.directionInfo}>
          <Icon icon="close" className={styles.directionClose} onClick={onClose} />
          <span className={styles.directionTitleInfo}>{title}</span>
          <div className={styles.directionContent}>
            <p>Стрит-арт— это разновидность современного урбанистического искусства. Бытует широкое заблуждение, что граффити является единственным проявлением стрит-арт. Однако, это нетак, граффити является лишь одним извидов уличного искусства, нодалеко неединственным.Разделение настили можно наблюдать, восновном, среди граффити: writing, bombing, tagging, bubble-letter, throw-up, character, wild style, 3D-style.Стрит-арт своеобразный способ выразить себя исвое творчество, атакже самоутвердиться вобществе.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DirectionCard
