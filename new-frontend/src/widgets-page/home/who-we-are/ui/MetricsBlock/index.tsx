import styles from './MetricsBlock.module.css';
import { useHomeData } from '@/shared/context/home-data/useHomeDataContext'

const MetricsBlock = () => {
  const {homeData: {about_us}} = useHomeData();
  return (
    <div className={`dashed-y ${styles.metricsBlock}`}>
        <ul className={`container ${styles.metricsList}`}>
          <li className={styles.metricsItem}>
            <span className={styles.count}>1</span>
            <span className={styles.title}>Идея</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>{about_us?.discipline || 0}</span>
            <span className={styles.title}>Направлений</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>{about_us?.regions || 0}</span>
            <span className={styles.title}>Региона</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>{about_us?.media_publications || 0}</span>
            <span className={styles.title}>Публикаций в СМИ</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>{about_us?.event || 0}</span>
            <span className={styles.title}>Мероприятий</span>
          </li>
          <li className={styles.metricsItem}>
            <span className={styles.count}>{about_us?.person || 0}</span>
            <span className={styles.title}>Членов организации</span>
          </li>
        </ul>
    </div>
  );
};

export default MetricsBlock;
