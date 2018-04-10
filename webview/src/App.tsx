import * as React from 'react';
import { HomeContainer, TweetContainer } from './containers';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './helpers/history';
import { store } from './helpers/store';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/serina" component={HomeContainer} />

          <Route path="/tweet/:tid/" component={TweetContainer} />
          <Route path="/serina/tweet/:tid/" component={TweetContainer} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default AppRouter;
