import { pathnames, locales, defaultLocale } from '@/config';
import type { PageMetadata } from '@/types/metadata';

const baseUrl = 'https://www.zumracoralic.com';

type LocaleKey = (typeof locales)[number];
type PathnameKey = keyof typeof pathnames;

function buildLocalizedPath(
  key: PathnameKey,
  locale: LocaleKey,
  params?: Record<string, string>,
): string {
  const entry = pathnames[key];
  let localePath = typeof entry === 'string' ? entry : entry[locale];

  if (params) {
    for (const [name, value] of Object.entries(params)) {
      localePath = localePath.replace(`[${name}]`, value);
    }
  }

  if (localePath === '/') {
    return `${baseUrl}/${locale}`;
  }
  return `${baseUrl}/${locale}${localePath}`;
}

export function getAlternates(
  key: PathnameKey,
  currentLocale: string,
  params?: Record<string, string>,
) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = buildLocalizedPath(key, loc, params);
  }
  languages['x-default'] = buildLocalizedPath(key, defaultLocale, params);

  const safeLocale = (locales as readonly string[]).includes(currentLocale)
    ? (currentLocale as LocaleKey)
    : defaultLocale;

  return {
    canonical: buildLocalizedPath(key, safeLocale, params),
    languages,
  };
}

export function getCanonicalUrl(
  key: PathnameKey,
  currentLocale: string,
  params?: Record<string, string>,
): string {
  const safeLocale = (locales as readonly string[]).includes(currentLocale)
    ? (currentLocale as LocaleKey)
    : defaultLocale;
  return buildLocalizedPath(key, safeLocale, params);
}

export function pickByLocale<T>(
  values: Record<string, T>,
  locale: string,
): T {
  return values[locale] ?? values[defaultLocale];
}

interface BuildPageMetadataInput {
  pathnameKey: PathnameKey;
  locale: string;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  image?: { url: string; alt?: string; width?: number; height?: number };
  params?: Record<string, string>;
}

export function buildPageMetadata({
  pathnameKey,
  locale,
  titles,
  descriptions,
  image,
  params,
}: BuildPageMetadataInput): PageMetadata {
  const title = pickByLocale(titles, locale);
  const description = pickByLocale(descriptions, locale);
  const alternates = getAlternates(pathnameKey, locale, params);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      ...(image
        ? {
            images: [
              {
                url: image.url,
                width: image.width ?? 800,
                height: image.height ?? 600,
                alt: image.alt ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { image: image.url } : {}),
    },
    alternates,
  };
}
