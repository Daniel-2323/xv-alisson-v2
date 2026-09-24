import React, { useState } from 'react';
import { ImageIcon, MapPin, Calendar, Clock, MapPinned, Sparkles, Info, Church, GlassWater, Utensils, Heart, Music, Instagram, MessageCircle } from 'lucide-react';
import { GoldDivider, OrnamentArch, FloatingParticles } from '../Decorations';
import { Reveal } from '../Effects';
import { mockData } from '../../mock';

export const Gallery = () => {
  return (
    <section className="relative section-bg py-24 md:py-32 overflow-hidden grain">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <p className="section-eyebrow">{mockData.galleryHeader.eyebrow}</p>
        <h2 className="font-serif-display italic text-5xl md:text-6xl text-gold-gradient mt-4 leading-tight">
          {mockData.galleryHeader.title}
        </h2>
        <p className="font-serif-body italic text-[color:var(--cream-soft)]/60 mt-6 text-lg">— Por Indicar —</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-14">
          {mockData.gallery.map((_, i) => (
            <div key={i} className="photo-placeholder">
              <ImageIcon size={28} className="text-[color:var(--gold-1)]/50" />
              <span className="font-sans tracking-widest-xl text-[10px] text-[color:var(--gold-1)]/70 uppercase">Foto</span>
            </div>
          ))}
        </div>

        <div className="mt-14"><GoldDivider variant="leaf" /></div>
      </div>
    </section>
  );
};

export const Reception = () => {
  const { event, venueImage } = mockData;
  return (
    <section className="relative section-bg-alt py-24 md:py-32 overflow-hidden grain">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="section-eyebrow">Nos vemos aquí</p>
          <h2 className="font-serif-display text-5xl md:text-6xl text-[color:var(--cream)] mt-4 leading-tight">
            Recepción & <span className="italic text-gold-gradient font-bold">Festejo</span>
          </h2>
          <div className="h-px w-24 bg-[color:var(--gold-1)]/60 mx-auto mt-6" />
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
          {/* Image card */}
          <div className="relative overflow-hidden rounded-lg border border-[color:var(--gold-1)]/20 shadow-2xl">
            <img src={venueImage} alt="Salón de eventos" className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-deep)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="section-eyebrow">{event.venue}</p>
              <h3 className="font-serif-display italic text-3xl text-[color:var(--gold-2)] mt-1">{event.venueName}</h3>
            </div>
          </div>

          {/* Info card */}
          <div className="space-y-5">
            {[
              { icon: Calendar, label: 'Fecha', value: event.dayFull },
              { icon: Clock, label: 'Hora', value: event.time },
              { icon: MapPinned, label: 'Dirección', value: event.address },
            ].map((it, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg border border-[color:var(--gold-1)]/15 bg-[color:var(--bg-panel)]/50">
                <div className="w-10 h-10 rounded-full bg-[color:var(--gold-1)]/10 flex items-center justify-center flex-shrink-0">
                  <it.icon size={18} className="text-[color:var(--gold-1)]" />
                </div>
                <div>
                  <p className="section-eyebrow">{it.label}</p>
                  <p className="font-serif-body text-lg text-[color:var(--cream)] mt-1">{it.value}</p>
                </div>
              </div>
            ))}

            <a
              href={event.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-2 btn-gold-outline"
            >
              <MapPin size={16} />
              VER UBICACIÓN EN GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const HatIcon = ({ size = 44 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 60 44" fill="none" className="text-[color:var(--gold-2)]">
    <path d="M18 24 Q22 8 30 8 Q38 8 42 24" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M6 30 Q30 40 54 30 Q54 34 30 38 Q6 34 6 30 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M18 26 Q30 22 42 26" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);
const BootIcon = ({ size = 40 }) => (
  <svg width={size * 0.75} height={size} viewBox="0 0 30 40" fill="none" className="text-[color:var(--gold-2)]">
    <path d="M8 4 L18 4 L18 26 L28 26 L28 34 L4 34 L4 30 L8 30 Z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
    <path d="M8 10 L18 10 M8 16 L18 16" stroke="currentColor" strokeWidth="1" />
  </svg>
);
const iconFor = (k) => (k === 'hat' ? <HatIcon /> : k === 'boot' ? <BootIcon /> : <Sparkles size={38} className="text-[color:var(--gold-2)]" />);

export const DressCode = () => {
  const { dressCode } = mockData;
  return (
    <section className="relative section-bg py-24 md:py-32 overflow-hidden grain">
      <FloatingParticles density="normal" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="section-eyebrow">Estilo de la noche</p>
          <h2 className="font-serif-display text-5xl md:text-6xl text-[color:var(--cream)] mt-4 leading-tight">
            Código de <span className="italic text-gold-gradient font-bold">Vestimenta</span>
          </h2>
        </div>

        <div className="mt-14 max-w-md mx-auto text-center border border-[color:var(--gold-1)]/25 rounded-lg py-6 px-8 bg-[color:var(--bg-panel)]/40">
          <h3 className="font-serif-display italic text-3xl text-gold-gradient">{dressCode.title}</h3>
          <p className="font-serif-body italic text-[color:var(--cream-soft)] mt-1">{dressCode.subtitle}</p>
          <div className="h-px w-16 bg-[color:var(--gold-1)]/60 mx-auto mt-3" />
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {dressCode.items.map((it) => (
            <div key={it.label} className="dress-card">
              <div className="flex justify-center mb-3">{iconFor(it.icon)}</div>
              <p className="font-serif-display text-xl text-[color:var(--cream)]">{it.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="section-eyebrow">Paleta de colores recomendada</p>
          <div className="h-px w-16 bg-[color:var(--gold-1)]/60 mx-auto mt-3" />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {dressCode.palette.map((c) => (
            <div key={c.name} className="palette-swatch relative" style={{ background: c.hex.startsWith('linear') ? c.hex : c.hex }}>
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="font-sans tracking-wider-xs text-xs font-semibold uppercase" style={{ color: c.text }}>{c.name}</p>
                <p className="font-serif-body italic text-sm" style={{ color: c.text, opacity: 0.85 }}>{c.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reserved colors */}
        <div className="mt-16 text-center">
          <p className="section-eyebrow">Colores Reservados</p>
          <p className="font-serif-body italic text-[color:var(--cream-soft)]/70 mt-2">para la quinceañera</p>
          <div className="h-px w-16 bg-[color:var(--gold-1)]/60 mx-auto mt-3" />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {dressCode.reserved.map((c) => (
            <div
              key={c.name}
              className="palette-swatch relative ring-1 ring-[color:var(--gold-1)]/60"
              style={{ background: c.hex.startsWith('linear') ? c.hex : c.hex }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="font-sans tracking-wider-xs text-xs font-semibold uppercase" style={{ color: c.text }}>{c.name}</p>
                <p className="font-serif-body italic text-sm" style={{ color: c.text, opacity: 0.85 }}>{c.role}</p>
              </div>
              <Sparkles size={18} className="absolute top-3 right-3" style={{ color: c.text, opacity: 0.85 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RSVP = () => {
  const { rsvp, quinceanera } = mockData;
  const [name, setName] = useState('');
  const [passes, setPasses] = useState(1);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const handleConfirm = async () => {
    if (!name.trim()) {
      setStatus({
        type: 'error',
        text: 'Por favor ingresa tu nombre.',
      });
      return;
    }

    if (passes < 1) {
      setStatus({
        type: 'error',
        text: 'Debes indicar al menos 1 pase.',
      });
      return;
    }

    setStatus({
      type: 'loading',
      text: 'Enviando confirmación...',
    });

    try {
      const res = await fetch(
        'https://xv-alisson-rsvp.odanuel658.workers.dev/api/rsvp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            passes: Number(passes),
            message: message.trim() || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Error al confirmar');
      }

      setStatus({
        type: 'success',
        text: '¡Confirmación enviada correctamente! Muchas gracias.',
      });

      // Limpiar el formulario después de confirmar
      setName('');
      setPasses(1);
      setMessage('');

    } catch (e) {
      console.error('Error al enviar RSVP:', e);

      setStatus({
        type: 'error',
        text: 'No se pudo enviar la confirmación. Intenta de nuevo.',
      });
    }
  };

  const dec = () => setPasses((p) => Math.max(1, Number(p) - 1));
  const inc = () => setPasses((p) => Math.max(1, Number(p) + 1));

  return (
    <section id="rsvp" className="relative section-bg-alt py-24 md:py-32 overflow-hidden grain">
      <FloatingParticles density="normal" />
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center">
          <p className="section-eyebrow">¿Nos acompañas?</p>
          <h2 className="font-serif-display font-bold text-5xl md:text-6xl text-[color:var(--cream)] mt-4 leading-tight">
            Confirma tu <span className="block italic text-gold-gradient">Asistencia</span>
          </h2>
          <p className="font-serif-body italic text-lg text-[color:var(--cream-soft)] mt-6 max-w-md mx-auto">
            Llena el formulario y presiona el botón para confirmar. Tu confirmación quedará registrada.
          </p>
          <div className="h-px w-16 bg-[color:var(--gold-1)]/60 mx-auto mt-6" />
        </div>

        <div className="mt-12 p-8 md:p-10 rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/60 backdrop-blur">
          <div className="mb-6">
            <label className="section-eyebrow block mb-3">Tu Nombre Completo</label>
            <input
              type="text"
              className="field-input"
              placeholder="Ej: Daniel S. Ojeda Flores"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="section-eyebrow block mb-3">Número de Pases</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={dec}
                className="w-11 h-11 rounded-md border border-[color:var(--gold-1)]/40 bg-[color:var(--bg-panel)]/60 text-[color:var(--gold-2)] font-serif-display text-2xl leading-none hover:border-[color:var(--gold-1)] transition"
                aria-label="Restar"
              >−</button>
              <input
                type="number"
                min={1}
                className="field-input text-center font-serif-display text-2xl"
                value={passes}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setPasses(Number.isFinite(v) && v >= 1 ? v : 1);
                }}
              />
              <button
                type="button"
                onClick={inc}
                className="w-11 h-11 rounded-md border border-[color:var(--gold-1)]/40 bg-[color:var(--bg-panel)]/60 text-[color:var(--gold-2)] font-serif-display text-2xl leading-none hover:border-[color:var(--gold-1)] transition"
                aria-label="Sumar"
              >+</button>
            </div>
            <p className="font-serif-body italic text-sm text-[color:var(--cream-soft)]/70 mt-3">
              Indica el número total de personas que asistirán (sin límite)
            </p>
          </div>

          <div className="mb-6">
            <label className="section-eyebrow block mb-3">Mensaje (opcional)</label>
            <textarea
              className="field-input"
              rows={3}
              placeholder="Deja un mensaje para la quinceañera..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={status.type === 'loading'}
            className="btn-gold-solid w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.55 4.13 1.6 5.93L2 22l4.28-1.12a9.86 9.86 0 004.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14.13c-.24.68-1.4 1.29-1.94 1.37-.5.07-1.13.1-1.83-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.98-4.39-.15-.19-1.19-1.58-1.19-3.02 0-1.44.76-2.14 1.03-2.44.27-.3.59-.38.79-.38h.57c.18 0 .43-.07.67.51.24.58.83 2 .9 2.15.07.15.12.32.02.51-.09.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.29 2.34 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.15.26.1 1.68.79 1.97.94.29.15.48.22.55.34.07.13.07.72-.17 1.41z" />
            </svg>
            {status.type === 'loading' ? 'ENVIANDO...' : 'CONFIRMAR ASISTENCIA'}
          </button>

          {status.type !== 'idle' && (
            <p className={`font-serif-body italic text-sm text-center mt-4 ${
              status.type === 'success' ? 'text-[color:var(--gold-2)]' : status.type === 'error' ? 'text-red-300' : 'text-[color:var(--cream-soft)]'
            }`}>{status.text}</p>
          )}

          <p className="font-serif-body italic text-xs text-center text-[color:var(--cream-soft)]/60 mt-4">
            Tu confirmación ha sido recibida. ¡Gracias por acompañarnos!
          </p>
          <p className="font-serif-body italic text-[10px] tracking-[0.18em] uppercase text-center text-[color:var(--gold-1)]/80 mt-3">
            Hecha y diseñada por DSOF
          </p>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { quinceanera, event } = mockData;
  return (
    <footer className="relative section-bg py-16 overflow-hidden grain">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Top: hat + name */}
        <div className="flex items-center justify-center gap-3">
          <svg width="34" height="26" viewBox="0 0 60 44" fill="none" className="text-[color:var(--gold-1)]" aria-hidden>
            <path d="M18 24 Q22 8 30 8 Q38 8 42 24" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.35" />
            <path d="M6 30 Q30 40 54 30 Q54 34 30 38 Q6 34 6 30 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.35" />
            <path d="M18 26 Q30 22 42 26" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
          <span className="font-serif-display italic text-2xl md:text-3xl text-gold-gradient">
            {quinceanera.firstName} {quinceanera.middleName}
          </span>
        </div>

        <div className="h-px w-56 bg-[color:var(--gold-1)]/40 mx-auto my-8" />

        {/* Full name */}
        <p className="font-serif-display italic text-xl md:text-2xl text-[color:var(--cream)]">
          {quinceanera.firstName} {quinceanera.middleName} {quinceanera.lastName}
        </p>
        <p className="font-sans tracking-widest-xl text-[11px] text-[color:var(--cream-soft)]/80 mt-3 uppercase">
          Hija de {quinceanera.parents.mother} &amp; {quinceanera.parents.father}
        </p>
        <p className="font-serif-body italic text-[color:var(--cream-soft)] mt-3">
          {event.dayFull.replace(',', '')} · 19:00 hrs
        </p>

        <div className="h-px w-56 bg-[color:var(--gold-1)]/40 mx-auto my-8" />

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6">
          <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-[color:var(--gold-1)]/40 flex items-center justify-center text-[color:var(--gold-1)] hover:bg-[color:var(--gold-1)]/10 hover:border-[color:var(--gold-1)] transition">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full border border-[color:var(--gold-1)]/40 flex items-center justify-center text-[color:var(--gold-1)] hover:bg-[color:var(--gold-1)]/10 hover:border-[color:var(--gold-1)] transition">
            {/* TikTok custom icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
            </svg>
          </a>
          <a href={`https://t.me/${mockData.rsvp.telegramBotUsername}`} aria-label="Telegram" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[color:var(--gold-1)]/40 flex items-center justify-center text-[color:var(--gold-1)] hover:bg-[color:var(--gold-1)]/10 hover:border-[color:var(--gold-1)] transition">
            <MessageCircle size={18} />
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-[color:var(--cream-soft)]/70">
          <p className="font-serif-body italic text-[9px] tracking-[0.22em] uppercase text-[color:var(--cream-soft)]/70">
            Hecha y diseñada por
          </p>
          <div className="flex items-center gap-2 rounded-full border border-[color:var(--gold-1)]/20 bg-[color:var(--gold-1)]/5 px-3 py-1.5">
            <span className="text-[8px] font-serif-display italic tracking-[0.26em] text-[color:var(--gold-1)]/80 uppercase">
              DSOF
            </span>
          </div>
        </div>

        <p className="font-sans tracking-widest-xl text-[10px] text-[color:var(--cream-soft)]/50 mt-10 uppercase">
          © {new Date().getFullYear()} {quinceanera.firstName} {quinceanera.middleName} {quinceanera.lastName} · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};


const TimelineIcon = ({ name, size = 20 }) => {
  const map = { sparkle: Sparkles, church: Church, glass: GlassWater, utensils: Utensils, heart: Heart, music: Music };
  const Cmp = map[name] || Sparkles;
  return <Cmp size={size} className="text-[color:var(--gold-1)]" />;
};

export const Timeline = () => {
  const { timeline } = mockData;
  return (
    <section className="relative section-bg-alt py-24 md:py-32 overflow-hidden">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center">
            <p className="section-eyebrow">{timeline.eyebrow}</p>
            <h2 className="font-serif-display italic text-5xl md:text-6xl text-gold-gradient mt-4 leading-tight">
              {timeline.title}
            </h2>
            <div className="mt-6 mb-14"><GoldDivider variant="star" /></div>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.5), transparent)' }}
          />

          <ul className="space-y-10 md:space-y-14">
            {timeline.events.map((ev, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={ev.time} className="relative grid grid-cols-9 items-center gap-4">
                  {/* Left card */}
                  <div className={`col-span-9 md:col-span-4 ${isLeft ? 'md:col-start-1 md:pr-8 md:text-right' : 'md:col-start-6 md:pl-8 md:order-3'}`}>
                    <Reveal delay={i * 60}>
                      <div className="inline-block text-left rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/70 px-5 py-4 min-w-[220px] backdrop-blur">
                        <p className="font-serif-display text-2xl text-gold-gradient leading-none">{ev.time}</p>
                        <p className="font-serif-body italic text-[color:var(--cream-soft)] mt-1">{ev.label}</p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Center icon */}
                  <div className="hidden md:flex col-span-1 col-start-5 justify-center">
                    <div className="w-11 h-11 rounded-full bg-[color:var(--bg-panel)] border border-[color:var(--gold-1)]/50 flex items-center justify-center shadow-[0_0_0_4px_rgba(10,30,23,1)]">
                      <TimelineIcon name={ev.icon} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
