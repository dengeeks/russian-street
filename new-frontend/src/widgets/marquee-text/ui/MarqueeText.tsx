import styles from "./MarqueeText.module.css";

const MarqueeText = () => {
  function generateGrayText(repeatCount: number) {
    const text = "у тебя всё получится".repeat(repeatCount);
    return <span className={styles.marqueeText}>{text}</span>;
  }

  function generateBlackText(repeatCount: number) {
    const text = "улицы начинаются с тебя".repeat(repeatCount);
    return <span className={styles.marqueeText}>{text}</span>;
  }

  return (
    <section className={styles.wrapper}>
        <div className={`${styles.line} ${styles.lineGray}`}>{generateGrayText(10)}</div>
        <div className={`${styles.line} ${styles.lineBlack} dashed-y`}>{generateBlackText(10)}</div>
    </section>
  );
};

export default MarqueeText;
