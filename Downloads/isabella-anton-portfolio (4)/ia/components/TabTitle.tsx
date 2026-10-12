'use client';
import { useEffect } from 'react';

/** Detalhe discreto: o título da aba muda quando você sai dela. */
export default function TabTitle({ away }: { away: string }) {
  useEffect(() => {
    let original = document.title;
    const onChange = () => {
      if (document.hidden) {
        original = document.title;
        document.title = away;
      } else {
        document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onChange);
    console.log('%c ia %c Isabella Anton', 'background:#B79CF2;color:#111;font-weight:700;padding:2px 8px;border-radius:4px', 'color:#B79CF2');
    return () => document.removeEventListener('visibilitychange', onChange);
  }, [away]);
  return null;
}
