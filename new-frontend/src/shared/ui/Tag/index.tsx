import styles from './Tag.module.css'
import { ReactNode } from 'react'
import Icon from '@/shared/icon'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'location'
}

const Tag = ({ children, variant = 'default' }: TagProps) => {
  return (
    <div className={`${styles.tag} ${styles[variant]}`}>
      {variant === 'location' && <Icon icon="place" width={24} height={24} />}
      <span>{children}</span>
    </div>
  )
}

export default Tag
