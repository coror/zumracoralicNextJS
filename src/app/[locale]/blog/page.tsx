import BlogPostsComponent from '@/components/BlogPostsComponent';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function page() {
  const t = useTranslations('Index');
  return <BlogPostsComponent readMore={t('readMore')} />;
}
