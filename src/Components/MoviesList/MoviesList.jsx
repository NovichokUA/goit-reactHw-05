import { Link, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import { nanoid } from "nanoid";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.container}>
        {movies &&
          movies.map((movie) => {
            let id = nanoid();
            return (
              <li key={id}>
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
