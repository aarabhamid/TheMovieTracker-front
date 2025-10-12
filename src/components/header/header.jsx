import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import "./header.css";

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
    <Link to="/">
       <img className="logo-header" src="./src/assets/TMT-size.PNG" alt="logo the movie tracker" />
        <h2>The Movie Tracker</h2>
    </Link>
</div>

            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <h2>Films</h2>
                        <ul className="dropdown">
                            <li><Link to="/movies/popular">Populaires</Link></li>
                            <li><Link to="/movies/top-rated">Mieux notés</Link></li>
                            <li><Link to="/movies/upcoming">À venir</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <h2>Séries</h2>
                        <ul className="dropdown">
                            <li><Link to="/tvshows/popular">Populaires</Link></li>
                            <li><Link to="/tvshows/top-rated">Mieux notées</Link></li>
                            <li><Link to="/tvshows/airing-today">Diffusées aujourd'hui</Link></li>
                        </ul>
                    </li>
                     <li className="nav-item">
                        <h2>Artistes</h2>
                        <ul className="dropdown">
                            <li><Link to="/artists/popular">Populaires</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}


export default Header;

