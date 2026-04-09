import React from "react";

const CardDashboard = ({photo,title,subTitle}) => {
    return (
        <div className="cardContainer bg-neutral-primary-soft border border-default ">
            <div className="card-header">
                <img src={photo} alt="imagen" className="card-icon" />
                <h5 className="text-xl font-semibold tracking-tight ">{title}</h5>
            </div>
            <p className="textP ">{subTitle}</p>

        </div>




    );

};
export default CardDashboard;