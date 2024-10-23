import WorkshopDetails from '@/components/WorkshopDetails';
import { fetchService } from '@/utils/request';
import React from 'react';
import { Metadata } from '@/types/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const service = await fetchService(slug, locale);

  const metadataByLocale: Record<string, Metadata> = {
    sl: {
      title: `Zumra Coralic - Delavnice in predavanja za podjetja | ${service.seoTitle}`,
      description: `${service.seoDescription}`,
      url: `https://www.zumracoralic.com/sl/storitve/delavnice-predavanja/${slug}`,
      openGraph: {
        title: `Zumra Coralic - Delavnice in Predavanja | ${service.seoTitle}`,
        description: service.seoDescription,
        url: `https://www.zumracoralic.com/sl/storitve/delavnice-predavanja/${slug}`,
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Zumra Coralic Delavnice in Predavanja',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zumra Coralic - Delavnice in Predavanja | ${service.seoTitle}`,
        description: service.seoDescription,
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
      },
      canonical: `https://www.zumracoralic.com/sl/storitve/delavnice-predavanja/${slug}`,
    },
    bs: {
      title: `Zumra Ćoralić - Radionice i predavanja za kompanije | ${service.seoTitle}`,
      description: `${service.seoDescription}`,
      url: 'https://www.zumracoralic.com/bs/radionice-predavanja',
      openGraph: {
        title: `Zumra Ćoralić - Radionice i predavanja | ${service.seoTitle}`,
        description: service.seoDescription,
        url: `https://www.zumracoralic.com/bs/usluge/radionice-predavanja/${slug}`,
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Zumra Ćoralić Radionice i predavanja',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zumra Ćoralić - Radionice i predavanja | ${service.seoTitle}`,
        description: service.seoDescription,
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
      },
      canonical: `https://www.zumracoralic.com/bs/usluge/radionice-predavanja/${slug}`,
    },
  };

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl']; // Default to Slovenian if locale is not found

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
    url: currentLocaleMetadata.url,
    openGraph: {
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      url: currentLocaleMetadata.url,
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Workshops and Lectures for Companies - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
    },
    canonical: currentLocaleMetadata.url,
  };
}

export default function Page() {
  return <WorkshopDetails />;
}
