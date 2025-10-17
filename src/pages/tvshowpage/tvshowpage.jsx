import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instanceAxios from "../../utils/axios";
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactCountryFlag from "react-country-flag";
import PersonCard from "../../components/personCard/personcard";
import 'react-circular-progressbar/dist/styles.css';
import "./tvshowpage.css";

function TvShowPage() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [tvShowVideo, setTvShowVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        const response = await instanceAxios.get(`/tv/${id}`);
        const videoResponse = await instanceAxios.get(`/tv/${id}/videos`);
        setTvShow(response.data);
        if (videoResponse.data.length > 0) {
          setTvShowVideo(videoResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching tv show:", error);
      }
    };
    fetchTvShow();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!tvShow || !tvShowVideo) {
    return <div>Loading...</div>;
  }

  const formattedRating = tvShow.vote_average.toFixed(1) * 10;
  const rating = parseFloat(formattedRating);
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
  

  return (
    <div className="tv-show-page">
      <div className="movie-backdrop-container">
  <div>
          <Link to="#" onClick={() => window.history.back()} className=" back-link--movie back-link">
             <span>&lt;</span> Retour
          </Link>
        </div>


        <img className="movie-backdrop"
          src={`https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}`}
          alt={tvShow.name}
        />

        <div className="movie-content">
          <div className="movie-poster-container">
            <img
              className="movie-poster-image"
              src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
              alt={tvShow.name}
            />
          </div>
          <div className="movie-details">
            <h1>
              {tvShow.name} <span className="movie-title-date">({tvShow.first_air_date.split("-")[0]})</span>
            </h1>
            <ul className="movie-info">
              <li>{tvShow.first_air_date}</li>
              <li>{tvShow.genres.map(genre => genre.name).join(", ")}</li>
              <li>{tvShow.number_of_seasons + " saisons" }</li>
              <li>
                {tvShow.origin_country.map((countryCode, index) => (
                  <span key={index} style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{ width: '1.5em', height: '1.5em', marginRight: '4px' }}
                    />
                    {countryCode}
                  </span>
                ))}
              </li>
            </ul>

            <p className="movie-original-title">Titre d'origine : {tvShow.original_name}</p>
            
            <div className="movie-rating-score">
              <div className="movie-score">
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
              <p className="score-text">Score <br /> d'évaluation</p>
              <div className="trailer-button">
                <button onClick={openModal}>Voir la bande-annonce</button>
              </div>
            </div>
            <div className="movie-synopsis">
              <p>Synopsis :</p>
              <p className="movie-overview">{tvShow.overview}</p>
            </div>
            <div className="movie-tagline">
              <p>{tvShow.tagline}</p>
            </div>
            <div className="movie-crew">
              <h2>Équipe</h2>
              <div className="crew-list">
                {tvShow.credits?.crew.slice(0, 4).map((member) => (
                  <div key={member.id} className="crew-member">
                    <p className="crew-member-name">{member.name}</p>
                    <p className="crew-member-job">{member.job}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="casting-slider">
        <h2>Distribution des rôles</h2>
        <div className="casting-list">
          {tvShow.credits?.cast.slice(0, 10).map((cast) => (
            <PersonCard
              key={cast.id}
              person={cast}
              personName={cast.name}
              character={cast.character}
            />
          ))}
        </div>
      </div>

      <div className="seasons-section">
        <h3>Saisons</h3>
        <div className="seasons-list">
          {tvShow.seasons.map((season) => (
            <div key={season.id} className="season-card"> 

            <div>
              <img
                src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                alt={season.name}
                className="season-poster"
                />
            </div>



              <div className="season-details">
                <h3>{season.name}</h3>

                <ul>
                  <li>{season.episode_count} épisodes</li>
                   <li>{formatDate(season.air_date)}</li>
                </ul>

              <div className="season-overview">
                <p>{season.overview}</p>
              </div>
              
              </div>

            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <div className="video-container">
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${tvShowVideo.key}?autoplay=1`}
                title="Bande-annonce"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TvShowPage;
