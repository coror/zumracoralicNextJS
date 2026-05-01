'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '../datalayer/contentful/richTextUtils';
import { useState } from 'react';
import { parse } from 'date-fns';
import { bs as bsLocale, sl as slLocale } from 'date-fns/locale';
import { BlogPost } from '@/types/blogPost';
import JsonLd from './JsonLd';
import MeshGradient from './MeshGradient';

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
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

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

      {/* Magazine-cover hero — title overlaid on image, like the blog listing slides */}
      <header className='relative w-full h-[28rem] md:h-[36rem] lg:h-[44rem] 3xl:h-[56rem] overflow-hidden'>
        <Image
          src={blogPost.featuredImage.url}
          alt={blogPost.featuredImage.alt}
          width={0}
          height={0}
          sizes='100vw'
          className='absolute inset-0 w-full h-full object-cover hero-ken-burns'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428]/40 via-[#222428]/30 to-[#222428]/85' />
        <div className='relative z-10 h-full flex items-end'>
          <div className='w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-24'>
            <div className='max-w-3xl mx-auto text-center text-white animate-fade-up animate-duration-700 animate-delay-[400ms]'>
              <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#FFE6BC] mb-5'>
                {blogPost.datePosted}
              </p>
              <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.15]'>
                {blogPost.seoTitle}
              </h1>
              <span
                aria-hidden='true'
                className='block w-12 h-px bg-[#df650e] mx-auto mt-8'
              />
            </div>
          </div>
        </div>
      </header>

      {/* Refined breadcrumb */}
      <nav aria-label='Breadcrumb' className='py-10 md:py-12'>
        <ol
          role='list'
          className='flex items-center justify-center flex-wrap gap-3 px-6 text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#222428]/55'
        >
          <li>
            <Link
              href='/'
              className='hover:text-[#df650e] transition-colors'
            >
              {home}
            </Link>
          </li>
          <li aria-hidden='true'>—</li>
          <li>
            <Link
              href='/blogs'
              className='hover:text-[#df650e] transition-colors'
            >
              {blogs}
            </Link>
          </li>
          <li aria-hidden='true'>—</li>
          <li className='text-[#df650e] line-clamp-1'>
            {blogPost.seoTitle}
          </li>
        </ol>
      </nav>

      {/* Rich-text body */}
      <article className='max-w-3xl xl:max-w-4xl mx-auto px-6 lg:px-12 prose prose-lg lg:prose-xl prose-headings:font-normal prose-headings:tracking-tight prose-p:text-[#222428]/80 prose-p:leading-relaxed prose-strong:text-[#222428] prose-a:text-[#df650e] prose-a:no-underline hover:prose-a:underline'>
        {documentToReactComponents(blogPost.content, options)}
      </article>

      {/* Gallery */}
      {blogPost.cloudinaryImage.length > 0 && (
        <section className='mt-20 md:mt-32 px-6 lg:px-12'>
          <div className='max-w-7xl mx-auto'>
            <div className='gallery-container'>
              <div className='gallery-grid'>
                {blogPost.cloudinaryImage.map((image, index) => (
                  <button
                    key={index}
                    type='button'
                    className='gallery-item group rounded-2xl overflow-hidden shadow-[0_15px_30px_-15px_rgba(34,36,40,0.18)] hover:shadow-[0_25px_50px_-15px_rgba(223,101,14,0.28)] transition-shadow duration-500'
                    onClick={() => handleImageClick(image)}
                    aria-label='Open image'
                  >
                    <Image
                      src={image.secure_url}
                      alt={image.alt || ''}
                      width={0}
                      height={0}
                      sizes='(max-width: 768px) 100vw, 33vw'
                      className='gallery-image transition-all duration-500 ease-out group-hover:brightness-90 group-hover:scale-105'
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
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
