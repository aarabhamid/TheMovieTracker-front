import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = (index, e) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo-header" src="./src/assets/TMT-size.PNG" alt="logo the movie tracker" />
                    <h2>The Movie Tracker</h2>
                </Link>
            </div>
            <button className="burger-button" onClick={toggleMenu}>
                <div className={`burger-bar ${isMenuOpen ? "open" : ""}`}></div>
                <div className={`burger-bar ${isMenuOpen ? "open" : ""}`}></div>
                <div className={`burger-bar ${isMenuOpen ? "open" : ""}`}></div>
            </button>
            <nav>
                <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
                    <li className="nav-item">
                        <h2 onClick={(e) => toggleDropdown(0, e)}>Films</h2>
                        <ul className={`dropdown ${openDropdown === 0 ? "mobile-open" : ""}`}>
                            <li><Link to="/movies/popular" onClick={toggleMenu}>Populaires</Link></li>
                            <li><Link to="/movies/top-rated" onClick={toggleMenu}>Mieux notés</Link></li>
                            <li><Link to="/movies/upcoming" onClick={toggleMenu}>À venir</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <h2 onClick={(e) => toggleDropdown(1, e)}>Séries</h2>
                        <ul className={`dropdown ${openDropdown === 1 ? "mobile-open" : ""}`}>
                            <li><Link to="/tvshows/popular" onClick={toggleMenu}>Populaires</Link></li>
                            <li><Link to="/tvshows/top-rated" onClick={toggleMenu}>Mieux notées</Link></li>
                            <li><Link to="/tvshows/airing-today" onClick={toggleMenu}>Diffusées aujourd'hui</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <h2 onClick={(e) => toggleDropdown(2, e)}>Artistes</h2>
                        <ul className={`dropdown ${openDropdown === 2 ? "mobile-open" : ""}`}>
                            <li><Link to="/artists/popular" onClick={toggleMenu}>Populaires</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
