import React, { useState } from 'react';

export default function OfferCard({
  title,
  content,
  backTitle,
  backContent,
  bgColor,
  bgColor2,
}: {
  title: string;
  content: string;
  backTitle: string;
  backContent: string;
  bgColor: string;
  bgColor2: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`offer-card ${bgColor}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background overlay */}
      <div
        className={`bg-overlay ${hovered ? 'hovered' : ''}`}
        style={{
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
        }} // Optional overlay effect
      ></div>

      {/* Primary content */}
      <div className='primary-content'>
        <div className='text-2xl mb-2 text-center'>{title}</div>
        <div className='text-2xl font-bold mb-2 text-center'>-</div>
        <div className='text-center md:text-lg'>{content}</div>
      </div>

      {/* New content */}
      <div
        className='new-content text-white relative' // Added 'relative' here
        style={{
          backgroundImage: `url(${bgColor2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          borderRadius: '1rem',
        }} // Apply the background image dynamically
      >
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>
        <div className='relative z-10 text-2xl mb-2 text-center'>
          {backTitle}
        </div>
        <div className='relative z-10 text-2xl font-bold mb-2 text-center'>
          -
        </div>
        <div className='relative z-10 text-center md:text-lg'>
          {backContent}
        </div>
      </div>
    </div>
  );
}
