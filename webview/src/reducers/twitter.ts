import { TwitterAction, TwitterKeys } from '../actions';
import * as M from '../models';

export interface TwitterState {
  tid: string;
  tweet: M.Tweet | null;

  onRequest: boolean;
  error: Error | null;
}

const defaultTwitterState: TwitterState = {
  tid: '',
  tweet: null,
  onRequest: false,
  error: null,
};

export function twitter(
  state: TwitterState = defaultTwitterState,
  action: TwitterAction
): TwitterState {
  switch (action.type) {
    case TwitterKeys.TWITTER_CHANGE_ID:
      return {
        ...state,
        tid: action.tid,
      };

    case TwitterKeys.TWEET_FETCH_REQUEST:
      return {
        ...state,
        onRequest: true,
        error: null,
      };

    case TwitterKeys.TWEET_FETCH_SUCCESS:
      return {
        ...state,
        onRequest: false,
        tweet: action.tweet,
        error: null,
      };

    case TwitterKeys.TWEET_FETCH_FAILURE:
      return {
        ...state,
        onRequest: false,
        tweet: null,
        error: action.error,
      };

    default:
      return state;
  }
}
