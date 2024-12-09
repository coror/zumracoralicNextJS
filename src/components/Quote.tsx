'use client';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Quote({ quote }: { quote: string }) {
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if it's mobile
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Check if the viewport width is mobile size
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // When the component comes into view, set animate to true
  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  return (
    <div className='relative w-full h-96 md:min-h-72 py-10 md:py-64'>
      <div
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725222544/zumracoralic/Untitled_Project_muob4p.jpg')]"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        }}
      >
        <div className='absolute inset-0 bg-[#222428] opacity-65'></div>
        <div
          className={`relative flex items-center justify-center h-full transition-opacity duration-2000 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          ref={ref}
        >
          <div
            className={` text-white p-10 text-3xl text-center md:text-[56px] tracking-wide leading-[1] ${
              animate
                ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'
                : ''
            }`}
          >
            {quote}
          </div>
        </div>
      </div>
    </div>
  );
}
