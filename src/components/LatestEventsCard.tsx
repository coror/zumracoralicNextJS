import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
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
  const locale = useLocale();
  return (
    <div className='flex flex-col items-center justify-center mx-auto min-h-96 rounded-xl px-16 my-3 py-10'>
      <Link href={`/${locale}/events/${slug}`} className='hover:text-[#d2ab74]'>
        <div className='relative group '>
          {/* Add a container for the image */}
          <Image
            src={featuredImage}
            alt='naslovna'
            width={0}
            height={0}
            sizes='100vw'
            className='w-[18rem] h-[12rem] md:w-[30rem] md:h-[20rem] mb-6 rounded-[56px] shadow-2xl object-cover transition  ease-in-out group-hover:brightness-75'
          />
        </div>
        <div className='text-lg md:text-2xl font-bold m-2 text-center '>
          {headline}
        </div>
      </Link>
      <div className='text-center md:text-lg'>{date}</div>
    </div>
  );
}
