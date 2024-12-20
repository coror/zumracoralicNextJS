import React from 'react';
import BlogPostComponent from '@/components/BlogPostComponent';
import { useTranslations } from 'next-intl';
import { fetchBlogPost } from '@/utils/request';
import { Metadata } from '@/types/metadata'; // Import your Metadata types

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const blog = await fetchBlogPost(slug, locale);

  const metadataByLocale: Record<string, Metadata> = {
    sl: {
      title: `Zumra Coralic - Blog | ${blog.seoTitle}`,
      description: blog.seoDescription,
      url: `https://www.zumracoralic.com/sl/blog/${slug}`,
      openGraph: {
        title: `Zumra Coralic - Blog | ${blog.seoTitle}`,
        description: blog.seoDescription,
        url: `https://www.zumracoralic.com/sl/blog/${slug}`,
        images: [
          {
            url: blog.featuredImage.url,
            width: 800,
            height: 600,
            alt: blog.featuredImage.alt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zumra Coralic - Blog | ${blog.seoTitle}`,
        description: blog.seoDescription,
        image: blog.featuredImage.url,
      },
      canonical: `https://www.zumracoralic.com/sl/blog/${slug}`,
    },
    bs: {
      title: `Zumra Ćoralić - Blog | ${blog.seoTitle}`,
      description: blog.seoDescription,
      url: `https://www.zumracoralic.com/bs/blog/${slug}`,
      openGraph: {
        title: `Zumra Ćoralić - Blog | ${blog.seoTitle}`,
        description: blog.seoDescription,
        url: `https://www.zumracoralic.com/bs/blog/${slug}`,
        images: [
          {
            url: blog.featuredImage.url,
            width: 800,
            height: 600,
            alt: blog.featuredImage.alt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zumra Ćoralić - Blog | ${blog.seoTitle}`,
        description: blog.seoDescription,
        image: blog.featuredImage.url,
      },
      canonical: `https://www.zumracoralic.com/bs/blog/${slug}`,
    },
  };

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl']; // Default to Slovenian if locale is not found

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
    url: currentLocaleMetadata.url,
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
      <BlogPostComponent
        home={t('home')}
        blogs={t('blogPosts')}
        previousPostText={t('previousPostText')}
        nextPostText={t('nextPostText')}
      />
    </div>
  );
}
