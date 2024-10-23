import AboutMe from '@/components/AboutMe';
import ActionSection from '@/components/ActionSection';
import Quote from '@/components/Quote';
import Header from '@/components/Header';
import Offer from '@/components/Offer';
import Testimonials from '@/components/Testimonials';
import LatestEvents from '@/components/LatestEvents';
import LatestBlogs from '@/components/LatestBlogs';
import { useTranslations } from 'next-intl';
import UpcomingEvents from '@/components/UpcomingEvents';
import { OpenGraphMetadata, TwitterMetadata, Metadata } from '@/types/metadata';
import UnderHeader from '@/components/UnderHeader';

// Define metadataByLocale with proper typing
const metadataByLocale: Record<string, Metadata> = {
  sl: {
    title: 'Zumra Coralic',
    description:
      'Dobrodošli na moji strani. Spoznajte, kako vam lahko NLP coaching in mediacija pomagata izboljšati počutje in odnose.',
    url: 'https://www.zumracoralic.com',
    openGraph: {
      title: 'Zumra Coralic',
      description:
        'Dobrodošli na moji strani. Spoznajte, kako vam lahko NLP coaching in mediacija pomagata izboljšati počutje in odnose.',
      url: 'https://www.zumracoralic.com',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/storitveHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zumra Coralic',
      description:
        'Dobrodošli na moji strani. Spoznajte, kako vam lahko NLP coaching in mediacija pomagata izboljšati počutje in odnose.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/storitveHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com',
  },
  bs: {
    title: 'Zumra Ćoralić',
    description:
      'Dobrodošli na mojoj stranici. Saznajte kako vam NLP coaching i medijacija mogu pomoći da poboljšate svoje blagostanje i odnose.',
    url: 'https://www.zumracoralic.com/bs',
    openGraph: {
      title: 'Zumra Ćoralić',
      description:
        'Dobrodošli na mojoj stranici. Saznajte kako vam NLP coaching i medijacija mogu pomoći da poboljšate svoje blagostanje i odnose.',
      url: 'https://www.zumracoralic.com/bs',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/storitveHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Zumra Ćoralić',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zumra Ćoralić',
      description:
        'Dobrodošli na mojoj stranici. Saznajte kako vam NLP coaching i medijacija mogu pomoći da poboljšate svoje blagostanje i odnose.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/storitveHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/bs',
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

export default function Home() {
  const t = useTranslations('Header');
  const y = useTranslations('AboutSection');
  const q = useTranslations('QuoteSection');
  const o = useTranslations('OfferSection');
  const s = useTranslations('Testimonials');
  const e = useTranslations('LatestEvents');
  const a = useTranslations('ActionSection');
  const b = useTranslations('LatestBlogs');
  const p = useTranslations('UpcomingEvents');
  const i = useTranslations('Index');
  return (
    <div>
      <Header title={t('title')} content={t('content')} button={t('button')} />
      {/* <UnderHeader content={t('content')} /> */}
      <AboutMe
        section={y('section')}
        title={t('content')}
        content={y('content')}
      />
      <Quote quote={q('quote')} />
      <Offer
        sectionTitle={o('sectionTitle')}
        card1Title={o('card1Title')}
        card1Content={o('card1Content')}
        back1Title={o('back1Title')}
        back1Content={o('back1Content')}
        card2Title={o('card2Title')}
        card2Content={o('card2Content')}
        back2Title={o('back2Title')}
        back2Content={o('back2Content')}
        card3Title={o('card3Title')}
        card3Content={o('card3Content')}
        back3Title={o('back3Title')}
        back3Content={o('back3Content')}
        readMore={o('readMore')}
      />
      <UpcomingEvents
        sectionTitle={p('sectionTitle')}
        readMore={i('readMore')}
      />
      <Testimonials
        sectionTitle={s('sectionTitle')}
        testimonial1={s('testimonial1')}
        person1Title={s('person1Title')}
        testimonial2={s('testimonial2')}
        person2Title={s('person2Title')}
        testimonial3={s('testimonial3')}
        person3Title={s('person3Title')}
        testimonial4={s('testimonial4')}
        person4Title={s('person4Title')}
        person5Title={s('person5Title')}
        testimonial5={s('testimonial5')}
        person6Title={s('person6Title')}
        testimonial6={s('testimonial6')}
      />
      <LatestEvents sectionTitle={e('sectionTitle')} button={e('button')} />
      <ActionSection quote={a('quote')} button={t('button')} />
      <LatestBlogs
        section={b('section')}
        sectionTitle={b('sectionTitle')}
        sectionTitle2={b('sectionTitle2')}
        button={b('button')}
      />
    </div>
  );
}
