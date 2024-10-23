// Placeholder.js
const Placeholder = ({ width, height }: { width: number; height: number }) => (
  <div
    style={{ width: `${width}px`, height: `${height}px` }}
    className='bg-gray-200 animate-pulse'
  />
);

export default Placeholder;
