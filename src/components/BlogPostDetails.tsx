import Image from 'next/image';
import { IoIosCalendar } from 'react-icons/io';

const BlogPostDetails = ({ blogPost }) => {
  return (
    <div className='relative'>
      <div className='relative w-full h-96 lg:h-[36rem] 3xl:h-[60rem] flex items-center justify-center' >
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
          <h1 className='text-3xl md:text-5xl  text-white mb-4'>
            {blogPost.seoTitle}
          </h1>
          <div className='text-sm lg:text-xl text-[#dddddd] mb-12'>
            <IoIosCalendar className='inline' />
            {blogPost.datePosted}
          </div>
        </div>
      </div>

      <div className='prose leading-8 my-20 mx-5 lg:min-w-[60rem] lg:mx-auto'>
        <div
          dangerouslySetInnerHTML={{
            __html: blogPost.content,
          }}
        />
      </div>
      
    </div>
  );
};

export default BlogPostDetails;
