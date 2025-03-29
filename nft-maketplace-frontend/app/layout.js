'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Cloud, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/ThemeProvider.jsx';
import "./globals.css";
import Header from '@/components/Header';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="h-screen overflow-hidden bg-background font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-full">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-card px-6 py-4 flex items-center justify-between shadow-md z-50">
              
              {/* Left Section: Logo */}
              <Link href="/">
                <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer">
                  <Sparkles className="h-6 w-6" />
                  NFTBroZZ
                </div>
              </Link>

              {/* Center Section: Dashboard & Mint NFT */}
              <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-6">
                <Link
                  href="/"
                  className={`text-lg font-medium ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/mint"
                  className={`text-lg font-medium ${pathname === '/mint' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Mint NFT
                </Link>
              </div>

              {/* Right Section: Wallet & Profile */}
              <div className="flex items-center space-x-auto">
                <Header />
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </Button>
              </div>
            </nav>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 top-16 bg-card md:hidden flex flex-col items-center space-y-4 py-6 shadow-lg">
                <Link
                  href="/"
                  className={`text-lg font-medium ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/mint"
                  className={`text-lg font-medium ${pathname === '/mint' ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mint NFT
                </Link>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-20">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
