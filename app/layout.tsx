import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const viewport: Viewport = {
  themeColor: "#e91e63",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "FlowFlix - Twoje Filmy i Seriale Online | Oglądaj za darmo",
  description: "FlowFlix - Oglądaj za darmo filmy i seriale online za darmo. Ponad 50,000 tytułów, bez reklam, język polski. Pobierz na Android, Windows, iOS.",
  applicationName: "FlowFlix",
  authors: [{ name: "FlowFlix Team" }],
  keywords: ["polskie seriale online za darmo", "filmy online za darmo", "seriale online", "flowflix", "oglądaj filmy za darmo", "flow flix", "polskie napisy", "android app", "streaming"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://flowflix.vercel.app/",
  },
  openGraph: {
    type: "website",
    title: "FlowFlix - Twoje Filmy i Seriale Online",
    description: "Oglądaj filmy i seriale za darmo. Ponad 50,000 tytułów bez reklam z polskimi napisami. Dostępne na Android, Windows i iOS.",
    siteName: "FlowFlix",
    url: "https://flowflix.vercel.app/",
    locale: "pl_PL",
    images: [
      {
        url: "https://flowflix.vercel.app/logo2.png",
        width: 1200,
        height: 630,
        alt: "FlowFlix Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowFlix - Twoje Filmy i Seriale Online",
    description: "Oglądaj filmy i seriale za darmo. Ponad 50,000 tytułów bez reklam z polskimi napisami.",
    creator: "@FlowFlix",
    images: ["https://flowflix.vercel.app/logo2.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FlowFlix",
  },
  other: {
    "yandex-verification": "3752681036f00e34",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/favicon-64x64.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <body
        className={`${manrope.variable} font-sans antialiased bg-[#020202] text-white overflow-x-hidden relative selection:bg-purple-500/30 selection:text-purple-200`}
      >
        {/* Global Background Effects */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Content Overlay */}
        <div className="relative z-10">
            {children}
        </div>
      </body>
    </html>
  );
}
