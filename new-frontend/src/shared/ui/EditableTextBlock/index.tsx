import styles from "./EditableTextBlock.module.css";

interface EditableTextBlockProps {
  text: string;
}

const EditableTextBlock = ({text}: EditableTextBlockProps) => {
  return (
    <p
      className={styles.editableTextBlock}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
};

export default EditableTextBlock;