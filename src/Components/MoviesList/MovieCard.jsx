import css from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500/";
  const defaultImg =
    "https://amiel.club/uploads/posts/2022-03/1647643811_17-amiel-club-p-gomer-kartinki-17.jpg";
  return (
    <div className={css.container}>
      {
        <img
          src={movie.poster_path ? imageUrl + movie.poster_path : defaultImg}
          className={css.img}
        />
      }

      <p className={css.title}>{movie.title}</p>
    </div>
  );
};

export default MovieCard;
