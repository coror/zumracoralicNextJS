import { Suspense } from 'react';
import AboutMe from '@/components/AboutMe';
import ActionSection from '@/components/ActionSection';
import Quote from '@/components/Quote';
import Header from '@/components/Header';
import Offer from '@/components/Offer';
import Testimonials from '@/components/Testimonials';
import LatestEvents from '@/components/LatestEvents';
import LatestBlogs from '@/components/LatestBlogs';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getBlogPosts } from '@/datalayer/contentful/blogPost';
import { getEvents } from '@/datalayer/contentful/event';
import UpcomingEvents from '@/components/UpcomingEvents';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata, pickByLocale } from '@/utils/seo';
import JsonLd from '@/components/JsonLd';
import MeshGradient from '@/components/MeshGradient';
import Skeleton from '@/components/Skeleton';

export const revalidate = 3600;

const titles = {
  sl: 'Zumra Coralic',
  bs: 'Zumra Ćoralić',
};

const descriptions = {
  sl: 'Dobrodošli na moji strani. Spoznajte, kako vam lahko NLP coaching in mediacija pomagata izboljšati počutje in odnose.',
  bs: 'Dobrodošli na mojoj stranici. Saznajte kako vam NLP coaching i medijacija mogu pomoći da poboljšate svoje blagostanje i odnose.',
};

const heroImage = {
  url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/storitveHeader_oraf6m.png',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/',
    locale: params.locale,
    titles,
    descriptions,
    image: heroImage,
  });
}

async function UpcomingEventsSection({
  locale,
  sectionTitle,
  readMore,
}: {
  locale: string;
  sectionTitle: string;
  readMore: string;
}) {
  const events = await getEvents(locale);
  return (
    <UpcomingEvents
      initialEvents={events}
      locale={locale}
      sectionTitle={sectionTitle}
      readMore={readMore}
    />
  );
}

async function LatestEventsSection({
  locale,
  sectionTitle,
  button,
}: {
  locale: string;
  sectionTitle: string;
  button: string;
}) {
  const events = await getEvents(locale);
  return (
    <LatestEvents
      initialEvents={events}
      locale={locale}
      sectionTitle={sectionTitle}
      button={button}
    />
  );
}

async function LatestBlogsSection({
  locale,
  section,
  sectionTitle,
  sectionTitle2,
  button,
}: {
  locale: string;
  section: string;
  sectionTitle: string;
  sectionTitle2: string;
  button: string;
}) {
  const blogs = await getBlogPosts(locale);
  return (
    <LatestBlogs
      initialBlogs={blogs}
      locale={locale}
      section={section}
      sectionTitle={sectionTitle}
      sectionTitle2={sectionTitle2}
      button={button}
    />
  );
}

function ListSectionSkeleton() {
  return (
    <div className='bg-white py-10 md:py-24 max-w-[1400px] mx-auto px-6'>
      <Skeleton className='h-12 md:h-16 w-1/2 mx-auto mb-12' />
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-16'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='space-y-3'>
            <Skeleton className='h-32 md:h-56 w-full' />
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingEventsSkeleton() {
  return (
    <div className='bg-white py-10 max-w-[1400px] mx-auto'>
      <Skeleton className='h-12 md:h-16 w-1/3 mx-auto mb-12' />
      <div className='space-y-6'>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className='h-40 mx-10' />
        ))}
      </div>
    </div>
  );
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const [t, y, q, o, s, e, a, b, p, i] = await Promise.all([
    getTranslations('Header'),
    getTranslations('AboutSection'),
    getTranslations('QuoteSection'),
    getTranslations('OfferSection'),
    getTranslations('Testimonials'),
    getTranslations('LatestEvents'),
    getTranslations('ActionSection'),
    getTranslations('LatestBlogs'),
    getTranslations('UpcomingEvents'),
    getTranslations('Index'),
  ]);
  const homeUrl = `https://www.zumracoralic.com/${locale}`;
  return (
    <div>
      <MeshGradient variant='cream' fixed />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: pickByLocale(titles, locale),
          jobTitle: 'NLP Coach & Mediator',
          url: homeUrl,
          telephone: '+386 41 429 437',
          email: 'ustvari.svojo.pot@gmail.com',
          description: pickByLocale(descriptions, locale),
          image:
            'https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/IMG_0704_qh6mdm.jpg',
          sameAs: [
            'https://si.linkedin.com/in/zumra-%C4%87orali%C4%87-bb084497',
          ],
        }}
      />
      <Header title={t('title')} content={t('content')} button={t('button')} />
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
      <Suspense fallback={<UpcomingEventsSkeleton />}>
        <UpcomingEventsSection
          locale={locale}
          sectionTitle={p('sectionTitle')}
          readMore={i('readMore')}
        />
      </Suspense>
      <Testimonials
        sectionTitle={s('sectionTitle')}
        testimonial1={s('testimonial1')}
        person1Title={s('person1Title')}
        testimonial1_5={s('testimonial1_5')}
        person1_5Title={s('person1_5Title')}
        person1_5Name={s('person1_5Name')}
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
      <Suspense fallback={<ListSectionSkeleton />}>
        <LatestEventsSection
          locale={locale}
          sectionTitle={e('sectionTitle')}
          button={e('button')}
        />
      </Suspense>
      <ActionSection quote={a('quote')} button={t('button')} />
      <Suspense fallback={<ListSectionSkeleton />}>
        <LatestBlogsSection
          locale={locale}
          section={b('section')}
          sectionTitle={b('sectionTitle')}
          sectionTitle2={b('sectionTitle2')}
          button={b('button')}
        />
      </Suspense>
    </div>
  );
}
