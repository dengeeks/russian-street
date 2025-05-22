'use client'
import styles from "./PartnersDesktop.module.css"
import PartnerCard from '@/entities/partner-card'
import { useState } from 'react'
import {partnerList} from '@/widgets/partners/model/mock/partners'

const PartnersDesktop = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const toggleCard = (key: string) => {
    setExpandedKey(prev => (prev === key ? null : key))
  }

  return (
    <div className={styles.partnersGroupList}>
      {partnerList.map((cat, catIndex) => (
        cat.children && cat.children.length > 0 && (
          <div key={catIndex} className={styles.partnersGroup}>
            <h3>{cat.category} партнеры</h3>
            <div className={styles.partnersList}>
              {cat.children.map((partner, partnerIndex) => {
                const uniqueKey = `${catIndex}-${partnerIndex}`
                return (
                  <PartnerCard
                    key={uniqueKey}
                    isExpanded={expandedKey === uniqueKey}
                    onToggle={() => toggleCard(uniqueKey)}
                    {...partner}
                  />
                )
              })}
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default PartnersDesktop;