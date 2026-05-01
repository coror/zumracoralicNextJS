import EventsComponent from '@/components/EventsComponent';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getEvents } from '@/datalayer/contentful/event';
import React from 'react';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/events',
    locale: params.locale,
    titles: {
      sl: 'Zumra Coralic - Dogodki',
      bs: 'Zumra Ćoralić - Događaji',
    },
    descriptions: {
      sl: 'Oglejte si naše prihajajoče dogodke, delavnice in seminarje, ki so namenjeni izboljšanju osebne rasti in odnosov.',
      bs: 'Pogledajte naše nadolazeće događaje, radionice i seminare koji su namenjeni unapređenju ličnog rasta i odnosa.',
    },
    image: {
      url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
      alt: 'Zumra Coralic Events',
    },
  });
}

const descriptions: Record<string, string> = {
  sl: 'Vabljeni na delavnice, predavanja in dogodke — prostor, kjer skupaj raziskujemo poti osebne rasti in povezanosti.',
  bs: 'Pozvani ste na radionice, predavanja i događaje — prostor gde zajedno istražujemo puteve ličnog rasta i povezanosti.',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const [t, e, events] = await Promise.all([
    getTranslations('Index'),
    getTranslations('Events'),
    getEvents(locale),
  ]);
  return (
    <EventsComponent
      initialEvents={events}
      locale={locale}
      readMore={t('readMore')}
      title={e('events')}
      description={descriptions[locale] ?? descriptions.sl}
    />
  );
}
