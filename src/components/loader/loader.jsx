import "./loader.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Loader() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(true);
    }, 5000); 

    return () => clearTimeout(timer); // Nettoyage du timer si le composant est démonté
  }, []);

  if (error) {
    return <div className="loader-error">
      <div>
        <Link to="#" onClick={() => window.history.back()} className="back-link back-link--loader">
          <span>&lt;</span> Retour
        </Link>
      </div>
      <p className="loader-error-text">Erreur lors du chargement</p>
    </div>;
  }

  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <span className="loader-text">Chargement...</span>
    </div>
  );
}

export default Loader;
