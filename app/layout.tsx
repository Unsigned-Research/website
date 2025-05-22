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
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
