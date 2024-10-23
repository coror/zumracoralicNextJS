import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { locales } from '@/config';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import Credit from '@/components/Credit';

export const dynamic = 'force-dynamic';

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
  const t = useTranslations('Navigation');
  const f = useTranslations('Footer');

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navbar
          home={t('home')}
          blogPosts={t('blogPosts')}
          events={t('events')}
          about={t('about')}
          services={t('services')}
          allServices={t('allServices')}
          NLPCoaching={t('NLPCoaching')}
          mediation={t('mediation')}
          workshop= {t('workshop')}
          contact={t('contact')}
        />
        <div>{children}</div>
        <Footer connect={f('connect')} />
        <Credit />
      </body>
    </html>
  );
}
