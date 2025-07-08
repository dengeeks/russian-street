import styles from './MarqueeText.module.css'

type MarqueeType = 'double' | 'single'

interface MarqueeTextProps {
  type?: MarqueeType;
  singleText?: string;
  grayText?: string;
  blackText?: string;
}

const MarqueeText = ({
                       type = 'double',
                       singleText = 'мир улиц',
                       blackText = 'у тебя всё получится',
                       grayText = 'улицы начинаются с тебя',
                     }: MarqueeTextProps) => {
  const renderMarquee = (text: string, className: string, repeatCount: number) => (
    <div className={`${styles.line} ${className}`}>
      <div className={styles.marqueeInner}>
        <span className={styles.marquee1}>{(text + ' ').repeat(repeatCount)}</span>
        <span className={styles.marquee2}>{(text + ' ').repeat(repeatCount)}</span>
      </div>
    </div>
  );

  if (type === 'single') {
    return (
      <section className={styles.wrapper}>
        {renderMarquee(singleText, `${styles.lineSingle} dashed-y`, 20)}
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      {renderMarquee(grayText, styles.lineGray, 10)}
      {renderMarquee(blackText, `${styles.lineBlack} dashed-y`, 10)}
    </section>
  );
};

export default MarqueeText;