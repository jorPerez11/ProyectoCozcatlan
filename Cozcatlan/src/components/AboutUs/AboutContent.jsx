import React from 'react';
import imgHistory from '../../assets/saco-granos.jpg'; 
import imgPilares from '../../assets/comal-barro.png'; 

export const AboutContent = () => {
  return (
    <section className="bg-[#F1F6DF] py-5 lg:py-6 font-['Montserrat'] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-32">
        
        <div className="row align-items-center mb-6 lg:mb-10 g-5">
          <div className="col-12 col-lg-8">
            <p className="text-[#0F243B] text-sm md:text-base lg:text-[18px] leading-relaxed text-justify">
              Todo comenzó en 2018, en la sala de espera de un aeropuerto. Observamos cómo las maletas de los salvadoreños no solo iban llenas de ropa, sino cargadas de olor a café, semita, bolsas de relajo y el deseo profundo de llevarse un pedacito de su tierra en el equipaje.
            </p>
            <br />
            <p className="text-[#0F243B] text-sm md:text-base lg:text-[18px] leading-relaxed text-justify mt-6">
              Entendimos que el "hermano lejano" no solo extraña a su gente; extraña el ritual de la cocina. Surgimos con la misión de eliminar las fronteras para que nadie tenga que recorrer diez tiendas distintas para encontrar ese sabor exacto que le recuerda a su infancia. <strong>Cōzcatlan nace para ser el puente directo entre el campo salvadoreño y tu mesa, estés donde estés.</strong>
            </p>
          </div>
          <div className="col-12 col-lg-4">
            <img 
              src={imgHistory} 
              alt="Historia Cozcatlan" 
              className="w-full shadow-lg object-cover h-[250px] md:h-[300px] lg:h-[320px]" 
            />
          </div>
        </div>

        {/* Bloque 2: Pilares */}
        <div className="row align-items-center mb-12 g-5">
          <div className="col-12 col-lg-4 order-2 order-lg-1">
            <img 
              src={imgPilares} 
              alt="Artesanías Salvadoreñas" 
              className="w-full shadow-lg object-cover h-[250px] md:h-[300px] lg:h-[370px]" 
            />
          </div>
          <div className="col-12 col-lg-8 order-1 order-lg-2">
            <p className="text-sm md:text-base lg:text-[18px] text-[#0F243B] text-justify leading-relaxed">
              En Cōzcatlan, no solo vendemos productos; preservamos nuestra cultura a través de tres pilares fundamentales:
            </p>
            <br />
            <div className="space-y-6">
              <div>
                <p className="text-sm md:text-base lg:text-[18px] text-[#0F243B] text-justify leading-relaxed">
                  <strong>Sabor 100% Auténtico: </strong> Seleccionamos ingredientes cultivados en nuestras tierras, garantizando que el sabor sea el mismo que encontrarías en un mercado local de Santa Ana o San Miguel.
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base lg:text-[18px] text-[#0F243B] text-justify leading-relaxed"> 
                    <strong>Apoyo a lo Local: </strong> Nuestros proveedores son agricultores y artesanos salvadoreños. Al elegirnos, estás apoyando directamente el sustento de familias que mantienen vivas nuestras tradiciones.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-12">
            <p className="text-[#0F243B] text-sm md:text-base lg:text-[18px] leading-relaxed text-justify">
              <strong>Herramientas con Alma:</strong> Sabemos que una tortilla no sabe igual si no pasa por un comal de barro, y que el café tiene otro espíritu si se cuela en manta. Por eso, llevamos hasta tu puerta utensilios de aluminio fundido y madera tallada a mano.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};