import BlogPostsComponent from '@/components/BlogPostsComponent';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getBlogPosts } from '@/datalayer/contentful/blogPost';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/blogs',
    locale: params.locale,
    titles: {
      sl: 'Blog - Zumra Coralic',
      bs: 'Blog - Zumra Ćoralić',
    },
    descriptions: {
      sl: 'Preberite najnovejše članke in nasvete Zumre Coralic o NLP coachingu, mediaciji in osebni rasti.',
      bs: 'Pročitajte najnovije članke i savete Zumre Ćoralić o NLP coachingu, medijaciji i ličnom razvoju.',
    },
    image: {
      url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
      alt: 'Zumra Coralic - Blog',
    },
  });
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const [t, b] = await Promise.all([
    getTranslations('Index'),
    getTranslations('LatestBlogs'),
  ]);
  const blogs = await getBlogPosts(locale);
  return (
    <BlogPostsComponent
      initialBlogs={blogs}
      locale={locale}
      readMore={t('readMore')}
      description={b('sectionTitle2')}
    />
  );
}
