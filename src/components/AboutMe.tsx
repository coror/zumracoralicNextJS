'use client';
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AboutMe() {
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
    <div className='min-h-[60rem] bg-white  pt-10 md:pt-32 ' ref={ref}>
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row'>
        <div className='m-8'>
          <div>
            <div
              className={`tracking-wider mb-6 md:text-xl ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]' : ''}`}
            >
              - O MENI
            </div>
            <div className={`text-2xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1200ms]' : ''} `}>
              Tukaj sem, da ljudem pomagam odkriti njihov pravi potencial in
              živeti izpolnjujoče življenje...
            </div>
          </div>
          <div className={`text-sm md:text-lg md:ml-20 tracking-wider lg:leading-8 ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1400ms]' : ''}`}>
            <div className='mb-4'>
              Moje ime je Zumra. V svojih zrelih letih sem odkrila smisel in
              lepoto življenja. Odločila sem se, da svoje življenje posvetim
              raziskovanju sebe, poglabljanju v kakovostne medosebne odnose v
              družini ter spreminjanju vzorcev in prepričanj, ki mi ne
              koristijo. Hkrati želim s svojim znanjem in izkušnjami pomagati
              drugim preko predavanj, delavnic, osebnega coachinga in svetovanj
              pri odkrivanju njihovega lastnega smisla življenja. Leta 2015 sem
              zapustila varno službo in se podala na samostojno pot.
            </div>
          </div>
          <div className={`text-right mt-4 md:text-xl font-bold ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1600ms]' : ''}`}>
            Zumra Ćoralić
          </div>
        </div>
        <div className={`w-[18rem] md:min-w-[20rem] h-auto m-10 rounded-2xl ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1600ms]' : ''}`}>
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1721210416/zumracoralic/test2_yg0v2v'
            alt='naslovna'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-auto  rounded-2xl shadow-[25px_-25px_0px_0px_rgba(0,0,0,0.06)]'
          />
        </div>
      </div>
    </div>
  );
}
