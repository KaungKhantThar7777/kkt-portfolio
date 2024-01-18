import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Kaung Khant Thar's portfolio",
  description: 'A portfolio of Kaung Khant Thar, a frontend developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-slate-900 text-slate-100'>
      <body className={urbanist.className}>

        <Header />
        {children}
      </body>
    </html>
  )
}
