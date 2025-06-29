import styles from './Documentation.module.css'
import Link from 'next/link'

interface DocumentationProps {
  data: {
    title: string
    approvedBy?: string
    description?: string
    pdf?: string
    sections: {
      title: string
      content: (
        | string
        | {
            subtitle: string
            items: string[]
          }
      )[]
    }[]
  }
}

const Documentation = ({ data }: DocumentationProps) => {
  return (
    <div className={styles.documentation}>
      {data.approvedBy && <div className={styles.documentationApprovedBy}>{data.approvedBy}</div>}

      <h1 className={styles.documentationTitle}>{data.title}</h1>

      {data.description && <p className={styles.documentationListItem}>{data.description}</p>}

      {data.sections.map((section, index) => (

        <section key={index} id={`section-${index}`} className={styles.documentationSection}>
          <h2 className={styles.documentationSectionTitle}>{section.title}</h2>
          <ul className="list-style">
            {section.content.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <li key={index} className={styles.documentationListItem}>
                    {item}
                  </li>
                )
              }

              return (
                <li key={index} className={styles.documentationListItem}>
                  {item.subtitle}
                  <ul className={styles.documentationListSub}>
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className={styles.documentationListSubItem}>
                        {subItem}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
      {data.pdf && (
        <Link
          href={data.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.documentationPdfLink}>
          Скачать PDF-документ
        </Link>
      )}
    </div>
  )
}

export default Documentation
