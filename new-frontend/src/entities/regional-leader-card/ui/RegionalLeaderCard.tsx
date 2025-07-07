'use client'
import styles from './RegionalLeaderCard.module.css'
import Image from 'next/image'
import { getImageUrl } from '@/shared/utils/getImageUrl'
import Link from 'next/link'
import { useRegionManager } from '@/entities/regional-leader-card/hook/useRegionManager'

interface RegionalLeaderCardProps {
  region_id: string;
}

const RegionalLeaderCard = ({ region_id }: RegionalLeaderCardProps) => {

  const {regionManager} = useRegionManager(region_id);

  if (!regionManager || Object.keys(regionManager).length === 0) {
    return null;
  }
  const {uuid, avatar, last_name, first_name, email, phone_number, social_links, address} = regionManager;

  return (
    <article className={styles.regionalLeaderCard}>
      <Link href={`/region/${uuid}`}>
        <Image
          className={styles.regionalLeaderCardImage}
          src={getImageUrl(avatar || undefined)}
          alt="Фото представителя региона"
          width={286}
          height={249}
        />
      </Link>
      <div className={styles.regionalLeaderCardInfo}>
        <span className={styles.regionalLeaderCardTitle}>Представитель региона</span>
        <p className={styles.regionalLeaderCardName}>
          {first_name} {last_name}
        </p>
        <div className={styles.regionalLeaderCardContacts}>
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.regionalLeaderCardEmail}>
            {email}
          </a>
          <a
            href={`tel:${phone_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.regionalLeaderCardPhone}>
            {phone_number}
          </a>
        </div>
        <address className={styles.regionalLeaderCardOffice}>{address}</address>
        <div className={styles.regionalLeaderCardSocials}>
          {social_links.map((social, i) => (
            <a
              href={social.url}
              key={i}
              className={styles.regionalLeaderCardSocialLink}
              target="_blank"
              rel="noopener noreferrer">
              <Image src={getImageUrl(social.social_media.image)} alt="Соцсеть" width={42} height={42} />
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default RegionalLeaderCard
