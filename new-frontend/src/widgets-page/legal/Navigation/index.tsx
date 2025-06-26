import styles from "./Navigation.module.css";
import Link from 'next/link'
import { legalRouteMap } from '../model/legalRoutes'

const Navigation = () => {
  return (
    <nav className={styles.legalNav}>
      {Object.entries(legalRouteMap).map(([href, label]) => (
        <Link key={href} href={href}>{label}</Link>
      ))}
    </nav>
  )
}

export default Navigation;