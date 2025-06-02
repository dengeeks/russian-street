import '@/shared/styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/widgets/header'
import { Bahnschrift, Inter, Benzin } from '@/shared/styles/fonts'
import Footer from '@/widgets/footer'
import ModalManager from '@/widgets/modal-manager'
import { GlobalDataProvider } from '@/shared/context/global-data/GlobalDataContext'
import { isMobileRequest } from '@/shared/hooks/server/isMobileRequest'

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const isMobile = await isMobileRequest()
  return (
    <html lang="ru">
      <body className={`${Bahnschrift.variable} ${Inter.variable} ${Benzin.variable}`}>
        <GlobalDataProvider serverIsMobile={isMobile}>
          <Header />
          <ModalManager />
          {children}
          <Footer />
        </GlobalDataProvider>
      </body>
    </html>
  )
}
