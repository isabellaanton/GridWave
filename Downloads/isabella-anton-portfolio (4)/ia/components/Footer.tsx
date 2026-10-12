import type { Dict } from '@/content/content';

export default function Footer({ d }: { d: Dict }) {
  return (
    <footer className="border-t border-white/[.07] px-5 pb-32 pt-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          <span style={{ color: 'var(--c1)' }}>ia</span> · {d.footer.made}
        </p>
        <p>{d.footer.note}</p>
        <p>
          © {new Date().getFullYear()} {d.site.name} · {d.site.city}
        </p>
      </div>
    </footer>
  );
}
