'use client';
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdLink } from 'react-icons/io';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Testimonial from './Testimonial';
import Reveal from './Reveal';

export default function Testimonials({
  sectionTitle,
  testimonial1,
  person1Title,
  testimonial1_5,
  person1_5Title,
  person1_5Name,
  testimonial2,
  person2Title,
  testimonial3,
  person3Title,
  testimonial4,
  person4Title,
  testimonial5,
  person5Title,
  testimonial6,
  person6Title,
}: {
  sectionTitle: string;
  testimonial1: string;
  person1Title: string;
  testimonial1_5: string;
  person1_5Title: string;
  person1_5Name: string;
  testimonial2: string;
  person2Title: string;
  testimonial3: string;
  person3Title: string;
  testimonial4: string;
  person4Title: string;
  testimonial5: string;
  person5Title: string;
  testimonial6: string;
  person6Title: string;
}) {
  return (
    <section
      className='py-48 md:py-80 4xl:py-96'
      style={{
        background:
          'linear-gradient(to bottom, rgba(245,207,149,0) 0%, rgba(244,163,92,0.4) 50%, rgba(245,207,149,0) 100%)',
      }}
    >
      <div className='mx-auto max-w-[1600px]'>
        <Reveal variant='up' delay={100}>
          <h2 className='text-3xl md:text-[56px] 4xl:text-[88px] mb-12 md:mb-16 4xl:mb-24 tracking-wide leading-[1] text-center'>
            {sectionTitle}
          </h2>
        </Reveal>
        <Reveal variant='up' delay={300}>
          <div className='relative max-w-[1100px] lg:max-w-[1100px] xl:max-w-[1300px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto lg:px-16 xl:px-20 2xl:px-24'>
            <button
              className='testimonials-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 xl:w-12 xl:h-12 items-center justify-center text-[#222428]/50 hover:text-[#222428] transition-colors'
              aria-label='Previous'
              type='button'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-7 h-7 xl:w-9 xl:h-9'
              >
                <path d='M15 19l-7-7 7-7' />
              </svg>
            </button>
            <button
              className='testimonials-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 xl:w-12 xl:h-12 items-center justify-center text-[#222428]/50 hover:text-[#222428] transition-colors'
              aria-label='Next'
              type='button'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-7 h-7 xl:w-9 xl:h-9'
              >
                <path d='M9 5l7 7-7 7' />
              </svg>
            </button>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.testimonials-next',
              prevEl: '.testimonials-prev',
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className='flex items-center justify-between'
          >
          <SwiperSlide>
            <Testimonial
              content={testimonial1}
              name='Tina Menard'
              title={person1Title}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              content={testimonial1_5}
              name={person1_5Name}
              title={person1_5Title}
            />
          </SwiperSlide>

          <SwiperSlide>
            <div className='flex flex-col items-center'>
              <div className='relative flex flex-col items-center justify-center md:justify-start min-h-96 4xl:min-h-[32rem] md:max-w-60 lg:max-w-96 4xl:max-w-[32rem] bg-white rounded-2xl mx-5 my-3 py-10 4xl:py-14 px-5 4xl:px-8 shadow-[0_20px_40px_-15px_rgba(34,36,40,0.18)]'>
                <div className='relative z-10 text-center md:text-lg 4xl:text-2xl 4xl:leading-relaxed'>
                  {testimonial2}
                  <div className='mt-2 hover:text-blue-900'>
                    <a
                      href='https://petrazagar.com/od-cistilke-podjetnice-2-del'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <IoMdLink className='inline mx-2' />
                      Od čistilke do podjetnice
                    </a>
                  </div>
                </div>
                <div className='absolute bottom-[-20px] right-8 w-0 h-0 border-t-[20px] border-t-white border-r-[20px] border-r-transparent z-20'></div>
              </div>
              <div className='flex flex-col items-center justify-center text-center mx-10 my-16 4xl:my-20'>
                <div className='mb-4 4xl:text-xl'>Petra Žagar</div>
                <div className='text-sm 4xl:text-lg text-gray-500'>
                  {person2Title}
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <Testimonial
              content={testimonial3}
              name='K.M.'
              title={person3Title}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Testimonial
              content={testimonial4}
              name='Andreja Kovšca Gruden'
              title={person4Title}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Testimonial
              content={testimonial5}
              name='Šemsa B.'
              title={person5Title}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              content={testimonial6}
              name='Darja'
              title={person6Title}
            />
          </SwiperSlide>

          <div className='swiper-pagination'></div>
        </Swiper>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
