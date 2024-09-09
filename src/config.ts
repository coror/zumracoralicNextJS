import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'sl' as const;
export const locales = ['sl', 'bs'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/blogs': {
    sl: '/blog',
    bs: '/blog',
  },
  '/blogs/[slug]': {
    sl: '/blog/[slug]',
    bs: '/blog/[slug]',
  },
  '/events': {
    sl: '/dogodki',
    bs: '/dogadaji',
  },
  '/events/[slug]': {
    sl: '/dogodki/[slug]',
    bs: '/dogadaji/[slug]',
  },
  '/about-me': {
    sl: '/o-meni',
    bs: '/o-meni',
  },
  '/services': {
    sl: '/storitve',
    bs: '/usluge',
  },
  '/services/coaching': {
    sl: '/storitve/coaching',
    bs: '/usluge/coaching',
  },
  '/services/mediation': {
    sl: '/storitve/mediacija',
    bs: '/usluge/medijacija',
  },
  '/services/workshop': {
    sl: '/storitve/delavnice-predavanja',
    bs: '/usluge/radionice-predavanja',
  },
  '/services/workshop/[slug]': {
    sl: '/storitve/delavnice-predavanja/[slug]',
    bs: '/usluge/radionice-predavanja/[slug]',
  },
  '/contact': {
    sl: '/kontakt',
    bs: '/kontakt',
  },
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
