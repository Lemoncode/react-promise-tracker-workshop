import { Movie, Actor } from './model';
import { mapImagNameToURL } from './mappers';

export const mockMovies: Movie[] = [
  {
    title: 'Chain Reaction',
    url: mapImagNameToURL('chain-reaction'),
  },
  {
    title: 'The Trigger Effect',
    url: mapImagNameToURL('the-trigger-effect'),
  },
  {
    title: 'Hook',
    url: mapImagNameToURL('hook'),
  },
  {
    title: 'Blade Runner',
    url: mapImagNameToURL('blade-runner'),
  },
];

export const mockActors: Actor[] = [
  {
    title: 'Keanu Reeves',
    url: mapImagNameToURL('keanu-reeves'),
  },
  {
    title: 'Elisabeth Shue',
    url: mapImagNameToURL('elisabeth-shue'),
  },
  {
    title: 'Robin Williams',
    url: mapImagNameToURL('robin-williams'),
  },
  {
    title: 'Harrison Ford',
    url: mapImagNameToURL('harrison-ford'),
  },
];
