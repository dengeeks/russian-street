import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle, useCallback
} from 'react'
import styles from './FormField.module.css'
import Icon from '@/shared/icon'

interface BaseProps {
  label?: string
  name: string
  placeholder?: string
  theme?: 'light' | 'dark' | 'grey'
  required?: boolean
  hint?: string
  options?: string[]
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

const FormSelectField = forwardRef<HTMLDivElement, BaseProps>(({ label, name, placeholder = ' ', theme = 'light', required = false, hint, error, options = [], value = '', onChange, onBlur, ...rest }, ref) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => containerRef.current!, [])

  const handleSelect = (option: string) => {
    onChange?.(option)
    setOpen(false)
  }

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setOpen(false)
      onBlur?.()
    }
  }, [onBlur])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div
      className={`${styles.wrapper} ${styles[theme]} ${error ? styles.error : ''}`}
      ref={containerRef}
    >
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}{required && '*'}
        </label>
      )}

      <div
        id={name}
        className={`${styles.select} ${styles.input} ${!value ? styles.placeholder : ''}`}
        onClick={() => setOpen(prev => !prev)}
        tabIndex={0}
        onBlur={onBlur}
        {...rest}
      >
        <span>{value || placeholder}</span>
        <Icon icon="chevron" />
      </div>

      {open && (
        <ul className={styles.options}>
          {options.map(opt => (
            <li
              key={opt}
              className={styles.option}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      {(error || hint) && (
        <span className={styles.hint}>{error || hint}</span>
      )}
    </div>
  )
})

FormSelectField.displayName = 'FormSelectField'

export default FormSelectField
