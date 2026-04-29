import Image from 'next/image';
import { Link } from '@/navigation';
import React from 'react';

type ServiceLink =
  | '/services/coaching'
  | '/services/mediation'
  | '/services/workshop';

export default function ServicesCard({
  title,
  content,
  readMore,
  srcImage,
  link,
}: {
  title: string;
  content: string;
  readMore: string;
  srcImage: string;
  link: ServiceLink;
}) {
  return (
    <div className='animate-fade-right animate-duration-500 animate-delay-[1500ms]'>
      <Link href={link} className='group block my-10'>
        <article className='relative border border-neutral-200 hover:border-[#222428] flex flex-col items-center justify-center p-5 pt-20 text-center w-full lg:w-80 xl:w-96 h-[32rem] space-y-8 transition-all duration-500 ease-out lg:hover:scale-105 lg:hover:shadow-xl'>
          <div className='border border-[#df650e]/30 rounded-full overflow-hidden p-4 absolute -top-12 bg-white'>
            <Image src={srcImage} alt={title} width={80} height={80} />
          </div>
          <h2 className='text-3xl'>{title}</h2>
          <p className='px-2 text-sm md:text-base text-neutral-600 leading-relaxed'>
            {content}
          </p>
          <span className='mt-auto inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-[#222428] group-hover:text-[#df650e] transition-colors'>
            {readMore}
            <span aria-hidden='true' className='transition-transform group-hover:translate-x-1'>
              →
            </span>
          </span>
        </article>
      </Link>
    </div>
  );
}
