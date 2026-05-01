import Image from 'next/image';
import { MdEmail } from 'react-icons/md';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import FormSection from '@/components/FormSection';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';
import MeshGradient from '@/components/MeshGradient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/contact',
    locale: params.locale,
    titles: {
      sl: 'Zumra Coralic - Kontakt',
      bs: 'Zumra Ćoralić - Kontakt',
    },
    descriptions: {
      sl: 'Kontaktirajte nas za več informacij o NLP coachingu, mediaciji ter delavnicah in predavanjih. Tukaj boste našli vse potrebne kontakte za vaša vprašanja in pobude.',
      bs: 'Kontaktirajte nas za više informacija o NLP coachingu, medijaciji te radionicama i predavanjima. Ovdje ćete pronaći sve potrebne kontakte za vaša pitanja i prijedloge.',
    },
    image: {
      url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
      alt: 'Contact - Zumra Coralic',
    },
  });
}

const intros: Record<string, string> = {
  sl: 'Imate vprašanje, idejo ali želite začeti? Veseli me, ko slišim od vas. Pišite mi spodaj — odgovorim v dveh delovnih dneh.',
  bs: 'Imate pitanje, ideju ili želite početi? Drago mi je čuti vas. Pišite mi ispod — odgovaram u dva radna dana.',
};

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Contact');
  const n = useTranslations('Navigation');
  const intro = intros[locale] ?? intros.sl;

  return (
    <div className='relative pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

      {/* Editorial header */}
      <header className='max-w-3xl mx-auto px-6 text-center mb-16 md:mb-24'>
        <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-6'>
          {n('contact')}
        </p>
        <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] mb-7 text-[#222428]'>
          {t('section')}
        </h1>
        <span
          aria-hidden='true'
          className='block w-12 h-px bg-[#df650e] mx-auto mb-8'
        />
        <p className='text-sm md:text-lg 4xl:text-2xl italic leading-relaxed text-[#222428]/75'>
          {intro}
        </p>
      </header>

      {/* Two-column body */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start'>
          {/* Photo + contact info */}
          <div className='lg:col-span-5 space-y-12 md:space-y-16'>
            <div className='max-w-[24rem] mx-auto lg:mx-0'>
              <Image
                src='https://res.cloudinary.com/dbssbnuph/image/upload/v1729455293/71_vbmzbv.jpg'
                alt='Zumra Ćoralić'
                width={0}
                height={0}
                sizes='(max-width: 1024px) 100vw, 30vw'
                className='w-full h-auto rounded-2xl shadow-[0_25px_50px_-15px_rgba(223,101,14,0.28)] md:shadow-[0_30px_60px_-20px_rgba(223,101,14,0.28)]'
              />
            </div>

            <ul className='space-y-4 text-base md:text-lg'>
              <li>
                <a
                  href='tel:+38641429437'
                  className='inline-flex items-center gap-4 text-[#222428]/80 hover:text-[#df650e] transition-colors'
                >
                  <FaPhoneAlt className='text-[#df650e] shrink-0' />
                  <span>(+386) 41 429 437</span>
                </a>
              </li>
              <li>
                <a
                  href='mailto:ustvari.svojo.pot@gmail.com'
                  className='inline-flex items-center gap-4 text-[#222428]/80 hover:text-[#df650e] transition-colors break-all'
                >
                  <MdEmail className='text-[#df650e] shrink-0 text-lg' />
                  <span>{t('email')}</span>
                </a>
              </li>
              <li>
                <a
                  href={t('facebookLink')}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-4 text-[#222428]/80 hover:text-[#df650e] transition-colors'
                >
                  <FaFacebookF className='text-[#df650e] shrink-0' />
                  <span>{t('facebook')}</span>
                </a>
              </li>
              <li>
                <a
                  href={t('instagramLink')}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-4 text-[#222428]/80 hover:text-[#df650e] transition-colors'
                >
                  <FaInstagram className='text-[#df650e] shrink-0' />
                  <span>{t('instagram')}</span>
                </a>
              </li>
              <li>
                <a
                  href='https://si.linkedin.com/in/zumra-%C4%87orali%C4%87-bb084497'
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-4 text-[#222428]/80 hover:text-[#df650e] transition-colors'
                >
                  <FaLinkedin className='text-[#df650e] shrink-0' />
                  <span>Zumra Ćoralić</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className='lg:col-span-7'>
            <FormSection
              message={t('message')}
              errorMessage={t('errorMessage')}
              successMessage={t('successMessage')}
              send={t('send')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
