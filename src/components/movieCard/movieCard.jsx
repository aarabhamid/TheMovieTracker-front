import React from "react";
import "./movieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    // Formater la note avec un seul chiffre après la virgule
    const formattedRating = movie.vote_average.toFixed(1);
    const movieTitle = (movie.title || movie.original_name).toUpperCase();
    const rating = parseFloat(formattedRating);

    // Déterminer le style en fonction de la note
    const ratingStyle = {
        backgroundColor:
            rating < 6 ? 'red' :
            rating >= 5 && rating < 8 ? 'yellow' : 'green',
        color: rating < 8 ? 'black' : 'white' 
    };

    return (
        <div className="movie-card">
            <Link to={movie.title ? `/movies/${movie.id}` : `/tv/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative' }}>
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title || movie.original_name}
                    className="movie-poster"
                />
                <span className="movie-rating" style={ratingStyle}>
                    {formattedRating}
                </span>
            </div>
            <h3 className="movie-title">{movieTitle}</h3>
            </Link>
        </div>
    );
}

export default MovieCard;
