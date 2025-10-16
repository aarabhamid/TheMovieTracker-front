import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import MovieCard from "../../components/movieCard/movieCard";
import "./upcomingmovies.css";  

function UpcomingMovies() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const response = await instanceAxios.get("/upcoming/movies");
                setUpcomingMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
            }
        };

        fetchUpcomingMovies();
    }, []);

    return (
        <div className="upcoming-movies">
            <h1>Films à venir</h1>
            <div className="movie-list">
                {upcomingMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
export default UpcomingMovies;