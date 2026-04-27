import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

const localeMap: { [key: string]: Locale } = { sl, bs };

export function sortByDate<T>(
  items: T[],
  locale: string,
  dateField: keyof T,
): T[] {
  const currentLocale = localeMap[locale] || sl;
  return [...items].sort((a, b) => {
    const dateA = parse(
      String(a[dateField]),
      'd. MMMM yyyy',
      new Date(),
      { locale: currentLocale },
    );
    const dateB = parse(
      String(b[dateField]),
      'd. MMMM yyyy',
      new Date(),
      { locale: currentLocale },
    );
    return dateB.getTime() - dateA.getTime();
  });
}
