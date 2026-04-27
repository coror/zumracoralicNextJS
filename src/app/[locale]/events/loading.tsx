import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className='bg-white relative pb-10 pt-36 px-6'>
      <Skeleton className='m-8 mx-auto h-12 md:h-20 w-48 md:w-72' />
      <div className='flex flex-col space-y-10 max-w-[1800px] mx-auto mt-16'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='flex flex-col md:flex-row w-full overflow-hidden shadow-lg border-[1px] bg-white'
          >
            <div className='relative md:w-1/3 h-64 md:h-96 p-6'>
              <Skeleton className='w-full h-full' />
            </div>
            <div className='p-4 flex flex-col space-y-6 md:w-2/3'>
              <Skeleton className='h-8 md:h-10 w-3/4' />
              <Skeleton className='h-4 w-1/4' />
              <Skeleton className='h-4 w-full' />
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
