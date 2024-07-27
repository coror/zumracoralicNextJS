import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'sl' as const;
export const locales = ['sl', 'bs'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/blogs': {
    sl: '/blog',
    bs: '/blog',
  },
  '/events': {
    sl: '/dogodki',
    bs: '/dogadaji'
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
