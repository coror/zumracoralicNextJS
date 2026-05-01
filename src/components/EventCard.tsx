import Image from 'next/image';
import { Link } from '@/navigation';
import { truncateText } from '@/datalayer/contentful/utils';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Event } from '@/types/event';

function EventCard({
  event,
  readMore,
  reverse = false,
}: {
  event: Event;
  readMore: string;
  reverse?: boolean;
}) {
  const truncatedContent = truncateText(
    documentToHtmlString(event.content),
    220,
  );

  // Parse "d. MMMM yyyy" → day + first 3 letters of month uppercased
  const parts = event.datum
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean);
  const day = parts[0] ?? '';
  const month = (parts[1] ?? '').split(' ')[0];
  const monthShort = month.slice(0, 3).toUpperCase();

  const eventsLink = {
    pathname: '/events/[slug]' as const,
    params: { slug: event.slug },
  };

  return (
    <Link
      href={eventsLink}
      className='group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center'
    >
      {/* Image with overlaid date chip */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ${
          reverse ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <Image
          src={event.featuredImage.url}
          alt={event.seoTitle}
          fill
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
        />
        {day && monthShort && (
          <div className='absolute top-4 left-4 md:top-6 md:left-6 flex flex-col items-center justify-center w-16 h-20 md:w-20 md:h-24 bg-[#FFE6BC] rounded-2xl shadow-[0_10px_25px_-8px_rgba(34,36,40,0.4)]'>
            <span className='text-2xl md:text-3xl leading-none text-[#df650e]'>
              {day}
            </span>
            <span className='block w-6 h-px bg-[#df650e]/40 my-1' />
            <span className='text-[10px] md:text-xs tracking-[0.18em] text-[#222428]/75'>
              {monthShort}
            </span>
          </div>
        )}
      </div>

      {/* Editorial text column */}
      <div className={reverse ? 'md:order-1' : 'md:order-2'}>
        <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-4'>
          {event.datum}
        </p>
        <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.15] mb-6 text-[#222428] transition-colors group-hover:text-[#df650e]'>
          {event.headline}
        </h2>
        <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/65 line-clamp-4 mb-8'>
          {truncatedContent}
        </p>
        <span className='inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-[#222428] group-hover:text-[#df650e] transition-colors'>
          {readMore}
          <span
            aria-hidden='true'
            className='inline-block transition-transform duration-300 group-hover:translate-x-1'
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default EventCard;
