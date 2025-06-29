import styles from "./EditableTextBlock.module.css";
import DOMPurify from 'isomorphic-dompurify'

interface EditableTextBlockProps {
  text: string;
  variant?: 'default' | 'compact';
}

const EditableTextBlock = ({text, variant = 'default'}: EditableTextBlockProps) => {
  const sanitizedText = DOMPurify.sanitize(text)
  return (
    <div
      className={variant === 'compact' ? styles.editableTextBlockCompact : styles.editableTextBlock}
      dangerouslySetInnerHTML={{ __html: sanitizedText }}
    />
  )
};

export default EditableTextBlock;