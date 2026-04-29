'use client';
import { Link } from '@/navigation';
import React, { useState } from 'react';

type OfferLink =
  | '/services/coaching'
  | '/services/mediation'
  | '/services/workshop';

export default function OfferCard({
  title,
  content,
  backTitle,
  backContent,
  bgColor,
  bgColor2,
  readMore,
  link,
}: {
  title: string;
  content: string;
  backTitle: string;
  backContent: string;
  bgColor: string;
  bgColor2: string;
  readMore: string;
  link: OfferLink;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`offer-card ${bgColor}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`bg-overlay ${hovered ? 'hovered' : ''}`}
        style={{
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
        }}
      ></div>

      {/* Front face */}
      <div className='primary-content flex flex-col items-center text-center px-2'>
        <h3 className='text-2xl md:text-3xl 2xl:text-4xl 4xl:text-5xl mb-4 4xl:mb-6 leading-tight'>
          {title}
        </h3>
        <span className='block w-10 4xl:w-16 h-px bg-current opacity-40 mb-4 4xl:mb-6' />
        <p className='text-sm md:text-base 2xl:text-xl 4xl:text-2xl leading-relaxed text-[#222428]/80'>
          {content}
        </p>
      </div>

      {/* Back face (revealed on hover, lg+ only) */}
      <div
        className='new-content text-white relative flex flex-col items-center justify-center text-center'
        style={{
          backgroundImage: `url(${bgColor2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          borderRadius: '1rem',
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428]/85 via-[#222428]/65 to-[#222428]/85' />
        <div className='relative z-10 flex flex-col items-center px-2'>
          <h3 className='text-2xl md:text-3xl 2xl:text-4xl 4xl:text-5xl mb-4 4xl:mb-6 leading-tight'>
            {backTitle}
          </h3>
          <span className='block w-10 4xl:w-16 h-px bg-white/50 mb-4 4xl:mb-6' />
          <p className='text-sm md:text-base 2xl:text-xl 4xl:text-2xl leading-relaxed mb-8 4xl:mb-12 text-white/90'>
            {backContent}
          </p>
          <Link href={link}>
            <button className='rounded-xl border border-white text-white px-6 4xl:px-10 py-3 4xl:py-5 text-xs 4xl:text-base tracking-widest uppercase transition-colors hover:bg-white hover:text-[#222428]'>
              {readMore}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
