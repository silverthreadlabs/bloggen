import { Suspense } from 'react';

import type { Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/footer';
import { env } from '@/lib/utils/env';
import { GoogleAnalytics } from '@next/third-parties/google';

import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';        
import Navbar from '@/components/authui/Navbar';
import { Toaster } from '@/components/authui/Toasts/toaster';

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    variable: '--font-manrope',
    preload: true, // Add this
    fallback: ['system-ui', 'arial'] // Add fallback
});
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang='en' className={`${manrope.variable}`}>
            <Suspense fallback={null}>
                <GoogleAnalytics gaId={env?.GOOGLE_ANALYTICS_MEASUREMENT_ID || ''} />
            </Suspense>
            {/* Ahrefs Analytics */}
            <Script
                src='https://analytics.ahrefs.com/analytics.js'
                data-key={process.env?.AHREFS_ANALYTICS_KEY || ''}
                strategy='afterInteractive'
            />
            <body className='antialiased lg:mx-auto' suppressHydrationWarning>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem={true}
                    storageKey='bloggen-seo-starter-theme'
                    disableTransitionOnChange>
                    <main className='from-canvas-bg to-canvas-bg-base flex flex-auto flex-col items-center bg-gradient-to-b md:px-0'>
                        <Banner />
                        <Navbar/>
                        <RootProvider>{children}</RootProvider>
                        <Footer />
                    </main>
                </ThemeProvider>
                <Suspense fallback={null}>
                    <Toaster />
                </Suspense>
                {/* <Script
          src="https://analytics.ahrefs.com/analytics.js"
          strategy="lazyOnload"
          data-key="sQQb4vR/PAMuQQuYe+LiXQ"
        /> */}
            </body>
        </html>
    );
}
