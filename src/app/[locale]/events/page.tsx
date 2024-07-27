import EventsComponent from '@/components/EventsComponent';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function page() {
  const t = useTranslations('Index');
  const e = useTranslations('Events');
  return <EventsComponent readMore={t('readMore')} title={e('events')} />;
}
