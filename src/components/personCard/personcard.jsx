import "./personcard.css";
import { Link } from "react-router-dom";


function PersonCard({ person, character }) {
  return (
    <div className="movie-card">
      <Link to={`/person/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', width: 100, height: 150 }}>
          <img
            src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
            alt={person.name}
            className="movie-poster"
            style={{ width: '90%', height: '100%', display: 'block', borderRadius: '10px', justifyContent: 'center', padding : '2px' }}
          />
        </div>
        <span className="separate-line"></span>
        <h3 className="movie-title">{person.name}</h3>
        {character ? (
          <p className="person-know-for">{character}</p>
        ) : (
          <p className="person-know-for">
            {person.known_for?.map((item) => item.title || item.name).join(", ")}
          </p>
        )}
      </Link>
    </div>
  );
}


export default PersonCard;
