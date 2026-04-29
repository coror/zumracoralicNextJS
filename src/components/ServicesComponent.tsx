import React from 'react';
import { Link } from '@/navigation';
import { Service } from '@/types/service';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '@/datalayer/contentful/richTextUtils';

export default function ServicesComponent({
  initialServices,
  locale,
  readMore,
}: {
  initialServices: Service[];
  locale: string;
  readMore: string;
  price: string;
}) {
  const options = getRichTextOptions();

  return (
    <div className='flex flex-col  lg:flex-wrap items-start justify-center mt-10'>
      {initialServices.map((service) => (
        <div
          key={service.id}
          className='border border-neutral-200 flex flex-col lg:flex-row items-center text-center mt-5 mx-2 lg:text-left px-3 py-8 lg:px-5 min-h-64 space-y-5 lg:space-y-0 lg:space-x-20 transition-transform duration-500 ease-out lg:hover:scale-[1.02] lg:hover:border-[#222428]'
        >
          <div>
            <div className=' text-xl md:text-2xl font-bold lg:min-w-[16rem] text-center'>
              {service.headline}
            </div>
            <div className='text-center mt-5 italic md:text-lg border-b-2 border-[#df650e] max-w-40 mx-auto'>
              {service.type}
            </div>
          </div>

          <div className=' md:text-lg'>
            {documentToReactComponents(service.description, options)}
          </div>

          <div className='my-10'>
            <Link
              href={{
                pathname: '/services/workshop/[slug]',
                params: { slug: service.slug },
              }}
            >
              <button className='btn-ghost'>{readMore}</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
