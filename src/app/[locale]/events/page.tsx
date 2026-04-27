import EventsComponent from '@/components/EventsComponent';
import { useTranslations } from 'next-intl';
import React from 'react';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

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

export default function Page() {
  const t = useTranslations('Index');
  const e = useTranslations('Events');
  return <EventsComponent readMore={t('readMore')} title={e('events')} />;
}
