import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import Loader from "../../components/loader/loader";
import MovieCard from "../../components/movieCard/movieCard";
import SearchBar from "../../components/searchbar/searchbar";

function TrendingMovieWeek() {
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await instanceAxios.get("/movies");
                setTrendingMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };

        fetchTrendingMovies();
    }, []);

    if (!trendingMovies) {
        return <Loader />;
    }

    return (
        <div>
            <SearchBar />
        
        <div className="trending-movie-week">
            <h2>Tendances de la semaine</h2>
            <div className="movie-list">
                {trendingMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
         </div>
    );
}

export default TrendingMovieWeek;
