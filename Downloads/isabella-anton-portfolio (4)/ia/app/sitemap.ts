import type { MetadataRoute } from 'next';
import { content } from '@/content/content';
import { LANGS } from '@/content/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LANGS.map((l) => [l, `${content.site.url}/${l}`]));
  return LANGS.map((l) => ({ url: `${content.site.url}/${l}`, lastModified: new Date(), alternates: { languages } }));
}
