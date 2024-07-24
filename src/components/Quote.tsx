'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Quote() {
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
    <div className='relative w-full h-96 md:min-h-72 py-10 md:py-64' >
      <div
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbssbnuph/image/upload/v1721210416/zumracoralic/background_ff90gd')] "
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className='absolute inset-0 bg-[#222428] opacity-65'></div>
        <div ref={ref} className={`relative flex items-center justify-center h-full text-white p-10 text-3xl text-center  md:text-[56px]  tracking-wide leading-[1] ${animate ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[1000ms]' : ''}`}>
          “Ni pomembno, od kod prihajaš ali kje se trenutno nahajaš, temveč kam
          si usmerjen in kam želiš priti!”
        </div>
      </div>
    </div>
  );
}
