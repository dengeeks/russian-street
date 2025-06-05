'use client'
import styles from './EveryoneWillLikeUs.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Button from '@/shared/ui/Button'
import { blockData } from '../model/mock/blockData'
import { useState } from 'react'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'


const EveryoneWillLikeUs = () => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const isMobile = useMobileDetection()

  // Обработчик клика (мобильная версия)
  const handleClick = (id: string) => {
    setActiveBlock(prev => (prev === id ? null : id))
  }

  const handleMouseEnter = (id: string) => {
    if (!isMobile) setActiveBlock(id)
  }

  const handleMouseLeave = () => {
    if (!isMobile) setActiveBlock(null)
  }

  return (
    <section className={`container section-spacing-top ${styles.everyoneWillLike}`}>
        <SectionTitle>У нас понравится всем</SectionTitle>
        <div className={styles.content}>
          {blockData.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((item, itemIndex) => {
                const id = `${rowIndex}-${itemIndex}`
                const isActive = activeBlock === id

                return (
                  <div
                    key={itemIndex}
                    className={`
                      ${styles.blockWrapper}
                      ${item.hiddenOnMobile ? styles.hiddenMobile : ''}
                      ${item.hiddenOnDesktop ? styles.hiddenDesktop : ''}
                      ${rowIndex === 3 ? styles.lastBlock : ''}
                    `}
                  >
                    <div
                      className={`${styles.block} ${item.color ? styles[item.color] : ''} dashed-all ${
                        isActive ? styles.active : ''
                      }`}
                      onClick={() => handleClick(id)}
                      onMouseEnter={() => handleMouseEnter(id)}
                      onMouseLeave={handleMouseLeave}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleClick(id)
                        }
                      }}
                    >
                      {isActive ? item.description : item.label}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
          <div className={styles.everyoneButton}>
            <Button className="red" type="button">ВСТУПИТЬ</Button>
          </div>
        </div>
    </section>
  )
}

export default EveryoneWillLikeUs
