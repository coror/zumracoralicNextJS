import type { Metadata } from 'next';
import { Inter, Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { locales } from '@/config';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { bg } from 'date-fns/locale';

const inter = Playfair_Display({ subsets: ['latin'] });

export async function generateMetadata() {}

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
          services={t('services')}
          about={t('about')}
        />
        <div>{children}</div>
        <Footer connect={f('connect')} />
      </body>
    </html>
  );
}
