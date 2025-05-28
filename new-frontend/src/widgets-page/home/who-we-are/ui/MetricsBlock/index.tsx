import styles from './MetricsBlock.module.css';

const MetricsBlock = () => {
  return (
    <div className={`dashed-y ${styles.metricsBlock}`}>
        <ul className={`container ${styles.metricsList}`}>
          <li className={styles.metricsItem}>
            <span className={styles.count}>1</span>
            <span className={styles.title}>Идея</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>14</span>
            <span className={styles.title}>Направлений</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>52</span>
            <span className={styles.title}>Региона</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>290</span>
            <span className={styles.title}>Публикаций в СМИ</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>197</span>
            <span className={styles.title}>Мероприятий</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>1187</span>
            <span className={styles.title}>Членов организации</span>
          </li>
        </ul>
    </div>
  );
};

export default MetricsBlock;
