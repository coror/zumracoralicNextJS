import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LatestBlogsCard({
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
    <div className='flex flex-col items-center justify-center my-2  shadow-2xl rounded-3xl '>
      <Link
        href={`/${locale}/blog/${slug}`}
        className='hover:text-[#d2ab74] h-full w-full'
      >
        <div className='w-full h-full max-h-24 md:max-h-72 group'>
          <Image
            src={featuredImage}
            alt='naslovna'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-full  max-h-full rounded-3xl object-cover transition ease-in-out group-hover:brightness-75'
          />
        </div>

        <div className='h-20 md:h-32 lg:h-32 xl:h-48'>
          <div className='text-xs md:text-2xl  my-2 text-center '>
            {headline}
          </div>
          <div className='text-center text-xs md:text-lg text-[#00000059]'>
            {date}
          </div>
        </div>
      </Link>
    </div>
  );
}
