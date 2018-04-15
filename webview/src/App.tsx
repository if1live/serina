import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './helpers/history';
import { store } from './helpers/store';
import { RootContainer } from './containers/RootContainer';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootContainer />
      </ConnectedRouter>
    </Provider>
  );
};

export default AppRouter;
