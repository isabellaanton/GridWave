export const LANGS = ['pt', 'en', 'fr', 'de'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'pt';
export const LOCALES: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US', fr: 'fr_FR', de: 'de_DE' };

export type L = Record<Lang, string>;
/** t(pt, en, fr, de): um texto nos quatro idiomas. */
export const t = (pt: string, en: string, fr: string, de: string): L => ({ pt, en, fr, de });

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

export type Localized<T> = T extends L
  ? string
  : T extends (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

const isL = (v: unknown): v is L =>
  typeof v === 'object' &&
  v !== null &&
  Object.keys(v).length === LANGS.length &&
  LANGS.every((l) => typeof (v as Record<string, unknown>)[l] === 'string');

/** Percorre o objeto de conteúdo e troca cada {pt,en,fr} pela string do idioma. */
export function localize<T>(value: T, lang: Lang): Localized<T> {
  if (isL(value)) return value[lang] as Localized<T>;
  if (Array.isArray(value)) return value.map((x) => localize(x, lang)) as Localized<T>;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, lang)]),
    ) as Localized<T>;
  }
  return value as Localized<T>;
}
