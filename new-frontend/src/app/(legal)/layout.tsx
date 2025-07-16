import "@/shared/styles/legal.css"
import { ReactNode } from 'react'
import Navigation from '@/widgets-page/legal/Navigation'
import BreadcrumbsClient from '@/widgets-page/legal/BreadcrumbsClient'
import BottomNavigation from '@/widgets-page/legal/BottomNavigation'

interface LegalLayoutProps {
  children: ReactNode;
}

export default async function LegalLayout({ children}: LegalLayoutProps) {

  return (
    <>
      <BreadcrumbsClient/>
      <main className="container section-spacing-bottom legal-page">
        <Navigation/>
        {children}
      </main>
      <BottomNavigation/>
    </>
  )
}
