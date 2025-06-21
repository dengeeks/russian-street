'use client'
import styles from "./PartnersDesktop.module.css"
import PartnerCard from '@/entities/partner-card'
import { useState } from 'react'
import type { PartnerListType } from '@/shared/api/partners/type'

interface PartnersDesktopProps {
  data: PartnerListType;
}

const PartnersDesktop = ({data}: PartnersDesktopProps) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const toggleCard = (key: string) => {
    setExpandedKey(prev => (prev === key ? null : key))
  }

  return (
    <div className={styles.partnersGroupList}>
      {data.map((cat, catIndex) => (
        cat.partners && cat.partners.length > 0 && (
          <div key={catIndex} className={styles.partnersGroup}>
            <h3>{cat.partner_type} партнеры</h3>
            <div className={styles.partnersList}>
              {cat.partners.map((partner, partnerIndex) => {
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