import Axios from 'axios';
import { Movie, Actor } from './model';

const moviesURL = `${process.env.BASE_API_URL}/api/movies`;
const actorsURL = `${process.env.BASE_API_URL}/api/actors`;

const fetchWithDelay = (url: string, delay: number): Promise<any> =>
  new Promise(resolve =>
    setTimeout(() => resolve(Axios.get(url).then(({ data }) => data)), delay)
  );

export const getMovies = (): Promise<Movie[]> =>
  fetchWithDelay(moviesURL, 1000);

export const getActors = (): Promise<Actor[]> =>
  fetchWithDelay(actorsURL, 150);
