import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export const SocialLinks = () => {
  return (
    <div className="mt-10">
      <h2 className="font-['Prompt'] !text-[#0E7800] text-2xl mb-6 text-center md:text-left">Síguenos</h2>
      
      <div className="flex !justify-center md:justify-start gap-4 mb-10">
        {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, index) => (
          <div key={index} className="bg-[#0E7800] text-white p-3 rounded-full text-xl cursor-pointer hover:bg-[#0A5D00] transition-colors">
            <Icon />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center md:justify-start gap-4">
          <FaWhatsapp className="text-[#0E7800] text-3xl" />
          <span className="font-['Prompt'] text-[#0E7800] text-xl">+503 7831-4183</span>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <FaEnvelope className="text-[#0E7800] text-3xl" />
          <span className="font-['Prompt'] text-[#0E7800] text-xl">contacto@cozcatlan.com</span>
        </div>
      </div>
    </div>
  );
};