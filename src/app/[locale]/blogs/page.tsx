import BlogPostsComponent from '@/components/BlogPostsComponent';
import { useTranslations } from 'next-intl';
import { OpenGraphMetadata, TwitterMetadata, Metadata } from '@/types/metadata';

const metadataByLocale: Record<string, Metadata> = {
  sl: {
    title: 'Blog - Zumra Coralic',
    description:
      'Preberite najnovejše članke in nasvete Zumre Coralic o NLP coachingu, mediaciji in osebni rasti.',
    url: 'https://www.zumracoralic.com/blog',
    openGraph: {
      title: 'Blog - Zumra Coralic',
      description:
        'Preberite najnovejše članke in nasvete Zumre Coralic o NLP coachingu, mediaciji in osebni rasti.',
      url: 'https://www.zumracoralic.com/blog',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Zumra Coralic - Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Zumra Coralic',
      description:
        'Preberite najnovejše članke in nasvete Zumre Coralic o NLP coachingu, mediaciji in osebni rasti.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/blog',
  },
  bs: {
    title: 'Blog - Zumra Ćoralić',
    description:
      'Pročitajte najnovije članke i savete Zumre Ćoralić o NLP coachingu, medijaciji i ličnom razvoju.',
    url: 'https://www.zumracoralic.com/bs/blog',
    openGraph: {
      title: 'Blog - Zumra Ćoralić',
      description:
        'Pročitajte najnovije članke i savete Zumre Ćoralić o NLP coachingu, medijaciji i ličnom razvoju.',
      url: 'https://www.zumracoralic.com/bs/blog',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Zumra Ćoralić - Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Zumra Ćoralić',
      description:
        'Pročitajte najnovije članke i savete Zumre Ćoralić o NLP coachingu, medijaciji i ličnom razvoju.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/blogHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/bs/blog',
  },
};

// Define the generateMetadata function
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<{
  title: string;
  description: string;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  canonical: string;
}> {
  const { locale } = params;

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl']; // Default to Slovenian if locale is not found

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
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
  const t = useTranslations('Index');
  return <BlogPostsComponent readMore={t('readMore')} />;
}
