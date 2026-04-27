import Image from 'next/image';
import { IoIosCalendar } from 'react-icons/io';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '../datalayer/contentful/richTextUtils';
import { useState } from 'react';
import { parse } from 'date-fns';
import { bs as bsLocale, sl as slLocale } from 'date-fns/locale';
import { BlogPost } from '@/types/blogPost';
import JsonLd from './JsonLd';

function toIsoDate(dateStr: string, locale: string): string | undefined {
  try {
    const parsed = parse(dateStr, 'd. MMMM yyyy', new Date(), {
      locale: locale === 'bs' ? bsLocale : slLocale,
    });
    if (isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString().split('T')[0];
  } catch {
    return undefined;
  }
}

const BlogPostDetails = ({
  blogPost,
  locale,
  blogs,
  home,
}: {
  blogPost: BlogPost;
  locale: string;
  blogs: string;
  home: string;
}) => {
  const [selectedImage, setSelectedImage] = useState<
    BlogPost['cloudinaryImage'][0] | null
  >(null);

  const options = getRichTextOptions();

  const handleImageClick = (image: BlogPost['cloudinaryImage'][0]) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const datePublished = toIsoDate(blogPost.datePosted, locale);
  const blogUrl = `https://www.zumracoralic.com/${locale}/blog/${blogPost.slug}`;

  return (
    <div className='relative'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blogPost.seoTitle,
          image: blogPost.featuredImage.url,
          ...(datePublished ? { datePublished } : {}),
          author: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
          publisher: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': blogUrl,
          },
          url: blogUrl,
        }}
      />
      <div className='relative w-full h-96 md:h-[27rem] 3xl:h-[50rem] flex items-center justify-center'>
        <Image
          src={blogPost.featuredImage.url}
          alt={blogPost.featuredImage.alt}
          width={0}
          height={0}
          sizes='100vw'
          className='absolute inset-0 w-full h-full object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60'></div>
        <div className='relative text-center p-4 mt-24 md:mt-60'>
          <h1 className='text-3xl md:text-5xl text-white mb-4'>
            {blogPost.seoTitle}
          </h1>
          <div className='text-sm lg:text-xl text-[#dddddd] mb-12'>
            <IoIosCalendar className='inline' />
            {' '}{blogPost.datePosted}
          </div>
        </div>
      </div>

      <nav className='my-4' aria-label='Breadcrumb'>
        <ol
          role='list'
          className='flex items-center px-6 justify-center text-xs md:text-base'
        >
          <li>
            <Link
              href='/'
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
            >
              {home}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li>
            <Link
              href={`/${locale}/blogs`}
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
            >
              {blogs}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li className='text-gray-600 text-center mx-1 line-clamp-1'>
            {blogPost.seoTitle}
          </li>
        </ol>
      </nav>

      <div className='prose leading-8 my-20 mx-5 lg:min-w-[60rem] lg:mx-auto'>
        {documentToReactComponents(blogPost.content, options)}
      </div>

      {blogPost.cloudinaryImage.length > 0 && (
        <div className='gallery-container '>
          <div className='gallery-grid'>
            {blogPost.cloudinaryImage.map((image, index) => (
              <div
                key={index}
                className='gallery-item group'
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.secure_url}
                  alt={image.alt || ''}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='gallery-image transition ease-in-out group-hover:brightness-75'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className='lightbox' onClick={handleClose}>
          <div
            className='lightbox-content'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.secure_url}
              alt={selectedImage.alt || ''}
              width={selectedImage.width}
              height={selectedImage.height}
              className='lightbox-image'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostDetails;
