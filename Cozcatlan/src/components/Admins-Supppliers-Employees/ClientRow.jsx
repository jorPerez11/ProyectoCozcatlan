const ClientsRow = ({ title, subtitle, onEdit }) => {
  return (
    <div className="cozca-item-container">
      <div className="row align-items-center py-3 px-4 cozca-list-row mx-0">
        <div className="col-10 text-start">
          <h3 className="h5 cozca-text-primary mb-1">{title}</h3>
          <p className="cozca-text-secondary mb-0">{subtitle}</p>
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center">
          <button className="btn-icon-edit" onClick={onEdit} title="Editar">
            <svg width="35" height="35" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.16" d="M6.66667 26.2859L5 32.9526L11.6667 31.2859L28.3333 14.6193L23.3333 9.61926L6.66667 26.2859Z" fill="#E57937"/>
              <path d="M23.3333 9.61929L28.3333 14.6193M20 32.9526H33.3333M6.66667 26.286L5 32.9526L11.6667 31.286L30.9767 11.976C31.6016 11.3509 31.9526 10.5032 31.9526 9.61929C31.9526 8.73541 31.6016 7.88771 30.9767 7.26262L30.69 6.97595C30.0649 6.35105 29.2172 6 28.3333 6C27.4495 6 26.6018 6.35105 25.9767 6.97595L6.66667 26.286Z" stroke="#E57937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="cozca-list-divider"></div>
    </div>
  );
};

export default ClientsRow;