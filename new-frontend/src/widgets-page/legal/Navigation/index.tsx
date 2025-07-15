import styles from "./Navigation.module.css";
import Link from 'next/link'
import { legalRouteMap } from '../model/legalRoutes'

const Navigation = () => {
  return (
    <nav className={styles.legalNav}>
      {Object.entries(legalRouteMap).map(([href, { title, isFile }]) => (
        isFile ? (
          <Link key={href} href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </Link>
        ) : (
          <Link key={href} href={href}>
            {title}
          </Link>
        )
      ))}
    </nav>
  )
}

export default Navigation;