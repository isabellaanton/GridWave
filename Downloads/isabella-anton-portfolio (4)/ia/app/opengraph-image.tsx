import { ImageResponse } from 'next/og';

export const alt = 'Isabella Anton — ia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COLORS = ['#B79CF2', '#F58DB5', '#E5603F', '#F7922E', '#6F8FEF'];

export default function Image() {
  const word = 'isabella anton';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111',
          backgroundImage: 'radial-gradient(900px 420px at 50% -10%, rgba(247,146,46,0.2), transparent 70%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 150, fontWeight: 800, letterSpacing: -4 }}>
          {[...word].map((c, i) => (
            <span key={i} style={{ color: COLORS[i % 5] }}>
              {c === ' ' ? '\u00a0' : c}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: '#a1a1aa' }}>IA = Isabella Anton</div>
      </div>
    ),
    { ...size },
  );
}
