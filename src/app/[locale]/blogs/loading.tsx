import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className='bg-white relative pb-10'>
      <Skeleton className='w-full h-96 md:h-[27rem] 3xl:h-[50rem] rounded-none' />
      <Skeleton className='m-8 mx-auto h-12 md:h-20 w-32 md:w-48' />
      <div className='space-y-7 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-2 xl:gap-16 px-6 xl:grid-cols-3 xl:w-[80rem] mx-auto mt-16'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='xl:max-w-[35rem] rounded overflow-hidden shadow-lg'>
            <Skeleton className='w-full h-64 md:h-64 rounded-none' />
            <div className='p-4 space-y-3'>
              <Skeleton className='h-7 md:h-8 w-3/4' />
              <Skeleton className='h-4 w-1/3' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-10 w-32 mt-4' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
