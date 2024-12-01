'use client';
import { fetchServices } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Spinner from './Spinner';
import { Service } from '@/types/service';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '@/datalyer/contentful/richTextUtils';

export default function ServicesComponent({
  readMore,
  price,
}: {
  readMore: string;
  price: string;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const options = getRichTextOptions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedServices = await fetchServices(locale);
        setServices(fetchedServices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <div className='flex flex-col  lg:flex-wrap items-start justify-center mt-10'>
      {loading && (
        <div className='mx-auto'>
          <Spinner loading={loading} />
        </div>
      )}
      {services.map((service) => (
        <div
          key={service.id}
          className='border-2 border-[#FFE6BC] flex flex-col lg:flex-row items-center text-center  mt-5 mx-2 lg:text-left px-3 py-8 lg:px-5 min-h-64 space-y-5 lg:space-y-0 lg:space-x-20 transition-transform  duration-500 ease-in-out lg:hover:scale-105 lg:hover:bg-white lg:hover:shadow-2xl'
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

          {/* <div className=' md:text-lg text-center'>
            <strong>{price}:</strong> {service.price} €
          </div> */}

          <div className='my-10'>
            <Link href={`/${locale}/services/workshop/${service.slug}`}>
              <button className='bg-[#FFE6BC] px-6 py-3 md:px-7 md:py-3 text-sm md:text-xl   transition duration-500 ease-out hover:ease-in hover:bg-[#b7915bad]'>
                {readMore}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
