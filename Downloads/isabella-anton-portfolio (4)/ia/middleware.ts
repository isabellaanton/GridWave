import { NextRequest, NextResponse } from 'next/server';

const LANGS = ['pt', 'en', 'fr', 'de'];

export function middleware(req: NextRequest) {
  const header = req.headers.get('accept-language') || '';
  const pick =
    header
      .split(',')
      .map((s) => s.trim().slice(0, 2).toLowerCase())
      .find((l) => LANGS.includes(l)) || 'pt';
  return NextResponse.redirect(new URL(`/${pick}`, req.url));
}

export const config = { matcher: ['/'] };
