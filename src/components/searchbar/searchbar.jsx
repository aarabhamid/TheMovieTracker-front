import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./searchbar.css";

function SearchBar({ query, setQuery }) {
  const [queryState, setQueryState] = useState(query || "");

  useEffect(() => {
    setQueryState(query || "");
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setQuery(queryState); // Met à jour la prop query du parent
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recherche de films, séries, personnes..."
        value={queryState}
        onChange={(e) => setQueryState(e.target.value)}
      />
      <Link
        className="search-bar-button"
        to={`/search?query=${queryState}`}
        onClick={() => setQuery(queryState)}
      >
        Rechercher
      </Link>
    </form>
  );
}

export default SearchBar;
