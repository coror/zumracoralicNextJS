'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import OfferCard from './OfferCard';

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
}) {
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
          {sectionTitle}
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
              title={card1Title}
              content={card1Content}
              backTitle={back1Title}
              backContent={back1Content}
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
              title={card2Title}
              content={card2Content}
              backTitle={back2Title}
              backContent={back2Content}
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
              title={card3Title}
              content={card3Content}
              backTitle={back3Title}
              backContent={back3Content}
              bgColor='bg-[#D8ECD3]'
              bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1721209043/blog3_vkvdz0.png'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
