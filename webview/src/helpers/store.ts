import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import * as Raven from 'raven-js';
import * as createRavenMiddleware from 'raven-for-redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { history } from './history';
import { reducers, State } from '../reducers';


const raven = createRavenMiddleware(Raven, {
});


function composeMiddlewares() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const middlewares: Middleware[] = [
    routerMiddleware(history),
    raven,
  ].filter(m => !!m);
  return composeWithDevTools(applyMiddleware(...middlewares));
}

export const store = createStore<State>(reducers, composeMiddlewares());
