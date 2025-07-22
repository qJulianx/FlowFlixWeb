import type { Metadata } from 'next';
import './globals.css';

// 🔽 Dodaj import komponentu licznika
import VisitCounterDevtools from '@/components/VisitCounterDevtools';

export const metadata: Metadata = {
  title: 'FlowFlix - Filmy/Seriale ',
  description: 'FlowFlix – Twój świat filmów i seriali. Szukasz miejsca, gdzie możesz oglądać filmy i seriale bez reklam, ukrytych opłat? A może chcesz mieć realny wpływ na rozwój aplikacji?',
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
        
        {children}
      </body>
    </html>
  );
}