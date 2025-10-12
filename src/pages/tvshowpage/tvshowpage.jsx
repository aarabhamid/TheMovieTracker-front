import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import instanceAxios from "../../utils/axios";

import "./tvshowpage.css";

function TvShowPage() {
    const { id } = useParams();
    const [tvShow, setTvShow] = useState(null);

    useEffect(() => {
        const fetchTvShow = async () => {
            try {
                const response = await instanceAxios.get(`/tv/${id}`);
                setTvShow(response.data);
            } catch (error) {
                console.error("Error fetching tv show:", error);
            }
        };

        fetchTvShow();
    }, [id]);

    if (!tvShow) {
        return <div>Loading...</div>;
    }

   return (
  <div className="tv-show-page">
    <div className="movie-backdrop-container">
      <img
        className="movie-backdrop"
        src={`https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}`}
        alt={tvShow.title}
      />
      <div className="movie-content">
        <div className="movie-poster-container">
          <img
            className="movie-poster-image"
            src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
            alt={tvShow.title}
          />
        </div>
        <div className="movie-details">
          <h1>{tvShow.title}</h1>
          <p>{tvShow.overview}</p>
          <h2>Similar TV Shows</h2>
        </div>
      </div>
    </div>
  </div>
);

}

export default TvShowPage;
