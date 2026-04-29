import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';

export default function Header({
  title,
  content,
  button,
}: {
  title: string;
  content: string;
  button: string;
}) {
  return (
    <header className='relative overflow-hidden h-[36rem] md:h-[44rem] xl:min-h-screen flex items-center'>
      {/* Background image bound to the hero section (no parallax) */}
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1725899504/17.11.2023_Kolektor_n_inpsuu.jpg'
          alt=''
          aria-hidden='true'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full hero-ken-burns'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428]/80 via-[#222428]/45 to-transparent' />
      </div>

      <div className='relative z-10 w-full max-w-7xl xl:max-w-[1450px] 2xl:max-w-[1600px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-6 xl:px-8 4xl:px-12 text-white'>
        <div className='max-w-2xl 4xl:max-w-4xl text-center'>
          {/* Headline */}
          <h1 className='text-3xl md:text-5xl lg:text-6xl xl:text-7xl 4xl:text-[120px] leading-[1.1] tracking-tight uppercase animate-fade-up animate-duration-700 animate-delay-[500ms]'>
            {title}
          </h1>

          {/* Subline */}
          {content && (
            <p className='mt-6 md:mt-8 4xl:mt-12 max-w-xl 4xl:max-w-3xl mx-auto text-sm md:text-base lg:text-lg 4xl:text-2xl leading-relaxed text-white/85 animate-fade-up animate-duration-700 animate-delay-[800ms]'>
              {content}
            </p>
          )}

          {/* CTA */}
          <div className='mt-10 md:mt-14 4xl:mt-20 animate-fade-up animate-duration-700 animate-delay-[1100ms]'>
            <Link href='/contact'>
              <button className='btn-inverse'>{button}</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
