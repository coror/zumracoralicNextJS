import Image from 'next/image';
import { Link } from '@/navigation';
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
  return (
    <Link
      href={{ pathname: '/blogs/[slug]', params: { slug } }}
      className='group block'
    >
      <article className='flex flex-col'>
        {/* Text-led editorial: eyebrow + large serif headline + animated underline */}
        <div className='pb-5 px-1'>
          <p className='text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#df650e] mb-3'>
            {date}
          </p>
          <h3 className='text-xl md:text-2xl lg:text-[28px] 2xl:text-3xl 3xl:text-4xl leading-[1.45] line-clamp-3 min-h-[4.35em] pb-2 transition-colors group-hover:text-[#df650e]'>
            {headline}
          </h3>
          <span
            aria-hidden='true'
            className='block h-px bg-[#df650e] mt-4 w-8 transition-all duration-500 group-hover:w-16'
          />
        </div>
        {/* Image as supporting element — wider 16:10 to differ from events 4:3 */}
        <div className='relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 rounded-2xl'>
          <Image
            src={featuredImage}
            alt={headline}
            fill
            sizes='(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw'
            className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />
        </div>
      </article>
    </Link>
  );
}
