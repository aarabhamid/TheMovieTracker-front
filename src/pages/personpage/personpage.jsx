import './personpage.css';
import { useState, useEffect } from "react";
import instanceAxios from "../../utils/axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import MovieCard from "../../components/movieCard/movieCard";
import GalleryImages from '../../components/galleryImages/galleryImages';

function PersonPage() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [knowFor, setKnowFor] = useState([]);
   

     const personAge = (birthday) => {
        if (!birthday) return "Date de naissance inconnue";
        const birthDate = new Date(birthday);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return `${age} ans`;
    };

    
  useEffect(() => {
    const fetchData = async () => {
        try {
            const personResponse = await instanceAxios.get(`/person/${id}`);
            setPerson(personResponse.data);

            const formattedName = personResponse.data.name.split(" ").join("-");
            const knowForResponse = await instanceAxios.get(`/search?q=${formattedName}`);

            // Vérifie si results existe et contient un élément avec known_for
            if (knowForResponse.data.results && knowForResponse.data.results.length > 0) {
                const knownForData = knowForResponse.data.results[0].known_for;
                setKnowFor(Array.isArray(knownForData) ? knownForData : []);
            } else {
                setKnowFor([]); // Retourne un tableau vide si pas de données
            }

        } catch (error) {
            console.error("Error fetching person data:", error);
            setKnowFor([]); // Retourne un tableau vide en cas d'erreur
        }
    };

    fetchData();
}, [id]);


    
    

    if (!person) {
       return <Loader />;
    }




    return (
        <div >
            <div>
                <Link
  onClick={() => {
    window.history.back();
    window.scrollTo(0, 0);
  }}
  className="back-link--movie back-link"
>
  <span>&lt;</span> Retour
</Link>

            </div>
            <div className="person-page">
            

                <div className='person-profile_path'>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                        alt={person.name} />
                </div>


                <div className='person-info'>
                    <h1>{person.name} </h1>

                    <ul className="person-info-details">
                        <li>{personAge(person.birthday)}</li>
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

            <div className='section-know-for'>
                <h2>Célèbre pour :</h2>
                <div className='know-for-list'>
                    {Array.isArray(knowFor) && knowFor.length > 0 ? (
                        knowFor.map((item, index) => (
                            <div key={item.id || index} className='know-for-item'>
                                <MovieCard movie={item} />
                            </div>
                        ))
                    ) : (
                        <p>Aucune donnée disponible</p>
                    )}
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
