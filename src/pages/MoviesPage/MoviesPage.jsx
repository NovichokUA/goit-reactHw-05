import { useEffect, useState } from "react";
import { searchMovie } from "../../MovieApi";
import MovieList from "../../components/MoviesList/MoviesList";
import toast, { Toaster } from "react-hot-toast";
import { Spiner } from "../../components/Spiner/Spiner.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

import css from "./MoviesPage.module.css";

import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

function MoviesPage() {
  const [choiceMovie, setChoiceMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useSearchParams();

  const value = params.get("query") ?? "";
  // change
  const getValue = (e) => {
    e.preventDefault();
    const form = e.target;

    const valueInput = form.elements.query.value;
    params.set("query", valueInput);
    setParams(params);

    if (valueInput.trim() === "") {
      params.set("query", "");
      return toast.error("Please enter a search word.", { duration: 1500 });
    }

    setPage(1);
    setChoiceMovie([]);
    setTotalPage(0);
    form.reset();
  };

  useEffect(() => {
    async function GetSearchMovie() {
      if (!value) return;
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchMovie(value, page);

        setChoiceMovie((prevData) => [...prevData, ...data.data.results]);
        setTotalPage(data.data.total_pages);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    GetSearchMovie();
  }, [value, page]);

  const handalLoadMore = () => {
    setPage(page + 1);
  };

  const containerStyle = {
    top: "40px",
  };

  return (
    <div>
      <form onSubmit={getValue} className={css.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movie"
          autoComplete="off"
          autoFocus
          className={css.inp}
        />
        <button className={css.btn} type="submit">
          <FiSearch size="16px" />
        </button>
      </form>

      <MovieList movies={choiceMovie} />

      {choiceMovie &&
        choiceMovie.length > 0 &&
        !isLoading &&
        totalPage !== page && <LoadMoreBtn onClick={handalLoadMore} />}

      <Toaster
        containerStyle={containerStyle}
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "8px",
            letterSpacing: "0.03em",
            fontWeight: "300",
            color: "var(--color-dark)",
            fontSize: "var(--font-medium)",
          },
        }}
        reverseOrder={false}
      />

      {isLoading && <Spiner />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export default MoviesPage;
