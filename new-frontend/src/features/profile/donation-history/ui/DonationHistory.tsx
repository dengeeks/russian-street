'use client'
import styles from './DonationHistory.module.css'
import Icon from '@/shared/icon'
import { useState } from 'react'

const DonationHistory = () => {
  const [isOpen, setIsOpen] = useState(false)

  const items = Array(6).fill({
    date: '15.07.2025',
    amount: '250 руб'
  })

  return (
    <div className={styles.donationHistory}>
      <div className={styles.donationHistoryHeader} onClick={() => setIsOpen((prev) => !prev)}>
        <span>История донатов</span>
        <Icon icon="chevron" width={24} height={24} className={isOpen ? 'top' : ''} />
      </div>
      {isOpen && (
        <div className={styles.donationHistoryList}>
          {items.map((item, index) => (
            <div key={index} className={styles.donationHistoryItem}>
              <span className={styles.donationHistoryDate}>{item.date}</span>
              <span className={styles.donationHistoryAmount}>{item.amount}</span>
              <button type="button" className={styles.donationHistoryRepeatButton}>
                Повторить <Icon icon="reload" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DonationHistory
