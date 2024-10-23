import React from 'react';
import EventComponent from '@/components/EventComponent';
import { useTranslations } from 'next-intl';
import { fetchEvent } from '@/utils/request';
import { Metadata } from '@/types/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const event = await fetchEvent(slug, locale);

  const metadataByLocale: Record<string, Metadata> = {
    sl: {
      title: `Zumra Coralic - Dogodki | ${event.seoTitle}`,
      description: `${event.seoDescription}`,
      url: `https://www.zumracoralic.com/sl/dogodki/${slug}`,
      openGraph: {
        title: `Zumra Coralic - Dogodki | ${event.seoTitle}`,
        description: `${event.seoDescription}`,
        url: `https://www.zumracoralic.com/sl/dogodki/${slug}`,
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
        title: `Zumra Coralic - Dogodki | ${event.seoTitle}`,
        description: `${event.seoDescription}`,
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/eventsHeader_oraf6m.png',
      },
      canonical: `https://www.zumracoralic.com/sl/dogodki/${slug}`,
    },
    bs: {
      title: `Zumra Ćoralić - Događaji | ${event.seoTitle}`,
      description: `${event.seoDescription}`,
      url: `https://www.zumracoralic.com/bs/dogadjaji/${slug}`,
      openGraph: {
        title: `Zumra Ćoralić - Događaji | ${event.seoTitle}`,
        description: `${event.seoDescription}`,
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
        title: `Zumra Ćoralić - Događaji | ${event.seoTitle}`,
        description: `${event.seoDescription}`,
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
