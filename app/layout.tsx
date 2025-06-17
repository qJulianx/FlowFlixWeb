import type { Metadata } from 'next';
import './globals.css';

// 🔽 Dodaj import komponentu licznika
import VisitCounterDevtools from '@/components/VisitCounterDevtools';

export const metadata: Metadata = {
  title: 'FlowFlix',
  description: 'FlowFlix – Platforma z różnymi Filmami/Serialami za darmo',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 🔽 Komponent licznika */}
        <VisitCounterDevtools />
        {/* 🔽 Zawartość strony */}
        {children}
      </body>
    </html>
  );
}