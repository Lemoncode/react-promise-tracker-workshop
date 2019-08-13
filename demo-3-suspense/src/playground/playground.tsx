import * as React from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { randomBytes } from 'crypto';
import { Movie, Actor, createEmptyActor, ActorParam } from './model';
import { getMovies, getActor } from './api';
import { useStyles, useImageStyles } from './playground.styles';

export const Playground: React.FunctionComponent = props => {
  const classes = useStyles({});
  const { movies, loadMovies } = useMovies();
  const { actorParams, initializeActorParams } = useActors();

  return (
    <div className={classes.container}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={loadMovies}
      >
        Load movies
      </Button>
      <Suspense area="movies">
        <Images images={movies} width="300" height="500" />
      </Suspense>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={initializeActorParams}
      >
        Load actors
      </Button>
      <ActorImages actorParams={actorParams} />
    </div>
  );
};

const useMovies = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const handleLoadMovies = async () => {
    setMovies([]);
    const newMovies = await trackPromise(getMovies(), 'movies');
    setMovies(newMovies);
  };

  const loadMovies = React.useCallback(handleLoadMovies, []);

  return {
    movies,
    loadMovies,
  };
};

const useActors = () => {
  const [actorParams, setActorParams] = React.useState<ActorParam[]>([]);

  const initializeActorParams = React.useCallback(() => {
    const ids = Array.from({ length: 4 }, (_, i) => i);
    const actorParams: ActorParam[] = ids.map(id => ({
      id,
      delay: Math.random() * 3000,
    }));
    setActorParams(actorParams);
  }, []);
  return {
    actorParams,
    initializeActorParams,
  };
};

interface SuspenseProps {
  area?: string;
}

const Suspense: React.FunctionComponent<SuspenseProps> = props => {
  const { area, children } = props;
  const color = `#${randomBytes(3).toString('hex')}`;
  const { promiseInProgress } = usePromiseTracker({ area });

  return promiseInProgress ? (
    <CircularProgress style={{ color }} size={60}>
      {children}
    </CircularProgress>
  ) : (
    <>{children}</>
  );
};

interface ImagesProps {
  images: Movie[];
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

interface ActorImagesProps {
  actorParams: ActorParam[];
}

const ActorImages: React.FunctionComponent<ActorImagesProps> = props => {
  const { actorParams } = props;
  const classes = useImageStyles({});

  return (
    <div className={classes.container}>
      {actorParams.map(actorParam => (
        <ActorImage key={actorParam.id} actorParam={actorParam} />
      ))}
    </div>
  );
};

interface ActorImageProps {
  actorParam: ActorParam;
}

const ActorImage: React.FunctionComponent<ActorImageProps> = props => {
  const { actorParam } = props;
  const { actor, loadActor } = useActor();
  const classes = useImageStyles({});

  React.useEffect(() => {
    loadActor(actorParam.id, actorParam.delay);
  }, [actorParam]);

  return (
    <Suspense area={`actor${actorParam.id}`}>
      <div>
        <img className={classes.image} src={actor.url} />
        <Typography variant="h5" align="center">
          {actor.title}
        </Typography>
      </div>
    </Suspense>
  );
};

const useActor = () => {
  const [actor, setActor] = React.useState<Actor>(createEmptyActor());

  const handleLoadActor = async (id: number, delay: number) => {
    setActor(createEmptyActor());
    const newActor = await trackPromise(getActor(id, delay), `actor${id}`);
    setActor(newActor);
  };

  const loadActor = React.useCallback(handleLoadActor, []);

  return {
    actor,
    loadActor,
  };
};
