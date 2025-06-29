import styles from "./TeamCard.module.css";
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'
import { TeamMember } from '@/shared/api/team/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const TeamCard = ({first_name, last_name, info, image}: TeamMember) => {
  const fullName = `${first_name} ${last_name}`
  return (
    <div className={styles.teamContent}>
      <div className={styles.teamInfo}>
        <SectionTitle>{fullName}</SectionTitle>
        <p className={styles.teamDescription}>{info}</p>
      </div>
      <div className={styles.teamImageWrapper}>
        <Image src={getImageUrl(image)} alt={fullName} fill sizes="
    (min-width: 930px) 565px,
    (min-width: 850px) 520px,
    (min-width: 800px) 470px,
    (min-width: 768px) 430px,
    234px"/>
      </div>
    </div>
  )
}

export default TeamCard;