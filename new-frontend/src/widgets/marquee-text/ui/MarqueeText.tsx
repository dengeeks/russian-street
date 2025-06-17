import styles from './MarqueeText.module.css'

type MarqueeType = 'double' | 'single'

interface MarqueeTextProps {
  type?: MarqueeType;
  repeatCount?: number;
  singleText?: string;
  grayText?: string;
  blackText?: string;
}

const MarqueeText = ({ type = 'double', repeatCount = 10, singleText = 'мир улиц', blackText = "у тебя всё получится", grayText="улицы начинаются с тебя" }: MarqueeTextProps) => {
  if (type === 'single') {
    return (
      <section className={styles.wrapper}>
        <div className={`${styles.line} ${styles.lineSingle} dashed-y`}>
          <span className={styles.marqueeText}>{singleText.repeat(repeatCount)}</span>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.line} ${styles.lineGray}`}>
        <span className={styles.marqueeText}>{grayText.repeat(repeatCount)}</span>
      </div>
      <div className={`${styles.line} ${styles.lineBlack} dashed-y`}>
        <span className={styles.marqueeText}>{blackText.repeat(repeatCount)}</span>
      </div>
    </section>
  )
}

export default MarqueeText
