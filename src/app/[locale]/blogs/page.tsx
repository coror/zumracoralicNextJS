import BlogPostsComponent from '@/components/BlogPostsComponent';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

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

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Index');
  return <BlogPostsComponent readMore={t('readMore')} />;
}
