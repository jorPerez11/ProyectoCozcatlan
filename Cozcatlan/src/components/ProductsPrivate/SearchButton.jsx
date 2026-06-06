import { useState } from "react";
import './SearchButton.css';

const SearchButton = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, categories = [] }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleCategorySelect = (cat) => {
        onCategoryChange(cat);
        setDropdownOpen(false);
    };

    return (
        <div className="search-bar-wrapper">
            <div className="search-category-wrapper">
                <button
                    type="button"
                    className="search-category-btn"
                    onClick={() => setDropdownOpen(o => !o)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                    </svg>
                    {selectedCategory || "Categoría"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m19 9-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="search-dropdown">
                        <ul>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(""); }}>
                                    Todas
                                </a>
                            </li>
                            {categories.map(cat => (
                                <li key={cat}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelect(cat); }}>
                                        {cat}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <input
                type="search"
                className="search-input"
                placeholder="Buscar un producto..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <button type="button" className="search-submit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                Buscar
            </button>
        </div>
    );
};

export default SearchButton;
