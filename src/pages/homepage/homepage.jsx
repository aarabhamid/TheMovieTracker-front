import React, { useState, useEffect, useRef } from "react";
import instanceAxios from "../../utils/axios";
import MovieCard from "../../components/movieCard/movieCard";
import PersonCard from "../../components/personCard/personcard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homepage.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import SearchBar from "../../components/searchbar/searchbar";

function SliderComponent() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [person, setPerson] = useState([]);
  const movieSliderRef = useRef(null);
  const tvSliderRef = useRef(null);
  const personSliderRef = useRef(null);
  

  const fetchData = async () => {
    try {
      const response = await instanceAxios.get("/movies");
      const tvResponse = await instanceAxios.get("/tv");
      const personResponse = await instanceAxios.get("/person");
      setPerson(personResponse.data.results);
      setTvShows(tvResponse.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 10,
    slidesToScroll: 10,
    arrows: false, // Désactive les flèches par défaut du slider
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="section-slider">

      <SearchBar />

      <div className="title-and-arrows">
        <h2>Les films de la semaine</h2>
        <div className="arrows">
          <GrPrevious onClick={() => movieSliderRef.current.slickPrev()} />
          <GrNext onClick={() => movieSliderRef.current.slickNext()} />
        </div>
      </div>
      <div style={{ padding: "0 50px" }}>
        <Slider ref={movieSliderRef} {...settings}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="title-and-arrows">
        <h2>Les séries de la semaine</h2>
        <div className="arrows">
          <GrPrevious onClick={() => tvSliderRef.current.slickPrev()} />
          <GrNext onClick={() => tvSliderRef.current.slickNext()} />
        </div>
      </div>
      <div style={{ padding: "0 50px" }}>
        <Slider ref={tvSliderRef} {...settings}>
          {tvShows.map((show) => (
            <div key={show.id}>
              <MovieCard movie={show} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="title-and-arrows">
        <h2>Les artistes de la semaine</h2>
        <div className="arrows">
          <GrPrevious onClick={() => personSliderRef.current.slickPrev()} />
          <GrNext onClick={() => personSliderRef.current.slickNext()} />
        </div>

      </div>
      
      <div style={{ padding: "0 50px" }}>
        <Slider ref={personSliderRef} {...settings}>
          {person.map((person) => (
            <div key={person.id}>
              <PersonCard person={person} />
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
}

export default SliderComponent;
