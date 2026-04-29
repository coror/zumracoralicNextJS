import Image from 'next/image';
import { Link } from '@/navigation';
import React from 'react';

export default function LatestEventsCard({
  headline,
  date,
  featuredImage,
  slug,
}: {
  headline: string;
  date: string;
  featuredImage: string;
  slug: string;
}) {
  // Parse "d. MMMM yyyy" → day + first 3 letters of month uppercased
  const parts = date
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean);
  const day = parts[0] ?? '';
  const month = (parts[1] ?? '').split(' ')[0];
  const monthShort = month.slice(0, 3).toUpperCase();

  return (
    <div className='px-4 md:px-6 py-8'>
      <Link
        href={{ pathname: '/events/[slug]', params: { slug } }}
        className='group block'
      >
        <article className='flex flex-col'>
          <div className='relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 rounded-2xl'>
            <Image
              src={featuredImage}
              alt={headline}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
              className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
            />
            {day && monthShort && (
              <div className='absolute top-4 left-4 md:top-5 md:left-5 flex flex-col items-center justify-center w-14 h-16 md:w-16 md:h-[4.5rem] bg-[#FFE6BC] rounded-2xl shadow-[0_10px_25px_-8px_rgba(34,36,40,0.4)]'>
                <span className='text-2xl md:text-[28px] leading-none text-[#df650e]'>
                  {day}
                </span>
                <span className='block w-5 h-px bg-[#df650e]/40 my-1' />
                <span className='text-[10px] tracking-[0.18em] text-[#222428]/75'>
                  {monthShort}
                </span>
              </div>
            )}
          </div>
          <div className='pt-6 text-center'>
            <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl leading-snug line-clamp-2 transition-colors group-hover:text-[#df650e]'>
              {headline}
            </h3>
          </div>
        </article>
      </Link>
    </div>
  );
}
