import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { getBaseUrl, defaultSeoConfig } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"] })

// 获取基础URL
const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: defaultSeoConfig.title,
  description: defaultSeoConfig.description,
  keywords: defaultSeoConfig.keywords,
  generator: 'v0.dev',
  robots: defaultSeoConfig.robots,
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png?v=2', type: 'image/png', sizes: '16x16' },
      { url: '/favicon_io/favicon-32x32.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/favicon_io/android-chrome-192x192.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/favicon_io/android-chrome-512x512.png?v=2', type: 'image/png', sizes: '512x512' },
      { url: '/favicon_io/favicon.ico?v=2' },
    ],
    apple: '/favicon_io/apple-touch-icon.png?v=2',
    shortcut: '/favicon_io/favicon.ico?v=2',
  },
  manifest: '/favicon_io/site.webmanifest?v=2',
  // 添加规范URL元数据
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  // 添加OpenGraph元数据
  openGraph: {
    title: defaultSeoConfig.openGraph.title,
    description: defaultSeoConfig.openGraph.description,
    url: baseUrl,
    siteName: defaultSeoConfig.openGraph.site_name,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Tooth Fae',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  // 添加Twitter卡片元数据
  twitter: {
    card: 'summary_large_image',
    title: defaultSeoConfig.title,
    description: defaultSeoConfig.description,
    creator: defaultSeoConfig.twitter.handle,
    site: defaultSeoConfig.twitter.site,
    images: [`${baseUrl}/og-image.jpg`],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2660471109682751"
     crossOrigin="anonymous"></script>
        {/* Favicons (cache-busted) */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png?v=2" />
        <link rel="icon" href="/favicon_io/favicon.ico?v=2" />
        <link rel="manifest" href="/favicon_io/site.webmanifest?v=2" />
        {/* 添加规范URL标签 */}
        <link rel="canonical" href={baseUrl} />
        
        {/* 手动添加meta描述标签，确保长度正确 */}
        <meta
          name="description"
          content="The Tooth Fae is a nocturnal horror heist—stalk sleepers, manage Lucidity, Pain, and Fear, and deliver rare trophies to the Queen before anyone wakes."
        />

        {/* 手动添加OpenGraph和Twitter元标签 */}
        <meta property="og:description" content="Plan nightmare heists, siphon rare teeth, and survive the Queen's demands in The Tooth Fae." />
        <meta property="twitter:description" content="Take command of a tooth fae operative in this dark fantasy extraction game."
        />
        
        {/* 添加结构化数据 JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoGame',
              name: defaultSeoConfig.title,
              description: defaultSeoConfig.description,
              image: `${baseUrl}/og-image.jpg`,
              url: baseUrl,
              genre: ['Horror', 'Stealth', 'Dark Fantasy'],
              applicationCategory: 'Game',
              operatingSystem: ['Windows', 'macOS', 'Linux', 'Browser'],
              author: {
                '@type': 'Organization',
                name: 'The Tooth Fae Team',
                url: baseUrl
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '180'
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="tooth-fae-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
