import "./errorpage.css";
import image from "../../assets/error.JPG"
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-page">

        <div className="error-image">
            <img src={image} alt="image erreur 404" />
        </div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="#" onClick={() => window.history.back()} className="back-link">
             <span>&lt;</span> Retour
          </Link>
    </div>
  );
}

export default ErrorPage;   