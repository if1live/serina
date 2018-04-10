import { combineReducers } from 'redux';
import { TwitterState, twitter } from './twitter';

export interface State {
  twitter: TwitterState;
}

export const reducers = combineReducers<State>({
  twitter,
});
