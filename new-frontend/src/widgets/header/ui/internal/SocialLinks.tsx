import Link from 'next/link'
import Icon from '@/shared/icon'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

export const SocialLinks = () => {
  const { staticContact } = useGlobalData()

  const { contact_header } = staticContact

  return (
    <div className="header-social">
      <Link
        href={contact_header?.vkontakte || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Перейти на нашу страницу ВКонтакте"
        title="ВКонтакте"
      >
        <Icon icon="vk" />
      </Link>
      <Link
        href={contact_header?.telegram || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Перейти в наш Telegram"
        title="Telegram"
      >
        <Icon icon="telegram" />
      </Link>
      <Link
        href={contact_header?.youtube || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Смотреть наш канал на YouTube"
        title="YouTube"
      >
        <Icon icon="youtube" />
      </Link>
    </div>
  )
}
