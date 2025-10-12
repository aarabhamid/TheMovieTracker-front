import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import instanceAxios from "../../utils/axios";

import "./moviepage.css";

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await instanceAxios.get(`/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

   return (
  <div className="movie-page">
    <div className="movie-backdrop-container">
      <img
        className="movie-backdrop"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <div className="movie-content">
        <div className="movie-poster-container">
          <img
            className="movie-poster-image"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <h2>Similar Movies</h2>
        </div>
      </div>
    </div>
  </div>
);

}

export default MoviePage;
