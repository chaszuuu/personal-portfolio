import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const BASE_URL = 'https://charlesvincentpanlilio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Charles Vincent Panlilio',
  description:
    'Portfolio of Charles Vincent P. Panlilio — BSIT Student & Full-Stack Developer specializing in Flutter, Python, and full-stack web development.',
  keywords: [
    'Charles Vincent Panlilio',
    'Full-Stack Developer',
    'Flutter',
    'Python',
    'Next.js',
    'BSIT',
    'Philippines',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Charles Vincent Panlilio', url: BASE_URL }],
  creator: 'Charles Vincent Panlilio',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'Charles Vincent P. Panlilio | Full-Stack Developer',
    description:
      'BSIT Student & Full-Stack Developer specializing in Flutter, Python, and full-stack web development.',
    siteName: 'Charles Vincent Panlilio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Charles Vincent Panlilio — Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles Vincent P. Panlilio | Full-Stack Developer',
    description:
      'BSIT Student & Full-Stack Developer specializing in Flutter, Python, and full-stack web development.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.png' }],
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}