import styles from './EmptyState.module.css'
import Link from 'next/link'
import SectionTitle from '@/shared/ui/SectionTitle'

interface EmptyStateProps {
  title: string
  description: string
}

const EmptyState = ({title, description}:EmptyStateProps) => {
  return (
    <div className={styles.emptyStateWrapper}>
        <SectionTitle>{title}</SectionTitle>
        <p className={styles.emptyStateDescription}>
          {description}
        </p>
        <Link href="/" className="button red">
          на главную
        </Link>
    </div>
  )
}

export default EmptyState
