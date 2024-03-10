import { useState, useEffect } from "react";
import { DetailsMovieById } from "../../MovieApi";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import clsx from "clsx";

import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  const { movieId } = useParams();

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
        <Link to="/">Go back</Link>
      </button>
      {movie && (
        <div className={css.container}>
          {<img src={imageUrl + movie.poster_path} className={css.img} />}
          <div className={css.titleContainer}>
            <h1>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h1>

            <p className={css.p}>
              User Score {Math.round(movie.vote_average * 10)}%
            </p>
            <h3>Overview</h3>
            <p className={css.p}>{movie.overview}</p>
            <p className={css.p}>
              Genres:
              <ul className={css.ganresContaner}>
                {movie.genres.map((genre) => {
                  return (
                    <li key={genre.id}>
                      <p>{genre.name}</p>
                    </li>
                  );
                })}
              </ul>
            </p>
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
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
