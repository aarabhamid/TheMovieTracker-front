import './personpage.css';
import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/movieCard/movieCard";
import GalleryImages from '../../components/galleryImages/galleryImages';

function PersonPage() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const personResponse = await instanceAxios.get(`/person/${id}`);
                setPerson(personResponse.data);
  
            } catch (error) {
                console.error("Error fetching person data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!person) {
        return <div>Loading...</div>;
    }

    return (
        <div >

            <div className="person-page">

                <div className='person-profile_path'>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                        alt={person.name} />
                </div>


                <div className='person-info'>
                    <h1>{person.name} </h1>

                    <ul className="person-info-details">
                        <li> {person.birthday}</li>
                        <li>{person.place_of_birth}</li>
                    </ul>

                    <p className={`person-department person-department--${person.known_for_department}`}>
                        {person.known_for_department}
                    </p>

                    <div className='person-biography'>
                        <h2>Biographie</h2>
                        <p>{person.biography || "Biographie non disponible."}</p>
                    </div>

                </div>




            </div>

            <div className='separate-section'>

                <span ></span>
            </div>

            <div className='section-gallery-images'>
                <h2>Galerie d'images</h2>
                <GalleryImages personId={id} />
            </div>

            <div className='person-movies'>
                <h2>Films et Séries Associés</h2>
                <div className='person-movies-list'>
                    {person.credits.cast.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default PersonPage;
