import { redirect } from 'next/navigation';
import { DEFAULT_LANG } from '@/content/i18n';

// Fallback: o middleware já escolhe o idioma pelo navegador.
export default function Home() {
  redirect(`/${DEFAULT_LANG}`);
}
