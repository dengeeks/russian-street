'use client'
import Button, { ButtonProps } from '@/shared/ui/Button'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import useModal from '@/shared/store/modal'

interface ActionButtonProps extends ButtonProps {
  /** Требуется ли авторизация для открытия модалки */
  requireAuth?: boolean
  /** Имя модалки, которую нужно открыть при действии */
  modalName: 'join-organization' | 'donating'
}

const ActionButton = ({ children, requireAuth = false, modalName, ...rest }: ActionButtonProps) => {
  const { userData } = useGlobalData()
  const { openModal } = useModal()

  if (!userData) {
    return (
      <Button {...rest}>{children}</Button>
    )
  }

  if (modalName === 'join-organization' && userData?.status) {
    return null
  }

  const handleClick = () => {
    if (requireAuth && !userData?.email) {
      openModal('login-user')
      return
    }

    openModal(modalName)
  }

  return (
    <Button type="button" onClick={handleClick} {...rest}>
      {children}
    </Button>
  )
}

export default ActionButton
