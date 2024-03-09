import MovieList from "../../Components/MoviesList/MoviesList";
import { GetMoviesPopular } from "../../MovieApi";
import { useEffect, useState } from "react";

function HomePages() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getMovie() {
      try {
        const response = await GetMoviesPopular();
        setMovies(response);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, []);
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePages;
