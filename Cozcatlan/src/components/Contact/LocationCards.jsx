import React from 'react';
import mapCentro from '../../assets/mapa-centro.png';
import mapAero from '../../assets/mapa-aero.png';

export const LocationCards = () => {
  return (
    <div className="mb-12">
      <h2 className="font-['Prompt'] !text-[#0E7800] text-2xl mb-6">Nuestras ubicaciones</h2>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img src={mapCentro} alt="Centro Histórico" className="w-full mb-2" />
        </div>
        <div className="col-12 col-md-6">
          <img src={mapAero} alt="Aeropuerto" className="w-full mb-2" />
        </div>
      </div>
    </div>
  );
};