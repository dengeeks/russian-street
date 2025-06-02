import { ReactNode } from 'react'
import styles from './MobileFilterModal.module.css'

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onReset: () => void;
}

const MobileFilterModal = ({ children, onClose, onReset }: ModalProps) => {
  return (
    <div className={styles.mobileFilterOverlay} onClick={onClose}>
      <div className={styles.mobileFilterContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button type="button" className={styles.modalButton} onClick={onClose}>закрыть</button>
          <button type="button" className={`${styles.modalButton} ${styles.filterButton}`}>фильтр</button>
          <button type="reset" className={styles.modalButton} onClick={onReset}>Сбросить все</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}

export default MobileFilterModal
