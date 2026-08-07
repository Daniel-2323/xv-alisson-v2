import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero, IntroMessage, Countdown, WelcomeMessage, VideoSection, QuoteSection } from './components/sections/HeroAndIntro';
import { Gallery, Reception, DressCode, RSVP, Footer } from './components/sections/EventDetails';
import { FallingGoldParticles, MusicToggle } from './components/Effects';

const Home = () => {
  return (
    <div className="min-h-screen bg-[color:var(--bg-deep)] text-[color:var(--cream)] overflow-x-hidden relative">
      <FallingGoldParticles count={26} />
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
