import React from 'react';

const PrimaryButton = ({ text, onClick, type = "submit", disabled = false }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className="btn btn-orange w-100 py-3 fw-bold text-white shadow"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;