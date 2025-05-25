import { ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
