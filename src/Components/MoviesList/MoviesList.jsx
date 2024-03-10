import MovieCard from "./MovieCard";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <div>
      <ul className={css.container}>
        {movies &&
          movies.map((movie) => {
            return <li key={movie.id}>{<MovieCard movie={movie} />}</li>;
          })}
      </ul>
    </div>
  );
}

export default MovieList;
