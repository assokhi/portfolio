import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// ─── Fonts ────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ─── Static Metadata ──────────────────────────────────────────
// Update name, description, and URL to match your details.
export const metadata: Metadata = {
  title: 'Arvinder Singh Sokhi — Software Engineer',
  description:
    'Software engineer specializing in backend architecture, distributed systems, and applied AI. Apache Maven contributor at the Apache Software Foundation. Minimalist portfolio built with Next.js.',
  keywords: [
    'Arvinder Singh Sokhi',
    'software engineer',
    'backend developer',
    'distributed systems',
    'open source',
    'Apache Maven',
    'Next.js portfolio',
    'AI agent',
    'LangGraph',
    'Punjab Engineering College',
  ],
  authors: [{ name: 'Arvinder Singh Sokhi' }],
  openGraph: {
    title: 'Arvinder Singh Sokhi — Software Engineer',
    description:
      'Backend, distributed systems, and AI. Open-source contributor to Apache Maven.',
    type: 'profile',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Arvinder Singh Sokhi — Software Engineer',
    description:
      'Backend, distributed systems, and AI. Open-source contributor to Apache Maven.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ─── JSON-LD structured data (Person schema) ─────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arvinder Singh Sokhi',
  url: 'https://assokhi.github.io/portfolio',
  email: 'singhsokhiarvinder@gmail.com',
  jobTitle: 'Software Engineer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Punjab Engineering College',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressCountry: 'IN',
    },
  },
  knowsAbout: [
    'Backend Engineering',
    'Distributed Systems',
    'Apache Maven',
    'Java',
    'Spring Boot',
    'LangGraph',
    'Artificial Intelligence',
  ],
  sameAs: [
    'https://github.com/assokhi',
    'https://www.linkedin.com/in/assokhi/',
    'https://leetcode.com/u/Arvinder_Singh_Sokhi/',
  ],
}

// ─── Root Layout ─────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  )
}
