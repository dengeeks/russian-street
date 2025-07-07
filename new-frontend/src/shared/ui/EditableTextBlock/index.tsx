import styles from './EditableTextBlock.module.css'
import DOMPurify from 'isomorphic-dompurify'

interface EditableTextBlockProps {
  text: string
  variant?: 'default' | 'compact' | 'none'
  className?: string
}

const EditableTextBlock = ({ text, variant = 'default', className = '' }: EditableTextBlockProps) => {
  const sanitizedText = DOMPurify.sanitize(text)

  const variantClass =
    variant === 'compact'
      ? styles.editableTextBlockCompact
      : variant === 'default'
        ? styles.editableTextBlock
        : ''

  return (
    <div
      className={`${className} ${variantClass}`.trim()}
      dangerouslySetInnerHTML={{ __html: sanitizedText }}
    />
  )
}

export default EditableTextBlock
