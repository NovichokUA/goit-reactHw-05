import { useEffect, useState } from "react";
import { searchMovie } from "../../MovieApi";
import MovieList from "../../Components/MoviesList/MoviesList";
import toast, { Toaster } from "react-hot-toast";
import { Spiner } from "../../Components/Spiner/Spiner.jsx";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../../Components/LoadMoreBtn/LoadMoreBtn.jsx";

import css from "./MoviesPage.module.css";

import { FiSearch } from "react-icons/fi";

function MoviesPage() {
  const [value, setValue] = useState("");
  const [choiceMovie, setChoiceMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getValue = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.choice.value;
    console.log(searchValue);
    if (form.elements.choice.value.trim() === "") {
      return toast.error("Please enter a search word.", { duration: 1500 });
    }

    setValue(searchValue);
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
        console.log(data);
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
          name="choice"
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

      {choiceMovie.length > 0 && !isLoading && totalPage !== page && (
        <LoadMoreBtn onClick={handalLoadMore} />
      )}

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
