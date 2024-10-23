'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { SI, BA } from 'country-flag-icons/react/3x2';
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react'; // Updated import
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const currentPathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  const onSelectChange = (newLocale: string) => {
    // Set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    setSelectedLocale(newLocale);

    startTransition(() => {
      router.replace(`/${newLocale}`);
    });

    
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <MenuButton className='inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 border-transparent bg-transparent text-sm font-medium text-[#c7c7c7] hover:border-[#ffe6bc] border-2 focus:outline-none focus:ring-2 focus:ring-offset-0 md:focus:ring-offset-1 focus:ring-[#ffe6bc]'>
          {selectedLocale === 'sl' ? (
            <SI className='w-4 h-4 md:w-6 md:h-6 mr-2' title='Slovenian' />
          ) : (
            <BA className='w-4 h-4 md:w-6 md:h-6 mr-2' title='Bosnian' />
          )}

          <ChevronDownIcon
            className='w-4 h-4 md:w-5 md:h-5 ml-2 -mr-1'
            aria-hidden='true'
          />
        </MenuButton>
      </div>

      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems className='origin-top-right absolute bg-black border-2 mt-2 w-14 rounded-md ring-1 ring-black ring-opacity-5 focus:ring-offset-0 md:focus:ring-offset-1 focus:ring-[#d2ab74]'>
          <div className=''>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => onSelectChange('sl')}
                  className={`${
                    active ? 'bg-[#ffe6bc]' : ''
                  } flex items-center text-white justify-center py-2 text-sm w-full text-center`}
                >
                  <SI className='w-5 h-5' title='Slovenian' />
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => onSelectChange('bs')}
                  className={`${
                    active ? 'bg-[#ffe6bc]' : ''
                  } flex items-center text-white justify-center py-2 text-sm w-full text-center`}
                >
                  <BA className='w-5 h-5' title='Bosnian' />
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
