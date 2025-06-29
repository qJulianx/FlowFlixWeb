import type { Metadata } from 'next';
import './globals.css';

// 🔽 Dodaj import komponentu licznika
import VisitCounterDevtools from '@/components/VisitCounterDevtools';

export const metadata: Metadata = {
  title: 'FlowFlix',
  description: 'FlowFlix – Platforma z różnymi Filmami/Serialami za darmo',
  generator: 'v0.dev',
  icons: { icon: '/favicon.ico' },
  verification: {
    google: 'xsnKJrvWzLdfcR4zPXVQE-VaIDSAI6tlu6InzE0RZCM'  // tylko sam kod, np. "o28TGr-Eb…", bez przedrostka
  }
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