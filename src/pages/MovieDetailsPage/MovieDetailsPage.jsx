import { useState, useEffect, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import clsx from "clsx";

import { DetailsMovieById } from "../../MovieApi";
import css from "./MovieDetailsPage.module.css";
import { Spiner } from "../../components/Spiner/Spiner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  const defaultImg =
    "https://amiel.club/uploads/posts/2022-03/1647643805_7-amiel-club-p-gomer-kartinki-7.jpg";

  useEffect(() => {
    async function GetMovieById() {
      try {
        setIsLoading(true);
        setError(false);
        const response = await DetailsMovieById(movieId);
        setMovie(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    GetMovieById();
  }, [movieId]);

  return (
    <div className={css.mainContainer}>
      <button className={css.btn}>
        <Link to={backLinkRef.current}>Go back</Link>
      </button>
      {movie && (
        <div className={css.container}>
          {
            <img
              src={
                movie.poster_path ? imageUrl + movie.poster_path : defaultImg
              }
              className={css.img}
            />
          }
          <div className={css.titleContainer}>
            <h1>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h1>

            <p className={css.p}>
              User Score {Math.round(movie.vote_average * 10)}%
            </p>
            <h3>Overview</h3>
            <p className={css.p}>{movie.overview}</p>
            <p className={css.p}>Genres:</p>
            <ul className={css.ganresContaner}>
              {movie.genres.map((genre) => {
                return (
                  <li key={genre.id}>
                    <p>{genre.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <ul className={css.linkContainer}>
        Additional information
        <li className={css.addContainer}>
          <NavLink
            to="cast"
            className={({ isActive }) => {
              return clsx(css.link, isActive && css.isActive);
            }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) => {
              return clsx(css.link, isActive && css.isActive);
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Spiner />}>
        <Outlet />
      </Suspense>

      {error && <ErrorMessage error={error} />}
      {isLoading && <Spiner />}
    </div>
  );
}

export default MovieDetailsPage;
