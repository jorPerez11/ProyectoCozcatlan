import React from 'react';

export const PromiseSection = () => {
  return (
    <section className="bg-[#F1F6DF] pb-16 pt-0 px-6 md:px-12 lg:px-32 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="!text-[#0E7800] font-['Prompt'] font-semibold text-3xl lg:text-4xl mb-4 text-center">
          Nuestra promesa
        </h2>
        
        <p className="text-[#0F243B] font-['Montserrat'] text-sm md:text-base lg:text-[18px] text-justify leading-relaxed">
          "No importa cuántos kilómetros te separen de El Salvador, queremos que al abrir un paquete de Cōzcatlan, el aroma te haga sentir, por un momento, que finalmente has vuelto a casa."
        </p>
      </div>
    </section>
  );
};