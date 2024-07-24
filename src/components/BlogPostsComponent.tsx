// BlogPostsComponent.js
'use client';
import { fetchBlogPosts } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';

export default function BlogPostsComponent({ readMore }) {
  const [blogs, setBlogs] = useState([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await fetchBlogPosts(locale);

        const sortedBlogs = fetchedBlogs.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <div className='bg-whitepy-10 py-20 md:py-36 relative'>
      <div className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center '>
        Blog
      </div>
      {blogs.length > 0 ? (
        <div className='grid grid-cols-1 gap-2 xl:gap-16 px-6 xl:grid-cols-3 lg:w-[80rem] lg:mx-auto'>
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={index === 0 ? 'lg:col-span-2' : 'lg:col-span-1'}
            >
              <BlogPostCard
                blogPost={blog}
                readMore={readMore}
                isFeatured={index === 0} // Pass a prop to indicate the featured post
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
