import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import MovieCard from "../../components/movieCard/movieCard";
import SearchBar from "../../components/searchbar/searchbar";

function TrendingTvWeek() {
    const [trendingTvShows, setTrendingTvShows] = useState([]);

    useEffect(() => {
        const fetchTrendingTvShows = async () => {
            try {
                const response = await instanceAxios.get("/tv");
                setTrendingTvShows(response.data.results);
            } catch (error) {
                console.error("Error fetching trending TV shows:", error);
            }
        };

        fetchTrendingTvShows();
    }, []);

    return (
        <div>
            <div className="search-bar-container">
                <SearchBar />
            </div>

            <div className="trending-tv-week">
                <h2>Tendances de la semaine</h2>
                <div className="movie-list">
                    {trendingTvShows.map((show) => (
                        <MovieCard key={show.id} movie={show} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TrendingTvWeek;
