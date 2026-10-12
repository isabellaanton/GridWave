import type { Metadata, Viewport } from 'next';
import './globals.css';
import GridBackground from '@/components/GridBackground';
import { content } from '@/content/content';

export const metadata: Metadata = {
  metadataBase: new URL(content.site.url),
  title: { default: content.site.name, template: `%s · ${content.site.name}` },
  applicationName: content.site.name,
  authors: [{ name: content.site.name }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

// Aplica as preferências do dock antes da pintura (evita "flash" de tema).
const INIT = `try{var d=document.documentElement;d.classList.add('js');var s=JSON.parse(localStorage.getItem('ia-settings')||'{}');['palette','font','space','radius','glow'].forEach(function(k){if(typeof s[k]==='string')d.setAttribute('data-'+k,s[k])});if(s.debug)d.setAttribute('data-debug','')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT }} />
      </head>
      <body>
        <GridBackground />
        {children}
      </body>
    </html>
  );
}
