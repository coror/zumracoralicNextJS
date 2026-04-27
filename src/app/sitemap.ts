import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/datalayer/contentful/blogPost';
import { getEvents } from '@/datalayer/contentful/event';
import { getServices } from '@/datalayer/contentful/service';
import { getAlternates } from '@/utils/seo';
import { defaultLocale } from '@/config';
import type { pathnames } from '@/config';

type PathnameKey = keyof typeof pathnames;

function entryFor(key: PathnameKey, params?: Record<string, string>) {
  const alts = getAlternates(key, defaultLocale, params);
  return {
    url: alts.canonical,
    lastModified: new Date(),
    alternates: { languages: alts.languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = (
    [
      '/',
      '/blogs',
      '/events',
      '/about-me',
      '/services',
      '/services/coaching',
      '/services/mediation',
      '/services/workshop',
      '/contact',
    ] as PathnameKey[]
  ).map((key) => entryFor(key));

  const [blogPosts, events, services] = await Promise.all([
    getBlogPosts(defaultLocale),
    getEvents(defaultLocale),
    getServices(defaultLocale),
  ]);

  const blogEntries: MetadataRoute.Sitemap = (blogPosts || [])
    .filter((p: { slug?: string }) => p?.slug)
    .map((p: { slug: string }) =>
      entryFor('/blogs/[slug]', { slug: p.slug }),
    );

  const eventEntries: MetadataRoute.Sitemap = (events || [])
    .filter((e: { slug?: string }) => e?.slug)
    .map((e: { slug: string }) =>
      entryFor('/events/[slug]', { slug: e.slug }),
    );

  const workshopEntries: MetadataRoute.Sitemap = (services || [])
    .filter((s: { slug?: string }) => s?.slug)
    .map((s: { slug: string }) =>
      entryFor('/services/workshop/[slug]', { slug: s.slug }),
    );

  return [
    ...staticEntries,
    ...blogEntries,
    ...eventEntries,
    ...workshopEntries,
  ];
}
