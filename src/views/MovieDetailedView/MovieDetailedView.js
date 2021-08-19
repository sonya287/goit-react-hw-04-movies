import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchMovieById, IMAGE_URL } from '../../services/movies-api';
import s from './MovieDetailedView.module.css';

const MovieCastView = lazy(() =>
  import('../MovieCast/MovieCastView' /* webpackChunkName: "MovieCastView" */),
);
const MovieReview = lazy(() =>
  import('../MovieReview/MovieReview' /* webpackChunkName: "MovieReview" */),
);

const MovieDetailedView = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchMovieById(movieId).then(movie => {
      setMovie(movie);
    });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" className={s.button} onClick={onGoBack}>
            GoBack
          </button>
          <div>
            <div className={s.container}>
              <img
                className={s.image}
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title || movie.name}
                widht="300"
                height="450"
              />

              <div className={s.box}>
                <h2 className={s.title}>{movie.title || movie.name}</h2>
                <p className={s.rating}>
                  User Score:
                  <span className={s.descr}> {movie.vote_average} </span>
                </p>
                <p className={s.subtitle}>
                  Overview:
                  <span className={s.descr}>{movie.overview}</span>
                </p>
                <p className={s.subtitle}>
                  Genres:
                  <span className={s.genres}>
                    {movie.genres.map(genre => genre.name).join(' / ')}
                  </span>
                </p>
              </div>
            </div>
            <hr />

            <nav>
              <NavLink
                to={`${url}/cast`}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>
              <NavLink
                to={`${url}/reviews`}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Reviews
              </NavLink>
            </nav>

            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path={`${path}/cast`}>
                  <MovieCastView movieId={movieId} />
                </Route>

                <Route path={`${path}/reviews`}>
                  <MovieReview movieId={movieId} />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailedView;
