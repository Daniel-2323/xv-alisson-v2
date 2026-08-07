import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, VolumeX, Star, Sparkles } from 'lucide-react';

// Continuous falling gold particles across the whole page (fixed overlay)
export const FallingGoldParticles = ({ count = 28 }) => {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 8 + Math.random() * 16;
      const duration = 14 + Math.random() * 22;
      const delay = -Math.random() * duration; // negative so they are pre-spread
      const type = i % 5;
      const opacity = 0.35 + Math.random() * 0.45;
      return { left, size, duration, delay, type, opacity, key: i };
    });
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      {items.map((it) => (
        <span
          key={it.key}
          className="falling-particle"
          style={{
            left: `${it.left}%`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            opacity: it.opacity,
          }}
        >
          <span className="falling-particle-inner">
            {it.type === 0 && <Star size={it.size} fill="currentColor" strokeWidth={0} />}
            {it.type === 1 && <Sparkles size={it.size + 4} />}
            {it.type === 2 && (
              <svg width={it.size + 2} height={it.size + 2} viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="1.6" />
              </svg>
            )}
            {it.type === 3 && (
              /* Cowboy hat */
              <svg width={it.size + 10} height={it.size + 6} viewBox="0 0 60 44" fill="none">
                <path d="M18 24 Q22 8 30 8 Q38 8 42 24" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.35" />
                <path d="M6 30 Q30 40 54 30 Q54 34 30 38 Q6 34 6 30 Z" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.35" />
                <path d="M18 26 Q30 22 42 26" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            )}
            {it.type === 4 && (
              /* Cowboy boot */
              <svg width={it.size + 4} height={it.size + 8} viewBox="0 0 30 40" fill="none">
                <path d="M8 4 L18 4 L18 26 L28 26 L28 34 L4 34 L4 30 L8 30 Z" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.35" />
                <path d="M8 10 L18 10 M8 16 L18 16" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            )}
          </span>
        </span>
      ))}
    </div>
  );
};

// Reveal-on-scroll wrapper using IntersectionObserver
export const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`}>
      {children}
    </div>
  );
};

// Floating music toggle button (bottom-left)
export const MusicToggle = ({ src = 'https://customer-assets-gfyr7b9c.emergentagent.net/job_recreate-design/artifacts/nnm5pj39_DUKI%2C%20Bizarrap%20-%20Buscarte%20Lejos_instrumental.mp3' }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      const p = a.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        setPlaying(true);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Silenciar música' : 'Reproducir música'}
      className={`music-toggle ${playing ? 'playing' : ''}`}
    >
      {playing ? <Volume2 size={22} /> : <VolumeX size={22} />}
    </button>
  );
};
