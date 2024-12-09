'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import OfferCard from './OfferCard';
import { useLocale } from 'next-intl';

export default function Offer({
  sectionTitle,
  card1Title,
  card1Content,
  card2Title,
  card2Content,
  card3Title,
  card3Content,
  back1Title,
  back1Content,
  back2Title,
  back2Content,
  back3Title,
  back3Content,
  readMore,
}: {
  sectionTitle: string;
  card1Title: string;
  card1Content: string;
  card2Title: string;
  card2Content: string;
  card3Title: string;
  card3Content: string;
  back1Title: string;
  back1Content: string;
  back2Title: string;
  back2Content: string;
  back3Title: string;
  back3Content: string;
  readMore: string;
}) {
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const locale = useLocale();

  // When the component comes into view, set animate to true
  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  return (
    <div className=' bg-white  py-10  flex flex-center justify-center'>
      <div
        className={`max-w-[1200px] flex flex-col items-center transition-opacity duration-2000 transform ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        ref={ref}
      >
        <div
          className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center ${
            animate
              ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[250ms]'
              : ''
          }`}
        >
          {sectionTitle}
        </div>
        <div className='flex flex-col md:flex-row'>
          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'
                : ''
            }`}
          >
            <OfferCard
              title={card1Title}
              content={card1Content}
              backTitle={back1Title}
              backContent={back1Content}
              bgColor='bg-[#ffe6bc]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1721209043/blog3_vkvdz0.png'
              readMore={readMore}
              link={`${locale}/services/coaching`}
            />
          </div>
          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[600ms]'
                : ''
            }`}
          >
            <OfferCard
              title={card2Title}
              content={card2Content}
              backTitle={back2Title}
              backContent={back2Content}
              bgColor='bg-[#f99d5b]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1725907784/194_2_bykph6.jpg'
              readMore={readMore}
              link={`${locale}/services/mediation`}
            />
          </div>
          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[700ms]'
                : ''
            }`}
          >
            <OfferCard
              title={card3Title}
              content={card3Content}
              backTitle={back3Title}
              backContent={back3Content}
              bgColor='bg-[#df650e]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1725906339/26.5.2017_Nova_Gorica2_o_bb8lvo.jpg'
              readMore={readMore}
              link={`${locale}/services/workshop`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
