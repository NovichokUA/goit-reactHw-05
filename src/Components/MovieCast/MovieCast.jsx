import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GetMovieCastById } from "../../MovieApi";
import css from "./MovieCast.module.css";
import { Spiner } from "../Spiner/Spiner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);

  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  const defaultImg =
    "https://amiel.club/uploads/posts/2022-03/1647643768_3-amiel-club-p-gomer-kartinki-3.jpg";

  useEffect(() => {
    async function getMovieCast() {
      try {
        setIsloading(true);
        setError(false);
        const data = await GetMovieCastById(movieId);
        setCasts(data.data.cast);
      } catch (error) {
        setError(error);
      } finally {
        setIsloading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {casts && (
        <div>
          <ul className={css.castContainer}>
            {casts.map((cast) => {
              return (
                <li key={cast.cast_id}>
                  {
                    <img
                      src={
                        cast.profile_path
                          ? imageUrl + cast.profile_path
                          : defaultImg
                      }
                      className={css.img}
                    />
                  }
                  <p className={css.title}>{cast.name}</p>
                  <p className={css.title}>Character: {cast.character}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isloading && <Spiner />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default MovieCast;
