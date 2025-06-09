'use client';
import styles from './FeedbackContact.module.css';
import SectionTitle from '@/shared/ui/SectionTitle';
import FeedbackForm from '@/features/home/feedback-form';
import Link from 'next/link';
import { useHomeData } from '@/shared/context/home-data/useHomeDataContext'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import Image from 'next/image'
import { getImageUrl } from '@/shared/utils/getImageUrl'
import { extractIframeSrc } from '@/shared/utils/extractIframeSrc'

const FeedbackContact = () => {
  const {homeData: {organization_info}} = useHomeData()
  const {staticContact: {contact_footer}} = useGlobalData()
  
  const iframeSrc = extractIframeSrc(organization_info?.iframe || '');
  return (
    <section className={`container section-spacing-top ${styles.feedbackContact}`}>
      <SectionTitle>ВОЗНИКЛИ ВОПРОСЫ?</SectionTitle>
      <div className={styles.wrapper}>
        <div className={styles.infoBlock}>
          <div className={styles.map}>
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              allowFullScreen
              style={{ border: 0, display: 'block' }}
              title={organization_info?.address}
              aria-label={organization_info?.address}
              loading="lazy">

            </iframe>
          </div>

          <div className={styles.address}>
            <span className={styles.addressItem}>{organization_info?.address || '...'}</span>
            <span className={styles.addressItem}>{organization_info?.work_time || '...'}</span>
            <span className={styles.addressNumber}>8-800-550-5050</span>
          </div>

          <div className={styles.emailSocial}>
            <a
              href={`mailto:${organization_info?.email || ''}`}
              className={styles.email}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Отправить письмо на ${organization_info?.email || 'email'}`}>
              {organization_info?.email || '...'}
            </a>
            <div className={styles.socialIcons}>
              {contact_footer?.map((social, index) => (
                <Link href={social?.url || '#'} target="_blank" rel="noopener noreferrer" key={index}>
                  <Image src={getImageUrl(social?.image)} height={42} width={42} alt="Социальная сеть Улицы России" />
                </Link>
              ))}
            </div>
          </div>

          <a
            href={`mailto:${organization_info?.email || ''}`}
            className={styles.leadersLink}
            target="_blank"
            rel="noopener noreferrer">
            Связаться с руководителями
          </a>
        </div>

        <FeedbackForm />
      </div>
    </section>
  )
};

export default FeedbackContact;
