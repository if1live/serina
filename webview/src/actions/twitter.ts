import { Action, Dispatch } from 'redux';
import * as M from '../models';
import * as Raven from 'raven-js';


export enum TwitterKeys {
  TWITTER_CHANGE_ID = 'TWITTER_CHANGE_ID',

  TWEET_FETCH_REQUEST = 'TWEET_FETCH_REQUEST',
  TWEET_FETCH_SUCCESS = 'TWEET_FETCH_SUCCESS',
  TWEET_FETCH_FAILURE = 'TWEET_FETCH_FAILURE',
}

export interface TwitterChangeIDAction extends Action {
  type: TwitterKeys.TWITTER_CHANGE_ID;
  tid: string;
}

export interface TweetFetchRequestAction extends Action {
  type: TwitterKeys.TWEET_FETCH_REQUEST;
  tid: string;
}

export interface TweetFetchSuccessAction extends Action {
  type: TwitterKeys.TWEET_FETCH_SUCCESS;
  tweet: M.Tweet;
}

export interface TweetFetchFailureAction extends Action {
  type: TwitterKeys.TWEET_FETCH_FAILURE;
  error: Error;
}

export type TwitterAction = (
  | TwitterChangeIDAction
  | TweetFetchRequestAction
  | TweetFetchSuccessAction
  | TweetFetchFailureAction
);

export const twitterChangeID = (tid: string): TwitterChangeIDAction => {
  return {
    type: TwitterKeys.TWITTER_CHANGE_ID,
    tid: tid,
  };
};

export const tweetFetchRequest = (tid: string): TweetFetchRequestAction => {
  return {
    type: TwitterKeys.TWEET_FETCH_REQUEST,
    tid: tid,
  };
};

export const tweetFetchSuccess = (tweet: M.Tweet): TweetFetchSuccessAction => {
  return {
    type: TwitterKeys.TWEET_FETCH_SUCCESS,
    tweet: tweet,
  };
};

export const tweetFetchFailure = (e: Error): TweetFetchFailureAction => {
  return {
    type: TwitterKeys.TWEET_FETCH_FAILURE,
    error: e,
  };
};

export const tweetFetch = (tid: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(tweetFetchRequest(tid));

    try {
      // TODO
      const url = '/todo';
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const json = await resp.json();
      dispatch(tweetFetchSuccess(json));

    } catch (err) {
      console.error(err);
      Raven.captureException(err);
      dispatch(tweetFetchFailure(err));
    }
  };
};
