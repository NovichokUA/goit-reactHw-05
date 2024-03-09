import { useState, useEffect } from "react";
import { DetailsMovieById } from "../../MovieApi";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

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
    <div>
      <Link to="/">Go back</Link>
      {movie && (
        <div>
          <h1>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          {<img src={imageUrl + movie.poster_path} className={css.img} />}
          <p>User Score {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>

          {movie.genres.map((genre) => {
            return <p key={genre.id}>{genre.name}</p>;
          })}
        </div>
      )}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
