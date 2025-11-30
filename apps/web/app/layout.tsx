import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@realtyeaseai/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "RealtyEaseAI - Scale Your Business with Expert VAs & AI Tools",
  description: "Get dedicated virtual assistants for social media, marketing, and web development. Supercharged with AI tools to 10x productivity.",
  keywords: ["virtual assistant", "AI automation", "social media management", "digital marketing", "web development", "business automation"],
  authors: [{ name: "RealtyEaseAI" }],
  creator: "RealtyEaseAI",
  publisher: "RealtyEaseAI",
  metadataBase: new URL('https://realtyeaseai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "RealtyEaseAI - Scale Your Business with Expert VAs & AI Tools",
    description: "Get dedicated virtual assistants for social media, marketing, and web development. Supercharged with AI tools to 10x productivity.",
    url: 'https://realtyeaseai.com',
    siteName: 'RealtyEaseAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "RealtyEaseAI - Scale Your Business with Expert VAs & AI Tools",
    description: "Get dedicated virtual assistants for social media, marketing, and web development. Supercharged with AI tools to 10x productivity.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
