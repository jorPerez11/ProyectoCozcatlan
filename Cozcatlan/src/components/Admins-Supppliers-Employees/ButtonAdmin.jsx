import React from "react";

const ButtonAdmin = ({ type, onClick, disabled, text, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      /* Combinamos las clases base con las que envíes (como btn-agregar-verde) */
      className={`btn fw-bold shadow-sm ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonAdmin;