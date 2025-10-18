import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import PersonCard from "../../components/personCard/personcard";
import SearchBar from "../../components/searchbar/searchbar";

function TrendingPersonWeek() {
    const [trendingPeople, setTrendingPeople] = useState([]);

    useEffect(() => {
        const fetchTrendingPeople = async () => {
            try {
                const response = await instanceAxios.get("/person");
                setTrendingPeople(response.data.results);
            } catch (error) {
                console.error("Error fetching trending people:", error);
            }
        };

        fetchTrendingPeople();
    }, []);

    return (
        <div>
            <SearchBar />

        <div className="trending-person-week">
            <h2>Artistes tendances de la semaine</h2>
            <div className="movie-list">
                {trendingPeople.map((person) => (
                    <PersonCard key={person.id} person={person} />
                ))}
            </div>
        </div>
         </div>
    );
}

export default TrendingPersonWeek;
