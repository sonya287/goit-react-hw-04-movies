import { useState, useEffect } from 'react';
import { fetchTrendMovies } from '../../services/movies-api';
import MovieCard from '../../components/MovieCard/MovieCard';
import s from './HomeView.module.css';

export default function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendMovies().then(request => setMovies(request.results));
  }, []);

  return (
    <>
      <h1 className={s.title}> Trending today </h1>
      <MovieCard movies={movies} />
    </>
  );
}
