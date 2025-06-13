import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlowFlix',
  description: 'FlowFlix – streamuj wygodnie z różnych platform',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
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