import React from 'react';
import { Star, Sparkles } from 'lucide-react';

// A reusable divider with gold line + ornaments
export const GoldDivider = ({ variant = 'star' }) => {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-md mx-auto my-6">
      <div className="gold-line flex-1" />
      {variant === 'star' ? (
        <div className="flex items-center gap-2 text-[color:var(--gold-1)]">
          <Star size={10} fill="currentColor" strokeWidth={0} />
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
            <path d="M2 12 Q11 -2 20 12" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="11" cy="3.5" r="1.1" fill="currentColor" />
          </svg>
          <Star size={10} fill="currentColor" strokeWidth={0} />
        </div>
      ) : (
        <svg width="32" height="14" viewBox="0 0 32 14" fill="none" aria-hidden className="text-[color:var(--gold-1)]">
          <path d="M2 7 Q16 -4 30 7" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      )}
      <div className="gold-line flex-1" />
    </div>
  );
};

export const OrnamentArch = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="0 0 60 34"
    fill="none"
    className={`text-[color:var(--gold-1)] ${className}`}
    aria-hidden
  >
    <path d="M4 30 Q30 -6 56 30" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <circle cx="30" cy="6" r="1.8" fill="currentColor" />
    <path d="M22 4 L30 6 L38 4" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

// Small crown-like ornament used in hero eyebrow
export const CrownOrnament = ({ className = '' }) => (
  <svg width="120" height="22" viewBox="0 0 120 22" fill="none" aria-hidden className={`text-[color:var(--gold-1)] ${className}`}>
    <line x1="0" y1="14" x2="44" y2="14" stroke="currentColor" strokeWidth="1" />
    <path d="M46 14 Q60 0 74 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <circle cx="60" cy="6" r="1.6" fill="currentColor" />
    <line x1="76" y1="14" x2="120" y2="14" stroke="currentColor" strokeWidth="1" />
    <path d="M52 14 L54 10 L56 14 L58 8 L60 14 L62 8 L64 14 L66 10 L68 14" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7" />
  </svg>
);

// Floating decorative particles in a section: stars, sparkles, leaves, tiny ornaments
export const FloatingParticles = ({ density = 'normal' }) => {
  const count = density === 'high' ? 22 : density === 'low' ? 10 : 16;
  const items = Array.from({ length: count }).map((_, i) => {
    const top = Math.random() * 95;
    const left = Math.random() * 95;
    const size = 8 + Math.random() * 14;
    const delay = Math.random() * 6;
    const type = i % 3;
    const anim = i % 2 === 0 ? 'animate-float-slow' : 'animate-float-slow-2';
    const twinkle = i % 4 === 0 ? 'animate-twinkle' : '';
    return { top, left, size, delay, type, anim, twinkle, key: i };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((it) => (
        <div
          key={it.key}
          className={`absolute text-[color:var(--gold-1)] ${it.anim} ${it.twinkle}`}
          style={{ top: `${it.top}%`, left: `${it.left}%`, animationDelay: `${it.delay}s` }}
        >
          {it.type === 0 && <Star size={it.size} fill="currentColor" strokeWidth={0} className="opacity-40" />}
          {it.type === 1 && <Sparkles size={it.size + 4} className="opacity-30" />}
          {it.type === 2 && (
            <svg width={it.size + 6} height={it.size} viewBox="0 0 24 20" className="opacity-30">
              <path d="M2 18 Q12 2 22 18" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
