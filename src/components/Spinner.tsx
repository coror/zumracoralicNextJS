'use client';
import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color='#df650e'
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};

export default Spinner;
