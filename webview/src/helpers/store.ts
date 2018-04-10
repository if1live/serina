import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import * as Raven from 'raven-js';
import * as createRavenMiddleware from 'raven-for-redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { history } from './history';
import { reducers, State } from '../reducers';
import { startListener } from './listener';

const makeLogger = () => {
  return createLogger({
    collapsed: true,
  });
};
const logger = makeLogger();

const raven = createRavenMiddleware(Raven, {
});


function composeMiddlewares() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const middlewares: Middleware[] = [
    thunk,
    (isDevelopment) ? logger : null,
    routerMiddleware(history),
    raven,
  ].filter(m => !!m);
  return composeWithDevTools(applyMiddleware(...middlewares));
}

export const store = createStore<State>(reducers, composeMiddlewares());

startListener(history, store);
