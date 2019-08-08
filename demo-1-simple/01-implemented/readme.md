# Demo react-promise-tracker

In this simple demo we are fetching two kind of data, `movies` and `actors`.
We have a spinner also but it's always running, we want running it while promise is in progress.

Thas's why we are going to use `react-promise-tracker`.

# Steps

- Copy demo `00-start` and execute:

```bash
npm install
```

- Import `react-promise-tracker`:

### ./src/playground/playground.tsx

```diff
import * as React from 'react';
+ import { trackPromise } from 'react-promise-tracker';
import CircularProgress from '@material-ui/core/CircularProgress';
...

```

- Track desired promises:

### ./src/playground/playground.tsx

```diff
...
const useMovies = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const handleLoadMovies = async () => {
    setMovies([]);
-   const newMovies = await getMovies();
+   const newMovies = await trackPromise(getMovies());
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
-   const newActors = await getActors();
+   const newActors = await trackPromise(getActors());
    setActors(newActors);
  };

  const loadActors = React.useCallback(handleLoadActors, []);

  return {
    actors,
    loadActors,
  };
};

...

```

- Now, we only have to update `spinner` visibility:

### ./src/playground/playground.tsx

```diff
import * as React from 'react';
- import { trackPromise } from 'react-promise-tracker';
+ import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import CircularProgress from '@material-ui/core/CircularProgress';
...

const Spinner: React.FunctionComponent = () => {
+ const { promiseInProgress } = usePromiseTracker();
- return true && <CircularProgress size={60} />;
+ return promiseInProgress && <CircularProgress size={60} />;
};

...
```

# Delay

Sometimes, there is a flicker behaviour with spinner due to the fast speed connection. Let's simulate it:

- By default `getMovies` and `getActors` have a `1 second` timeout, so let's decrease `getActors` promise timeout:

### ./src/playground/playground.ts

```diff

const useActors = () => {
  const [actors, setActors] = React.useState<Actor[]>([]);

  const handleLoadActors = async () => {
    setActors([]);
-   const newActors = await trackPromise(getActors());
+   const newActors = await trackPromise(getActors(150));
    setActors(newActors);
  };

  const loadActors = React.useCallback(handleLoadActors, []);

  return {
    actors,
    loadActors,
  };
};

```

- Let's check it:

```bash
npm start
```

- This time, we are going to provide a spinner `delay` to avoid show it if promise was resolved before it.

### ./src/playground/playground.ts

```diff
...

const Spinner: React.FunctionComponent = () => {
- const { promiseInProgress } = usePromiseTracker();
+ const { promiseInProgress } = usePromiseTracker({ delay: 300 });
  return promiseInProgress && <CircularProgress size={60} />;
};

...
```
