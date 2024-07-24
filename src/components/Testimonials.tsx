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

export default function Testimonials() {
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
    <div className='bg-[#EAF2EC] py-10 md:py-24 relative '>
      <div className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]' : ''}`} ref={ref}>
        Mnenja in odzivi
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
        className={`flex items-center justify-between max-w-[1600px] ${animate ? 'animate-fade-up animate-duration-[2500ms] animate-delay-[1000ms]' : ''}`}
        style={{
          '--swiper-navigation-color': '#000000',
          '--swiper-pagination-color': '#000000',
        }}
      >
        <SwiperSlide>
          <Testimonial
            content='“Z ga. Zumro Ćoralić smo se prvič srečali v mesecu marcu 2023,
                ko smo iskali ustreznega predavatelja za izpeljavo delavnic o
                izzivih medsebojnih odnosov in uspešnega reševanja konfliktov.
                Strast do dela, predanost poklicu, izžarevanje pozitivne
                energije in strokovnost so nas prepričale, da je ga. Zumra prava
                predavateljica za skupino vedoželjnih posameznikov.
                Komunikacijske veščine za obvladovanje pozitivnih odnosov in
                konstruktivnega reševanja konfliktnih situacij je področje, ki
                ga mora negovati vsaka organizacija. Zato je pomembno, kako jih
                znamo obvladovati. Ga. Zumra Ćoralić je udeležencem pokazala, da
                se z voljo, srčnostjo in pozitivnim odnosom lahko odprejo vrata
                na pravo pot in odpravi marsikatera, še tako nerešljiva, ovira.
                Hvala Zumra!”'
            name='Tina Menard'
            title='Direktorica enote za kadre in splošne zadeve, ETA d.o.o. Cerkno'
          />
        </SwiperSlide>

        <SwiperSlide>
          <div className='flex flex-col items-center'>
            <div className='relative flex flex-col items-center justify-center md:justify-start min-h-96 md:max-w-60 lg:max-w-96 bg-white rounded-2xl mx-5 my-3 py-10 px-5 shadow-2xl'>
              <div className='relative z-10 text-center md:text-lg'>
                “Ona je resnično en tak noro dober primer, kjer je pokazala in
                dokazala sebi in drugim, da se resnično da, če se hoče. In tako
                preprosta in srčno simpatična oseba je. Kje bo čez 10 let?
                Prepričana sem, da natanko tam, kot si bo zamislila, da bo, saj
                natančno ve kam gre. In, ko bo prišel zadnji dan, bo presrečna,
                ker ga bo preživela v veri, da je živela bogato in izpolnjeno
                življenje. Tudi zato, ker si je upala stopiti iz cone udobja,
                delati na sebi, se izobraževala in to znanje spravila iz teorije
                v prakso.”
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
              <div className='text-sm text-gray-500'>
                Direktorica enote za kadre in splošne zadeve, ETA d.o.o. Cerkno
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <Testimonial
            content=' “aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaa a a aaa aaaaaaaa a a a aaa a a
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa”'
            name='Petra Žagar'
            title='Direktorica enote za kadre in splošne zadeve, ETA d.o.o. Cerkno'
          />
        </SwiperSlide>

        <SwiperSlide>
          <Testimonial
            content='“sdfsdfsdfsdfsdfsdf sdfsdčlk asdćčlsakd ćasčld kasćd
                saldksaćčdlk ćqwop kd ćlfćčkd lsćač lf kćčadslfkćč dsafloć
                aowekćfl kdćsčfl čćdask ćčsldfkaćčsdlfkć čsaldfć časdlofkć
                asdčlfć sdl”'
            name='Petra Žagar'
            title='Direktorica enote za kadre in splošne zadeve, ETA d.o.o. Cerkno'
          />
        </SwiperSlide>

        <div className='swiper-pagination'></div>
        <div className='swiper-button-next'></div>
        <div className='swiper-button-prev'></div>
      </Swiper>
    </div>
  );
}
