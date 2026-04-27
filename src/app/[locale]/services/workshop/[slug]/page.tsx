import WorkshopDetails from '@/components/WorkshopDetails';
import { fetchService } from '@/utils/request';
import React from 'react';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<PageMetadata> {
  const { locale, slug } = params;
  const service = await fetchService(slug, locale);

  return buildPageMetadata({
    pathnameKey: '/services/workshop/[slug]',
    locale,
    params: { slug },
    titles: {
      sl: `Zumra Coralic - Delavnice in predavanja za podjetja | ${service.seoTitle}`,
      bs: `Zumra Ćoralić - Radionice i predavanja za kompanije | ${service.seoTitle}`,
    },
    descriptions: {
      sl: service.seoDescription,
      bs: service.seoDescription,
    },
    image: {
      url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
      alt: 'Zumra Coralic Delavnice in Predavanja',
    },
  });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Navigation');
  const d = useTranslations('Workshop')
  return (
    <WorkshopDetails
      allServices={t('allServices')}
      workshop={t('workshop')}
      connect={t('connect')}
      currency={d('currency')}
      cost={d('cost')}
    />
  );
}
