import React from 'react';

// Importamos los componentes
import { HeroAbout } from '../components/AboutUs/HeroAbout.jsx';
import { AboutContent } from '../components/AboutUs/AboutContent.jsx';
import { PromiseSection } from '../components/AboutUs/PromiseSection.jsx';
import Navbar from '../components/PublicNavbar/Nav.jsx';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";

export const AboutUs = () => {
  return (
    <main className="animate-fade-in">
      <Navbar />
      
      <HeroAbout />

      <AboutContent />

      <PromiseSection />

      <CozcaFooter />

    </main>
  );
};

export default AboutUs;