import React from 'react';
import Reveal from './Reveal';

export default function Quote({ quote }: { quote: string }) {
  return (
    <div className='relative w-full h-96 md:min-h-[36rem] 4xl:min-h-[52rem] py-16 md:py-24 4xl:py-32 overflow-hidden'>
      {/* Personal photo backdrop with desktop parallax */}
      <div
        aria-hidden='true'
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725222544/zumracoralic/Untitled_Project_muob4p.jpg')] bg-cover bg-center bg-scroll md:bg-fixed"
      />
      <div aria-hidden='true' className='absolute inset-0 bg-[#222428]/65' />

      {/* Massive decorative quotation mark — typographic anchor */}
      <span
        aria-hidden='true'
        className='pointer-events-none select-none absolute top-0 md:top-12 4xl:top-20 left-6 md:left-12 lg:left-24 4xl:left-40 text-[10rem] md:text-[20rem] lg:text-[32rem] 4xl:text-[48rem] leading-none text-white/[0.06]'
      >
        &ldquo;
      </span>

      <div className='relative z-10 flex items-center justify-center h-full px-6'>
        <Reveal variant='up-lg' className='max-w-5xl 4xl:max-w-7xl'>
          <blockquote className='relative text-white text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.15] italic text-center'>
            {quote}
          </blockquote>
          <div className='mt-10 4xl:mt-16 flex justify-center'>
            <span
              aria-hidden='true'
              className='block w-12 4xl:w-20 h-px 4xl:h-0.5 bg-[#df650e]'
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
