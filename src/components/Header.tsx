'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Header({
  title,
  content,
  button,
}: {
  title: string;
  content: string;
  button: string;
}) {
  const locale = useLocale();
  return (
    <div className='w-auto relative overflow-hidden h-[30rem] md:h-[40rem] xl:h-screen max-w-screen flex items-start justify-center '>
      <div className='absolute top-[34%] 3xl:top-[40%]  xl:right-[50%] px-8 mx-auto text-center space-y-16 xl:space-y-30 z-10 lg:mx-[170px]'>
        <div className='lg:space-y-16'>
          <h1 className='text-2xl md:text-4xl lg:text-5xl xl:text-5xl 3xl:text-7xl tracking-wider md:leading-snug text-white uppercase animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'>
            {title}
          </h1>
        </div>

        <div className='animate-fade-up animate-duration-[2000ms] animate-delay-[2000ms] '>
          <Link href={`${locale}/contact`}>
            <button className='bg-[#FFE6BC] px-5 py-4 md:px-6 md:py-5  text-base  md:text-xl xl:text-2xl 3xl:text-3xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in '>
              {button}
            </button>
          </Link>
        </div>
      </div>

      <div className=' relative top-0 left-0 w-full h-[30rem] md:h-screen overflow-hidden'>
        <div
          className='absolute top-0 left-0 w-full h-screen -z-10'
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725899504/17.11.2023_Kolektor_n_inpsuu.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className='fixed inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>
        </div>
      </div>
    </div>
  );
}
