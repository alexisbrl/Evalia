import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/pricing': { fr: '/tarifs', en: '/pricing' },
    '/create': { fr: '/creer-atelier', en: '/create' },
    '/about': { fr: '/a-propos', en: '/about' },
    '/contact': '/contact',
    '/legal': { fr: '/mentions-legales', en: '/legal' },
  },
});
