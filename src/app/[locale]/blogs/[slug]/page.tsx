import React from 'react';
import BlogPostComponent from '@/components/BlogPostComponent';

export default function page({ params: { locale, slug } }) {
  return (
    <div>
      <BlogPostComponent currentLocale={locale} slug={slug} />
    </div>
  );
}
