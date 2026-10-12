'use client';
import { useEffect, useState } from 'react';
import type { Dict } from '@/content/content';

/** Cidade + hora local de Fortaleza (atualiza a cada 30 s). */
export default function LocalTime({ d }: { d: Dict }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: d.site.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [d.site.timeZone]);

  return (
    <p className="mono-chip hidden md:inline-flex" aria-label={`${d.site.timeLabel}: ${d.site.city}`}>
      <span className="size-1.5 rounded-full" style={{ background: 'var(--c1)' }} aria-hidden="true" />
      <b>{d.site.city}</b>
      <span className="min-w-[4ch]" suppressHydrationWarning>{time || '--:--'}</span>
    </p>
  );
}
