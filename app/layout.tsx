import type { Metadata, Viewport } from 'next'
import { Cinzel, Playfair_Display, Amiri, DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

/* ── Google Fonts ─────────────────────────────────────────────────────────── */
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-brand',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-arabic',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Arabic Enthusiast — Learn Arabic with Passion & Precision',
  description:
    'Professional Arabic language courses — Classical, Levantine, and Quranic. ' +
    'Taught by Hadi Shokeir, linguist, translator, and Islamic seminary student.',
  keywords: [
    'Arabic lessons', 'Quranic Arabic', 'Levantine Arabic',
    'Classical Arabic', 'learn Arabic online', 'Arabic tutor',
    'hawza Arabic', 'Arabic language course',
  ],
  openGraph: {
    title: 'Arabic Enthusiast — by Hadi Shokeir',
    description: 'Structured Arabic courses from a teacher trained in modern linguistics and classical hawza scholarship.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#080808',
}

/* ── Root Layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Blocking theme script — reads localStorage before first paint.
          This prevents any flash of the wrong theme on load.
          Must be inline and synchronous (no defer/async).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('ae-theme');
                  var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={[
          cinzel.variable,
          playfair.variable,
          amiri.variable,
          dmSans.variable,
        ].join(' ')}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
