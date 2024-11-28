'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Quote({ quote }: { quote: string }) {
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
    <div className="relative overflow-hidden w-full h-96 md:min-h-72 py-10 md:py-64">
  {/* Fixed Background for Quote */}
  <div
    className="absolute inset-0 -z-10"
    style={{
      backgroundImage: `url('https://res.cloudinary.com/dbssbnuph/image/upload/v1725222544/zumracoralic/Untitled_Project_muob4p.jpg')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      clipPath: 'inset(0 0 0 0)', // Show the background only for this section
    }}
  ><div className="absolute inset-0 bg-[#222428] opacity-75"></div></div>

  {/* Quote Content */}
  <div
    ref={ref}
    className={`relative flex items-center justify-center h-full text-white p-10 text-3xl text-center md:text-[56px] tracking-wide leading-[1] ${
      animate
        ? 'animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]'
        : ''
    }`}
  >
    {quote}
  </div>
</div>


  
  );
}
