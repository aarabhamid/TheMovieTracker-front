import "./homepage.css";
import SearchBar from "../../components/searchbar/searchbar";

function HomepageComponent() {


  return (
  <div className="homepage">
    <div className="search-bar-container">
      <SearchBar />
    </div>

    <div className="banner">
      <img
        src="src/assets/banner-modified.JPG"
        alt="Image de présentation du site"
        className="banner-image"
      />
      <div className="banner-overlay"></div> {/* Calque de couleur */}
      <div className="banner-text">
        The Movie Tracker <br />
        <span className="banner-text-span">Des millions de films, séries et artistes... </span>
      </div>
    </div>

  </div>
);



}

export default HomepageComponent;
