import { Link } from "react-router-dom";
import css from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className={css.container}>
      <Link to={`/movies/${movie.id}`}>
        {movie.poster_path && (
          <img src={imageUrl + movie.poster_path} className={css.img} />
        )}

        <p className={css.title}>{movie.title}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
