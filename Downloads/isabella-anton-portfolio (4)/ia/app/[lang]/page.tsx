import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDict } from '@/content/content';
import { LANGS, LOCALES, isLang } from '@/content/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Work, Skills, About, Contact } from '@/components/Sections';
import Footer from '@/components/Footer';
import Dock from '@/components/Dock';
import LangSync from '@/components/LangSync';
import TabTitle from '@/components/TabTitle';

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return {
    title: d.site.title,
    description: d.site.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { pt: '/pt', en: '/en', fr: '/fr', de: '/de', 'x-default': '/pt' },
    },
    openGraph: {
      title: d.site.title,
      description: d.site.description,
      url: `/${lang}`,
      siteName: d.site.name,
      locale: LOCALES[lang],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: d.site.title, description: d.site.description },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: d.site.name,
    jobTitle: d.site.role,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${lang}`,
    sameAs: d.socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        {d.site.skip}
      </a>
      <LangSync lang={lang} />
      <TabTitle away={d.site.tabAway} />
      <Navbar d={d} lang={lang} />
      <main id="main">
        <Hero d={d} />
        <Work d={d} />
        <Skills d={d} />
        <About d={d} />
        <Contact d={d} />
      </main>
      <Footer d={d} />
      <Dock d={d} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
