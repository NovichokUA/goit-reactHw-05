import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <div>
      {<img src={imageUrl + movie.poster_path} className={css.img} />}
      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
    </div>
  );
};

export default MovieCard;
