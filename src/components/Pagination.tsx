'use client';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

function getPages(count: number, page: number): (number | 'ellipsis')[] {
  if (count <= 7) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  if (page > 3) pages.push('ellipsis');
  for (let i = Math.max(2, page - 1); i <= Math.min(count - 1, page + 1); i++) {
    pages.push(i);
  }
  if (page < count - 2) pages.push('ellipsis');
  pages.push(count);
  return pages;
}

export default function Pagination({ count, page, onChange }: PaginationProps) {
  if (count <= 1) return null;

  const pages = getPages(count, page);
  const itemBase =
    'flex items-center justify-center min-w-[2rem] h-8 px-2 rounded text-sm border border-gray-300 transition-colors';
  const itemIdle = 'bg-white hover:bg-[#FFE6BC]';
  const itemActive = 'bg-[#FFE6BC] border-[#df650e] font-semibold';
  const itemDisabled = 'opacity-40 cursor-not-allowed';

  return (
    <nav aria-label='Pagination'>
      <ul className='flex items-center gap-1'>
        <li>
          <button
            type='button'
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
            aria-label='Previous page'
            className={`${itemBase} ${page === 1 ? itemDisabled : itemIdle}`}
          >
            &lsaquo;
          </button>
        </li>
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <li key={`e-${i}`} aria-hidden='true'>
              <span className='flex items-center justify-center min-w-[2rem] h-8 text-sm text-gray-500'>
                …
              </span>
            </li>
          ) : (
            <li key={p}>
              <button
                type='button'
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                className={`${itemBase} ${p === page ? itemActive : itemIdle}`}
              >
                {p}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type='button'
            disabled={page === count}
            onClick={() => onChange(page + 1)}
            aria-label='Next page'
            className={`${itemBase} ${
              page === count ? itemDisabled : itemIdle
            }`}
          >
            &rsaquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
