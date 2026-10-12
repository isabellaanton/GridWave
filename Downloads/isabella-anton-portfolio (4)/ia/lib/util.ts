import type { CSSProperties } from 'react';

/** Permite passar custom properties (--lc etc.) no atributo style com tipagem. */
export const cv = (vars: Record<string, string | number>) => vars as unknown as CSSProperties;

export const ext = (href: string) =>
  /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

export const colorVar = (n: number) => `var(--c${((n - 1) % 5) + 1})`;
