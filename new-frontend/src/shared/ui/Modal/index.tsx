import { ReactNode } from 'react'
import styles from './Modal.module.css'
import "./ModalForm.css"
import Icon from '@/shared/icon'

interface ModalProps {
  children: ReactNode
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} type="button" onClick={onClose}>
          <Icon icon="close" width={16} height={16}/>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
