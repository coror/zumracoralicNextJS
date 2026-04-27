import Image from 'next/image';
import { Link } from '@/navigation';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';

interface NavEntry {
  slug: string;
  seoTitle: string;
  featuredImage: { url: string; alt: string };
}

type SlugPathname = '/blogs/[slug]' | '/events/[slug]';

interface EntryNavProps {
  entries: NavEntry[];
  currentSlug: string;
  pathname: SlugPathname;
  previousLabel: string;
  nextLabel: string;
}

export default function EntryNav({
  entries,
  currentSlug,
  pathname,
  previousLabel,
  nextLabel,
}: EntryNavProps) {
  if (entries.length < 2) return null;

  const currentIndex = entries.findIndex((e) => e.slug === currentSlug);
  if (currentIndex === -1) return null;

  const previousIndex =
    currentIndex === 0 ? entries.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === entries.length - 1 ? 0 : currentIndex + 1;
  const previousEntry = entries[previousIndex];
  const nextEntry = entries[nextIndex];

  return (
    <div className='mx-4 lg:w-[60rem]  lg:mx-auto my-20 lg:mt-44 flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-16 lg:space-y-0'>
      {previousEntry && previousEntry.slug !== currentSlug && (
        <Link href={{ pathname, params: { slug: previousEntry.slug } }}>
          <div className='flex flex-row  justify-center w-full h-auto group'>
            <div className='w-28 h-28  min-w-32 min-h-32 transition ease-in-out group-hover:brightness-75'>
              <Image
                src={previousEntry.featuredImage.url}
                alt={previousEntry.featuredImage.alt}
                width={0}
                height={0}
                sizes='100vw'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='ml-6'>
              <span className='uppercase font-bold tracking-widest text-[#aaaaaa] block'>
                {previousLabel}
              </span>
              <div className='font-bold text-lg  lg:max-w-64 '>
                <HiArrowLongLeft className='inline mr-1' />
                {previousEntry.seoTitle}
              </div>
            </div>
          </div>
        </Link>
      )}
      {nextEntry && nextEntry.slug !== currentSlug && (
        <Link href={{ pathname, params: { slug: nextEntry.slug } }}>
          <div className='flex flex-row-reverse  justify-center text-right group'>
            <div className='w-28 h-28  min-w-32 min-h-32 transition ease-in-out group-hover:brightness-75'>
              <Image
                src={nextEntry.featuredImage.url}
                alt={nextEntry.featuredImage.alt}
                width={0}
                height={0}
                sizes='100vw'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='mr-6 text-right'>
              <span className='uppercase font-bold tracking-widest text-[#aaaaaa] block'>
                {nextLabel}
              </span>
              <div className='font-bold text-lg  lg:max-w-64 text-right'>
                {nextEntry.seoTitle}
                <HiArrowLongRight className='inline ml-1' />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
