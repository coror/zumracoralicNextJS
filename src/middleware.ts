import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, pathnames, defaultLocale } from './config';

export default createMiddleware({
  locales,
  pathnames,
  defaultLocale,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(sl|bs)/:path*'],
};
