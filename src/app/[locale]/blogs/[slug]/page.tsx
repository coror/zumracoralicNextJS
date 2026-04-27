import React from 'react';
import BlogPostComponent from '@/components/BlogPostComponent';
import { useTranslations } from 'next-intl';
import { fetchBlogPost } from '@/utils/request';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<PageMetadata> {
  const { locale, slug } = params;
  const blog = await fetchBlogPost(slug, locale);

  return buildPageMetadata({
    pathnameKey: '/blogs/[slug]',
    locale,
    params: { slug },
    titles: {
      sl: `Zumra Coralic - Blog | ${blog.seoTitle}`,
      bs: `Zumra Ćoralić - Blog | ${blog.seoTitle}`,
    },
    descriptions: {
      sl: blog.seoDescription,
      bs: blog.seoDescription,
    },
    image: {
      url: blog.featuredImage.url,
      alt: blog.featuredImage.alt,
    },
  });
}

export default function Page() {
  const t = useTranslations('Navigation');
  return (
    <div>
      <BlogPostComponent
        home={t('home')}
        blogs={t('blogPosts')}
        previousPostText={t('previousPostText')}
        nextPostText={t('nextPostText')}
      />
    </div>
  );
}
