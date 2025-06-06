import '@/shared/styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/widgets/header'
import { Bahnschrift, Inter, Benzin } from '@/shared/styles/fonts'
import Footer from '@/widgets/footer'
import ModalManager from '@/widgets/modal-manager'
import { GlobalDataProvider } from '@/shared/context/global-data/GlobalDataContext'
import { isMobileRequest } from '@/shared/hooks/server/isMobileRequest'
import { ToastProvider } from '@/shared/context/toast/ToastContext'

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children}: RootLayoutProps) {
  const isMobile = await isMobileRequest()

  return (
    <html lang="ru">
      <body className={`${Bahnschrift.variable} ${Inter.variable} ${Benzin.variable}`}>
        <ToastProvider>
          <GlobalDataProvider serverIsMobile={isMobile}>
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
