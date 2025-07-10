import styles from './RegionLeader.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'
import Link from 'next/link'
import { RegionManagerWithInfoType } from '@/shared/api/region/detail/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const RegionLeader = ({
  email,
  info,
  avatar,
  last_name,
  first_name,
  address,
  phone_number,
  social_links
}: RegionManagerWithInfoType) => {
  return (
    <section className={`container section-spacing-top section-spacing-bottom ${styles.regionLeader}`}>
      <SectionTitle>Руководитель</SectionTitle>
      <div className={styles.regionLeaderWrapper}>
        <div className={styles.regionLeaderImageWrapper}>
          <Image
            src={getImageUrl(avatar || undefined)}
            fill
            alt="Фото руководителя"
            sizes="
    (min-width: 880px) 427px,
    (min-width: 850px) 400px,
    (min-width: 820px) 370px,
    (min-width: 768px) 350px,
    (min-width: 470px) 427px
    (max-width: 469px) calc(100vw - 32px)"
          />
        </div>
        <div className={styles.regionLeaderContent}>
          <div className={styles.regionLeaderName}>
            {first_name} {last_name}
          </div>
          {info && <p className={styles.regionLeaderDescription}>{info}</p>}
          <div className={styles.regionLeaderContacts}>
            {email && (
              <div className={styles.contactItem}>
                <span className={styles.contactTitle}>Электронная почта</span>
                <span className={styles.contactValue}>{email}</span>
              </div>
            )}
            {phone_number && (
              <div className={styles.contactItem}>
                <span className={styles.contactTitle}>Номер телефона</span>
                <span className={styles.contactValue}>{phone_number}</span>
              </div>
            )}
            {address && (
              <div className={styles.contactItem}>
                <span className={styles.contactTitle}>Адрес офиса</span>
                <span className={styles.contactValue}>{address}</span>
              </div>
            )}
          </div>
          {social_links.length > 0 && (
            <div className={styles.regionLeaderSocials}>
              {social_links.map((social, index) => (
                <Link href={social.url} target="_blank" rel="noopener noreferrer" key={index}>
                  <Image src={getImageUrl(social.social_media.image)} alt="" width={42} height={42} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RegionLeader
