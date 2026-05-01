import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className='flex-1 flex flex-col' aria-label='Loading'>
      {/* Hero block — matches Header's tall section */}
      <div className='relative w-full h-[36rem] md:h-[44rem] xl:min-h-screen overflow-hidden bg-[#222428]/10'>
        <Skeleton className='absolute inset-0 rounded-none' />
        <div className='relative z-10 h-full flex items-center'>
          <div className='w-full max-w-7xl mx-auto px-6 lg:px-12'>
            <div className='max-w-2xl space-y-6'>
              <Skeleton className='h-10 md:h-16 w-3/4' />
              <Skeleton className='h-10 md:h-16 w-1/2' />
              <Skeleton className='h-4 w-full max-w-md mt-8' />
              <Skeleton className='h-4 w-5/6 max-w-md' />
              <Skeleton className='h-12 w-40 mt-8 rounded-xl' />
            </div>
          </div>
        </div>
      </div>

      {/* AboutMe block — text + photo split */}
      <section className='py-16 md:py-24'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row gap-10 md:gap-16'>
          <div className='flex-1 space-y-5'>
            <Skeleton className='h-8 md:h-12 w-1/3 mb-8' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-4/6' />
            <Skeleton className='h-4 w-3/4' />
          </div>
          <Skeleton className='w-[18rem] md:w-[22rem] aspect-[3/4] mx-auto md:mx-0 rounded-2xl shrink-0' />
        </div>
      </section>

      {/* Quote block */}
      <div className='w-full h-96 md:h-[36rem] flex items-center justify-center bg-[#222428]/5'>
        <div className='w-full max-w-3xl px-6 space-y-4'>
          <Skeleton className='h-8 md:h-12 w-full bg-gray-300' />
          <Skeleton className='h-8 md:h-12 w-5/6 mx-auto bg-gray-300' />
        </div>
      </div>
    </div>
  );
}
