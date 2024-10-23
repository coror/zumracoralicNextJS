import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { locales } from '@/config';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import Credit from '@/components/Credit';
import { readFileSync } from 'fs';
import path from 'path';


const inter = Playfair_Display({ subsets: ['latin'] });

// Define the metadata for the application
export const metadata: Metadata = {
  metadataBase: new URL('https://www.zumracoralic.com'),
  title: {
    template: 'Zumra Coralic',
    default: 'Zumra Coralic',
  },
  alternates: {
    canonical: './',
  },
};

// Load messages dynamically based on locale
const loadMessages = (locale: string) => {
  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);

  try {
    const messages = JSON.parse(readFileSync(filePath, 'utf-8'));
    console.log(`Loaded messages for locale: ${locale}`, messages);
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return {}; // Return empty object on error
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = loadMessages(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale} />
          <div>{children}</div>
          <Footer locale={locale} />
          <Credit />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
