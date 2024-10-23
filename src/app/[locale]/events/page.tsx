import EventsComponent from '@/components/EventsComponent';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Metadata } from '@/types/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;

  const metadataByLocale: Record<string, Metadata> = {
    sl: {
      title: `Zumra Coralic - Dogodki`,
      description: `Oglejte si naše prihajajoče dogodke, delavnice in seminarje, ki so namenjeni izboljšanju osebne rasti in odnosov.`,
      url: `https://www.zumracoralic.com/dogodki/${slug}`,
      openGraph: {
        title: `Zumra Coralic - Dogodki`,
        description: `Oglejte si naše prihajajoče dogodke, delavnice in seminarje, ki so namenjeni izboljšanju osebne rasti in odnosov.`,
        url: `https://www.zumracoralic.com/dogodki/${slug}`,
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Zumra Coralic Events',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zumra Coralic - Dogodki`,
        description: `Oglejte si naše prihajajoče dogodke, delavnice in seminarje, ki so namenjeni izboljšanju osebne rasti in odnosov.`,
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
      },
      canonical: `https://www.zumracoralic.com/dogodki/${slug}`,
    },
    bs: {
      title: `Zumra Ćoralić - Događaji`,
      description: `Pogledajte naše nadolazeće događaje, radionice i seminare koji su namenjeni unapređenju ličnog rasta i odnosa.`,
      url: `https://www.zumracoralic.com/bs/dogadjaji/${slug}`,
      openGraph: {
        title: `Zumra Ćoralić - Događaji`,
        description: `Pogledajte naše nadolazeće događaje, radionice i seminare koji su namenjeni unapređenju ličnog rasta i odnosa.`,
        url: `https://www.zumracoralic.com/bs/dogadjaji/${slug}`,
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Zumra Ćoralić Events',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zumra Ćoralić - Događaji`,
        description: `Pogledajte naše nadolazeće događaje, radionice i seminare koji su namenjeni unapređenju ličnog rasta i odnosa.`,
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
      },
      canonical: `https://www.zumracoralic.com/bs/dogadjaji/${slug}`,
    },
  };

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl'];

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
    url: currentLocaleMetadata.url, // Ensure the URL is included at the top level
    openGraph: {
      title: currentLocaleMetadata.openGraph.title,
      description: currentLocaleMetadata.openGraph.description,
      url: currentLocaleMetadata.openGraph.url,
      images: currentLocaleMetadata.openGraph.images,
    },
    twitter: {
      card: currentLocaleMetadata.twitter.card,
      title: currentLocaleMetadata.twitter.title,
      description: currentLocaleMetadata.twitter.description,
      image: currentLocaleMetadata.twitter.image,
    },
    canonical: currentLocaleMetadata.canonical,
  };
}

export default function Page() {
  const t = useTranslations('Index');
  const e = useTranslations('Events');
  return <EventsComponent readMore={t('readMore')} title={e('events')} />;
}
