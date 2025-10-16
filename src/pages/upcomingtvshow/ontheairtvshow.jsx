import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import MovieCard from "../../components/movieCard/movieCard";
import "./ontheairtvshow.css";  

function OnTheAirTVShows() {
    const [onTheAirTVShows, setOnTheAirTVShows] = useState([]);

    useEffect(() => {
        const fetchOnTheAirTVShows = async () => {
            try {
                const response = await instanceAxios.get("/on-the-air/tv");
                setOnTheAirTVShows(response.data.results);
            } catch (error) {
                console.error("Error fetching on-the-air TV shows:", error);
            }
        };

        fetchOnTheAirTVShows();
    }, []);

    return (
        <div className="on-the-air-tv-shows">
            <h1>En cours de diffusion</h1>
            <div className="movie-list">
                {onTheAirTVShows.map((show) => (
                    <MovieCard key={show.id} movie={show} />
                ))}
            </div>
        </div>
    );
}
export default OnTheAirTVShows;