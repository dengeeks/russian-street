'use client';
import styles from './FeedbackContact.module.css';
import SectionTitle from '@/shared/ui/SectionTitle';
import FeedbackForm from '@/features/home/feedback-form/ui/FeedbackForm';
import Link from 'next/link';
import Icon from '@/shared/icon';

const FeedbackContact = () => {
  const address = "улица Сергея Макеева, 1, Москва, 123100";

  return (
    <section className={`container section-spacing-top ${styles.feedbackContact}`}>
      <SectionTitle>ВОЗНИКЛИ ВОПРОСЫ?</SectionTitle>
      <div className={styles.wrapper}>
        <div className={styles.infoBlock}>
          <div className={styles.map}>
            <iframe
              src="https://yandex.com/map-widget/v1/org/mon_plezir/1018167095/?ll=37.549935%2C55.756529&utm_source=share&z=20"
              width="100%"
              height="100%"
              allowFullScreen
              style={{ border: 0, display: "block" }}
              title={address}
              aria-label={address}
            ></iframe>
          </div>

          <div className={styles.address}>
            <span className={styles.addressItem}>Офис в Москве: Малая Москваская, 11, д. 5/4</span>
            <span className={styles.addressItem}>ПН–ПТ с 09:00–18:00</span>
            <span className={styles.addressNumber}>8-800-550-5050</span>
          </div>

          <div className={styles.emailSocial}>
            <span className={styles.email}>info@streetrussia.ru</span>
            <div className={styles.socialIcons}>
              <Link href="/"><Icon icon="youtube" height={42} width={42} /></Link>
              <Link href="/"><Icon icon="telegram" height={42} width={42} /></Link>
              <Link href="/"><Icon icon="whatsapp" height={42} width={42} /></Link>
            </div>
          </div>

          <Link href="" className={styles.leadersLink}>
            Связаться с руководителями
          </Link>
        </div>

        <FeedbackForm />
      </div>
    </section>
  );
};

export default FeedbackContact;
