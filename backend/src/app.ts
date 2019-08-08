import express from 'express';
import cors from 'cors';
import path from 'path';
import { PORT } from './config';
import { mapImagNameToURL } from './mappers';
import { Movie, Actor } from './model';

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
const moviesPath = path.resolve(__dirname, './images/movies');
const actorsPath = path.resolve(__dirname, './images/actors');
app.use('/images', express.static(moviesPath));
app.use('/images', express.static(actorsPath));

app.get('/api/movies', (req, res) => {
  const movies: Movie[] = [
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
  res.send(movies);
});

app.get('/api/actors', (req, res) => {
  const actors: Actor[] = [
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
  res.send(actors);
});

app.listen(PORT, () => {
  console.log(`Running server in localhost:${PORT}`);
});
