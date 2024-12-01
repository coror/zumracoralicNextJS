'use client';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { useLocale } from 'next-intl';

export default function ActionSection({
  quote,
  button,
}: {
  quote: string;
  button: string;
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

  const locale = useLocale();
  const isMobile = window.innerWidth <= 768;
  return (
    <div className='relative h-96 md:min-h-72 py-10 md:py-80 '>
      <div
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725620619/zumracoralic/IMG-d367d2aa0ebebb4e4cdbbe1872925ec5-V_bkht4p.jpg')]"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed'
        }}
      >
        <div className='absolute inset-0 bg-[#222428] opacity-75'></div>
        <div
          className='relative flex flex-col items-center justify-center h-full text-center  md:px-40 '
          ref={ref}
        >
          <div
            className={`text-white text-2xl md:text-[56px] mt-20 tracking-wide leading-[1] mb-20 ${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[500ms]'
                : ''
            }`}
          >
            {quote}
          </div>

          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[750ms]'
                : ''
            }`}
          >
            <Link href={`${locale}/contact`}>
              <button className='bg-[#ffe6bc] px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in  flex items-center'>
                {button}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
