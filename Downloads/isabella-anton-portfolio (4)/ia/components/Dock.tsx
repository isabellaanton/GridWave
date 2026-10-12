'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dict } from '@/content/content';
import Icon, { type IconName } from './Icons';

const OPTIONS = {
  palette: ['default', 'neon', 'pastel', 'mono'],
  font: ['outfit', 'grotesk', 'mono'],
  space: ['compact', 'normal', 'airy'],
  radius: ['sharp', 'normal', 'round'],
  glow: ['off', 'soft', 'strong'],
} as const;
type Key = keyof typeof OPTIONS;
type State = Record<Key, string> & { debug: boolean };

const DEFAULTS: State = { palette: 'default', font: 'outfit', space: 'normal', radius: 'normal', glow: 'soft', debug: false };
const STORAGE_KEY = 'ia-settings';
const KEYS = Object.keys(OPTIONS) as Key[];

const ITEMS: { key: Key | 'debug'; icon: IconName; color: string }[] = [
  { key: 'palette', icon: 'palette', color: 'var(--c5)' },
  { key: 'font', icon: 'type', color: 'var(--c1)' },
  { key: 'space', icon: 'space', color: 'var(--c3)' },
  { key: 'radius', icon: 'radius', color: 'var(--c4)' },
  { key: 'glow', icon: 'glow', color: 'var(--c2)' },
  { key: 'debug', icon: 'terminal', color: '#4ade80' },
];

function apply(s: State) {
  const el = document.documentElement;
  KEYS.forEach((k) => el.setAttribute(`data-${k}`, s[k]));
  el.toggleAttribute('data-debug', s.debug);
}

/** Dock flutuante: personaliza o site em tempo real e guarda as escolhas no localStorage. */
export default function Dock({ d }: { d: Dict }) {
  const [s, setS] = useState<State>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const next: State = { ...DEFAULTS, debug: !!raw.debug };
      KEYS.forEach((k) => {
        if ((OPTIONS[k] as readonly string[]).includes(raw[k])) next[k] = raw[k];
      });
      setS(next);
    } catch {
      /* sem localStorage: usa o padrão */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    apply(s);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* ignora */
    }
  }, [s, ready]);

  const say = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 1800);
  }, []);

  const press = useCallback(
    (key: Key | 'debug') => {
      if (key === 'debug') {
        setS((p) => ({ ...p, debug: !p.debug }));
        return;
      }
      setS((p) => {
        const list = OPTIONS[key] as readonly string[];
        return { ...p, [key]: list[(list.indexOf(p[key]) + 1) % list.length] };
      });
    },
    [],
  );

  // atalho D = modo debug
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'd' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
      setS((p) => {
        say(`${d.dock.debug}: ${!p.debug ? 'on' : 'off'}`);
        return { ...p, debug: !p.debug };
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [d.dock.debug, say]);

  const valueOf = (k: Key | 'debug') => (k === 'debug' ? (s.debug ? 'on' : 'off') : s[k]);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 pb-[env(safe-area-inset-bottom)]">
      <div role="status" aria-live="polite" className={`rounded-full border border-white/10 bg-[#161616]/90 px-3 py-1 font-mono text-[10px] text-[#d4d4d8] transition-opacity duration-200 ${toast ? 'opacity-100' : 'opacity-0'}`}>
        {toast || '·'}
      </div>
      <div role="toolbar" aria-label={d.dock.label} className="flex items-center gap-1 rounded-full border border-white/10 bg-[#161616]/80 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,.5)] backdrop-blur-md">
        {ITEMS.map(({ key, icon, color }) => {
          const label = `${d.dock[key]}: ${valueOf(key)}`;
          return (
            <button
              key={key}
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={key === 'debug' ? s.debug : undefined}
              onClick={() => {
                const nextVal =
                  key === 'debug'
                    ? (!s.debug ? 'on' : 'off')
                    : (OPTIONS[key] as readonly string[])[((OPTIONS[key] as readonly string[]).indexOf(s[key]) + 1) % OPTIONS[key].length];
                say(`${d.dock[key]}: ${nextVal}`);
                press(key);
              }}
              className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10"
              style={{ color, background: key === 'debug' && s.debug ? 'rgba(74,222,128,.15)' : undefined }}
            >
              <Icon name={icon} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
