import '@/shared/styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/widgets/header'
import { Bahnschrift, Inter, Benzin } from '@/shared/styles/fonts'
import Footer from '@/widgets/footer'
import ModalManager from '@/widgets/modal-manager'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${Bahnschrift.variable} ${Inter.variable} ${Benzin.variable}`}>
        <Header />
        <ModalManager />
        {children}
        <Footer />
      </body>
    </html>
  )
}
