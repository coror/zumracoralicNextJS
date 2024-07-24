'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import OfferCard from './OfferCard';

export default function Offer() {
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // When the component comes into view, set animate to true
  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  return (
    <div className=' bg-white  py-10  flex flex-center justify-center'>
      <div className='max-w-[1200px]  flex flex-col items-center' ref={ref}>
        <div
          className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center ${
            animate
              ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'
              : ''
          }`}
        >
          Kaj ponujam
        </div>
        <div className='flex flex-col md:flex-row'>
          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1000ms]'
                : ''
            }`}
          >
            <OfferCard
              title='1:1 Coaching'
              content='Sem strokovnjakinja za NLP Coaching na področju medosebnih odnosov
              in reševanja izzivov. Prepričana sem, da lahko prispevam k
              uresničevanju vaših zastavljenih ciljev, kot so izboljšanje
              odnosov v družini in na delovnem mestu, dvig samopodobe, večja
              samozavest ter odkrivanje vaših potencialov in strasti.'
              bgColor='bg-[#F6EDDA]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1721392346/zumracoralic/background_ff90gd.jpg'
            />
          </div>
          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1200ms]'
                : ''
            }`}
          >
            <OfferCard
              title='Mediacija'
              content=' Ste v konfliktu, vendar ne želite zapletenih in dragih sodnih
              postopkov? MEDIACIJA je prava rešitev! Zakaj? Preberite v
              nadaljevanju besedila.'
              bgColor='bg-[#D4D8E7]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1721487542/zumracoralic/background1_xqcq2z.jpg'
            />
          </div>
          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1400ms]'
                : ''
            }`}
          >
            <OfferCard
              title='Predavanja in Delavince'
              content='Program, ki ga lahko prilagodim glede na potrebe vaše organizacije,
              vključuje predavanja in delavnice, osredotočene na gradnjo
              kakovostnih medosebnih odnosov, reševanje konfliktov ter povečanje
              zadovoljstva zaposlenih. Če vas zanima, kako lahko izboljšam
              delovno okolje in podprem vaše zaposlene, se veselim priložnosti
              za osebno srečanje in predstavitev mojega programa.'
              bgColor='bg-[#D8ECD3]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1721209043/blog3_vkvdz0.png'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
