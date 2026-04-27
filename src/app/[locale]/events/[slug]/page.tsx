import React from 'react';
import { notFound } from 'next/navigation';
import EventDetails from '@/components/EventDetails';
import EntryNav from '@/components/EntryNav';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {
  getEvents,
  getEventBySlug,
} from '@/datalayer/contentful/event';
import { locales } from '@/config';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';
import { sortByDate } from '@/utils/sortByDate';

export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const events = await getEvents(locale);
    for (const event of events) {
      if (event?.slug) {
        params.push({ locale, slug: event.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<PageMetadata> {
  const { locale, slug } = params;
  const event = await getEventBySlug(slug, locale);
  if (!event) {
    return buildPageMetadata({
      pathnameKey: '/events/[slug]',
      locale,
      params: { slug },
      titles: {
        sl: 'Zumra Coralic - Dogodki',
        bs: 'Zumra Ćoralić - Događaji',
      },
      descriptions: { sl: '', bs: '' },
      image: {
        url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
      },
    });
  }

  return buildPageMetadata({
    pathnameKey: '/events/[slug]',
    locale,
    params: { slug },
    titles: {
      sl: `Zumra Coralic - Dogodki | ${event.seoTitle}`,
      bs: `Zumra Ćoralić - Događaji | ${event.seoTitle}`,
    },
    descriptions: {
      sl: event.seoDescription,
      bs: event.seoDescription,
    },
    image: {
      url: event.featuredImage.url,
      alt: event.featuredImage.alt,
    },
  });
}

export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Navigation');

  const [event, events] = await Promise.all([
    getEventBySlug(slug, locale),
    getEvents(locale),
  ]);

  if (!event) {
    notFound();
  }

  const sortedEvents = sortByDate(events, locale, 'datum');

  return (
    <div className='relative min-h-screen'>
      <EventDetails
        event={event}
        locale={locale}
        home={t('home')}
        eventsTitle={t('events')}
      />
      <EntryNav
        entries={sortedEvents}
        currentSlug={slug}
        routePrefix='events'
        locale={locale}
        previousLabel={t('previousPostText')}
        nextLabel={t('nextPostText')}
      />
    </div>
  );
}
