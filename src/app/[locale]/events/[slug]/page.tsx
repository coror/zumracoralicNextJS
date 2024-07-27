import React from 'react';
import EventComponent from '@/components/EventComponent';
import { useTranslations } from 'next-intl';

export default function page({ params: { locale, slug } }) {
  const t = useTranslations('Navigation');
  return (
    <div>
      <EventComponent
        currentLocale={locale}
        slug={slug}
        home={t('home')}
        eventsTitle={t('events')}
        previousPostText={t('previousPostText')}
        nextPostText={t('nextPostText')}
      />
    </div>
  );
}
