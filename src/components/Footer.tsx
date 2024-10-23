import React from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import Image from 'next/image';

export default function Footer({ connect }: { connect: string }) {
  return (
    <div className='relative w-full  text-white'>
      <div
        className="eksperiment2 py-10"
      >
        <div className='relative flex flex-col items-center justify-center h-full text-center  md:px-40 '>
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1721558472/zumracoralic/mama-logo-4_smdzke.png'
            alt='naslovna'
            width={90}
            height={90}
            sizes='100vw'
            className='cover xl:w-44 xl:h-44 xl:mt-18'
          />
          <div className='text-white m-10 text-2xl md:text-[56px] tracking-wide leading-tight my-10'>
            {connect}
          </div>
          <div className='flex flex-row items-center space-x-4 text-white'>
            <a
              href='/'
              className='hover:scale-105  md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#ffffff0a] rounded-full'
            >
              <FaFacebookF className='w-8 h-8 p-2 lg:w-16 lg:h-16 lg:p-5 rounded-full bg-[#ffffff0a] text-[#ffffffd0] text-lg hover:text-white' />
            </a>
            <a
              href='/'
              className='hover:scale-105  md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#ffffff0a] rounded-full'
            >
              <FaInstagram className='w-8 h-8 p-2 lg:w-16 lg:h-16 lg:p-5 rounded-full bg-[#ffffff0a] text-[#ffffffd0] text-lg hover:text-white' />
            </a>
            <a
              href='/'
              className='hover:scale-105  md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#ffffff0a] rounded-full'
            >
              <MdOutlineEmail className='w-8 h-8 p-2 lg:w-16 lg:h-16 lg:p-5 rounded-full bg-[#ffffff0a] text-[#ffffffd0] text-lg hover:text-white' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
