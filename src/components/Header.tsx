'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Header({
  title,
  content,
  button,
}: {
  title: string;
  content: string;
  button: string;
}) {
  const locale = useLocale();
  return (
    <div className="relative w-auto overflow-hidden h-[30rem] md:h-[40rem] xl:h-screen max-w-screen flex items-start justify-center">
  {/* Header Content */}
  <div className="absolute top-[34%] 3xl:top-[40%] xl:right-[50%] px-8 mx-auto text-center space-y-16 xl:space-y-30 z-10 lg:mx-[170px]">
    <div className="lg:space-y-16">
      <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-5xl 3xl:text-7xl tracking-wider md:leading-snug text-white uppercase animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]">
        {title}
      </h1>
    </div>

    <div className="animate-fade-up animate-duration-[2000ms] animate-delay-[2000ms]">
      <Link href={`${locale}/contact`}>
        <button className="bg-[#FFE6BC] px-5 py-4 md:px-6 md:py-5 text-base md:text-xl xl:text-2xl 3xl:text-3xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in">
          {button}
        </button>
      </Link>
    </div>
  </div>

  {/* Fixed Background for Header */}
  <div
    className="absolute inset-0 -z-10 h-screen"
    style={{
      backgroundImage: `url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725899504/17.11.2023_Kolektor_n_inpsuu.jpg')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      clipPath: 'inset(0% 0% 0% 0%)', // Full visibility for this section
    }}
  ><div className="absolute inset-0 bg-[#222428] opacity-75"></div></div>
</div>


  );
}
