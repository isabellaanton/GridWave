import type { Dict } from '@/content/content';
import Icon from './Icons';
import { ext } from '@/lib/util';

/** Botão "baixar currículo" (PDF em /public). */
export default function ResumeButton({ d, compact = false, className = '' }: { d: Dict; compact?: boolean; className?: string }) {
  return (
    <a
      href={d.resume.href}
      download={d.resume.filename}
      {...ext(d.resume.href)}
      aria-label={d.resume.aria}
      className={`pill ${className}`}
      style={{ ['--lc' as string]: 'var(--c4)' }}
    >
      <Icon name="download" size={14} />
      <span className="ml-2">{compact ? d.resume.label : d.resume.button}</span>
    </a>
  );
}
