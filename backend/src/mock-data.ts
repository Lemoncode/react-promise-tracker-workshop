import { Movie, Actor } from './model';
import { mapImagNameToURL } from './mappers';

export const mockMovies: Movie[] = [
  {
    title: 'Interestelar',
    url: mapImagNameToURL('interestelar'),
  },
  {
    title: 'Blade Runner',
    url: mapImagNameToURL('blade-runner'),
  },
  {
    title: 'Metropolis',
    url: mapImagNameToURL('metropolis'),
  },
  {
    title: 'Alien',
    url: mapImagNameToURL('alien'),
  },
];

export const mockActors: Actor[] = [
  {
    title: 'Sigourney Weaver',
    url: mapImagNameToURL('sigourney-weaver'),
  },
  {
    title: 'Anne Hathaway',
    url: mapImagNameToURL('anne-hathaway'),
  },
  {
    title: 'Harrison Ford',
    url: mapImagNameToURL('harrison-ford'),
  },
  {
    title: 'Rutger Hauer',
    url: mapImagNameToURL('rutger-hauer'),
  },
];
