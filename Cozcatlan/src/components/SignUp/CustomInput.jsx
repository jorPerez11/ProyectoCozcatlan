import React from 'react';

const CustomInput = ({ label, type = "text", placeholder, icon }) => {
  return (
    <div className="mb-3 text-start">
      <label className="form-label small fw-bold text-secondary mb-1">
        {label}
      </label>
      <div className="input-group">
        {icon && <span className="input-group-text bg-light border-end-0">{icon}</span>}
        <input 
          type={type} 
          className={`form-control custom-input ${icon ? 'border-start-0' : ''}`} 
          placeholder={placeholder} 
        />
      </div>
    </div>
  );
};

export default CustomInput;