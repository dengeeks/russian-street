import './SectionTitle.css'
import { ReactNode } from 'react'

type SectionTitleProps = {
  children: ReactNode
  className?: string
}

const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
      <h2 className={`section-title ${className}`}>{children}</h2>
  )
}

export default SectionTitle
