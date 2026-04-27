'use client';
import { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/navigation';
import LocalSwitcher from './local-switcher';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Navbar = ({
  home,
  blogPosts,
  events,
  about,
  services,
  allServices,
  NLPCoaching,
  mediation,
  workshop,
  contact,
}: {
  home: string;
  blogPosts: string;
  events: string;
  about: string;
  services: string;
  allServices: string;
  NLPCoaching: string;
  mediation: string;
  workshop: string;
  contact: string;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === '/';
  const isBlogs = pathname.startsWith('/blogs');
  const isEvents = pathname.startsWith('/events');
  const isAbout = pathname === '/about-me';
  const isServicesRoute = pathname.startsWith('/services');
  const isContact = pathname === '/contact';
  const isCoaching = pathname === '/services/coaching';
  const isMediation = pathname === '/services/mediation';
  const isWorkshop = pathname.startsWith('/services/workshop');
  const isServicesIndex = pathname === '/services';

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
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

  return (
    <nav
      className={`${
        isMobileMenuOpen
          ? 'bg-black fixed text-white'
          : 'bg-transparent absolute'
      } ${
        isHome || isBlogs
          ? 'text-white border-[#ffffff40] border-b-[1px] '
          : isServicesRoute
          ? 'text-black border-0'
          : 'text-black border-[#0000002a] border-b-[1px] '
      }
      z-50 w-full h-20 lg:h-32`}
    >
      <div className='mx-auto max-w-7xl px-2 h-full'>
        <div className='relative flex h-full items-center justify-between'>
          <div className='flex flex-1 items-center justify-between space-x-12  h-full'>
            <div className='flex space-x-12 md:space-x-10 h-full'>
              <div className='absolute inset-y-0 left-0 flex items-center xl:hidden'>
                <button
                  type='button'
                  id='mobile-dropdown-button'
                  className={`relative inline-flex items-center justify-center rounded-md p-1  hover:bg-[#0000007c] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                    isMobileMenuOpen ? 'text-white' : ''
                  } ${
                    isEvents ||
                    isAbout ||
                    isServicesRoute ||
                    isContact
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
                <span className='text-xl lg:text-4xl font-bold '>
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
                      isEvents ||
                      isAbout ||
                      isServicesRoute ||
                      isContact
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
                      isEvents ||
                      isAbout ||
                      isServicesRoute ||
                      isContact
                        ? 'text-[#000000b6] hover:text-black '
                        : 'text-[#ffffffd0] hover:text-white'
                    }`}
                  />
                </a>
              </div>
            </div>

            <div
              className={
                'hidden lg:ml-6 xl:block text-sm xl:text-base h-full uppercase'
              }
            >
              <div className='flex h-full'>
                <Link
                  href='/'
                  className={`${
                    isHome
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {home}
                </Link>
                <Link
                  href='/blogs'
                  className={`${
                    pathname === '/blogs'
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {blogPosts}
                </Link>
                <Link
                  href='/events'
                  className={`${
                    pathname === '/events'
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {events}
                </Link>
                <Link
                  href='/about-me'
                  className={`${
                    isAbout
                      ? 'bg-black text-white hover:text-white'
                      : ''
                  } relative px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {about}
                </Link>

                <div className='relative group'>
                  <Link
                    href='/services'
                    className={`${
                      isServicesIndex
                        ? 'bg-black text-white active'
                        : ''
                    } relative px-3 w-28 flex items-center h-full justify-center link-hover`}
                  >
                    {services}
                  </Link>
                  <div
                    className={`absolute left-0 top-full w-56 shadow-2xl text-black invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out ${
                      isHome || isBlogs ? 'bg-black ' : 'bg-white '
                    }`}
                  >
                    <Link
                      href='/services'
                      className={`block px-4 py-4 hover:text-[#df650e]  border-b-[1px]  ${
                        isServicesIndex ? 'text-[#df650e]' : 'text-black'
                      } ${
                        isHome || isBlogs
                          ? 'text-white border-[#ffffff80]'
                          : 'border-[#00000036]'
                      }`}
                    >
                      {allServices}
                    </Link>
                    <Link
                      href='/services/coaching'
                      className={`block px-4 py-4 hover:text-[#df650e]  ${
                        isCoaching ? 'text-[#df650e]' : 'text-black'
                      } ${isHome || isBlogs ? 'text-white' : ''}`}
                    >
                      {NLPCoaching}
                    </Link>
                    <Link
                      href='/services/mediation'
                      className={`block px-4 py-4 hover:text-[#df650e]  ${
                        isMediation ? 'text-[#df650e]' : 'text-black'
                      } ${isHome || isBlogs ? 'text-white' : ''}`}
                    >
                      {mediation}
                    </Link>
                    <Link
                      href='/services/workshop'
                      className={`block px-4 py-4 hover:text-[#df650e] ${
                        isWorkshop ? 'text-[#df650e]' : 'text-black'
                      } ${isHome || isBlogs ? 'text-white' : ''}`}
                    >
                      {workshop}
                    </Link>
                  </div>
                </div>

                <Link
                  href='/contact'
                  className={`${
                    isContact ? 'bg-[#d2ab74]' : ''
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
              href='/'
              className={`${
                isHome ? 'bg-[#ffe6bc] text-black' : 'text-white'
              }  xl:hover:bg-[#ffe6bc]  xl:hover:text-black rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {home}
            </Link>
            <Link
              href='/blogs'
              className={`${
                isBlogs ? 'bg-[#ffe6bc] text-black' : 'text-white'
              }  xl:hover:bg-[#ffe6bc] xl:hover:text-black  rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {blogPosts}
            </Link>
            <Link
              href='/events'
              className={`${
                pathname === '/events'
                  ? 'bg-[#ffe6bc] text-black'
                  : 'text-white'
              } xl:hover:bg-[#ffe6bc] xl:hover:text-black  rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {events}
            </Link>
            <Link
              href='/about-me'
              className={`${
                isAbout ? 'bg-[#ffe6bc] text-black' : 'text-white'
              } xl:hover:bg-[#ffe6bc] xl:hover:text-black  rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {about}
            </Link>
            <button
              className={`${
                isServicesRoute ? 'bg-[#ffe6bc] text-black' : 'text-white'
              }  xl:hover:bg-[#ffe6bc] xl:hover:text-black  rounded-md px-3 py-2 uppercase text-left`}
              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
            >
              {services}
            </button>
            {isServicesExpanded && (
              <div className='space-y-1 pl-4 flex flex-col justify-start items-start'>
                <Link
                  href='/services'
                  className={`${
                    isServicesIndex ? 'text-[#ffe6bc]' : 'text-white'
                  }  xl:hover:bg-[#ffe6bc] xl:hover:text-black   px-3 py-2  border-b-[1px] border-[#ffffff5d]`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {allServices}
                </Link>
                <Link
                  href='/services/coaching'
                  className={`${
                    isCoaching ? 'text-[#d2ab74]' : 'text-white'
                  }  xl:hover:bg-[#ffe6bc] xl:hover:text-black px-3 py-2  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {NLPCoaching}
                </Link>
                <Link
                  href='/services/mediation'
                  className={`${
                    isMediation ? 'text-[#ffe6bc]' : 'text-white'
                  }  xl:hover:bg-[#ffe6bc] xl:hover:text-black  px-3 py-2 `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {mediation}
                </Link>
                <Link
                  href='/services/workshop'
                  className={`${
                    isWorkshop ? 'text-[#ffe6bc]' : 'text-white'
                  }  xl:hover:bg-[#ffe6bc] xl:hover:text-black  px-3 py-2 `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {workshop}
                </Link>
              </div>
            )}
            <Link
              href='/contact'
              className={`${
                isContact ? 'bg-[#ffe6bc] text-black' : 'text-white'
              } xl:hover:bg-[#ffe6bc] xl:hover:text-black  rounded-md px-3 py-2`}
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
