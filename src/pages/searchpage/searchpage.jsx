import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import instanceAxios from "../../utils/axios";
import SearchBar from "../../components/searchbar/searchbar";
import PersonCard from "../../components/personCard/personcard";
import MovieCard from "../../components/movieCard/movieCard";
import "./searchpage.css";

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromUrl = searchParams.get("query") || "";
    const [query, setQuery] = useState(queryFromUrl);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const response = await instanceAxios.get(`/search?q=${query}`);
                    setResults(response.data.results || []);
                } catch (error) {
                    console.error("Erreur lors de la recherche :", error);
                    setResults([]);
                }
            }
        };
        fetchData();
    }, [query]);

    // Met à jour l'URL quand la query change (optionnel, pour la cohérence)
    useEffect(() => {
        if (query) {
            setSearchParams({ query });
        }
    }, [query, setSearchParams]);

   return (
    <div  className="search-page">
        <SearchBar query={query} setQuery={setQuery} />
        {query && (
            <>
                <h1>Résultats pour "{query}"</h1>

                

               
                <div className="results-lists-container">
                    {results.length > 0 ? (
                        results.map((result) => {
                            if (result.media_type === "person")
                                return <PersonCard key={result.id} person={result} />;
                            else if (result.media_type === "movie" || result.media_type === "tv")
                                return <MovieCard key={result.id} movie={result} />;
                            return null;
                        })
                    ) : (
                        <p>Aucun résultat trouvé pour "{query}".</p>
                    )}
                </div>

                 
            </>
        )}
    </div>
);

}

export default SearchPage;
