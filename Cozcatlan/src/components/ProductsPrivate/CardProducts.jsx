import React from "react";

const CardProducts = ({ image1,stock,price,productInfo }) => {
    return (


        <div className="containerPrimary w-full max-w-sm  p-6 border border-default shadow-x¡">

            <img className="rounded-base mb-6" src={image1} alt="product imageProduct" />

            <div className="hola">
                <h5 className="text-xl text-heading font-semibold tracking-tight">{productInfo}</h5>

                <div className="flex items-center justify-between mt-6">
                    <span className="text-3xl  text-heading">{price}</span>
                    <button type="button" className="buttonUnit inline-flex items-center  text-white  hover:bg-brand-strong box-border border border-none focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 ">
                        <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" /></svg>
                        {stock}
                    </button>
                </div>
            </div>
        </div>


    );

};
export default CardProducts;