import React from 'react';
import { Button } from './Button';
import { useNavigate } from 'react-router';
import imgWelcome1 from '../../assets/pupusas-salvadorenas.jpg';
import imgWelcome2 from '../../assets/riguas.jpg';

export const WelcomeSection = () => {
  const navigate = useNavigate();

  const handleProductsClick = () => {
    navigate('/products');
  };
  return (
    <section className="container-fluid py-5 bg-[#F1F6DF]">
      <div className="container">
        <div className="row align-items-center g-5">

          <div className="col-12 col-lg-6 font-['Montserrat']">
            <div className="col-12 font-['Montserrat']">
              <h2 className="!font-title !font-semibold !tracking-tight !text-[#0E7800] text-4xl md:text-6xl lg:text-9xl mb-3 lg:text-start text-lg-start">
                Bienvenidos a Cōzcatlan
              </h2>
              <p className="text-[#0F243B] mb-5 text-[14px] sm:text-base md:text-base lg:text-xl leading-relaxed text-justify mx-auto lg:mx-0 max-w-md md:max-w-xl lg:max-w-none !mb-5 p-0">
                Es un placer para nosotros dar a conocer nuestro país  con nuestro sazón tradicional que viene impregnado con nuestra historia, compartiendo el sabor de nuestro hogar a todas partes.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                <Button text="Ver Productos" onClick={handleProductsClick}/>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 !mt-8">
            <div className="d-flex align-items-center justify-content-center gap-4">
              <div className="w-[200px] md:w-[250px]">
                <img
                  src={imgWelcome1}
                  alt="Pupusas"
                  className="w-full aspect-[3/4] object-cover shadow-lg"
                />
              </div>

              <div className="w-[160px] md:w-[210px]">
                <img
                  src={imgWelcome2}
                  alt="Riguas"
                  className="w-full aspect-[3/4] object-cover shadow-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};