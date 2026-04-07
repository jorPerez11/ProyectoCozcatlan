import React from 'react';
import heroDesktop from '../../assets/heroPupusas1.png';
import heroMobile from '../../assets/hero.png';

export const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
      <picture>
        {/* Si la pantalla es mayor a 768px, usa la versión de escritorio */}
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        {/* Por defecto (móvil), usa la versión cuadrada */}
        <img 
          src={heroMobile} 
          className="w-full h-auto" 
          alt="Cozcatlan - El sabor de tu hogar" 
        />
      </picture>
    </section>
  );
};