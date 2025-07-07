import styles from './Pagination.module.css'
import { getVisiblePages } from '../utils/getVisiblePages'

interface PaginationProps {
  page?: number
  total: number
  onChange?: (page: number) => void
}

const Pagination = ({ page = 1, total, onChange }: PaginationProps) => {
  const currentPage = page
  const visiblePages = getVisiblePages(currentPage, total)

  const handleClick = (newPage: number) => {
    if (newPage !== currentPage && onChange) {
      onChange(newPage)
      const anchor = document.getElementById('pagination-scroll');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <ul className={`${styles.paginationList} list-style`}>
        {visiblePages.map((item, idx) =>
          item === '...' ? (
            <li key={`ellipsis-${idx}`} className={styles.paginationEllipsis} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                className={`${styles.paginationPage} ${item === currentPage ? styles.paginationPageActive : ''}`}
                aria-current={item === currentPage ? 'page' : undefined}
                onClick={() => typeof item === 'number' && handleClick(item)}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}

export default Pagination
