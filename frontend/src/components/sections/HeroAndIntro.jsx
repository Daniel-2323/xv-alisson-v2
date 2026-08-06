import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
  <div className="flex flex-col items-center">
    <span className="font-serif-display text-gold-gradient text-5xl md:text-6xl leading-none">{String(value).padStart(2, '0')}</span>
    <span className="font-sans tracking-widest-xl text-[10px] text-[color:var(--gold-1)] mt-2 uppercase">{label}</span>
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
    <section className="relative section-bg-alt py-16 md:py-20 overflow-hidden">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="countdown-card rounded-lg px-6 md:px-12 py-10">
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <CountBox value={days} label="Días" />
            <CountBox value={hours} label="Horas" />
            <CountBox value={mins} label="Min" />
            <CountBox value={secs} label="Seg" />
          </div>
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
