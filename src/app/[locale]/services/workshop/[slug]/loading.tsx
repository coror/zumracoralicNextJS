import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className='relative pt-32 pb-10'>
      <Skeleton className='w-full md:h-[27rem] 3xl:h-[50rem] h-64 rounded-none' />
      <div className='flex items-center justify-center mt-4 space-x-4'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-40' />
      </div>
      <div className='relative p-4 mx-5 lg:max-w-[60rem] lg:mx-auto flex flex-col items-center mt-10 space-y-6'>
        <Skeleton className='h-10 md:h-14 w-3/4' />
        <Skeleton className='h-5 w-1/4' />
        <div className='w-full space-y-4 mt-10'>
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-10/12' />
          <Skeleton className='h-5 w-full' />
        </div>
        <Skeleton className='h-12 w-40 mt-10' />
      </div>
    </div>
  );
}
