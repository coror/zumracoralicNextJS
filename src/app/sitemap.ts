import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zumracoralic.com';

  const routes = [
    { path: '/', sl: '/', bs: '/' },
    { path: '/blogs', sl: '/blog', bs: '/blog' },
    { path: '/blogs/[slug]', sl: '/blog/[slug]', bs: '/blog/[slug]' },
    { path: '/events', sl: '/dogodki', bs: '/dogadaji' },
    { path: '/events/[slug]', sl: '/dogodki/[slug]', bs: '/dogadaji/[slug]' },
    { path: '/about-me', sl: '/o-meni', bs: '/o-meni' },
    { path: '/services', sl: '/storitve', bs: '/usluge' },
    {
      path: '/services/coaching',
      sl: '/storitve/coaching',
      bs: '/usluge/coaching',
    },
    {
      path: '/services/mediation',
      sl: '/storitve/mediacija',
      bs: '/usluge/medijacija',
    },
    {
      path: '/services/workshop',
      sl: '/storitve/delavnice-predavanja',
      bs: '/usluge/radionice-predavanja',
    },
    {
      path: '/services/workshop/[slug]',
      sl: '/storitve/delavnice-predavanja/[slug]',
      bs: '/usluge/radionice-predavanja/[slug]',
    },
    { path: '/contact', sl: '/kontakt', bs: '/kontakt' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        sl: `${baseUrl}${route.sl}`,
        bs: `${baseUrl}${route.bs}`,
      },
    },
  }));
}
