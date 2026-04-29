import { Link } from '@/navigation';
import React from 'react';
import Reveal from './Reveal';

export default function ActionSection({
  quote,
  button,
}: {
  quote: string;
  button: string;
}) {
  return (
    <div className='relative w-full md:min-h-[42rem] py-16 md:py-24 4xl:py-32 overflow-hidden'>
      {/* Personal photo backdrop with desktop parallax */}
      <div
        aria-hidden='true'
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725620619/zumracoralic/IMG-d367d2aa0ebebb4e4cdbbe1872925ec5-V_bkht4p.jpg')] bg-cover bg-center bg-scroll md:bg-fixed"
      />
      <div aria-hidden='true' className='absolute inset-0 bg-[#222428]/75' />

      <div className='relative z-10 flex flex-col items-center justify-center h-full px-6'>
        {/* Decorative top divider */}
        <Reveal variant='fade'>
          <span
            aria-hidden='true'
            className='block w-16 h-px bg-[#FFE6BC]/60 mb-12 md:mb-16'
          />
        </Reveal>

        {/* Headline / quote */}
        <Reveal variant='up-lg' delay={150}>
          <p className='text-white text-2xl md:text-5xl lg:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.15] mb-12 md:mb-20 4xl:mb-28 italic max-w-4xl 4xl:max-w-6xl mx-auto text-center'>
            {quote}
          </p>
        </Reveal>

        {/* CTA with animated arrow */}
        <Reveal variant='up' delay={300}>
          <Link href='/contact' className='group'>
            <button className='btn-inverse gap-3'>
              {button}
              <span
                aria-hidden='true'
                className='inline-block transition-transform duration-300 group-hover:translate-x-1'
              >
                →
              </span>
            </button>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
