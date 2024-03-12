import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetMovieCastById } from "../../MovieApi";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  const defaultImg =
    "https://amiel.club/uploads/posts/2022-03/1647643768_3-amiel-club-p-gomer-kartinki-3.jpg";

  const [casts, setCasts] = useState(null);

  useEffect(() => {
    async function getMovieCast() {
      try {
        const data = await GetMovieCastById(movieId);
        setCasts(data.data.cast);
      } catch (error) {
        console.log(error);
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
    </div>
  );
};

export default MovieCast;
