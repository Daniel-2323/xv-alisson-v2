// Mock data - editable placeholder content for the XV años invitation
export const mockData = {
  quinceanera: {
    firstName: 'Alisson',
    middleName: 'Citlalli',
    lastName: 'Fidencio Flores',
    familyLine: 'FIDENCIO  \u00b7  FLORES',
    parents: {
      mother: 'Amalia Flores Alvarado',
      father: 'Jos\u00e9 Fidencio Vega',
    },
  },
  event: {
    dateISO: '2026-12-05T20:00:00',
    dateLabel: 'Viernes 5 \u00b7 Diciembre \u00b7 2026',
    dayFull: 'Viernes, 5 de Diciembre de 2026',
    time: 'POR CONFIRMAR \u2014 Recepci\u00f3n de invitados',
    venue: 'Sal\u00f3n de Eventos',
    venueName: 'Pendiente',
    address: 'Por confirmar',
    mapsQuery: 'Pendiente',
  },
  message: {
    intro1:
      'Hay momentos en la vida que son especiales por s\u00ed solos, pero compartirlos con las personas que quiero los convierte en inolvidables.',
    intro2: 'Con mucha alegr\u00eda quiero invitarte a celebrar conmigo una noche muy especial.',
    heartMessage:
      'Este d\u00eda tan importante en mi vida quiero compartirlo con las personas que m\u00e1s quiero. Gracias por ser parte de esta historia que apenas comienza.',
  },
  gallery: [null, null, null, null], // photo placeholders
  dressCode: {
    title: 'EL WESTERN',
    subtitle: 'es opcional',
    items: [
      { icon: 'hat', label: 'Sombreros' },
      { icon: 'boot', label: 'Botas' },
      { icon: 'sparkle', label: 'Detalles' },
    ],
    palette: [
      { name: 'Verde Botella', role: 'Color principal', hex: '#0e3b2e', text: '#f5e6c8' },
      { name: 'Beige Arena', role: 'Neutro c\u00e1lido', hex: '#e8dcc0', text: '#5a4a2f' },
      { name: 'Caf\u00e9 Oscuro', role: 'Acento r\u00fastico', hex: '#4a2a15', text: '#f5e6c8' },
      { name: 'Negro Elegante', role: 'Base formal', hex: '#0a0a0a', text: '#f5e6c8' },
      { name: 'Dorado', role: 'Detalle premium', hex: 'linear-gradient(135deg,#d4af37,#f4e1a4,#c9a227)', text: '#3a2a05' },
    ],
    note: 'Nota: Evitar colores blanco, rojo o rosa intenso. Los colores reservados para la quincea\u00f1era son el verde botella y el dorado.',
  },
  rsvp: {
    whatsappNumber: '5215555555555', // placeholder - editar cuando se tenga el número real
  },
  heroImage:
    'https://images.unsplash.com/photo-1720534670705-9f4b9315528d?auto=format&fit=crop&w=2000&q=80',
  venueImage:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  video: {
    eyebrow: 'Mi Video',
    title: 'Un instante en mi vida',
    // Placeholder video - replace with your own MP4 URL or YouTube embed
    src: 'https://cdn.pixabay.com/video/2023/10/18/185725-876678964_large.mp4',
    poster:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80',
  },
  quote: {
    text: 'Hoy dejo atrás la niñez para comenzar una nueva etapa llena de sueños, ilusiones y esperanza.',
    author: 'Alisson Citlalli',
  },
  galleryHeader: {
    eyebrow: 'Galería',
    title: 'Recuerdos en imágenes',
  },
  timeline: {
    eyebrow: 'Cronograma',
    title: 'Itinerario del día',
    events: [
      { time: '4:30 PM', label: 'Recepción de invitados', icon: 'sparkle' },
      { time: '5:00 PM', label: 'Ceremonia religiosa', icon: 'church' },
      { time: '7:00 PM', label: 'Brindis y protocolo', icon: 'glass' },
      { time: '8:00 PM', label: 'Cena', icon: 'utensils' },
      { time: '9:00 PM', label: 'Vals', icon: 'heart' },
      { time: '10:00 PM', label: 'Baile', icon: 'music' },
    ],
  },
};
