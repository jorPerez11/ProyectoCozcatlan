import React from 'react';

// Importamos los componentes
import { HeroAbout } from '../components/AboutUs/HeroAbout.jsx';
import { AboutContent } from '../components/AboutUs/AboutContent.jsx';
import { PromiseSection } from '../components/AboutUs/PromiseSection.jsx';

export const AboutUs = () => {
  return (
    /* div principal o un main para envolver toda la pantalla */
    <main className="animate-fade-in">
      
      {/* 1. El Banner con el título sobre el patrón salvadoreño */}
      <HeroAbout />

      {/* 2. La sección de historia y pilares con el diseño en zig-zag */}
      <AboutContent />

      {/* 3. El cierre con la promesa y el fondo crema */}
      <PromiseSection />

    </main>
  );
};

export default AboutUs;