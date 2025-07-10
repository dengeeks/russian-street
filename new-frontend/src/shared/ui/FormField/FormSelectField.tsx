import { forwardRef, InputHTMLAttributes, useImperativeHandle } from 'react'
import styles from './FormField.module.css'
import Icon from '@/shared/icon'
import { useFormSelect } from './model/useFormSelect'

type Option = {
  id: string
  name: string
}

interface BaseProps {
  label?: string
  name: string
  placeholder?: string
  theme?: 'light' | 'dark' | 'grey'
  required?: boolean
  hint?: string
  options?: Option[]
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void;
  searchable?: boolean;
}

const FormSelectField = forwardRef<HTMLDivElement, BaseProps>(
  (
    {
      label,
      name,
      placeholder = ' ',
      theme = 'light',
      required = false,
      hint,
      error,
      options = [],
      value = '',
      onChange,
      onBlur,
      searchable,
      ...rest
    },
    ref
  ) => {
    const { open, search, setSearch, filteredOptions, containerRef, toggleOpen, handleSelect } =
      useFormSelect(options, onBlur)

    useImperativeHandle(ref, () => containerRef.current!, [])

    return (
      <div className={`${styles.wrapper} ${styles[theme]} ${error ? styles.error : ''}`} ref={containerRef}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
            {required && '*'}
          </label>
        )}

        <div
          id={name}
          className={`${styles.select} ${styles.input} ${!value ? styles.placeholder : ''}`}
          onClick={toggleOpen}
          tabIndex={0}
          onBlur={onBlur}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        >
          {open && searchable ? (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Поиск..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && filteredOptions.length > 0) {
                  handleSelect(filteredOptions[0].id, onChange)
                }
              }}
              autoFocus
            />
          ) : (
            <span>{options.find(opt => opt.id === value)?.name || placeholder}</span>
          )}
          <Icon icon="chevron" />
        </div>

        {open && (
          <ul className={styles.options}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <li key={opt.id} className={styles.option} onClick={() => handleSelect(opt.id, onChange)}>
                  {opt.name}
                </li>
              ))
            ) : (
              <li className={`${styles.noResults} ${styles.option}`}>Ничего не найдено</li>
            )}
          </ul>
        )}

        {(error || hint) && <span className={styles.hint}>{error || hint}</span>}
      </div>
    )
  }
)

FormSelectField.displayName = 'FormSelectField'

export default FormSelectField
