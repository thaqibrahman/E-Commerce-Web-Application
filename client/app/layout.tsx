import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: 'ShopHub - Your One-Stop E-commerce Store',
  description: 'Discover amazing products at great prices. Shop electronics, fashion, home goods, and more.',
  icons: {
    icon: [
      {
        url: '/shophub-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/shophub-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/shophub-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/shophub-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4F46E5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
