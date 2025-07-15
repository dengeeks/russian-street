import styles from "./BottomNavigation.module.css";
import Link from 'next/link'
import { legalRouteMap } from '../model/legalRoutes'
import Icon from '@/shared/icon'

const BottomNavigation = () => {
  return (
    <nav className={styles.bottomNav}>
      {Object.entries(legalRouteMap).map(([href, { title, isFile, icon }]) => (
        <Link
          key={href}
          href={href}
          target={isFile ? "_blank" : undefined}
          rel={isFile ? "noopener noreferrer" : undefined}
          className={styles.mobileLink}
        >
          <Icon icon={icon} className={styles.icon} width={20} height={20} />
          <div className={styles.label} title={title}>{title}</div>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNavigation;
