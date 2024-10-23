import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useLocale } from 'next-intl';

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
  link: string;
}) {
  const locale = useLocale();

  return (
    <div className='animate-fade-right animate-duration-[1000ms] animate-delay-[1500ms]'>
      <div className='relative border-[1px] border-[#df650e] flex flex-col items-center justify-center p-5 text-center my-10 w-full lg:w-80 xl:w-96 h-[32rem] space-y-12 transition-transform  duration-500 ease-in-out lg:hover:scale-105 lg:hover:bg-[#ffe6bc] lg:hover:shadow-2xl '>
        <div className='border-2 border-[#df650e] rounded-full overflow-hidden p-4 absolute -top-16 bg-[#ffe6bc]'>
          <Image src={srcImage} alt={title} width={90} height={90} />
        </div>
        <h1 className='text-3xl font-bold '>{title}</h1>
        <div className='px-2 '>{content}</div>
        <div>
          <Link href={`/${locale}/${link}`}>
            <p className='text-black py-2 px-4 inline-block mt-2 lg:mt-10 bg-white border-[1px] border-[#df650e]'>
              {readMore}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
