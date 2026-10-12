import { colorVar, cv } from '@/lib/util';

export default function SectionHead({ kicker, label, title, color }: { kicker: string; label: string; title: string; color: number }) {
  return (
    <header className="mb-[calc(2.5rem*var(--space))]" style={cv({ '--lc': colorVar(color) })}>
      <div className="flex items-center gap-3">
        <span className="pill">
          {kicker} · {label}
        </span>
        <span className="h-px flex-1 opacity-60" style={{ background: 'linear-gradient(90deg, var(--lc), transparent)' }} aria-hidden="true" />
        <span className="size-1.5 rounded-full" style={{ background: 'var(--lc)' }} aria-hidden="true" />
      </div>
      <h2 className="mt-6 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">{title}</h2>
    </header>
  );
}
