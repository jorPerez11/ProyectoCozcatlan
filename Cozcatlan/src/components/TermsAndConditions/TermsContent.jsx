import React from 'react';
import { termsData } from './termsData';

export const TermsContent = () => {
  return (
    <div className="font-['Montserrat'] text-[#0F243B] leading-relaxed text-justify">
      {/* Introducción*/}
      <p className="mb-8 font-medium text-[14px] md:text-[16px]">
        {termsData.intro}
      </p>

      <br />

      {termsData.sections.map((section) => (
        <div key={section.id} className="mb-8">
          {/* Títulos */}
          <h2 className="font-['Montserrat'] text-[#0F243B] !text-[16px] md:!text-[18px] !font-bold mb-4 leading-snug">
            {section.title}
          </h2>

          {/* Contenido */}
          {section.content && (
            <p className="text-[14px] text-[#0F243B] md:text-[16px] opacity-90 mb-4">
              {section.content}
            </p>
          )}

          {/* Listado con puntos */}
          {section.items && (
            <ul className="list-disc list-inside space-y-3 ml-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="text-[14px] text-[#0F243B] md:text-[16px] opacity-90 marker:text-[#0F243B]">
                  <span className="font-bold">
                    {item.label}:
                  </span>{" "}
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};