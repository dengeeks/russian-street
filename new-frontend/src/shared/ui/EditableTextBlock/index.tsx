import styles from "./EditableTextBlock.module.css";
import DOMPurify from 'isomorphic-dompurify'

interface EditableTextBlockProps {
  text: string;
}

const EditableTextBlock = ({text}: EditableTextBlockProps) => {
  const sanitizedText = DOMPurify.sanitize(text)
  return (
    <div
      className={styles.editableTextBlock}
      dangerouslySetInnerHTML={{ __html: sanitizedText }}
    />
  )
};

export default EditableTextBlock;