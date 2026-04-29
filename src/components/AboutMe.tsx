import Image from 'next/image';
import React from 'react';
import Reveal from './Reveal';

export default function AboutMe({
  section,
  title,
  content,
}: {
  section: string;
  title: string;
  content: string;
}) {
  return (
    <section className='min-h-[60rem] 4xl:min-h-[80rem] py-16 md:py-24 4xl:py-32'>
      <div className='max-w-[1200px] 4xl:max-w-[1700px] mx-auto px-6 md:px-8 4xl:px-12 flex flex-col md:flex-row 4xl:gap-16'>
        <div className='py-2 md:py-0 md:px-2'>
          <Reveal variant='up' delay={150}>
            <h2 className='text-2xl md:text-[56px] 4xl:text-[88px] mb-6 md:mb-16 4xl:mb-24 tracking-wide leading-[1]'>
              {section}
            </h2>
          </Reveal>

          <Reveal variant='fade' delay={350}>
            <div className='text-sm md:text-lg 4xl:text-2xl md:ml-20 4xl:ml-28 tracking-wider lg:leading-8 4xl:leading-[2.25rem]'>
              <div className='mb-4'>{content}</div>
            </div>
          </Reveal>

          <Reveal variant='up' delay={500}>
            <div className='text-right mt-4 4xl:mt-10 md:text-xl 4xl:text-3xl font-bold'>
              Zumra Ćoralić
              <div className='text-sm 4xl:text-lg italic font-normal font-sans'>
                {title}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal
          variant='scale'
          delay={100}
          className='w-[18rem] md:min-w-[20rem] 4xl:min-w-[28rem] mx-auto md:mx-0 m-10 4xl:m-16'
        >
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1725905437/profilona_1_eya4qd.jpg'
            alt='zumra'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-auto rounded-2xl shadow-[16px_-16px_0_0_#FFE6BC,0_25px_50px_-15px_rgba(223,101,14,0.3)] md:shadow-[24px_-24px_0_0_#FFE6BC,0_30px_60px_-20px_rgba(223,101,14,0.3)] 4xl:shadow-[36px_-36px_0_0_#FFE6BC,0_40px_80px_-25px_rgba(223,101,14,0.3)]'
          />
        </Reveal>
      </div>
    </section>
  );
}
