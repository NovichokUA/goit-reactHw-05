import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetReviewsById } from "../../MovieApi";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    async function GetRewiews() {
      try {
        const data = await GetReviewsById(movieId);

        setReviews(data.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    GetRewiews();
  }, [movieId]);

  return (
    <div>
      <h1>Rewiews.</h1>
      {reviews === null ||
        (reviews.length === 0 && (
          <p>We dont have any reviews for this movie.</p>
        ))}

      {reviews && (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;
