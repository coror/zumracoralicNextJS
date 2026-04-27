import WorkshopDetails from '@/components/WorkshopDetails';
import {
  getServices,
  getServiceBySlug,
} from '@/datalayer/contentful/service';
import { locales } from '@/config';
import React from 'react';
import { notFound } from 'next/navigation';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const services = await getServices(locale);
    for (const service of services) {
      if (service?.slug) {
        params.push({ locale, slug: service.slug });
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
  const service = await getServiceBySlug(slug, locale);
  if (!service) {
    return buildPageMetadata({
      pathnameKey: '/services/workshop/[slug]',
      locale,
      params: { slug },
      titles: {
        sl: 'Zumra Coralic - Delavnice in predavanja za podjetja',
        bs: 'Zumra Ćoralić - Radionice i predavanja za kompanije',
      },
      descriptions: { sl: '', bs: '' },
      image: {
        url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
      },
    });
  }

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

export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Navigation');
  const d = await getTranslations('Workshop');

  const service = await getServiceBySlug(slug, locale);
  if (!service) {
    notFound();
  }

  return (
    <WorkshopDetails
      initialService={service}
      locale={locale}
      allServices={t('allServices')}
      workshop={t('workshop')}
      connect={t('connect')}
      currency={d('currency')}
      cost={d('cost')}
    />
  );
}
