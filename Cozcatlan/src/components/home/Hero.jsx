import React from 'react';
import heroDesktop from '../../assets/heroPupusas1.png';
import heroMobile from '../../assets/hero.png';

export const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
      <picture>
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        <img 
          src={heroMobile} 
          className="w-full h-auto" 
          alt="Cozcatlan - El sabor de tu hogar" 
        />
      </picture>
    </section>
  );
};