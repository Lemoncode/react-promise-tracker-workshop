import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Playground } from './playground';

const App: React.FunctionComponent = () => {
  return <Playground />;
};

export default hot(App);
