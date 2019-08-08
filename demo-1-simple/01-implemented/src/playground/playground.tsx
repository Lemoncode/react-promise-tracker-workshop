import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Movie, Actor } from './model';
import { getMovies, getActors } from './api';
import { useStyles, useImageStyles } from './playground.styles';

export const Playground: React.FunctionComponent = props => {
  const classes = useStyles({});
  const { movies, loadMovies } = useMovies();
  const { actors, loadActors } = useActors();

  return (
    <div className={classes.container}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={loadMovies}
      >
        Load movies
      </Button>
      <Images images={movies} width="300" height="500" />
      <Spinner />
      <Button
        variant="outlined"
        className={classes.button}
        onClick={loadActors}
      >
        Load actors
      </Button>
      <Images images={actors} />
    </div>
  );
};

const useMovies = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const handleLoadMovies = async () => {
    setMovies([]);
    const newMovies = await getMovies();
    setMovies(newMovies);
  };

  const loadMovies = React.useCallback(handleLoadMovies, []);

  return {
    movies,
    loadMovies,
  };
};

const useActors = () => {
  const [actors, setActors] = React.useState<Actor[]>([]);

  const handleLoadActors = async () => {
    setActors([]);
    const newActors = await getActors();
    setActors(newActors);
  };

  const loadActors = React.useCallback(handleLoadActors, []);

  return {
    actors,
    loadActors,
  };
};

const Spinner: React.FunctionComponent = () => {
  return true && <CircularProgress size={60} />;
};

interface ImagesProps {
  images: Movie[] | Actor[];
  width?: string;
  height?: string;
}

const Images: React.FunctionComponent<ImagesProps> = props => {
  const { images, width, height } = props;
  const classes = useImageStyles({ width, height });

  return (
    <div className={classes.container}>
      {images.map(image => (
        <div key={image.url}>
          <img className={classes.image} src={image.url} />
          <Typography variant="h5" align="center">
            {image.title}
          </Typography>
        </div>
      ))}
    </div>
  );
};
