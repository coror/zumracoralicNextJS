'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='w-auto relative overflow-hidden h-[26rem] md:h-[50rem] xl:h-[60rem] max-w-screen flex items-start justify-center '>
      <div className='absolute top-[28%] px-8 mx-auto text-center space-y-16 md:space-y-20 xl:space-y-52 z-10 lg:mx-[170px]'>
        <div className='lg:space-y-20'>
          <h1 className='text-xl md:text-7xl tracking-wider md:leading-snug text-white uppercase animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'>
            NLP Coach in Mediator
          </h1>
          <p className='lg:block  text-sm md:text-4xl mt-5 text-white animate-fade-up animate-duration-[2000ms] animate-delay-[1500ms]'>
            Spoznajte, kako vam lahko NLP coaching in mediacija pomagata
            izboljšati počutje in odnose.
          </p>
        </div>

        <div className='animate-fade-up animate-duration-[2000ms] animate-delay-[2000ms] '>
          <Link href='/contact'>
            <button className='bg-[#d2ab74] px-5 py-4 md:px-6 md:py-5  text-sm hover:scale-105 md:text-xl lg:text-2xl md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#b7905b]'>
              Stopi v stik
            </button>
          </Link>
        </div>
      </div>
      <div className=' -z-10 fixed top-0 left-0 w-full h-[26rem] md:h-[70rem] overflow-hidden'>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1721210416/zumracoralic/4_g7cxm4'
          alt='naslovna'
          layout='fill'
          objectFit='cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>
      </div>
    </div>
  );
}
