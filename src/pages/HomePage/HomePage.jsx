import { useEffect, useState } from "react";

import MovieList from "../../components/MoviesList/MoviesList";
import { GetMoviesPopular } from "../../MovieApi";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { Spiner } from "../../components/Spiner/Spiner.jsx";

function HomePages() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const response = await GetMoviesPopular(page);
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
        setTotalPage(response.total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [page]);

  const handalLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <MovieList movies={movies} />

      {movies.length > 0 && !isLoading && totalPage !== page && (
        <LoadMoreBtn onClick={handalLoadMore} />
      )}

      {isLoading && <Spiner />}

      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export default HomePages;
