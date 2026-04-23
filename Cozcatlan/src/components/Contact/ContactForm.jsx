import React from 'react';

export const ContactForm = () => {
  return (
    <div className="bg-[#D9E9BE] p-8 rounded-[30px] shadow-sm">
      <form className="font-['Montserrat']">
        
        <div className="mb-4 text-start">
          <label className="block mb-2 text-[#0F243B] font-medium ml-1">
            Nombre completo
          </label>
          <input 
            type="text" 
            className="form-control border-2 border-[#CACEC7] py-3 px-4 !rounded-[15px] font-['Montserrat'] placeholder:text-gray-400 focus:ring-2 focus:ring-[#0E7800]" 
            placeholder="Ingresa tu nombre completo" 
          />
        </div>

        <div className="mb-4 text-start">
          <label className="block mb-2 text-[#0F243B] font-medium ml-1">
            Correo electrónico
          </label>
          <input 
            type="email" 
            className="form-control border-2 border-[#CACEC7] py-3 px-4 !rounded-[15px] font-['Montserrat'] placeholder:text-gray-400 focus:ring-2 focus:ring-[#0E7800]" 
            placeholder="Ingresa tu correo electrónico" 
          />
        </div>

        <div className="mb-6 text-start">
          <label className="block mb-2 text-[#0F243B] font-medium ml-1">
            Mensaje
          </label>
          <textarea 
            className="form-control border-2 border-[#CACEC7] py-3 px-4 !rounded-[20px] font-['Montserrat'] placeholder:text-gray-400 focus:ring-2 focus:ring-[#0E7800]" 
            rows="6" 
            placeholder="Ingresa tu mensaje"
          ></textarea>
        </div>

        <div className="text-end">
          <button 
            type="submit" 
            className="bg-[#E78341] text-white px-10 py-2 !rounded-[15px] font-['Montserrat'] font-semibold hover:bg-[#d67232] transition-colors shadow-md"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};