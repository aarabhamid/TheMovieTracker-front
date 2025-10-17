import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import instanceAxios from "../../utils/axios";
import SearchBar from "../../components/searchbar/searchbar";
import PersonCard from "../../components/personCard/personcard";
import MovieCard from "../../components/movieCard/movieCard";
import "./searchpage.css";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const queryFromUrl = searchParams.get("query") || "";
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (queryFromUrl) {
                try {
                    const response = await instanceAxios.get(`/search?q=${queryFromUrl}`);
                    setResults(response.data.results || []);
                } catch (error) {
                    console.error("Erreur lors de la recherche :", error);
                    setResults([]);
                }
            }
        };
        fetchData();
    }, [queryFromUrl]);

    return (
        <div className="search-page">
            <SearchBar />
            {queryFromUrl && (
                <>
                    <h1>Résultats pour "{queryFromUrl}"</h1>
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
                            <p>Aucun résultat trouvé pour "{queryFromUrl}".</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchPage;
