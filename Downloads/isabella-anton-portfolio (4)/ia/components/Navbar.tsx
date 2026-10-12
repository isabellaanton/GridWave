import type { Dict } from '@/content/content';
import type { Lang } from '@/content/i18n';
import Socials from './Socials';
import LocalTime from './LocalTime';
import LangSwitch from './LangSwitch';
import ResumeButton from './ResumeButton';

export default function Navbar({ d, lang }: { d: Dict; lang: Lang }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[.06] bg-[#111]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 md:px-8">
        <a href="#top" aria-label={`ia — ${d.site.name}`} className="font-display text-[1.7rem] font-extrabold leading-none tracking-tight">
          <span style={{ color: 'var(--c1)' }}>i</span>
          <span style={{ color: 'var(--c4)' }}>a</span>
        </a>
        <LocalTime d={d} />
        <nav aria-label={d.site.navLabel} className="ml-auto hidden md:block">
          <ul className="flex gap-6 text-sm">
            {d.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-[#d4d4d8] transition-colors hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="hidden h-4 w-px bg-white/15 md:block" aria-hidden="true" />
        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <ResumeButton d={d} compact className="hidden sm:inline-flex" />
          <Socials socials={d.socials} />
          <LangSwitch lang={lang} label={d.site.langLabel} />
        </div>
      </div>
    </header>
  );
}
