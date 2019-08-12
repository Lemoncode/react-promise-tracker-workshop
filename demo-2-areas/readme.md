# Demo areas

In this demo we will define two areas `movies` and `actors`, so we will create two spinners.

# Steps

- Copy demo `demo-1-simple/01-implemented` and execute:

```bash
npm install
```

- Create two spinners feeding `area` as prop:

### ./src/playground/playground.tsx

```diff
...

+ interface SpinnerProps {
+   area: string;
+   color: 'primary' | 'secondary' | 'inherit';
+ }

- const Spinner: React.FunctionComponent = () => {
+ const Spinner: React.FunctionComponent<SpinnerProps> = props => {
+   const { area, color } = props;
-   const { promiseInProgress } = usePromiseTracker({ delay: 300 });
+   const { promiseInProgress } = usePromiseTracker({ area });
-  return promiseInProgress && <CircularProgress size={60} />;
+  return promiseInProgress && <CircularProgress color={color} size={60} />;
 };

...

```

- Use it:

### ./src/playground/playground.tsx

```diff
...
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
-     <Spinner />
+     <Spinner area="movies" color="primary" />
      <Button
        variant="outlined"
        className={classes.button}
        onClick={loadActors}
      >
        Load actors
      </Button>
+     <Spinner area="actors" color="secondary" />
      <Images images={actors} />
    </div>
  );
};

```

- Use `area` when track each promise:

### ./src/playground/playground.tsx

```diff
...

const useMovies = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const handleLoadMovies = async () => {
    setMovies([]);
-   const newMovies = await trackPromise(getMovies());
+   const newMovies = await trackPromise(getMovies(), 'movies');
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
-   const newActors = await trackPromise(getActors(150));
+   const newActors = await trackPromise(getActors(), 'actors');
    setActors(newActors);
  };

  const loadActors = React.useCallback(handleLoadActors, []);

  return {
    actors,
    loadActors,
  };
};
..
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
