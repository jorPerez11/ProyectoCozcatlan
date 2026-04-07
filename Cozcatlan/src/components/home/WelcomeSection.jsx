import React from 'react';

import { Button } from './Button'; // Importamos el boton

export const WelcomeSection = () => {
  return (
    <section className="bg-[#F1F6DF] py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Columna de Texto */}
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">Bienvenidos a Cōzcatlan</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Es un placer para nosotros dar a conocer nuestro país con nuestro sazón tradicional 
            que viene impregnado con nuestra historia, compartiendo el sabor de nuestro hogar 
            a todas partes.
          </p>
          <Button text="Ver Productos" />
        </div>

        {/* Columna de Imágenes (Mockup) */}
        <div className="flex gap-4 justify-center">
          <img src="../../assets/hero.png" className="w-40 h-60 object-cover rounded-lg shadow-lg" alt="Comida 1" />
          <img src="../../assets/hero.png" className="w-40 h-60 object-cover rounded-lg shadow-lg mt-8" alt="Comida 2" />
        </div>
      </div>
    </section>
  );
};