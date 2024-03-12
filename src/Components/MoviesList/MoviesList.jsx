import { Link, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.container}>
        {movies &&
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={location}>
                  {<MovieCard movie={movie} />}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MovieList;
