import styles from "./PostDetails.module.css"
import EditableTextBlock from '@/shared/ui/EditableTextBlock'
import { formatDateToDDMMYYYY } from '@/shared/utils/formatDate'

interface PostDetailsProps {
  description: string;
  created_at: string;
}

const PostDetails = ({description, created_at}:PostDetailsProps) => {
  return (
    <section className={`container ${styles.postDetails}`}>
      <EditableTextBlock text={description} className={styles.postDetailsText} variant="none"/>
      <span className={styles.postDetailsDate}>Создано: {formatDateToDDMMYYYY(created_at)}</span>
    </section>
  )
}

export default PostDetails
