'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdLink } from 'react-icons/io';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Testimonial from './Testimonial';

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
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // When the component comes into view, set animate to true
  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  return (
    <div className='eksperiment3 py-10 md:py-24 '>
      <div
        className={`mx-auto max-w-[1600px] transition-opacity duration-2000 transform ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        ref={ref}
      >
        <div
          className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center ${
            animate
              ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'
              : ''
          }`}
        >
          {sectionTitle}
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className={`flex items-center justify-between max-w-[1600px] ${
            animate
              ? 'animate-fade-up animate-duration-[2500ms] animate-delay-[1000ms]'
              : ''
          }`}
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
              <div className='relative flex flex-col items-center justify-center md:justify-start min-h-96 md:max-w-60 lg:max-w-96 bg-white rounded-2xl mx-5 my-3 py-10 px-5 shadow-2xl'>
                <div className='relative z-10 text-center md:text-lg'>
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
              <div className='flex flex-col items-center justify-center text-center mx-10 my-16'>
                <div className='mb-4'>Petra Žagar</div>
                <div className='text-sm text-gray-500'>{person2Title}</div>
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
          <div className='swiper-button-next'></div>
          <div className='swiper-button-prev'></div>
        </Swiper>
      </div>
    </div>
  );
}
