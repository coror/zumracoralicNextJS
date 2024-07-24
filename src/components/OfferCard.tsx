import React, { useState } from 'react';

export default function OfferCard({
  title,
  content,
  backTitle,
  backContent,
  bgColor,
  bgColor2,
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
        className='new-content text-white'
        style={{
          backgroundImage: `url(${bgColor2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          borderRadius: '1rem',
        }} // Apply the background image dynamically
      >
        <div className='text-2xl mb-2 text-center'>{backTitle}</div>
        <div className='text-2xl font-bold mb-2 text-center'>-</div>
        <div className='text-center md:text-lg'>{backContent}</div>
      </div>
    </div>
  );
}
