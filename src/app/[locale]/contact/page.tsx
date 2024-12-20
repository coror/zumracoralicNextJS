import Image from 'next/image';
import { MdEmail } from 'react-icons/md';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import FormSection from '@/components/FormSection';
import { Metadata } from '@/types/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  const metadataByLocale: Record<string, Metadata> = {
    sl: {
      title: 'Zumra Coralic - Kontakt',
      description:
        'Kontaktirajte nas za več informacij o NLP coachingu, mediaciji ter delavnicah in predavanjih. Tukaj boste našli vse potrebne kontakte za vaša vprašanja in pobude.',
      url: 'https://www.zumracoralic.com/sl/kontakt',
      openGraph: {
        title: 'Zumra Coralic - Kontakt',
        description:
          'Kontaktirajte nas za več informacij o NLP coachingu, mediaciji ter delavnicah in predavanjih. Tukaj boste našli vse potrebne kontakte za vaša vprašanja in pobude.',
        url: 'https://www.zumracoralic.com/sl/kontakt',
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Contact - Zumra Coralic',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Zumra Coralic - Kontakt',
        description:
          'Kontaktirajte nas za več informacij o NLP coachingu, mediaciji ter delavnicah in predavanjih. Tukaj boste našli vse potrebne kontakte za vaša vprašanja in pobude.',
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
      },
      canonical: 'https://www.zumracoralic.com/sl/kontakt',
    },
    bs: {
      title: 'Zumra Ćoralić - Kontakt',
      description:
        'Kontaktirajte nas za više informacija o NLP coachingu, medijaciji te radionicama i predavanjima. Ovdje ćete pronaći sve potrebne kontakte za vaša pitanja i prijedloge.',
      url: 'https://www.zumracoralic.com/bs/kontakt',
      openGraph: {
        title: 'Zumra Ćoralić - Kontakt',
        description:
          'Kontaktirajte nas za više informacija o NLP coachingu, medijaciji te radionicama i predavanjima. Ovdje ćete pronaći sve potrebne kontakte za vaša pitanja i prijedloge.',
        url: 'https://www.zumracoralic.com/bs/kontakt',
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Contact - Zumra Ćoralić',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Zumra Ćoralić - Kontakt',
        description:
          'Kontaktirajte nas za više informacija o NLP coachingu, medijaciji te radionicama i predavanjima. Ovdje ćete pronaći sve potrebne kontakte za vaša pitanja i prijedloge.',
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
      },
      canonical: 'https://www.zumracoralic.com/bs/kontakt',
    },
  };

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl']; // Default to Slovenian if locale is not found

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
    url: currentLocaleMetadata.url,
    openGraph: {
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      url: currentLocaleMetadata.url,
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Contact - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/contactHeader_oraf6m.png',
    },
    canonical: currentLocaleMetadata.url,
  };
}

export default function Page() {
  const t = useTranslations('Contact');
  return (
    <div className='relative pt-20 lg:pt-32   max-w-[88rem] md:mx-auto'>
      <h1 className='text-3xl md:text-5xl mb-4 text-center mt-20'>
        {t('section')}
      </h1>
      <div className=' flex flex-col lg:flex-row items-start justify-evenly py-20 '>
        <div className='relative px-10 text-center items-left w-full text-black flex flex-col lg:flex-col-reverse  animate-fade-right animate-duration-[1000ms] animate-delay-[1500ms]'>
          <div>
            <div className='mt-0 lg:mt-12 mb-12 lg:mb-0 space-y-4 text-xs sm:text-base'>
              <a
                href='mailto:ustvari.svojo.pot@gmail.com'
                className=' flex items-center m-2 hover:text-identifier md:transition-transform duration-500 ease-in-out lg:hover:scale-105'
              >
                <MdEmail className='text-identifier mx-3' /> {t('email')}
              </a>
              <a
                href='tel: 00386 41 429 437'
                className='flex items-center m-2 hover:text-identifier  md:transition-transform duration-500 ease-in-out lg:hover:scale-105'
              >
                <FaPhoneAlt className='text-identifier mx-3' />
                (+386) 41 429 437
              </a>
              <a
                href={t('facebookLink')}
                target='_blank'
                rel='noreferrer'
                className='flex items-center m-2 hover:text-identifier  md:transition-transform duration-500 ease-in-out lg:hover:scale-105'
              >
                <FaFacebookF className='text-identifier mx-3' />
                {t('facebook')}
              </a>
              <a
                href={t('instagramLink')}
                target='_blank'
                rel='noreferrer'
                className='flex items-center m-2 hover:text-identifier  md:transition-transform duration-500 ease-in-out lg:hover:scale-105'
              >
                <FaInstagram className='text-identifier mx-3' />
                {t('instagram')}
              </a>
              <a
                href='https://si.linkedin.com/in/zumra-%C4%87orali%C4%87-bb084497'
                target='_blank'
                rel='noreferrer'
                className='flex items-center m-2 hover:text-identifier  md:transition-transform duration-500 ease-in-out lg:hover:scale-105'
              >
                <FaLinkedin className='text-identifier mx-3' />
                Zumra Ćoralić
              </a>
            </div>
          </div>

          {/* Form Section */}
          <FormSection
            message={t('message')}
            errorMessage={t('errorMessage')}
            successMessage={t('successMessage')}
            send={t('send')}
          />
        </div>
        <div className=' mt-14 lg:mt-0  animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms] px-10 '>
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1729455293/71_vbmzbv.jpg'
            alt='zumra-profilna'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-full md:w-[44rem] lg:h-auto rounded shadow-2xl '
          />
        </div>
      </div>
    </div>
  );
}
