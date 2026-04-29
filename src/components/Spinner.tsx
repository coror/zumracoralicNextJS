const Spinner = () => {
  return (
    <div
      role='status'
      aria-label='Loading'
      className='inline-block w-12 h-12 rounded-full border-[3px] border-[#222428]/10 border-t-[#df650e] animate-spin'
    >
      <span className='sr-only'>Loading…</span>
    </div>
  );
};

export default Spinner;
