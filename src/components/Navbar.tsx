'use client';
import { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/navigation';
import LocalSwitcher from './local-switcher';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

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

  // Navbar overlays a dark hero on home/blogs — render in light text mode there.
  const onDarkHero = isHome || isBlogs;

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

  const desktopLinkClass = (active: boolean) =>
    `link-hover relative flex items-center justify-center h-full px-2 w-24 2xl:w-28 4xl:w-36 text-xs xl:text-sm 2xl:text-base 4xl:text-lg tracking-widest transition-colors${
      active ? ' active' : ''
    }`;

  return (
    <nav
      className={`${
        isMobileMenuOpen
          ? 'bg-[#fdf6e8] fixed text-[#222428] border-[#222428]/10'
          : `bg-transparent absolute ${
              onDarkHero
                ? 'text-white border-white/15'
                : 'text-[#222428] border-[#222428]/10'
            }`
      } border-b z-50 w-full h-16 lg:h-20 4xl:h-32`}
    >
      <div className='mx-auto max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1700px] 4xl:max-w-[2000px] px-4 lg:px-4 xl:px-6 4xl:px-16 h-full'>
        <div className='relative flex h-full items-center justify-between'>
          <div className='flex flex-1 items-center justify-between h-full'>
            <div className='flex items-center space-x-3 md:space-x-4 lg:space-x-6 4xl:space-x-12 h-full'>
              <button
                type='button'
                id='mobile-dropdown-button'
                className='xl:hidden group inline-flex items-center justify-center p-2.5 -ml-2.5 focus:outline-none'
                aria-controls='mobile-menu'
                aria-expanded={isMobileMenuOpen}
                aria-label='Toggle menu'
                ref={buttonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span
                  className='relative block h-4 w-7'
                  aria-hidden='true'
                >
                  <span
                    className={`absolute inset-x-0 h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)] ${
                      isMobileMenuOpen ? 'top-1/2 rotate-45' : 'top-1'
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)] ${
                      isMobileMenuOpen ? 'top-1/2 -rotate-45' : 'top-3'
                    }`}
                  />
                </span>
              </button>
              <Link
                className='flex flex-shrink-0 items-center font-bold'
                href='/'
              >
                <span className='text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-5xl whitespace-nowrap'>
                  ZUMRA ĆORALIĆ
                </span>
              </Link>
              <div className='hidden md:flex items-center space-x-2 lg:space-x-3 4xl:space-x-5'>
                <a
                  href='https://www.facebook.com/ustvari.svojo.pot'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Facebook'
                  className='inline-flex items-center justify-center px-1.5 lg:px-2 4xl:px-4 py-1.5 4xl:py-2 hover:opacity-100 transition-opacity'
                >
                  <FaFacebookF className='text-sm 2xl:text-base 3xl:text-lg 4xl:text-2xl' />
                </a>
                <a
                  href='https://www.instagram.com/kjer_je_volja_je_tudi_pot/'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Instagram'
                  className='inline-flex items-center justify-center px-1.5 lg:px-2 4xl:px-4 py-1.5 4xl:py-2 hover:opacity-100 transition-opacity'
                >
                  <FaInstagram className='text-sm 2xl:text-base 3xl:text-lg 4xl:text-2xl' />
                </a>
              </div>
            </div>

            <div className='hidden xl:block h-full uppercase 4xl:pl-12'>
              <div className='flex h-full items-stretch'>
                <Link href='/' className={desktopLinkClass(isHome)}>
                  {home}
                </Link>
                <Link
                  href='/blogs'
                  className={desktopLinkClass(pathname === '/blogs')}
                >
                  {blogPosts}
                </Link>
                <Link
                  href='/events'
                  className={desktopLinkClass(pathname === '/events')}
                >
                  {events}
                </Link>
                <Link href='/about-me' className={desktopLinkClass(isAbout)}>
                  {about}
                </Link>

                <div className='relative group h-full flex items-stretch'>
                  <Link
                    href='/services'
                    className={desktopLinkClass(isServicesRoute)}
                  >
                    {services}
                  </Link>
                  <div
                    className='absolute left-0 top-full w-56 bg-white shadow-xl text-[#222428] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out border border-[#222428]/10'
                  >
                    <Link
                      href='/services'
                      className={`block px-5 py-4 text-xs tracking-widest border-b border-[#222428]/10 transition-colors hover:text-[#df650e] ${
                        isServicesIndex ? 'text-[#df650e]' : ''
                      }`}
                    >
                      {allServices}
                    </Link>
                    <Link
                      href='/services/coaching'
                      className={`block px-5 py-4 text-xs tracking-widest border-b border-[#222428]/10 transition-colors hover:text-[#df650e] ${
                        isCoaching ? 'text-[#df650e]' : ''
                      }`}
                    >
                      {NLPCoaching}
                    </Link>
                    <Link
                      href='/services/mediation'
                      className={`block px-5 py-4 text-xs tracking-widest border-b border-[#222428]/10 transition-colors hover:text-[#df650e] ${
                        isMediation ? 'text-[#df650e]' : ''
                      }`}
                    >
                      {mediation}
                    </Link>
                    <Link
                      href='/services/workshop'
                      className={`block px-5 py-4 text-xs tracking-widest transition-colors hover:text-[#df650e] ${
                        isWorkshop ? 'text-[#df650e]' : ''
                      }`}
                    >
                      {workshop}
                    </Link>
                  </div>
                </div>

                <Link href='/contact' className={desktopLinkClass(isContact)}>
                  {contact}
                </Link>
              </div>
            </div>
            <div className='z-20'>
              <LocalSwitcher />
            </div>
          </div>
        </div>
      </div>

      <div
        id='mobile-menu'
        ref={mobileMenuRef}
        aria-hidden={!isMobileMenuOpen}
        style={{
          background:
            'linear-gradient(to bottom, #fdf6e8 0%, #f5cf95 55%, #f4a35c 100%)',
        }}
        className={`fixed inset-x-0 top-16 lg:top-20 bottom-0 transition-opacity duration-500 ease-out z-10 xl:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex h-full flex-col justify-between px-8 pt-6 pb-8 md:pt-12 md:pb-10 overflow-y-auto'>
          <nav className='flex flex-col'>
            <MobileLink
              index={0}
              href='/'
              active={isHome}
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {home}
            </MobileLink>
            <MobileLink
              index={1}
              href='/blogs'
              active={isBlogs}
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {blogPosts}
            </MobileLink>
            <MobileLink
              index={2}
              href='/events'
              active={isEvents}
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {events}
            </MobileLink>
            <MobileLink
              index={3}
              href='/about-me'
              active={isAbout}
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {about}
            </MobileLink>
            <button
              className={`block py-2.5 text-2xl md:text-4xl tracking-tight text-left transition-all duration-500 ease-out flex items-baseline gap-3 ${
                isServicesRoute ? 'text-[#df650e]' : 'text-[#222428]'
              } ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${4 * 60 + 150}ms` }}
              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
            >
              {services}
              <span
                className='text-base inline-block transition-transform duration-300'
                style={{
                  transform: isServicesExpanded
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                }}
              >
                ↓
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isServicesExpanded
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className='overflow-hidden'>
                <div className='flex flex-col pl-6 pt-1 pb-2'>
                  <MobileSubLink
                    href='/services'
                    active={isServicesIndex}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {allServices}
                  </MobileSubLink>
                  <MobileSubLink
                    href='/services/coaching'
                    active={isCoaching}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {NLPCoaching}
                  </MobileSubLink>
                  <MobileSubLink
                    href='/services/mediation'
                    active={isMediation}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {mediation}
                  </MobileSubLink>
                  <MobileSubLink
                    href='/services/workshop'
                    active={isWorkshop}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {workshop}
                  </MobileSubLink>
                </div>
              </div>
            </div>
            <MobileLink
              index={5}
              href='/contact'
              active={isContact}
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {contact}
            </MobileLink>
          </nav>

          <div
            className={`flex flex-col items-center gap-3 md:gap-5 pt-4 md:pt-6 transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '550ms' }}
          >
            <Image
              src='https://res.cloudinary.com/dbssbnuph/image/upload/v1721558472/zumracoralic/mama-logo-4_smdzke.png'
              alt=''
              aria-hidden='true'
              width={160}
              height={160}
              className='w-24 h-24 md:w-32 md:h-32 mb-1 md:mb-2 opacity-95'
            />
            <a
              href='mailto:ustvari.svojo.pot@gmail.com'
              className='text-sm tracking-wide italic text-[#222428]/70 hover:text-[#df650e] transition-colors'
            >
              ustvari.svojo.pot@gmail.com
            </a>
            <div className='flex items-center gap-5 text-[#222428]/70'>
              <a
                href='https://www.facebook.com/ustvari.svojo.pot'
                target='_blank'
                rel='noreferrer'
                aria-label='Facebook'
                className='hover:text-[#df650e] transition-colors'
              >
                <FaFacebookF className='text-base' />
              </a>
              <a
                href='https://www.instagram.com/kjer_je_volja_je_tudi_pot/'
                target='_blank'
                rel='noreferrer'
                aria-label='Instagram'
                className='hover:text-[#df650e] transition-colors'
              >
                <FaInstagram className='text-base' />
              </a>
              <a
                href='https://si.linkedin.com/in/zumra-%C4%87orali%C4%87-bb084497'
                target='_blank'
                rel='noreferrer'
                aria-label='LinkedIn'
                className='hover:text-[#df650e] transition-colors'
              >
                <FaLinkedin className='text-base' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

function MobileLink({
  index,
  href,
  active,
  isOpen,
  onClick,
  children,
}: {
  index: number;
  href: '/' | '/blogs' | '/events' | '/about-me' | '/contact';
  active: boolean;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2.5 text-2xl md:text-4xl tracking-tight transition-all duration-500 ease-out ${
        active ? 'text-[#df650e]' : 'text-[#222428]'
      } ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 60 + 150}ms` }}
    >
      {children}
    </Link>
  );
}

function MobileSubLink({
  href,
  active,
  onClick,
  children,
}: {
  href:
    | '/services'
    | '/services/coaching'
    | '/services/mediation'
    | '/services/workshop';
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`py-2 text-lg italic tracking-tight transition-colors ${
        active
          ? 'text-[#df650e]'
          : 'text-[#222428]/75 hover:text-[#df650e]'
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;
