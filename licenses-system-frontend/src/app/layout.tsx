import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})
export const metadata: Metadata = {
  title: 'H4 Investimentos',
  description: 'H4 Investimentos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable}  antialiased text-blueDark min-h-screen h-full`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
