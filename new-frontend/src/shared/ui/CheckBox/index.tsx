import styles from './CheckBox.module.css';
import Icon from '@/shared/icon';
import { InputHTMLAttributes, ReactNode } from 'react'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  children: ReactNode;
  theme?: 'light' | 'dark';
  error?: string;
}

const CheckBox = ({ id, children, theme = 'light', error, ...inputProps }: CheckBoxProps) => {
  return (
   <div className={styles.checkbox}>
    <label htmlFor={id} className={`${styles.label} ${styles[theme]}`}>
      <input
        type="checkbox"
        id={id}
        name="extra-option"
        value="bold-heading"
        className={styles.input}
        {...inputProps}
      />
      <div className={styles.customBox}>
        <Icon icon="check" width={16} height={12} />
      </div>
      <span className={styles.text}>{children}</span>
    </label>
     {error && <span className={styles.error}>{error}</span>}
   </div>
  );
};

export default CheckBox;
