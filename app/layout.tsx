import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unsigned Research',
  description: 'Science-backed Proprietary Trading',
  generator: 'UR TEAM',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
