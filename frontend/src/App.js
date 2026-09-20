import React, { useEffect, useState } from 'react';
import './App.css';
import { Hero, IntroMessage, Countdown, WelcomeMessage, VideoSection, QuoteSection } from './components/sections/HeroAndIntro';
import { Gallery, Reception, DressCode, RSVP, Footer } from './components/sections/EventDetails';
import { FallingGoldParticles, MusicToggle } from './components/Effects';

const Home = () => {
  return (
    <div className="min-h-screen bg-[color:var(--bg-deep)] text-[color:var(--cream)] overflow-x-hidden relative">
      <FallingGoldParticles count={36} />
      <Hero />
      <QuoteSection />
      <IntroMessage />
      <VideoSection />
      <Countdown />
      <WelcomeMessage />
      <Gallery />
      <Reception />
      <DressCode />
      <RSVP />
      <Footer />
      <MusicToggle />
    </div>
  );
};

const DesktopViewPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [device, setDevice] = useState('android');

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    const isMobile = navigator.userAgentData?.mobile
      || /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent);

    if (!isMobile || sessionStorage.getItem('desktop-view-prompt-dismissed')) {
      return;
    }

    setDevice(/iPhone|iPad|iPod/i.test(userAgent) ? 'ios' : 'android');
    setShowPrompt(true);
  }, []);

  const dismissPrompt = () => {
    sessionStorage.setItem('desktop-view-prompt-dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  const instructions = device === 'ios'
    ? 'En Safari toca “aA” junto a la barra de dirección y selecciona “Solicitar sitio web de escritorio”. En Chrome toca ⋯ y selecciona “Solicitar sitio de escritorio”.'
    : 'En Chrome toca ⋮ (arriba a la derecha) y activa “Sitio para computadoras” o “Versión de escritorio”.';

  return (
    <div className="desktop-view-prompt" role="dialog" aria-modal="true" aria-labelledby="desktop-view-title">
      <div className="desktop-view-prompt__card">
        <p className="desktop-view-prompt__eyebrow">RECOMENDACIÓN</p>
        <h2 id="desktop-view-title">Disfruta la invitación en vista de escritorio</h2>
        <p>
          Para apreciar mejor los detalles, las animaciones y el video, te recomendamos abrir la versión de escritorio.
        </p>
        <div className="desktop-view-prompt__steps">
          <span>1</span>
          <p>{instructions}</p>
        </div>
        <button type="button" className="desktop-view-prompt__button" onClick={dismissPrompt}>
          CONTINUAR EN MÓVIL
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Home />
      <DesktopViewPrompt />
    </div>
  );
}

export default App;
