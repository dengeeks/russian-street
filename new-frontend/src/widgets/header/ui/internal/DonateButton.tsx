// widgets/header/ui/internal/DonateButton.tsx
'use client'
import Icon from '@/shared/icon'
import Button from '@/shared/ui/Button'
import useModal from '@/shared/store/modal'

interface DonateButtonProps {
  className?: string
  iconOnly?: boolean
}

export const DonateButton = ({ className = '', iconOnly = false }: DonateButtonProps) => {
  const { openModal } = useModal()

  if (iconOnly) {
    return (
      <button
        type="button"
        className={`${className} hoverEffect`}
        onClick={() => openModal('donating')}
        aria-label="Поддержать нас"
      >
        <Icon icon="donating" />
      </button>
    )
  }

  return (
    <Button
      type="button"
      className={`red ${className}`}
      onClick={() => openModal('donating')}
      aria-label="Поддержать нас"
    >
      поддержать нас
    </Button>
  )
}
