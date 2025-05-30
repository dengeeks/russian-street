import { InputHTMLAttributes, TextareaHTMLAttributes, FC, } from 'react'
import styles from './FormField.module.css'

interface BaseProps {
  label?: string
  name: string
  placeholder?: string
  theme?: 'light' | 'dark' | 'grey'
  required?: boolean
  hint?: string
  textarea?: boolean
  error?: string
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

type FormFieldProps = InputProps | TextareaProps

const FormField: FC<FormFieldProps> = ({ label, name, placeholder, theme = 'light', required = false, hint, textarea = false, error, ...rest }) => {
  return (
    <div className={`${styles.wrapper} ${styles[theme]} ${error ? styles.error : ''}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && '*'}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles.input}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles.input}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {(error || hint) && (
        <span className={styles.hint}>{error || hint}</span>
      )}
    </div>
  )
}

export default FormField
