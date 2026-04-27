import React from 'react';
import { notFound } from 'next/navigation';
import BlogPostDetails from '@/components/BlogPostDetails';
import EntryNav from '@/components/EntryNav';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {
  getBlogPosts,
  getBlogPostBySlug,
} from '@/datalayer/contentful/blogPost';
import { locales } from '@/config';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';
import { sortByDate } from '@/utils/sortByDate';

export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      if (post?.slug) {
        params.push({ locale, slug: post.slug });
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
  const blog = await getBlogPostBySlug(slug, locale);
  if (!blog) {
    return buildPageMetadata({
      pathnameKey: '/blogs/[slug]',
      locale,
      params: { slug },
      titles: { sl: 'Blog - Zumra Coralic', bs: 'Blog - Zumra Ćoralić' },
      descriptions: { sl: '', bs: '' },
      image: {
        url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
      },
    });
  }

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

export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Navigation');

  const [blogPost, blogPosts] = await Promise.all([
    getBlogPostBySlug(slug, locale),
    getBlogPosts(locale),
  ]);

  if (!blogPost) {
    notFound();
  }

  const sortedBlogs = sortByDate(blogPosts, locale, 'datePosted');

  return (
    <div className='relative min-h-screen'>
      <BlogPostDetails
        blogPost={blogPost}
        locale={locale}
        home={t('home')}
        blogs={t('blogPosts')}
      />
      <EntryNav
        entries={sortedBlogs}
        currentSlug={slug}
        pathname='/blogs/[slug]'
        previousLabel={t('previousPostText')}
        nextLabel={t('nextPostText')}
      />
    </div>
  );
}
