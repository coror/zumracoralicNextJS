'use client';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { IoMdMailOpen } from 'react-icons/io';
import { FaPencil } from 'react-icons/fa6';

export default function ActionSection({ quote, button }) {
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
    <div className='relative h-96 md:min-h-72 py-10 md:py-80 '>
      <div
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbssbnuph/image/upload/v1721487542/zumracoralic/background1_xqcq2z')]"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className='absolute inset-0 bg-[#222428] opacity-65'></div>
        <div
          className='relative flex flex-col items-center justify-center h-full text-center  md:px-40 '
          ref={ref}
        >
          <div
            className={`text-white text-2xl md:text-[56px] mt-20 tracking-wide leading-[1] mb-20 ${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1000ms]'
                : ''
            }`}
          >
            {quote}
          </div>

          <div
            className={`${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1500ms]'
                : ''
            }`}
          >
            <Link href='/contact'>
              <button className='bg-[#ffe6bc] px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in  flex items-center'>
                <FaPencil className='inline mx-1' />
                {button}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
