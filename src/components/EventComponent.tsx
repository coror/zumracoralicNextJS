import Link from 'next/link';
import EventDetails from './EventDetails';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import Image from 'next/image';
import { Event } from '@/types/event';
import { Locale, parse } from 'date-fns';
import { sl, bs } from 'date-fns/locale';

const EventPageComponent = ({
  initialEvent,
  initialEvents,
  locale,
  home,
  eventsTitle,
  previousPostText,
  nextPostText,
}: {
  initialEvent: Event;
  initialEvents: Event[];
  locale: string;
  home: string;
  eventsTitle: string;
  previousPostText: string;
  nextPostText: string;
}) => {
  const localeMap: { [key: string]: Locale } = { sl, bs };
  const currentLocale = localeMap[locale] || sl;

  const sortedEvents = [...initialEvents].sort(
    (a, b) =>
      parse(b.datum, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      }).getTime() -
      parse(a.datum, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      }).getTime(),
  );

  const event = initialEvent;
  const slug = event.slug;

  const currentIndex = sortedEvents.findIndex((post) => post.slug === slug);
  const previousIndex =
    currentIndex === 0 ? sortedEvents.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === sortedEvents.length - 1 ? 0 : currentIndex + 1;

  const previousPost = sortedEvents[previousIndex];
  const nextPost = sortedEvents[nextIndex];

  return (
    <div className='relative min-h-screen'>
      <div>
        <div>
          <EventDetails
            event={event}
            locale={locale}
            home={home}
            eventsTitle={eventsTitle}
          />
        </div>

        <div className='mx-4 lg:w-[60rem]  lg:mx-auto my-20 lg:mt-44 flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-16 lg:space-y-0'>
          {previousPost && previousPost.slug !== slug && (
            <Link href={`/${locale}/events/${previousPost.slug}`}>
              <div className='flex flex-row  justify-center w-full h-auto group'>
                <div className='w-28 h-28 min-w-32 min-h-32 transition ease-in-out group-hover:brightness-75'>
                  <Image
                    src={previousPost.featuredImage.url}
                    alt={previousPost.featuredImage.alt}
                    width={200}
                    height={200}
                    sizes='100vw'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div className='ml-6'>
                  <span className='uppercase font-bold tracking-widest text-[#aaaaaa] block'>
                    {previousPostText}
                  </span>
                  <div className='font-bold text-lg  lg:max-w-64 '>
                    <HiArrowLongLeft className='inline mr-1' />
                    {previousPost.seoTitle}
                  </div>
                </div>
              </div>
            </Link>
          )}
          {nextPost && nextPost.slug !== slug && (
            <Link href={`/${locale}/events/${nextPost.slug}`}>
              <div className='flex flex-row-reverse  justify-center text-right group'>
                <div className='w-28 h-28 min-w-32 min-h-32 transition ease-in-out group-hover:brightness-75'>
                  <Image
                    src={nextPost.featuredImage.url}
                    alt={nextPost.featuredImage.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-full object-cover rounded-full '
                  />
                </div>
                <div className='mr-6'>
                  <span className='uppercase font-bold tracking-widest text-[#aaaaaa] block'>
                    {nextPostText}
                  </span>
                  <div className='font-bold text-lg lg:max-w-64  '>
                    {nextPost.seoTitle}
                    <HiArrowLongRight className='inline ml-1' />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPageComponent;
