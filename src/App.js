import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView' /*webpackChunkName: "HomeView"*/),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView' /* webpackChunkName: "MoviesView" */),
);
const MovieDetailedView = lazy(() =>
  import(
    './views/MovieDetailedView/MovieDetailedView' /* webpackChunkName: "MovieDetailedView" */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailedView />
          </Route>
        </Switch>
      </Suspense>
      <Footer />
    </Container>
  );
}
