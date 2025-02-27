import './globals.css';
import type { Metadata, Viewport } from 'next';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import { ThemeProvider } from '@/lib/providers/theme-provider';
// Removed sidebar imports as they're now only used in picker layout
// Import all fonts using Next.js font system
import {
  Manrope,
  Inter,
  Roboto,
  Open_Sans,
  Playfair_Display,
  Montserrat,
  Lato,
  Merriweather,
  Fira_Code,
} from 'next/font/google';
import { FontProvider } from '@/lib/providers/font-provider';

export const metadata: Metadata = {
  title: 'Theem.ai',
  description:
    'Theem.ai is a tool that helps you create beautiful, responsive, and accessible themes for your website.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

// Load all fonts with Next.js
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const lato = Lato({
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
  subsets: ['latin'],
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

// Combine all font variables
const fontVariables = [
  manrope.variable,
  inter.variable,
  roboto.variable,
  openSans.variable,
  playfairDisplay.variable,
  montserrat.variable,
  lato.variable,
  merriweather.variable,
  firaCode.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let userPromise = getUser();

  return (
    <html lang='en' suppressHydrationWarning className={fontVariables}>
      <head>
        {/* Preconnect to Google Fonts to optimize font loading */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body className='min-h-[100dvh] text-foreground bg-background'>
        <ThemeProvider>
          <UserProvider userPromise={userPromise}>
            <FontProvider>{children}</FontProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
