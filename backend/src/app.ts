import express from 'express';
import cors from 'cors';
import path from 'path';
import { PORT } from './config';
import { mockMovies, mockActors } from './mock-data';

const app = express();
app.use(cors());
const moviesPath = path.resolve(__dirname, './images/movies');
const actorsPath = path.resolve(__dirname, './images/actors');
app.use('/images', express.static(moviesPath));
app.use('/images', express.static(actorsPath));

app.get('/api/movies', (req, res) => {
  res.send(mockMovies);
});

app.get('/api/actors', (req, res) => {
  res.send(mockActors);
});

app.get('/api/actors/:id', (req, res) => {
  res.send(mockActors[req.params.id]);
});

app.listen(PORT, () => {
  console.log(`Running server in localhost:${PORT}`);
});
