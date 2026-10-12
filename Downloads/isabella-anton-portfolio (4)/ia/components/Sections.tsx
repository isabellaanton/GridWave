import type { ReactNode } from 'react';
import type { Dict } from '@/content/content';
import { colorVar, cv, ext } from '@/lib/util';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import Icon from './Icons';
import ResumeButton from './ResumeButton';

function Shell({ id, color, d, children }: { id: string; color: number; d: Dict; children: ReactNode }) {
  const nav = d.nav.find((n) => n.id === id)!;
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-[calc(5rem*var(--space))] md:px-8">
      <Reveal>
        <SectionHead kicker={nav.kicker} label={nav.label} title={nav.title} color={color} />
        {children}
      </Reveal>
    </section>
  );
}

const mono = 'font-mono text-[11px] uppercase tracking-[.14em] text-muted';

export function Work({ d }: { d: Dict }) {
  return (
    <Shell id="work" color={1} d={d}>
      <div className="grid gap-5 md:grid-cols-2">
        {d.projects.items.map((p) => (
          <article key={p.name} className={`card flex flex-col ${p.featured ? 'md:col-span-2' : ''}`} style={cv({ '--lc': colorVar(p.color) })}>
            <p className={mono}>{p.meta}</p>
            <h3 className={`mt-4 font-display font-semibold ${p.featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{p.name}</h3>
            {p.awards.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="awards">
                {p.awards.map((a) => (
                  <li key={a} className="chip" style={{ borderColor: 'var(--lc)', color: 'var(--lc)' }}>
                    ★ {a}
                  </li>
                ))}
              </ul>
            )}
            <p className={`mt-3 leading-relaxed text-[#b4b4bb] ${p.featured ? 'max-w-[70ch] text-base' : 'text-[15px]'}`}>{p.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
            {(p.demo || p.repo || p.press) && (
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
                {p.demo && (
                  <a href={p.demo} className="link-lc inline-flex items-center gap-1.5" {...ext(p.demo)}>
                    <Icon name="external" size={13} />
                    {d.projects.demo}
                    <span className="sr-only"> — {p.name}</span>
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} className="link-lc inline-flex items-center gap-1.5" {...ext(p.repo)}>
                    <Icon name="github" size={13} />
                    {d.projects.code}
                    <span className="sr-only"> — {p.name}</span>
                  </a>
                )}
                {p.press && (
                  <a href={p.press} className="link-lc inline-flex items-center gap-1.5" {...ext(p.press)}>
                    <Icon name="external" size={13} />
                    {d.projects.press}
                    <span className="sr-only"> — {p.name}</span>
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function Skills({ d }: { d: Dict }) {
  return (
    <Shell id="skills" color={5} d={d}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {d.skills.categories.map((c, i) => (
          <div key={i} className="card" style={cv({ '--lc': colorVar(c.color) })}>
            <h3 className={mono}>{c.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function About({ d }: { d: Dict }) {
  return (
    <Shell id="about" color={2} d={d}>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="max-w-[60ch] space-y-5 text-lg font-light leading-relaxed text-[#c9c9cf]">
            {d.about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {d.about.stats.map((st, i) => (
              <li key={i} className="card !p-5" style={cv({ '--lc': colorVar(st.color) })}>
                <p className="font-display text-4xl font-extrabold" style={{ color: 'var(--lc)' }}>
                  {st.value}
                </p>
                <p className="mt-1 text-sm text-[#b4b4bb]">{st.label}</p>
              </li>
            ))}
          </ul>
          <ResumeButton d={d} className="mt-8" />
        </div>
        <div className="space-y-12">
          <div>
            <h3 className={`mb-6 ${mono}`}>{d.about.educationTitle}</h3>
            <ol className="relative ml-1.5 space-y-9 border-l border-white/10">
              {d.about.education.map((x, i) => (
                <li key={i} className="relative pl-7" style={cv({ '--lc': colorVar(x.color) })}>
                  <span className="absolute -left-[5.5px] top-2 size-2.5 rounded-full" style={{ background: 'var(--lc)', boxShadow: '0 0 12px var(--lc)' }} aria-hidden="true" />
                  <p className={mono}>{x.period}</p>
                  <h4 className="mt-1 font-display text-xl font-semibold">{x.role}</h4>
                  <p className="font-mono text-xs" style={{ color: 'var(--lc)' }}>
                    {x.company}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#b4b4bb]">{x.desc}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className={`mb-2 ${mono}`}>{d.about.publicationsTitle}</h3>
            <p className="mb-5 text-[15px] text-[#b4b4bb]">{d.about.publicationsNote}</p>
            <ul className="border-t border-white/10">
              {d.about.publications.map((x, i) => {
                const inner = (
                  <>
                    <span className={mono}>
                      {x.year ? `${x.venue} · ${x.year}` : x.venue}
                    </span>
                    <span className="mt-1 block font-display text-lg">{x.title}</span>
                  </>
                );
                return (
                  <li key={i} style={cv({ '--lc': colorVar(x.color) })} className="border-b border-white/10">
                    {x.href ? (
                      <a href={x.href} {...ext(x.href)} className="block py-4 transition-colors hover:text-[var(--lc)]">
                        {inner}
                      </a>
                    ) : (
                      <div className="py-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Contact({ d }: { d: Dict }) {
  return (
    <Shell id="contact" color={4} d={d}>
      <p className="max-w-[44ch] text-lg font-light text-[#c9c9cf]">{d.contact.text}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {d.socials.map((s, i) => (
          <li key={s.id}>
            <a href={s.href} {...ext(s.href)} className="card flex items-center gap-4 !p-5" style={cv({ '--lc': colorVar([5, 1, 4][i % 3]) })}>
              <span style={{ color: 'var(--lc)' }}>
                <Icon name={s.id as 'github'} size={22} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-semibold">{s.label}</span>
                <span className="block truncate font-mono text-xs text-muted">{s.handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <ResumeButton d={d} className="mt-8" />
    </Shell>
  );
}
