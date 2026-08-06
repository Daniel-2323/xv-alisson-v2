import React, { useState } from 'react';
import { ImageIcon, MapPin, Calendar, Clock, MapPinned, Sparkles, Info } from 'lucide-react';
import { GoldDivider, OrnamentArch, FloatingParticles } from '../Decorations';
import { mockData } from '../../mock';

export const Gallery = () => {
  return (
    <section className="relative section-bg py-24 md:py-32 overflow-hidden grain">
      <FloatingParticles density="low" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <p className="section-eyebrow">Mi Historia</p>
        <h2 className="font-serif-display italic text-5xl md:text-6xl text-[color:var(--cream)] mt-4 leading-tight">
          Momentos que han <span className="block text-gold-gradient not-italic font-bold">marcado mi vida</span>
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`}
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

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {dressCode.palette.map((c) => (
            <div key={c.name} className="palette-swatch relative" style={{ background: c.hex.startsWith('linear') ? c.hex : c.hex }}>
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="font-sans tracking-wider-xs text-xs font-semibold uppercase" style={{ color: c.text }}>{c.name}</p>
                <p className="font-serif-body italic text-sm" style={{ color: c.text, opacity: 0.85 }}>{c.role}</p>
              </div>
              {c.name === 'Dorado' && (
                <Sparkles size={20} className="absolute top-3 right-3 text-white/70" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto flex items-start gap-3 p-4 rounded-lg border border-[color:var(--gold-1)]/20 bg-[color:var(--bg-panel)]/40">
          <Info size={18} className="text-[color:var(--gold-1)] flex-shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-[color:var(--cream-soft)]"><span className="font-semibold text-[color:var(--gold-2)]">Nota:</span> {dressCode.note}</p>
        </div>
      </div>
    </section>
  );
};

export const RSVP = () => {
  const { rsvp, quinceanera } = mockData;
  const [name, setName] = useState('');
  const [passes, setPasses] = useState(1);

  const handleConfirm = () => {
    if (!name.trim()) return;
    const message = encodeURIComponent(
      `¡Hola! Confirmo mi asistencia a los XV años de ${quinceanera.firstName} ${quinceanera.middleName}.\nNombre: ${name}\nNúmero de pases: ${passes}`
    );
    window.open(`https://wa.me/${rsvp.whatsappNumber}?text=${message}`, '_blank');
  };

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
            Llena el formulario y envíanos tu confirmación directamente por WhatsApp. Esperamos contar con tu presencia.
          </p>
          <div className="h-px w-16 bg-[color:var(--gold-1)]/60 mx-auto mt-6" />
        </div>

        <div className="mt-12 p-8 md:p-10 rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/60 backdrop-blur">
          <div className="mb-6">
            <label className="section-eyebrow block mb-3">Tu Nombre Completo</label>
            <input
              type="text"
              className="field-input"
              placeholder="Ej: Juan Carlos Martínez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="section-eyebrow block mb-3">Número de Pases</label>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: rsvp.maxPasses }).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPasses(n)}
                    className={`pass-pill ${passes === n ? 'active' : ''}`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <p className="font-serif-body italic text-sm text-[color:var(--cream-soft)]/70 mt-3">
              Selecciona el número de personas que asistirán
            </p>
          </div>

          <button onClick={handleConfirm} className="btn-gold-solid w-full mt-4 flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.55 4.13 1.6 5.93L2 22l4.28-1.12a9.86 9.86 0 004.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14.13c-.24.68-1.4 1.29-1.94 1.37-.5.07-1.13.1-1.83-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.98-4.39-.15-.19-1.19-1.58-1.19-3.02 0-1.44.76-2.14 1.03-2.44.27-.3.59-.38.79-.38h.57c.18 0 .43-.07.67.51.24.58.83 2 .9 2.15.07.15.12.32.02.51-.09.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.29 2.34 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.15.26.1 1.68.79 1.97.94.29.15.48.22.55.34.07.13.07.72-.17 1.41z" />
            </svg>
            CONFIRMAR POR WHATSAPP
          </button>

          <p className="font-serif-body italic text-xs text-center text-[color:var(--cream-soft)]/60 mt-4">
            Al confirmar, serás redirigido a WhatsApp con tu información pre-llenada
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
        <div className="flex justify-center mb-4"><OrnamentArch size={50} /></div>
        <p className="section-eyebrow">Con toda mi ilusión</p>
        <h3 className="font-serif-display italic text-3xl md:text-4xl text-gold-gradient mt-3">
          {quinceanera.firstName} {quinceanera.middleName}
        </h3>
        <p className="font-sans tracking-widest-xl text-xs text-[color:var(--cream-soft)]/70 mt-2">{quinceanera.familyLine}</p>
        <div className="h-px w-24 bg-[color:var(--gold-1)]/50 mx-auto my-6" />
        <p className="font-serif-body italic text-[color:var(--cream-soft)]">{event.dateLabel}</p>
        <p className="font-sans text-[10px] tracking-widest-xl text-[color:var(--cream-soft)]/40 mt-8 uppercase">
          Hecho con cariño • Invitación Digital
        </p>
      </div>
    </footer>
  );
};
