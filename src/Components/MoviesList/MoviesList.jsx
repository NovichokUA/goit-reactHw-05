import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div>
      <ul>
        {movies &&
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MovieList;
