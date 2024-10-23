'use client';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';

export default function UnderHeader({ content }: { content: string }) {
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
    <div
      className='bg-white h-96 md:min-h-72 py-10 md:py-40 text-center'
      ref={ref}
    >
      <div
        className={`text-black text-2xl md:text-[56px]  tracking-wide leading-[1]  ${
          animate
            ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[500ms]'
            : ''
        }`}
      >
        {content}
      </div>
    </div>
  );
}
