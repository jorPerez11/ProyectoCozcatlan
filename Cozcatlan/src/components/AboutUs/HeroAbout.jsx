import React from 'react';
import bannerBg from '../../assets/banner-pattern.png';

export const HeroAbout = () => {
    return (
        <div
            className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] bg-cover bg-center flex items-center justify-center shadow-md"
            style={{ backgroundImage: `url(${bannerBg})` }}
        >

            <h1 className="relative z-10 
               font-['Montserrat'] !font-bold text-center
               /* Forzamos los tamaños con ! */
               !text-xl md:!text-3xl lg:!text-5xl
               /* Color y espaciado */
               text-[#0F243B] px-6 leading-tight
               /* borde blanco perfecto */
               [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff]">
                Sobre Nosotros: El Corazón de Cōzcatlan
            </h1>
        </div>
    );
};