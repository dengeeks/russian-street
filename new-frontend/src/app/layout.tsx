import '@/shared/styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/widgets/header'
import { Bahnschrift, Inter, Benzin } from '@/shared/styles/fonts'
import Footer from '@/widgets/footer'
import ModalManager from '@/widgets/modal-manager'
import { GlobalDataProvider } from '@/shared/context/global-data/GlobalDataContext'
import { ToastProvider } from '@/shared/context/toast/ToastContext'
import { getContact } from '@/shared/api/static/getContact'

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children}: RootLayoutProps) {
  const contact = await getContact()

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="64x64"/>
      </head>
      <body className={`${Bahnschrift.variable} ${Inter.variable} ${Benzin.variable}`}>
        <ToastProvider>
          <GlobalDataProvider staticContact={contact}>
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
