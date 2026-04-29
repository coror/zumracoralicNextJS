'use client';

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function LocalSwitcher() {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();

  const toggleLocale = () => {
    const newLocale = currentLocale === 'sl' ? 'bs' : 'sl';

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    startTransition(() => {
      router.replace(`/${newLocale}`);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      type='button'
      aria-label='Toggle language'
      className='inline-flex items-center gap-1.5 3xl:gap-2 4xl:gap-3 px-2.5 py-1.5 3xl:px-3.5 3xl:py-2 4xl:px-5 4xl:py-3 text-xs 3xl:text-sm 4xl:text-base font-medium tracking-widest uppercase text-current opacity-70 hover:opacity-100 transition-opacity bg-transparent focus:outline-none'
    >
      <GlobeAltIcon className='w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6' />
      {currentLocale.toUpperCase()}
    </button>
  );
}
