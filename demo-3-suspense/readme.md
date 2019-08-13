# Demo suspense

This time we will create a suspense like spinner for each image.

# Steps

- Copy demo `demo-1-simple/01-implemented` and execute:

```bash
npm install
```

- Refactor spinner component:

### ./src/playground/playground.tsx

```diff
import * as React from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
+ import { randomBytes } from 'crypto';
import { Movie, Actor } from './model';
import { getMovies, getActors } from './api';
import { useStyles, useImageStyles } from './playground.styles';

...

- interface SpinnerProps {
+ interface SuspenseProps {
-   area: string;
+   area?: string;
-   color: 'primary' | 'secondary' | 'inherit';
}

- const Spinner: React.FunctionComponent<SpinnerProps> = props => {
+ const Suspense: React.FunctionComponent<SuspenseProps> = props => {
-   const { area, color } = props;
+   const { area, children } = props;
+   const color = `#${randomBytes(3).toString('hex')}`;
    const { promiseInProgress } = usePromiseTracker({ area });
-   return promiseInProgress && <CircularProgress color={color} size={60} />;
+   return promiseInProgress ? (
+    <CircularProgress style={{ color }} size={60}>
+      {children}
+    </CircularProgress>
+  ) : (
+    <>{children}</>
+  );
};

```

- Refactor `movies`:

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
+     <Suspense area="movies">
        <Images images={movies} width="300" height="500" />
+     </Suspense>
-     <Spinner area="movies" color="primary" />
      <Button
        variant="outlined"
        className={classes.button}
        onClick={loadActors}
      >
        Load actors
      </Button>
-     <Spinner area="actors" color="secondary" />
      <Images images={actors} />
    </div>
  );
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
