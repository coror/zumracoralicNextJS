'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LocalSwitcher from './local-switcher';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';

const Navbar = ({ home }: { home: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const locale = useLocale();

  const t = useTranslations('Navigation');

  const homePageLink = `/${locale}`;
  const blogPostsLink = `/${locale}/blog`;
  const eventsLink1 = `/${locale}/dogodki`;
  const eventsLink2 = `/${locale}/dogadaji`;
  const aboutMeLink = `/${locale}/o-meni`;
  const servicesLink1 = `/${locale}/storitve`;
  const servicesLink2 = `/${locale}/usluge`;
  const contactLink = `/${locale}/kontakt`;

  const handleClickOutside = (event: MouseEvent) => {
    // Ensure clicks outside the menu close the menu
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
          ? 'text-white border-[#ffffff40] border-b-[1px] '
          : pathname.startsWith(servicesLink1) ||
            pathname.startsWith(servicesLink2)
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
                    pathname.startsWith(eventsLink1) ||
                    pathname.startsWith(eventsLink2) ||
                    pathname === aboutMeLink ||
                    pathname.startsWith(servicesLink1) ||
                    pathname.startsWith(servicesLink2) ||
                    pathname.startsWith(contactLink)
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
                      pathname.startsWith(eventsLink1) ||
                      pathname.startsWith(eventsLink2) ||
                      pathname === aboutMeLink ||
                      pathname.startsWith(servicesLink1) ||
                      pathname.startsWith(servicesLink2) ||
                      pathname.startsWith(contactLink)
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
                      pathname.startsWith(eventsLink1) ||
                      pathname.startsWith(eventsLink2) ||
                      pathname === aboutMeLink ||
                      pathname.startsWith(servicesLink1) ||
                      pathname.startsWith(servicesLink2) ||
                      pathname.startsWith(contactLink)
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
                  {t('blogPosts')}
                </Link>
                <Link
                  href={`/${locale}/events`}
                  className={`${
                    pathname === eventsLink1 || pathname === eventsLink2
                      ? 'bg-black text-white hover:text-white'
                      : 'bg-transparent'
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {t('events')}
                </Link>
                <Link
                  href={`${aboutMeLink}`}
                  className={`${
                    pathname === aboutMeLink
                      ? 'bg-black text-white hover:text-white'
                      : ''
                  } relative px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {t('about')}
                </Link>

                {/* Services */}
                <div className='relative group'>
                  <Link
                    href={`/${locale}/services`}
                    className={`${
                      pathname === servicesLink1 || pathname === servicesLink2
                        ? 'bg-black text-white active'
                        : ''
                    } relative px-3 w-28 flex items-center h-full justify-center link-hover`}
                  >
                    {t('services')}
                  </Link>
                  <div
                    className={`absolute left-0 top-full w-56 shadow-2xl text-black invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out ${
                      pathname === homePageLink ||
                      pathname.startsWith(blogPostsLink)
                        ? 'bg-black '
                        : 'bg-white '
                    }`}
                  >
                    <Link
                      href={`${servicesLink1}`}
                      className={`block px-4 py-4 hover:text-[#df650e]  border-b-[1px]  ${
                        pathname === servicesLink1 || pathname === servicesLink2
                          ? 'text-[#df650e]'
                          : 'text-black'
                      } ${
                        pathname === homePageLink ||
                        pathname.startsWith(blogPostsLink)
                          ? 'text-white border-[#ffffff80]'
                          : 'border-[#00000036]'
                      }`}
                    >
                      {t('allServices')}
                    </Link>
                    <Link
                      href={`${servicesLink1}/coaching`}
                      className={`block px-4 py-4 hover:text-[#df650e]  ${
                        pathname === servicesLink1 + '/coaching' ||
                        pathname === servicesLink2 + '/coaching'
                          ? 'text-[#df650e]'
                          : 'text-black'
                      } ${
                        pathname === homePageLink ||
                        pathname.startsWith(blogPostsLink)
                          ? 'text-white'
                          : ''
                      }`}
                    >
                      {t('NLPCoaching')}
                    </Link>
                    <Link
                      href={`/${locale}/services/mediation`}
                      className={`block px-4 py-4 hover:text-[#df650e]  ${
                        pathname === servicesLink1 + '/mediacija' ||
                        pathname === servicesLink2 + '/medijacija'
                          ? 'text-[#df650e]'
                          : 'text-black'
                      } ${
                        pathname === homePageLink ||
                        pathname.startsWith(blogPostsLink)
                          ? 'text-white'
                          : ''
                      }`}
                    >
                      {t('mediation')}
                    </Link>
                    <Link
                      href={`/${locale}/services/workshop`}
                      className={`block px-4 py-4 hover:text-[#df650e] ${
                        pathname === servicesLink1 + '/delavnice-predavanja' ||
                        pathname === servicesLink2 + '/radionice-predavanja'
                          ? 'text-[#df650e]'
                          : 'text-black'
                      } ${
                        pathname === homePageLink ||
                        pathname.startsWith(blogPostsLink)
                          ? 'text-white'
                          : ''
                      }`}
                    >
                      {t('workshop')}
                    </Link>
                  </div>
                </div>

                <Link
                  href={`/${locale}/contact`}
                  className={`${
                    pathname === `/${locale}/contact` ? 'bg-[#d2ab74]' : ''
                  } relative  px-3 w-28 flex items-center h-full justify-center link-hover`}
                >
                  {t('contact')}
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
              {t('home')}
            </Link>
            <Link
              href={blogPostsLink}
              className={`${
                pathname.startsWith(blogPostsLink) ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('blogPosts')}
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
              {t('events')}
            </Link>
            <Link
              href={`${aboutMeLink}`}
              className={`${
                pathname === aboutMeLink ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <button
              className={`${
                pathname.startsWith(servicesLink1) ||
                pathname.startsWith(servicesLink2)
                  ? 'bg-[#d2ab74]'
                  : ''
              } text-white lg:hover:bg-[#d2ab74] rounded-md px-3 py-2 uppercase text-left`}
              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
            >
              {t('services')}
            </button>
            {isServicesExpanded && (
              <div className='space-y-1 pl-4 flex flex-col justify-start items-start'>
                <Link
                  href={`${servicesLink1}`}
                  className={`${
                    pathname === servicesLink1 || pathname === servicesLink2
                      ? 'text-[#d2ab74]'
                      : 'text-white'
                  }  hover:bg-[#d2ab74]  px-3 py-2  border-b-[1px] border-[#ffffff5d]`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('allServices')}
                </Link>
                <Link
                  href={`${servicesLink1}/coaching`}
                  className={`${
                    pathname === servicesLink1 + '/coaching' ||
                    pathname === servicesLink2 + '/coaching'
                      ? 'text-[#d2ab74]'
                      : 'text-white'
                  }  hover:bg-[#d2ab74]  px-3 py-2  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('NLPCoaching')}
                </Link>
                <Link
                  href={`/${locale}/services/mediation`}
                  className={`${
                    pathname === servicesLink1 + '/mediacija' ||
                    pathname === servicesLink2 + '/medijacija'
                      ? 'text-[#d2ab74]'
                      : 'text-white'
                  }  hover:bg-[#d2ab74]  px-3 py-2 `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('mediation')}
                </Link>
                <Link
                  href={`/${locale}/services/workshop`}
                  className={`${
                    pathname === servicesLink1 + '/delavnice-predavanja' ||
                    pathname === servicesLink2 + '/radionice-predavanja'
                      ? 'text-[#d2ab74]'
                      : 'text-white'
                  }  hover:bg-[#d2ab74]  px-3 py-2 `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('workshop')}
                </Link>
              </div>
            )}
            <Link
              href={`/${locale}/contact`}
              className={`${
                pathname === `/${locale}/contact` ? 'bg-[#d2ab74]' : ''
              } text-white hover:bg-[#d2ab74] rounded-md px-3 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
