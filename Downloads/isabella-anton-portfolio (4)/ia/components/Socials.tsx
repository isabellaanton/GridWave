import Icon from './Icons';
import { ext } from '@/lib/util';

type Social = { id: string; label: string; href: string };

export default function Socials({ socials, labels = false, className = '' }: { socials: Social[]; labels?: boolean; className?: string }) {
  return (
    <ul className={`flex items-center ${labels ? 'flex-wrap gap-3' : 'gap-3.5'} ${className}`}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            aria-label={s.label}
            title={s.label}
            {...ext(s.href)}
            className={labels ? 'pill' : 'block text-[#d4d4d8] transition-colors hover:text-white'}
            style={labels ? { ['--lc' as string]: 'var(--c1)' } : undefined}
          >
            <Icon name={s.id as 'github'} size={labels ? 14 : 17} />
            {labels && <span className="ml-2">{s.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
