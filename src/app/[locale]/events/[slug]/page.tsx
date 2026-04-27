import React from 'react';
import EventComponent from '@/components/EventComponent';
import { useTranslations } from 'next-intl';
import { fetchEvent } from '@/utils/request';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<PageMetadata> {
  const { locale, slug } = params;
  const event = await fetchEvent(slug, locale);

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

export default function Page() {
  const t = useTranslations('Navigation');
  return (
    <div>
      <EventComponent
        home={t('home')}
        eventsTitle={t('events')}
        previousPostText={t('previousPostText')}
        nextPostText={t('nextPostText')}
      />
    </div>
  );
}
