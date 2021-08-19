import { useState, useEffect } from 'react';
import { fetchMovieCast, IMAGE_URL } from '../../services/movies-api';
import s from './MovieCastView.module.css';

export default function MovieCastView({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(request => setCast(request.cast));
  }, [movieId]);

  return (
    <ul className={s.list}>
      {cast.map(element => (
        <li key={element.id} className={s.item}>
          <img
            src={IMAGE_URL + element.profile_path}
            alt={element.name}
            width="100"
            height="150"
          />
          <p className={s.name}>{element.name}</p>
        </li>
      ))}
    </ul>
  );
}
