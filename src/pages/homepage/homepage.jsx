import "./homepage.css";
import SearchBar from "../../components/searchbar/searchbar";
import banner from "../../assets/banner-modified.JPG"; 

function HomepageComponent() {


  return (
  <div className="homepage">
    <div className="search-bar-container">
      <SearchBar />
    </div>

    <div className="banner">
      <img
        src={banner}
        alt="Image de présentation du site"
        className="banner-image"
      />
      <div className="banner-overlay"></div> 
      <div className="banner-text">
        The Movie Tracker <br />
        <span className="banner-text-span">Des millions de films, séries et artistes... </span>
      </div>
    </div>

  </div>
);



}

export default HomepageComponent;
