import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className='relative min-h-screen'>
      <Skeleton className='w-full h-96 md:h-[27rem] 3xl:h-[50rem] rounded-none' />
      <div className='flex items-center justify-center mt-4 space-x-4'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-32' />
      </div>
      <div className='prose leading-8 my-20 mx-5 lg:min-w-[60rem] lg:mx-auto space-y-4'>
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-11/12' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-10/12' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-9/12' />
      </div>
    </div>
  );
}
