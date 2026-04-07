import React from "react";

export const Button = ({ text }) => {
    return (
        <button className="bg-[#78e4f3] hover:bg-[#5bc8d8] text-gray-800 font-semibold py-2 px-8 rounded-xl shadow-md transition-all">
            {text}
        </button>
    );
};

export default Button;