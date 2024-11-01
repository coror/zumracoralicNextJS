'use client';
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AboutMe({
  section,
  title,
  content,
}: {
  section: string;
  title: string;
  content: string;
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
    <div className='min-h-[60rem] bg-white  pt-10 md:pt-32 ' ref={ref}>
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row'>
        <div className='m-8'>
          <div>
            {/* <div
              className={`tracking-wider mb-6 md:text-xl ${
                animate
                  ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[250ms]'
                  : ''
              }`}
            >
              {section}
            </div> */}
            <div
              className={`text-2xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] ${
                animate
                  ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[600ms]'
                  : ''
              } `}
            >
              {section}
            </div>
          </div>
          <div
            className={`text-sm md:text-lg md:ml-20 tracking-wider lg:leading-8 ${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[700ms]'
                : ''
            }`}
          >
            {/* <div className='mb-4'>{content}</div> */}
            <div className='mb-4'>
           {content}
            </div>
          </div>
          <div
            className={`text-right mt-4 md:text-xl font-bold ${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[800ms]'
                : ''
            }`}
          >
            Zumra Ćoralić
            <div className='text-sm italic font-normal'>{title}</div>
          </div>
        </div>
        <div
          className={`w-[18rem] md:min-w-[20rem] h-auto m-10 rounded-2xl ${
            animate
              ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[800ms]'
              : ''
          }`}
        >
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1725905437/profilona_1_eya4qd.jpg'
            alt='zumra'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-auto  rounded-2xl shadow-[25px_-25px_0px_0px_rgba(255,230,188,1)] '
          />
        </div>
      </div>
    </div>
  );
}
