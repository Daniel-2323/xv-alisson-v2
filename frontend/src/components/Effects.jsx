import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, VolumeX, Star, Sparkles } from 'lucide-react';

// Continuous falling gold particles across the whole page (fixed overlay)
export const FallingGoldParticles = ({ count = 28 }) => {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 12;
      const duration = 14 + Math.random() * 22;
      const delay = -Math.random() * duration; // negative so they are pre-spread
      const type = i % 3;
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
export const MusicToggle = ({ src = 'https://cdn.pixabay.com/audio/2022/10/25/audio_9c3c07e2b0.mp3' }) => {
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
