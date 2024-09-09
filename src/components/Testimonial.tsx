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
      <div className='relative flex flex-col items-center justify-center md:justify-start min-h-96 md:max-w-60 lg:max-w-96 bg-white rounded-2xl mx-5 my-3 py-10 px-5 shadow-2xl'>
        <div className='relative z-10 text-center md:text-lg'>{content}</div>
        <div className='absolute bottom-[-20px] right-8 w-0 h-0 border-t-[20px] border-t-white border-r-[20px] border-r-transparent z-20'></div>
      </div>

      <div className='flex flex-col items-center justify-center text-center mx-10 my-16'>
        <div className='mb-4'>{name}</div>
        <div className='text-sm text-gray-500'>{title}</div>
      </div>
    </div>
  );
}
