import React from "react";

const SearchButton = () => {
    return (

    <form className="w-full max-w-2xl mx-auto px-2">
    {/* Cambiamos a flex-col en móvil y flex-row en tablets/desktop */}
    <div className="flex flex-col md:flex-row shadow-xs rounded-base space-y-2 md:space-y-0 md:-space-x-0.5">
        
        {/* Contenedor del Dropdown */}
        <div className="relative flex shrink-0">
            <button 
                id="dropdown-button" 
                data-dropdown-toggle="dropdown" 
                type="button" 
                className="w-full md:w-auto inline-flex items-center justify-center z-10 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base md:rounded-s-base md:rounded-e-none text-sm px-4 py-2.5 focus:outline-none"
            >
                <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                </svg>
                <span className="truncate">Categoría</span>
                <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div id="dropdown" className="z-20 hidden absolute top-full left-0 mt-1 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                <ul className="p-2 text-sm text-body font-medium">
                    <li><a href="#" className="block p-2 hover:bg-neutral-tertiary-medium rounded-md">Shopping</a></li>
                    <li><a href="#" className="block p-2 hover:bg-neutral-tertiary-medium rounded-md">Images</a></li>
                </ul>
            </div>
        </div>

        {/* Input de Búsqueda */}
        <div className="relative w-full flex">
            <input 
                type="search" 
                className="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body rounded-base md:rounded-none" 
                placeholder="Buscar un producto..." 
                required 
            />
            
            {/* Botón Buscar */}
            <button 
                type="button" 
                className="inline-flex items-center text-black bg-brand hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium font-medium rounded-base md:rounded-s-none md:rounded-e-base text-sm px-4 py-2.5 focus:outline-none"
            >
                <svg className="w-4 h-4 md:me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <span className="hidden md:inline">Buscar</span>
            </button>
        </div>
    </div>
</form>


    );

};

export default SearchButton;