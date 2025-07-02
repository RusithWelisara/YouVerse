import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YouVerse - The OS for Your Life',
  description: 'Own your identity, enhance yourself, earn with AI. The future of personal digital transformation.',
  keywords: ['AI', 'Digital Identity', 'Personal OS', 'YouVerse', 'Digital Clone'],
  authors: [{ name: 'YouVerse Team' }],
  openGraph: {
    title: 'YouVerse - The OS for Your Life',
    description: 'Own your identity, enhance yourself, earn with AI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouVerse - The OS for Your Life',
    description: 'Own your identity, enhance yourself, earn with AI',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}