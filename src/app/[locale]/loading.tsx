import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className='flex-1 flex items-center justify-center py-32'>
      <Spinner />
    </div>
  );
}
