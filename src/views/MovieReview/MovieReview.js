import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../services/movies-api';
import s from './MovieReview.module.css';

export default function MovieReview({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(request => setReviews(request.results));
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <ul className={s.list}>
            {reviews.map((element, index) => (
              <li key={index} className={s.item}>
                <p className={s.title}>{element.author}</p>
                <p className={s.desc}>{element.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Reviews</p>
      )}
    </div>
  );
}
