import React from "react";

export const Button = ({ text }) => {
  return (
    <button className="!inline-flex !items-center !justify-center !rounded-md !bg-[#76E1ED] !font-semibold !text-[#0F243B] !border-2 !border-[#06CFF2] !transition-all !duration-300 !m-0 !font-['Montserrat']
      /* TALLA MÓVIL */
      !text-[12px] !px-3 !py-1
      /* TALLA TABLET */
      md:!text-sm md:!px-4 md:!py-2
      /* TALLA DESKTOP */
      lg:!text-base lg:!px-8 lg:!py-3">
      {text}
    </button>
  );
};
export default Button;