import React from 'react';
import './FinishBtn.css';

const FinishButton = ({ onClick, text }) => {
  return (
    <button 
      className="btn btn-finish-purchase w-100 d-flex justify-content-center align-items-center}"
      onClick={onClick}
    >
      <span>{text}</span>
      
    </button>
  );
};

export default FinishButton;