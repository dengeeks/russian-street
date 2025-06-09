import '@/shared/styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/widgets/header'
import { Bahnschrift, Inter, Benzin } from '@/shared/styles/fonts'
import Footer from '@/widgets/footer'
import ModalManager from '@/widgets/modal-manager'
import { GlobalDataProvider } from '@/shared/context/global-data/GlobalDataContext'
import { isMobileRequest } from '@/shared/hooks/server/isMobileRequest'
import { ToastProvider } from '@/shared/context/toast/ToastContext'
import { getUser } from '@/shared/api/user/getUser'
import { getContact } from '@/shared/api/static/getContact'

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children}: RootLayoutProps) {
  const isMobile = await isMobileRequest()
  const user = await getUser()
  const contact = await getContact()

  return (
    <html lang="ru">
      <body className={`${Bahnschrift.variable} ${Inter.variable} ${Benzin.variable}`}>
        <ToastProvider>
          <GlobalDataProvider serverIsMobile={isMobile} userData={user} staticContact={contact}>
            <Header />
            <ModalManager />
            {children}
            <Footer />
          </GlobalDataProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
