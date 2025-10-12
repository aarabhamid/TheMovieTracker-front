import "./movieCard.css";
import { Link } from "react-router-dom";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function MovieCard({ movie }) {
    // Formater la note avec un seul chiffre après la virgule, multiplier par 10 pour pourcentage
    const formattedRating = movie.vote_average.toFixed(1) * 10;
    const movieTitle = (movie.title || movie.original_name).toUpperCase();
    const rating = parseFloat(formattedRating);

    // Choix couleur bordure en fonction du score
    let strokeColor;
    if (rating < 50) strokeColor = 'red';
    else if (rating < 70) strokeColor = '#cdcf2f';
    else strokeColor = '#21d07a';

    // Fonction pour formater la date avec Intl.DateTimeFormat
    function formatDate(dateString) {
        if (!dateString) return "Date inconnue";
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(date);
    }

    const movieDate = formatDate(movie.release_date || movie.first_air_date);

    return (
        <div className="movie-card">
            <Link to={movie.title ? `/movies/${movie.id}` : `/tv/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', width: 100, height: 150 }}>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title || movie.original_name}
                        className="movie-poster"
                        style={{ width: '100%', height: '100%', display: 'block', borderRadius: '10px' }}
                    />
                    <div className="movie-rating" >
                        <CircularProgressbar
                            value={rating}
                            text={`${rating.toFixed(0)}%`}
                            styles={buildStyles({
                                pathColor: strokeColor,
                                textColor: 'white',
                                trailColor: 'gray',
                                pathTransitionDuration: 0.5,
                                textSize: '30px',
                            })}
                        />
                    </div>
                </div>
                <h3 className="movie-title">{movieTitle}</h3>
                <p className="movie-date">{movieDate}</p>
            </Link>
        </div>
    );
}

export default MovieCard;
