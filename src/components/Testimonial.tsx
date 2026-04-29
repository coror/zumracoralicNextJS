import React from 'react';

export default function Testimonial({
  content,
  name,
  title,
}: {
  content: string;
  name: string;
  title: string;
}) {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex flex-col items-center justify-center md:justify-start min-h-96 4xl:min-h-[32rem] md:max-w-60 lg:max-w-96 4xl:max-w-[32rem] bg-white rounded-2xl mx-5 my-3 py-10 4xl:py-14 px-5 4xl:px-8 shadow-[0_20px_40px_-15px_rgba(34,36,40,0.18)]'>
        <div className='relative z-10 text-center md:text-lg 4xl:text-2xl 4xl:leading-relaxed'>
          {content}
        </div>
        <div className='absolute bottom-[-20px] right-8 w-0 h-0 border-t-[20px] border-t-white border-r-[20px] border-r-transparent z-20'></div>
      </div>

      <div className='flex flex-col items-center justify-center text-center mx-10 my-16 4xl:my-20'>
        <div className='mb-4 4xl:text-xl'>{name}</div>
        <div className='text-sm 4xl:text-lg text-gray-500'>{title}</div>
      </div>
    </div>
  );
}
