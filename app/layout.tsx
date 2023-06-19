import Modal from '@/components/Modal'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trello 2.0',
  description: 'Trello 2.0, built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/logos.ico' />
      </head>
      <body >
        {children}
        <Modal />
        </body>
    </html>
  )
}
