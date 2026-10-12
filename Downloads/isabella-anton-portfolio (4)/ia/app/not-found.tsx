import Link from 'next/link';
import type { Metadata } from 'next';
import { content } from '@/content/content';
import { LANGS } from '@/content/i18n';

export const metadata: Metadata = { title: '404 — Página não encontrada' };

export default function NotFound() {
  const n = content.notFound;
  return (
    <main id="main" className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-[clamp(5rem,22vw,14rem)] font-extrabold leading-none tracking-tight" role="img" aria-label="404">
          <span style={{ color: 'var(--c1)' }}>4</span>
          <span style={{ color: 'var(--c4)' }}>0</span>
          <span style={{ color: 'var(--c2)' }}>4</span>
        </p>
        <div className="mt-6 space-y-5">
          {LANGS.map((l) => (
            <div key={l} lang={l}>
              <h1 className="font-display text-2xl font-bold md:text-3xl">{n.title[l]}</h1>
              <p className="mt-1 text-muted">{n.text[l]}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {LANGS.map((l, i) => (
            <Link key={l} href={`/${l}`} className="pill" style={{ ['--lc' as string]: `var(--c${i + 1})` }} hrefLang={l}>
              {l} · home
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
