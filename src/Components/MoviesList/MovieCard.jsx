import css from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className={css.container}>
      {movie.poster_path && (
        <img src={imageUrl + movie.poster_path} className={css.img} />
      )}

      <p className={css.title}>{movie.title}</p>
    </div>
  );
};

export default MovieCard;
