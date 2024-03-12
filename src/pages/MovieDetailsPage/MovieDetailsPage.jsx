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
import { Toaster } from "react-hot-toast";
import { Spiner } from "../../Components/Spiner/Spiner";

function MovieDetailsPage() {
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  const defaultImg =
    "https://amiel.club/uploads/posts/2022-03/1647643805_7-amiel-club-p-gomer-kartinki-7.jpg";

  const { movieId } = useParams();

  const location = useLocation();
  console.log(location.state);
  const backLinkRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function GetMovieById() {
      try {
        const response = await DetailsMovieById(movieId);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
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
      <Toaster />
    </div>
  );
}

export default MovieDetailsPage;
