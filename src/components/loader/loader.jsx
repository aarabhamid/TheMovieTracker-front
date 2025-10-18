import "./loader.css";
import { Link } from "react-router-dom";

function Loader() {
  return (
    <div className="loader">
<div>
          <Link to="#" onClick={() => window.history.back()} className=" back-link back-link--loader">
             <span>&lt;</span> Retour
          </Link>
        </div>

      <div className="loader-circle"></div>
      <span className="loader-text">Chargement...</span>
    </div>
  );
}

export default Loader;
