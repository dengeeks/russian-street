'use client'
import { ReactNode } from 'react'
import Button from '@/shared/ui/Button'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import useModal from '@/shared/store/modal'

interface JoinOrganizationButtonProps {
  children: ReactNode
}

const JoinOrganizationButton = ({ children }: JoinOrganizationButtonProps) => {
  const { userData } = useGlobalData()
  const { openModal } = useModal()

  const handleClick = () => {
    if (userData?.email) {
      openModal('join-organization')
    } else {
      openModal('login-user')
    }
  }

  return (
    <Button type="button" onClick={handleClick}>
      {children}
    </Button>
  )
}


export default JoinOrganizationButton