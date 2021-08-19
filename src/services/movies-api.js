const KEY = '7e78d9d0b80a5a9938ce5aba09bf2c47';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendMovies() {
  return fetchWithErrorHandling(`${BASE_URL}/trending/all/day?api_key=${KEY}`);
}

export function fetchMovieById(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US`,
  );
}

export function fetchMovieSearch(name) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${name}&language=en-US&page=1&include_adult=false`,
  );
}

export function fetchMovieCast(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/credits?api_key=${KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/reviews?api_key=${KEY}&language=en-US`,
  );
}
