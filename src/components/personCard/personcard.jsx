import "./personcard.css";
import { Link } from "react-router-dom";


function PersonCard({ person }) {
    
    const personName = (person.name).toUpperCase();

    return (
        <div className="movie-card">
            <Link to={person.name ? `/person/${person.id}` : `/tv/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', width: 100, height: 150 }}>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                        alt={person.name}
                        className="movie-poster"
                        style={{ width: '100%', height: '100%', display: 'block', borderRadius: '10px' }}
                    />
                    

                </div>
                <span className="separate-line"></span>
                <h3 className="movie-title">{personName}</h3>
                <p className="person-know-for">{person.known_for.map((item) => item.title || item.name).join(", ")}</p>
            </Link>
        </div>
    );
}

export default PersonCard;
