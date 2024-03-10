import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetMovieCastById } from "../../MovieApi";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
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
      <h1>Cast!</h1>
      {casts && (
        <div>
          <ul>
            {casts.map((cast) => {
              return (
                <li key={cast.cast_id}>
                  {cast.profile_path && (
                    <img
                      src={imageUrl + cast.profile_path}
                      className={css.img}
                    />
                  )}
                  <p>{cast.profile_path && cast.name}</p>
                  {cast.profile_path && <p>Character: {cast.character}</p>}
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
