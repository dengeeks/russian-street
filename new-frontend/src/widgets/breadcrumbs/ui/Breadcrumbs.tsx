import styles from './Breadcrumbs.module.css';
import Link from 'next/link'

type Crumb = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: Crumb[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
      <nav className={`${styles.breadcrumbs} container`} aria-label="breadcrumb">
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
                <li key={index} className={styles.item}>
                  {isLast ? (
                      <span aria-current="page">
                       {item.label}
                      </span>
                  ) : (
                      <>
                        <Link href={item.href || '#'} className={styles.link}>
                          {item.label}
                        </Link>
                        &nbsp;/&nbsp;
                      </>
                  )}
                </li>
            );
          })}
        </ol>
      </nav>

  );
};

export default Breadcrumbs;
