import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import instanceAxios from "../../utils/axios";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaRegPlayCircle } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import PersonCard from "../../components/personCard/personcard";
import GalleryImages from "../../components/galleryImages/galleryImages";
import 'react-circular-progressbar/dist/styles.css';
import "./moviepage.css";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await instanceAxios.get(`/movies/${id}`);
        const videoResponse = await instanceAxios.get(`/movies/${id}/videos`);
        setMovie(response.data);
        if (videoResponse.data.length > 0) {
          setMovieVideo(videoResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!movie || !movieVideo) {
    return <div>Loading...</div>;
  }

  const formattedRating = movie.vote_average.toFixed(1) * 10;
  const rating = parseFloat(formattedRating);

  let strokeColor;
  if (rating < 50) strokeColor = 'red';
  else if (rating < 70) strokeColor = '#cdcf2f';
  else strokeColor = '#21d07a';

  return (


    <div className="movie-page">

      <div className="movie-backdrop-container">

        <div>
          <Link to="#" onClick={() => window.history.back()} className=" back-link--movie back-link">
             <span>&lt;</span> Retour
          </Link>
        </div>

        <img className="movie-backdrop"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

        <div className="movie-content">

          <div className="movie-poster-container">
            <img
              className="movie-poster-image"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="movie-details">
            <h1>{movie.title} <span className="movie-title-date">({movie.release_date.split("-")[0]})</span></h1>
            <ul className="movie-info">
              <li>{movie.release_date}</li>
              <li>{movie.genres.map(genre => genre.name).join(", ")}</li>
              <li>{movie.runtime} min</li>
              <li>
                {movie.origin_country.map((countryCode, index) => (
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
            <p className="movie-original-title">Titre d'origine : {movie.original_title}</p>

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
                <button onClick={openModal}><span className="trailer-button-play"><FaRegPlayCircle /></span>Voir la bande-annonce</button>
              </div>

            </div>

            <div className="movie-synopsis">
              <p>Synopsis :</p>
              <p className="movie-overview">{movie.overview}</p>
            </div>

            <div className="movie-tagline">
              <p>{movie.tagline}</p>
            </div>

            <div className="movie-crew">

              <h2>Équipe</h2>

              <div className="crew-list">
                {movie.credits.crew.slice(0, 4).map((member) => (
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
        <h2>Têtes d'affiche</h2>
        <div className="casting-list">
          {movie.credits.cast.slice(0, 10).map((cast) => (
            <PersonCard
              key={cast.id}
              person={cast}
              personName={cast.name}
              character={cast.character} // Passe le nom du personnage
            />
          ))}
        </div>
      </div>

      <div className="section-gallery-images">
        <h2>Posters</h2>
        <GalleryImages movieId={id} />
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
                src={`https://www.youtube.com/embed/${movieVideo.key}?autoplay=1`}
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

export default MoviePage;
