import Axios from 'axios';
import { Movie, Actor } from './model';

const moviesURL = `${process.env.BASE_API_URL}/api/movies`;
const actorsURL = `${process.env.BASE_API_URL}/api/actors`;

const fetchWithDelay = (url: string, delay: number): Promise<any> =>
  new Promise(resolve =>
    setTimeout(() => resolve(Axios.get(url).then(({ data }) => data)), delay)
  );

export const getMovies = (delay = 1000): Promise<Movie[]> =>
  fetchWithDelay(moviesURL, delay);

export const getActors = (delay = 1000): Promise<Actor[]> =>
  fetchWithDelay(actorsURL, delay);
