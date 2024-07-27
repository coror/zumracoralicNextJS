'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LocalSwitcher from './local-switcher';
import { useLocale } from 'next-intl';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Navbar = ({ home, blogPosts, events, services, about, contact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);

  const homePageLink = `/${locale}`;
  const blogPostsLink = `/${locale}/blog`;
  const eventsLink1 = `/${locale}/dogodki`;
  const eventsLink2 = `/${locale}/dogadaji`;

  const handleClickOutside = (event) => {
    // Ensure clicks outside the menu close the menu
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log('isMobileMenuOpen changed:', isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`${
        isMobileMenuOpen
          ? 'bg-black fixed text-white'
          : 'bg-transparent absolute'
      } ${
        pathname === homePageLink || pathname.startsWith(blogPostsLink)
          ? ' text-white border-[#ffffff40]'
          : 'text-black border-[#0000002a]'
      }
        border-b-[1px] z-50 w-full h-20 lg:h-32 `}
    >
      <div className='mx-auto max-w-7xl px-2 h-full'>
        <div className='relative flex h-full items-center justify-between'>
          <div className='flex flex-1 items-center justify-between space-x-12  h-full'>
            <div className='flex space-x-12 md:space-x-10 h-full'>
              <div className='absolute inset-y-0 left-0 flex items-center lg:hidden'>
                <button
                  type='button'
                  id='mobile-dropdown-button'
                  className={`relative inline-flex items-center justify-center rounded-md p-2  hover:bg-[#0000007c] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                    pathname.startsWith(eventsLink1) ||
                    pathname.startsWith(eventsLink2)
                      ? 'text-black '
                      : 'text-white '
                  }`}
                  aria-controls='mobile-menu'
                  aria-expanded={isMobileMenuOpen}
                  ref={buttonRef}
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                >
                  <span className='sr-only'>Open main menu</span>
                  <svg
                    className='block h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                  </svg>
                </button>
              </div>
              <Link className='flex flex-shrink-0 items-center' href='/'>
                <span className=' text-xl lg:text-4xl font-bold'>
                  ZUMRA ĆORALIĆ
                </span>
              </Link>
              <div className='hidden md:flex justify-center items-center space-x-2'>
                <a
                  href='https://www.facebook.com/ustvari.svojo.pot'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaFacebookF
                    className={` text-lg  ${
                      pathname === eventsLink1 || pathname === eventsLink2
                        ? 'text-[#000000b6] hover:text-black '
                        : 'text-[#ffffffd0] hover:text-white'
                    }`}
                  />
                </a>
                <a
                  href='https://www.instagram.com/kjer_je_volja_je_tudi_pot/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaInstagram
                    className={` text-lg  ${
                      pathname === eventsLink1 || pathname === eventsLink2
                        ? 'text-[#000000b6] hover:text-black '
                        : 'text-[#ffffffd0] hover:text-white'
                    }`}
                  />
                </a>
              </div>
            </div>

            <div
              className={
                'hidden lg:ml-6 lg:block text-sm xl:text-base h-full uppercase'
              }
            >
              <div className='flex h-full'>
                <Link
                  href={homePageLink}
                  className={`${
                    pathname === homePageLink
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {home}
                </Link>
                <Link
                  href={blogPostsLink}
                  className={`${
                    pathname === blogPostsLink
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {blogPosts}
                </Link>
                <Link
                  href={`/${locale}/dogodki`}
                  className={`${
                    pathname === eventsLink1 || pathname === eventsLink2
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {events}
                </Link>
                <Link
                  href={`${blogPostsLink}/about`}
                  className={`${
                    pathname === `/${locale}/about`
                      ? 'bg-black text-white hover:text-white'
                      : ''
                  } relative px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {about}
                </Link>
                <Link
                  href={`${blogPostsLink}/services`}
                  className={`${
                    pathname === `/${locale}/services`
                      ? 'bg-black text-white hover:text-white'
                      : ''
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {services}
                </Link>
                <Link
                  href={`${blogPostsLink}/services`}
                  className={`${
                    pathname === `/${locale}/services`
                      ? 'bg-black text-white hover:text-white'
                      : ''
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {contact}
                </Link>
              </div>
            </div>
            <div className='z-20 -px-10'>
              <LocalSwitcher />
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id='mobile-menu'
          ref={mobileMenuRef}
          className={`fixed inset-x-0 top-20 bg-black transition-transform duration-300 ease-out z-10 ${
            isMobileMenuOpen ? 'mobile-menu-enter' : 'mobile-menu-exit'
          }`}
        >
          <div className='space-y-1 px-2 pb-3 pt-2 flex flex-col bg-black uppercase'>
            <Link
              href={homePageLink}
              className={`${
                pathname === homePageLink ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {home}
            </Link>
            <Link
              href={blogPostsLink}
              className={`${
                pathname.startsWith(blogPostsLink) ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {blogPosts}
            </Link>
            <Link
              href={eventsLink1}
              className={`${
                pathname === eventsLink1 || pathname === eventsLink2
                  ? 'bg-[#d2ab74]'
                  : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {events}
            </Link>
            <Link
              href={`${blogPostsLink}/about`}
              className={`${
                pathname === `/${locale}/about` ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {about}
            </Link>
            <Link
              href={`${blogPostsLink}/services`}
              className={`${
                pathname === `/${locale}/services` ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {services}
            </Link>
            <Link
              href={`${blogPostsLink}/services`}
              className={`${
                pathname === `/${locale}/services` ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
