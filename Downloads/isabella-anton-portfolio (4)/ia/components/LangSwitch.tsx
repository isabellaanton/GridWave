import Link from 'next/link';
import { LANGS, type Lang } from '@/content/i18n';

export default function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex gap-2 font-mono text-[11px] uppercase tracking-wider">
        {LANGS.map((l) => (
          <li key={l}>
            <Link
              href={`/${l}`}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? 'true' : undefined}
              className={l === lang ? 'text-white underline decoration-[var(--c1)] underline-offset-4' : 'text-muted hover:text-white'}
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
