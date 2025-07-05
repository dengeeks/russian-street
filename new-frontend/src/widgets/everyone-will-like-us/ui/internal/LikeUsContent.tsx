'use client'
import styles from './LikeUsContent.module.css'
import { useState } from 'react'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { EveryoneLikesType } from '@/shared/api/static/getEveryoneLikes'

interface LikeUsContentProps {
  data: EveryoneLikesType;
}

const LikeUsContent = ({data}: LikeUsContentProps) => {
  const [activeBlock, setActiveBlock] = useState<number | null>(null)
  const isMobile = useMobileDetection()

  // Обработчик клика (мобильная версия)
  const handleClick = (id: number) => {
    setActiveBlock(prev => (prev === id ? null : id))
  }

  const handleMouseEnter = (id: number) => {
    if (!isMobile) setActiveBlock(id)
  }

  const handleMouseLeave = () => {
    if (!isMobile) setActiveBlock(null)
  }

  return (
      <div className={styles.content}>
        {data.everyone_likes.map((item, index) => (
          <div key={index} className={` ${styles.blockWrapper}`}>
            <div
              className={`${styles.block} dashed-all ${activeBlock === index ? styles.active : ''}`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(index)
                }
              }}>
              {activeBlock === index ? item.description : item.title}
            </div>
          </div>
        ))}
      </div>
  )
}

export default LikeUsContent;
