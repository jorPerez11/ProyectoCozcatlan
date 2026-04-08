import React from 'react';
import logo from '../../assets/logo-cozcatlan.png'; 

export const TermsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between mb-10 pb-6 border-b border-[#0F243B]/10">
      <h1 className="font-['Prompt'] text-[#0F243B] text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left mb-6 md:mb-0 [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff]">
        Términos y Condiciones
      </h1>
      <img 
        src={logo} 
        alt="Cōzcatlan - El sabor de tu hogar" 
        className="h-20 w-auto object-contain" 
      />
      
    </div>
  );
};