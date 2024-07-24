import AboutMe from '@/components/AboutMe';
import ActionSection from '@/components/ActionSection';
import Quote from '@/components/Quote';
import Header from '@/components/Header';
import Offer from '@/components/Offer';
import Testimonials from '@/components/Testimonials';
import LatestEvents from '@/components/LatestEvents';
import LatestBlogs from '@/components/LatestBlogs';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Header');
  const y = useTranslations('AboutSection');
  const q = useTranslations('QuoteSection');
  const o = useTranslations('OfferSection');
  const s = useTranslations('Testimonials');
  const e = useTranslations('LatestEvents');
  const a = useTranslations('ActionSection');
  const b = useTranslations('LatestBlogs');
  return (
    <div>
      <Header title={t('title')} content={t('content')} button={t('button')} />
      <AboutMe
        section={y('section')}
        title={y('title')}
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
