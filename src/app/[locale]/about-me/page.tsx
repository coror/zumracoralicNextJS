import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { OpenGraphMetadata, TwitterMetadata, Metadata } from '@/types/metadata';

const metadataByLocale: Record<string, Metadata> = {
  sl: {
    title: 'O meni - Zumra Coralic',
    description:
      'Spoznajte več o Zumri Coralic, certificirani NLP coach in mediatorici. Preberite več o njenem ozadju, izkušnjah in pristopu.',
    url: 'https://www.zumracoralic.com/o-meni',
    openGraph: {
      title: 'O meni - Zumra Coralic',
      description:
        'Spoznajte več o Zumri Coralic, certificirani NLP coach in mediatorici. Preberite več o njenem ozadju, izkušnjah in pristopu.',
      url: 'https://www.zumracoralic.com/o-meni',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/aboutmeHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Zumra Coralic - O meni',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'O meni - Zumra Coralic',
      description:
        'Spoznajte več o Zumri Coralic, certificirani NLP coach in mediatorici. Preberite več o njenem ozadju, izkušnjah in pristopu.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/aboutmeHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/o-meni',
  },
  bs: {
    title: 'O meni - Zumra Ćoralić',
    description:
      'Saznajte više o Zumri Ćoralić, certificiranoj NLP trenerici i medijatorici. Pročitajte više o njenoj pozadini, iskustvu i pristupu.',
    url: 'https://www.zumracoralic.com/bs/o-meni',
    openGraph: {
      title: 'O meni - Zumra Ćoralić',
      description:
        'Saznajte više o Zumri Ćoralić, certificiranoj NLP trenerici i medijatorici. Pročitajte više o njenoj pozadini, iskustvu i pristupu.',
      url: 'https://www.zumracoralic.com/bs/o-meni',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/aboutmeHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Zumra Ćoralić - O meni',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'O meni - Zumra Ćoralić',
      description:
        'Saznajte više o Zumri Ćoralić, certificiranoj NLP trenerici i medijatorici. Pročitajte više o njenoj pozadini, iskustvu i pristupu.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/aboutmeHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/bs/o-meni',
  },
};

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
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      url: currentLocaleMetadata.url,
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
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/storitveHeader_oraf6m.png',
    },
    canonical: currentLocaleMetadata.url,
  };
}

export default function Page() {
  const t = useTranslations('AboutMePage');
  return (
    <div className='bg-white pb-16 md:pb-40 pt-36 px-6'>
      <div className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center  animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
        {t('section')}
      </div>
      <div className='text-lg leading-8 max-w-[80rem] md:mx-auto space-y-8  animate-fade-right animate-duration-[2000ms] animate-delay-[800ms]'>
        <div className='space-y-5'>
          <div className='md:flex md:flex-row md:justify-between'>
            <div className='md:w-96 lg:w-[42rem] space-y-3'>
              <h1 className='text-2xl md:text-3xl'>{t('sectionTitle1')}</h1>
              <div>{t('sectionContent1')}</div>
              <div>{t('sectionContent2')}</div>
            </div>
            <div className='mt-6 md:mt-0 animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
              <Image
                src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/IMG_0704_qh6mdm.jpg'
                alt='zumra-profilna'
                width={0}
                height={0}
                sizes='100vw'
                className='w-full h-full md:w-[26rem] lg:h-auto max-h-[36rem] max-w-[26rem]'
              />
              <div className='text-sm italic md:w-[26rem]'>
                <strong>Zumra Ćoralić</strong>, {t('description')}
              </div>
            </div>
          </div>

          <div className='py-10 max-w-[55rem] md:flex md:flex-col md:mx-auto'>
            <hr className='border-[#df650e] border-t-2' />
            <div className='my-4 py-4 text-xl md:text-2xl font-bold text-center text-[#df650e]'>
              {t('quote1')}
            </div>
            <hr className='border-[#df650e] border-t-2' />
          </div>
        </div>

        <div className='md:flex md:flex-row md:justify-between md:space-x-10'>
          <div className=' animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
            <Image
              src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/IMG-6a7cdd4a36fd6a9a30bf4db5df337a1f-V_t7u3g9.jpg'
              alt='sinova'
              width={0}
              height={0}
              sizes='100vw'
              className='w-full h-full md:w-[20rem] md:h-auto lg:w-[38rem] lg:h-auto max-h-[27rem] max-w-[38rem]'
            />
          </div>

          <div className='md:w-96 lg:w-full space-y-5'>
            <h1 className='text-2xl  md:text-3xl'>{t('sectionTitle2')}</h1>
            <div>{t('sectionContent3')}</div>
            <div>{t('sectionContent4')}</div>
            <div>{t('sectionContent5')}</div>
            <div>{t('sectionContent6')}</div>
          </div>
        </div>
        <div className='py-10 max-w-[55rem] md:flex md:flex-col md:mx-auto '>
          <hr className='border-[#df650e] border-t-2' />
          <div className='my-4 py-4 text-xl md:text-2xl font-bold text-center text-[#df650e]'>
            {t('quote2')}
          </div>
          <hr className='border-[#df650e] border-t-2' />
        </div>
        <div className='  space-y-3 md:space-y-0 flex flex-col-reverse md:flex-row  md:justify-evenly md:space-x-10'>
          <div className='  space-y-5 mt-10 md:mt-0'>
            {/* <h1 className='text-2xl  md:text-3xl'>{t('sectionTitle3')}</h1> */}

            <div>{t('sectionContent7')}</div>
            {/* 
            <div>{t('sectionContent8')}</div>
            <div>{t('sectionContent9')}</div>
            <div>{t('sectionContent10')}</div> */}

            <div>{t('sectionContent11')}</div>
          </div>
          <div className='md:min-w-[26rem] xl:min-w-[30rem] xl:max-w-[44rem]   animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
            <Image
              src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/1_wzq7nm.jpg'
              alt='graduation'
              width={0}
              height={0}
              sizes='100vw'
              className='w-full h-full md:w-full md:h-auto '
            />
          </div>
        </div>
      </div>
    </div>
  );
}
