import React from 'react';

export default function Credit() {
  return (
    <div className='bg-[#1a1c20] border-t border-white/10'>
      <div className='max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] md:text-xs tracking-wider uppercase text-white/40'>
        <p>
          © {new Date().getFullYear()} Zumra Ćoralić
        </p>
        <p>
          Oblikoval in razvil{' '}
          <span className='text-white/70'>ERCO ERIN ĆORALIĆ s.p.</span>
        </p>
      </div>
    </div>
  );
}
