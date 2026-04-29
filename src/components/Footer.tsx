import React from 'react';
import { FaInstagram, FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import Image from 'next/image';

const SOCIAL = [
  {
    href: 'https://www.facebook.com/ustvari.svojo.pot',
    Icon: FaFacebookF,
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/kjer_je_volja_je_tudi_pot/',
    Icon: FaInstagram,
    label: 'Instagram',
  },
  {
    href: 'mailto:ustvari.svojo.pot@gmail.com',
    Icon: MdOutlineEmail,
    label: 'Email',
  },
  {
    href: 'https://si.linkedin.com/in/zumra-%C4%87orali%C4%87-bb084497',
    Icon: FaLinkedin,
    label: 'LinkedIn',
  },
] as const;

export default function Footer({ connect }: { connect: string }) {
  return (
    <footer
      className='relative overflow-hidden text-[#3d2e1f]'
      style={{
        background:
          'linear-gradient(to bottom, #fdf6e8 0%, #f5cf95 55%, #f4a35c 100%)',
      }}
    >
      <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-24 md:pt-36 4xl:pt-48 pb-16 md:pb-20 4xl:pb-32'>
        {/* Logo + headline — centered editorial */}
        <div className='flex flex-col items-center text-center mb-20 md:mb-28 4xl:mb-36'>
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1721558472/zumracoralic/mama-logo-4_smdzke.png'
            alt=''
            aria-hidden='true'
            width={160}
            height={160}
            sizes='100vw'
            className='w-24 h-24 md:w-32 md:h-32 4xl:w-44 4xl:h-44 mb-10 4xl:mb-14'
          />
          <h2
            className='text-3xl md:text-5xl lg:text-6xl tracking-tight md:whitespace-nowrap text-[#5c4a37] max-w-xs md:max-w-none'
            style={{ lineHeight: 1.3 }}
          >
            {connect}
          </h2>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mt-10'
          />
        </div>

        {/* Contact details — three-column elegant grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto'>
          <div className='text-center md:text-left'>
            <p className='text-[10px] tracking-[0.3em] uppercase text-[#3d2e1f]/55 mb-3'>
              Email
            </p>
            <a
              href='mailto:ustvari.svojo.pot@gmail.com'
              className='italic text-lg md:text-xl text-[#df650e] hover:text-[#3d2e1f] transition-colors break-all'
            >
              ustvari.svojo.pot@gmail.com
            </a>
          </div>
          <div className='text-center'>
            <p className='text-[10px] tracking-[0.3em] uppercase text-[#3d2e1f]/55 mb-3'>
              Telefon
            </p>
            <a
              href='tel:+38641429437'
              className='text-lg md:text-xl text-[#3d2e1f]/85 hover:text-[#df650e] transition-colors'
            >
              +386 41 429 437
            </a>
          </div>
          <div className='text-center md:text-right'>
            <p className='text-[10px] tracking-[0.3em] uppercase text-[#3d2e1f]/55 mb-3'>
              Sledi
            </p>
            <ul className='flex items-center justify-center md:justify-end gap-3'>
              {SOCIAL.map(({ href, Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={label}
                    className='flex items-center justify-center w-10 h-10 rounded-full border border-[#3d2e1f]/25 text-[#3d2e1f]/75 hover:text-white hover:bg-[#df650e] hover:border-[#df650e] transition-colors'
                  >
                    <Icon className='w-4 h-4' />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
