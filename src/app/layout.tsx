import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from './components/layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BrightWay Electrical & Plumbing Solutions',
  description: 'Your trusted electrical and plumbing experts serving the Portland metro area with 24/7 emergency services.',
  keywords: 'electrical services, plumbing services, emergency electrical, emergency plumbing, home maintenance, Portland',
  manifest: '/manifest.json',
  applicationName: 'BrightWay',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BrightWay',
    startupImage: [
      {
        url: '/ios/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        url: '/ios/apple-splash-1668-2388.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        url: '/ios/apple-splash-1536-2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        url: '/ios/apple-splash-1125-2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        url: '/ios/apple-splash-828-1792.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      }
    ]
  },
  icons: {
    icon: [
      { url: '/ios/16.png', sizes: '16x16', type: 'image/png' },
      { url: '/ios/32.png', sizes: '32x32', type: 'image/png' },
      { url: '/ios/192.png', sizes: '192x192', type: 'image/png' },
      { url: '/ios/512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/ios/180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        url: '/android/android-launchericon-192-192.png',
        sizes: '192x192',
        type: 'image/png',
        rel: 'maskable'
      },
      {
        url: '/android/android-launchericon-512-512.png',
        sizes: '512x512',
        type: 'image/png',
        rel: 'maskable'
      }
    ]
  },
  themeColor: '#1E40AF',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL('https://brightway.example.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brightway.example.com',
    title: 'BrightWay Electrical & Plumbing Solutions',
    description: 'Your trusted electrical and plumbing experts serving the Portland metro area with 24/7 emergency services.',
    siteName: 'BrightWay',
    images: [
      {
        url: 'https://brightway.example.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BrightWay Electrical & Plumbing Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrightWay Electrical & Plumbing Solutions',
    description: 'Your trusted electrical and plumbing experts serving the Portland metro area with 24/7 emergency services.',
    images: ['https://brightway.example.com/images/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* PWA meta tags */}
        <meta name="application-name" content="BrightWay Solutions" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BrightWay" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1E40AF" />
        <meta name="theme-color" content="#1E40AF" />
        
        <link rel="apple-touch-icon" href="/ios/180.png" />
        {/* Your existing meta tags and custom styles */}
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}