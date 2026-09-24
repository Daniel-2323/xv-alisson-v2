import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { CrownOrnament, GoldDivider, OrnamentArch, FloatingParticles } from '../Decorations';
import { mockData } from '../../mock';

export const Hero = () => {
  const { quinceanera, event, heroImage } = mockData;
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Dark forest" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-up">
        <div className="flex justify-center mb-4"><CrownOrnament /></div>
        <p className="font-sans tracking-widest-xl text-[11px] md:text-xs text-[color:var(--gold-1)] mb-8 uppercase">Mis XV Años</p>

        <h1 className="font-serif-display font-bold leading-[0.95] text-gold-gradient text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight">
          <span className="block">{quinceanera.firstName}</span>
          <span className="block">{quinceanera.middleName}</span>
        </h1>

        <p className="font-sans tracking-widest-xl text-xs md:text-sm text-[color:var(--cream)] mt-10 mb-6">
          {quinceanera.familyLine}
        </p>

        <GoldDivider variant="star" />

        <p className="font-sans tracking-widest-xl text-xs text-[color:var(--cream)] mb-10">X V</p>

        <a href="#rsvp" className="inline-block">
          <button className="btn-gold-outline">CONFIRMAR ASISTENCIA</button>
        </a>

        <p className="font-sans tracking-widest-xl text-[11px] md:text-xs text-[color:var(--gold-1)] mt-10 uppercase">
          {event.dateLabel}
        </p>

        <div className="scroll-indicator flex justify-center mt-10">
          <ChevronDown size={22} className="text-[color:var(--gold-1)] opacity-70" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0"><FloatingParticles density="low" /></div>
    </section>
  );
};

export const IntroMessage = () => {
  const { message } = mockData;
  return (
    <section className="relative section-bg py-28 md:py-36 overflow-hidden grain">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8"><OrnamentArch size={54} /></div>
        <p className="font-serif-body italic text-xl md:text-2xl text-[color:var(--cream)] leading-relaxed mb-8">
          {message.intro1}
        </p>
        <p className="font-serif-body italic text-xl md:text-2xl text-[color:var(--cream)] leading-relaxed">
          {message.intro2}
        </p>
        <div className="mt-14"><GoldDivider variant="star" /></div>
        <p className="font-sans tracking-widest-xl text-[11px] text-[color:var(--gold-1)] mt-2 uppercase">MIS XV AÑOS</p>
        <h2 className="font-serif-display italic text-4xl md:text-5xl text-[color:var(--cream)] mt-4">{mockData.quinceanera.firstName} {mockData.quinceanera.middleName}</h2>
        <p className="font-sans tracking-widest-xl text-xs text-[color:var(--cream-soft)]/70 mt-3">FIDENCIO FLORES</p>
      </div>
    </section>
  );
};

const CountBox = ({ value, label }) => (
  <div className="countdown-tile flex flex-col items-center justify-center">
    <span className="font-serif-display text-gold-gradient text-5xl md:text-6xl lg:text-7xl leading-none">
      {String(value).padStart(2, '0')}
    </span>
    <span className="font-sans tracking-widest-xl text-[10px] md:text-xs text-[color:var(--gold-1)] mt-3 uppercase">
      {label}
    </span>
  </div>
);

export const Countdown = () => {
  const target = useMemo(() => new Date(mockData.event.dateISO).getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <section className="relative section-bg-alt py-20 md:py-28 overflow-hidden">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="section-eyebrow">Cuenta Regresiva</p>
        <h2 className="font-serif-display italic text-5xl md:text-6xl text-[color:var(--cream)] mt-4 leading-tight">
          Faltan
        </h2>
        <div className="mt-6 mb-12"><GoldDivider variant="star" /></div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          <CountBox value={days} label="Días" />
          <CountBox value={hours} label="Horas" />
          <CountBox value={mins} label="Minutos" />
          <CountBox value={secs} label="Segundos" />
        </div>
      </div>
    </section>
  );
};

export const WelcomeMessage = () => {
  const { quinceanera, message } = mockData;
  return (
    <section className="relative section-bg py-28 md:py-32 overflow-hidden grain">
      <FloatingParticles density="normal" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-4">
          <svg width="60" height="18" viewBox="0 0 60 18" className="text-[color:var(--gold-1)]">
            <line x1="0" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1" />
            <path d="M24 9 L27 3 L30 12 L33 3 L36 9" stroke="currentColor" strokeWidth="1" fill="none" />
            <line x1="38" y1="9" x2="60" y2="9" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <p className="section-eyebrow">Un Mensaje De El Corazon</p>
        <h2 className="font-serif-display italic text-5xl md:text-6xl lg:text-7xl text-[color:var(--cream)] mt-6 leading-tight">
          Bienvenidos a mi <span className="block text-gold-gradient not-italic font-bold">noche especial</span>
        </h2>

        <div className="mt-12 relative max-w-2xl mx-auto">
          <div className="absolute -left-2 -top-4 text-[color:var(--gold-1)] font-serif-display text-6xl opacity-70">“</div>
          <p className="font-serif-body italic text-lg md:text-xl text-[color:var(--cream)] leading-relaxed px-8">
            {message.heartMessage}
          </p>
          <div className="h-px w-16 bg-[color:var(--gold-1)]/60 mx-auto my-6" />
          <p className="font-serif-body italic text-lg text-[color:var(--gold-2)]">{quinceanera.firstName} {quinceanera.middleName} {quinceanera.lastName}</p>
          <p className="font-sans text-xs tracking-widest-xl text-[color:var(--cream-soft)]/70 mt-2 uppercase">
            y sus padres, {quinceanera.parents.mother} y {quinceanera.parents.father}
          </p>
        </div>
      </div>
    </section>
  );
};


export const VideoSection = () => {
  const { video } = mockData;
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  const handlePlay = () => {
    if (!ref.current) return;
    ref.current.play();
    setPlaying(true);
  };

  return (
    <section className="relative section-bg py-24 md:py-32 overflow-hidden grain">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="section-eyebrow">{video.eyebrow}</p>
        <h2 className="font-serif-display italic text-5xl md:text-6xl text-gold-gradient mt-4 leading-tight">
          {video.title}
        </h2>
        <div className="mt-6 mb-12"><GoldDivider variant="star" /></div>

        <div className="relative rounded-xl overflow-hidden border border-[color:var(--gold-1)]/25 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <video
            ref={ref}
            src={video.src}
            poster={video.poster}
            className="w-full aspect-video object-contain bg-black md:max-h-[520px]"
            controls={playing}
            playsInline
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Reproducir video"
            >
              <span className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
              <span className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-gradient flex items-center justify-center shadow-[0_10px_40px_rgba(212,175,55,0.45)] transition-transform duration-300 group-hover:scale-105">
                <Play size={36} className="text-[color:var(--bg-deep)] ml-1" fill="currentColor" strokeWidth={0} />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};


export const QuoteSection = () => {
  const { quote } = mockData;
  return (
    <section className="relative section-bg-alt py-24 md:py-28 overflow-hidden">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <svg width="34" height="34" viewBox="0 0 24 24" className="text-[color:var(--gold-1)]" aria-hidden>
            <path
              d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z M19 4 L19.7 6.3 L22 7 L19.7 7.7 L19 10 L18.3 7.7 L16 7 L18.3 6.3 Z M5 14 L5.6 15.4 L7 16 L5.6 16.6 L5 18 L4.4 16.6 L3 16 L4.4 15.4 Z"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
        </div>

        <p className="font-serif-display italic text-2xl md:text-3xl lg:text-4xl text-[color:var(--cream)] leading-relaxed">
          &ldquo;{quote.text}&rdquo;
        </p>

        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="gold-line w-24" />
          <svg width="16" height="16" viewBox="0 0 24 24" className="text-[color:var(--gold-1)]" aria-hidden>
            <path d="M12 3 L13 9 L19 10 L13 11 L12 17 L11 11 L5 10 L11 9 Z" fill="currentColor" />
          </svg>
          <div className="gold-line w-24" />
        </div>

        <p className="font-serif-body italic text-xl md:text-2xl text-gold-gradient mt-6">
          &mdash; {quote.author}
        </p>
      </div>
    </section>
  );
};
