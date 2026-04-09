import React from "react";
const CardNotification = ({ icon1, icon2, icon3, numberOrder, orderDate, namePerson, address, iconSelect }) => {
    return (

        <div className="card container-main   shadow-sm">
            <div className="card-body p-2">
                <div className="container-CardNotification">
                    <img src={icon1} alt="icono1" />
                    <span className="fw-bold">{numberOrder}</span>
                    <img src={icon2} alt="icono2" />
                    <span className="fw-bold">{orderDate}</span>
                    <img src={icon3} alt="icono3" />
                    <span className="fw-bold">{namePerson}</span>
                </div>

                <div className="container-address-row">
                    <p className="address-text">{address}</p>
                    <a href="#" className="selecet-arrow"><img src={iconSelect} alt="IconoSelect" /></a>
                </div>
            </div>
        </div>






    );

};

export default CardNotification;