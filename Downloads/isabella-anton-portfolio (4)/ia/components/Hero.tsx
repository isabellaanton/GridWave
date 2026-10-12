'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dict } from '@/content/content';
import { colorVar, cv, ext } from '@/lib/util';

const WORDS = ['isabella', 'anton'];
const BIG = new Set([0, 8]); // o "i" e o "a" de IA
const TALL = new Set(['b', 'l', 't']);

/** Posição das pílulas (% do wordmark, px do topo) e a letra (índice) a que cada uma se liga. */
const LAYOUT = [
  { id: 'about', left: 7, top: 70, letter: 2 },
  { id: 'work', left: 27, top: 118, letter: 6 },
  { id: 'skills', left: 43, top: 14, letter: 8 },
  { id: 'contact', left: 72, top: 104, letter: 11 },
  { id: 'cv', left: 80, top: 40, letter: 12 }, // download do currículo
] as const;

type Line = { id: string; d: string; x: number; y: number; letter: number };

export default function Hero({ d }: { d: Dict }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hot, setHot] = useState<string | null>(null);
  const [ia, setIa] = useState(0);
  const lastSwap = useRef(0);

  const nextIa = useCallback(() => {
    const now = Date.now();
    if (now - lastSwap.current < 380) return;
    lastSwap.current = now;
    setIa((i) => (i + 1) % d.hero.ia.length);
  }, [d.hero.ia.length]);

  // Mede letras e pílulas e desenha linhas ortogonais (com cantos arredondados) entre elas.
  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sr = stage.getBoundingClientRect();
    const next: Line[] = [];
    for (const p of LAYOUT) {
      const pill = pillRefs.current[p.id];
      const el = letterRefs.current[p.letter];
      if (!pill || !el) continue;
      const pr = pill.getBoundingClientRect();
      if (pr.width === 0) continue; // pílulas desktop ficam ocultas no mobile
      const left = pr.left - sr.left;
      const right = pr.right - sr.left;
      const cy = (pr.top + pr.bottom) / 2 - sr.top;
      const cx = (left + right) / 2;
      const lx = el.offsetLeft + el.offsetWidth / 2; // offset ignora a animação de queda
      const ly = el.offsetTop + el.offsetHeight * (TALL.has(el.textContent ?? '') ? 0.17 : 0.34);
      const dx = lx - cx;
      const r = 10;
      let path: string;
      if (Math.abs(dx) < 14) {
        path = `M${lx} ${pr.bottom - sr.top} V${ly}`;
      } else {
        const dir = dx > 0 ? 1 : -1;
        const sx = dir > 0 ? right : left;
        path =
          ly - cy > r + 4
            ? `M${sx} ${cy} H${lx - dir * r} Q${lx} ${cy} ${lx} ${cy + r} V${ly}`
            : `M${sx} ${cy} H${lx} V${ly}`;
      }
      next.push({ id: p.id, d: path, x: lx, y: ly, letter: p.letter });
    }
    setLines(next);
    setSize({ w: sr.width, h: sr.height });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const hotLetter = hot ? LAYOUT.find((l) => l.id === hot)?.letter : undefined;
  const navById: Record<string, { label: string; title: string }> = Object.fromEntries(d.nav.map((n) => [n.id, n]));
  navById.cv = { label: d.resume.label, title: d.resume.aria };
  const linkProps = (id: string) =>
    id === 'cv' ? { href: d.resume.href, download: d.resume.filename, ...ext(d.resume.href) } : { href: `#${id}` };
  let index = 0;

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-5 pb-28 pt-10 md:pt-16">
      <div ref={stageRef} className="relative mx-auto w-fit md:pt-[170px]">
        <svg className="pointer-events-none absolute left-0 top-0 hidden md:block" width={size.w} height={size.h} style={{ overflow: 'visible' }} aria-hidden="true">
          {lines.map((l, j) => (
            <g key={l.id} className={`conn-g ${hot === l.id ? 'on' : ''}`} style={cv({ '--lc': colorVar(l.letter + 1), '--j': j })}>
              <path className="conn" d={l.d} pathLength={1} />
              <circle className="conn-dot" cx={l.x} cy={l.y} r="3.5" />
            </g>
          ))}
        </svg>

        <h1>
          <span className="sr-only">{d.site.name}</span>
          <span className="wordmark" aria-hidden="true">
            {WORDS.map((w) => (
              <span key={w} className="word">
                {[...w].map((ch) => {
                  const i = index++;
                  const big = BIG.has(i);
                  return (
                    <span
                      key={i}
                      ref={(el) => {
                        letterRefs.current[i] = el;
                      }}
                      className={`letter ${big ? 'big' : ''} ${hotLetter === i ? 'hot' : ''}`}
                      style={cv({ '--i': i, '--lc': colorVar(i + 1) })}
                      onPointerEnter={big ? (e) => e.pointerType === 'mouse' && nextIa() : undefined}
                      onClick={big ? nextIa : undefined}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </h1>

        {/* Pílulas (desktop): links de navegação ligados às letras */}
        <div className="hidden md:block">
          {LAYOUT.map((p, j) => (
            <a
              key={p.id}
              ref={(el) => {
                pillRefs.current[p.id] = el;
              }}
              {...linkProps(p.id)}
              aria-label={navById[p.id].title}
              className="pill absolute -translate-x-1/2"
              style={cv({ left: `${p.left}%`, top: p.top, '--lc': colorVar(p.letter + 1), '--j': j })}
              onMouseEnter={() => setHot(p.id)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(p.id)}
              onBlur={() => setHot(null)}
            >
              {navById[p.id].label}
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-[36ch] text-center text-[clamp(1.1rem,2.2vw,1.6rem)] font-light leading-snug text-[#c9c9cf] md:mt-12">
        {d.hero.tagline}
      </p>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[.14em] text-muted">{d.hero.eyebrow}</p>

      {/* Pílulas (mobile): grade limpa, sem linhas */}
      <ul className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
        {LAYOUT.map((p, j) => (
          <li key={p.id}>
            <a {...linkProps(p.id)} className="pill" aria-label={navById[p.id].title} style={cv({ '--lc': colorVar(p.letter + 1), '--j': j })}>
              {navById[p.id].label}
            </a>
          </li>
        ))}
      </ul>

      {/* Easter egg principal */}
      <div className="mt-9 flex flex-col items-center gap-2">
        <button type="button" className="ia-btn" onClick={nextIa} onPointerEnter={(e) => e.pointerType === 'mouse' && nextIa()}>
          <span style={{ color: 'var(--c1)' }}>IA</span>
          <span className="text-muted">=</span>
          <span aria-live="polite">
            <span key={ia} className="swap">
              {d.hero.ia[ia]}
            </span>
          </span>
        </button>
        <span className="font-mono text-[10px] tracking-wider text-muted">{d.hero.hint}</span>
      </div>
    </section>
  );
}
