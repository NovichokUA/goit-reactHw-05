import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetReviewsById } from "../../MovieApi";
import { Spiner } from "../Spiner/Spiner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function GetRewiews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await GetReviewsById(movieId);
        setReviews(data.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    GetRewiews();
  }, [movieId]);

  return (
    <div>
      {reviews === null ||
        (reviews.length === 0 && (
          <p>We dont have any reviews for this movie.</p>
        ))}

      {reviews && (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id} className={css.container}>
                <h3 className={css.mainTitle}>Author: {review.author}</h3>
                <p className={css.title}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {isLoading && <Spiner />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export default MovieReviews;
